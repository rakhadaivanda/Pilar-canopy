// Seksi "Alur Kerja" — sumber: halaman "Proses Kerja" pada katalog PDF (9 tahap).
// Kesembilan tahap dikelompokkan ke 4 kartu agar layout grid 4 kolom tetap sama seperti desain asli.
export const WORKFLOW_HEADER = {
  eyebrow: "Proses Kerja 9 Tahap",
  heading: "Alur Kerja Rekayasa Terencana",
  description:
    "Dari konsultasi dan survey lokasi hingga quality control dan serah terima proyek kepada pelanggan.",
};

export const WORKFLOW_STEPS = [
  {
    number: "01",
    icon: "straighten",
    title: "Konsultasi & Survey Lokasi",
    text: "Kami memahami kebutuhan dan konsep yang diinginkan pelanggan. Tim melakukan pengukuran dan mempelajari kondisi lokasi.",
    tag: "Step 01–02 • Konsultasi & Survey",
  },
  {
    number: "02",
    icon: "view_in_ar",
    title: "Desain & Engineering",
    text: "Konsep dikembangkan menjadi desain yang sesuai dengan kebutuhan proyek, lalu dilakukan penyesuaian teknis dan kebutuhan struktur berdasarkan spesifikasi proyek.",
    tag: "Step 03–04 • Desain & Engineering",
  },
  {
    number: "03",
    icon: "precision_manufacturing",
    title: "Penawaran & Fabrikasi",
    text: "Kami menyusun penawaran berdasarkan lingkup dan spesifikasi yang telah disepakati, kemudian komponen struktur diproduksi sesuai gambar dan spesifikasi.",
    tag: "Step 05–06 • Penawaran & Fabrikasi",
  },
  {
    number: "04",
    icon: "verified",
    title: "Instalasi & Handover",
    text: "Tim memasang struktur dan membrane di lokasi proyek. Pekerjaan diperiksa agar sesuai standar yang disepakati, lalu proyek diserahterimakan kepada pelanggan.",
    tag: "Step 07–09 • Instalasi, QC, Handover",
  },
];
