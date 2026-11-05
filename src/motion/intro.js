import { gsap, SplitText, EASE, MQ, prefersReducedMotion } from "./gsap";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Urutan pembuka (±1 detik, halaman tetap bisa diklik karena overlay pointer-events:none):
 *   brand → tirai terangkat → gambar hero → headline per baris → paragraf → CTA → navbar.
 */
export default function initIntro() {
  const q = (s) => document.querySelector(s);
  const qa = (s) => gsap.utils.toArray(s);

  const veil = q("[data-preloader]");
  const mark = q("[data-preloader-mark]");
  const media = q("[data-hero-media]");
  const dark = q("[data-hero-veil]");
  const h1 = q("[data-hero-title]");
  const fades = qa("[data-hero-fade]");
  const ctas = qa("[data-hero-cta]");
  const navInner = q("[data-nav-inner]");
  const scrollCue = q("[data-hero-cue]");
  const content = q("[data-hero-content]");
  if (!media || !h1) return () => {};

  const mm = gsap.matchMedia();
  let split;
  let cancelled = false;

  const hideVeil = () => veil && gsap.set(veil, { display: "none" });

  /* ---------- Reduced motion: hanya fade sederhana ---------- */
  mm.add(MQ.reduce, () => {
    hideVeil();
    gsap.set(dark, { opacity: 0 });
    gsap.from([content, navInner, scrollCue].filter(Boolean), {
      opacity: 0,
      duration: 0.5,
      ease: "none",
    });
  });

  /* ---------- Gerak penuh (desktop & mobile, jarak/stagger dikurangi di mobile) ---------- */
  mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
    const { mobile } = ctx.conditions;
    const dist = mobile ? 18 : 30;
    const stag = mobile ? 0.07 : 0.1;
    const T = 0.95; // saat tirai mulai terangkat → konten hero mengikuti
    const count = q("[data-preloader-count]");
    const bar = q("[data-preloader-bar]");

    const tl = gsap.timeline({ defaults: { ease: EASE.out } });

    if (veil) {
      gsap.set(mark, { opacity: 0, y: 14 });
      tl.to(mark, { opacity: 1, y: 0, duration: 0.4 }, 0)
        .to(mark, { opacity: 0, y: -10, duration: 0.22, ease: "power2.in" }, 0.5);

      // Hitung persen & garis progres oranye.
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      if (bar) tl.to(bar, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0);
      if (count) {
        const state = { n: 0 };
        tl.to(
          state,
          {
            n: 100,
            duration: 0.8,
            ease: "power2.inOut",
            onUpdate: () => {
              count.textContent = String(Math.round(state.n)).padStart(2, "0");
            },
          },
          0,
        );
      }

      tl.to(veil, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: EASE.inOut }, T).set(
        veil,
        { display: "none" },
      );
    }

    // Gambar/video hero: skala 1.08 → 1 dan overlay gelap tipis memudar.
    gsap.set(media, { scale: 1.08 });
    gsap.set(dark, { opacity: 0.4 });
    tl.to(media, { scale: 1, duration: 1.8, ease: "power3.out" }, T - 0.1);
    tl.to(dark, { opacity: 0, duration: 1.4, ease: "power2.out" }, T - 0.1);

    // Navbar turun halus.
    if (navInner) tl.from(navInner, { opacity: 0, y: -16, duration: 0.8 }, T + 0.3);

    // Headline baris demi baris (mask agar baris "keluar" dari garis dasar).
    const ready = Promise.race([document.fonts?.ready ?? Promise.resolve(), wait(700)]);
    gsap.set(h1, { visibility: "hidden" });
    ready.then(() => {
      if (cancelled) return;
      split = SplitText.create(h1, {
        type: "lines",
        mask: "lines",
        linesClass: "hero-line",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(h1, { visibility: "visible" });
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: mobile ? 0.9 : 1.2,
            stagger: stag,
            ease: EASE.out,
            delay: Math.max(0, T + 0.1 - tl.time()),
          });
        },
      });
    });

    // Paragraf & badge → CTA (stagger) → indikator scroll.
    tl.from(fades, { opacity: 0, y: dist, duration: 0.9, stagger: stag }, T + 0.45);
    tl.from(
      ctas,
      { opacity: 0, y: dist * 0.8, duration: 0.8, stagger: stag + 0.04, clearProps: "opacity,transform" },
      T + 0.7,
    );
    if (scrollCue) tl.from(scrollCue, { opacity: 0, duration: 0.8, ease: "none" }, T + 1.1);

    return () => {
      cancelled = true;
      split?.revert();
      gsap.set(h1, { clearProps: "visibility" });
    };
  });

  /* ---------- Parallax halus mengikuti mouse (desktop pointer halus saja) ---------- */
  const mmPointer = gsap.matchMedia();
  mmPointer.add(`${MQ.finePointer} and (prefers-reduced-motion: no-preference)`, () => {
    const grid = q("[data-hero-grid]");
    const mx = gsap.quickTo(media, "x", { duration: 1.4, ease: "power3.out" });
    const my = gsap.quickTo(media, "y", { duration: 1.4, ease: "power3.out" });
    const gx = grid && gsap.quickTo(grid, "x", { duration: 1.8, ease: "power3.out" });
    const gy = grid && gsap.quickTo(grid, "y", { duration: 1.8, ease: "power3.out" });
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx(nx * -18);
      my(ny * -12);
      gx?.(nx * 8);
      gy?.(ny * 6);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  });

  return () => {
    cancelled = true;
    mm.revert();
    mmPointer.revert();
  };
}
