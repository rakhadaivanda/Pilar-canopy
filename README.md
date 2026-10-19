# Pilar Canopy — Landing Page (React + Vite + Tailwind)

Konversi dari export Stitch (`code.html`, satu file) menjadi proyek React yang terpisah per komponen.
Tampilan dipertahankan 1:1 (token warna, font, spacing, animasi sama persis dengan desain asli),
sedangkan **konten disesuaikan dengan katalog PDF Pilar Canopy 2025–2026**.

## Menjalankan

```bash
npm install
npm run dev       # development → http://localhost:5173
npm run build     # output produksi ke folder dist/
npm run preview   # cek hasil build
```

## Struktur

```
src/
├── App.jsx                     # susunan halaman
├── main.jsx · index.css        # entry + keyframes/animasi
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/
│   │   ├── Hero.jsx · PromoMarquee.jsx · TypologyTicker.jsx
│   │   ├── about/              # AboutSection, PillarCard, StatsStrip
│   │   ├── projects/           # ProjectsSection (carousel), ProjectCard
│   │   ├── materials/          # MaterialsSection (tab), SpecPanel, ColorSwatches
│   │   ├── workflow/           # WorkflowSection, WorkflowStep
│   │   └── consultation/       # ConsultationSection, ConsultationForm
│   └── ui/                     # Icon, SectionEyebrow
├── data/                       # ← SEMUA TEKS/KONTEN ada di sini
│   ├── site.js                 # nama, telepon/WhatsApp, email, alamat
│   ├── projects.js             # 8 proyek portofolio
│   ├── materials.js            # tab Membrane / Rangka / Aksesoris
│   ├── about.js · workflow.js · tickers.js · consultation.js · navigation.js · hero.js
├── hooks/                      # useCarousel, useScrolled
├── lib/whatsapp.js             # pembuat tautan wa.me
└── assets/images/              # foto yang diekstrak dari katalog PDF
docs/                           # DESIGN.md & screenshot desain asli
```

## Mengubah konten

- **Nomor WhatsApp / email / alamat** → `src/data/site.js` (nomor pertama dipakai semua tombol WhatsApp).
- **Menambah proyek** → tambah objek di `src/data/projects.js` + taruh foto di `src/assets/images/projects/`.
- **Mengubah harga / spesifikasi material** → `src/data/materials.js`.
- Warna, font, dan spacing tetap diatur di `tailwind.config.js` (dipindah dari Stitch).

## Catatan

- Video & poster Hero masih memakai URL dari export Stitch (hosted eksternal). Untuk produksi,
  sebaiknya unduh lalu simpan ke `public/` dan ubah di `src/data/hero.js`.
- Form konsultasi membuka WhatsApp dengan pesan yang sudah terisi (tidak ada backend).

## Sistem Motion (GSAP)

Seluruh animasi berada di `src/motion/` dan dikendalikan lewat atribut `data-*` di JSX —
konten, layout, dan teks tidak diubah.

| Atribut | Efek |
| --- | --- |
| `data-reveal-group` + `data-reveal-item[="heading"]` | eyebrow/heading/paragraf muncul berurutan |
| `data-reveal="card"` / `"image"` | elemen tunggal (y 50→0 / scale 1.08→1) |
| `data-stagger` | anak grid masuk per baris (stagger ±0.1s) |
| `data-project-card` + `data-card-media` | clip-path `inset(0 0 100% 0)→0`, gambar 1.12→1 |
| `data-parallax-y="N"` | teks bergeser ±N px (kecepatan beda dari gambar) |
| `data-counter` | angka 0→nilai akhir, sekali saja |
| `data-section` | transisi antarbagian (panel melebar halus) |
| `data-magnetic` | tombol magnetik (maks. 8px, desktop pointer halus saja) |
| `data-cursor="VIEW"` / `"EXPLORE"` | label pada kursor kustom |

- **Smooth scroll**: Lenis + ScrollTrigger (wheel saja; sentuh tetap native).
- **Mobile** (<768px): jarak & stagger dikurangi; parallax, kursor, dan magnetik dimatikan.
- **Reduced motion**: hanya fade opacity; parallax, smooth scroll, marquee, dan loop dimatikan.
- **Aturan**: elemen yang dianimasikan GSAP tidak boleh memakai `transition-all` atau transform
  transition CSS (bentrok) — gunakan `transition-[properti,…]` yang spesifik.
