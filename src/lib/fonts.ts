import localFont from "next/font/local";

/**
 * Polices auto-hébergées (aucune requête vers Google Fonts → meilleur pour le RGPD et la performance).
 * Shippori Mincho : titres éditoriaux, une mincho japonaise au dessin latin élégant.
 * Zen Kaku Gothic New : textes courants, sobre et très lisible.
 * Licence SIL Open Font License 1.1.
 */
export const mincho = localFont({
  src: [
    { path: "../fonts/shippori-mincho-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/shippori-mincho-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/shippori-mincho-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mincho",
  display: "swap",
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "Times New Roman", "serif"],
});

export const gothic = localFont({
  src: [
    { path: "../fonts/zen-kaku-gothic-new-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/zen-kaku-gothic-new-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/zen-kaku-gothic-new-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gothic",
  display: "swap",
  fallback: ["Hiragino Sans", "Helvetica Neue", "Arial", "sans-serif"],
});
