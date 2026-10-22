import { TLink } from "@/components/motion/TransitionProvider";
import { Photo } from "@/components/ui/Photo";
import { Kanji } from "@/components/motion/Kanji";
import { findItem, formatPrice } from "@/data/menu-data";
import type { Favorite } from "@/data/favorites";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * Carte produit : grande image, nom, prix, une ligne.
 * Survol : zoom lent de la photo, le titre glisse, une petite lune apparaît.
 * Sans photo fiable, la carte devient typographique (aucun visuel inventé).
 */
export function ProductCard({ fav, locale, sizes, className = "" }: { fav: Favorite; locale: Locale; sizes: string; className?: string }) {
  const item = findItem(fav.itemId);
  const t = getDictionary(locale);
  return (
    <TLink href={`${href("favorites", locale)}#${item.id}`} className={`group block ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-cream">
        {item.photo ? (
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-moon)] group-hover:scale-[1.06] motion-reduce:transition-none">
            <Photo id={item.photo} locale={locale} sizes={sizes} />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-matcha-mist text-matcha transition-colors duration-700 group-hover:bg-[#d6dcc7]">
            <Kanji char="抹" className="h-20 w-20 transition-transform duration-1000 ease-[var(--ease-moon)] group-hover:-translate-y-1" />
            <Kanji char="茶" className="h-20 w-20 transition-transform duration-1000 ease-[var(--ease-moon)] group-hover:translate-y-1" />
            <span className="t-small mt-6 text-matcha-deep">{t.home.favorites.noPhoto}</span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 h-3.5 w-3.5 scale-0 rounded-full bg-paper shadow-[inset_-3px_-1px_0_0_var(--color-moon-deep)] transition-transform duration-500 ease-[var(--ease-moon)] group-hover:scale-100"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="t-h3 transition-transform duration-700 ease-[var(--ease-moon)] group-hover:translate-x-1.5">{item.name[locale]}</h3>
        <span className="shrink-0 tabular-nums text-ink-soft">{formatPrice(item.price, locale)}</span>
      </div>
      <p className="t-small mt-2 max-w-[22rem] text-ink-soft">{fav.line[locale]}</p>
    </TLink>
  );
}
