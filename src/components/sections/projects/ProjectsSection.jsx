import { useState, useMemo, useRef } from "react";
import Icon from "../../ui/Icon";
import SectionEyebrow from "../../ui/SectionEyebrow";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { PROJECTS, PROJECTS_HEADER, PROJECT_CATEGORIES } from "../../../data/projects";

const pad = (n) => String(n).padStart(2, "0");

const INITIAL_VISIBLE = 8;

/* DIUBAH: Section Portofolio (id="portofolio") dengan Category Tabs, Grid/Slider Switcher, 24+ Card Lengkap, dan Modal Detail Proyek Independent Scroll */
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "slider"
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [selectedProject, setSelectedProject] = useState(null);
  const sliderTrackRef = useRef(null);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Displayed projects in grid mode
  const displayedProjects = useMemo(() => {
    if (viewMode === "slider") return filteredProjects;
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount, viewMode]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleCount(INITIAL_VISIBLE);
    if (sliderTrackRef.current) {
      sliderTrackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollSlider = (direction) => {
    if (!sliderTrackRef.current) return;
    const scrollAmount = 420;
    sliderTrackRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        data-section
        className="w-full bg-surface-container-low py-20 sm:py-28 overflow-hidden"
        id="portofolio"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Portofolio & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div data-reveal-group>
              <SectionEyebrow className="mb-2">{PROJECTS_HEADER.eyebrow}</SectionEyebrow>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
                {PROJECTS_HEADER.heading}
              </h2>
              <p className="font-body-md text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                {PROJECTS_HEADER.description}
              </p>
            </div>

            {/* View Mode Switcher & Slider Controls */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <div className="inline-flex items-center p-1 bg-surface-container rounded-lg border border-outline-variant/40">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                  aria-label="Tampilan Grid"
                >
                  <Icon name="grid_view" className="text-[16px]" />
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("slider")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                    viewMode === "slider"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                  aria-label="Tampilan Slider"
                >
                  <Icon name="view_carousel" className="text-[16px]" />
                  <span>Slider</span>
                </button>
              </div>

              {viewMode === "slider" && (
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Geser ke kiri"
                    className="w-9 h-9 rounded-full border border-outline-variant/50 bg-surface hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center text-primary shadow-sm active:scale-95"
                    onClick={() => scrollSlider("prev")}
                    type="button"
                  >
                    <Icon name="arrow_back" className="text-[18px]" />
                  </button>
                  <button
                    aria-label="Geser ke kanan"
                    className="w-9 h-9 rounded-full border border-outline-variant/50 bg-surface hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center text-primary shadow-sm active:scale-95"
                    onClick={() => scrollSlider("next")}
                    type="button"
                  >
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-outline-variant/30">
            {PROJECT_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex-none flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-on-primary shadow-md scale-[1.02]"
                      : "bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container border border-outline-variant/40"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content Area: Grid View or Slider View */}
          {viewMode === "grid" ? (
            /* GRID VIEW */
            <div>
              <div
                data-stagger
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {displayedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>

              {/* Tampilkan Lebih Banyak Proyek */}
              {filteredProjects.length > visibleCount && (
                <div className="mt-12 text-center flex flex-col items-center gap-3">
                  <p className="font-spec-code text-xs text-on-surface-variant">
                    Menampilkan <strong className="text-primary">{displayedProjects.length}</strong> dari{" "}
                    <strong className="text-primary">{filteredProjects.length}</strong> proyek portofolio
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 8)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-on-primary hover:bg-secondary font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                  >
                    <Icon name="add_circle" className="text-[18px]" />
                    <span>Tampilkan Lebih Banyak Proyek</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* SLIDER VIEW */
            <div className="relative">
              <div
                ref={sliderTrackRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6 -mx-6 px-6 lg:-mx-12 lg:px-12"
              >
                {filteredProjects.map((project) => (
                  <div key={project.id} className="flex-none w-[85vw] sm:w-[360px] lg:w-[380px] snap-center">
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-spec-code text-on-surface-variant px-2">
                <span>Geser horizontal untuk melihat koleksi {filteredProjects.length} portofolio</span>
                <span>Total: {pad(filteredProjects.length)} Proyek</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal (Lengkap dengan foto, spesifikasi, highlight & independent scrolling) */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
