import { gsap, MQ } from "./gsap";

/**
 * Kartu miring mengikuti arah mouse + sorot oranye mengikuti kursor.
 * Atribut: data-tilt  ·  desktop pointer halus saja (lihat MQ.finePointer).
 * Elemen yang dianimasikan di sini tidak boleh punya transisi transform di CSS.
 */
export default function initTilt() {
  const mm = gsap.matchMedia();

  mm.add(MQ.finePointer, () => {
    const els = gsap.utils.toArray("[data-tilt]");

    const cleanups = els.map((el) => {
      gsap.set(el, { transformPerspective: 900, transformOrigin: "50% 50%" });

      const rx = gsap.quickTo(el, "rotationX", { duration: 0.55, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.55, ease: "power3.out" });
      const lift = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

      const reset = () => {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
        rx(0);
        ry(0);
        lift(0);
      };

      const onEnter = () => {
        gsap.to(el, { scale: 1.015, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      };

      const onMove = (event) => {
        const r = el.getBoundingClientRect();
        const px = (event.clientX - r.left) / r.width;
        const py = (event.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        ry((px - 0.5) * 13);
        rx((0.5 - py) * 11);
        lift(-9);
      };

      const onLeave = () => {
        gsap.to(el, { scale: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        reset();
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.set(el, { clearProps: "transform,transformPerspective,transformOrigin,scale" });
        el.style.removeProperty("--mx");
        el.style.removeProperty("--my");
      };
    });

    return () => cleanups.forEach((fn) => fn());
  });

  return () => mm.revert();
}
