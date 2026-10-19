// /* DIUBAH */ Data Portofolio & Pengalaman Proyek Resmi Pilar Canopy (8 Proyek Utama)
// Hanya menampilkan proyek nyata klien, terpisah dari Katalog Produk.

// ── UNPAD ────────────────────────────────────────────────────────────────────
import unpad1 from "../assets/images/projects/portofolio/unpad(1).jpg";
import unpad2 from "../assets/images/projects/portofolio/unpad(2).png";
import unpad3 from "../assets/images/projects/portofolio/unpad(3).png";
import unpad4 from "../assets/images/projects/portofolio/unpad(4).png";

// ── PITSTOP ──────────────────────────────────────────────────────────────────
import pitstop1 from "../assets/images/projects/portofolio/pitstop(1).jpg";
import pitstop2 from "../assets/images/projects/portofolio/pitstop(2).png";
import pitstop3 from "../assets/images/projects/portofolio/pitstop(3).png";
import pitstop4 from "../assets/images/projects/portofolio/pitstop(4).png";

// ── GLAMPING (TechnoPark) ─────────────────────────────────────────────────────
import glamping1 from "../assets/images/projects/portofolio/glamping(1).jpg";
import glamping2 from "../assets/images/projects/portofolio/glamping(2).png";
import glamping3 from "../assets/images/projects/portofolio/glamping(3).png";
import glamping4 from "../assets/images/projects/portofolio/glamping(4).png";

// ── PADEL ────────────────────────────────────────────────────────────────────
import padel1 from "../assets/images/projects/portofolio/padel(1).png";
import padel2 from "../assets/images/projects/portofolio/padel(2).png";
import padel3 from "../assets/images/projects/portofolio/padel(3).png";
import padel4 from "../assets/images/projects/portofolio/padel(4).png";

// ── CGV ──────────────────────────────────────────────────────────────────────
import cgv1 from "../assets/images/projects/portofolio/cgv(1).png";
import cgv2 from "../assets/images/projects/portofolio/cgv(2).png";
import cgv3 from "../assets/images/projects/portofolio/cgv(3).png";
import cgv4 from "../assets/images/projects/portofolio/cgv(4).png";

// ── WALAT ─────────────────────────────────────────────────────────────────────
import walat1 from "../assets/images/projects/portofolio/walat(1).png";
import walat2 from "../assets/images/projects/portofolio/walat(2).png";
import walat3 from "../assets/images/projects/portofolio/walat(3).png";
import walat4 from "../assets/images/projects/portofolio/walat(4).png";

// ── PUSHPUL ───────────────────────────────────────────────────────────────────
import pushpul1 from "../assets/images/projects/portofolio/pushpul(1).png";

// ── RUMAH & CAFE ──────────────────────────────────────────────────────────────
import rumahcafe1 from "../assets/images/projects/portofolio/rumah&cafe(1).png";
import rumahcafe2 from "../assets/images/projects/portofolio/rumah&cafe(2).png";

export const PROJECTS_HEADER = {
  eyebrow: "Portofolio & Pengalaman Proyek",
  heading: "Karya Struktur & Pengalaman Proyek",
  description:
    "Dokumentasi proyek pengerjaan canopy membrane, fasilitas publik, komersial, dan glamping oleh tim engineering Pilar Canopy Perkasa. Klik kartu untuk melihat foto resolusi tinggi, spesifikasi teknis, keunggulan, dan lingkup pekerjaan.",
};

export const PROJECT_CATEGORIES = [
  { id: "all", label: "Semua Proyek" },
  { id: "membrane", label: "Tensile Membrane" },
  { id: "glamping", label: "Tenda Glamping" },
  { id: "retractable", label: "Retractable System" },
];

export const PROJECTS = [
  {
    id: "unpad-fisip",
    category: "membrane",
    title: "Lapang Serbaguna FISIP",
    client: "Universitas Padjadjaran",
    pekerjaan: "Pekerjaan: Lapang serbaguna",
    lokasi: "Bandung",
    tahun: "2026",
    badge: "PROYEK 01 / LAPANG SERBAGUNA",
    place: "BANDUNG • 2026",
    images: [unpad1, unpad2, unpad3, unpad4],
    image: unpad1,
    alt: "Lapang Serbaguna FISIP Universitas Padjadjaran Bandung",
    description:
      "Pekerjaan lapang serbaguna Universitas Padjadjaran (FISIP) di Bandung dengan struktur rangka pipa baja lengkung bentang lebar dan penutup membrane tensile.",
    chips: ["Lapang Serbaguna", "Tensile Membrane", "Bandung"],
    scope: "Struktur atap lapang serbaguna kampus FISIP UNPAD",
    specs: [
      "Luas area: ±600 m²",
      "Material Rangka: Pipa Baja Galvanized Medium A",
      "Bahan Atap: Membrane Tensile PVC/PVDF 850 GSM",
      "Finishing: Epoxy Primer + Polyurethane Duco White",
      "Pondasi: Bored Pile + Plat Baja Angkur M24",
    ],
    highlights: [
      "Bentang lebar tanpa kolom tengah untuk kebebasan aktivitas olahraga & serbaguna",
      "Tahan terpaan angin kencang hingga 110 km/jam dengan sertifikasi engineering",
      "Membran tembus cahaya alami di siang hari (translucent 12-15%) hemat energi",
      "Garansi resmi pabrikan material membrane hingga 15 tahun",
    ],
  },
  {
    id: "pitstop-jatim",
    category: "membrane",
    title: "Pit Stop Fuel",
    client: "PT. BSI / PT. Trustone",
    pekerjaan: "Pekerjaan: Pit stop fuel",
    lokasi: "Jawa Timur",
    tahun: "2026",
    badge: "PROYEK 02 / PIT STOP FUEL",
    place: "JAWA TIMUR • 2026",
    images: [pitstop1, pitstop2, pitstop3, pitstop4],
    image: pitstop1,
    alt: "Pit Stop Fuel PT. BSI PT. Trustone Jawa Timur",
    description:
      "Pekerjaan fasilitas pit stop fuel untuk PT. BSI / PT. Trustone di Jawa Timur, mencakup pekerjaan pondasi sipil, erection rangka baja, dan penutup membrane payung ganda.",
    chips: ["Pit Stop Fuel", "Struktur Baja", "Jawa Timur"],
    scope: "Kanopi rest shelter & proteksi pengisian bahan bakar kendaraan berat",
    specs: [
      "Luas area: ±450 m²",
      "Material Rangka: Baja Hollow & WF Steel Heavy Duty",
      "Bahan Atap: Membrane PVDF Blockout 950 GSM",
      "Finishing: Sandblasting Sa 2.5 + Marine Coating",
      "Pondasi: Telapak Beton Bertulang Cor On-Site",
    ],
    highlights: [
      "Material blockout tahan panas ekstrem radiasi matahari terbuka",
      "Lapisan anti-flame retardant standar keselamatan area bahan bakar",
      "Struktur modular kokoh tahan getaran mesin kendaraan berat",
      "Pengerjaan on-schedule sesuai standar ketat K3 industri pertambangan",
    ],
  },
  {
    id: "glamping-techno-park",
    category: "glamping",
    title: "Glamping Dome 10 unit",
    client: "Universitas Gunadarma (UG-TechnoPark)",
    pekerjaan: "Pekerjaan: 10 unit Glamping Dome",
    lokasi: "Cianjur",
    tahun: "2025",
    badge: "PROYEK 03 / GLAMPING DOME",
    place: "CIANJUR • 2025",
    images: [glamping1, glamping2, glamping3, glamping4],
    image: glamping1,
    alt: "Glamping Dome 10 unit Universitas Gunadarma UG-TechnoPark Cianjur",
    description:
      "Pengerjaan 10 unit glamping dome geodesic untuk UG-TechnoPark Universitas Gunadarma di Cianjur sebagai fasilitas edu-wisata teknologi dan riset alam.",
    chips: ["10 Unit Dome", "Geodesic Frame", "Cianjur"],
    scope: "Fabrikasi & instalasi 10 unit glamping dome terintegrasi deck panggung",
    specs: [
      "Jumlah unit: 10 geodesic dome unit",
      "Dimensi: Diameter 6.0 m, Tinggi 3.6 m (Area ~28 m² per dome)",
      "Rangka: Pipa Baja Galvanized anti-karat sambungan baut presisi",
      "Penutup: PVC/PVDF 850 GSM White + Panel Kaca Transparan Bayview",
      "Platform: Decking WPC composite tahan rayap dan cuaca pegunungan",
    ],
    highlights: [
      "Desain geodesic dome aerodinamis tahan angin kencang dataran tinggi",
      "Insulasi termal aluminium foil + tirai insulasi untuk menjaga suhu sejuk",
      "Pemandangan panorama pegunungan melalui kaca bayview transparan",
      "Dilengkapi fasilitas kamar mandi dalam (en-suite bathroom system)",
    ],
  },
  {
    id: "padel-bintaro",
    category: "membrane",
    title: "Lapang Padel",
    client: "Perorangan (milik pribadi)",
    pekerjaan: "Pekerjaan: Lapang Padel",
    lokasi: "Bintaro",
    tahun: "2025",
    badge: "PROYEK 04 / LAPANG PADEL",
    place: "BINTARO • 2025",
    images: [padel1, padel2, padel3, padel4],
    image: padel1,
    alt: "Lapang Padel Perorangan Milik Pribadi Bintaro",
    description:
      "Pekerjaan penutup struktur lapangan padel tennis pribadi di Bintaro dengan rangka lengkung pipa tubular estetis dan membrane anti-bising.",
    chips: ["Lapang Padel", "Rangka Lengkung", "Bintaro"],
    scope: "Kanopi peneduh lapangan padel tennis outdoor private residence",
    specs: [
      "Luas bentang: 220 m²",
      "Rangka: Pipa Baja Lengkung Curved Pipe 4-inch Schedule 40",
      "Bahan Atap: Membrane PVDF 750 GSM Translucent White",
      "Finishing: Double Powder Coating White Glossy",
      "Aksesoris: Kabel Sling Stainless Steel 316 + Turnbuckle M16",
    ],
    highlights: [
      "Desain lengkung kontinu tanpa kolom tengah yang mengganggu jalannya bola",
      "Peredaman suara rintik hujan signifikan dibanding atap seng atau spandek",
      "Transmisi cahaya alami seragam tanpa bayangan menyilaukan pemain",
      "Pengerjaan bersih dan rapi tepat waktu dalam 21 hari kerja",
    ],
  },
  {
    id: "canopy-cgv",
    category: "retractable",
    title: "Canopy Slide Otomatis",
    client: "CGV Cinemas Indonesia",
    pekerjaan: "Pekerjaan: Canopy Slide Otomatis",
    lokasi: "Padang",
    tahun: "2026",
    badge: "PROYEK 05 / CANOPY SLIDE",
    place: "PADANG • 2026",
    images: [cgv1, cgv2, cgv3, cgv4],
    image: cgv1,
    alt: "Canopy Slide Otomatis CGV Cinemas Indonesia Padang",
    description:
      "Pekerjaan canopy slide otomatis (motorized retractable) untuk area drop-off dan lobi outdoor CGV Cinemas dengan kontrol remote cerdas.",
    chips: ["Canopy Slide", "Motorized Remote", "Padang"],
    scope: "Sistem kanopi retractable otomatis area komersial mall & cinema",
    specs: [
      "Panjang bentang: 18 × 6 meter (±110 m²)",
      "Motor Penggerak: Somfy Tubular Motor Heavy Duty dengan sensor hujan",
      "Material Rangka: Aluminium Alloy 6063-T5 + Bracket Baja Laser Cut",
      "Kain Kanopi: Dickson / Recasens Acrylic Fabric 100% Waterproof",
      "Sistem Rel: Heavy Rail System dengan bearing nylon anti-aus",
    ],
    highlights: [
      "Dapat dibuka-tutup otomatis dalam hitungan 40 detik melalui remote control",
      "Sensor pintar otomatis menutup kanopi saat terdeteksi rintik hujan",
      "Tampilan elegan modern meningkatkan prestise area entrance komersial",
      "Sistem drainase samping terintegrasi pembuangan talang tersembunyi",
    ],
  },
  {
    id: "glamping-gunung-walat",
    category: "glamping",
    title: "Glamping PVC Alderon",
    client: "PT. Wandri Jaya",
    pekerjaan: "Pekerjaan: Glamping PVC Alderon",
    lokasi: "Gunung Walat Park, Sukabumi",
    tahun: "2025",
    badge: "PROYEK 06 / GLAMPING CABIN",
    place: "SUKABUMI • 2025",
    images: [walat1, walat2, walat3, walat4],
    image: walat1,
    alt: "Glamping PVC Alderon PT. Wandri Jaya Gunung Walat Park Sukabumi",
    description:
      "Pekerjaan pembangunan glamping cabin resort untuk PT. Wandri Jaya di kawasan hutan pendidikan Gunung Walat, Sukabumi menggunakan kombinasi PVC Alderon dan membrane.",
    chips: ["Glamping Cabin", "PVC Alderon", "Sukabumi"],
    scope: "Pembangunan 8 unit glamping cabin resort siap huni",
    specs: [
      "Jumlah unit: 8 unit cabin",
      "Konstruksi Rangka: Hollow Baja Galvanized 50x100 mm & 40x80 mm",
      "Atap: PVC Alderon Twinwall + Kanopi Teras Membrane PVDF",
      "Dinding: Smartpanel Sandwich EPS Insulation + Wood Texture Finish",
      "Lantai: Rangka Besi UNP + WPC Decking Board",
    ],
    highlights: [
      "Struktur tahan lembab, kabut tinggi, dan cuaca dingin pegunungan",
      "Peredam panas dan suara maksimal untuk kenyamanan tidur para tamu",
      "Desain arsitektur modern berpadu harmoni dengan lanskap hutan pinus",
      "Fasilitas lengkap mencakup teras santai depan dengan view alam",
    ],
  },
  {
    id: "push-pull-tent",
    category: "retractable",
    title: "Push Pull Retractable Tent",
    client: "PT. ABC Kogen Dairy Milk",
    pekerjaan: "Pekerjaan: Push Pull Retractable Tent",
    lokasi: "Bandung",
    tahun: "2026",
    badge: "PROYEK 07 / RETRACTABLE TENT",
    place: "BANDUNG • 2026",
    images: [pushpul1],
    image: pushpul1,
    alt: "Push Pull Retractable Tent PT. ABC Kogen Dairy Milk Bandung",
    description:
      "Pekerjaan fabrikasi dan instalasi tenda push-pull lipat industri untuk area bongkar muat logistik PT. ABC Kogen Dairy Milk di Bandung.",
    chips: ["Push-Pull Tent", "Loading Dock", "Bandung"],
    scope: "Struktur peneduh fleksibel loading dock industri makanan & susu",
    specs: [
      "Dimensi Bentang: 12.0 m × 25.0 m (Luas 300 m²)",
      "Mekanisme: Scissor Accordion Folding System dengan Roda Heavy Duty",
      "Material Rangka: Pipa Baja Galvanized anti-karat standar food plant",
      "Cover: Terpal Tarpaulin PVC Tarpaulin 900 GSM Tebal dan Anti-Sobek",
      "Rel Jalur: Pipa As Baja Padat tertanam rata lantai (flush track)",
    ],
    highlights: [
      "Tenda dapat dimampatkan hingga hanya 2.5 meter saat tidak digunakan",
      "Fleksibel untuk akses keluar masuk truk kontainer tinggi tanpa hambatan",
      "Menjamin higienitas proses transfer produk terlindung dari hujan & debu",
      "Sistem penguncian rem roda ganda untuk keamanan cuaca angin kencang",
    ],
  },
  {
    id: "canopy-rumah-cafe",
    category: "membrane",
    title: "Canopy Rumah Tinggal & Cafe",
    client: "Rumah Tinggal & Cafe",
    pekerjaan: "Pekerjaan: Canopy Rumah & Cafe",
    lokasi: "Jabodetabek & Jawa Barat",
    tahun: "2025 sampai 2026",
    badge: "PROYEK 08 / RUMAH & CAFE",
    place: "JABODETABEK & JABAR • 2025–2026",
    images: [rumahcafe1, rumahcafe2],
    image: rumahcafe1,
    alt: "Canopy Rumah Tinggal & Cafe Jabodetabek & Jawa Barat",
    description:
      "Rangkaian instalasi kanopi carport rumah tinggal mewah dan outdoor cafe di wilayah Jabodetabek dan Jawa Barat dengan model tensile membrane custom.",
    chips: ["Canopy Residensial", "Tensile Carport", "Jabodetabek"],
    scope: "Lebih dari 35+ titik pemasangan carport rumah mewah & kafe aesthetic",
    specs: [
      "Dimensi variatif: 3x5 m, 4x6 m, hingga 6x8 m (muat 2-3 mobil)",
      "Rangka: Pipa & Hollow Baja Galvanized Finishing Polyurethane Duco",
      "Membrane: Heytex Jerman / Verseidag / Dickson PVC 750-850 GSM",
      "Aksesoris: Kawat Seling Stainless Steel SUS 304, Plat Baseplate 12 mm",
      "Warna pilihan: Putih Salju, Beige/Krem, Abu-abu Modern",
    ],
    highlights: [
      "Menaikkan nilai estetika dan kemewahan fasad depan hunian residensial",
      "Melindungi cat mobil mewah dari sinar UV perusak dan getah pohon",
      "Pemasangan ringkas dan presisi tanpa merusak struktur dinding eksisting",
      "Bebas perawatan rutin dengan bahan membrane self-cleaning coating",
    ],
  },
];
