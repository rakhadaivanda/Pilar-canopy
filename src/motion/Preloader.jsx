import { SITE } from "../data/site";

/** Tirai pembuka singkat: merek + hitung persen → terangkat. Tidak memblokir interaksi. */
export default function Preloader() {
  return (
    <div
      aria-hidden="true"
      data-preloader
      className="pointer-events-none fixed inset-0 z-[110] flex flex-col items-center justify-center gap-5 bg-surface"
    >
      <div data-preloader-mark className="flex items-center gap-3">
        <img
          src={SITE.logo}
          alt={SITE.name}
          className="h-14 sm:h-16 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="relative block h-[2px] w-40 overflow-hidden bg-outline-variant/60">
          <span className="absolute inset-0 block origin-left bg-secondary" data-preloader-bar></span>
        </span>
        <span className="font-spec-code text-spec-code text-secondary-ink tabular-nums" data-preloader-count>
          00
        </span>
      </div>
    </div>
  );
}
