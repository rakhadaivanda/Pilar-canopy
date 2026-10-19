import SectionEyebrow from "../../ui/SectionEyebrow";
import Icon from "../../ui/Icon";
import { MATERIALS_HEADER, MATERIAL_COLUMNS, CERTIFICATION_BLOCK } from "../../../data/materials";
import materialsBg from "../../../assets/images/materials/background(2).png";

/* DIUBAH: Section Material & Spesifikasi (id="material") dengan background(2).png dan 3 Kolom Spesifikasi */
export default function MaterialsSection() {
  return (
    <section
      data-section
      className="relative w-full overflow-hidden bg-sand py-20 sm:py-28"
      id="material"
    >
      {/* Background Graphic: background(2).png */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={materialsBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-60 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-sand/45 to-sand/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Material */}
        <div data-reveal-group className="max-w-3xl mb-14">
          <SectionEyebrow className="mb-3">{MATERIALS_HEADER.eyebrow}</SectionEyebrow>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
            {MATERIALS_HEADER.heading}
          </h2>
          <p className="font-body-md text-base text-on-surface-variant mt-2 leading-relaxed">
            {MATERIALS_HEADER.description}
          </p>
        </div>

        {/* 3 Kolom Material (Membrane, Struktur Rangka, Aksesoris) */}
        <div
          data-stagger
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {MATERIAL_COLUMNS.map((col) => (
            <div
              key={col.id}
              className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image header */}
                <div className="relative w-full h-[220px] overflow-hidden bg-surface-container">
                  <img
                    src={col.image}
                    alt={col.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded">
                    <span className="font-spec-code text-[11px] text-on-primary uppercase tracking-wider font-semibold">
                      {col.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-headline-lg text-2xl font-bold text-white drop-shadow">
                      {col.title}
                    </h3>
                  </div>
                </div>

                {/* Specs list */}
                <div className="p-6 space-y-4">
                  {col.specs.map((item, i) => (
                    <div key={i} className="pb-3 border-b border-outline-variant/30 last:border-b-0">
                      <span className="font-spec-code text-[11px] text-secondary font-bold uppercase tracking-wider block mb-1">
                        {item.label}
                      </span>
                      <p className="font-body-md text-sm text-primary font-medium leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="px-6 pb-6 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-primary border border-outline-variant/30">
                  <Icon name="verified" className="text-[16px] text-secondary" />
                  <span>{col.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-blok Sertifikasi & Kompetensi */}
        <div
          data-reveal
          className="rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/50 p-8 sm:p-10 shadow-sm"
        >
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
              <Icon name="workspace_premium" className="text-[16px]" />
              <span>Standar Mutu & SDM</span>
            </div>
            <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-primary mb-3">
              {CERTIFICATION_BLOCK.title}
            </h3>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {CERTIFICATION_BLOCK.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/30">
            {CERTIFICATION_BLOCK.points.map((pt) => (
              <div key={pt.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-none">
                  <Icon name={pt.icon} className="text-[22px]" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-base font-bold text-primary mb-1">
                    {pt.title}
                  </h4>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
