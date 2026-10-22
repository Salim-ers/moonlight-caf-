import type { CSSProperties } from "react";
import { TLink } from "@/components/motion/PageTransition";
import { Lines, Reveal, type RevealVariant } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DrinkArt } from "@/components/ui/DrinkArt";
import { favorites } from "@/data/favorites";
import { findItem, formatPrice } from "@/data/menu-data";
import { toneVars } from "@/lib/tones";
import { getDictionary, fill } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * Lookbook « Nos favoris » : chaque création a sa propre mise en scène et sa couleur.
 * La numérotation (« 01 / 06 ») et le compteur sont calculés depuis `favorites.ts`.
 * Sans photo fiable, la création est présentée par une composition typographique.
 */
const LAYOUTS = ["arch", "wide", "full", "circle", "arch-left"] as const;
const SIZES = {
  arch: "(min-width: 1024px) 84vw, 204vw",
  "arch-left": "(min-width: 1024px) 84vw, 204vw",
  wide: "(min-width: 1024px) 78vw, 124vw",
  full: "(min-width: 640px) 100vw, 204vw",
  circle: "(min-width: 1024px) 70vw, 164vw",
};
const REVEALS: Record<(typeof LAYOUTS)[number], RevealVariant> = {
  arch: "clip-up",
  wide: "clip-left",
  full: "window",
  circle: "circle",
  "arch-left": "clip-right",
};

export function FavoritesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const f = t.favoritesPage;

  return (
    <>
      <PageHead
        tone="pink"
        title={f.title}
        lede={f.lede}
        aside={<p className="t-eyebrow text-pink-deep">{fill(f.count, { n: favorites.length })}</p>}
        visual={
          <div
            className="enter-rise relative aspect-[5/4] overflow-hidden rounded-[999px_999px_1.75rem_1.75rem] bg-pink"
            style={{ "--d": "0.08s" } as CSSProperties}
          >
            <div className="zoom absolute inset-0">
              <Photo id="p15" locale={locale} preload quality={85} sizes="(min-width: 1024px) 56vw, 132vw" />
            </div>
          </div>
        }
      />

      <nav aria-label={f.index} className="bg-ivory">
        <ol className="wrap flex flex-wrap gap-2 py-8">
          {favorites.map((fav) => {
            const item = findItem(fav.itemId);
            return (
              <li key={fav.itemId}>
                <TLink
                  href={`#${item.id}`}
                  className="chip min-h-11 gap-2 border border-ink/10 font-semibold transition-colors hover:bg-[var(--tone-soft)]"
                  style={toneVars(fav.tone)}
                >
                  {item.name[locale]}
                </TLink>
              </li>
            );
          })}
        </ol>
      </nav>

      <ol>
        {favorites.map((fav, i) => {
          const item = findItem(fav.itemId);
          const layout = fav.photo ? LAYOUTS[i % LAYOUTS.length] : "type";
          const text = (
            <div className="fav-text">
              <p className="t-eyebrow text-[var(--tone-deep)]">{item.category.title[locale]}</p>
              <Lines as="h2" lines={[item.name[locale]]} className="t-h1 mt-4" />
              <Reveal className="mt-6">
                <p className="font-[family-name:var(--font-serif)] text-[2.4rem] italic leading-none tabular-nums">{formatPrice(item.price, locale)}</p>
                <p className="t-lede mt-6 max-w-[30rem] text-ink/80">{fav.story[locale]}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {fav.notes[locale].map((note) => (
                    <li key={note} className="chip">
                      {note}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );

          return (
            <li key={fav.itemId} id={item.id} className={`fav fav--${layout}`} style={toneVars(fav.tone)}>
              <div className="wrap fav-grid">
                {layout === "type" ? (
                  <div className="fav-type" aria-hidden="true">
                    <DrinkArt uid={`fav-${fav.itemId}`} kind={fav.art.kind} colors={fav.art.colors} className="fav-type-art float" />
                    <p className="fav-type-words">
                      {fav.notes[locale].map((w, k) => (
                        <span key={w} style={{ "--k": k } as CSSProperties}>
                          {w}
                        </span>
                      ))}
                    </p>
                  </div>
                ) : (
                  <figure className="fav-photo">
                    <Reveal
                      variant={REVEALS[layout as keyof typeof REVEALS]}
                      className="fav-frame"
                      style={{ "--clip-r": layout === "circle" ? "50%" : "1.75rem" } as CSSProperties}
                    >
                      <div className="zoom absolute inset-0">
                        <Photo id={fav.photo!} locale={locale} focus={fav.focus} sizes={SIZES[layout as keyof typeof SIZES]} />
                      </div>
                    </Reveal>
                  </figure>
                )}
                {text}
                {layout === "type" ? <p className="t-small fav-nophoto font-semibold text-[var(--tone-deep)]">{f.noPhoto}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <section className="bg-butter pb-32 pt-24 text-center md:pb-44 md:pt-32">
        <div className="wrap flex flex-col items-center">
          <Lines lines={f.closing} accent={1} className="t-display max-w-4xl [&_em]:text-caramel-deep" />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={href("menu", locale)} magnetic fill="var(--color-caramel)">
              {f.seeMenu}
            </ButtonLink>
            <ButtonLink href={href("visit", locale)} variant="outline">
              {t.common.findUs}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
