import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Enter } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * SCÈNE 01 — Hero « campagne colorée ».
 * Titre monumental, arche photographique (matcha sur lait rose), médaillon (boisson violette)
 * et deux formes de couleur. Tout est rendu côté serveur et visible au premier affichage ;
 * l'entrée est en CSS pur, la parallaxe souris et le défilement sont pilotés par des
 * variables CSS (`--mx`, `--my`, `--p`) : aucun JavaScript propre au hero.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.home.hero;
  return (
    <section data-pointer data-progress="out" aria-labelledby="hero-title" className="hero relative isolate overflow-hidden">
      {/* formes de couleur (décor) */}
      <div aria-hidden="true" className="hero-layer hero-layer--blob">
        <div className="hero-ptr" style={{ "--depth": -18 } as CSSProperties}>
          <svg viewBox="0 0 600 640" className="hero-blob enter-fade">
            <path
              fill="var(--color-matcha)"
              d="M318 18c88-6 178 44 222 128 40 76 34 150 10 222-26 78-24 150-86 206-70 62-182 74-268 40C110 580 44 520 22 438 0 356 40 292 52 214 66 120 104 52 186 30c44-12 88-10 132-12z"
            />
          </svg>
        </div>
      </div>
      <div aria-hidden="true" className="hero-layer hero-layer--dot">
        <span className="hero-dot enter-pop" style={{ "--d": "0.5s" } as CSSProperties} />
      </div>

      <div className="hero-grid wrap relative">
        <div className="hero-copy">
          <Enter as="p" className="t-eyebrow hero-eyebrow text-ink/75">
            {h.eyebrow}
          </Enter>
          <h1 id="hero-title" className="hero-title enter-lines" style={{ "--d": "0.04s" } as CSSProperties}>
            {h.title.map((l, i) => (
              <span key={i} className="ln">
                <span style={{ "--i": i } as CSSProperties}>{i === h.title.length - 1 ? <em>{l}</em> : l}</span>
                {i < h.title.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <div className="hero-bottom">
            <Enter as="p" delay={0.28} className="t-lede hero-lede">
              {h.lede}
            </Enter>
            <Enter delay={0.36} className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={href("menu", locale)}
                magnetic
                fill="var(--color-matcha)"
                icon={<ArrowRight className="btn-icon h-4 w-4" strokeWidth={2} aria-hidden="true" />}
              >
                {t.common.seeMenu}
              </ButtonLink>
              <ButtonLink href={href("visit", locale)} variant="outline">
                {t.common.findUs}
              </ButtonLink>
            </Enter>
            <Enter delay={0.44}>
              <OpenStatus locale={locale} className="t-small mt-5 font-medium text-ink/80" />
            </Enter>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-layer hero-layer--arch">
            <div className="hero-ptr" style={{ "--depth": -12 } as CSSProperties}>
              <figure className="hero-arch enter-rise" style={{ "--d": "0.06s" } as CSSProperties}>
                <div className="zoom absolute inset-0">
                  <Photo id="p06" locale={locale} preload quality={85} sizes="(min-width: 1024px) 80vw, 175vw" />
                </div>
              </figure>
            </div>
          </div>

          <div className="hero-layer hero-layer--medal">
            <div className="hero-ptr" style={{ "--depth": 22 } as CSSProperties}>
              <figure className="hero-medal enter-pop" style={{ "--d": "0.32s" } as CSSProperties}>
                <Photo id="p02" locale={locale} quality={85} sizes="(min-width: 1024px) 26vw, 66vw" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
