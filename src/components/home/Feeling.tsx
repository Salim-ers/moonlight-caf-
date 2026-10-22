import { Lines, Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * SCÈNE 07 — The Moonlight feeling. Sur grand écran, une fenêtre arrondie s'ouvre pendant le
 * défilement jusqu'à montrer toute la salle ; le texte passe alors en clair sur la photo.
 * Mobile / animations réduites : photo et texte empilés.
 */
export function Feeling({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.feeling;
  return (
    <section aria-labelledby="feel-title" className="feel bg-ivory">
      <div data-progress="sticky" className="feel-track">
        <div className="feel-stage">
          <Reveal variant="window" className="feel-window">
            <div className="zoom absolute inset-0">
              <div className="feel-img">
                <Photo id="p07" locale={locale} sizes="(min-width: 640px) 112vw, 204vw" />
              </div>
            </div>
            <div aria-hidden="true" className="feel-scrim" />
          </Reveal>
          <div className="feel-copy wrap">
            <p className="t-eyebrow">{t.eyebrow}</p>
            <Lines id="feel-title" lines={t.title} accent={1} className="t-display mt-4" />
            <Reveal as="p" className="t-lede mt-6 max-w-[34rem]">
              {t.text}
            </Reveal>
            <div className="mt-8">
              <ButtonLink href={href("cafe", locale)} magnetic fill="var(--color-lavender)">
                {t.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
