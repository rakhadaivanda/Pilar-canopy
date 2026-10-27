import { useState } from "react";
import SectionEyebrow from "../../ui/SectionEyebrow";
import Icon from "../../ui/Icon";
import { CONTACT_DATA } from "../../../data/contact";

/* DIUBAH: Section Kontak (id="kontak") berisi info kantor, workshop, 2 kontak WA, website, IG, Form WA terformat, dan Google Maps */
export default function ContactSection() {
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    kebutuhan: CONTACT_DATA.needsOptions[0],
    lokasi: "",
    pesan: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = [
      "Halo Pilar Canopy Perkasa (PT. Rezeki Barokah Jaya), saya ingin konsultasi proyek:",
      `• Nama: ${form.nama}`,
      `• No. WhatsApp: ${form.whatsapp}`,
      `• Jenis Kebutuhan: ${form.kebutuhan}`,
      `• Lokasi Proyek: ${form.lokasi}`,
      `• Pesan: ${form.pesan || "-"}`,
    ].join("\n");

    const waUrl = `https://wa.me/62811880880366?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      data-section
      className="w-full bg-surface-container-low py-20 sm:py-28"
      id="kontak"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Kontak */}
        <div data-reveal-group className="max-w-3xl mb-14">
          <SectionEyebrow className="mb-3">{CONTACT_DATA.eyebrow}</SectionEyebrow>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
            {CONTACT_DATA.heading}
          </h2>
          <p className="font-body-md text-base text-on-surface-variant mt-2 leading-relaxed">
            {CONTACT_DATA.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Kolom Kiri: Informasi Kontak & Google Maps */}
          <div data-reveal-group className="lg:col-span-6 space-y-6">
            {/* Kartu Alamat & Lokasi */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-5">
              {/* Kantor */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-none">
                  <Icon name={CONTACT_DATA.kantor.icon} className="text-[20px]" />
                </div>
                <div>
                  <span className="font-spec-code text-xs text-secondary font-bold uppercase tracking-wider block mb-0.5">
                    {CONTACT_DATA.kantor.label}
                  </span>
                  <p className="font-body-md text-sm sm:text-base text-primary font-medium leading-relaxed">
                    {CONTACT_DATA.kantor.address}
                  </p>
                </div>
              </div>

              {/* Workshop */}
              <div className="flex items-start gap-4 pt-4 border-t border-outline-variant/30">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary flex-none">
                  <Icon name={CONTACT_DATA.workshop.icon} className="text-[20px]" />
                </div>
                <div>
                  <span className="font-spec-code text-xs text-secondary font-bold uppercase tracking-wider block mb-0.5">
                    {CONTACT_DATA.workshop.label}
                  </span>
                  <p className="font-body-md text-sm sm:text-base text-primary font-medium leading-relaxed">
                    {CONTACT_DATA.workshop.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Kartu Telepon, Website & Instagram */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm space-y-4">
              {/* WhatsApp / Telepon */}
              <div>
                <span className="font-spec-code text-xs text-secondary font-bold uppercase tracking-wider block mb-2">
                  Telepon / WhatsApp
                </span>
                <div className="flex flex-wrap gap-3">
                  {CONTACT_DATA.phones.map((phone) => (
                    <a
                      key={phone.display}
                      href={phone.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-secondary hover:text-on-secondary text-primary font-spec-code text-xs sm:text-sm font-semibold transition-all duration-200 border border-outline-variant/30"
                    >
                      <Icon name="chat" className="text-[16px] text-secondary group-hover:text-on-secondary" />
                      <span>{phone.display}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Website & Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                <div>
                  <span className="font-spec-code text-xs text-secondary font-bold uppercase tracking-wider block mb-1">
                    Website Resmi
                  </span>
                  <a
                    href={CONTACT_DATA.website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body-md text-sm text-primary font-medium hover:text-secondary transition-colors inline-flex items-center gap-1.5"
                  >
                    <Icon name="language" className="text-[16px] text-secondary" />
                    <span>{CONTACT_DATA.website.display}</span>
                  </a>
                </div>

                <div>
                  <span className="font-spec-code text-xs text-secondary font-bold uppercase tracking-wider block mb-1">
                    Instagram
                  </span>
                  <a
                    href={CONTACT_DATA.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body-md text-sm text-primary font-medium hover:text-secondary transition-colors inline-flex items-center gap-1.5"
                  >
                    <Icon name="photo_camera" className="text-[16px] text-secondary" />
                    <span>{CONTACT_DATA.instagram.handle}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embed Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-outline-variant/40 shadow-sm h-[220px] bg-surface-container">
              <iframe
                title="Google Maps Lokasi Pilar Canopy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126893.30076241372!2d106.94553258597334!3d-6.398402517849887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699564f0f6797b%3A0xe54d6df14fcba302!2sMetland%20Cileungsi!5e0!3m2!1sid!2sid!4v1718000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Kolom Kanan: Form Konsultasi WhatsApp */}
          <div data-reveal-group className="lg:col-span-6">
            <div className="p-7 sm:p-9 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-md">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
                  <Icon name="edit_note" className="text-[16px]" />
                  <span>Formulir Permintaan</span>
                </span>
                <h3 className="font-headline-sm text-xl font-bold text-primary">
                  Kirim Pesan Konsultasi
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1">
                  Isi data di bawah ini, pesan akan langsung terformat dan terhubung ke WhatsApp kami.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Nama */}
                <div>
                  <label
                    htmlFor="form-nama"
                    className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5"
                  >
                    Nama Lengkap / Instansi *
                  </label>
                  <input
                    id="form-nama"
                    type="text"
                    required
                    value={form.nama}
                    onChange={handleChange("nama")}
                    placeholder="Contoh: Bpk. Hendra / PT. Maju Bersama"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container text-primary transition-colors outline-none"
                  />
                </div>

                {/* 2. No. WhatsApp */}
                <div>
                  <label
                    htmlFor="form-whatsapp"
                    className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5"
                  >
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    id="form-whatsapp"
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={handleChange("whatsapp")}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container text-primary transition-colors outline-none"
                  />
                </div>

                {/* 3. Jenis Kebutuhan */}
                <div>
                  <label
                    htmlFor="form-kebutuhan"
                    className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5"
                  >
                    Jenis Kebutuhan *
                  </label>
                  <select
                    id="form-kebutuhan"
                    value={form.kebutuhan}
                    onChange={handleChange("kebutuhan")}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container text-primary transition-colors outline-none"
                  >
                    {CONTACT_DATA.needsOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Lokasi Proyek */}
                <div>
                  <label
                    htmlFor="form-lokasi"
                    className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5"
                  >
                    Lokasi Proyek *
                  </label>
                  <input
                    id="form-lokasi"
                    type="text"
                    required
                    value={form.lokasi}
                    onChange={handleChange("lokasi")}
                    placeholder="Contoh: Cileungsi, Bogor / Bandung / Sukabumi"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container text-primary transition-colors outline-none"
                  />
                </div>

                {/* 5. Pesan */}
                <div>
                  <label
                    htmlFor="form-pesan"
                    className="block font-spec-code text-xs font-bold uppercase tracking-wider text-primary mb-1.5"
                  >
                    Pesan / Keterangan Tambahan
                  </label>
                  <textarea
                    id="form-pesan"
                    rows={3}
                    value={form.pesan}
                    onChange={handleChange("pesan")}
                    placeholder="Contoh: Estimasi bentang 6x8m untuk carport rumah tinggal..."
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary text-sm bg-surface-container text-primary transition-colors outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-secondary text-on-secondary hover:brightness-110 font-label-caps text-label-caps uppercase tracking-wider font-bold shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 text-sm"
                >
                  <Icon name="chat" className="text-[18px]" />
                  <span>Kirim ke WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
