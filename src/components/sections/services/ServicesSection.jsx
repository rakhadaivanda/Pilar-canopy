import SectionEyebrow from "../../ui/SectionEyebrow";
import Icon from "../../ui/Icon";
import { SERVICES_HEADER, SERVICES, FABRIC_REPLACEMENT_BANNER } from "../../../data/services";
import servicesBg from "../../../assets/images/materials/background(3).jpg";

/* BARU: Section Layanan (id="layanan") dengan background(3).jpg, 4 kartu layanan dan banner Jasa Ganti Kain Membrane */
export default function ServicesSection() {
  return (
    <section
      data-section
      className="relative w-full overflow-hidden bg-surface-container-low py-20 sm:py-28"
      id="layanan"
    >
      {/* Background Graphic: background(3).jpg */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={servicesBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-65 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/85 via-surface-container-low/50 to-surface-container-low/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Layanan */}
        <div data-reveal-group className="max-w-3xl mb-14">
          <SectionEyebrow className="mb-3">{SERVICES_HEADER.eyebrow}</SectionEyebrow>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
            {SERVICES_HEADER.heading}
          </h2>
          <p className="font-body-md text-base text-on-surface-variant mt-2 leading-relaxed">
            {SERVICES_HEADER.description}
          </p>
        </div>

        {/* 4 Kartu Layanan */}
        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {SERVICES.map((srv) => (
            <div
              key={srv.number}
              className="p-6 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform duration-300">
                    <Icon name={srv.icon} className="text-[26px]" />
                  </div>
                  <span className="font-spec-code text-xs font-bold text-on-surface-variant/70">
                    {srv.number}
                  </span>
                </div>

                <h3 className="font-headline-sm text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {srv.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex flex-wrap gap-1.5">
                {srv.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-surface-container font-spec-code text-[11px] text-primary rounded font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Banner "Jasa Ganti Kain Membrane" */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/95 to-primary p-8 sm:p-10 text-on-primary shadow-xl border border-white/10"
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/25 border border-secondary/40 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                <Icon name="verified" className="text-[16px]" />
                <span>Layanan Khusus</span>
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white mb-2">
                {FABRIC_REPLACEMENT_BANNER.title}
              </h3>
              <p className="font-body-md text-sm sm:text-base text-white/80 leading-relaxed">
                {FABRIC_REPLACEMENT_BANNER.description}
              </p>
            </div>

            <div className="flex-none">
              <a
                href={FABRIC_REPLACEMENT_BANNER.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:brightness-110 px-6 py-3.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 font-bold active:scale-95 whitespace-nowrap"
              >
                <Icon name="chat" className="text-[18px]" />
                <span>{FABRIC_REPLACEMENT_BANNER.buttonText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
