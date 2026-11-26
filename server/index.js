import "dotenv/config";
import express from "express";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { GoogleAuth } from "google-auth-library";
import {
  loadCmsData,
  saveCmsData,
  saveUploadedImage,
  regenerateSitemap,
} from "./cms.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PORT = process.env.PORT || 3001;
const SHEET_ID =
  process.env.SHEET_ID || "1TTxOa5Ax4W-7GZY4hWVWrTUk87gXObbYx-0QR0UzSrQ";
const SHEET_RANGE = process.env.SHEET_RANGE || "Akun Login";
const SECRET = process.env.SESSION_SECRET || "pilar-canopy-dev-secret-change-me";
if (!process.env.SESSION_SECRET) {
  console.warn(
    "[pilar-canopy] PERINGATAN: SESSION_SECRET belum di-set. Set di .env / environment VPS dengan string acak panjang."
  );
}
const SESSION_COOKIE = "pc_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 jam

/* Service account bisa dari env (JSON/base64) atau file di beberapa lokasi umum.
   Di VPS: taruh file key di /var/www/ atau set GOOGLE_SERVICE_ACCOUNT_JSON. */
function loadCredentials() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    const raw = inline.trim().startsWith("{")
      ? inline
      : Buffer.from(inline, "base64").toString("utf8");
    return JSON.parse(raw);
  }

  const candidates = [
    process.env.GOOGLE_SERVICE_ACCOUNT,
    path.resolve(ROOT, "..", "pillar-canopy-5d25712dd970.json"),
    path.resolve(ROOT, "pillar-canopy-5d25712dd970.json"),
    "/var/www/pillar-canopy-5d25712dd970.json",
    "/var/www/dashboard-canopy/pillar-canopy-5d25712dd970.json",
  ].filter(Boolean);

  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    }
  }
  return null;
}

const app = express();
app.use(express.json({ limit: "20mb" }));

/* ─── Akun dari Google Sheet (cache 5 menit) ─────────────────────────────── */
let accountsCache = { at: 0, rows: [] };
let lastGoodRows = [];

async function fetchAccounts() {
  const now = Date.now();
  if (now - accountsCache.at < 5 * 60 * 1000 && accountsCache.rows.length) {
    return accountsCache.rows;
  }

  const credentials = loadCredentials();
  if (!credentials) {
    throw new Error(
      "Service account tidak ditemukan. Set GOOGLE_SERVICE_ACCOUNT_JSON (isi file key) atau taruh file key di /var/www/."
    );
  }

  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token?.token) throw new Error("Gagal mendapatkan token Google API");

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
    SHEET_RANGE
  )}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.token}` },
  });
  if (!res.ok) throw new Error(`Google Sheets API error: ${res.status}`);
  const data = await res.json();
  const values = data.values || [];

  // Cari baris header (mengandung "Username")
  const headerIdx = values.findIndex((r) =>
    r.some((c) => String(c).trim().toLowerCase() === "username")
  );
  if (headerIdx === -1) throw new Error("Header 'Username' tidak ditemukan");

  const header = values[headerIdx].map((c) => String(c).trim().toLowerCase());
  const col = (name) => header.indexOf(name);
  const rows = values.slice(headerIdx + 1).filter((r) => r.some((c) => c?.trim()));
  const accounts = rows.map((r) => ({
    username: (r[col("username")] || "").trim(),
    nama: (r[col("nama")] || "").trim(),
    role: (r[col("role")] || "Karyawan").trim() || "Karyawan",
    passDefault: (r[col("pass default")] || "").trim(),
    newPass: (r[col("new pass")] || "").trim(),
    penempatan: (r[col("penempatan")] || "").trim(),
  }));

  accountsCache = { at: now, rows: accounts };
  lastGoodRows = accounts;
  return accounts;
}

function pickAccounts() {
  if (accountsCache.rows.length) return accountsCache.rows;
  if (lastGoodRows.length) return lastGoodRows;
  return null;
}

/* ─── Sesi (cookie HMAC, httpOnly) ───────────────────────────────────────── */
function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function setSession(res, user) {
  const token = sign({
    username: user.username,
    nama: user.nama,
    role: user.role,
    penempatan: user.penempatan,
    exp: Date.now() + SESSION_TTL_MS,
  });
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS,
    secure: process.env.NODE_ENV === "production" && process.env.FORCE_INSECURE_COOKIE !== "1",
  });
}

function getSession(req) {
  const raw = req.headers.cookie || "";
  const match = raw
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return null;
  return verify(decodeURIComponent(match.slice(SESSION_COOKIE.length + 1)));
}

/* ─── API Auth ───────────────────────────────────────────────────────────── */
app.post("/api/auth/login", async (req, res) => {
  try {
    const username = String(req.body?.username || "").trim().toLowerCase();
    const password = String(req.body?.password || "").trim();
    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password wajib diisi." });
    }

    let accounts = pickAccounts();
    if (!accounts) {
      try {
        accounts = await fetchAccounts();
      } catch (e) {
        console.error("fetchAccounts:", e.message);
        return res.status(502).json({ error: "Gagal memuat data akun. Coba lagi." });
      }
    }

    const acc = accounts.find(
      (a) =>
        a.username.toLowerCase() === username ||
        (a.nama && a.nama.toLowerCase() === username)
    );

    if (!acc) {
      return res.status(401).json({ error: "Username tidak terdaftar." });
    }

    // Logika validasi password dari sistem-presensi:
    // New Pass (jika ada) → Pass Default → fallback "123456"
    const validPasses = [acc.newPass, acc.passDefault, "123456"].filter(Boolean);
    if (!validPasses.includes(password)) {
      return res.status(401).json({ error: "Password salah." });
    }

    setSession(res, acc);
    res.json({
      user: {
        username: acc.username,
        nama: acc.nama,
        role: acc.role,
        penempatan: acc.penempatan,
      },
    });
  } catch (e) {
    console.error("login error:", e);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

app.get("/api/auth/me", (req, res) => {
  const session = getSession(req);
  if (!session) return res.json({ user: null });
  res.json({
    user: {
      username: session.username,
      nama: session.nama,
      role: session.role,
      penempatan: session.penempatan,
    },
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.json({ ok: true });
});

// Refresh daftar akun (dipakai admin / warmup)
app.post("/api/auth/refresh", async (req, res) => {
  try {
    const rows = await fetchAccounts();
    res.json({ ok: true, count: rows.length });
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

/* ─── Middleware Auth untuk CMS ──────────────────────────────────────────── */
function requireAuth(req, res, next) {
  const session = getSession(req);
  if (!session) {
    return res.status(401).json({ error: "Sesi berakhir atau belum login. Silakan login terlebih dahulu." });
  }
  req.user = session;
  next();
}

/* ─── API CMS (Google Sheets + Local Fallback + Upload + Sitemap) ─────────── */
app.get("/api/cms/content", async (req, res) => {
  try {
    const data = await loadCmsData(loadCredentials);
    res.json(data);
  } catch (e) {
    console.error("GET /api/cms/content:", e);
    res.status(500).json({ error: "Gagal memuat konten CMS." });
  }
});

app.post("/api/cms/sync", requireAuth, async (req, res) => {
  try {
    const data = await loadCmsData(loadCredentials, { forceRefresh: true });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message || "Gagal sinkronisasi dengan Google Sheets." });
  }
});

app.put("/api/cms/catalog", requireAuth, async (req, res) => {
  try {
    const items = req.body?.catalog;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Format data katalog harus berupa array." });
    }
    const result = await saveCmsData(loadCredentials, { catalog: items });
    res.json(result);
  } catch (e) {
    console.error("PUT /api/cms/catalog:", e);
    res.status(500).json({ error: e.message || "Gagal menyimpan katalog." });
  }
});

app.put("/api/cms/projects", requireAuth, async (req, res) => {
  try {
    const projects = req.body?.projects;
    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: "Format data portofolio harus berupa array." });
    }
    const result = await saveCmsData(loadCredentials, { projects });
    res.json(result);
  } catch (e) {
    console.error("PUT /api/cms/projects:", e);
    res.status(500).json({ error: e.message || "Gagal menyimpan portofolio." });
  }
});

app.put("/api/cms/settings", requireAuth, async (req, res) => {
  try {
    const settings = req.body?.settings;
    if (!settings || typeof settings !== "object") {
      return res.status(400).json({ error: "Format data pengaturan teks tidak valid." });
    }
    const result = await saveCmsData(loadCredentials, { settings });
    res.json(result);
  } catch (e) {
    console.error("PUT /api/cms/settings:", e);
    res.status(500).json({ error: e.message || "Gagal menyimpan pengaturan teks." });
  }
});

app.post("/api/cms/upload", requireAuth, (req, res) => {
  try {
    const { target, filename, dataUrl } = req.body || {};
    const url = saveUploadedImage({ target, filename, dataUrl });
    res.json({ url });
  } catch (e) {
    console.error("POST /api/cms/upload:", e);
    res.status(400).json({ error: e.message || "Gagal mengunggah gambar." });
  }
});

app.post("/api/cms/sitemap", requireAuth, async (req, res) => {
  try {
    const data = await loadCmsData(loadCredentials);
    const sitemap = regenerateSitemap(data);
    res.json({ ok: true, sitemap });
  } catch (e) {
    console.error("POST /api/cms/sitemap:", e);
    res.status(500).json({ error: e.message || "Gagal memperbarui sitemap." });
  }
});

/* ─── Static Uploads & Asset Fallbacks ───────────────────────────────────── */
app.use("/uploads", express.static(path.join(ROOT, "public", "uploads")));
app.use(
  "/images/katalog",
  express.static(path.join(ROOT, "src", "assets", "images", "projects", "katalog"))
);

/* ─── Static build (production) ──────────────────────────────────────────── */
const distDir = path.join(ROOT, "dist");

function findPublicMetaFile(name) {
  const builtFile = path.join(distDir, name);
  if (fs.existsSync(builtFile)) return builtFile;
  const sourceFile = path.join(ROOT, "public", name);
  return fs.existsSync(sourceFile) ? sourceFile : null;
}

const metaFiles = {
  "sitemap.xml": "application/xml; charset=utf-8",
  "robots.txt": "text/plain; charset=utf-8",
};
for (const [name, contentType] of Object.entries(metaFiles)) {
  app.get(`/${name}`, (req, res) => {
    const file = findPublicMetaFile(name);
    if (!file) {
      return res.status(404).type("text/plain; charset=utf-8").send(`${name} tidak ditemukan`);
    }
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.sendFile(file);
  });
}

if (fs.existsSync(distDir)) {
  app.use(
    express.static(distDir, {
      setHeaders(res, filePath) {
        if (filePath.endsWith(".xml")) {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
        }
      },
    })
  );
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path.startsWith("/api/")) return next();
    if (path.extname(req.path)) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`[pilar-canopy] server auth jalan di http://localhost:${PORT}`);
  if (!loadCredentials()) {
    console.warn(
      "[pilar-canopy] PERINGATAN: service account tidak ditemukan. Set GOOGLE_SERVICE_ACCOUNT_JSON atau taruh file key di /var/www/."
    );
  }
});
