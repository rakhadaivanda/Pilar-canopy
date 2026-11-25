const CATALOG_IMAGE_BASE = "/images/katalog";

// Otomatis membaca semua file foto dari folder assets/images/projects/katalog/ (termasuk folder revisi baru)
const assetCatalogFiles = import.meta.glob(
  "../assets/images/projects/katalog/**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" }
);

/**
 * Mengambil foto katalog secara fleksibel:
 * 1. Jika slug cocok dengan folder di src/assets/images/projects/katalog/<slug>/, otomatis memuat semua fotonya.
 * 2. Jika tidak ada di assets, fallback membaca dari public/images/katalog/<slug>/
 */
const catalogImages = (slug, count) => {
  // Cari di assets berdasarkan nama folder slug
  const matchedAssets = Object.entries(assetCatalogFiles)
    .filter(([path]) => path.includes(`/katalog/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);

  if (matchedAssets.length > 0) {
    return typeof count === "number" && count > 0 && count < matchedAssets.length
      ? matchedAssets.slice(0, count)
      : matchedAssets;
  }

  // Fallback ke folder public
  return Array.from(
    { length: count || 1 },
    (_, index) => `${CATALOG_IMAGE_BASE}/${slug}/${slug}-${index + 1}.png`
  );
};

export const CATALOG_HEADER = {
  eyebrow: "Katalog Resmi 2025–2026",
  heading: "Katalog Kanopi Membrane, Glamping Dome & Awning Modern",
  description:
    "Jelajahi koleksi kanopi membrane, carport, tenda glamping dome, dan awning gulung retractable Pilar Canopy. Pilih varian warna yang diinginkan dan tekan Tanya Harga untuk estimasi biaya serta konsultasi teknis.",
};

export const DEFAULT_CATALOG_COLORS = [
  { id: "darkgreen", name: "Dark Green", hex: "#043205", label: "Dark Green" },
  { id: "warmpeach", name: "Warm Peach", hex: "#ffc877", label: "Warm Peach" },
  { id: "white", name: "Bright White", hex: "#ffffff", border: true, label: "Bright White" },
  { id: "royalblue", name: "Royal Blue", hex: "#0d00ff", label: "Royal Blue" },
  { id: "khaki", name: "Khaki Brown", hex: "#95815c", label: "Khaki Brown" },
  { id: "maroon", name: "Maroon Red", hex: "#7c1a22", label: "Maroon Red" },
];

export const CATALOG_ITEMS = [
  {
    id: "katalog-awning-gulung",
    name: "AWNING GULUNG",
    category: "Awning",
    alt: "Awning gulung lipat kanopi outdoor teras Pilar Canopy",
    priceAmount: "1.200.000",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Galvanis , Aluminium Alloys",
      dimension: "P 1m x L 1m (Lebar Max 3M)",
      kain: "Sunbrela/ RACASSEN / Dikcson / Paratampotes",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("awning-gulung", 1),
    desc: "Awning lipat gulung modern penahan sinar matahari & tempias air hujan dengan sistem manual / motorized untuk teras, kafe, dan balkon.",
  },
  {
    id: "katalog-classic-vase",
    name: "CLASSIC VASE",
    category: "Awning",
    alt: "Kanopi awning klasik lengkung penutup jendela exterior Pilar Canopy",
    priceAmount: "600.000",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Galvanis",
      dimension: "P 1m x L 1m",
      kain: "Sunbrela / RACASSEN / Dickson / Paratampotes",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("classic-vase-revisi", 1),
    desc: "Kanopi awning model klasik lengkung elegan untuk mempercantik eksterior jendela dan pintu bangunan bergaya eropa atau minimalis.",
  },
  {
    id: "katalog-awning-tombak",
    name: "AWNING TOMBAK",
    category: "Awning",
    alt: "Kanopi awning model tombak klasik penutup jendela exterior Pilar Canopy",
    priceAmount: "600.000",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Galvanis",
      dimension: "P 1m x L 1m",
      kain: "Sunbrela / RACASSEN / Dickson / Paratampotes",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("awning-tombak", 1),
    desc: "Kanopi awning model tombak klasik elegan untuk mempercantik eksterior jendela dan pintu bangunan bergaya eropa atau minimalis.",
  },
  {
    id: "katalog-kanopi-kain",
    name: "Kanopi Kain",
    category: "Awning",
    alt: "Kanopi awning model tombak klasik penutup jendela exterior Pilar Canopy",
    priceAmount: "600.000",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Galvanis",
      dimension: "P 1m x L 1m",
      kain: "Sunbrela / RACASSEN / Dickson / Paratampotes",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("kanopi-kain", 3),
    desc: "Kanopi awning model tombak klasik elegan untuk mempercantik eksterior jendela dan pintu bangunan bergaya eropa atau minimalis.",
  },
{
    id: "double-wing",
    name: "Canopy Membrane Double Wing Pavilion",
    category: "Kanopi",
    alt: "Canopy Membrane Double Wing Pavilion model gazebo lengkung outdoor Pilar Canopy",
    priceAmount: "550.000",
    priceUnit: "/m", 
    specs: {
      rangka: "Besi Hitam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      finishing: "Cat Dasar + Cat Duco",
      volume: "32 m",
      dimension: "Tinggi 3m L 7 m x P 4 m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("double-wing", 1),
    desc: "Canopy Membrane Double Wing Pavilion dengan desain estetis dan elegan, tahan segala cuaca, mudah dibersihkan, serta tahan lama 10–20 tahun untuk area outdoor dan taman.",
  },
  {
    id: "glamping-dome",
    name: "Glamping Dome",
    category: "Glamping",
    alt: "Tenda Glamping Dome struktur membrane lengkung modern Pilar Canopy",
    priceAmount: "45.500.000",
    priceUnit: "", // atau "/unit" jika komponen UI mewajibkan satuan
    specs: {
      rangka: "Besi Hitam Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      kusen: "Aluminium",
      volume: "70 m",
      dimension: "Tinggi 3m L 4 m x P 6 m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Merah", hex: "#ff0000" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#594a33" },
    ], // atau kembalikan ke DEFAULT_CATALOG_COLORS jika struktur objekmu pakai string array/konstanta
    images: catalogImages("glamping-dome", 1),
    desc: "Glamping Dome modern dengan rangka besi hitam galvanis kokoh, atap membrane 650 gsm tahan cuaca, dan kusen aluminium untuk kebutuhan penginapan glamping maupun resort outdoor.",
  },
  {
    id: "glamping-membrane-safari",
    name: "Glamping Membrane Safari",
    category: "Glamping",
    alt: "Tenda Glamping Membrane Safari dengan struktur rangka kokoh Pilar Canopy",
    priceAmount: "93.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hitam Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      kusen: "Aluminium",
      volume: "144 m",
      dimension: "Tinggi 3m L 7 m x P 9 m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("glamping-membrane-safari", 1),
    desc: "Glamping Membrane Safari eksklusif dengan rangka besi hitam galvanis tebal, atap membrane 650 gsm tahan cuaca, serta dimensi luas yang ideal untuk resor dan penginapan alam terbuka.",
  },

  {
    id: "glamping-doble-dome",
    name: "Glamping Doble Dome",
    category: "Glamping",
    alt: "Tenda Glamping Doble Dome dengan struktur rangka kokoh Pilar Canopy",
    priceAmount: "63.700.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hitam Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      kusen: "Aluminium",
      volume: "98 m",
      dimension: "Tinggi 3m L 4 m x P 6 m",
    },
    colors: [
      { name: "Pink Muda", hex: "#fcdcd2" },
      { name: "Coklat Abu", hex: "#8c7853" },
      { name: "Krem", hex: "#e5dcce" },
      { name: "Coklat Tua", hex: "#4a4033" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("glamping-doble-dome", 1),
    desc: "Glamping Doble Dome berkualitas tinggi dengan rangka besi hitam galvanis tebal, atap membrane 650 gsm tahan cuaca, serta dimensi yang luas untuk area resort dan penginapan alam.",
  },

  {
    id: "glamping-membran-cabin-wrap",
    name: "Glamping Membran Cabin Wrap",
    category: "Glamping",
    alt: "Tenda Glamping Membran Cabin Wrap dengan struktur rangka kokoh Pilar Canopy",
    priceAmount: "48.750.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hitam Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      kusen: "Aluminium",
      volume: "75 m",
      dimension: "Tinggi 3m L 4 m x 6 m",
    },
    colors: [
      { name: "Pink Muda", hex: "#fcdcd2" },
      { name: "Coklat Abu", hex: "#8c7853" },
      { name: "Krem", hex: "#dcd6c6" },
      { name: "Coklat Tua", hex: "#4a4033" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("glamping-membran-cabin-wrap", 1),
    desc: "Glamping Membran Cabin Wrap dengan rangka besi hitam galvanis tebal dan atap membrane 650 gsm yang kokoh, ideal untuk penginapan kabin bergaya modern di alam terbuka.",
  },

  {
    id: "geodesic-hybrid-shell",
    name: "Geodesic Hybrid Shell",
    category: "Glamping",
    alt: "Struktur Geodesic Hybrid Shell dengan desain modern dan kokoh Pilar Canopy",
    priceAmount: "650.000",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Hitam Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      kusen: "Aluminium",
      volume: "-",
      dimension: "Custom",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("geodesic-hybrid-shell", 1),
    desc: "Geodesic Hybrid Shell dengan rangka besi hitam galvanis tebal dan atap membrane 650 gsm, menghadirkan desain struktur hibrida modern yang elegan dan berukuran custom.",
  },
  {
    id: "glamping-barrel-arch-cabin",
    name: "Glamping Barrel Arch Cabin",
    category: "Glamping",
    alt: "Tenda Glamping Barrel Arch Cabin dengan struktur rangka kokoh Pilar Canopy",
    priceAmount: "69.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hitam Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      kusen: "Aluminium",
      dimension: "107 m",
      luasArea: "L 4m x P 6m x Tinggi 4 m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("glamping-barrel-arch-cabin", 1),
    desc: "Glamping Barrel Arch Cabin eksklusif dengan rangka besi hitam galvanis tebal dan atap membrane 650 gsm, dirancang kokoh dan elegan untuk resort atau penginapan alam.",
  },
  {
    id: "umbrella-canopy-custom",
    name: "Umbrella Canopy Custom",
    category: "Kanopi",
    alt: "Umbrella Canopy Custom dengan struktur kokoh dan desain elegan Pilar Canopy",
    priceAmount: "6.000.000",
    priceUnit: "/Unit Custom",
    specs: {
      keunggulan: "Garansi, Strong Structure, Precision, On-Time, After Sales",
      layananGratis: "Konsultasi, Design, Survey",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("umbrella-canopy-custom", 3),
    desc: "Umbrella Canopy Custom berkualitas tinggi dengan struktur yang kuat, presisi, serta layanan gratis konsultasi, desain, dan survei untuk area outdoor Anda.",
  },
  {
    id: "walkway-arch-tunnel",
    name: "Walkway Arch Tunnel",
    category: "Kanopi",
    alt: "Walkway Arch Tunnel struktur terowongan kanopi membrane lengkung Pilar Canopy",
    priceAmount: "17.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "27 m",
      dimension: "L 4m x P 6m x Tinggi 3,5 m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("walkway-arch-tunnel", 1),
    desc: "Walkway Arch Tunnel dengan rangka besi hitam/galvanis tebal dan atap membrane 650 gsm, dirancang khusus untuk jalur pejalan kaki yang elegan dan tahan cuaca.",
  },
  {
    id: "wave-cantilever-carport",
    name: "Wave Cantilever Carport",
    category: "Carport",
    alt: "Wave Cantilever Carport struktur kanopi carport membrane bergelombang Pilar Canopy",
    priceAmount: "16.900.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "26 m",
      dimension: "P 6m x L 3m Tinggi 3m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("wave-cantilever-carport", 1),
    desc: "Wave Cantilever Carport dengan rangka besi hitam/galvanis tebal dan atap membrane 650 gsm, menghadirkan desain struktur carport bergelombang yang kokoh, elegan, dan fungsional.",
  },
  {
    id: "curved-arch-carport",
    name: "Curved Arch Carport",
    category: "Carport",
    alt: "Curved Arch Carport struktur kanopi carport lengkung membrane Pilar Canopy",
    priceAmount: "13.950.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "21,5 m",
      dimension: "P 4m x L 4,5m Tinggi 3,5m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("curved-arch-carport", 1),
    desc: "Curved Arch Carport dengan rangka besi hitam/galvanis tebal dan atap membrane 650 gsm, menghadirkan desain struktur carport lengkung yang elegan, kokoh, dan tahan lama.",
  },
  {
    id: "model-double-cantilever-parking",
    name: "Model Double Cantilever Parking",
    category: "Carport",
    alt: "Model Double Cantilever Parking struktur kanopi parkir ganda membrane Pilar Canopy",
    priceAmount: "20.150.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "31 m",
      dimension: "P 4m x L 7m Tinggi 3,5m",
    },
    colors: [
      { name: "Hijau Tua", hex: "#004d00" },
      { name: "Krem", hex: "#ffcc80" },
      { name: "Putih", hex: "#ffffff" },
      { name: "Biru", hex: "#0000ff" },
      { name: "Coklat Tua", hex: "#8c7853" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("model-double-cantilever-parking", 1),
    desc: "Model Double Cantilever Parking dengan rangka besi hitam/galvanis tebal dan atap membrane 650 gsm, dirancang kokoh dan luas untuk area parkir kendaraan modern.",
  },
{
    id: "cantilever-luxury-parking",
    name: "Cantilever Luxury Parking",
    category: "Carport",
    alt: "Cantilever Luxury Parking struktur kanopi parkir mewah beratap membrane Pilar Canopy",
    priceAmount: "15.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "24 m",
      dimension: "P 6m x L 4m Tinggi 3,5m",
    },
    colors: [
      { name: "Putih", hex: "#ffffff" },
      { name: "Pink Muda", hex: "#fcdcd2" },
      { name: "Coklat Tua", hex: "#8c7853" },
      { name: "Krem", hex: "#dcd6c6" },
      { name: "Hijau Tua", hex: "#004d00" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("cantilever-luxury-parking", 1),
    desc: "Cantilever Luxury Parking dengan rangka besi hitam/galvanis tebal dan atap membrane 650 gsm, menghadirkan struktur kanopi parkir mewah yang elegan, kokoh, dan berkelas untuk area komersial maupun hunian.",
  },
  {
    id: "butterfly-luxury-parking",
    name: "Butterfly Luxury Parking",
    category: "Carport",
    alt: "Butterfly Luxury Parking struktur kanopi parkir mewah berbentuk kupu-kupu beratap membrane Pilar Canopy",
    priceAmount: "22.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "34 m",
      dimension: "P 4m x L 8m Tinggi 3,5m",
    },
    colors: [
      { name: "Putih", hex: "#ffffff" },
      { name: "Pink Muda", hex: "#fcdcd2" },
      { name: "Coklat Tua", hex: "#8c7853" },
      { name: "Krem", hex: "#dcd6c6" },
      { name: "Hijau Tua", hex: "#004d00" },
    ], // Atau gunakan DEFAULT_CATALOG_COLORS jika format warnanya berupa array konstanta string
    images: catalogImages("butterfly-luxury-parking", 1),
    desc: "Butterfly Luxury Parking dengan rangka besi hitam/galvanis tebal dan atap membrane 650 gsm, menghadirkan desain struktur kanopi parkir mewah model kupu-kupu yang megah dan elegan.",
  },
{
    id: "canopy-membrane-lapangan-serbaguna",
    name: "Canopy Membrane Lapangan Serbaguna",
    category: "Lapangan",
    alt: "Canopy Membrane Lapangan Serbaguna struktur bentang lebar untuk lapangan olahraga Pilar Canopy Perkasa",
    priceAmount: "90.750.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 750 gsm",
      volume: "121 m",
      dimension: "P 11m x L 10m Tinggi 6m[cite: 16]",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-membrane-lapangan-serbaguna", 1),
    desc: "Canopy Membrane Lapangan Serbaguna dengan rangka besi hitam/galvanis tebal dan atap membrane 750 gsm, dirancang kokoh dengan bentang luas untuk lapangan olahraga dan area serbaguna[cite: 16].",
  },
  {
    id: "canopy-membrane-pool-shelter",
    name: "Canopy Membrane Pool Shelter",
    category: "Kanopi",
    alt: "Canopy Membrane Pool Shelter struktur penutup kolam renang beratap membrane Pilar Canopy",
    priceAmount: "71.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      dimension: "10 m x 10 m x T 6 m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-membrane-pool-shelter", 1),
    desc: "Canopy Membrane Pool Shelter dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang kokoh dan luas untuk melindungi area kolam renang outdoor dengan elegan.",
  },
  {
    id: "canopy-membrane-lengkung-single-frame",
    name: "Canopy Membrane Lengkung Single Frame",
    category: "Kanopi",
    alt: "Canopy Membrane Lengkung Single Frame struktur penutup area kolam beratap membrane Pilar Canopy",
    priceAmount: "36.200.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      dimension: "6 m x 4 m x 2 unit",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-membrane-lengkung-single-frame", 1),
    desc: "Canopy Membrane Lengkung Single Frame dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang kokoh dan elegan untuk perlindungan area outdoor seperti kolam renang[cite: 18].",
  },
  {
    id: "kanopi-membran-s-curve-luxury",
    name: "Kanopi Membran S-Curve Luxury",
    category: "Kanopi",
    alt: "Kanopi Membran S-Curve Luxury struktur kanopi lengkung mewah beratap membrane Pilar Canopy",
    priceAmount: "19.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      dimension: "Tinggi 4m L 6 m x 4 m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("kanopi-membran-s-curve-luxury", 1),
    desc: "Kanopi Membran S-Curve Luxury dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, menghadirkan desain struktur kurva mewah yang elegan dan kokoh untuk area outdoor.",
  },
{
    id: "canopy-membrane-model-barrel-arch",
    name: "Canopy Membrane Model Barrel Arch",
    category: "Kanopi",
    alt: "Canopy Membrane Model Barrel Arch struktur kanopi lengkung terowongan beratap membrane Pilar Canopy",
    priceAmount: "18.200.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      dimension: "Tinggi 4m L 6m x P 4m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-membrane-model-barrel-arch", 1),
    desc: "Canopy Membrane Model Barrel Arch dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, menghadirkan struktur kanopi lengkung model barrel arch yang kokoh, luas, dan elegan untuk area outdoor.",
  },
  {
    id: "double-cantilever-gate",
    name: "Double Cantilever Gate",
    category: "Gerbang",
    alt: "Double Cantilever Gate struktur kanopi gerbang ganda beratap membrane Pilar Canopy",
    priceAmount: "35.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "",
      dimension: "T 4m L 4m x P 4m (3 unit)",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("double-cantilever-gate", 1),
    desc: "Double Cantilever Gate dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang kokoh dan elegan untuk struktur gerbang masuk atau area gerbang perumahan.",
  },
{
    id: "asymmetric-wave",
    name: "Asymmetric Wave",
    category: "Kanopi",
    alt: "Asymmetric Wave struktur kanopi membrane asimetris bergelombang Pilar Canopy",
    priceAmount: "24.700.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "",
      dimension: "Tinggi 4m L 8m x P 4m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("asymmetric-wave", 1),
    desc: "Asymmetric Wave dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, menghadirkan struktur kanopi gelombang asimetris yang modern, kokoh, dan fungsional.",
  },
  {
    id: "canopy-butterfly-arch",
    name: "Canopy Butterfly Arch",
    category: "Kanopi",
    alt: "Canopy Butterfly Arch struktur kanopi membrane model kupu-kupu Pilar Canopy",
    priceAmount: "23.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm PVDF",
      volume: "",
      dimension: "Tinggi 4m L 8m x P 4m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-butterfly-arch", 1),
    desc: "Canopy Butterfly Arch dengan rangka besi galvanis tebal 2,8 mm dan atap membrane 650 gsm PVDF, dirancang dengan struktur model kupu-kupu yang megah, kokoh, dan elegan untuk area outdoor.",
  },
  {
    id: "canopy-teras",
    name: "Canopy Teras",
    category: "Kanopi",
    alt: "Canopy Teras struktur kanopi teras bangunan beratap membrane Pilar Canopy",
    priceAmount: "650.000",
    priceUnit: "/m",
    specs: {
      rangka: "Besi Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm PVDF",
      volume: "-",
      dimension: "Custom",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-teras", 1),
    desc: "Canopy Teras dengan rangka besi galvanis tebal 2,8 mm dan atap membrane 650 gsm PVDF, dirancang khusus untuk melindungi serta mempercantik area teras atau balkon bangunan dengan ukuran custom.",
  },
  {
    id: "canopy-gelombang-sinus",
    name: "Canopy Gelombang Sinus",
    category: "Kanopi",
    alt: "Canopy Gelombang Sinus struktur kanopi beratap membrane bentuk gelombang sinus Pilar Canopy",
    priceAmount: "16.900.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm PVDF",
      volume: "26 m",
      dimension: "Tinggi 3m L 6m x P 4m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-gelombang-sinus", 1),
    desc: "Canopy Gelombang Sinus dengan rangka besi galvanis tebal 2,8 mm dan atap membrane 650 gsm PVDF, menghadirkan desain struktur gelombang yang unik, kokoh, dan elegan untuk area outdoor.",
  },
  {
    id: "canopy-laser-cut-cantilever",
    name: "Canopy Laser Cut Cantilever",
    category: "Carport",
    alt: "Canopy Laser Cut Cantilever struktur kanopi cantilever dengan ornamen laser cut beratap membrane Pilar Canopy",
    priceAmount: "17.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm PVDF",
      volume: "27 m",
      dimension: "Tinggi 3,5m L 4m x P 6m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-laser-cut-cantilever", 1),
    desc: "Canopy Laser Cut Cantilever dengan rangka besi galvanis tebal 2,8 mm dan atap membrane 650 gsm PVDF, menghadirkan desain struktur cantilever modern berornamen laser cut yang artistik, kokoh, dan elegan.",
  },
  {
    id: "canopy-perforated-cantilever",
    name: "Canopy Perforated Cantilever",
    category: "Carport",
    alt: "Canopy Perforated Cantilever struktur kanopi cantilever berlubang estetik beratap membrane Pilar Canopy",
    priceAmount: "27.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm PVDF",
      volume: "41 m",
      dimension: "Tinggi 3m L 4m x P 9m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-perforated-cantilever", 1),
    desc: "Canopy Perforated Cantilever dengan rangka besi galvanis tebal 2,8 mm dan atap membrane 650 gsm PVDF, menghadirkan desain struktur cantilever berlubang artistik yang kokoh, luas, dan elegan untuk area parkir.",
  },
  {
    id: "canopy-pavilion-arch-series",
    name: "Canopy Pavilion Arch Series",
    category: "Kanopi",
    alt: "Canopy Pavilion Arch Series struktur kanopi lengkung model paviliun beratap membrane Pilar Canopy",
    priceAmount: "17.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm PVDF",
      volume: "26,5m",
      dimension: "Tinggi 4m L 4m x P 5m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-pavilion-arch-series", 1),
    desc: "Canopy Pavilion Arch Series dengan rangka besi galvanis tebal 2,8 mm dan atap membrane 650 gsm PVDF, menghadirkan desain struktur kanopi lengkung model paviliun yang kokoh, fungsional, dan elegan untuk area outdoor.",
  },
  {
    id: "canopy-barrel-arch-truss-wide-span",
    name: "Canopy Barrel Arch Truss Wide Span",
    category: "Lapangan",
    alt: "Canopy Barrel Arch Truss Wide Span struktur kanopi bentang lebar beratap membrane Pilar Canopy",
    priceAmount: "78.650.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "121 m",
      dimension: "P 10m x L 11m Tinggi 6m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-barrel-arch-truss-wide-span", 1),
    desc: "Canopy Barrel Arch Truss Wide Span dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang kokoh dengan bentang lebar untuk area lapangan atau fasilitas luas.",
  },
  {
    id: "sports-court-canopy",
    name: "Sports Court Canopy",
    category: "Lapangan",
    alt: "Sports Court Canopy struktur kanopi lapangan olahraga beratap membrane Pilar Canopy",
    priceAmount: "137.900.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "212 m",
      dimension: "P 11m x L 10m Tinggi 6m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("sports-court-canopy", 1),
    desc: "Sports Court Canopy dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang kokoh dan luas untuk melindungi area lapangan olahraga secara maksimal.",
  },
  {
    id: "liceria-vase-set",
    name: "Liceria Vase Set",
    category: "Kanopi",
    alt: "Liceria Vase Set struktur kanopi besar beratap membrane Pilar Canopy",
    priceAmount: "145.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "223 m",
      dimension: "P 10m x L 11m Tinggi 7,5m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("liceria-vase-set", 1),
    desc: "Liceria Vase Set dengan rangka galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang kokoh dengan bentang luas untuk perlindungan area fasilitas outdoor berukuran besar.",
  },
  {
    id: "canopy-umbrella",
    name: "Canopy Umbrella",
    category: "Kanopi",
    alt: "Canopy Umbrella struktur kanopi payung besar beratap membrane Pilar Canopy",
    priceAmount: "75.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "115 m",
      dimension: "Ø10 m tinggi 6 m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-umbrella", 1),
    desc: "Canopy Umbrella dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 650 gsm, dirancang dengan struktur payung yang luas, kokoh, dan estetik untuk area publik atau taman outdoor.",
  },
  {
    id: "canopy-layang-layang",
    name: "Canopy Layang Layang",
    category: "Kanopi",
    alt: "Canopy Layang Layang struktur kanopi bentuk layang-layang beratap membrane Pilar Canopy",
    priceAmount: "750.000",
    priceUnit: "/ m",
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 3 mm",
      atap: "Membrane 750 gsm",
      volume: "",
      dimension: "custom",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("canopy-layang-layang", 1),
    desc: "Canopy Layang Layang dengan rangka besi hitam/galvanis tebal 3 mm dan atap membrane 750 gsm, menghadirkan desain struktur model layang-layang yang unik, artistik, dan megah untuk area outdoor.",
  },
  {
    id: "hyperbolic-canopy",
    name: "Hyperbolic Canopy",
    category: "Kanopi",
    alt: "Hyperbolic Canopy struktur kanopi bentuk hiperbolik beratap membrane Pilar Canopy",
    priceAmount: "15.600.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "24 m",
      dimension: "P 4m x L 6m Tinggi 3m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("hyperbolic-canopy", 1),
    desc: "Hyperbolic Canopy dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 650 gsm, menghadirkan desain struktur hiperbolik yang artistik, modern, dan kokoh untuk area outdoor.",
  },
  {
    id: "grand-entrance-arch",
    name: "Grand Entrance Arch",
    category: "Gerbang",
    alt: "Grand Entrance Arch struktur kanopi lengkung pintu masuk utama beratap membrane Pilar Canopy",
    priceAmount: "13.650.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 650 gsm",
      volume: "21 m",
      dimension: "P 6m x L 3m Tinggi 3m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("grand-entrance-arch", 1),
    desc: "Grand Entrance Arch dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 650 gsm, menghadirkan struktur kanopi lengkung yang megah dan elegan untuk area pintu masuk utama bangunan.",
  },
  {
    id: "liceria-vase",
    name: "Liceria Vase",
    category: "Kanopi",
    alt: "Liceria Vase struktur kanopi carport atau teras beratap membrane Pilar Canopy",
    priceAmount: "", // Tidak tertera harga pada gambar
    priceUnit: "",
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 750 gsm",
      volume: "16 m",
      dimension: "P 4m x L 4m Tinggi 3m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("liceria-vase", 1),
    desc: "Liceria Vase dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 750 gsm, menghadirkan struktur kanopi lengkung yang kokoh dan elegan untuk melindungi area teras atau carport bangunan.",
  },
  {
    id: "liceria-vase-set",
    name: "Liceria Vase Set",
    category: "Kanopi",
    alt: "Liceria Vase Set struktur kanopi carport atau teras beratap membrane Pilar Canopy",
    priceAmount: "", // Tidak tertera harga pada gambar
    priceUnit: "",
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 2,8 mm",
      atap: "Membrane 750 gsm",
      volume: "16 m",
      dimension: "P 4m x L 4m Tinggi 3m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("liceria-vase-set", 3),
    desc: "Liceria Vase Set dengan rangka besi hitam/galvanis tebal 2,8 mm dan atap membrane 750 gsm, menghadirkan struktur kanopi lengkung yang kokoh dan elegan untuk melindungi area teras atau carport bangunan.",
  },
  {
    id: "tribun-canopy-membrane",
    name: "Tribun Canopy Membrane",
    category: "Tribun",
    alt: "Tribun Canopy Membrane struktur kanopi tribun lapangan beratap membrane Pilar Canopy",
    priceAmount: "225.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 3 mm",
      atap: "Membrane 750 gsm",
      volume: "300 m",
      dimension: "P 20m x L 12,5m Tinggi 9m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("tribun-canopy-membrane", 1),
    desc: "Tribun Canopy Membrane dengan rangka besi hitam/galvanis tebal 3 mm dan atap membrane 750 gsm, menghadirkan struktur kanopi tribun yang sangat kokoh, luas, dan megah untuk fasilitas lapangan olahraga.",
  },
  {
    id: "track-and-field-tribune",
    name: "Track & Field Tribune",
    category: "Tribun",
    alt: "Track & Field Tribune struktur kanopi tribun lintasan lari beratap membrane Pilar Canopy",
    priceAmount: "135.000.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 3 mm",
      atap: "Membrane 750 gsm",
      volume: "180 m",
      dimension: "P 20m x L 8m Tinggi 6m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("track-and-field-tribune", 1),
    desc: "Track & Field Tribune dengan rangka besi hitam/galvanis tebal 3 mm dan atap membrane 750 gsm, dirancang kokoh dan luas untuk melindungi area tribun lintasan lari serta lapangan olahraga.",
  },
  {
    id: "stadium-grandstand-arch",
    name: "Stadium Grandstand Arch",
    category: "Tribun",
    alt: "Stadium Grandstand Arch struktur kanopi tribun stadion beratap membrane Pilar Canopy",
    priceAmount: "217.500.000",
    priceUnit: "", // Kosongkan atau sesuaikan dengan satuan di UI jika ada
    specs: {
      rangka: "Besi Hiam / Galvanis Tebal 3 mm",
      atap: "Membrane 750 gsm",
      volume: "290 m",
      dimension: "P 20m x L 13m Tinggi 12m",
    },
    colors: DEFAULT_CATALOG_COLORS,
    images: catalogImages("stadium-grandstand-arch", 1),
    desc: "Stadium Grandstand Arch dengan rangka besi hitam/galvanis tebal 3 mm dan atap membrane 750 gsm, dirancang sangat megah, kokoh, dan luas untuk perlindungan area tribun stadion utama.",
  },
];

