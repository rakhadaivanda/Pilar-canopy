import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import AboutSection from "./components/sections/about/AboutSection";
import ServicesSection from "./components/sections/services/ServicesSection";
import MaterialsSection from "./components/sections/materials/MaterialsSection";
import ProjectsSection from "./components/sections/projects/ProjectsSection";
import CatalogSection from "./components/sections/catalog/CatalogSection";
import ClosingCtaSection from "./components/sections/cta/ClosingCtaSection";
import ContactSection from "./components/sections/contact/ContactSection";
import Preloader from "./motion/Preloader";
import Cursor from "./motion/Cursor";
import ScrollProgress from "./motion/ScrollProgress";
import useMotion from "./motion/useMotion";

/* DIUBAH: Struktur halaman tunggal resmi Pilar Canopy Perkasa (PT. REZEKI BAROKAH JAYA)
   Urutan Section:
   1. Navbar
   2. Hero (id="beranda")
   3. Tentang Kami (id="tentang")
   4. Layanan (id="layanan")
   5. Material & Spesifikasi (id="material")
   6. Portofolio (id="portofolio")
   7. Katalog Produk (id="katalog")
   8. CTA Penutup
   9. Kontak (id="kontak")
   10. Footer
*/
export default function App() {
  useMotion();

  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      {/* 1. Navbar */}
      <Navbar />
      <main className="w-full">
        {/* 2. Hero */}
        <Hero />
        {/* 3. Tentang Kami (Profil + 7 Keunggulan) */}
        <AboutSection />
        {/* 4. Layanan (4 Kartu + Banner Ganti Kain) */}
        <ServicesSection />
        {/* 5. Material & Spesifikasi (3 Kolom + Sertifikasi) */}
        <MaterialsSection />
        {/* 6. Portofolio (8 Proyek + Modal Detail Scrollable) */}
        <ProjectsSection />
        {/* 7. Katalog Produk (Model #043 - #086 + Tanya Harga) */}
        <CatalogSection />
        {/* 8. CTA Penutup */}
        <ClosingCtaSection />
        {/* 9. Kontak (Info + Maps + Form WhatsApp) */}
        <ContactSection />
      </main>
      {/* 10. Footer */}
      <Footer />
    </>
  );
}
