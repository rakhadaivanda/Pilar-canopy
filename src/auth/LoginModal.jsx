import { useState } from "react";
import { useAuth } from "./AuthContext";
import Icon from "../components/ui/Icon";

export default function LoginModal({ open, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-surface-container-lowest shadow-2xl border border-outline-variant/40 overflow-hidden animate-[fadeSlideUp_0.3s_cubic-bezier(0.22,1,0.36,1)_both]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
          <div>
            <p className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-bold">
              Login ERP
            </p>
            <h3 className="font-headline-sm text-lg text-primary font-bold mt-1">
              Pilar Canopy Perkasa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
            type="button"
            aria-label="Tutup"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Username / Nama
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              autoComplete="username"
              className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container-lowest text-primary transition-colors outline-none"
            />
          </div>
          <div>
            <label className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container-lowest text-primary transition-colors outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-on-surface-variant hover:text-primary"
                aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
              >
                <Icon name={showPass ? "visibility_off" : "visibility"} className="text-[18px]" />
              </button>
            </div>
          </div>
          {error && (
            <div className="px-3 py-2 rounded-lg bg-error-container/30 text-error text-xs font-medium">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:brightness-110 py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 active:scale-[0.99]"
          >
            <Icon name="login" className="text-[18px]" />
            <span>{loading ? "Memproses..." : "Login"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
