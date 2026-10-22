import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SteamLine } from "@/components/ui/Doodles";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * SCÈNE 02 — L'univers Moonlight. Une respiration claire après le hero :
 * une seule phrase, révélée mot à mot au rythme du défilement, puis le lettrage du comptoir.
 */
export function Universe({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.universe;
  const words = t.statement.split(" ");
  return (
    <section aria-labelledby="universe-title" className="relative bg-ivory py-24 md:py-36">
      <div className="wrap">
        <div className="flex items-center gap-4">
          <span className="dot h-3 w-3" style={{ "--dot": "var(--color-pink)" } as CSSProperties} aria-hidden="true" />
          <h2 id="universe-title" className="t-eyebrow font-[family-name:var(--font-sans)]">
            {t.eyebrow}
          </h2>
        </div>
        <p
          data-progress="in"
          className="words mt-8 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] md:max-w-[24ch]"
        >
          {words.map((w, i) => (
            <span key={i} style={{ "--w": (i / words.length).toFixed(3) } as CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:items-end md:gap-8">
          <figure className="md:col-span-7">
            <Reveal
              variant="clip-left"
              className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-butter"
              style={{ "--clip-r": "var(--radius)" } as CSSProperties}
            >
              <div className="zoom absolute inset-0">
                <Photo id="p21" locale={locale} sizes="(min-width: 768px) 64vw, 104vw" />
              </div>
            </Reveal>
            <figcaption className="t-small mt-3 flex items-center gap-2 text-ink-soft">
              <span className="dot" style={{ "--dot": "var(--color-matcha)" } as CSSProperties} aria-hidden="true" />
              {t.caption}
            </figcaption>
          </figure>
          <div className="md:col-span-5 md:col-start-8">
            <SteamLine className="mb-6 h-10 w-40 text-pink-deep" />
            <Reveal as="dl" variant="stagger" className="grid grid-cols-2 gap-x-6 gap-y-8">
              {t.facts.map((f, i) => (
                <div key={f.label} style={{ "--i": i } as CSSProperties} className="border-t-2 border-ink pt-3">
                  <dt className="t-eyebrow text-ink-soft">{f.label}</dt>
                  <dd className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2vw,1.9rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
