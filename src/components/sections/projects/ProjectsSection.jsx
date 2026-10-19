import { useEffect, useRef, useState } from "react";
import Icon from "../../ui/Icon";
import { gsap, ScrollTrigger, MQ } from "../../../motion/gsap";
import SectionEyebrow from "../../ui/SectionEyebrow";
import WipeText from "../../ui/WipeText";
import ProjectCard from "./ProjectCard";
import useCarousel from "../../../hooks/useCarousel";
import { PROJECTS, PROJECTS_HEADER } from "../../../data/projects";

const pad = (n) => String(n).padStart(2, "0");

/** Desktop lebar + gerak penuh → slider dikunci (pinned) dan digeser oleh scroll. */
const PIN_MQ = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

const ARROW_BUTTON =
  "group w-12 h-12 rounded-full border border-outline-variant/50 bg-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-[background-color,color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center text-primary shadow-sm active:scale-95";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const barRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [shown, setShown] = useState(0);

  const { trackRef, activeIndex, next, prev, goTo, handleScroll, hoverHandlers } = useCarousel(
    PROJECTS.length,
    5500,
    !pinned,
  );

  // Sinkronkan mode dengan media query (sekali saat mount + saat berubah).
  useEffect(() => {
    const mq = window.matchMedia(PIN_MQ);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Mode pinned: scroll vertikal memindahkan track ke kiri (ScrollTrigger pin + scrub).
  useEffect(() => {
    if (!pinned) return undefined;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    gsap.set(track, { clearProps: "transform" });

    const mm = gsap.matchMedia();
    mm.add(PIN_MQ, () => {
      const distance = () => {
        const kids = track.children;
        if (!kids.length) return 0;
        const last = kids[kids.length - 1];
        const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
        const contentEnd = last.offsetLeft + last.offsetWidth - track.offsetLeft;
        return Math.max(0, contentEnd - (track.clientWidth - padRight));
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (distance() + window.innerHeight * 0.35),
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (barRef.current) barRef.current.style.width = `${Math.max(3, p * 100)}%`;
            const i = Math.round(p * (PROJECTS.length - 1));
            setShown((prevIndex) => (prevIndex === i ? prevIndex : i));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
      gsap.set(track, { clearProps: "transform" });
      setShown(0);
      if (barRef.current) barRef.current.style.width = "3%";
    };
  }, [pinned, trackRef]);

  // Storytelling horizontal: gambar bergeser pelan berlawanan arah saat slider digeser (desktop saja).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const medias = Array.from(track.querySelectorAll("[data-card-media]"));
      const setters = medias.map((el) => gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }));
      let ticking = false;
      const update = () => {
        ticking = false;
        const t = track.getBoundingClientRect();
        const center = t.left + t.width / 2;
        medias.forEach((el, i) => {
          const r = el.parentElement.getBoundingClientRect();
          const d = (r.left + r.width / 2 - center) / (t.width / 2 + r.width / 2);
          setters[i](gsap.utils.clamp(-1, 1, d) * -22);
        });
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };
      update();
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        track.removeEventListener("scroll", onScroll);
        gsap.set(medias, { x: 0 });
      };
    });
    return () => mm.revert();
  }, [trackRef]);

  const shownIndex = pinned ? shown : activeIndex;

  return (
    <section
      ref={sectionRef}
      data-section
      className="w-full bg-surface-container-low py-24 sm:py-32 overflow-hidden"
      id="proyek"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header & nav controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div data-reveal-group data-parallax-y="14">
            <SectionEyebrow>{PROJECTS_HEADER.eyebrow}</SectionEyebrow>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-light">
              <WipeText>{PROJECTS_HEADER.heading}</WipeText>
            </h2>
            <p data-reveal-item className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              {PROJECTS_HEADER.description}
            </p>
          </div>

          {!pinned && (
            <div className="flex items-center gap-3">
              <button aria-label="Geser ke kiri" className={ARROW_BUTTON} onClick={prev} type="button">
                <Icon name="arrow_back" className="text-[20px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1" />
              </button>
              <button aria-label="Geser ke kanan" className={ARROW_BUTTON} onClick={next} type="button">
                <Icon name="arrow_forward" className="text-[20px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
              </button>
              <div className="ml-2 hidden sm:flex items-center gap-1.5 font-spec-code text-spec-code text-on-surface-variant">
                <span className="text-primary font-bold">{pad(activeIndex + 1)}</span>
                <span>/</span>
                <span>{pad(PROJECTS.length)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Slider track */}
        <div
          ref={trackRef}
          className={`flex gap-6 no-scrollbar pb-8 -mx-6 px-6 lg:-mx-12 lg:px-12 ${
            pinned ? "overflow-clip" : "overflow-x-auto snap-x snap-mandatory scroll-smooth"
          }`}
          onScroll={handleScroll}
          {...(pinned ? {} : hoverHandlers)}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {pinned ? (
          /* Progres horizontal (scroll-driven) */
          <div className="mt-4 flex items-center gap-4">
            <span className="font-spec-code text-spec-code text-primary font-bold">
              {pad(shownIndex + 1)}
            </span>
            <div className="relative h-[3px] flex-1 overflow-hidden bg-outline-variant/50">
              <div
                ref={barRef}
                className="absolute inset-y-0 left-0 bg-secondary"
                style={{ width: "3%" }}
              ></div>
            </div>
            <span className="font-spec-code text-spec-code text-on-surface-variant">
              {pad(PROJECTS.length)}
            </span>
          </div>
        ) : (
          /* Pagination dots */
          <div className="flex items-center justify-center gap-2 mt-4">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                aria-label={`Slide ${index + 1}`}
                className={`slider-dot h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-primary" : "w-2 bg-outline-variant/60"
                }`}
                onClick={() => goTo(index)}
                type="button"
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
