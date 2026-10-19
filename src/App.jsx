import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import AboutSection from "./components/sections/about/AboutSection";
import ProjectsSection from "./components/sections/projects/ProjectsSection";
import MaterialsSection from "./components/sections/materials/MaterialsSection";
import WorkflowSection from "./components/sections/workflow/WorkflowSection";
import ConsultationSection from "./components/sections/consultation/ConsultationSection";
import Preloader from "./motion/Preloader";
import Cursor from "./motion/Cursor";
import ScrollProgress from "./motion/ScrollProgress";
import useMotion from "./motion/useMotion";

export default function App() {
  useMotion();

  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main className="w-full">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <MaterialsSection />
        <WorkflowSection />
        <ConsultationSection />
      </main>
      <Footer />
    </>
  );
}
