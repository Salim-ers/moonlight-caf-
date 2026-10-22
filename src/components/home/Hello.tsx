import type { CSSProperties } from "react";
import { MapPin, TrainFront } from "lucide-react";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursList } from "@/components/ui/HoursList";
import { CopyButton } from "@/components/ui/CopyButton";
import { CircleText } from "@/components/ui/Doodles";
import { siteConfig, mapsLinks, fullAddress } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * SCÈNE 09 — Come say hello. Final aussi soigné que le hero : grand titre, tampon tournant
 * « 27 rue des Gravilliers », adresse copiable, horaires du jour, itinéraire.
 */
export function Hello({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.home.hello;
  return (
    <section aria-labelledby="hello-title" className="hello relative overflow-hidden bg-butter pb-32 pt-24 md:pb-48 md:pt-32">
      <div aria-hidden="true">
        <span className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-pink md:-right-16 md:h-[26rem] md:w-[26rem]" />
        <span className="absolute -left-16 bottom-24 h-40 w-40 rounded-full bg-blue/70" />
      </div>

      <div className="wrap relative grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="t-eyebrow text-pink-deep">{s.eyebrow}</p>
          <Lines id="hello-title" lines={s.title} accent={1} className="t-mega mt-5 [&_em]:text-pink-deep" />
          <Reveal as="p" className="t-lede mt-8 max-w-[30rem] text-ink/80">
            {s.text}
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={mapsLinks.directions}
              magnetic
              fill="var(--color-pink)"
              ariaLabel={`${t.common.directions} ${t.a11y.newTab}`}
              icon={<MapPin className="btn-icon h-4 w-4" strokeWidth={2} aria-hidden="true" />}
            >
              {t.common.directions}
            </ButtonLink>
            <ButtonLink href={href("menu", locale)} variant="outline">
              {t.common.seeMenu}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative pt-12 lg:col-span-5 lg:pt-0">
          <div aria-hidden="true" className="hello-stamp">
            <CircleText id="hello-stamp" text={s.stamp} className="absolute inset-0 h-full w-full" />
            <span className="font-[family-name:var(--font-display)] text-[2.6rem] font-bold leading-none tracking-[-0.04em]">27</span>
          </div>
          <Reveal variant="stagger" className="grid gap-4">
            <div className="rounded-[var(--radius)] bg-ivory p-6 shadow-[0_24px_50px_-34px_rgb(39_36_32/0.55)]" style={{ "--i": 0 } as CSSProperties}>
              <h3 className="t-eyebrow font-[family-name:var(--font-sans)] text-ink-soft">{t.common.address}</h3>
              <address className="mt-2 font-[family-name:var(--font-display)] text-[1.7rem] font-bold not-italic leading-[1.05] tracking-[-0.02em]">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </address>
              <p className="t-small mt-3 flex items-center gap-2 text-ink-soft">
                <TrainFront className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                {siteConfig.address.metro[locale]}
              </p>
              <CopyButton text={`${siteConfig.name}, ${fullAddress}`} label={t.common.copyAddress} done={t.common.copied} className="mt-2 text-[0.95rem]" />
            </div>
            <div className="rounded-[var(--radius)] bg-ivory p-6 shadow-[0_24px_50px_-34px_rgb(39_36_32/0.55)]" style={{ "--i": 1 } as CSSProperties}>
              <h3 className="t-eyebrow font-[family-name:var(--font-sans)] text-ink-soft">{t.common.hours}</h3>
              <OpenStatus locale={locale} className="mt-2 font-semibold" />
              <HoursList locale={locale} className="mt-3 text-[0.95rem]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
