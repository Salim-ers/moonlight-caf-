import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Drop, Sparkle } from "@/components/ui/Doodles";
import { siteConfig } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Découpe un mot en lettres pour la vague au survol (le mot complet reste lisible et accessible). */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {Array.from(text).map((c, i) => (
        <span key={i} className="sl-char" style={{ "--i": i + offset } as CSSProperties}>
          {c}
        </span>
      ))}
    </>
  );
}

/**
 * SCÈNE 08 — Community. Pas de grille de photos répétées : un grand lettrage @moonlight.cafe.paris
 * qui glisse avec le défilement et ondule au survol, le logo complet et quelques formes de couleur.
 */
export function Social({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.home.social;
  const [first, ...rest] = siteConfig.instagram.handle.split(".");
  const second = `.${rest.join(".")}`;
  return (
    <section data-progress="through" aria-labelledby="social-title" className="social relative overflow-hidden bg-blue py-24 md:py-32">
      <div aria-hidden="true">
        <Drop className="social-shape float absolute left-[46%] top-[9%] w-10 text-pink" />
        <Sparkle className="social-shape float absolute right-[12%] top-[18%] w-8 text-butter" style={{ "--float-delay": "-2s" } as CSSProperties} />
        <span
          className="social-shape float absolute bottom-[7%] left-[62%] h-16 w-16 rounded-full bg-lavender"
          style={{ "--float-delay": "-1s" } as CSSProperties}
        />
        <span
          className="social-shape float absolute right-[-2rem] top-[34%] h-24 w-24 rounded-full bg-matcha"
          style={{ "--float-delay": "-3s" } as CSSProperties}
        />
      </div>

      <div className="wrap relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 id="social-title" className="t-eyebrow font-[family-name:var(--font-sans)]">
            {s.eyebrow} — Instagram
          </h2>
          <Reveal as="p" className="t-lede mt-4 max-w-[28rem]">
            {s.text}
          </Reveal>
        </div>
        <Reveal variant="pop">
          <Logo alt="" className="h-auto w-[clamp(7rem,12vw,10rem)]" />
        </Reveal>
      </div>

      <a
        href={siteConfig.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-handle group mt-10 block md:mt-14"
        aria-label={`Instagram ${siteConfig.instagram.handle} ${t.a11y.newTab}`}
      >
        <span className="social-line social-line--1" aria-hidden="true">
          <Letters text={first} />
        </span>
        <span className="social-line social-line--2" aria-hidden="true">
          <em>
            <Letters text={second} offset={first.length} />
          </em>
        </span>
      </a>

      <div className="wrap relative mt-10">
        <ButtonLink href={siteConfig.instagram.url} magnetic fill="var(--color-pink)" ariaLabel={`${s.cta} ${t.a11y.newTab}`}>
          {s.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
