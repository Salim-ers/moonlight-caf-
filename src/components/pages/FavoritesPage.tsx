import { Lines, Fade, ClipReveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Kanji } from "@/components/motion/Kanji";
import { ButtonLink } from "@/components/ui/Button";
import { favorites } from "@/data/favorites";
import { findItem, formatPrice } from "@/data/menu-data";
import { getDictionary, fill } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * Lookbook « Nos favoris » : chaque création a sa propre composition
 * (pleine largeur, diptyque, colonne décalée…), numérotée comme les pages d'un carnet.
 */
const LAYOUTS = ["right", "left", "full", "right", "left", "type"] as const;

export function FavoritesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const total = String(favorites.length).padStart(2, "0");

  return (
    <>
      <header className="bg-paper pb-10 pt-36 md:pb-16 md:pt-44">
        <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
          <Lines as="h1" lines={[t.favoritesPage.title]} trigger="load" className="t-display md:col-span-8" />
          <Fade trigger="load" delay={0.35} className="md:col-span-4">
            <p className="t-lede text-ink-soft">{t.favoritesPage.lede}</p>
            <p className="t-label mt-4">{fill(t.favoritesPage.count, { n: favorites.length })}</p>
          </Fade>
        </div>
      </header>

      <ol className="bg-paper">
        {favorites.map((fav, i) => {
          const item = findItem(fav.itemId);
          const n = String(i + 1).padStart(2, "0");
          const layout = item.photo ? LAYOUTS[i % LAYOUTS.length] === "type" ? "right" : LAYOUTS[i % LAYOUTS.length] : "type";
          const text = (
            <div className="max-w-md">
              <p className="t-label tabular-nums">
                {n} / {total}
              </p>
              <Lines as="h2" lines={[item.name[locale]]} className="t-h2 mt-4" />
              <Fade className="mt-6">
                <p className="t-lede text-ink-soft">{fav.story[locale]}</p>
                <p className="mt-6 font-[family-name:var(--font-display)] text-[1.6rem] tabular-nums">{formatPrice(item.price, locale)}</p>
              </Fade>
            </div>
          );

          if (layout === "type") {
            return (
              <li key={fav.itemId} id={item.id} className="scroll-mt-24 py-20 md:py-28">
                <div className="wrap grid items-center gap-10 md:grid-cols-12">
                  <div className="flex aspect-[4/3] items-center justify-center gap-4 bg-matcha-mist text-matcha md:col-span-6">
                    <Kanji char="抹" className="h-[18vw] max-h-48 w-[18vw] max-w-48" />
                    <Kanji char="茶" className="h-[18vw] max-h-48 w-[18vw] max-w-48" />
                  </div>
                  <div className="md:col-span-5 md:col-start-8">
                    {text}
                    <p className="t-small mt-4 text-ink-soft">{t.home.favorites.noPhoto}</p>
                  </div>
                </div>
              </li>
            );
          }

          if (layout === "full") {
            return (
              <li key={fav.itemId} id={item.id} className="scroll-mt-24 py-20 md:py-28">
                <ClipReveal className="aspect-[4/3] w-full md:aspect-[21/9]" parallax={12}>
                  <Photo id={item.photo!} locale={locale} sizes="100vw" />
                </ClipReveal>
                <div className="wrap mt-10 md:-mt-28 md:flex md:justify-end">
                  <div className="relative bg-paper md:w-[44%] md:p-12">{text}</div>
                </div>
              </li>
            );
          }

          const photoLeft = layout === "left";
          return (
            <li key={fav.itemId} id={item.id} className="scroll-mt-24 py-20 md:py-28">
              <div className="wrap grid items-center gap-10 md:grid-cols-12 md:gap-8">
                <ClipReveal
                  from={photoLeft ? "left" : "right"}
                  className={`aspect-[4/5] md:col-span-6 ${photoLeft ? "" : "md:order-2 md:col-start-7"}`}
                  parallax={10}
                >
                  <Photo id={item.photo!} locale={locale} sizes="(min-width: 768px) 50vw, 92vw" />
                </ClipReveal>
                <div className={`md:col-span-5 ${photoLeft ? "md:col-start-8" : "md:order-1 md:col-start-1"}`}>{text}</div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="bg-cream py-24 text-center md:py-32">
        <div className="wrap">
          <Lines lines={[t.menuPage.title]} className="t-h2" />
          <Fade className="mt-8">
            <ButtonLink href={href("menu", locale)}>{t.favoritesPage.seeMenu}</ButtonLink>
          </Fade>
        </div>
      </section>
    </>
  );
}
