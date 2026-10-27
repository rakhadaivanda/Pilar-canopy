import Icon from "../../ui/Icon";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";

/* BARU: Section CTA Penutup */
export default function ClosingCtaSection() {
  const waUrl = buildWhatsAppUrl(
    "Halo Pilar Canopy, saya siap wujudkan canopy impian saya. Mohon bantu konsultasi dari desain hingga instalasi."
  );

  return (
    <section className="w-full bg-surface-container-low py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-[#2c1331] text-on-primary p-10 sm:p-16 text-center shadow-2xl border border-white/10"
        >
          {/* Subtle decorative circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-secondary text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6">
              <Icon name="bolt" className="text-[18px]" />
              <span>Solusi Konstruksi Terpercaya</span>
            </div>

            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Siap Wujudkan Canopy Impian Anda?
            </h2>

            <p className="font-body-lg text-base sm:text-xl text-white/85 font-light leading-relaxed mb-8 max-w-2xl">
              Konsultasikan kebutuhan Anda, kami bantu dari desain hingga instalasi.
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-secondary text-on-secondary hover:brightness-110 px-8 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-sm sm:text-base active:scale-95"
            >
              <Icon name="chat" className="text-[22px]" />
              <span>Chat WhatsApp Sekarang</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
