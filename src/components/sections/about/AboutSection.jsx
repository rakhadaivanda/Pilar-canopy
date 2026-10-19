import SectionEyebrow from "../../ui/SectionEyebrow";
import PillarCard from "./PillarCard";
import StatsStrip from "./StatsStrip";
import { ABOUT, PILLARS } from "../../../data/about";

export default function AboutSection() {
  return (
    <section data-section className="w-full bg-sand py-24 sm:py-32" id="filosofi">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div data-reveal-group className="lg:col-span-5">
            <SectionEyebrow className="mb-4">{ABOUT.eyebrow}</SectionEyebrow>
            <h2 data-fill-text className="font-headline-lg text-headline-lg text-primary tracking-tight font-light leading-tight">
              {ABOUT.heading}
            </h2>
          </div>
          <div data-reveal-group className="lg:col-span-7">
            <p data-fill-text className="font-body-lg text-body-lg text-primary leading-relaxed mb-6 font-normal">
              {ABOUT.quote}
            </p>
            <p data-reveal-item className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {ABOUT.body}
            </p>
          </div>
        </div>

        {/* Pillars bento grid (anchor #spesifikasi dipakai tautan "Layanan & Struktur") */}
        <div
          data-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 scroll-mt-28"
          id="spesifikasi"
        >
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.tag} {...pillar} />
          ))}
        </div>

        <StatsStrip />
      </div>
    </section>
  );
}
