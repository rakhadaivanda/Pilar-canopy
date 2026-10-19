// Portofolio — sumber: halaman "Pengalaman & Portofolio Proyek" pada katalog PDF (8 proyek).
// Foto diekstrak langsung dari katalog dan disimpan di src/assets/images/projects.
import unpad from "../assets/images/projects/unpad-fisip-bandung.jpg";
import pitstop from "../assets/images/projects/pitstop-fuel-jatim.jpg";
import technoPark from "../assets/images/projects/glamping-techno-park.jpg";
import padel from "../assets/images/projects/padel-bintaro.jpg";
import cgv from "../assets/images/projects/canopy-slide-cgv.jpg";
import gunungWalat from "../assets/images/projects/glamping-gunung-walat.jpg";
import pushPull from "../assets/images/projects/push-pull-retractable-tent.jpg";
import rumahCafe from "../assets/images/projects/canopy-rumah-cafe.jpg";

export const PROJECTS_HEADER = {
  eyebrow: "Pengalaman & Portofolio Proyek",
  heading: "Karya Struktur & Proyek Unggulan",
  description:
    "Geser untuk melihat pengalaman proyek Pilar Canopy tahun 2025–2026 dari portofolio resmi katalog kami.",
};

export const PROJECTS = [
  {
    id: "unpad-fisip",
    image: unpad,
    alt: "Proyek UNPAD FISIP Bandung — kanopi membrane lapang serbaguna",
    badge: "PROYEK 01 / LAPANG SERBAGUNA",
    place: "BANDUNG • 2026",
    client: "UNIVERSITAS PADJADJARAN",
    title: "Proyek UNPAD FISIP “Bandung”",
    description:
      "Pekerjaan lapang serbaguna Universitas Padjadjaran (FISIP) di Bandung dengan struktur rangka baja dan penutup membrane.",
    chips: ["Lapang Serbaguna", "Bandung"],
    year: "Tahun 2026",
  },
  {
    id: "pitstop-jatim",
    image: pitstop,
    alt: "Proyek Pit Stop Fuel Jawa Timur — kanopi membrane",
    badge: "PROYEK 02 / PIT STOP FUEL",
    place: "JAWA TIMUR • 2026",
    client: "PT. BSI / PT. TRUSTONE",
    title: "Proyek Pit Stop Fuel “Jatim”",
    description:
      "Pekerjaan pit stop fuel untuk PT. BSI / PT. Trustone di Jawa Timur, mencakup pondasi, rangka baja, dan penutup membrane.",
    chips: ["Pit Stop Fuel", "Jawa Timur"],
    year: "Tahun 2026",
  },
  {
    id: "glamping-techno-park",
    image: technoPark,
    alt: "Proyek Glamping Techno Park — 10 unit glamping dome di Cianjur",
    badge: "PROYEK 03 / GLAMPING DOME",
    place: "CIANJUR • 2025",
    client: "UNIVERSITAS GUNADARMA (UG-TECHNOPARK)",
    title: "Proyek Glamping Techno Park",
    description:
      "Pengerjaan 10 unit glamping dome untuk UG-TechnoPark Universitas Gunadarma di Cianjur.",
    chips: ["10 Unit Glamping Dome", "Cianjur"],
    year: "Tahun 2025",
  },
  {
    id: "padel-bintaro",
    image: padel,
    alt: "Proyek Lapang Padel Bintaro — rangka baja lengkung",
    badge: "PROYEK 04 / LAPANG PADEL",
    place: "BINTARO • 2025",
    client: "PERORANGAN (MILIK PRIBADI)",
    title: "Proyek Lapang Padel “Bintaro”",
    description:
      "Pekerjaan lapang padel milik pribadi di Bintaro dengan rangka baja lengkung dan penutup membrane.",
    chips: ["Lapang Padel", "Bintaro"],
    year: "Tahun 2025",
  },
  {
    id: "glamping-gunung-walat",
    image: gunungWalat,
    alt: "Proyek Glamping Gunung Walat Park — glamping PVC Alderon di Sukabumi",
    badge: "PROYEK 06 / GLAMPING PVC",
    place: "SUKABUMI • 2025",
    client: "PT. WANDRI JAYA",
    title: "Proyek Glamping Gunung Walat Park",
    description:
      "Pekerjaan glamping PVC Alderon untuk PT. Wandri Jaya di Sukabumi.",
    chips: ["Glamping PVC Alderon", "Sukabumi"],
    year: "Tahun 2025",
  },
  {
    id: "push-pull-tent",
    image: pushPull,
    alt: "Proyek Push Pull Retractable Tent — PT. ABC Kogen Dairy Milk Bandung",
    badge: "PROYEK 07 / RETRACTABLE TENT",
    place: "BANDUNG • 2026",
    client: "PT. ABC KOGEN DAIRY MILK",
    title: "Proyek Push Pull Retractable Tent",
    description:
      "Pekerjaan push pull retractable tent untuk PT. ABC Kogen Dairy Milk di Bandung.",
    chips: ["Push Pull Retractable Tent", "Bandung"],
    year: "Tahun 2026",
  },
  {
    id: "canopy-rumah-cafe",
    image: rumahCafe,
    alt: "Pekerjaan canopy rumah tinggal dan cafe — kanopi membrane carport",
    badge: "PROYEK 08 / RUMAH TINGGAL & CAFE",
    place: "JABODETABEK • 2025–2026",
    client: "RUMAH TINGGAL & CAFE",
    title: "Pekerjaan Canopy Rumah Tinggal & Cafe",
    description:
      "Pekerjaan canopy rumah dan cafe di wilayah Jabodetabek dan Jawa Barat selama 2025 hingga 2026.",
    chips: ["Canopy Rumah & Cafe", "Jabodetabek & Jawa Barat"],
    year: "Tahun 2025 – 2026",
  },
];
