// /* DIUBAH */ Navigasi utama HANYA 4 item sesuai aturan struktur:
// Beranda, Tentang Kami, Layanan, Kontak (ditambah tombol CTA "Hubungi Kami").
export const SERVICE_DROPDOWN_LINKS = [
  {
    label: "Layanan Kami",
    href: "#layanan",
    id: "layanan",
    desc: "Desain, fabrikasi, instalasi & perbaikan",
    icon: "home_repair_service",
  },
  {
    label: "Material & Spesifikasi",
    href: "#material",
    id: "material",
    desc: "Membrane PVDF, pipa baja & aksesoris",
    icon: "layers",
  },
  {
    label: "Portofolio & Pengalaman Proyek",
    href: "#portofolio",
    id: "portofolio",
    desc: "Proyek tensile membrane & glamping",
    icon: "photo_library",
  },
  {
    label: "Katalog",
    href: "#katalog",
    id: "katalog",
    desc: "Katalog model resmi Pilar Canopy",
    icon: "menu_book",
  },
];

export const NAV_LINKS = [
  { label: "Beranda", href: "#beranda", id: "beranda" },
  { label: "Tentang Kami", href: "#tentang", id: "tentang" },
  {
    label: "Layanan",
    href: "#layanan",
    id: "layanan",
    hasDropdown: true,
    children: SERVICE_DROPDOWN_LINKS,
  },
  { label: "Kontak", href: "#kontak", id: "kontak" },
];

export const MOBILE_LINKS = [
  { label: "Beranda", href: "#beranda", id: "beranda" },
  { label: "Tentang Kami", href: "#tentang", id: "tentang" },
  {
    label: "Layanan",
    href: "#layanan",
    id: "layanan",
    hasDropdown: true,
    children: SERVICE_DROPDOWN_LINKS,
  },
  { label: "Kontak", href: "#kontak", id: "kontak" },
];

// /* DIUBAH */ Link Tautan Cepat di footer persis 4 item sesuai menu navbar
export const FOOTER_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Kontak", href: "#kontak" },
];
