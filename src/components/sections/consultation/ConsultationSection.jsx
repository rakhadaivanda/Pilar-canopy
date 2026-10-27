import Icon from "../../ui/Icon";
import WipeText from "../../ui/WipeText";
import ConsultationForm from "./ConsultationForm";
import { CONSULTATION } from "../../../data/consultation";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";

export default function ConsultationSection() {
  return (
    <section data-section className="w-full bg-surface py-24 sm:py-32" id="konsultasi">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div data-reveal="card" className="bg-primary text-on-primary rounded-DEFAULT p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl border border-primary-container">
          {/* Background atmospheric radial aura */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container-lowest/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="font-spec-code text-spec-code uppercase tracking-widest text-on-primary-container">
                  {CONSULTATION.pill}
                </span>
              </div>
              <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-primary tracking-tight font-light leading-tight">
                <WipeText>{CONSULTATION.heading}</WipeText>
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary-container mt-4 max-w-xl leading-relaxed">
                {CONSULTATION.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  data-magnetic
                  data-cursor="EXPLORE"
                  style={{ "--fill": "#401D47" }}
                  className="btn-fill inline-flex items-center gap-3 bg-secondary hover:text-on-secondary text-on-secondary px-7 py-4 rounded-DEFAULT font-label-caps text-label-caps uppercase tracking-widest shadow-lg"
                  href={buildWhatsAppUrl()}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon name="chat" className="text-[20px]" />
                  {CONSULTATION.whatsappLabel}
                </a>
              </div>
            </div>

            <ConsultationForm />
          </div>

          {/* Bottom assurance */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-on-primary-container font-body-sm text-body-sm">
            {CONSULTATION.assurances.map((item) => (
              <div key={item.title}>
                <span className="font-semibold text-on-primary block">{item.title}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
