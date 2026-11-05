// /* DIUBAH */ Data Material & Spesifikasi (3 Kolom: Membrane, Rangka, Aksesoris + Sub-blok Sertifikasi & Kompetensi)
import imgMembrane from "../assets/images/materials/membrane.jpg";
import imgRangka from "../assets/images/materials/struktur-rangka.jpg";
import imgAksesoris from "../assets/images/materials/aksesoris.jpg";

export const MATERIALS_HEADER = {
  eyebrow: "Material & Spesifikasi",
  heading: "Spesifikasi Material Berkualitas & Berstandar Tinggi",
  description:
    "Kami hanya menggunakan material pilihan yang telah teruji ketahanannya untuk memastikan kekuatan struktur, keamanan pengguna, dan estetika bangunan.",
};

export const MATERIAL_COLUMNS = [
  {
    id: "membrane",
    badge: "01 / ATAP MEMBRANE",
    title: "Membrane",
    image: imgMembrane,
    alt: "Material Atap Membrane PVC dan PVDF Pilar Canopy",
    specs: [
      { label: "Bahan", value: "PVC Membrane, PVDF (Anti Jamur), Architectural Fabric" },
      { label: "Garansi", value: "Garansi 10 sampai 20 tahun resmi pabrikan" },
      { label: "Fitur", value: "Anti-UV, Tahan Api (Flame Retardant), Self-Cleaning" },
    ],
    highlight: "Garansi 10 s/d 20 Tahun",
  },
  {
    id: "rangka",
    badge: "02 / RANGKA BAJA",
    title: "Struktur Rangka",
    image: imgRangka,
    alt: "Struktur Rangka Baja Galvanized Pilar Canopy",
    specs: [
      { label: "Material Rangka", value: "Galvanized Steel" },
      { label: "Jenis Profil", value: "Hollow Steel, Pipe, WF / IWF, H-Beam" },
      { label: "Finishing", value: "Cat Duco + Cat Dasar (Anti Karat Sa 2.5)" },
    ],
    highlight: "Galvanized Heavy Duty",
  },
  {
    id: "aksesoris",
    badge: "03 / TENSION HARDWARE",
    title: "Aksesoris",
    image: imgAksesoris,
    alt: "Aksesoris Tension Hardware Stainless Steel Pilar Canopy",
    specs: [
      { label: "Material Hardware", value: "Baja dan Stainless Steel (SUS 304 / 316)" },
      {
        label: "Komponen",
        value: "Kedder, Clamplate Span Screw, Kawat Seling, Shackle, Anchor Point, Turnbuckle",
      },
      { label: "Finishing", value: "Finishing pabrikasi presisi tinggi" },
    ],
    highlight: "Marine Grade Hardware",
  },
];

export const CERTIFICATION_BLOCK = {
  title: "Sertifikasi & Kompetensi",
  description:
    "Komitmen meningkatkan kompetensi tenaga kerja lewat pelatihan, sertifikasi, dan pengembangan keahlian berkelanjutan untuk memastikan setiap proyek dikerjakan dengan standar keamanan konstruksi tertinggi.",
  points: [
    {
      title: "Tenaga Ahli Profesional",
      desc: "Didukung insinyur dan teknisi bersertifikasi dengan jam terbang tinggi di bidang struktur membrane dan konstruksi baja.",
      icon: "engineering",
    },
    {
      title: "Aksesoris Berkualitas",
      desc: "Komponen hardware tension stainless steel berstandar industri dengan pengujian beban tarik sebelum instalasi.",
      icon: "verified",
    },
    {
      title: "Material Baja Berkualitas",
      desc: "Penggunaan baja bersertifikat SNI dengan lapisan galvanis anti-karat untuk ketahanan struktural puluhan tahun.",
      icon: "construction",
    },
  ],
};
