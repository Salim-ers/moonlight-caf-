import localFont from "next/font/local";

/**
 * Polices auto-hébergées (aucune requête vers Google Fonts → RGPD et performance).
 * Fichiers sous-ensemblés au latin + français : 82 Ko pour les trois familles.
 *
 * - Bricolage Grotesque (titres) : grotesque éditoriale expressive, axe optique figé en « display ».
 * - Instrument Sans (textes) : sans-serif nette et très lisible.
 * - Instrument Serif italique (accents) : un mot par titre, pour la touche « campagne ».
 * Licence SIL Open Font License 1.1.
 */
export const display = localFont({
  src: [{ path: "../fonts/bricolage-display.woff2", weight: "500 800", style: "normal" }],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["Arial Narrow", "Helvetica Neue", "Arial", "sans-serif"],
});

export const sans = localFont({
  src: [{ path: "../fonts/instrument-sans.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const serif = localFont({
  src: [{ path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-serif-italic",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
