import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "./AuthContext";
import { SITE } from "../data/site";
import { buildWhatsAppUrl } from "../lib/whatsapp";
import Icon from "../components/ui/Icon";

const INPUT_CLASS =
  "w-full pl-11 pr-11 py-3 rounded-xl border border-outline-variant/60 focus:border-secondary focus:ring-2 focus:ring-secondary/25 text-sm bg-surface-container-lowest text-primary placeholder:text-on-surface-variant/50 transition-all outline-none";

export default function LoginModal({ open, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      setUsername("");
      setPassword("");
      onClose?.();
    } catch (err) {
      setError(err.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-md animate-[fadeSlideUp_0.25s_ease-out_both]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Login Karyawan"
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_30px_80px_-20px_rgba(46,22,54,0.6)] border border-outline-variant/30 grid md:grid-cols-[0.9fr_1.1fr] max-h-[94vh] animate-[fadeSlideUp_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        {/* Panel brand (desktop) */}
        <aside className="relative hidden md:flex flex-col justify-between overflow-hidden bg-primary text-on-primary p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-secondary/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-white/5 blur-2xl"
          />

          <div className="relative">
            <div className="inline-flex p-2.5 rounded-2xl bg-white/95 shadow-lg">
              <img src={SITE.logo} alt={SITE.name} className="h-10 w-auto object-contain" />
            </div>
            <p className="mt-6 font-spec-code text-[11px] uppercase tracking-[0.22em] text-secondary-fixed font-bold">
              Portal Karyawan
            </p>
            <h2 className="mt-2 font-headline-lg text-3xl leading-tight font-extrabold tracking-tight">
              Login
              <br />
              Karyawan
            </h2>
            <p className="mt-3 text-sm text-on-primary-container leading-relaxed max-w-xs">
              Khusus karyawan {SITE.name}. Gunakan akun yang terdaftar untuk
              melanjutkan.
            </p>
          </div>

          <div className="relative pt-8 border-t border-white/15">
            <p className="font-spec-code text-[11px] uppercase tracking-[0.16em] text-white/60">
              {SITE.legalName}
            </p>
            <p className="font-headline-sm text-sm text-secondary italic mt-1">
              "{SITE.tagline}"
            </p>
          </div>
        </aside>

        {/* Panel form */}
        <section className="flex flex-col overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 md:hidden">
              <div className="p-2 rounded-xl bg-primary/5 border border-outline-variant/40">
                <img src={SITE.logo} alt={SITE.name} className="h-8 w-auto object-contain" />
              </div>
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-wider text-secondary font-bold">
                  Login Karyawan
                </p>
                <p className="font-headline-sm text-sm text-primary font-bold">
                  {SITE.name}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <p className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
                Login Karyawan
              </p>
              <h3 className="font-headline-sm text-xl text-primary font-bold mt-1">
                Selamat datang kembali
              </h3>
            </div>
            <button
              onClick={onClose}
              className="ml-auto w-9 h-9 rounded-full border border-outline-variant/40 hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              type="button"
              aria-label="Tutup"
            >
              <Icon name="close" className="text-[18px]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="login-username"
                className="block font-spec-code text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5"
              >
                Username / Nama
              </label>
              <div className="relative">
                <Icon
                  name="person"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant/70 pointer-events-none"
                />
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  autoComplete="username"
                  autoFocus
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block font-spec-code text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Icon
                  name="lock"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant/70 pointer-events-none"
                />
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                  className={`${INPUT_CLASS} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                  aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                >
                  <Icon
                    name={showPass ? "visibility_off" : "visibility"}
                    className="text-[21px]"
                  />
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-error-container/40 border border-error/20 text-on-error-container text-xs font-medium leading-relaxed animate-[fadeSlideUp_0.2s_ease-out_both]"
              >
                <Icon name="error" className="text-[18px] text-error flex-none" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:brightness-110 py-3 rounded-xl font-label-caps text-label-caps uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Icon name="login" className="text-[19px]" />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Lupa password? Hubungi admin untuk reset akun.
            </p>
            <a
              href={buildWhatsAppUrl("Halo Admin, saya ingin reset password akun karyawan Pilar Canopy.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-full border border-outline-variant/50 text-[11px] font-semibold text-primary hover:bg-secondary hover:border-secondary hover:text-on-secondary transition-colors"
            >
              <Icon name="chat" className="text-[15px]" />
              <span>Hubungi Admin</span>
            </a>
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
}
