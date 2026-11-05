import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_GAP = 24; // sama dengan `gap-6` pada track
const END_TOLERANCE = 20;

/**
 * Logika carousel berbasis scroll-snap (sama dengan JS vanilla pada desain asli):
 * tombol prev/next, titik navigasi, indikator indeks, dan auto-slide yang berhenti saat di-hover.
 */
export default function useCarousel(count, autoPlayMs = 5500, enabled = true) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const getStep = useCallback(() => {
    const first = trackRef.current?.querySelector("[data-slide]");
    return first ? first.offsetWidth + SLIDE_GAP : 500;
  }, []);

  const next = useCallback(() => {
    trackRef.current?.scrollBy({ left: getStep(), behavior: "smooth" });
  }, [getStep]);

  const prev = useCallback(() => {
    trackRef.current?.scrollBy({ left: -getStep(), behavior: "smooth" });
  }, [getStep]);

  const goTo = useCallback(
    (index) => {
      trackRef.current?.scrollTo({ left: index * getStep(), behavior: "smooth" });
    },
    [getStep],
  );

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / getStep());
    setActiveIndex(Math.max(0, Math.min(index, count - 1)));
  }, [count, getStep]);

  // Auto-slide: kembali ke awal ketika sudah mentok di akhir.
  useEffect(() => {
    if (!enabled || paused) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - END_TOLERANCE) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: getStep(), behavior: "smooth" });
      }
    }, autoPlayMs);

    return () => clearInterval(timer);
  }, [enabled, paused, autoPlayMs, getStep]);

  return {
    trackRef,
    activeIndex,
    next,
    prev,
    goTo,
    handleScroll,
    hoverHandlers: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
    },
  };
}
