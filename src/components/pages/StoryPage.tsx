import Image from "next/image";
import { Lines, Fade, ClipReveal } from "@/components/motion/Reveal";
import { ExpandImage } from "@/components/motion/ExpandImage";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import type { PhotoKey } from "@/data/gallery-data";
import { siteConfig } from "@/data/site-config";
import { getDictionary, fill } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

const CHAPTER_PHOTOS: { main: PhotoKey; second?: PhotoKey }[] = [
  { main: "facade", second: "facadeCup" },
  { main: "matchaTop", second: "latteTop" },
  { main: "roomWide" },
  { main: "icedWindow", second: "cookieDisplay" },
];

/**
 * Histoire : uniquement des faits vérifiés (ouverture juillet 2024, Fève, matcha d'Uji,
 * inspiration japonaise et coréenne). Aucune citation inventée. Le nom de la fondatrice
 * n'apparaît que s'il est renseigné dans site-config après accord du propriétaire.
 */
export function StoryPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.storyPage;
  return (
    <>
      <header className="bg-paper pb-16 pt-36 md:pb-24 md:pt-44">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-end">
          <Lines as="h1" lines={[s.title]} trigger="load" className="t-display md:col-span-8" />
          <Fade trigger="load" delay={0.35} className="md:col-span-4">
            <p className="t-lede text-ink-soft">{s.lede}</p>
            {siteConfig.founderName ? <p className="mt-4 text-ink-soft">{fill(s.founderLine, { name: siteConfig.founderName })}</p> : null}
          </Fade>
        </div>
      </header>

      <ExpandImage label={t.home.story.date} overlay={<p className="t-h2 max-w-3xl">{t.home.story.date}</p>}>
        <Photo id="lettering" locale={locale} sizes="100vw" />
      </ExpandImage>

      {s.chapters.map((c, i) => {
        const ph = CHAPTER_PHOTOS[i];
        const reverse = i % 2 === 1;
        return (
          <section key={c.title} aria-labelledby={`chapter-${i}`} className={`py-20 md:py-32 ${i % 2 ? "bg-cream" : "bg-paper"}`}>
            <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
              <div className={`md:col-span-5 ${reverse ? "md:order-2 md:col-start-8" : ""} md:sticky md:top-32 md:self-start`}>
                <p className="t-label">{c.kicker}</p>
                <Lines as="h2" id={`chapter-${i}`} lines={[c.title]} className="t-h2 mt-4" />
                <Fade className="mt-8 space-y-5">
                  {c.text.map((p) => (
                    <p key={p} className="t-lede text-ink-soft">
                      {p}
                    </p>
                  ))}
                </Fade>
              </div>
              <div className={`md:col-span-6 ${reverse ? "md:order-1" : "md:col-start-7"}`}>
                <ClipReveal className="aspect-[4/3] w-full" parallax={10} from={reverse ? "left" : "right"}>
                  <Photo id={ph.main} locale={locale} sizes="(min-width: 768px) 50vw, 92vw" />
                </ClipReveal>
                {ph.second ? (
                  <ClipReveal className={`mt-4 aspect-[4/5] w-[56%] md:-mt-20 ${reverse ? "" : "ml-auto"} relative shadow-[0_30px_60px_-30px_rgba(35,35,31,0.4)]`} from="bottom">
                    <Photo id={ph.second} locale={locale} sizes="(min-width: 768px) 28vw, 52vw" />
                  </ClipReveal>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-moon py-24 text-center md:py-32">
        <div className="wrap flex flex-col items-center">
          <Image src="/brand/logo-illustration.png" alt="" width={557} height={728} className="h-40 w-auto md:h-52" />
          <Lines lines={[s.closing]} className="t-h2 mt-10 max-w-3xl" />
          <Fade className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={href("visit", locale)}>{t.common.findUs}</ButtonLink>
            <ButtonLink href={href("menu", locale)} variant="outline">
              {t.common.seeMenu}
            </ButtonLink>
          </Fade>
        </div>
      </section>
    </>
  );
}
