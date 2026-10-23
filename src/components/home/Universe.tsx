import { Fragment, type CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * SCÈNE 02 — L'univers Moonlight. Une respiration claire après le hero :
 * une phrase courte, révélée mot à mot à son arrivée, les faits, et le lettrage du comptoir.
 */
export function Universe({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.universe;
  const words = t.statement.split(" ");
  return (
    <section aria-labelledby="universe-title" className="relative bg-ivory py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <h2 id="universe-title" className="t-eyebrow font-[family-name:var(--font-sans)] text-ink-soft">
            {t.eyebrow}
          </h2>
          <p
            data-reveal="words"
            className="words mt-6 font-[family-name:var(--font-display)] text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]"
          >
            {words.map((w, i) => (
              <Fragment key={i}>
                <span style={{ "--i": i } as CSSProperties}>{w}</span>{" "}
              </Fragment>
            ))}
          </p>
          <Reveal as="dl" variant="stagger" className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7">
            {t.facts.map((f, i) => (
              <div key={f.label} style={{ "--i": i } as CSSProperties} className="border-t-2 border-ink pt-3">
                <dt className="t-eyebrow text-ink-soft">{f.label}</dt>
                <dd className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.3rem,1.8vw,1.75rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                  {f.value}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7">
          <Reveal
            variant="clip-left"
            className="relative mx-auto aspect-[5/4] max-w-[46rem] overflow-hidden rounded-[var(--radius)] bg-butter"
            style={{ "--clip-r": "var(--radius)" } as CSSProperties}
          >
            <div className="zoom absolute inset-0">
              <Photo id="p21" locale={locale} sizes="(min-width: 1024px) 60vw, 130vw" focus="58% 42%" />
            </div>
          </Reveal>
          <figcaption className="t-small mx-auto mt-3 max-w-[46rem] text-ink-soft">{t.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
