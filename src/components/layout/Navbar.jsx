import { useState, useEffect, useRef } from "react";
import Icon from "../ui/Icon";
import useScrolled from "../../hooks/useScrolled";
import { NAV_LINKS, MOBILE_LINKS } from "../../data/navigation";
import { SITE } from "../../data/site";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { useAuth } from "../../auth/AuthContext";
import LoginModal from "../../auth/LoginModal";

/* DIUBAH: Navbar dengan 4 item utama, Dropdown interaktif pada menu Layanan (Layanan Kami, Material & Spesifikasi, Portofolio & Pengalaman Proyek, Katalog), tombol CTA "Hubungi Kami" ke WhatsApp, dan Scrollspy cerdas */
export default function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");
  const [activeSubSection, setActiveSubSection] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(true);
  const dropdownTimeoutRef = useRef(null);
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Scrollspy: highlight menu "Layanan" saat berada di #layanan, #material, #portofolio, atau #katalog
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      const offset = 220; // Ambang batas deteksi

      const sectionIds = [
        { id: "kontak", nav: "kontak", sub: "kontak" },
        { id: "katalog", nav: "layanan", sub: "katalog" },
        { id: "portofolio", nav: "layanan", sub: "portofolio" },
        { id: "material", nav: "layanan", sub: "material" },
        { id: "layanan", nav: "layanan", sub: "layanan" },
        { id: "tentang", nav: "tentang", sub: "tentang" },
        { id: "beranda", nav: "beranda", sub: "beranda" },
      ];

      for (const item of sectionIds) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveNav(item.nav);
            setActiveSubSection(item.sub);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || menuOpen
          ? "bg-surface/95 backdrop-blur-xl border-outline-variant/50 shadow-[0_2px_40px_-20px_rgba(64,29,71,0.35)]"
          : "bg-surface/30 backdrop-blur-md border-transparent"
      }`}
      id="navbar"
    >
      <div
        data-nav-inner
        className={`${scrolled ? "h-16" : "h-20"} transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8`}
      >
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-4 xl:gap-8 flex-1">
          <a className="flex items-center gap-3 group py-1" href="#beranda" aria-label={SITE.name}>
            <img
              src={SITE.logo}
              alt={SITE.name}
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation: 4 Item Utama dengan Dropdown pada Layanan */}
          <nav className="hidden xl:flex items-center gap-7 ml-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeNav === link.id;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative group py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      className={`font-label-caps text-label-caps uppercase tracking-wider transition-all duration-300 relative inline-flex items-center gap-1.5 py-1 ${
                        isActive
                          ? "text-secondary font-bold"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                      href={link.href}
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-expanded={dropdownOpen}
                    >
                      <span>{link.label}</span>
                      <Icon
                        name="keyboard_arrow_down"
                        className={`text-[18px] transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180 text-secondary" : ""
                        }`}
                      />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full animate-fade-in" />
                      )}
                    </a>

                    {/* Dropdown Menu Popup */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-80 bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-[0_18px_50px_-12px_rgba(46,22,54,0.35)] p-2.5 transition-all duration-300 origin-top ${
                        dropdownOpen
                          ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                          : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                      }`}
                    >
                      <div className="text-[10px] font-spec-code uppercase tracking-wider text-on-surface-variant/70 px-3 py-1.5 font-bold">
                        Pilihan Layanan & Produk
                      </div>
                      <div className="space-y-1">
                        {link.children.map((child) => {
                          const isSubActive = activeSubSection === child.id;
                          return (
                            <a
                              key={child.id}
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group/item ${
                                isSubActive
                                  ? "bg-secondary/10 text-secondary"
                                  : "hover:bg-surface-container text-primary"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-none transition-colors ${
                                  isSubActive
                                    ? "bg-secondary text-on-secondary"
                                    : "bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-on-primary"
                                }`}
                              >
                                <Icon name={child.icon} className="text-[18px]" />
                              </div>
                              <div>
                                <span className="block text-xs font-bold tracking-normal uppercase font-label-caps">
                                  {child.label}
                                </span>
                                <span className="block text-[11px] text-on-surface-variant font-normal leading-tight mt-0.5 normal-case font-sans">
                                  {child.desc}
                                </span>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  className={`link-underline font-label-caps text-label-caps uppercase tracking-wider transition-all duration-300 relative py-1 ${
                    isActive
                      ? "text-secondary font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                  {link.external && (
                    <Icon name="open_in_new" className="text-[13px] ml-1.5 inline-block align-[-1px]" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Action CTA: Tombol "Hubungi Kami" ke WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <a
                className="inline-flex items-center justify-center bg-primary text-on-primary hover:brightness-110 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-[10px] xs:text-[11px] sm:text-xs"
                href="https://erp.rezekibarokahjaya.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="grid_view" className="text-[16px] sm:text-[18px] mr-1.5 sm:mr-2" />
                <span>ERP</span>
              </a>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center justify-center bg-surface-container-highest text-primary hover:bg-surface-container px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-sm transition-all duration-300 active:scale-95 text-[10px] xs:text-[11px] sm:text-xs"
                title={user.nama}
              >
                <Icon name="logout" className="text-[16px] sm:text-[18px] mr-1.5 sm:mr-2" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="hidden sm:inline-flex items-center justify-center bg-surface-container-highest text-primary hover:bg-secondary hover:text-on-secondary px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-sm transition-all duration-300 active:scale-95 text-[10px] xs:text-[11px] sm:text-xs"
            >
              <Icon name="login" className="text-[16px] sm:text-[18px] mr-1.5 sm:mr-2" />
              <span>Login</span>
            </button>
          )}
          <a
            className="inline-flex items-center justify-center bg-secondary text-on-secondary hover:brightness-110 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-[10px] xs:text-[11px] sm:text-xs"
            href={buildWhatsAppUrl("Halo Pilar Canopy, saya ingin konsultasi mengenai canopy membrane. Bisa minta info estimasi & jadwal survei?")}
            rel="noopener noreferrer"
            target="_blank"
          >
              <Icon name="chat" className="text-[16px] sm:text-[18px] mr-1.5 sm:mr-2" />
              <span className="hidden xs:inline sm:inline">Hubungi Kami</span>
          </a>

          {/* Hamburger button */}
          <button
            aria-expanded={menuOpen}
            aria-label="Buka Menu"
            className="xl:hidden p-2 text-primary hover:text-secondary-ink rounded"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[26px]" />
          </button>
        </div>
      </div>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

      {/* Mobile Navigation Drawer: Termasuk Dropdown / Sub-menu Layanan */}
      {menuOpen && (
        <div className="xl:hidden bg-surface-container-lowest/98 backdrop-blur-2xl border-b border-outline-variant/50 px-6 py-6 transition-all duration-300 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3 font-label-caps text-label-caps uppercase tracking-wider">
            {MOBILE_LINKS.map((link) => {
              const isActive = activeNav === link.id;

              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="border-b border-outline-variant/25 pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileDropdownOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between py-2.5 text-left font-label-caps text-label-caps uppercase tracking-wider transition-colors ${
                        isActive
                          ? "text-secondary font-bold"
                          : "text-on-surface hover:text-primary"
                      }`}
                    >
                      <span>{link.label}</span>
                      <Icon
                        name="keyboard_arrow_down"
                        className={`text-[20px] transition-transform duration-300 ${
                          mobileDropdownOpen ? "rotate-180 text-secondary" : "text-on-surface-variant"
                        }`}
                      />
                    </button>

                    {mobileDropdownOpen && (
                      <div className="pl-3 pr-1 py-1.5 space-y-1 bg-surface-container/40 rounded-xl my-1 border border-outline-variant/30">
                        {link.children.map((child) => {
                          const isSubActive = activeSubSection === child.id;
                          return (
                            <a
                              key={child.id}
                              href={child.href}
                              onClick={closeMenu}
                              className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-xs font-semibold normal-case transition-colors ${
                                isSubActive
                                  ? "bg-secondary/15 text-secondary font-bold"
                                  : "text-on-surface hover:text-primary hover:bg-surface-container"
                              }`}
                            >
                              <Icon name={child.icon} className="text-[16px] text-secondary flex-none" />
                              <span>{child.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  className={`py-2.5 border-b border-outline-variant/25 transition-colors ${
                    isActive
                      ? "text-secondary font-bold pl-2 border-l-4 border-secondary"
                      : "text-on-surface hover:text-primary"
                  }`}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={closeMenu}
                >
                  <span className="inline-flex items-center gap-2">
                    {link.label}
                    {link.external && (
                      <Icon name="open_in_new" className="text-[15px] text-secondary" />
                    )}
                  </span>
                </a>
              );
            })}

            {user ? (
              <div className="mt-4 space-y-2">
                <a
                  className="flex items-center justify-center gap-2 text-center bg-primary text-on-primary py-3 rounded-full shadow-md font-semibold"
                  href="https://erp.rezekibarokahjaya.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <Icon name="grid_view" className="text-[18px]" />
                  <span>ERP</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 text-center bg-surface-container-highest text-primary py-3 rounded-full font-semibold"
                >
                  <Icon name="logout" className="text-[18px]" />
                  <span>Logout ({user.nama?.split(" ")[0] || user.username})</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  setShowLogin(true);
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 text-center bg-surface-container-highest text-primary py-3 rounded-full font-semibold"
              >
                <Icon name="login" className="text-[18px]" />
                <span>Login</span>
              </button>
            )}

            <a
              className="mt-2 flex items-center justify-center gap-2 text-center bg-secondary text-on-secondary py-3 rounded-full shadow-md font-semibold"
              href={buildWhatsAppUrl("Halo Pilar Canopy, saya ingin konsultasi canopy membrane. Mohon bantuannya ya.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Hubungi Kami (WhatsApp)</span>
            </a>
          </div>
        </div>
      )}

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}
