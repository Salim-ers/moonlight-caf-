import type { CSSProperties } from "react";
import { Lines, Reveal, Enter } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Photo } from "@/components/ui/Photo";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SteamCup } from "@/components/ui/Doodles";
import type { PhotoId } from "@/data/photo-manifest";
import { siteConfig } from "@/data/site-config";
import { groupedHours, formatTime } from "@/lib/hours";
import { toneVars, type Tone } from "@/lib/tones";
import { getDictionary, fill } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/** Une photo exclusive par chapitre (le 4e chapitre est porté par la typographie et le logo). */
const CHAPTERS: { photo?: PhotoId; tone: Tone; shape: string }[] = [
  { photo: "p23", tone: "blue", shape: "999px 999px 1.75rem 1.75rem" },
  { photo: "p18", tone: "caramel", shape: "1.75rem" },
  { photo: "p14", tone: "pink", shape: "50%" },
  { tone: "matcha", shape: "1.75rem" },
];

/**
 * Notre histoire : uniquement des faits vérifiés (ouverture en juillet 2024, Fève, matcha bio de
 * cérémonie, pâtisseries maison, accessoires). Aucune citation ni personne inventée : le nom de la
 * fondatrice n'apparaît que s'il est renseigné dans site-config après accord du propriétaire.
 */
export function StoryPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.storyPage;
  return (
    <>
      <PageHead
        tone="butter"
        title={s.title}
        tagline={s.tagline}
        lede={s.lede}
        aside={siteConfig.founderName ? <p className="text-ink/75">{fill(s.founderLine, { name: siteConfig.founderName })}</p> : undefined}
        visual={
          <div aria-hidden="true">
            <Enter variant="pop" delay={0.15} className="story-year">
              <span>20</span>
              <span>24</span>
            </Enter>
          </div>
        }
      />

      <div data-progress="through" className="story-line relative bg-ivory">
        {s.chapters.map((c, i) => {
          const ch = CHAPTERS[i];
          const reverse = i % 2 === 1;
          return (
            <section key={c.title} aria-labelledby={`chapter-${i}`} className="relative py-20 md:py-32" style={toneVars(ch.tone)}>
              <div className="wrap grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
                <div className={`md:col-span-5 ${reverse ? "md:order-2 md:col-start-8" : "md:col-start-2"}`}>
                  <p className="t-eyebrow text-[var(--tone-deep)]">{c.kicker}</p>
                  <Lines as="h2" id={`chapter-${i}`} lines={[c.title]} className="t-h1 mt-4" />
                  <Reveal className="mt-7 space-y-4">
                    {c.text.map((p) => (
                      <p key={p} className="t-lede text-ink/80">
                        {p}
                      </p>
                    ))}
                  </Reveal>
                </div>
                <div className={`md:col-span-5 ${reverse ? "md:order-1 md:col-start-2" : "md:col-start-8"}`}>
                  {ch.photo ? (
                    <Reveal
                      variant={i === 2 ? "circle" : i === 1 ? "clip-left" : "clip-up"}
                      className={`relative overflow-hidden bg-[var(--tone-soft)] ${i === 2 ? "aspect-square" : "aspect-[4/5]"}`}
                      style={{ borderRadius: ch.shape, "--clip-r": ch.shape } as CSSProperties}
                    >
                      <div className="zoom absolute inset-0">
                        <Photo id={ch.photo} locale={locale} sizes={i === 2 ? "(min-width: 768px) 70vw, 164vw" : "(min-width: 768px) 86vw, 204vw"} />
                      </div>
                    </Reveal>
                  ) : (
                    <Reveal variant="pop" className="story-card">
                      <SteamCup className="h-20 w-20 text-matcha-deep" />
                      <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.02] tracking-[-0.025em]">
                        {groupedHours().map((g) => (
                          <span key={g.days.join()} className="block">
                            {g.days.length > 1 ? `${t.days[g.days[0]]} – ${t.days[g.days[g.days.length - 1]]}` : t.days[g.days[0]]}
                            {g.closed ? "" : ` · ${formatTime(g.open!, locale)}`}
                          </span>
                        ))}
                      </p>
                    </Reveal>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-lavender pb-32 pt-24 text-center md:pb-44 md:pt-32">
        <div className="wrap flex flex-col items-center">
          <Reveal variant="pop">
            <Logo className="h-auto w-[min(70vw,22rem)]" />
          </Reveal>
          <Lines lines={s.closing} accent={1} className="t-display mt-12 max-w-4xl [&_em]:text-lavender-deep" />
          <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={href("visit", locale)} magnetic fill="var(--color-butter)">
              {t.common.findUs}
            </ButtonLink>
            <ButtonLink href={href("menu", locale)} variant="outline">
              {t.common.seeMenu}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
