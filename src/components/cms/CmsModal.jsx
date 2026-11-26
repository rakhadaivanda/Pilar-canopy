import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Icon from "../ui/Icon";
import {
  fetchCmsContent,
  saveCmsCatalog,
  saveCmsProjects,
  saveCmsSettings,
  regenerateCmsSitemap,
  syncCmsFromSheets,
  uploadCmsImage,
} from "../../lib/cmsClient";
import { DEFAULT_CATALOG_COLORS } from "../../data/catalog";

const INPUT_CLS =
  "w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/60 focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm bg-surface-container-lowest text-primary placeholder:text-on-surface-variant/50 outline-none transition-all";
const LABEL_CLS =
  "block font-spec-code text-[11px] font-bold uppercase tracking-wider text-primary mb-1";

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `item-${Date.now()}`;
}

function emptyCatalogItem() {
  return {
    id: `produk-${Date.now()}`,
    name: "",
    category: "Kanopi",
    alt: "",
    priceAmount: "",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Hitam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      dimension: "Custom",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: [],
    desc: "",
  };
}

function emptyProjectItem(count = 1) {
  const num = String(count).padStart(2, "0");
  const year = String(new Date().getFullYear());
  return {
    id: `proyek-${Date.now()}`,
    category: "membrane",
    title: "",
    client: "",
    pekerjaan: "",
    lokasi: "",
    tahun: year,
    badge: `PROYEK ${num} / CANOPY`,
    place: `INDONESIA • ${year}`,
    images: [],
    image: "",
    alt: "",
    description: "",
    chips: [],
    scope: "",
    specs: [],
    highlights: [],
  };
}

/* ─── Image Gallery Uploader ────────────────────────────────────────────── */
function ImageGalleryEditor({ images = [], target, onChange, onError }) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadCmsImage(file, target);
        uploadedUrls.push(url);
      }
      onChange([...images, ...uploadedUrls]);
    } catch (err) {
      onError?.(err.message || "Gagal mengunggah foto.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeAt = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const makePrimary = (idx) => {
    if (idx === 0) return;
    const next = [...images];
    const [picked] = next.splice(idx, 1);
    next.unshift(picked);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={LABEL_CLS}>Foto ({images.length})</span>
        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-bold cursor-pointer hover:brightness-110 transition-all shadow-sm">
          {uploading ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              <span>Mengunggah...</span>
            </>
          ) : (
            <>
              <Icon name="add_photo_alternate" className="text-[17px]" />
              <span>Upload Foto</span>
            </>
          )}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            multiple
            disabled={uploading}
            onChange={handleFiles}
            className="hidden"
          />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-6 text-center text-xs text-on-surface-variant">
          Belum ada foto. Klik <strong>Upload Foto</strong> untuk menambahkan gambar (PNG, JPG, WEBP).
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="relative group rounded-xl overflow-hidden border border-outline-variant/40 bg-surface-container aspect-[4/3]"
            >
              <img src={src} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-primary/90 text-on-primary text-[10px] font-bold">
                  Utama
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => makePrimary(idx)}
                    title="Jadikan Foto Utama"
                    className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors"
                  >
                    <Icon name="star" className="text-[16px]" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  title="Hapus Foto"
                  className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Icon name="delete" className="text-[16px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Catalog Form Editor ───────────────────────────────────────────────── */
function CatalogItemEditor({ initialItem, isNew, onSave, onCancel, saving, onError }) {
  const [form, setForm] = useState(() => ({
    ...emptyCatalogItem(),
    ...initialItem,
    specs: { ...(initialItem?.specs || {}) },
    colors:
      Array.isArray(initialItem?.colors) && initialItem.colors.length
        ? initialItem.colors
        : DEFAULT_CATALOG_COLORS,
    images: Array.isArray(initialItem?.images) ? initialItem.images : [],
  }));

  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecVal, setNewSpecVal] = useState("");

  const updateField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const updateSpec = (key, val) =>
    setForm((prev) => ({ ...prev, specs: { ...prev.specs, [key]: val } }));
  const removeSpec = (key) =>
    setForm((prev) => {
      const next = { ...prev.specs };
      delete next[key];
      return { ...prev, specs: next };
    });

  const addSpec = () => {
    const k = newSpecKey.trim();
    const v = newSpecVal.trim();
    if (!k) return;
    updateSpec(k, v);
    setNewSpecKey("");
    setNewSpecVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      onError?.("Nama produk wajib diisi.");
      return;
    }
    const finalItem = {
      ...form,
      id: isNew ? slugify(form.name) : form.id,
      alt: form.alt.trim() || `${form.name} Pilar Canopy`,
    };
    onSave(finalItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-surface-container/30 p-5 rounded-2xl border border-outline-variant/40">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
        <h3 className="font-headline-sm text-lg font-bold text-primary">
          {isNew ? "Tambah Produk Katalog Baru" : `Edit Produk: ${initialItem?.name}`}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-on-surface-variant hover:text-primary px-3 py-1.5 rounded-lg border border-outline-variant/40"
        >
          Batal
        </button>
      </div>

      <ImageGalleryEditor
        images={form.images}
        target="catalog"
        onChange={(imgs) => updateField("images", imgs)}
        onError={onError}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLS}>Nama Produk *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Contoh: Canopy Membrane Double Wing"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Kategori *</label>
          <input
            type="text"
            required
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Contoh: Kanopi, Carport, Glamping, Awning, Tribun"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Harga Mulai (Angka)</label>
          <input
            type="text"
            value={form.priceAmount}
            onChange={(e) => updateField("priceAmount", e.target.value)}
            placeholder="Contoh: 750.000 (kosongkan jika Hubungi Kami)"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Satuan Harga</label>
          <input
            type="text"
            value={form.priceUnit}
            onChange={(e) => updateField("priceUnit", e.target.value)}
            placeholder="Contoh: /m, /m², /unit, atau kosongkan"
            className={INPUT_CLS}
          />
        </div>
      </div>

      <div>
        <label className={LABEL_CLS}>Deskripsi Produk</label>
        <textarea
          rows={3}
          value={form.desc}
          onChange={(e) => updateField("desc", e.target.value)}
          placeholder="Deskripsi singkat keunggulan dan penggunaan produk..."
          className={INPUT_CLS}
        />
      </div>

      <div>
        <label className={LABEL_CLS}>Alt Text Gambar (SEO)</label>
        <input
          type="text"
          value={form.alt}
          onChange={(e) => updateField("alt", e.target.value)}
          placeholder="Otomatis menggunakan nama produk jika dikosongkan"
          className={INPUT_CLS}
        />
      </div>

      {/* Specs Dinamis */}
      <div className="space-y-2.5 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40">
        <span className={LABEL_CLS}>Spesifikasi Teknis</span>
        {Object.entries(form.specs || {}).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <span className="w-28 shrink-0 text-xs font-bold text-primary capitalize">{k}</span>
            <input
              type="text"
              value={v}
              onChange={(e) => updateSpec(k, e.target.value)}
              className={`${INPUT_CLS} py-1.5 text-xs`}
            />
            <button
              type="button"
              onClick={() => removeSpec(k)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
              title="Hapus baris spesifikasi"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        ))}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 border-t border-outline-variant/20">
          <input
            type="text"
            value={newSpecKey}
            onChange={(e) => setNewSpecKey(e.target.value)}
            placeholder="Nama spec (mis. atap)"
            className={`${INPUT_CLS} sm:w-36 py-1.5 text-xs`}
          />
          <input
            type="text"
            value={newSpecVal}
            onChange={(e) => setNewSpecVal(e.target.value)}
            placeholder="Nilai spec (mis. Membrane 750 gsm)"
            className={`${INPUT_CLS} py-1.5 text-xs`}
          />
          <button
            type="button"
            onClick={addSpec}
            className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shrink-0"
          >
            + Tambah Spec
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-outline-variant/60 text-xs font-semibold text-primary hover:bg-surface-container"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:brightness-110 disabled:opacity-60 shadow-md"
        >
          <Icon name="save" className="text-[16px]" />
          <span>{saving ? "Menyimpan..." : "Simpan Produk"}</span>
        </button>
      </div>
    </form>
  );
}

/* ─── Portfolio Form Editor ─────────────────────────────────────────────── */
function ProjectItemEditor({ initialItem, isNew, totalCount, onSave, onCancel, saving, onError }) {
  const [form, setForm] = useState(() => ({
    ...emptyProjectItem(totalCount + 1),
    ...initialItem,
    images: Array.isArray(initialItem?.images) ? initialItem.images : [],
    chips: Array.isArray(initialItem?.chips) ? initialItem.chips : [],
    specs: Array.isArray(initialItem?.specs) ? initialItem.specs : [],
    highlights: Array.isArray(initialItem?.highlights) ? initialItem.highlights : [],
  }));

  const [chipsText, setChipsText] = useState((form.chips || []).join(", "));
  const [specsText, setSpecsText] = useState((form.specs || []).join("\n"));
  const [highlightsText, setHighlightsText] = useState((form.highlights || []).join("\n"));

  const updateField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      onError?.("Judul proyek wajib diisi.");
      return;
    }
    const imgs = form.images || [];
    const finalItem = {
      ...form,
      id: isNew ? slugify(form.title) : form.id,
      image: imgs[0] || "",
      alt: form.alt.trim() || `${form.title} ${form.client} ${form.lokasi}`.trim(),
      pekerjaan: form.pekerjaan.trim() || `Pekerjaan: ${form.title}`,
      place:
        form.place.trim() ||
        `${(form.lokasi || "INDONESIA").toUpperCase()} • ${form.tahun || new Date().getFullYear()}`,
      chips: chipsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      specs: specsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: highlightsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSave(finalItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-surface-container/30 p-5 rounded-2xl border border-outline-variant/40">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
        <h3 className="font-headline-sm text-lg font-bold text-primary">
          {isNew ? "Tambah Proyek Portofolio Baru" : `Edit Proyek: ${initialItem?.title}`}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-on-surface-variant hover:text-primary px-3 py-1.5 rounded-lg border border-outline-variant/40"
        >
          Batal
        </button>
      </div>

      <ImageGalleryEditor
        images={form.images}
        target="portfolio"
        onChange={(imgs) => updateField("images", imgs)}
        onError={onError}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLS}>Judul Proyek *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Contoh: Lapang Serbaguna FISIP"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Klien / Pemilik</label>
          <input
            type="text"
            value={form.client}
            onChange={(e) => updateField("client", e.target.value)}
            placeholder="Contoh: Universitas Padjadjaran"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Kategori Filter</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className={INPUT_CLS}
          >
            <option value="membrane">Tensile Membrane</option>
            <option value="glamping">Tenda Glamping</option>
            <option value="retractable">Retractable System</option>
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>Label Badge Kartu</label>
          <input
            type="text"
            value={form.badge}
            onChange={(e) => updateField("badge", e.target.value)}
            placeholder="Contoh: PROYEK 09 / LAPANGAN"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Lokasi</label>
          <input
            type="text"
            value={form.lokasi}
            onChange={(e) => updateField("lokasi", e.target.value)}
            placeholder="Contoh: Bandung"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Tahun</label>
          <input
            type="text"
            value={form.tahun}
            onChange={(e) => updateField("tahun", e.target.value)}
            placeholder="Contoh: 2026"
            className={INPUT_CLS}
          />
        </div>
      </div>

      <div>
        <label className={LABEL_CLS}>Lingkup Pekerjaan (Scope)</label>
        <input
          type="text"
          value={form.scope}
          onChange={(e) => updateField("scope", e.target.value)}
          placeholder="Contoh: Struktur atap lapang serbaguna kampus"
          className={INPUT_CLS}
        />
      </div>

      <div>
        <label className={LABEL_CLS}>Deskripsi Proyek</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Jelaskan detail proyek, material rangka, dan fungsi..."
          className={INPUT_CLS}
        />
      </div>

      <div>
        <label className={LABEL_CLS}>Tags / Chips (pisahkan dengan koma)</label>
        <input
          type="text"
          value={chipsText}
          onChange={(e) => setChipsText(e.target.value)}
          placeholder="Contoh: Tensile Membrane, Bandung, Struktur Baja"
          className={INPUT_CLS}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLS}>Spesifikasi Teknis (1 baris = 1 poin)</label>
          <textarea
            rows={4}
            value={specsText}
            onChange={(e) => setSpecsText(e.target.value)}
            placeholder={"Luas area: ±600 m²\nMaterial Rangka: Pipa Galvanized"}
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className={LABEL_CLS}>Keunggulan / Highlights (1 baris = 1 poin)</label>
          <textarea
            rows={4}
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            placeholder={"Bentang lebar tanpa kolom tengah\nGaransi material hingga 15 tahun"}
            className={INPUT_CLS}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-outline-variant/60 text-xs font-semibold text-primary hover:bg-surface-container"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:brightness-110 disabled:opacity-60 shadow-md"
        >
          <Icon name="save" className="text-[16px]" />
          <span>{saving ? "Menyimpan..." : "Simpan Proyek"}</span>
        </button>
      </div>
    </form>
  );
}

/* ─── Main CMS Modal ────────────────────────────────────────────────────── */
export default function CmsModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("catalog"); // "catalog" | "portfolio" | "settings"
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null); // { type: "success" | "error", text: string }

  const [catalog, setCatalog] = useState([]);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({
    catalogHeader: { eyebrow: "", heading: "", description: "" },
    projectsHeader: { eyebrow: "", heading: "", description: "" },
  });
  const [syncMode, setSyncMode] = useState("local");
  const [syncError, setSyncError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingCatalog, setEditingCatalog] = useState(null); // { item, isNew } | null
  const [editingProject, setEditingProject] = useState(null); // { item, isNew } | null

  const showNotice = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice((curr) => (curr?.text === text ? null : curr)), 5000);
  };

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    fetchCmsContent()
      .then((data) => {
        if (cancelled) return;
        setCatalog(data.catalog || []);
        setProjects(data.projects || []);
        if (data.settings) setSettings(data.settings);
        setSyncMode(data.syncMode || "local");
        setSyncError(data.syncError || null);
      })
      .catch((err) => {
        if (!cancelled) showNotice("error", err.message || "Gagal memuat CMS.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelled = true;
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const filteredCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(q) ||
        (c.category || "").toLowerCase().includes(q)
    );
  }, [catalog, searchQuery]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.client || "").toLowerCase().includes(q) ||
        (p.lokasi || "").toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  if (!open) return null;

  const handleSaveCatalogItem = async (savedItem) => {
    setSaving(true);
    try {
      const next = editingCatalog?.isNew
        ? [savedItem, ...catalog]
        : catalog.map((c) => (c.id === savedItem.id ? savedItem : c));
      const res = await saveCmsCatalog(next);
      setCatalog(res.data?.catalog || next);
      setSyncMode(res.data?.syncMode || syncMode);
      setSyncError(res.data?.syncError || null);
      setEditingCatalog(null);
      showNotice(
        "success",
        `Katalog "${savedItem.name}" berhasil disimpan & sitemap diperbarui (${res.sitemap?.totalImages || 0} gambar).`
      );
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCatalog = async (item) => {
    if (!window.confirm(`Hapus produk "${item.name}" dari katalog?`)) return;
    setSaving(true);
    try {
      const next = catalog.filter((c) => c.id !== item.id);
      const res = await saveCmsCatalog(next);
      setCatalog(res.data?.catalog || next);
      showNotice("success", `Produk "${item.name}" dihapus & sitemap diperbarui.`);
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProjectItem = async (savedItem) => {
    setSaving(true);
    try {
      const next = editingProject?.isNew
        ? [savedItem, ...projects]
        : projects.map((p) => (p.id === savedItem.id ? savedItem : p));
      const res = await saveCmsProjects(next);
      setProjects(res.data?.projects || next);
      setSyncMode(res.data?.syncMode || syncMode);
      setSyncError(res.data?.syncError || null);
      setEditingProject(null);
      showNotice(
        "success",
        `Proyek "${savedItem.title}" berhasil disimpan & sitemap diperbarui (${res.sitemap?.totalImages || 0} gambar).`
      );
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (item) => {
    if (!window.confirm(`Hapus proyek "${item.title}" dari portofolio?`)) return;
    setSaving(true);
    try {
      const next = projects.filter((p) => p.id !== item.id);
      const res = await saveCmsProjects(next);
      setProjects(res.data?.projects || next);
      showNotice("success", `Proyek "${item.title}" dihapus & sitemap diperbarui.`);
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await saveCmsSettings(settings);
      setSettings(res.data?.settings || settings);
      showNotice("success", "Teks heading & deskripsi halaman berhasil disimpan.");
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleManualSitemap = async () => {
    setSaving(true);
    try {
      const res = await regenerateCmsSitemap();
      showNotice(
        "success",
        `Sitemap berhasil di-generate ulang (${res.sitemap?.totalImages || 0} gambar terdaftar).`
      );
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSyncSheets = async () => {
    setLoading(true);
    try {
      const data = await syncCmsFromSheets();
      setCatalog(data.catalog || []);
      setProjects(data.projects || []);
      if (data.settings) setSettings(data.settings);
      setSyncMode(data.syncMode || "local");
      setSyncError(data.syncError || null);
      showNotice(
        data.syncMode === "sheets" ? "success" : "error",
        data.syncMode === "sheets"
          ? "Berhasil sinkronisasi dari Google Sheets."
          : data.syncError || "Berjalan di mode lokal."
      );
    } catch (err) {
      showNotice("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-2 sm:p-5"
      data-lenis-prevent
    >
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Content Management System"
        className="relative z-10 w-full max-w-6xl h-[92vh] rounded-3xl bg-surface-container-lowest shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-primary text-on-primary border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-md">
              <Icon name="dashboard_customize" className="text-[22px]" />
            </div>
            <div>
              <h2 className="font-headline-sm text-lg font-bold leading-tight">
                CMS Pilar Canopy
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    syncMode === "sheets" ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <span>
                  {syncMode === "sheets"
                    ? "Google Sheets Database Aktif"
                    : "Mode Lokal (Fallback JSON)"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSyncSheets}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
              title="Sinkronkan ulang dari Google Sheets"
            >
              <Icon name="sync" className={`text-[16px] ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Sinkron Sheets</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary text-white flex items-center justify-center transition-colors"
              aria-label="Tutup CMS"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-surface-container/60 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            {[
              { id: "catalog", label: `Katalog (${catalog.length})`, icon: "inventory_2" },
              { id: "portfolio", label: `Portofolio (${projects.length})`, icon: "work_history" },
              { id: "settings", label: "Teks & Sitemap", icon: "tune" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingCatalog(null);
                  setEditingProject(null);
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container-lowest text-on-surface-variant hover:text-primary border border-outline-variant/40"
                }`}
              >
                <Icon name={tab.icon} className="text-[16px]" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab !== "settings" && !editingCatalog && !editingProject && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-on-surface-variant"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant/50 bg-surface-container-lowest text-xs text-primary outline-none focus:border-secondary"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (activeTab === "catalog") {
                    setEditingCatalog({ item: emptyCatalogItem(), isNew: true });
                  } else {
                    setEditingProject({ item: emptyProjectItem(projects.length + 1), isNew: true });
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:brightness-110 shadow-sm shrink-0"
              >
                <Icon name="add" className="text-[17px]" />
                <span>{activeTab === "catalog" ? "Tambah Produk" : "Tambah Proyek"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Notice Banner */}
        {notice && (
          <div
            className={`mx-6 mt-4 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 ${
              notice.type === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                name={notice.type === "error" ? "error" : "check_circle"}
                className="text-[18px]"
              />
              <span>{notice.text}</span>
            </div>
            <button type="button" onClick={() => setNotice(null)}>
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}

        {syncError && syncMode === "local" && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
            <Icon name="info" className="text-[16px] text-amber-600 shrink-0" />
            <span>
              <strong>Info Penyimpanan:</strong> {syncError} Perubahan tetap tersimpan di server lokal dan langsung live.
            </span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="py-16 text-center text-sm text-on-surface-variant">
              Memuat data CMS...
            </div>
          ) : activeTab === "catalog" ? (
            editingCatalog ? (
              <CatalogItemEditor
                initialItem={editingCatalog.item}
                isNew={editingCatalog.isNew}
                onSave={handleSaveCatalogItem}
                onCancel={() => setEditingCatalog(null)}
                saving={saving}
                onError={(msg) => showNotice("error", msg)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCatalog.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest hover:border-secondary/60 transition-all shadow-sm"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant/40">
                          <Icon name="image" className="text-[24px]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-[10px] font-spec-code uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                          {item.category}
                        </span>
                        <h4 className="font-headline-sm text-sm font-bold text-primary truncate mt-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-secondary font-bold">
                          {item.priceAmount ? `Rp ${item.priceAmount}${item.priceUnit || ""}` : "Hubungi Kami"}
                          <span className="text-on-surface-variant font-normal ml-2">
                            • {item.images?.length || 0} foto
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setEditingCatalog({ item, isNew: false })}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary text-xs font-semibold transition-colors"
                        >
                          <Icon name="edit" className="text-[14px]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCatalog(item)}
                          disabled={saving}
                          className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-semibold transition-colors"
                          title="Hapus Produk"
                        >
                          <Icon name="delete" className="text-[15px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === "portfolio" ? (
            editingProject ? (
              <ProjectItemEditor
                initialItem={editingProject.item}
                isNew={editingProject.isNew}
                totalCount={projects.length}
                onSave={handleSaveProjectItem}
                onCancel={() => setEditingProject(null)}
                saving={saving}
                onError={(msg) => showNotice("error", msg)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex gap-4 p-4 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest hover:border-secondary/60 transition-all shadow-sm"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0">
                      {proj.images?.[0] || proj.image ? (
                        <img
                          src={proj.images?.[0] || proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant/40">
                          <Icon name="image" className="text-[24px]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-[10px] font-spec-code uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                          {proj.category} • {proj.tahun}
                        </span>
                        <h4 className="font-headline-sm text-sm font-bold text-primary truncate mt-1">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-on-surface-variant truncate">
                          {proj.client} — {proj.lokasi} ({proj.images?.length || 0} foto)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject({ item: proj, isNew: false })}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary text-xs font-semibold transition-colors"
                        >
                          <Icon name="edit" className="text-[14px]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj)}
                          disabled={saving}
                          className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-semibold transition-colors"
                          title="Hapus Proyek"
                        >
                          <Icon name="delete" className="text-[15px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-6 max-w-3xl">
              <form
                onSubmit={handleSaveSettings}
                className="space-y-6 bg-surface-container/30 p-5 rounded-2xl border border-outline-variant/40"
              >
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary mb-3">
                    Teks Header Section Katalog
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={LABEL_CLS}>Eyebrow</label>
                      <input
                        type="text"
                        value={settings.catalogHeader?.eyebrow || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            catalogHeader: { ...s.catalogHeader, eyebrow: e.target.value },
                          }))
                        }
                        className={INPUT_CLS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Heading</label>
                      <input
                        type="text"
                        value={settings.catalogHeader?.heading || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            catalogHeader: { ...s.catalogHeader, heading: e.target.value },
                          }))
                        }
                        className={INPUT_CLS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Deskripsi</label>
                      <textarea
                        rows={2}
                        value={settings.catalogHeader?.description || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            catalogHeader: { ...s.catalogHeader, description: e.target.value },
                          }))
                        }
                        className={INPUT_CLS}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-5">
                  <h3 className="font-headline-sm text-base font-bold text-primary mb-3">
                    Teks Header Section Portofolio
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={LABEL_CLS}>Eyebrow</label>
                      <input
                        type="text"
                        value={settings.projectsHeader?.eyebrow || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            projectsHeader: { ...s.projectsHeader, eyebrow: e.target.value },
                          }))
                        }
                        className={INPUT_CLS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Heading</label>
                      <input
                        type="text"
                        value={settings.projectsHeader?.heading || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            projectsHeader: { ...s.projectsHeader, heading: e.target.value },
                          }))
                        }
                        className={INPUT_CLS}
                      />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Deskripsi</label>
                      <textarea
                        rows={2}
                        value={settings.projectsHeader?.description || ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            projectsHeader: { ...s.projectsHeader, description: e.target.value },
                          }))
                        }
                        className={INPUT_CLS}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:brightness-110 disabled:opacity-60 shadow-md"
                  >
                    <Icon name="save" className="text-[16px]" />
                    <span>{saving ? "Menyimpan..." : "Simpan Teks Halaman"}</span>
                  </button>
                </div>
              </form>

              {/* Panel Auto-Sitemap */}
              <div className="bg-surface-container/30 p-5 rounded-2xl border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary">
                    SEO Sitemap Otomatis (sitemap.xml)
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Sitemap otomatis diperbarui setiap kali Anda menambah, mengubah, atau menghapus data Katalog maupun Portofolio.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border border-outline-variant/60 text-xs font-semibold text-primary hover:bg-surface-container"
                  >
                    Lihat XML
                  </a>
                  <button
                    type="button"
                    onClick={handleManualSitemap}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:brightness-110"
                  >
                    <Icon name="autorenew" className="text-[16px]" />
                    <span>Generate Ulang</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
