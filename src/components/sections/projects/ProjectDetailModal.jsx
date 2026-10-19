import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "../../../motion/gsap";
import Icon from "../../ui/Icon";
import { SITE } from "../../../data/site";

/**
 * Modal detail proyek — galeri foto penuh, spesifikasi, dan highlight.
 * Mendukung scroll independen (data-lenis-prevent) dan koordinasi dengan Lenis.
 */
export default function ProjectDetailModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);

  const animateClose = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (panel && overlay) {
      const tl = gsap.timeline({ onComplete: onClose });
      tl.to(panel, { y: 20, opacity: 0, duration: 0.2, ease: "power2.in" }).to(
        overlay,
        { opacity: 0, duration: 0.15, ease: "power2.in" },
        "<0.05"
      );
    } else {
      onClose();
    }
  }, [onClose]);

  // Entrance animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (overlay && panel) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(panel, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
    }
  }, []);

  // Close on Escape & arrow navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") animateClose();
      if (!photos || photos.length <= 1) return;
      if (e.key === "ArrowRight") setActivePhoto((p) => (p + 1) % photos.length);
      if (e.key === "ArrowLeft") setActivePhoto((p) => (p - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateClose]);

  // Prevent background scroll
  useEffect(() => {
    window.__lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = prev;
    };
  }, []);

  if (!project) return null;

  const {
    images,
    image,
    alt,
    badge,
    place,
    client,
    title,
    description,
    chips = [],
    year,
    scope,
    specs = [],
    highlights = [],
  } = project;

  // Gunakan images[] jika ada, fallback ke [image]
  const photos = images && images.length > 0 ? images : image ? [image] : [];

  const waBase = SITE.social?.whatsapp || SITE.phones?.[0]?.waUrl || "https://wa.me/6281188088036";
  const waMessage = encodeURIComponent(
    `Halo Pilar Canopy, saya tertarik untuk konsultasi mengenai proyek "${title || ""}" (${client || ""} - ${place || ""}). Bisa info lebih lanjut?`
  );
  const waUrl = `${waBase}?text=${waMessage}`;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5"
      data-lenis-prevent
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary/85 backdrop-blur-md cursor-pointer"
        onClick={animateClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        ref={panelRef}
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto overscroll-contain modal-scroll rounded-2xl bg-surface-container-lowest shadow-2xl border border-outline-variant/30 flex flex-col"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Floating Close */}
        <button
          onClick={animateClose}
          className="sticky top-4 right-4 self-end z-30 mr-4 -mb-10 w-10 h-10 rounded-full bg-primary/90 hover:bg-secondary text-on-primary flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20 active:scale-90"
          aria-label="Tutup detail proyek"
          type="button"
        >
          <Icon name="close" className="text-[20px]" />
        </button>

        {/* ── Hero Foto Utama ─────────────────────────────────────── */}
        <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[440px] overflow-hidden rounded-t-2xl flex-none bg-surface-container">
          {photos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${alt || title} foto ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                idx === activePhoto ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-10">
            <span className="font-spec-code text-xs text-on-primary uppercase tracking-wider font-semibold">
              {badge}
            </span>
          </div>

          {/* Place */}
          <div className="absolute top-4 right-16 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-outline-variant/20 z-10">
            <span className="font-spec-code text-xs text-secondary font-bold uppercase">
              {place}
            </span>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h2 className="font-headline-lg text-xl sm:text-2xl lg:text-3xl text-white font-bold drop-shadow-md leading-tight">
              {title}
            </h2>
            <p className="font-spec-code text-xs text-white/70 mt-1">
              {photos.length} foto tersedia • Gunakan tombol panah atau thumbnail untuk navigasi
            </p>
          </div>

          {/* Prev / Next buttons */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={() => setActivePhoto((p) => (p - 1 + photos.length) % photos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90"
              >
                <Icon name="arrow_back_ios" className="text-[16px] ml-1" />
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={() => setActivePhoto((p) => (p + 1) % photos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90"
              >
                <Icon name="arrow_forward_ios" className="text-[16px]" />
              </button>
            </>
          )}
        </div>

        {/* ── Thumbnail Strip ─────────────────────────────────────── */}
        {photos.length > 1 && (
          <div className="flex-none w-full flex gap-2.5 items-center overflow-x-auto no-scrollbar px-5 py-3.5 bg-surface-container/60 border-b border-outline-variant/30">
            {photos.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhoto(idx)}
                className={`flex-none w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-95 ${
                  idx === activePhoto
                    ? "border-secondary ring-2 ring-secondary/30 shadow-md scale-105"
                    : "border-outline-variant/30 hover:border-secondary/60 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* ── Modal Body ──────────────────────────────────────────── */}
        <div className="flex-none w-full p-6 sm:p-8 space-y-6 bg-surface-container-lowest">
          {/* Client & Year */}
          <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-outline-variant/30">
            <span className="inline-flex items-center gap-1.5 font-spec-code text-xs sm:text-sm text-secondary font-semibold uppercase tracking-wider">
              <Icon name="business" className="text-[18px]" />
              {client}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <span className="font-spec-code text-xs sm:text-sm text-on-surface-variant font-medium">
              {year}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-headline-sm text-base font-bold text-primary mb-2">
              Tentang Proyek
            </h4>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {description}
            </p>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 bg-surface-container font-spec-code text-xs text-primary rounded-full border border-outline-variant/40 font-medium"
              >
                #{chip}
              </span>
            ))}
          </div>

          {/* Specs & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {specs && specs.length > 0 && (
              <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30">
                <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="build" className="text-[18px]" />
                  </div>
                  <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">
                    Spesifikasi Teknis
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface-variant">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-none" />
                      <span className="leading-relaxed">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {highlights && highlights.length > 0 && (
              <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30">
                <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
                    <Icon name="star" className="text-[18px]" />
                  </div>
                  <h4 className="font-headline-sm text-sm sm:text-base text-primary font-bold">
                    Keunggulan Proyek
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-on-surface-variant">
                      <Icon name="check_circle" className="text-[16px] text-secondary mt-0.5 flex-none" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Scope of Work */}
          {scope && (
            <div className="bg-surface-container/60 rounded-xl p-4 border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="assignment" className="text-[16px] text-secondary" />
                <span className="font-spec-code text-xs text-secondary font-bold uppercase tracking-wider">
                  Lingkup Pekerjaan
                </span>
              </div>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant pl-6">
                {scope}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-headline-sm text-xs sm:text-sm font-semibold text-primary">
                Tertarik membuat kanopi atau struktur serupa?
              </p>
              <p className="font-body-md text-xs text-on-surface-variant">
                Konsultasikan kebutuhan desain dan estimasi harga bersama tim arsitek kami.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={animateClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-outline-variant/50 hover:bg-surface-container text-xs font-semibold text-on-surface-variant transition-colors"
              >
                Tutup
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-semibold text-xs sm:text-sm hover:brightness-110 transition-all shadow-md active:scale-95"
              >
                <Icon name="chat" className="text-[16px]" />
                <span>Konsultasi Proyek</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}



/**
 * Modal detail proyek — tampilkan gambar besar, spesifikasi, dan highlight.
 * Mendukung scroll independen (data-lenis-prevent) dan koordinasi dengan Lenis smooth scroll.
 */