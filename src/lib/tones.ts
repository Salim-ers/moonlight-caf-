/**
 * Les « mondes de couleur » de Moonlight, tirés des produits eux-mêmes.
 * Chaque teinte a un fond franc, une version douce, une version profonde (texte/accents)
 * et la couleur de texte qui garantit le contraste sur le fond franc.
 */
export type Tone = "pink" | "matcha" | "lavender" | "blue" | "caramel" | "butter" | "ivory";

export const tones: Record<Tone, { bg: string; soft: string; deep: string; ink: string; dot: string }> = {
  pink: { bg: "var(--color-pink)", soft: "var(--color-pink-soft)", deep: "var(--color-pink-deep)", ink: "var(--color-ink)", dot: "var(--color-pink)" },
  matcha: {
    bg: "var(--color-matcha)",
    soft: "var(--color-matcha-soft)",
    deep: "var(--color-matcha-deep)",
    ink: "var(--color-ink)",
    dot: "var(--color-matcha)",
  },
  lavender: {
    bg: "var(--color-lavender)",
    soft: "var(--color-lavender-soft)",
    deep: "var(--color-lavender-deep)",
    ink: "var(--color-ink)",
    dot: "var(--color-lavender)",
  },
  blue: { bg: "var(--color-blue)", soft: "var(--color-blue-soft)", deep: "var(--color-blue-deep)", ink: "var(--color-ink)", dot: "var(--color-blue)" },
  caramel: {
    bg: "var(--color-caramel)",
    soft: "var(--color-caramel-soft)",
    deep: "var(--color-caramel-deep)",
    ink: "var(--color-ink)",
    dot: "var(--color-caramel)",
  },
  butter: { bg: "var(--color-butter)", soft: "var(--color-butter)", deep: "var(--color-caramel-deep)", ink: "var(--color-ink)", dot: "#d9b25f" },
  ivory: { bg: "var(--color-ivory)", soft: "var(--color-ivory)", deep: "var(--color-ink)", ink: "var(--color-ink)", dot: "var(--color-ink)" },
};

/** Variables CSS d'un ton, à poser en `style` sur une section. */
export const toneVars = (t: Tone) => ({ "--tone": tones[t].bg, "--tone-soft": tones[t].soft, "--tone-deep": tones[t].deep }) as React.CSSProperties;

/** Couleur d'accent de chaque page (transitions, navigation). */
export const pageTone = {
  home: "pink",
  menu: "caramel",
  favorites: "pink",
  cafe: "lavender",
  story: "butter",
  visit: "blue",
  legal: "ivory",
  privacy: "ivory",
  cookies: "ivory",
} as const satisfies Record<string, Tone>;
