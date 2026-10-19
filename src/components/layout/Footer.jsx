import { SITE } from "../../data/site";
import { FOOTER_LINKS } from "../../data/navigation";
import Icon from "../ui/Icon";

/* DIUBAH: Footer resmi dengan logo, tagline "Innovate. Build. Solve.", tautan cepat 4 item, Instagram, dan copyright © 2026 PT. Rezeki Barokah Jaya. All rights reserved. */
export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary border-t border-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div data-stagger className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Kolom 1: Logo, Nama Perusahaan & Tagline */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/95 shadow-md flex items-center justify-center">
                <img
                  src={SITE.logo}
                  alt={SITE.name}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-spec-code text-xs text-secondary-fixed font-bold uppercase tracking-wider block">
                  {SITE.legalName}
                </span>
                <span className="font-headline-sm text-sm text-on-primary-container block mt-0.5">
                  Spesialis Tensile Membrane & Rangka Baja
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p className="font-headline-sm text-base text-secondary font-semibold italic mt-1">
              "{SITE.tagline}"
            </p>

            <p className="font-body-md text-sm text-on-primary-container max-w-md leading-relaxed">
              Perusahaan spesialis konstruksi canopy membrane, struktur rangka baja, fabrikasi, dan solusi arsitektural modern dengan fokus pada kualitas, kekuatan struktur, keamanan, dan ketahanan.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat (Sama persis dengan menu navbar: Beranda, Tentang Kami, Layanan, Kontak) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed font-bold text-xs sm:text-sm">
              Tautan Cepat
            </span>
            <div className="flex flex-col gap-2.5 font-body-sm text-sm">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  className="link-underline self-start text-on-primary-container hover:text-on-primary transition-colors duration-300"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 3: Instagram & Kontak Cepat */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed font-bold text-xs sm:text-sm">
              Media Sosial &amp; Kontak
            </span>
            <div className="flex flex-col gap-3 font-body-sm text-sm text-on-primary-container">
              <div>
                <span className="text-xs text-on-primary-container/80 block mb-1">
                  Ikuti Portofolio Kami:
                </span>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-secondary hover:text-on-secondary text-on-primary transition-colors duration-200 border border-white/15 text-xs font-semibold"
                >
                  <Icon name="photo_camera" className="text-[16px]" />
                  <span>{SITE.instagram}</span>
                </a>
              </div>

              <div>
                <span className="text-xs text-on-primary-container/80 block mb-1">
                  Hotline WhatsApp:
                </span>
                <div className="flex flex-col gap-1 font-spec-code text-xs text-on-primary font-semibold">
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone.waNumber}
                      href={phone.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary transition-colors"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Bawah: Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-xs text-on-primary-container text-center sm:text-left">
          <p className="font-spec-code">
            {SITE.copyright}
          </p>
          <div className="flex items-center gap-2 text-xs font-spec-code text-on-primary-container/80">
            <span>{SITE.tagline}</span>
            <span>•</span>
            <span>{SITE.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
