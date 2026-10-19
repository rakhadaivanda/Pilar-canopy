import Icon from "../ui/Icon";
import { HERO } from "../../data/hero";

export default function Hero() {
  return (
    <section data-hero className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Video Background with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div data-hero-media className="absolute -inset-6 will-change-transform">
        <video
          autoPlay
          className="w-full h-full object-cover object-center filter saturate-[0.98] brightness-[0.95]"
          loop
          muted
          playsInline
          preload="metadata"
          poster={HERO.posterUrl}
        >
          <source src={HERO.videoUrl} type="video/mp4" />
        </video>
        {/* Warm ambient architectural gradient overlays */}
        <div className="absolute inset-0 bg-surface/40 backdrop-contrast-110"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/35 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/25 to-surface/75"></div>
        {/* Lapisan gelap tipis - memudar saat intro */}
        <div data-hero-veil className="absolute inset-0 bg-primary opacity-0"></div>
        </div>
      </div>

      {/* Subtle grid blueprint vector */}
      <div data-hero-grid className="absolute -inset-3 pointer-events-none opacity-20 z-0">
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

      {/* Hero main editorial content */}
      <div data-hero-content className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-start justify-center">
        {/* Announcement pill */}
        <div data-hero-fade className="mb-8 inline-block">
          <a
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest/80 border border-outline-variant/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-secondary hover:shadow hover:-translate-y-0.5 group"
            href={HERO.announcement.href}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse-dot"></span>
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider font-semibold">
              {HERO.announcement.text}
            </span>
            <Icon
              name="north_east"
              className="text-[16px] text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Editorial headline */}
        <div className="max-w-4xl mb-6">
          <h1 data-hero-title className="font-display-hero text-4xl sm:text-5xl lg:text-[62px] leading-[1.12] tracking-tight font-light text-primary">
            {HERO.titleStart}
            <span className="font-normal italic text-secondary">{HERO.titleHighlight}</span>
            {HERO.titleEnd}
          </h1>
        </div>

        {/* Subheading & action buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end max-w-4xl w-full">
          <div className="lg:col-span-8">
            <p data-hero-fade className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">
              {HERO.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                data-hero-cta
                data-magnetic
                data-cursor="EXPLORE"
                className="btn-fill inline-flex items-center justify-center bg-primary text-on-primary hover:text-primary px-space-lg py-3.5 rounded-DEFAULT font-label-caps text-label-caps uppercase tracking-widest shadow-md hover:shadow-lg"
                href={HERO.primaryCta.href}
              >
                {HERO.primaryCta.label}
              </a>
              <a
                data-hero-cta
                data-magnetic
                data-cursor="EXPLORE"
                style={{ "--fill": "#401D47" }}
                className="btn-fill inline-flex items-center justify-center bg-surface-container-lowest/90 border border-outline-variant/60 hover:border-primary text-primary hover:text-on-primary px-space-md py-3.5 rounded-DEFAULT font-label-caps text-label-caps uppercase tracking-wider"
                href={HERO.secondaryCta.href}
              >
                {HERO.secondaryCta.label}
              </a>
            </div>
          </div>

          {/* Quick stats badge */}
          <div data-hero-fade className="lg:col-span-4 bg-surface-container-lowest/80 backdrop-blur-md p-4 rounded-DEFAULT border border-outline-variant/40 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Icon name={HERO.badge.icon} className="text-[20px]" />
              </span>
              <div>
                <p className="font-label-caps text-label-caps text-primary uppercase font-bold">
                  {HERO.badge.title}
                </p>
                <p className="font-spec-code text-spec-code text-on-surface-variant">
                  {HERO.badge.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
