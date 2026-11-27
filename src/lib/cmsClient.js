export async function fetchCmsContent() {
  const res = await fetch("/api/cms/content", { credentials: "include" });
  if (!res.ok) throw new Error("Gagal mengambil data CMS.");
  return res.json();
}

export async function syncCmsFromSheets() {
  const res = await fetch("/api/cms/sync", {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Gagal sinkronisasi Google Sheets.");
  broadcastCmsUpdate(data);
  return data;
}

export async function saveCmsCatalog(catalog) {
  const res = await fetch("/api/cms/catalog", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ catalog }),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.error || "Gagal menyimpan katalog.");
  if (result.data) broadcastCmsUpdate(result.data);
  return result;
}

export async function saveCmsProjects(projects) {
  const res = await fetch("/api/cms/projects", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ projects }),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.error || "Gagal menyimpan portofolio.");
  if (result.data) broadcastCmsUpdate(result.data);
  return result;
}

export async function saveCmsSettings(settings) {
  const res = await fetch("/api/cms/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ settings }),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.error || "Gagal menyimpan pengaturan teks.");
  if (result.data) broadcastCmsUpdate(result.data);
  return result;
}

export async function regenerateCmsSitemap() {
  const res = await fetch("/api/cms/sitemap", {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(result.error || "Gagal memperbarui sitemap.");
  return result;
}

export async function getErpSsoUrl() {
  const res = await fetch("/api/auth/sso-ticket", {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Gagal membuka ERP (${res.status}).`);
  if (!data.url) throw new Error("URL ERP tidak tersedia.");
  return data.url;
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`Gagal membaca file ${file.name}`));
    reader.readAsDataURL(file);
  });
}

export async function uploadCmsImage(file, target = "catalog") {
  const dataUrl = await fileToDataUrl(file);
  const res = await fetch("/api/cms/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      target,
      filename: file.name,
      dataUrl,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Gagal upload gambar.");
  return data.url;
}

export function broadcastCmsUpdate(data) {
  window.dispatchEvent(new CustomEvent("cms-updated", { detail: data }));
}
