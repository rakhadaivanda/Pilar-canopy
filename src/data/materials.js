// Seksi "Detail Spesifikasi" — sumber: halaman "Solusi Konstruksi Berkelanjutan dan Ramah Lingkungan"
// (Membrane, Struktur Rangka, Aksesoris Berkualitas) dan "Estimasi Harga" pada katalog PDF.
import imgRangka from "../assets/images/materials/struktur-rangka.jpg";
import imgAksesoris from "../assets/images/materials/aksesoris.jpg";
import imgMembrane from "../assets/images/materials/membrane.jpg";

export const MATERIALS_HEADER = {
  eyebrow: "Katalog Material 2025 – 2026",
  heading: "Detail Spesifikasi Membrane, Rangka & Aksesoris Berkualitas",
  description:
    "Pilih tab di bawah untuk meninjau material membrane, struktur rangka baja, dan aksesoris stainless steel, lengkap dengan pilihan warna standar Pilar Canopy. Pemilihan material disesuaikan dengan desain, fungsi, lingkungan, bentang, beban, dan kebutuhan proyek.",
};

// Catatan: kelas Tailwind untuk warna swatch ditulis utuh agar terdeteksi oleh Tailwind (JIT).
export const MATERIAL_TABS = [
  {
    id: "rangka",
    tabLabel: "Tab 01: Struktur Rangka Baja",
    tabIcon: "construction",
    panel: {
      badge: "SPESIFIKASI RANGKA 01",
      title: "STRUKTUR RANGKA",
      fields: [
        { label: "Materials Rangka", value: "Galvanized Steel", variant: "primary" },
        { label: "Jenis Material Profil", value: "Hollow Steel, Pipe, WF / IWF, H-Beam" },
        { label: "Finishing", value: "Cat Duco + Cat Dasar" },
      ],
      swatchLabel: "Pilihan Warna Standard (Klik untuk Pratinjau):",
      swatches: [
        { name: "Orange", dotClass: "bg-[#f26522] border border-white/20", desc: "Finishing warna Orange" },
        { name: "Blue", dotClass: "bg-[#0052cc] border border-white/20", desc: "Finishing warna Blue" },
        { name: "Black", dotClass: "bg-[#111111] border border-white/20", desc: "Finishing warna Black" },
        { name: "White", dotClass: "bg-[#ffffff] border border-black/20", desc: "Finishing warna White", labelClass: "text-white" },
      ],
      footnote:
        "• Pemilihan material disesuaikan dengan desain, fungsi, lingkungan, bentang, beban, dan kebutuhan proyek",
      image: {
        src: imgRangka,
        alt: "Struktur rangka baja kanopi membrane Pilar Canopy",
        position: "object-top",
        caption: "Foto Rangka Terpasang",
        detail: "Struktur Rangka Baja Kanopi Membrane",
        badge: "Galvanized",
      },
      imageFirst: false,
    },
  },
  {
    id: "aksesoris",
    tabLabel: "Tab 02: Aksesoris Berkualitas & Rigging",
    tabIcon: "cable",
    panel: {
      badge: "SPESIFIKASI AKSESORIS 02",
      title: "AKSESORIS BERKUALITAS",
      fields: [
        { label: "Materials Hardware", value: "Stainless Steel", variant: "primary" },
        {
          label: "Jenis Material & Komponen",
          value: "Kedder, Clamplate, Span Screw, Kawat Seling, Shackle, Anchor Point, Turnbuckle",
        },
        { label: "Finishing", value: "Pabrikasi" },
        { label: "Pemilihan Komponen", value: "Disesuaikan dengan bentang & beban proyek", variant: "mono" },
      ],
      footnote: "• Aksesoris stainless steel dengan finishing pabrikasi",
      image: {
        src: imgAksesoris,
        alt: "Aksesoris tension hardware stainless steel Pilar Canopy",
        position: "object-top",
        caption: "Tension Hardware Joint",
        detail: "Kedder, Anchor Point, Turnbuckle & Kawat Seling",
        badge: "Stainless Steel",
      },
      imageFirst: true,
    },
  },
  {
    id: "membrane",
    tabLabel: "Tab 03: Membrane PVC & PVDF",
    tabIcon: "layers",
    panel: {
      badge: "SPESIFIKASI MEMBRANE 03",
      title: "MEMBRANE",
      fields: [
        { label: "Materials Membrane", value: "PVC Membrane / PVDF Membrane", variant: "primary" },
        { label: "Jenis Material", value: "Architectural Fabric" },
        { label: "Pilihan Ketebalan", value: "420, 550, 650, 750, 900 GSM" },
        { label: "Estimasi Harga", value: "Mulai Rp500.000 – Rp900.000 / meter", variant: "mono" },
      ],
      swatchLabel: "Pilihan Warna Membrane (Klik untuk Pratinjau):",
      swatches: [
        { name: "Blue", dotClass: "bg-[#1e4080] border border-white/20", desc: "Membrane warna Blue" },
        { name: "Black", dotClass: "bg-[#111111] border border-white/20", desc: "Membrane warna Black" },
        { name: "Yellow", dotClass: "bg-[#e8c94a] border border-white/20", desc: "Membrane warna Yellow" },
        { name: "White", dotClass: "bg-[#ffffff] border border-black/20", desc: "Membrane warna White", labelClass: "text-white" },
      ],
      footnote:
        "• Garansi membrane 10 s/d 20 tahun. Harga dapat berubah sesuai spesifikasi dan kondisi proyek",
      image: {
        src: imgMembrane,
        alt: "Pilihan warna dan material membrane PVC & PVDF Pilar Canopy",
        position: "object-center",
        caption: "Pilihan Warna & Ketebalan",
        detail: "PVC & PVDF Architectural Fabric",
        badge: "10–20 TH",
      },
      imageFirst: false,
    },
  },
];
