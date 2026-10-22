import { Lines } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { findItem, formatPrice } from "@/data/menu-data";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";
import { ColorStage, type ColorOption } from "./ColorStage";

/**
 * SCÈNE 05 — Coffee & colors. Une seule photo (lattes violet, vert, bleu et café saupoudré) :
 * choisir une couleur zoome sur la tasse correspondante et teinte toute la section.
 * Les prix ne sont affichés que pour les produits identifiés sur la carte.
 */
const POINTS: Record<string, { x: number; y: number; bg: string; deep: string; dot: string }> = {
  violet: { x: 24, y: 35, bg: "var(--color-lavender-soft)", deep: "var(--color-lavender-deep)", dot: "#8e6ccb" },
  matcha: { x: 80, y: 38, bg: "var(--color-matcha-soft)", deep: "var(--color-matcha-deep)", dot: "var(--color-matcha)" },
  bleu: { x: 82.5, y: 85, bg: "var(--color-blue-soft)", deep: "var(--color-blue-deep)", dot: "var(--color-blue)" },
  cafe: { x: 50, y: 55, bg: "var(--color-caramel-soft)", deep: "var(--color-caramel-deep)", dot: "var(--color-caramel)" },
};
const PRICED: Record<string, string> = { matcha: "matcha-latte", bleu: "blue-latte" };

export function CoffeeColors({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.colors;
  const options: ColorOption[] = t.options.map((o) => ({
    ...o,
    ...POINTS[o.key],
    price: PRICED[o.key] ? formatPrice(findItem(PRICED[o.key]).price, locale) : undefined,
  }));
  return (
    <ColorStage
      options={options}
      hint={t.hint}
      eyebrow={t.eyebrow}
      heading={<Lines id="colors-title" lines={t.title} accent={1} className="t-h2 mt-5" />}
      photo={<Photo id="p09" locale={locale} quality={85} sizes="(min-width: 1024px) 100vw, 180vw" />}
      cta={
        <ButtonLink href={href("menu", locale)} size="sm" variant="outline">
          {t.cta}
        </ButtonLink>
      }
    />
  );
}
