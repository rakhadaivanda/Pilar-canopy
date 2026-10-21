import Icon from "../ui/Icon";
import { HERO } from "../../data/hero";
import heroVideo from "./gemini_generated_video_281468d5.mp4";

/* DIUBAH: Section Hero (id="beranda") dengan background video lokal baru, tipografi gagah proporsional, dan trust strip terintegrasi */
export default function Hero() {
  return (
    <section
      id="beranda"
      data-hero
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Video Background with Local Video file */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div data-hero-media className="absolute -inset-6 will-change-transform">
          <video
            autoPlay
            className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04]"
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Architectural gradient overlays: Warm cream gradient on left for crystal-clear text readability while preserving video richness */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-surface/30 sm:via-surface/75 sm:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20"></div>
          <div data-hero-veil className="absolute inset-0 bg-primary opacity-0"></div>
        </div>
      </div>

      {/* Subtle blueprint grid overlay (delicate architectural accent) */}
      <div data-hero-grid className="absolute -inset-3 pointer-events-none opacity-[0.04] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="60" id="hero-grid" patternUnits="userSpaceOnUse" width="60">
              <path
                className="text-primary"
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.65"
              ></path>
            </pattern>
          </defs>
          <rect fill="url(#hero-grid)" height="100%" width="100%"></rect>
        </svg>
      </div>

      {/* Hero content */}
      <div
        data-hero-content
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full flex flex-col items-start justify-center"
      >

        {/* Grand Headline with SplitText Animation */}
        <div className="max-w-4xl mb-5 mt-2">
          <span className="font-spec-code text-xs sm:text-sm uppercase tracking-[0.22em] text-secondary font-bold block mb-2">
            Pilar Canopy Perkasa
          </span>
          <h1
            data-hero-title
            className="font-display-hero text-[clamp(2.75rem,9vw,5.375rem)] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] leading-[1.04] tracking-tight font-extrabold text-primary"
          >
            Innovate. <span className="font-normal italic text-secondary font-serif">Build.</span> Solve.
          </h1>
        </div>

        {/* Subjudul, Action Buttons & Trust Strip */}
        <div className="max-w-3xl w-full">
          <p
            data-hero-fade
            className="font-body-lg text-sm sm:text-base lg:text-xl text-primary/85 font-medium leading-relaxed mb-7 max-w-2xl"
          >
            {HERO.subjudul}
          </p>

          <div className="flex flex-col w-full sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-7">
            {/* Tombol: "Konsultasikan Kebutuhan Anda" (WhatsApp) */}
            <a
              data-hero-cta
              data-magnetic
              data-cursor="EXPLORE"
              className="btn-fill inline-flex items-center justify-center gap-2.5 bg-secondary text-on-secondary hover:brightness-110 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 font-bold active:scale-95 text-[11px] xs:text-xs sm:text-sm w-full sm:w-auto"
              href={HERO.primaryBtn.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>{HERO.primaryBtn.label}</span>
            </a>
          </div>

          {/* Trust Strip Bar - dihapus */}
        </div>
      </div>
    </section>
  );
}
