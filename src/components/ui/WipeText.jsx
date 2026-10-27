export default function WipeText({ children, className = "" }) {
  return (
    <span className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
