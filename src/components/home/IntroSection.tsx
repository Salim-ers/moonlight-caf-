import { Lines, Fade, ClipReveal, Parallax } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Après l'expansion du hero : présentation courte + composition photographique décalée. */
export function IntroSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.intro;
  return (
    <section aria-labelledby="intro-title" className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-16">
          <Lines id="intro-title" lines={t.title} className="t-h2" />
          <Fade className="t-lede measure mt-8 text-ink-soft">
            <p>{t.text}</p>
          </Fade>
          <Fade as="dl" stagger={0.08} className="mt-12 grid max-w-md grid-cols-2 gap-x-8 gap-y-6 border-t border-ink/10 pt-8">
            {t.facts.map((f) => (
              <div key={f.label}>
                <dt className="t-label">{f.label}</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-[1.2rem] leading-snug">{f.value}</dd>
              </div>
            ))}
          </Fade>
        </div>

        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            <ClipReveal className="col-span-12 aspect-[3/2] rounded-[2px] md:col-span-10 md:col-start-3">
              <Photo id="lettering" locale={locale} sizes="(min-width: 1024px) 50vw, 92vw" />
            </ClipReveal>
            <Parallax speed={14} className="col-span-7 -mt-16 md:col-span-6 md:-mt-28">
              <ClipReveal className="aspect-[4/3] shadow-[0_30px_60px_-30px_rgba(35,35,31,0.35)]" from="left">
                <Photo id="benches" locale={locale} sizes="(min-width: 1024px) 28vw, 56vw" />
              </ClipReveal>
            </Parallax>
            <Parallax speed={-8} className="col-span-4 col-start-9 mt-10 md:col-span-4 md:col-start-8 md:mt-16">
              <ClipReveal className="aspect-[4/5]" from="top">
                <Photo id="shelves" locale={locale} sizes="(min-width: 1024px) 20vw, 34vw" />
              </ClipReveal>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
