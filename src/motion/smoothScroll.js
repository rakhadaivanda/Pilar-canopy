import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Smooth scroll (Lenis) yang disinkronkan dengan ScrollTrigger.
 * Hanya aktif untuk wheel/trackpad — layar sentuh tetap memakai scroll native
 * agar terasa cepat, dan reduced-motion dihormati.
 * Mengembalikan fungsi cleanup.
 */
export default function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Tautan anchor (#proyek dst.) — hormati scroll-margin-top seperti perilaku native.
  const onClick = (event) => {
    const link = event.target.closest?.('a[href^="#"]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return;
    const hash = link.getAttribute("href");
    if (hash === "#") {
      event.preventDefault();
      lenis.scrollTo(0, { duration: 1.4 });
      return;
    }
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    lenis.scrollTo(target, { offset: -margin, duration: 1.4 });
    history.pushState(null, "", hash);
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
