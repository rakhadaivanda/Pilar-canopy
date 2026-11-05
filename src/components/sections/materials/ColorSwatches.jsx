import { useState } from "react";

/** Pilihan warna interaktif — klik untuk melihat keterangan di bawahnya. */
export default function ColorSwatches({ label, swatches }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="pt-2">
      <span className="font-label-caps text-label-caps tracking-widest uppercase opacity-75 block text-xs mb-2">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {swatches.map((swatch, index) => (
          <button
            key={swatch.name}
            aria-pressed={index === selected}
            className={`flex items-center gap-2 bg-black/25 hover:bg-black/40 px-3 py-1.5 rounded transition-all ${
              index === selected ? "ring-2 ring-white/50" : ""
            }`}
            onClick={() => setSelected(index)}
            type="button"
          >
            <span className={`w-3.5 h-3.5 rounded-full ${swatch.dotClass}`}></span>
            <span className={`font-spec-code text-spec-code ${swatch.labelClass ?? ""}`.trim()}>
              {swatch.name}
            </span>
          </button>
        ))}
      </div>
      <p className="font-spec-code text-[11px] text-white/90 mt-2 italic">
        • Terpilih: {swatches[selected].desc}
      </p>
    </div>
  );
}
