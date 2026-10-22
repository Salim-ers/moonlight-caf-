import type { CSSProperties } from "react";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CircleText } from "@/components/ui/Doodles";
import { findItem, formatPrice } from "@/data/menu-data";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

const SWEETS = ["cookie", "cake", "granola-bowl"];
const FLAVOR_DOTS = ["var(--color-matcha)", "var(--color-ink)", "var(--color-caramel-deep)", "var(--color-pink-deep)"];

/**
 * SCÈNE 06 — The sweet side. Bandeau typographique incliné en séparateur, fond caramel,
 * gros plan sur le présentoir à cookies (zoom lent au défilement), parfums et prix issus de la carte.
 */
export function SweetSide({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.home.sweet;
  const cookie = findItem("cookie");
  const band = Array.from({ length: 6 }, () => t.common.marquee.join(" • ")).join(" • ");
  return (
    <section aria-labelledby="sweet-title" className="relative overflow-hidden bg-caramel-soft pb-24 md:pb-32">
      <div aria-hidden="true" className="sweet-band marquee-wrap">
        <div className="marquee">
          <span className="sweet-band-text">{band} • </span>
          <span className="sweet-band-text">{band} • </span>
        </div>
      </div>

      <div className="wrap mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-8">
          <p className="t-eyebrow text-caramel-deep">{s.eyebrow}</p>
          <Lines id="sweet-title" lines={s.title} accent={1} className="t-h1 mt-5 [&_em]:text-caramel-deep" />
          <Reveal as="p" className="t-lede mt-7 max-w-[30rem] text-ink/80">
            {s.text}
          </Reveal>

          <h3 className="t-eyebrow mt-10 font-[family-name:var(--font-sans)] text-ink/70">{s.flavorsTitle}</h3>
          <Reveal as="ul" variant="stagger" className="mt-4 flex flex-wrap gap-2">
            {cookie.variants?.[locale].map((f, i) => (
              <li key={f} style={{ "--i": i } as CSSProperties}>
                <span className="chip float" style={{ "--float-delay": `${-i * 1.1}s` } as CSSProperties}>
                  <span className="dot" style={{ "--dot": FLAVOR_DOTS[i % FLAVOR_DOTS.length] } as CSSProperties} aria-hidden="true" />
                  {f}
                </span>
              </li>
            ))}
          </Reveal>

          <Reveal as="ul" className="mt-10 max-w-[26rem] rounded-[var(--radius)] bg-ivory p-5 shadow-[0_20px_40px_-28px_rgb(39_36_32/0.5)]">
            {SWEETS.map((id) => {
              const it = findItem(id);
              return (
                <li key={id} className="flex items-baseline gap-3 py-1.5">
                  <span className="font-semibold">{it.name[locale]}</span>
                  <span aria-hidden="true" className="leader" />
                  <span className="tabular-nums">{formatPrice(it.price, locale)}</span>
                </li>
              );
            })}
          </Reveal>
          <div className="mt-8">
            <ButtonLink href={`${href("menu", locale)}#patisseries`} fill="var(--color-caramel)">
              {s.cta}
            </ButtonLink>
          </div>
        </div>

        <figure data-progress="through" className="sweet-figure relative lg:col-span-7">
          <Reveal variant="clip-up" className="sweet-photo" style={{ "--clip-r": "1.75rem" } as CSSProperties}>
            <div className="zoom absolute inset-0">
              <div className="sweet-zoom absolute inset-0">
                <Photo id="p11" locale={locale} sizes="(min-width: 640px) 100vw, 204vw" />
              </div>
            </div>
          </Reveal>
          <div aria-hidden="true" className="sweet-sticker">
            <CircleText
              id="sweet-sticker"
              text={locale === "fr" ? "Fait maison • Fait maison • Fait maison • " : "Homemade • Homemade • Homemade • "}
              className="absolute inset-0 h-full w-full text-ink"
            />
            <span className="font-[family-name:var(--font-serif)] text-[2rem] italic leading-none">{formatPrice(cookie.price, locale)}</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
