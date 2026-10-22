import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Photo } from "@/components/ui/Photo";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MenuNav } from "@/components/menu/MenuNav";
import { menu, extras, formatPrice, menuItemCount } from "@/data/menu-data";
import { tones, toneVars } from "@/lib/tones";
import { siteConfig, fullAddress } from "@/data/site-config";
import { getDictionary, fill } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * La carte : tous les produits et prix (aucun modifié), une bande de couleur par catégorie,
 * navigation collante, impression propre. Une seule photographie, en en-tête.
 * Entièrement rendue côté serveur : seule la navigation est un petit îlot client.
 */
export function MenuPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const m = t.menuPage;
  return (
    <>
      <PageHead
        tone="caramel"
        title={m.title}
        tagline={m.tagline}
        lede={m.lede}
        aside={
          <p className="t-small font-semibold text-ink/70">
            {fill(m.items, { n: menuItemCount })} · {fill(m.categories, { n: menu.length })}
          </p>
        }
        visual={
          <div data-progress="out" className="menu-hero">
            <div className="menu-hero-disc enter-rise" style={{ "--d": "0.1s" } as CSSProperties}>
              <div className="menu-hero-spin">
                <Photo id="p13" locale={locale} preload quality={85} sizes="(min-width: 1024px) 50vw, 130vw" />
              </div>
            </div>
          </div>
        }
      />

      <div className="relative bg-ivory">
        <MenuNav cats={menu.map((c) => ({ id: c.id, title: c.title[locale], dot: tones[c.tone].dot }))} label={m.categoriesLabel} printLabel={m.print} />

        <div className="print-only mb-6">
          <Logo className="h-24 w-auto" />
          <p className="mt-2">
            {siteConfig.name} — {fullAddress}
          </p>
        </div>

        <div className="-mt-[4.25rem]">
          {menu.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              data-menu-category
              aria-labelledby={`title-${cat.id}`}
              className="menu-cat bg-[var(--tone-soft)]"
              style={toneVars(cat.tone)}
            >
              <div className="wrap grid gap-8 pb-16 pt-28 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-32">
                <div className="md:col-span-4">
                  <p className="t-eyebrow tabular-nums text-[var(--tone-deep)]">{fill(m.items, { n: cat.items.length })}</p>
                  <h2 id={`title-${cat.id}`} className="t-h2 mt-3">
                    {cat.title[locale]}
                  </h2>
                  {cat.subtitle ? <p className="mt-4 max-w-xs font-medium text-ink/75">{cat.subtitle[locale]}</p> : null}
                </div>
                <Reveal as="ul" variant="stagger" className="grid content-start gap-x-12 md:col-span-8 lg:grid-cols-2">
                  {cat.items.map((item, i) => (
                    <li key={item.id} className="menu-item border-b border-ink/12 py-4" style={{ "--i": Math.min(i, 8) } as CSSProperties}>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] font-semibold leading-tight tracking-[-0.01em] md:text-[1.4rem]">
                          {item.name[locale]}
                        </h3>
                        <span aria-hidden="true" className="leader" />
                        <span className="shrink-0 font-semibold tabular-nums">{formatPrice(item.price, locale)}</span>
                      </div>
                      {item.note ? <p className="t-small mt-1 text-ink/70">{item.note[locale]}</p> : null}
                      {item.variants ? (
                        <div className="mt-2">
                          <span className="sr-only">{m.flavors} : </span>
                          <ul className="flex flex-wrap gap-1.5">
                            {item.variants[locale].map((v) => (
                              <li key={v} className="rounded-full bg-ivory/80 px-2.5 py-1 text-[0.8rem] font-medium">
                                {v}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </Reveal>
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="extras-title" className="wrap grid gap-8 py-16 md:grid-cols-12 md:py-24">
          <div className="rounded-[var(--radius)] bg-butter p-6 md:col-span-7 md:p-10" data-menu-category>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="extras-title" className="t-h3">
                {m.extrasTitle}
              </h2>
              <p className="t-small text-ink/70">{m.extrasNote}</p>
            </div>
            <ul className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {extras.map((x) => (
                <li key={x.id} className="flex items-baseline gap-3">
                  <span>{x.name[locale]}</span>
                  <span aria-hidden="true" className="leader" />
                  <span className="tabular-nums font-semibold">{formatPrice(x.price, locale, true)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-6 md:col-span-4 md:col-start-9">
            <p className="t-small text-ink/75">
              {t.common.priceNote} {m.footnote}
            </p>
            <div className="no-print flex flex-wrap gap-3">
              <ButtonLink href={href("favorites", locale)} size="sm" fill="var(--color-pink)">
                {m.favoritesLink}
              </ButtonLink>
              <ButtonLink href={href("visit", locale)} size="sm" variant="outline">
                {t.common.findUs}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
