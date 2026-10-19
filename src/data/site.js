import logoImg from "../assets/images/logo.png";
import logoWhite from "../assets/images/logo-white.png";
import logoMark from "../assets/images/logo-mark.png";

// /* DIUBAH */ Identitas & kontak resmi PT. REZEKI BAROKAH JAYA (PILAR CANOPY PERKASA)
export const SITE = {
  name: "Pilar Canopy Perkasa",
  legalName: "PT. REZEKI BAROKAH JAYA",
  tagline: "Innovate. Build. Solve.",
  year: "2026",
  logo: logoImg,
  logoWhite: logoWhite,
  logoMark: logoMark,
  kantor: "Ruko Colony Metland Cileungsi Block DE1 No.40",
  workshop: "Jl. Raya Karang Tengah KM 14, Cibadak, Sukabumi",
  phones: [
    {
      display: "0811-880-880-36",
      waNumber: "6281188088036",
      waUrl: "https://wa.me/6281188088036",
    },
    {
      display: "0811-880-880-65",
      waNumber: "6281188088065",
      waUrl: "https://wa.me/6281188088065",
    },
  ],
  social: {
    whatsapp: "https://wa.me/6281188088036",
    instagram: "https://instagram.com/pilarcanopy",
  },
  website: "www.pilarcanopy.com",
  instagram: "@pilarcanopy",
  instagramUrl: "https://instagram.com/pilarcanopy",
  copyright: "© 2026 PT. Rezeki Barokah Jaya. All rights reserved.",
};

// Nomor WhatsApp utama untuk CTA cepat
export const PRIMARY_WA = SITE.phones[0].waNumber;
