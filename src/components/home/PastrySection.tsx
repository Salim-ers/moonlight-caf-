import { Lines, Fade, ClipReveal, Parallax } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { findItem, formatPrice } from "@/data/menu-data";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/** Section gourmande : galerie éditoriale décalée, chaque photo à sa propre vitesse. */
export function PastrySection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.pastry;
  const cookie = findItem("cookie");
  const flavors = cookie.note?.[locale].split(/,\s*/) ?? [];

  return (
    <section aria-labelledby="pastry-title" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Lines id="pastry-title" lines={t.title} className="t-h1" />
          </div>
          <Fade className="lg:col-span-4 lg:col-start-8 lg:pt-6">
            <p className="t-lede text-ink-soft">{t.text}</p>
          </Fade>
        </div>

        <div className="relative mt-16 grid grid-cols-12 gap-3 md:mt-24 md:gap-6">
          <ClipReveal className="col-span-12 aspect-[3/2] md:col-span-7" parallax={8}>
            <Photo id="cookieDisplay" locale={locale} sizes="(min-width: 768px) 58vw, 100vw" />
          </ClipReveal>

          <div className="col-span-12 flex flex-col justify-end md:col-span-4 md:col-start-9">
            <Fade>
              <h3 className="t-label">{t.flavorsTitle}</h3>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {flavors.map((f) => (
                  <li key={f} className="flex items-baseline justify-between gap-4 py-3 font-[family-name:var(--font-display)] text-[1.2rem]">
                    <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
                  </li>
                ))}
              </ul>
              <p className="t-small mt-3 text-ink-soft">
                {cookie.name[locale]} {formatPrice(cookie.price, locale)}
              </p>
            </Fade>
          </div>

          <Parallax speed={12} className="col-span-6 mt-6 md:col-span-4 md:col-start-2 md:mt-16">
            <ClipReveal className="aspect-[4/3]" from="left" parallax={6}>
              <Photo id="pastry" locale={locale} sizes="(min-width: 768px) 32vw, 50vw" />
            </ClipReveal>
          </Parallax>
          <Parallax speed={-6} className="col-span-6 mt-20 md:col-span-3 md:col-start-7 md:mt-40">
            <ClipReveal className="aspect-[4/5]" from="top" parallax={6}>
              <Photo id="cookieMatcha" locale={locale} sizes="(min-width: 768px) 24vw, 50vw" focus="35% 60%" />
            </ClipReveal>
          </Parallax>
          <Parallax speed={16} className="col-span-10 col-start-2 mt-6 md:col-span-3 md:col-start-10 md:mt-4">
            <ClipReveal className="aspect-[4/3]" from="right" parallax={6}>
              <Photo id="latteCake" locale={locale} sizes="(min-width: 768px) 24vw, 84vw" />
            </ClipReveal>
          </Parallax>
        </div>

        <Fade className="mt-16 md:mt-20">
          <ButtonLink href={`${href("menu", locale)}#patisseries`} variant="outline">
            {t.cta}
          </ButtonLink>
        </Fade>
      </div>
    </section>
  );
}
