import { useLayoutEffect, useRef } from "react";
import { gsap, MQ } from "./gsap";

/**
 * Pembungkus gambar dengan parallax vertikal halus (±~30px).
 * Wrapper sedikit lebih besar dari kontainernya (hanya ≥ md) agar tepi tidak terlihat.
 * Mobile & reduced-motion: tidak ada pergerakan (gambar tampil seperti aslinya).
 */
export default function ParallaxMedia({ children, amount = 6, wide = false, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.4 },
        },
      );
    });
    return () => mm.revert();
  }, [amount]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 will-change-transform md:-inset-y-[8%] ${wide ? "md:-inset-x-[5%]" : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

