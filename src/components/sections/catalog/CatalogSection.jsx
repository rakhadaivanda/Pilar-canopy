import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import SectionEyebrow from "../../ui/SectionEyebrow";
import Icon from "../../ui/Icon";
import { CATALOG_HEADER, CATALOG_ITEMS } from "../../../data/catalog";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";
import catalogBg from "../../../assets/images/materials/background(4).png";

/* ─── Auto-Slideshow Card untuk Katalog ───────────────────────────────────── */
function CatalogCard({ item, onClick }) {
  const { images = [], name, category, desc } = item;
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef(null);

  const startSlide = useCallback(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((p) => (p + 1) % images.length);
    }, 3000);
  }, [images.length]);

  const stopSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startSlide();
    return stopSlide;
  }, [startSlide, stopSlide]);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(); } }}
      className="group relative bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl border border-outline-variant/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Foto Area */}
      <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-surface-container">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${name} variasi ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              idx === activeIdx ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-10">
          <span className="font-spec-code text-[10px] text-on-primary uppercase tracking-wider font-semibold">
            {category}
          </span>
        </div>

        {/* Foto Count Badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg z-10 flex items-center gap-1">
          <Icon name="photo_library" className="text-[12px] text-white" />
          <span className="font-spec-code text-[10px] text-white font-bold">{images.length}</span>
        </div>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Foto ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); stopSlide(); setActiveIdx(idx); setTimeout(startSlide, 3100); }}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIdx ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/35 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-primary/95 backdrop-blur-sm text-on-primary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
            <Icon name="zoom_in" className="text-[18px]" />
            <span className="font-spec-code text-[11px] uppercase tracking-wider font-semibold">
              Lihat {images.length} Foto
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-headline-sm text-base font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 leading-relaxed flex-1">
          {desc}
        </p>

        {/* CTA Row */}
        <div className="mt-4 flex gap-2">
          <a
            href={buildWhatsAppUrl(`Halo Pilar Canopy, saya tertarik dan ingin tanya harga untuk "${name}" (${category}). Mohon info estimasi biaya dan spesifikasinya.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-secondary/10 hover:bg-secondary text-secondary hover:text-on-secondary font-semibold text-xs transition-all duration-200 border border-secondary/30 hover:border-secondary shadow-sm active:scale-95"
          >
            <Icon name="chat" className="text-[15px]" />
            <span>Tanya Harga</span>
          </a>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            className="px-3 py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-semibold text-xs transition-all duration-200 border border-outline-variant/30 hover:border-primary active:scale-95"
          >
            <Icon name="photo_library" className="text-[15px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Modal Galeri Katalog ────────────────────────────────────────────────── */
function CatalogModal({ item, onClose }) {
  const overlayRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const { images = [], name, category, desc } = item;

  // Block scroll
  useEffect(() => {
    window.__lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.__lenis?.start(); document.body.style.overflow = prev; };
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActivePhoto((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setActivePhoto((p) => (p - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, images.length]);

  const waUrl = buildWhatsAppUrl(
    `Halo Pilar Canopy, saya tertarik dan ingin tanya harga untuk "${name}" (${category}). Mohon info estimasi biaya dan spesifikasinya.`
  );

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5" data-lenis-prevent>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary/85 backdrop-blur-md cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-label={name}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto overscroll-contain modal-scroll rounded-2xl bg-surface-container-lowest shadow-2xl border border-outline-variant/30 flex flex-col animate-[fadeSlideUp_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 self-end z-30 mr-4 -mb-10 w-10 h-10 rounded-full bg-primary/90 hover:bg-secondary text-on-primary flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20 active:scale-90"
          aria-label="Tutup galeri katalog"
          type="button"
        >
          <Icon name="close" className="text-[20px]" />
        </button>

        {/* Hero foto */}
        <div className="relative w-full h-[260px] sm:h-[380px] overflow-hidden rounded-t-2xl flex-none bg-surface-container">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${name} foto ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                idx === activePhoto ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-10">
            <span className="font-spec-code text-xs text-on-primary uppercase tracking-wider font-semibold">{category}</span>
          </div>

          {/* Title */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h2 className="font-headline-lg text-xl sm:text-2xl text-white font-bold drop-shadow-md">{name}</h2>
            <p className="font-spec-code text-xs text-white/70 mt-1">{images.length} foto tersedia</p>
          </div>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto sebelumnya"
                onClick={() => setActivePhoto((p) => (p - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90"
              >
                <Icon name="arrow_back_ios" className="text-[16px] ml-1" />
              </button>
              <button
                type="button"
                aria-label="Foto berikutnya"
                onClick={() => setActivePhoto((p) => (p + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90"
              >
                <Icon name="arrow_forward_ios" className="text-[16px]" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex-none w-full flex gap-2.5 items-center overflow-x-auto no-scrollbar px-5 py-3.5 bg-surface-container/60 border-b border-outline-variant/30">
            {images.map((src, idx) => (
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

        {/* Body */}
        <div className="flex-none w-full p-6 sm:p-8 space-y-5 bg-surface-container-lowest">
          <div>
            <span className="inline-block px-3 py-1 bg-surface-container font-spec-code text-xs text-primary rounded-full border border-outline-variant/30 font-semibold mb-3">
              {category}
            </span>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">{desc}</p>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-headline-sm text-xs sm:text-sm font-semibold text-primary">Tertarik dengan model ini?</p>
              <p className="font-body-md text-xs text-on-surface-variant">Konsultasikan estimasi harga dan spesifikasi langsung bersama kami.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
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
                <span>Tanya Harga</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── CatalogSection ──────────────────────────────────────────────────────── */
export default function CatalogSection() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <section
        data-section
        className="relative w-full overflow-hidden bg-sand py-20 sm:py-28"
        id="katalog"
      >
        {/* Background Graphic: background(4).png */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={catalogBg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right-bottom sm:object-center opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-sand/45 to-sand/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div data-reveal-group className="max-w-3xl mb-14">
            <SectionEyebrow className="mb-3">{CATALOG_HEADER.eyebrow}</SectionEyebrow>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
              {CATALOG_HEADER.heading}
            </h2>
            <p className="font-body-md text-base text-on-surface-variant mt-2 leading-relaxed">
              {CATALOG_HEADER.description}
            </p>
          </div>

          {/* Grid Katalog */}
          <div
            data-stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
          >
            {CATALOG_ITEMS.map((item) => (
              <CatalogCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal detail katalog */}
      {selectedItem && (
        <CatalogModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
