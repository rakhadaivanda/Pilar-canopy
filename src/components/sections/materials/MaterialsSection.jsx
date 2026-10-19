import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, MQ } from "../../../motion/gsap";
import Icon from "../../ui/Icon";
import SectionEyebrow from "../../ui/SectionEyebrow";
import WipeText from "../../ui/WipeText";
import SpecPanel from "./SpecPanel";
import { MATERIAL_TABS, MATERIALS_HEADER } from "../../../data/materials";

const TAB_BASE =
  "px-6 py-3 rounded-DEFAULT font-label-caps text-label-caps uppercase tracking-wider transition-[background-color,color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-2";
const TAB_ACTIVE = "bg-primary text-on-primary shadow-md";
const TAB_INACTIVE =
  "bg-surface-container-low text-primary hover:bg-surface-container-high border border-outline-variant/30";

export default function MaterialsSection() {
  const [activeId, setActiveId] = useState(MATERIAL_TABS[0].id);
  const activeTab = MATERIAL_TABS.find((tab) => tab.id === activeId) ?? MATERIAL_TABS[0];
  const panelRef = useRef(null);
  const prevId = useRef(activeId);

  // Pergantian tab: panel masuk halus (bukan pada render pertama).
  useEffect(() => {
    if (prevId.current === activeId) return undefined;
    prevId.current = activeId;
    const el = panelRef.current?.querySelector("[data-spec-panel]");
    if (!el) return undefined;
    const reduce = window.matchMedia(MQ.reduce).matches;
    const tween = gsap.fromTo(
      el,
      reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: reduce ? 0.3 : 0.7, ease: "power3.out", clearProps: "transform,opacity" },
    );
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      tween.kill();
    };
  }, [activeId]);

  return (
    <section data-section className="w-full bg-surface py-24 sm:py-32" id="material">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-reveal-group className="max-w-3xl mb-12">
          <SectionEyebrow>{MATERIALS_HEADER.eyebrow}</SectionEyebrow>
          <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-light">
            <WipeText>{MATERIALS_HEADER.heading}</WipeText>
          </h2>
          <p data-reveal-item className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed">
            {MATERIALS_HEADER.description}
          </p>
        </div>

        {/* Interactive tab switcher */}
        <div data-reveal="card" className="flex flex-wrap items-center gap-3 mb-8" role="tablist">
          {MATERIAL_TABS.map((tab) => (
            <button
              key={tab.id}
              aria-selected={tab.id === activeId}
              className={`${TAB_BASE} ${tab.id === activeId ? TAB_ACTIVE : TAB_INACTIVE}`}
              onClick={() => setActiveId(tab.id)}
              role="tab"
              type="button"
            >
              <Icon name={tab.tabIcon} className="text-[18px]" />
              {tab.tabLabel}
            </button>
          ))}
        </div>

        {/* key → swatch terpilih ter-reset saat berpindah tab */}
        <div ref={panelRef} data-reveal="card">
          <SpecPanel key={activeTab.id} panel={activeTab.panel} />
        </div>
      </div>
    </section>
  );
}
