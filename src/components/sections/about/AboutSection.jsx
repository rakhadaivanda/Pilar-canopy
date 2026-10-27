import SectionEyebrow from "../../ui/SectionEyebrow";
import Icon from "../../ui/Icon";
import { ABOUT, ADVANTAGES } from "../../../data/about";
import aboutBg from "../../../assets/images/materials/background(1).png";

/* DIUBAH: Section Tentang Kami (id="tentang") dengan background architectural canopy line-art */
export default function AboutSection() {
  return (
    <section
      data-section
      className="relative w-full overflow-hidden bg-sand py-20 sm:py-28"
      id="tentang"
    >
      {/* Background Graphic: background(1).png */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={aboutBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left-bottom sm:object-center opacity-65 mix-blend-multiply"
        />
        {/* Soft wash overlay to maintain perfect text contrast with the warm theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-sand/40 to-sand/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Bagian Atas: Profil Perusahaan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          <div data-reveal-group className="lg:col-span-5">
            <SectionEyebrow className="mb-3">{ABOUT.eyebrow}</SectionEyebrow>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight leading-tight">
              {ABOUT.heading}
            </h2>
          </div>
          <div data-reveal-group className="lg:col-span-7">
            <p className="font-body-lg text-base sm:text-lg text-primary leading-relaxed font-normal">
              {ABOUT.body}
            </p>
          </div>
        </div>

        {/* Bagian Bawah: 7 Kartu Keunggulan */}
        <div
          data-stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={adv.title}
              className={`p-6 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/60 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between ${
                idx === 6 ? "sm:col-span-2 lg:col-span-3 xl:col-span-1" : ""
              }`}
            >
              <div>
                <div className="w-11 h-11 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary mb-4">
                  <Icon name={adv.icon} className="text-[22px]" />
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-primary mb-2">
                  {adv.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
