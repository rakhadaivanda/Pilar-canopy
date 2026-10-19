import { SITE } from "../../data/site";
import { FOOTER_LINKS, FOOTER_LEGAL_LINKS } from "../../data/navigation";

const FOOTER_CHIPS = [SITE.legalName, "PVC & PVDF Membrane", "Galvanized Steel"];

const FOOTER_DESCRIPTION = `${SITE.name} (${SITE.legalName}) — ${SITE.tagline} Solusi canopy membrane, struktur rangka baja, fabrikasi, dan pekerjaan konstruksi dengan fokus pada kualitas, keamanan, fungsi, dan estetika.`;

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary border-t border-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div data-stagger className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-DEFAULT bg-secondary text-on-secondary flex items-center justify-center font-bold tracking-tighter text-xs">
                {SITE.logoMark}
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary tracking-tight uppercase">
                {SITE.name}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-primary-container max-w-md">
              {FOOTER_DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {FOOTER_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded text-on-primary-container font-spec-code text-spec-code border border-white/15"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed font-bold">
              Struktur &amp; Navigasi
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm">
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

          {/* Kontak */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary-fixed font-bold">
              Kontak &amp; Workshop Fabrikasi
            </span>
            <div className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-primary-container">
              <div>
                <p className="font-medium text-on-primary">Workshop:</p>
                <p>{SITE.workshop.replace("Workshop, ", "")}</p>
              </div>
              <div className="pt-1">
                <p className="font-medium text-on-primary">Hotline WhatsApp:</p>
                <p className="font-spec-code text-spec-code text-on-primary font-semibold">
                  {SITE.phones.map((phone, index) => (
                    <span key={phone.waNumber}>
                      {index > 0 && " / "}
                      <a href={`https://wa.me/${phone.waNumber}`} rel="noopener noreferrer" target="_blank">
                        {phone.display}
                      </a>
                    </span>
                  ))}
                </p>
              </div>
              <div className="pt-1">
                <p className="font-medium text-on-primary">Email Penawaran &amp; Informasi:</p>
                <p className="font-spec-code text-spec-code text-on-primary">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bar bawah */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-primary-container">
          <p className="font-spec-code text-spec-code">
            © {new Date().getFullYear()} {SITE.name} ({SITE.legalName}). Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6 font-label-caps text-label-caps uppercase">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                className="link-underline hover:text-on-primary transition-colors duration-300"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
