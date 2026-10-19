/** Judul yang terbuka lewat sapuan bar oranye (curtain reveal). */
export default function WipeText({ children, className = "" }) {
  return (
    <span className={`relative inline-block overflow-hidden py-[0.06em] ${className}`} data-wipe>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 origin-left bg-secondary"
        data-wipe-bar
      />
      <span className="inline-block" data-wipe-inner>
        {children}
      </span>
    </span>
  );
}
