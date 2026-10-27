import { useState } from "react";
import { CONSULTATION_FORM } from "../../../data/consultation";
import { buildWhatsAppUrl } from "../../../lib/whatsapp";

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 rounded-DEFAULT border border-outline-variant/60 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container-lowest text-primary transition-[border-color,box-shadow] duration-300";
const LABEL_CLASS =
  "block font-label-caps text-label-caps uppercase text-on-surface-variant mb-1";

export default function ConsultationForm() {
  const { title, description, fields, projectTypes, submitLabel } = CONSULTATION_FORM;
  const [values, setValues] = useState({ name: "", phone: "", type: projectTypes[0] });

  const update = (key) => (event) => setValues((prev) => ({ ...prev, [key]: event.target.value }));

  // Data form diteruskan ke WhatsApp sebagai pesan awal ke nomor utama Pilar Canopy.
  const handleSubmit = (event) => {
    event.preventDefault();
    const message = [
      "Halo Pilar Canopy, saya ingin konsultasi dan meminta estimasi proyek.",
      `Nama / Instansi: ${values.name}`,
      `Kontak: ${values.phone}`,
      `Tipe proyek: ${values.type}`,
    ].join("\n");
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest p-6 sm:p-8 rounded-DEFAULT text-primary shadow-xl">
      <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{title}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">{description}</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className={LABEL_CLASS} htmlFor="consult-name">
            {fields.name.label}
          </label>
          <input
            className={INPUT_CLASS}
            id="consult-name"
            onChange={update("name")}
            placeholder={fields.name.placeholder}
            required
            type="text"
            value={values.name}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="consult-phone">
            {fields.phone.label}
          </label>
          <input
            className={INPUT_CLASS}
            id="consult-phone"
            onChange={update("phone")}
            placeholder={fields.phone.placeholder}
            required
            type="tel"
            value={values.phone}
          />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="consult-type">
            {fields.type.label}
          </label>
          <select
            className={INPUT_CLASS}
            id="consult-type"
            onChange={update("type")}
            value={values.type}
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <button
          data-magnetic
          className="btn-fill w-full py-3.5 bg-primary text-on-primary hover:text-primary font-label-caps text-label-caps uppercase tracking-widest rounded-DEFAULT shadow"
          type="submit"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
