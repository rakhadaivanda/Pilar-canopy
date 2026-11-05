import { useEffect, useRef, useState } from "react";
import Icon from "../../ui/Icon";

/* ProjectCard — kartu proyek besar dengan auto-slideshow foto otomatis */
export default function ProjectCard({ project, onClick }) {
  const {
    images,
    image,
    alt,
    badge,
    title,
    client,
    pekerjaan,
    lokasi,
    tahun,
    chips,
  } = project;

  // Foto yang akan ditampilkan: pakai images[] jika ada, fallback ke [image]
  const photos = images && images.length > 0 ? images : image ? [image] : [];

  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);

  // Mulai auto-slideshow hanya jika ada lebih dari 1 foto
  const startSlideshow = () => {
    if (photos.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % photos.length;
        setPrevIdx(prev);
        setTransitioning(true);
        setTimeout(() => setTransitioning(false), 600);
        return next;
      });
    }, 2800);
  };

  const stopSlideshow = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startSlideshow();
    return stopSlideshow;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  return (
    <div
      data-project-card
      data-tilt
      className="relative bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer group overflow-hidden"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* ── Foto Area dengan Slideshow ─────────────────────────── */}
      <div
        data-cursor="VIEW"
        data-tilt-glow
        className="relative w-full h-[280px] sm:h-[320px] overflow-hidden bg-surface-container"
      >
        {/* Foto sebelumnya (fade out) */}
        {prevIdx !== null && transitioning && (
          <img
            key={`prev-${prevIdx}`}
            src={photos[prevIdx]}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-600"
          />
        )}

        {/* Foto aktif */}
        {photos.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${alt} foto ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              idx === activeIdx
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{ willChange: "opacity, transform" }}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Gradient overlay bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent pointer-events-none" />
        <div className="media-veil absolute inset-0 pointer-events-none" />

        {/* Badge di atas kiri */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-10">
          <span className="font-spec-code text-[10px] text-on-primary uppercase tracking-wider font-semibold">
            {badge}
          </span>
        </div>

        {/* Indikator foto (dots) */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Foto ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  stopSlideshow();
                  setPrevIdx(activeIdx);
                  setActiveIdx(idx);
                  setTransitioning(true);
                  setTimeout(() => {
                    setTransitioning(false);
                    startSlideshow();
                  }, 700);
                }}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIdx
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Lokasi & Tahun di kanan bawah */}
        <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-outline-variant/20 z-10">
          <span className="font-spec-code text-[10px] text-secondary font-bold uppercase">
            {lokasi} • {tahun}
          </span>
        </div>

        {/* Hover overlay "Lihat Detail" */}
        <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-primary/95 backdrop-blur-sm text-on-primary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
            <Icon name="photo_library" className="text-[18px]" />
            <span className="font-spec-code text-[11px] uppercase tracking-wider font-semibold">
              Lihat {photos.length} Foto & Detail
            </span>
          </div>
        </div>
      </div>

      {/* ── Info Proyek ─────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1">
        <span className="font-spec-code text-[10px] text-secondary font-bold uppercase tracking-widest block mb-1">
          {client}
        </span>
        <h3 className="font-headline-sm text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant font-medium line-clamp-2 leading-relaxed mb-3">
          {pekerjaan}
        </p>

        {/* Chips */}
        {chips && chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {chips.map((chip) => (
              <span
                key={chip}
                className="px-2.5 py-0.5 bg-surface-container font-spec-code text-[10px] text-primary rounded-full border border-outline-variant/30 font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
            <Icon name="location_on" className="text-[15px] text-secondary" />
            <span>{lokasi}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary font-semibold group-hover:translate-x-1 transition-transform duration-300">
            <span>Lihat Detail</span>
            <Icon name="arrow_forward" className="text-[14px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

