import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Kurva easing & breakpoint bersama — satu bahasa gerak untuk seluruh situs. */
export const EASE = {
  out: "expo.out", // masuk: cepat lalu mengendap halus
  soft: "power3.out",
  inOut: "power3.inOut",
};

export const MQ = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;

export { gsap, ScrollTrigger, SplitText };
