import { PRIMARY_WA } from "../data/site";

/** Membuat tautan wa.me ke nomor utama, dengan pesan awal opsional. */
export function buildWhatsAppUrl(message) {
  const base = `https://wa.me/${PRIMARY_WA}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
