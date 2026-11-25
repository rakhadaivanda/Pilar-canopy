import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import SectionEyebrow from "../../ui/SectionEyebrow";
import Icon from "../../ui/Icon";
import { CATALOG_HEADER, CATALOG_ITEMS } from "../../../data/catalog";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";
import catalogBg from "../../../assets/images/materials/background(4).png";
import ImageLightbox from "../../ui/ImageLightbox";

const CATALOG_CATEGORIES = [
  "Awning",
  "Glamping",
  "Carport",
  "Kanopi",
  "Lapangan",
  "Tribun",
  "Gerbang",
];

/* ─── Auto-Slideshow Card untuk Katalog ───────────────────────────────────── */
function CatalogCard({ item, onClick }) {
  const {
    images = [],
    name,
    category,
    alt,
    desc,
    priceAmount = "1.200.000",
    priceUnit = "/m",
    specs = {},
  } = item;

  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef(null);

  const startSlide = useCallback(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((p) => (p + 1) % images.length);
    }, 3200);
  }, [images.length]);

  const stopSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startSlide();
    return stopSlide;
  }, [startSlide, stopSlide]);

  const waUrl = buildWhatsAppUrl(
    `Halo Pilar Canopy, saya tertarik dan ingin tanya harga untuk "${name}" (${category}).\n\nSpesifikasi:\n- Rangka: ${specs?.rangka || "-"}\n- Dimensi: ${specs?.dimension || "-"}\n- Kain: ${specs?.kain || "-"}\n\nMohon info estimasi biaya dan konsultasinya.`
  );

  return (
    <div
      onClick={() => onClick?.()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 cursor-pointer overflow-hidden flex flex-col text-left"
    >
      {/* ── 1. Foto Katalog (Gambar 1) ── */}
      <div className="relative w-full h-[240px] sm:h-[270px] overflow-hidden bg-surface-container select-none">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${alt || name} foto ${idx + 1}`}
            title={`${alt || name} foto ${idx + 1}`}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              idx === activeIdx ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-black/20 pointer-events-none" />

        {/* Category Badge (Top Left) */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 z-10 shadow-sm">
          <span className="font-spec-code text-[10px] text-on-primary uppercase tracking-wider font-semibold">
            {category}
          </span>
        </div>

        {/* Foto Count Badge (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md z-10 flex items-center gap-1">
          <Icon name="photo_library" className="text-[12px] text-white" />
          <span className="font-spec-code text-[10px] text-white font-bold">{images.length} Foto</span>
        </div>

        {/* Slideshow Dots (Bottom Center) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Foto ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  stopSlide();
                  setActiveIdx(idx);
                  setTimeout(startSlide, 3200);
                }}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover overlay button */}
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-primary/95 backdrop-blur-sm text-on-primary px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Icon name="zoom_in" className="text-[16px]" />
            <span className="font-spec-code text-[11px] uppercase tracking-wider font-semibold">
              Lihat Detail
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Caption Area (Gambar 2) ── */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-surface-container-lowest">
        <div>
          {/* Starts From Badge */}
          <div className="inline-flex items-center gap-2.5 bg-black text-white px-3 py-1.5 rounded shadow-sm">
            <div className="flex flex-col text-[9px] font-extrabold uppercase leading-[1.05] tracking-tight text-white/95">
              <span>Starts</span>
              <span>From</span>
            </div>
            <div className="text-sm sm:text-base font-black text-[#F5A623] tracking-tight flex items-baseline">
              <span className="text-[11px] font-bold mr-0.5">Rp</span>
              <span>{priceAmount}</span>
              <span className="text-[11px] font-normal text-white/75 ml-0.5">{priceUnit}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-headline-lg text-lg sm:text-xl font-bold tracking-tight text-primary mt-3 mb-2 uppercase group-hover:text-secondary transition-colors duration-300">
            {name}
          </h3>

          {/* Technical Specifications */}
          <div className="space-y-1.5 text-xs text-on-surface-variant font-body-md">
            {specs?.rangka && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-primary min-w-[70px] shrink-0">Rangka</span>
                <span className="text-on-surface-variant/70 shrink-0">:</span>
                <span className="text-on-surface-variant/90 font-medium">{specs.rangka}</span>
              </div>
            )}
            {specs?.dimension && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-primary min-w-[70px] shrink-0">Dimension</span>
                <span className="text-on-surface-variant/70 shrink-0">:</span>
                <span className="text-on-surface-variant/90 font-medium">{specs.dimension}</span>
              </div>
            )}
            {specs?.kain && (
              <div className="flex items-baseline gap-1.5">
                <span className="font-semibold text-primary min-w-[70px] shrink-0">Kain</span>
                <span className="text-on-surface-variant/70 shrink-0">:</span>
                <span className="text-on-surface-variant/90 font-medium">{specs.kain}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* CTA Row */}
          <div className="flex gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-secondary hover:bg-secondary/90 text-on-secondary font-bold text-xs transition-all duration-200 border border-secondary shadow-sm active:scale-95"
            >
              <Icon name="chat" className="text-[15px]" />
              <span>Tanya Harga</span>
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              title="Lihat Detail & Galeri Foto"
              className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-semibold text-xs transition-all duration-200 border border-outline-variant/40 hover:border-primary active:scale-95 flex items-center gap-1.5"
            >
              <Icon name="photo_library" className="text-[15px]" />
              <span className="hidden sm:inline">Foto</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Modal Galeri Katalog ────────────────────────────────────────────────── */
function CatalogModal({ item, onClose }) {
  const overlayRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const {
    images = [],
    name,
    category,
    alt,
    desc,
    priceAmount = "1.200.000",
    priceUnit = "/m",
    specs = {},
  } = item;

  // Block scroll
  useEffect(() => {
    window.__lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard navigation
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
    `Halo Pilar Canopy, saya tertarik dan ingin tanya harga untuk "${name}" (${category}).\n\nSpesifikasi:\n- Rangka: ${specs?.rangka || "-"}\n- Dimensi: ${specs?.dimension || "-"}\n- Kain: ${specs?.kain || "-"}\n\nMohon info estimasi biaya dan konsultasinya.`
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
        {/* Close Button */}
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
              alt={`${alt || name} foto ${idx + 1}`}
              title={`${alt || name} foto ${idx + 1}`}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                idx === activePhoto ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent pointer-events-none" />

          {/* Fullscreen click */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 z-10 w-full h-full cursor-zoom-in group"
            aria-label="Buka foto fullscreen"
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <Icon name="fullscreen" className="text-[20px]" />
                <span className="font-spec-code text-xs uppercase tracking-wider font-semibold">Lihat Fullscreen</span>
              </div>
            </div>
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
            <div className="bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span className="font-spec-code text-xs text-on-primary uppercase tracking-wider font-semibold">
                {category}
              </span>
            </div>
          </div>

          {/* Title on Hero */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h2 className="font-headline-lg text-xl sm:text-2xl text-white font-bold drop-shadow-md uppercase">
              {name}
            </h2>
            <p className="font-spec-code text-xs text-white/80 mt-1">
              {images.length} foto tersedia • Klik foto untuk fullscreen
            </p>
          </div>

          {/* Prev / Next navigation */}
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

        {/* Lightbox */}
        {lightboxOpen && (
          <ImageLightbox
            images={images}
            initialIndex={activePhoto}
            title={name}
            alt={alt}
            onClose={() => setLightboxOpen(false)}
          />
        )}

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
                <img
                  src={src}
                  alt={`${alt || name} foto ${idx + 1}`}
                  title={`${alt || name} foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-none w-full p-6 sm:p-8 space-y-6 bg-surface-container-lowest">
          {/* Price & Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pb-5 border-b border-outline-variant/30">
            <div>
              {/* Starts From Badge */}
              <div className="inline-flex items-center gap-2.5 bg-black text-white px-3 py-1.5 rounded shadow-sm mb-3">
                <div className="flex flex-col text-[10px] font-extrabold uppercase leading-none tracking-tight text-white/95">
                  <span>Starts</span>
                  <span>From</span>
                </div>
                <div className="text-base font-black text-[#F5A623] tracking-tight flex items-baseline">
                  <span className="text-xs font-bold mr-0.5">Rp</span>
                  <span>{priceAmount}</span>
                  <span className="text-xs font-normal text-white/75 ml-0.5">{priceUnit}</span>
                </div>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {desc}
              </p>
            </div>

            {/* Spesifikasi Lengkap */}
            <div className="bg-surface-container/40 p-4 rounded-xl border border-outline-variant/40 space-y-2 text-xs font-body-md">
              <h4 className="font-headline-sm text-xs uppercase tracking-wider font-bold text-primary mb-2">
                Spesifikasi Teknis
              </h4>
              {specs?.rangka && (
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary min-w-[75px] shrink-0">Rangka</span>
                  <span className="text-on-surface-variant/70 shrink-0">:</span>
                  <span className="text-on-surface-variant/90 font-medium">{specs.rangka}</span>
                </div>
              )}
              {specs?.dimension && (
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary min-w-[75px] shrink-0">Dimension</span>
                  <span className="text-on-surface-variant/70 shrink-0">:</span>
                  <span className="text-on-surface-variant/90 font-medium">{specs.dimension}</span>
                </div>
              )}
              {specs?.kain && (
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-primary min-w-[75px] shrink-0">Kain</span>
                  <span className="text-on-surface-variant/70 shrink-0">:</span>
                  <span className="text-on-surface-variant/90 font-medium">{specs.kain}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-center sm:text-left">
              <p className="font-headline-sm text-xs sm:text-sm font-semibold text-primary">
                Tertarik dengan model {name}?
              </p>
              <p className="font-body-md text-xs text-on-surface-variant">
                Konsultasikan estimasi ukuran, harga per meter, dan jadwal survei gratis bersama tim Pilar Canopy.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-outline-variant/60 hover:bg-surface-container text-xs font-semibold text-on-surface-variant transition-colors"
              >
                Tutup
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-md active:scale-95"
              >
                <Icon name="chat" className="text-[17px]" />
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
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryCounts = useMemo(() => {
    const counts = { all: CATALOG_ITEMS.length };
    CATALOG_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return CATALOG_ITEMS;
    return CATALOG_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section
        data-section
        className="relative w-full overflow-hidden bg-sand py-20 sm:py-28"
        id="katalog"
        aria-labelledby="katalog-heading"
      >
        {/* Background Graphic: background(4).png */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img
            src={catalogBg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-right-bottom sm:object-center opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-sand/45 to-sand/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div data-reveal-group className="max-w-3xl mb-14">
            <SectionEyebrow className="mb-3">{CATALOG_HEADER.eyebrow}</SectionEyebrow>
            <h2
              id="katalog-heading"
              className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight"
            >
              {CATALOG_HEADER.heading}
            </h2>
            <p className="font-body-md text-base text-on-surface-variant mt-2 leading-relaxed">
              {CATALOG_HEADER.description}
            </p>
          </div>

          {/* Filter Kategori */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-outline-variant/30">
            {[{ id: "all", label: "Semua" }, ...CATALOG_CATEGORIES.map((c) => ({ id: c, label: c }))].map(
              (cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-none flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-on-primary shadow-md scale-[1.02]"
                        : "bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container border border-outline-variant/40"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Grid Katalog */}
          <div
            data-stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
          >
            {filteredItems.map((item) => (
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
