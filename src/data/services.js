// /* BARU */ Data Section Layanan (4 Layanan Utama + Banner Jasa Ganti Kain Membrane)
import { buildWhatsAppUrl } from "../lib/whatsapp";

export const SERVICES_HEADER = {
  eyebrow: "Layanan Kami",
  heading: "Solusi Terintegrasi Canopy & Struktur Rangka Baja",
  description:
    "Kami melayani kebutuhan konstruksi canopy membrane dari perencanaan awal hingga pemeliharaan berkala dengan jaminan standar mutu tinggi.",
};

export const SERVICES = [
  {
    number: "01",
    title: "Canopy Membrane Baru",
    description: "Desain custom untuk rumah, cafe, venue, dan area komersial.",
    icon: "roofing",
    tags: ["Custom Design", "Tensile Membrane", "Residensial & Komersial"],
  },
  {
    number: "02",
    title: "Struktur Rangka Baja",
    description: "Galvanized steel, hollow, pipe, WF/IWF, H-Beam.",
    icon: "construction",
    tags: ["Galvanized Steel", "Pipe & Hollow", "WF & H-Beam"],
  },
  {
    number: "03",
    title: "Struktur Pondasi",
    description: "Pondasi kokoh sesuai kondisi lokasi dan kebutuhan konstruksi.",
    icon: "foundation",
    tags: ["Bored Pile", "Footplate Cakar Ayam", "Angkur M24"],
  },
  {
    number: "04",
    title: "Perbaikan & Penggantian Membrane",
    description: "Perawatan dan ganti kain membrane pada canopy yang sudah terpasang.",
    icon: "build_circle",
    tags: ["Ganti Kain Baru", "Perawatan Berkala", "Retrofit Rangka"],
  },
];

export const FABRIC_REPLACEMENT_BANNER = {
  title: "Jasa Ganti Kain Membrane",
  description:
    "Punya kanopi membrane lama yang kusam, sobek, atau ingin peremajaan warna baru? Kami melayani penggantian kain membrane dengan material PVDF premium bergaransi tanpa perlu membongkar seluruh rangka eksisting.",
  buttonText: "Tanya Penggantian Membrane",
  buttonUrl: buildWhatsAppUrl(
    "Halo Pilar Canopy, saya ingin tanya mengenai Jasa Ganti Kain Membrane untuk kanopi saya."
  ),
};
