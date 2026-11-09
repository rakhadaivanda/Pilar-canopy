const CATALOG_IMAGE_BASE = "/images/katalog";

const catalogImages = (slug, count) =>
  Array.from(
    { length: count },
    (_, index) => `${CATALOG_IMAGE_BASE}/${slug}/${slug}-${index + 1}.png`
  );

export const CATALOG_HEADER = {
  eyebrow: "Katalog Resmi 2025–2026",
  heading: "Katalog Kanopi Membrane, Glamping Dome & Awning Modern",
  description:
    "Jelajahi koleksi kanopi membrane, carport, tenda glamping dome, dan awning retractable Pilar Canopy. Klik kartu untuk melihat semua foto & detail, atau tekan Tanya Harga untuk konsultasi langsung.",
};

export const CATALOG_ITEMS = [
  {
    id: "katalog-1",
    name: "Koleksi Katalog #01",
    category: "Tension Membrane",
    alt: "Kanopi membrane tensile premium struktur baja lengkung Pilar Canopy",
    images: catalogImages("kanopi-membrane-tensile", 9),
    desc: "Desain kanopi tensile membrane premium dengan struktur rangka baja lengkung aerodinamis untuk hunian dan komersial modern.",
  },
  {
    id: "katalog-2",
    name: "Koleksi Katalog #02",
    category: "Carport Membrane",
    alt: "Kanopi carport membrane elegan untuk dua hingga tiga mobil Pilar Canopy",
    images: catalogImages("kanopi-carport-membrane", 6),
    desc: "Kanopi carport membrane elegan dengan tiang sentral dan sayap membentang lebar, ideal untuk dua hingga tiga mobil.",
  },
  {
    id: "katalog-3",
    name: "Koleksi Katalog #03",
    category: "Curved Arch Membrane",
    alt: "Kanopi membrane busur kontinu untuk teras dan koridor Pilar Canopy",
    images: catalogImages("kanopi-membrane-busur", 6),
    desc: "Struktur busur kontinu ideal untuk teras samping, koridor, dan peneduh komersial fasilitas publik.",
  },
  {
    id: "katalog-4",
    name: "Koleksi Katalog #04",
    category: "Full Arch Walkway",
    alt: "Kanopi membrane walkway penghubung antar gedung Pilar Canopy",
    images: catalogImages("kanopi-membrane-walkway", 6),
    desc: "Model kanopi lorong pejalan kaki penghubung antar gedung, ideal untuk fasilitas publik dan kampus.",
  },
  {
    id: "katalog-5",
    name: "Koleksi Katalog #05",
    category: "Hypar Saddle Membrane",
    alt: "Kanopi membrane hypar saddle 3D premium Pilar Canopy",
    images: catalogImages("kanopi-membrane-hypar", 6),
    desc: "Sayap membran pelana hypar 3D eksklusif untuk villa, carport mewah, dan area komersial premium.",
  },
  {
    id: "katalog-6",
    name: "Koleksi Katalog #06",
    category: "Lean-To Membrane",
    alt: "Kanopi membrane lean to sandar dinding Pilar Canopy",
    images: catalogImages("kanopi-membrane-lean-to", 6),
    desc: "Kanopi membran sandar dinding efisien untuk townhouse, area terbatas, dan bangunan komersial.",
  },
  {
    id: "katalog-7",
    name: "Koleksi Katalog #07",
    category: "Geodesic Glamping Dome",
    alt: "Tenda glamping dome geodesik dengan jendela panorama Pilar Canopy",
    images: catalogImages("tenda-glamping-geodesic-dome", 9),
    desc: "Tenda dome wisata alam geodesic dengan jendela panorama kaca bayview untuk pengalaman menginap bintang.",
  },
  {
    id: "katalog-8",
    name: "Koleksi Katalog #08",
    category: "Cocoon Luxury Tent",
    alt: "Tenda glamping cocoon luxury untuk eco resort Pilar Canopy",
    images: catalogImages("tenda-glamping-cocoon", 9),
    desc: "Bentuk kepompong organik eksotik dan premium untuk eco-resort, glamping, dan akomodasi mewah.",
  },
  {
    id: "katalog-9",
    name: "Koleksi Katalog #09",
    category: "Safari Lodge Tent",
    alt: "Tenda glamping safari lodge untuk resort alam Pilar Canopy",
    images: catalogImages("tenda-glamping-safari-lodge", 9),
    desc: "Tenda safari plafon tinggi dengan kanopi teras depan lapang dan sejuk, ideal untuk resort alam.",
  },
  {
    id: "katalog-10",
    name: "Koleksi Katalog #10",
    category: "Tunnel Family Cabin",
    alt: "Tenda glamping tunnel family cabin kapasitas besar Pilar Canopy",
    images: catalogImages("tenda-glamping-tunnel-family", 9),
    desc: "Kabin lorong memanjang sekat multi-room untuk akomodasi liburan keluarga dan glamping kapasitas besar.",
  },
  {
    id: "katalog-11",
    name: "Koleksi Katalog #11",
    category: "Motorized Retractable",
    alt: "Awning motorized retractable otomatis remote dan sensor cuaca Pilar Canopy",
    images: catalogImages("awning-motorized-retractable", 9),
    desc: "Awning lipat elektrik bertenaga remote control dan sensor cuaca pintar untuk area komersial dan residensial.",
  },
  {
    id: "katalog-12",
    name: "Koleksi Katalog #12",
    category: "Commercial Awning",
    alt: "Awning komersial premium untuk cafe hotel dan restoran Pilar Canopy",
    images: catalogImages("awning-komersial", 9),
    desc: "Awning komersial premium penahan tempias, angin, dan panas untuk cafe, lobi hotel, dan restoran.",
  },
];
