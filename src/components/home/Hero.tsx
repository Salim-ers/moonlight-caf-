import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Enter } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { CircleText, SteamCup, Sparkle } from "@/components/ui/Doodles";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

const PALETTE = ["var(--color-matcha)", "var(--color-pink)", "var(--color-lavender-deep)", "var(--color-blue)", "var(--color-caramel)"];

/**
 * SCÈNE 01 — Hero « campagne colorée ».
 * Titre monumental, arche photographique (matcha sur lait rose), médaillon (boisson violette),
 * formes de couleur, badge tournant et palette. Tout est rendu côté serveur et visible au premier
 * affichage ; l'entrée est en CSS pur (≤ 0,9 s), la parallaxe souris et le défilement sont
 * pilotés par des variables CSS (`--mx`, `--my`, `--p`) : aucun JavaScript propre au hero.
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
                  <Photo id="p06" locale={locale} preload quality={60} sizes="(min-width: 1024px) 80vw, 175vw" />
                </div>
              </figure>
              <Enter as="p" delay={0.62} className="hero-tag hero-tag--1">
                <span className="dot" style={{ "--dot": "var(--color-matcha)" } as CSSProperties} />
                <span>
                  <span className="font-medium text-ink-soft">fig. 01 — </span>
                  {h.fig1}
                </span>
              </Enter>
            </div>
          </div>

          <div className="hero-layer hero-layer--medal">
            <div className="hero-ptr" style={{ "--depth": 22 } as CSSProperties}>
              <figure className="hero-medal enter-pop" style={{ "--d": "0.32s" } as CSSProperties}>
                <Photo id="p02" locale={locale} quality={60} sizes="(min-width: 1024px) 26vw, 66vw" />
              </figure>
              <Enter as="p" delay={0.72} className="hero-tag hero-tag--2">
                <span className="dot" style={{ "--dot": "var(--color-lavender-deep)" } as CSSProperties} />
                <span>
                  <span className="font-medium text-ink-soft">fig. 02 — </span>
                  {h.fig2}
                </span>
              </Enter>
            </div>
          </div>

          <div aria-hidden="true" className="hero-layer hero-layer--badge">
            <div className="hero-ptr" style={{ "--depth": 30 } as CSSProperties}>
              <div className="hero-badge enter-pop" style={{ "--d": "0.5s" } as CSSProperties}>
                <CircleText id="hero-badge-text" text={`${t.common.marquee.join(" • ")} • `} className="absolute inset-0 h-full w-full" />
                <SteamCup className="relative h-[42%] w-[42%]" />
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="hero-layer hero-layer--spark">
            <div className="hero-ptr" style={{ "--depth": 36 } as CSSProperties}>
              <Sparkle className="hero-spark enter-pop text-ink" style={{ "--d": "0.8s" } as CSSProperties} />
            </div>
          </div>
        </div>

        <div className="hero-palette">
          <Enter as="p" delay={0.5} className="t-eyebrow mb-2 inline-block rounded-full bg-ivory/90 px-3 py-1.5 text-ink">
            {h.palette}
          </Enter>
          <ul className="flex flex-wrap gap-2">
            {h.chips.map((c, i) => (
              <li key={c} className="enter-up" style={{ "--d": `${0.56 + i * 0.06}s` } as CSSProperties}>
                <span className="chip float" style={{ "--float-delay": `${-i * 0.9}s`, "--float-d": `${4.5 + (i % 3)}s` } as CSSProperties}>
                  <span className="dot" style={{ "--dot": PALETTE[i] } as CSSProperties} />
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="hero-scroll t-eyebrow">
        <span>{h.scroll}</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
