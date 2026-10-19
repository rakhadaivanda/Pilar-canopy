import { useState } from "react";
import Icon from "../ui/Icon";
import useScrolled from "../../hooks/useScrolled";
import { NAV_LINKS, MOBILE_LINKS } from "../../data/navigation";
import { SITE } from "../../data/site";
import { buildWhatsAppUrl } from "../../lib/whatsapp";

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || menuOpen
          ? "bg-surface/90 backdrop-blur-xl border-outline-variant/50 shadow-[0_2px_40px_-20px_rgba(64,29,71,0.35)]"
          : "bg-surface/20 backdrop-blur-md border-transparent"
      }`}
      id="navbar"
    >
      <div
        data-nav-inner
        className={`${scrolled ? "h-16" : "h-20"} transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8`}
      >
        {/* Brand & Links */}
        <div className="flex items-center gap-8 flex-1">
          <a className="flex items-center gap-3 group" href="#">
            <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold tracking-tighter text-sm shadow-md transition-transform duration-300 group-hover:scale-110">
              {SITE.logoMark}
            </div>
            <span className="font-headline-sm text-headline-sm tracking-tight text-primary uppercase inline-block">
              {SITE.name}
            </span>
          </a>
          <nav className="hidden xl:flex items-center gap-8 ml-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                className="link-underline font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <a
            data-magnetic
            style={{ "--fill": "#E06D2C" }}
            className="btn-fill hidden sm:inline-flex items-center justify-center bg-primary text-on-primary hover:text-primary px-6 py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest shadow-sm hover:shadow-md"
            href="#konsultasi"
          >
            Konsultasi Proyek
          </a>
          <a
            className="inline-flex items-center justify-center bg-surface-container-lowest/90 border border-outline-variant/50 hover:border-secondary text-primary hover:text-secondary-ink px-4 py-2 rounded-full font-label-caps text-label-caps uppercase transition-colors duration-300 tracking-wider shadow-sm hover:shadow-md"
            href={buildWhatsAppUrl()}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="chat" className="text-[18px] mr-1.5 text-secondary" />
            WhatsApp
          </a>
          <button
            aria-expanded={menuOpen}
            aria-label="Buka Menu"
            className="xl:hidden p-2 text-primary hover:text-secondary-ink rounded"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name="menu" className="text-[26px]" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="xl:hidden bg-surface-container-lowest/98 backdrop-blur-2xl border-b border-outline-variant/50 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4 font-label-caps text-label-caps uppercase tracking-wider">
            {MOBILE_LINKS.map((link) => (
              <a
                key={link.label}
                className="text-on-surface py-2 border-b border-outline-variant/25 hover:text-primary"
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              className="mt-2 text-center bg-primary text-on-primary py-3 rounded-full shadow-md"
              href="#konsultasi"
              onClick={closeMenu}
            >
              Mulai Konsultasi
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
