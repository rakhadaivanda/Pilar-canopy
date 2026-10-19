/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ---------- Ladder permukaan: krem terang = latar, pasir = aksen ---------- */
        background: "#F7F1E3",
        surface: "#F7F1E3",
        sand: "#DAC49D",
        "surface-dim": "#E4DAC5",
        "surface-bright": "#FAF6EC",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F1E9D9",
        "surface-container": "#E9DFC9",
        "surface-container-high": "#E1D4B9",
        "surface-container-highest": "#DAC49D",
        "surface-variant": "#E9DFC9",
        "surface-tint": "#401D47",

        /* ---------- Teks ---------- */
        "on-background": "#2E1636",
        "on-surface": "#2E1636",
        "on-surface-variant": "#5C4A5E",
        "inverse-surface": "#2A1630",
        "inverse-on-surface": "#F5EFE6",

        /* ---------- Plum #401D47 (primary) ---------- */
        primary: "#401D47",
        "on-primary": "#FFFFFF",
        "primary-container": "#5C3D63",
        "on-primary-container": "#DCC9E1",
        "primary-fixed": "#EFE2EA",
        "primary-fixed-dim": "#C9B0D0",
        "on-primary-fixed": "#2A1330",
        "on-primary-fixed-variant": "#5C3D63",
        "inverse-primary": "#C9B0D0",
        tertiary: "#401D47",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#401D47",
        "on-tertiary-container": "#DCC9E1",
        "tertiary-fixed": "#EFE2EA",
        "tertiary-fixed-dim": "#C9B0D0",
        "on-tertiary-fixed": "#2A1330",
        "on-tertiary-fixed-variant": "#5C3D63",

        /* ---------- Oranye #E06D2C (secondary) ---------- */
        secondary: "#E06D2C",
        "secondary-ink": "#8A3A11",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#F0965F",
        "on-secondary-container": "#7A3A18",
        "secondary-fixed": "#FFD9C4",
        "secondary-fixed-dim": "#F0965F",
        "on-secondary-fixed": "#2B1200",
        "on-secondary-fixed-variant": "#8B451D",

        /* ---------- Garis ---------- */
        outline: "#7E6E80",
        "outline-variant": "#D9CEDA",

        /* ---------- Status ---------- */
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.375rem",
        "xl": "0.625rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "1.25rem",
        "margin": "3rem",
        "space-sm": "0.5rem",
        "space-lg": "1.75rem",
        "gutter-mobile": "1rem",
        "gutter": "1.5rem",
        "space-md": "1rem",
        "space-xl": "3rem",
        "space-xs": "0.25rem"
      },
      fontFamily: {
        "spec-code": ["JetBrains Mono", "monospace"],
        "display-hero": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "display-hero-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"]
      },
      fontSize: {
        "spec-code": ["12px", { lineHeight: "18px", letterSpacing: "0.08em", fontWeight: "500" }],
        "display-hero": ["58px", { lineHeight: "66px", letterSpacing: "-0.035em", fontWeight: "300" }],
        "headline-lg": ["42px", { lineHeight: "50px", letterSpacing: "-0.025em", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "display-hero-mobile": ["38px", { lineHeight: "46px", letterSpacing: "-0.025em", fontWeight: "400" }],
        "headline-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "500" }],
        "headline-md": ["26px", { lineHeight: "34px", letterSpacing: "-0.015em", fontWeight: "500" }],
        "headline-sm": ["22px", { lineHeight: "30px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.16em", fontWeight: "700" }]
      }
    }
  },
  plugins: [forms, containerQueries],
}
