/** Label kecil dengan garis tembaga di kiri (dan kanan bila `centered`). */
export default function SectionEyebrow({ children, centered = false, className = "mb-3" }) {
  return (
    <div data-reveal-item className={`inline-flex items-center gap-2 ${className}`}>
      <span className="h-px w-8 bg-secondary"></span>
      <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-ink">
        {children}
      </span>
      {centered && <span className="h-px w-8 bg-secondary"></span>}
    </div>
  );
}
