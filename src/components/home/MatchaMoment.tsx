import type { CSSProperties } from "react";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * SCÈNE 04 — Matcha moment. Le vert s'ouvre en cercle (comme une goutte de matcha qui s'étale),
 * puis, sur grand écran, la scène s'épingle : la photo du geste s'agrandit dans un iris,
 * la tasse vue du dessus tourne, les trois étapes s'allument une à une.
 * Mobile et « réduire les animations » : mise en page empilée, sans épinglage.
 */
export function MatchaMoment({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.matcha;
  return (
    <section data-progress="in" aria-labelledby="matcha-title" className="matcha relative isolate">
      <div aria-hidden="true" className="matcha-bg" />
      <div data-progress="sticky" className="matcha-track">
        <div className="matcha-stage wrap">
          <div className="matcha-copy">
            <p className="t-eyebrow text-butter/80">{t.eyebrow}</p>
            <Lines id="matcha-title" lines={t.title} accent={1} className="t-h1 mt-5 [&_em]:text-matcha-soft" />
            <Reveal as="p" className="t-lede mt-6 max-w-[30rem] text-ivory/85">
              {t.text}
            </Reveal>
            <ol className="matcha-steps mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {t.steps.map((s, i) => (
                <li key={s.title} className="matcha-step border-t-[1.5px] border-ivory/35 pt-4" style={{ "--i": i } as CSSProperties}>
                  <span className="t-eyebrow tabular-nums text-matcha-soft">0{i + 1}</span>
                  <h3 className="mt-2 text-[1.5rem] leading-none tracking-[-0.02em]">{s.title}</h3>
                  <p className="t-small mt-2 text-ivory/75">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href={`${href("menu", locale)}#matcha`} variant="light" fill="var(--color-matcha-soft)">
                {t.cta}
              </ButtonLink>
            </div>
          </div>

          <div className="matcha-visual">
            <figure className="matcha-main">
              <Reveal variant="circle" className="matcha-circle">
                <div className="matcha-iris">
                  <div className="matcha-iris-img">
                    <Photo id="p05" locale={locale} sizes="(min-width: 1024px) 72vw, 160vw" />
                  </div>
                </div>
              </Reveal>
              <figcaption className="sr-only">{t.caption1}</figcaption>
            </figure>
            <figure className="matcha-top">
              <Reveal variant="pop" delay={0.2} className="matcha-top-disc">
                <Photo id="p03" locale={locale} sizes="(min-width: 1024px) 26vw, 60vw" focus="45% 48%" />
              </Reveal>
              <figcaption className="sr-only">{t.caption2}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
