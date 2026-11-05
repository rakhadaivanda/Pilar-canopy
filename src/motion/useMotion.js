import { useLayoutEffect } from "react";
import initSmoothScroll from "./smoothScroll";
import initIntro from "./intro";
import initScrollMotion from "./scroll";
import initMagnetic from "./magnetic";
import initTilt from "./tilt";

/** Menyalakan seluruh sistem gerak sekali di level App (aman untuk StrictMode). */
export default function useMotion() {
  useLayoutEffect(() => {
    const cleanups = [
      initSmoothScroll(),
      initIntro(),
      initScrollMotion(),
      initMagnetic(),
      initTilt(),
    ];
    return () => cleanups.reverse().forEach((fn) => fn?.());
  }, []);
}
