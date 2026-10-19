import { gsap, MQ } from "./gsap";

/**
 * Tombol magnetik: bergeser maks. 8px menuju kursor saat didekati.
 * Mati di layar sentuh/tablet dan saat reduced-motion.
 */
export default function initMagnetic() {
  const mm = gsap.matchMedia();
  mm.add(`${MQ.finePointer} and (prefers-reduced-motion: no-preference)`, () => {
    const MAX = 8;
    const REACH = 56; // jarak aktif di luar tepi tombol
    const items = gsap.utils.toArray("[data-magnetic]").map((el) => ({
      el,
      icon: el.querySelector(".material-symbols-outlined"),
      x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
    }));

    const onMove = (e) => {
      for (const it of items) {
        const r = it.el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const inside =
          e.clientX > r.left - REACH &&
          e.clientX < r.right + REACH &&
          e.clientY > r.top - REACH &&
          e.clientY < r.bottom + REACH;
        if (inside) {
          const dx = gsap.utils.clamp(-MAX, MAX, (e.clientX - cx) * 0.18);
          const dy = gsap.utils.clamp(-MAX, MAX, (e.clientY - cy) * 0.18);
          it.x(dx);
          it.y(dy);
          if (it.icon) gsap.to(it.icon, { x: dx * 0.4, y: dy * 0.4, duration: 0.5, overwrite: true });
          it.on = true;
        } else if (it.on) {
          it.on = false;
          it.x(0);
          it.y(0);
          if (it.icon) gsap.to(it.icon, { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: true });
        }
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      items.forEach((it) => gsap.set([it.el, it.icon].filter(Boolean), { clearProps: "transform" }));
    };
  });
  return () => mm.revert();
}
