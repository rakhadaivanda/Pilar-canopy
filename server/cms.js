import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { GoogleAuth } from "google-auth-library";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SEED_FILE = path.join(__dirname, "data", "cms-seed.json");
const STORE_FILE = path.join(__dirname, "data", "cms-store.json");
const UPLOADS_DIR = path.join(ROOT, "public", "uploads");
const DIST_DIR = path.join(ROOT, "dist");

const BASE_URL = process.env.SITE_URL || "https://canopy.rezekibarokahjaya.net";
const SHEET_ID =
  process.env.SHEET_ID || "19HbZQ3iHpQJve1Lcev_lsp3y6ohKZ3kRwjxbKdXptYA";

const TAB_CATALOG = "CMS_Catalog";
const TAB_PORTFOLIO = "CMS_Portfolio";
const TAB_SETTINGS = "CMS_Settings";

const CATALOG_HEADERS = [
  "id",
  "name",
  "category",
  "alt",
  "priceAmount",
  "priceUnit",
  "specs_json",
  "colors_json",
  "images_json",
  "desc",
  "updatedAt",
];

const PORTFOLIO_HEADERS = [
  "id",
  "category",
  "title",
  "client",
  "pekerjaan",
  "lokasi",
  "tahun",
  "badge",
  "place",
  "images_json",
  "alt",
  "description",
  "chips_json",
  "scope",
  "specs_json",
  "highlights_json",
  "updatedAt",
];

const SETTINGS_HEADERS = ["key", "value_json", "updatedAt"];

let memoryCache = null;
let lastSyncMode = "local"; // "sheets" | "local"
let lastSyncError = null;

function readSeed() {
  if (!fs.existsSync(SEED_FILE)) {
    return {
      settings: {
        catalogHeader: { eyebrow: "Katalog", heading: "Katalog Produk", description: "" },
        projectsHeader: { eyebrow: "Portofolio", heading: "Portofolio Proyek", description: "" },
      },
      defaultColors: [],
      projectCategories: [],
      catalog: [],
      projects: [],
    };
  }
  return JSON.parse(fs.readFileSync(SEED_FILE, "utf8"));
}

function readLocalStore() {
  if (fs.existsSync(STORE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
    } catch {
      // fallback to seed
    }
  }
  const seed = readSeed();
  writeLocalStore(seed);
  return seed;
}

function writeLocalStore(data) {
  fs.mkdirSync(path.dirname(STORE_FILE), { recursive: true });
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2));
}

function safeJsonParse(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

async function getGoogleToken(loadCredentials) {
  const credentials = loadCredentials();
  if (!credentials) return null;

  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token?.token || null;
}

async function sheetsFetch(token, suffix, options = {}) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${suffix}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google Sheets API (${res.status}): ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function ensureTabsExist(token) {
  const meta = await sheetsFetch(token, "?fields=sheets.properties.title");
  const existingTitles = new Set(
    (meta.sheets || []).map((s) => s.properties?.title).filter(Boolean)
  );

  const missing = [TAB_CATALOG, TAB_PORTFOLIO, TAB_SETTINGS].filter(
    (t) => !existingTitles.has(t)
  );

  if (missing.length > 0) {
    await sheetsFetch(token, ":batchUpdate", {
      method: "POST",
      body: JSON.stringify({
        requests: missing.map((title) => ({ addSheet: { properties: { title } } })),
      }),
    });
  }
  return missing;
}

function serializeCatalogToRows(items) {
  const now = new Date().toISOString();
  return [
    CATALOG_HEADERS,
    ...items.map((item) => [
      item.id || "",
      item.name || "",
      item.category || "",
      item.alt || "",
      item.priceAmount || "",
      item.priceUnit || "",
      JSON.stringify(item.specs || {}),
      JSON.stringify(item.colors || []),
      JSON.stringify(item.images || []),
      item.desc || "",
      item.updatedAt || now,
    ]),
  ];
}

function parseCatalogRows(values, defaultColors) {
  if (!values || values.length <= 1) return [];
  const header = values[0].map((h) => String(h).trim());
  const idx = (k) => header.indexOf(k);
  return values
    .slice(1)
    .filter((r) => r[idx("id")] || r[idx("name")])
    .map((r) => ({
      id: String(r[idx("id")] || "").trim(),
      name: String(r[idx("name")] || "").trim(),
      category: String(r[idx("category")] || "").trim(),
      alt: String(r[idx("alt")] || "").trim(),
      priceAmount: String(r[idx("priceAmount")] || "").trim(),
      priceUnit: String(r[idx("priceUnit")] || "").trim(),
      specs: safeJsonParse(r[idx("specs_json")], {}),
      colors: safeJsonParse(r[idx("colors_json")], defaultColors),
      images: safeJsonParse(r[idx("images_json")], []),
      desc: String(r[idx("desc")] || "").trim(),
      updatedAt: String(r[idx("updatedAt")] || "").trim(),
    }));
}

function serializePortfolioToRows(items) {
  const now = new Date().toISOString();
  return [
    PORTFOLIO_HEADERS,
    ...items.map((item) => [
      item.id || "",
      item.category || "membrane",
      item.title || "",
      item.client || "",
      item.pekerjaan || "",
      item.lokasi || "",
      item.tahun || "",
      item.badge || "",
      item.place || "",
      JSON.stringify(item.images || []),
      item.alt || "",
      item.description || "",
      JSON.stringify(item.chips || []),
      item.scope || "",
      JSON.stringify(item.specs || []),
      JSON.stringify(item.highlights || []),
      item.updatedAt || now,
    ]),
  ];
}

function parsePortfolioRows(values) {
  if (!values || values.length <= 1) return [];
  const header = values[0].map((h) => String(h).trim());
  const idx = (k) => header.indexOf(k);
  return values
    .slice(1)
    .filter((r) => r[idx("id")] || r[idx("title")])
    .map((r) => {
      const images = safeJsonParse(r[idx("images_json")], []);
      return {
        id: String(r[idx("id")] || "").trim(),
        category: String(r[idx("category")] || "membrane").trim(),
        title: String(r[idx("title")] || "").trim(),
        client: String(r[idx("client")] || "").trim(),
        pekerjaan: String(r[idx("pekerjaan")] || "").trim(),
        lokasi: String(r[idx("lokasi")] || "").trim(),
        tahun: String(r[idx("tahun")] || "").trim(),
        badge: String(r[idx("badge")] || "").trim(),
        place: String(r[idx("place")] || "").trim(),
        images,
        image: images[0] || "",
        alt: String(r[idx("alt")] || "").trim(),
        description: String(r[idx("description")] || "").trim(),
        chips: safeJsonParse(r[idx("chips_json")], []),
        scope: String(r[idx("scope")] || "").trim(),
        specs: safeJsonParse(r[idx("specs_json")], []),
        highlights: safeJsonParse(r[idx("highlights_json")], []),
        updatedAt: String(r[idx("updatedAt")] || "").trim(),
      };
    });
}

function serializeSettingsToRows(settings) {
  const now = new Date().toISOString();
  return [
    SETTINGS_HEADERS,
    ["catalogHeader", JSON.stringify(settings.catalogHeader || {}), now],
    ["projectsHeader", JSON.stringify(settings.projectsHeader || {}), now],
  ];
}

function parseSettingsRows(values, fallbackSettings) {
  if (!values || values.length <= 1) return fallbackSettings;
  const result = { ...fallbackSettings };
  for (const row of values.slice(1)) {
    const key = String(row[0] || "").trim();
    const val = safeJsonParse(row[1], null);
    if (key && val) result[key] = val;
  }
  return result;
}

async function writeTab(token, tabName, rows) {
  await sheetsFetch(token, `/values/${encodeURIComponent(tabName)}:clear`, {
    method: "POST",
    body: JSON.stringify({}),
  });
  await sheetsFetch(
    token,
    `/values/${encodeURIComponent(`${tabName}!A1`)}?valueInputOption=RAW`,
    {
      method: "PUT",
      body: JSON.stringify({ values: rows }),
    }
  );
}

async function readTab(token, tabName) {
  const data = await sheetsFetch(token, `/values/${encodeURIComponent(tabName)}`);
  return data.values || [];
}

export async function loadCmsData(loadCredentials, { forceRefresh = false } = {}) {
  if (memoryCache && !forceRefresh) {
    return { ...memoryCache, syncMode: lastSyncMode, syncError: lastSyncError };
  }

  const localData = readLocalStore();

  try {
    const token = await getGoogleToken(loadCredentials);
    if (!token) {
      lastSyncMode = "local";
      lastSyncError = "Kredensial Google Service Account belum terpasang (mode lokal aktif).";
      memoryCache = localData;
      return { ...localData, syncMode: lastSyncMode, syncError: lastSyncError };
    }

    await ensureTabsExist(token);

    const [catRows, portRows, setRows] = await Promise.all([
      readTab(token, TAB_CATALOG),
      readTab(token, TAB_PORTFOLIO),
      readTab(token, TAB_SETTINGS),
    ]);

    let catalog = parseCatalogRows(catRows, localData.defaultColors);
    let projects = parsePortfolioRows(portRows);
    let settings = parseSettingsRows(setRows, localData.settings);

    // Seed Google Sheets jika tab baru dibuat atau masih kosong
    const writePromises = [];
    if (catalog.length === 0 && localData.catalog.length > 0) {
      catalog = localData.catalog;
      writePromises.push(writeTab(token, TAB_CATALOG, serializeCatalogToRows(catalog)));
    }
    if (projects.length === 0 && localData.projects.length > 0) {
      projects = localData.projects;
      writePromises.push(writeTab(token, TAB_PORTFOLIO, serializePortfolioToRows(projects)));
    }
    if (setRows.length <= 1) {
      writePromises.push(writeTab(token, TAB_SETTINGS, serializeSettingsToRows(settings)));
    }
    if (writePromises.length > 0) {
      await Promise.all(writePromises);
    }

    const merged = {
      ...localData,
      settings,
      catalog,
      projects,
    };
    memoryCache = merged;
    writeLocalStore(merged);
    lastSyncMode = "sheets";
    lastSyncError = null;
    return { ...merged, syncMode: lastSyncMode, syncError: lastSyncError };
  } catch (err) {
    console.warn("[cms] Fallback ke penyimpanan lokal:", err.message);
    lastSyncMode = "local";
    lastSyncError = err.message;
    memoryCache = localData;
    return { ...localData, syncMode: lastSyncMode, syncError: lastSyncError };
  }
}

export async function saveCmsData(loadCredentials, updatedPartial) {
  const current = await loadCmsData(loadCredentials);
  const next = {
    ...current,
    ...updatedPartial,
  };
  delete next.syncMode;
  delete next.syncError;

  // Simpan lokal selalu agar cepat dan jadi backup
  writeLocalStore(next);
  memoryCache = next;

  // Sinkron ke Google Sheets jika tersedia
  try {
    const token = await getGoogleToken(loadCredentials);
    if (token) {
      await ensureTabsExist(token);
      const tasks = [];
      if (updatedPartial.catalog !== undefined) {
        tasks.push(writeTab(token, TAB_CATALOG, serializeCatalogToRows(next.catalog)));
      }
      if (updatedPartial.projects !== undefined) {
        tasks.push(writeTab(token, TAB_PORTFOLIO, serializePortfolioToRows(next.projects)));
      }
      if (updatedPartial.settings !== undefined) {
        tasks.push(writeTab(token, TAB_SETTINGS, serializeSettingsToRows(next.settings)));
      }
      await Promise.all(tasks);
      lastSyncMode = "sheets";
      lastSyncError = null;
    } else {
      lastSyncMode = "local";
      lastSyncError = "Kredensial Google Service Account belum terpasang (disimpan lokal).";
    }
  } catch (err) {
    console.warn("[cms] Gagal tulis ke Google Sheets (tersimpan di lokal):", err.message);
    lastSyncMode = "local";
    lastSyncError = err.message;
  }

  // Auto-generate sitemap setiap ada perubahan
  const sitemapInfo = regenerateSitemap(next);

  return {
    data: { ...next, syncMode: lastSyncMode, syncError: lastSyncError },
    sitemap: sitemapInfo,
  };
}

export function saveUploadedImage({ target = "catalog", filename = "image.png", dataUrl }) {
  if (!dataUrl || typeof dataUrl !== "string") {
    throw new Error("Data gambar tidak valid.");
  }

  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) {
    throw new Error("Format gambar harus berupa Data URL base64 (PNG/JPG/WEBP/SVG).");
  }

  const mime = match[1].toLowerCase();
  const extMap = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
  };
  const ext = extMap[mime];
  if (!ext) {
    throw new Error("Tipe file tidak didukung. Gunakan PNG, JPG, WEBP, atau SVG.");
  }

  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 10 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 10 MB.");
  }

  const folder = target === "portfolio" ? "portfolio" : "catalog";
  const baseName = path
    .basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "img";

  const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
  const finalName = `${baseName}-${uniqueSuffix}${ext}`;

  const targetDir = path.join(UPLOADS_DIR, folder);
  fs.mkdirSync(targetDir, { recursive: true });
  const filePath = path.join(targetDir, finalName);
  fs.writeFileSync(filePath, buffer);

  // Salin ke dist/uploads jika folder dist sudah ada (production live tanpa rebuild)
  if (fs.existsSync(DIST_DIR)) {
    const distTargetDir = path.join(DIST_DIR, "uploads", folder);
    fs.mkdirSync(distTargetDir, { recursive: true });
    fs.writeFileSync(path.join(distTargetDir, finalName), buffer);
  }

  return `/uploads/${folder}/${finalName}`;
}

function xmlEscape(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(imgPath) {
  if (!imgPath) return "";
  if (/^https?:\/\//i.test(imgPath)) return imgPath;
  const normalized = imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
  // Encode spaces if not already encoded
  return `${BASE_URL}${normalized.replace(/ /g, "%20")}`;
}

export function regenerateSitemap(cmsData) {
  const data = cmsData || readLocalStore();
  const today = new Date().toISOString().slice(0, 10);

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <!-- Situs satu halaman: semua section (#portofolio, #katalog) berada di URL beranda. -->",
    "  <!-- Google mengabaikan fragment (#), jadi semua gambar didaftarkan di bawah satu URL ini. -->",
    "  <url>",
    `    <loc>${BASE_URL}/</loc>`,
    `    <lastmod>${today}</lastmod>`,
    "    <changefreq>weekly</changefreq>",
    "    <priority>1.0</priority>",
    "    <!-- Logo -->",
    "    <image:image>",
    `      <image:loc>${BASE_URL}/logo.png</image:loc>`,
    "      <image:title>Logo Resmi Pilar Canopy Perkasa PT Rezeki Barokah Jaya</image:title>",
    "      <image:caption>Spesialis Canopy Membrane Struktur Rangka Baja dan Tenda Glamping Indonesia</image:caption>",
    "    </image:image>",
    "    <!-- Portofolio &amp; Pengalaman Proyek -->",
  ];

  let totalImages = 1; // logo

  for (const proj of data.projects || []) {
    const imgs = Array.isArray(proj.images) && proj.images.length ? proj.images : proj.image ? [proj.image] : [];
    const title = xmlEscape(proj.title || "Proyek Pilar Canopy");
    const alt = xmlEscape(proj.alt || proj.description || title);
    imgs.forEach((img, idx) => {
      const loc = toAbsoluteUrl(img);
      if (!loc) return;
      totalImages += 1;
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${xmlEscape(loc)}</image:loc>`);
      lines.push(`      <image:title>${title} - Foto ${idx + 1}</image:title>`);
      lines.push(`      <image:caption>${alt} (Foto ${idx + 1})</image:caption>`);
      lines.push("    </image:image>");
    });
  }

  lines.push("    <!-- Katalog Produk -->");
  const seenIds = new Set();
  const seenLocs = new Set();
  for (const item of data.catalog || []) {
    if (item.id && seenIds.has(item.id)) continue;
    if (item.id) seenIds.add(item.id);

    const imgs = Array.isArray(item.images) ? item.images : [];
    const cat = xmlEscape(item.category || "Produk");
    const name = xmlEscape(item.name || "Katalog Pilar Canopy");
    const alt = xmlEscape(item.alt || name);

    imgs.forEach((img, idx) => {
      const loc = toAbsoluteUrl(img);
      if (!loc || seenLocs.has(loc)) return;
      seenLocs.add(loc);
      totalImages += 1;
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${xmlEscape(loc)}</image:loc>`);
      lines.push(`      <image:title>Katalog ${cat} - ${name} - Variasi ${idx + 1}</image:title>`);
      lines.push(`      <image:caption>${alt} Pilar Canopy Perkasa (Koleksi ${idx + 1})</image:caption>`);
      lines.push("    </image:image>");
    });
  }

  lines.push("  </url>");
  lines.push("</urlset>");
  lines.push("");

  const xml = lines.join("\n");
  const publicSitemap = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(publicSitemap, xml, "utf8");

  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml, "utf8");
  }

  return { updatedAt: new Date().toISOString(), totalImages };
}
