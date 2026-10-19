import { useEffect, useRef, useState } from "react";
import { gsap, MQ } from "./gsap";

const INTERACTIVE = "a, button, [role='tab'], summary, label, select";

/**
 * Kursor minimal (desktop pointer halus saja):
 *  - titik kecil saat normal
 *  - membesar menjadi cincin di atas elemen interaktif
 *  - berubah menjadi label ("VIEW" / "EXPLORE") di atas elemen [data-cursor]
 * Input teks tetap memakai kursor native.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const wrap = useRef(null);
  const disc = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(`${MQ.finePointer} and (prefers-reduced-motion: no-preference)`);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add("has-cursor");

    const x = gsap.quickTo(wrap.current, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(wrap.current, "y", { duration: 0.35, ease: "power3.out" });
    gsap.set(wrap.current, { xPercent: -50, yPercent: -50, opacity: 0 });

    let shown = false;
    let mode = "dot";
    let current = "";
    const apply = (next, text = "") => {
      if (next === mode && text === current) return;
      mode = next;
      current = text;
      setLabel(text);
      const size = next === "label" ? 84 : next === "ring" ? 38 : 8;
      gsap.to(disc.current, {
        width: size,
        height: size,
        backgroundColor: next === "ring" ? "rgba(224,109,44,0.16)" : "#401D47",
        borderColor: next === "ring" ? "#E06D2C" : "transparent",
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.set(wrap.current, { x: e.clientX, y: e.clientY });
        gsap.to(wrap.current, { opacity: 1, duration: 0.3 });
      }
      x(e.clientX);
      y(e.clientY);
    };
    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const tagged = t.closest("[data-cursor]");
      if (tagged) return apply("label", tagged.dataset.cursor);
      if (t.closest(INTERACTIVE)) return apply("ring");
      apply("dot");
    };
    const onLeave = () => gsap.to(wrap.current, { opacity: 0, duration: 0.2 });
    const onEnter = () => shown && gsap.to(wrap.current, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] will-change-transform"
    >
      <div
        ref={disc}
        className="flex items-center justify-center rounded-full border border-transparent bg-primary"
        style={{ width: 8, height: 8 }}
      >
        <span
          className="font-label-caps text-[10px] font-semibold uppercase tracking-[0.18em] text-on-primary transition-opacity duration-300"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
