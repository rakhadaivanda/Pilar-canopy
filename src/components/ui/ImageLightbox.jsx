import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";

/**
 * Fullscreen lightbox — tampilkan satu gambar secara penuh layar.
 * Props:
 *  - images: array of src string
 *  - initialIndex: index foto aktif
 *  - onClose: callback ketika lightbox ditutup
 *  - title: judul opsional
 */
export default function ImageLightbox({ images = [], initialIndex = 0, onClose, title, alt }) {
  const [activeIdx, setActiveIdx] = useState(initialIndex);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const goPrev = useCallback(() => {
    setActiveIdx((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIdx((p) => (p + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose, goPrev, goNext]);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  if (!images.length) return null;

  const altBase = alt || title || "Gambar proyek";

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex flex-col bg-black/95 backdrop-blur-sm"
      data-lenis-prevent
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 flex-none bg-black/60 backdrop-blur-md border-b border-white/10">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all duration-200 active:scale-95 border border-white/15"
          aria-label="Kembali"
        >
          <Icon name="arrow_back" className="text-[18px]" />
          <span className="hidden sm:inline">Kembali</span>
        </button>

        {/* Title & Counter */}
        <div className="flex flex-col items-center">
          {title && (
            <span className="font-spec-code text-xs text-white/70 uppercase tracking-wider font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs text-center">
              {title}
            </span>
          )}
          <span className="font-spec-code text-xs text-white/50 mt-0.5">
            {activeIdx + 1} / {images.length}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 active:scale-90 border border-white/15"
          aria-label="Tutup lightbox"
        >
          <Icon name="close" className="text-[20px]" />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 p-4 sm:p-8">
        {/* Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${altBase} foto ${idx + 1}`}
              title={`${altBase} foto ${idx + 1}`}
              className={`absolute max-w-full max-h-full object-contain rounded-lg transition-all duration-500 select-none ${
                idx === activeIdx
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              draggable={false}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>

        {/* Prev Button */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={goPrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90 border border-white/15 shadow-xl"
            >
              <Icon name="arrow_back_ios" className="text-[20px] ml-1" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={goNext}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 active:scale-90 border border-white/15 shadow-xl"
            >
              <Icon name="arrow_forward_ios" className="text-[20px]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex-none bg-black/60 backdrop-blur-md border-t border-white/10 px-4 py-3">
          <div className="flex gap-2 items-center justify-center overflow-x-auto no-scrollbar">
            {images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex-none w-14 h-10 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-95 ${
                  idx === activeIdx
                    ? "border-white ring-2 ring-white/30 shadow-md scale-105"
                    : "border-white/20 hover:border-white/60 opacity-50 hover:opacity-100"
                }`}
                aria-label={`Lihat foto ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`${altBase} foto ${idx + 1}`}
                  title={`${altBase} foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

