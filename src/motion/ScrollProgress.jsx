import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Garis progres oranye tipis di tepi atas viewport.
 * ScrollTrigger (scrub) — otomatis sinkron dengan Lenis.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return undefined;
    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 0 });
      return undefined;
    }
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]">
      <div ref={barRef} className="h-full w-full origin-left bg-secondary" />
    </div>
  );
}
