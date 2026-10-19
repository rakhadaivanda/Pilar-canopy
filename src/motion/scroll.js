import { gsap, ScrollTrigger, SplitText, EASE, MQ } from "./gsap";

/**
 * Seluruh gerak berbasis scroll, dikendalikan lewat atribut data-* di JSX:
 *
 *  data-reveal-group          container; anak [data-reveal-item] muncul berurutan
 *  data-reveal-item="heading" y 60 → 0   (tanpa nilai = teks, y 30 → 0)
 *  data-reveal="image|card"   elemen tunggal (image: scale 1.08→1, card: y 50→0)
 *  data-stagger               grid; anak langsung masuk per baris (batch)
 *  data-project-card          clip-path inset(0 0 100% 0) → 0 + gambar 1.12 → 1
 *  data-parallax-y="N"        elemen teks bergeser ±N px relatif terhadap scroll
 *  data-counter               angka 0 → nilai akhir (sekali saja)
 *  data-section               transisi antarbagian (panel melebar saat masuk)
 *  data-wipe                  judul terbaca lewat sapuan bar oranye
 *  data-fill-text             kata demi kata terisi warna mengikuti scroll
 *  data-hero-*                scroll-out hero
 *
 * Mobile: jarak & stagger dikurangi, parallax berat dimatikan.
 * Reduced motion: hanya fade opacity.
 */
const START = "top 86%";
const FILL_REST = "rgba(64, 29, 71, 0.16)";
const FILL_FULL = "#401D47";

function clearWhenDone(targets) {
  gsap.set(targets, { clearProps: "transform,opacity,transition,clipPath,filter" });
}

function initCounters(reduce) {
  gsap.utils.toArray("[data-counter]").forEach((el) => {
    const finalText = el.textContent;
    const nums = finalText.match(/\d+/g);
    if (!nums) return;
    el.setAttribute("aria-label", finalText);
    if (reduce) return; // tampilkan nilai akhir apa adanya

    const render = (p) => {
      let i = 0;
      el.textContent = finalText.replace(/\d+/g, () => Math.round(Number(nums[i++]) * p));
    };
    render(0);
    const state = { p: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(state, {
          p: 1,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => render(state.p),
          onComplete: () => (el.textContent = finalText),
        }),
    });
  });
}

export default function initScrollMotion() {
  const mm = gsap.matchMedia();

  /* ===================== Reduced motion ===================== */
  mm.add(MQ.reduce, () => {
    gsap.utils
      .toArray("[data-reveal], [data-reveal-item], [data-stagger] > *, [data-project-card]")
      .forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.5,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onComplete: () => clearWhenDone(el),
        });
      });
    // Sapuan oranye disembunyikan; judul tampil utuh.
    gsap.utils
      .toArray("[data-wipe-bar]")
      .forEach((bar) => gsap.set(bar, { display: "none" }));
    initCounters(true);
  });

  /* ===================== Gerak penuh ===================== */
  mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
    const { mobile } = ctx.conditions;
    const k = mobile ? 0.55 : 1; // faktor jarak
    const stag = mobile ? 0.07 : 0.1;
    const dur = mobile ? 0.8 : 1.1;
    const blurIn = mobile ? null : (px) => ({ filter: `blur(${px}px)` });
    const blurOut = mobile ? null : { filter: "blur(0px)" };
    const disposers = [];

    /* ---- Group: eyebrow + heading + paragraf, satu trigger ---- */
    gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
      const items = group.querySelectorAll("[data-reveal-item]");
      if (!items.length) return;
      items.forEach((el) =>
        gsap.set(el, {
          opacity: 0,
          y: (el.dataset.revealItem === "heading" ? 60 : 30) * k,
          ...(blurIn ? blurIn(10) : {}),
          transition: "none",
        }),
      );
      gsap.to(items, {
        opacity: 1,
        y: 0,
        ...(blurOut || {}),
        duration: dur,
        ease: EASE.out,
        stagger: stag + 0.04,
        scrollTrigger: { trigger: group, start: START, once: true },
        onComplete: () => clearWhenDone(items),
      });
    });

    /* ---- Elemen tunggal ---- */
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      const type = el.dataset.reveal;
      const isImage = type === "image";
      const from = isImage
        ? { opacity: 0, scale: 1.08 }
        : { opacity: 0, y: (type === "heading" ? 60 : 50) * k };
      gsap.set(el, { ...from, ...(blurIn && !isImage ? blurIn(8) : {}), transition: "none" });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        ...(blurOut && !isImage ? blurOut : {}),
        duration: isImage ? 1.4 : dur,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start: START, once: true },
        onComplete: () => clearWhenDone(el),
      });
    });

    /* ---- Grid: stagger per baris (batch) ---- */
    gsap.utils.toArray("[data-stagger]").forEach((grid) => {
      const kids = gsap.utils.toArray(grid.children);
      gsap.set(kids, { opacity: 0, y: 50 * k, transition: "none" });
      ScrollTrigger.batch(kids, {
        start: "top 90%",
        once: true,
        interval: 0.1,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: dur,
            stagger: stag,
            ease: EASE.out,
            onComplete: () => clearWhenDone(batch),
          }),
      });
    });

    /* ---- Judul: sapuan bar oranye (curtain reveal) ---- */
    gsap.utils.toArray("[data-wipe]").forEach((el) => {
      const bar = el.querySelector("[data-wipe-bar]");
      const inner = el.querySelector("[data-wipe-inner]");
      if (!bar || !inner) return;
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(inner, { opacity: 0, y: mobile ? 14 : 28 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: START, once: true } });
      tl.to(bar, { scaleX: 1, duration: 0.45, ease: EASE.inOut })
        .set(bar, { transformOrigin: "right center" })
        .set(inner, { opacity: 1 })
        .to(bar, { scaleX: 0, duration: 0.55, ease: EASE.inOut })
        .to(inner, { y: 0, duration: 0.55, ease: EASE.out }, "<")
        .set(bar, { clearProps: "transform,transformOrigin" })
        .set(inner, { clearProps: "opacity,transform" });
    });

    /* ---- Teks keisi warna kata demi kata, terikat scroll ---- */
    gsap.utils.toArray("[data-fill-text]").forEach((el) => {
      const split = SplitText.create(el, { type: "words", wordsClass: "fill-word" });
      disposers.push(() => split.revert());
      gsap.set(split.words, { color: FILL_REST });
      gsap.to(split.words, {
        color: FILL_FULL,
        duration: 1,
        ease: "none",
        stagger: 0.35,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: () => "+=" + Math.max(180, el.offsetHeight + window.innerHeight * 0.25),
          scrub: 0.6,
        },
      });
    });

    /* ---- Kartu proyek: clip-path + gambar 1.12 → 1 ---- */
    const cards = gsap.utils.toArray("[data-project-card]");
    if (cards.length) {
      gsap.set(cards, { clipPath: "inset(0 0 100% 0)" });
      const medias = cards.map((c) => c.querySelector("[data-card-media]"));
      gsap.set(medias.filter(Boolean), { scale: 1.12 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        interval: 0.12,
        onEnter: (batch) => {
          gsap.to(batch, {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            stagger: stag + 0.04,
            ease: EASE.inOut,
            onComplete: () => gsap.set(batch, { clearProps: "clipPath" }),
          });
          gsap.to(
            batch.map((c) => c.querySelector("[data-card-media]")).filter(Boolean),
            { scale: 1, duration: 1.8, stagger: stag + 0.04, ease: "power3.out" },
          );
        },
      });
    }

    /* ---- Teks proyek bergeser dengan kecepatan berbeda dari gambar (desktop) ---- */
    if (!mobile) {
      gsap.utils.toArray("[data-parallax-y]").forEach((el) => {
        const n = Number(el.dataset.parallaxY) || 16;
        gsap.fromTo(
          el,
          { y: n },
          {
            y: -n,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      /* ---- Transisi antarbagian: panel melebar halus saat masuk viewport ---- */
      gsap.utils.toArray("[data-section]").forEach((sec) => {
        gsap.fromTo(
          sec,
          { clipPath: "inset(0% 2.5% 0% 2.5%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: sec, start: "top 100%", end: "top 45%", scrub: 0.5 },
          },
        );
      });

      /* ---- Hero keluar dengan lembut ---- */
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
        const media = hero.querySelector("[data-hero-media]");
        const content = hero.querySelector("[data-hero-content]");
        if (media) gsap.to(media, { yPercent: 8, ease: "none", scrollTrigger: st });
        if (content) gsap.to(content, { y: -36, ease: "none", scrollTrigger: st });
      }
    }

    initCounters(false);

    return () => disposers.forEach((fn) => fn());
  });

  /* Pastikan posisi trigger akurat setelah font & gambar selesai dimuat. */
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh);

  return () => {
    window.removeEventListener("load", refresh);
    mm.revert();
  };
}
