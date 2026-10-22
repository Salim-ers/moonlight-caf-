import type { CSSProperties } from "react";
import { Mail, MapPin, TrainFront } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursList } from "@/components/ui/HoursList";
import { CopyButton } from "@/components/ui/CopyButton";
import { MapConsent } from "@/components/ui/MapConsent";
import { siteConfig, mapsLinks, fullAddress } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Nous trouver : adresse et horaires en premier (même sur mobile), itinéraire, photo de la façade,
 * plan Google Maps chargé seulement après accord, contact. Aucun formulaire, aucun faux statut :
 * le statut d'ouverture découle uniquement des horaires saisis.
 */
export function VisitPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const v = t.visitPage;
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(t.common.emailSubject)}`;
  const card = "rounded-[var(--radius)] bg-ivory p-6 shadow-[0_24px_50px_-34px_rgb(39_36_32/0.5)] md:p-8";
  return (
    <>
      <PageHead
        tone="blue"
        title={v.title}
        tagline={v.tagline}
        lede={v.lede}
        aside={<OpenStatus locale={locale} className="chip min-h-11 w-fit px-4 font-semibold" />}
      />

      <section aria-label={t.common.address} className="bg-blue-soft pb-16 md:pb-24">
        <div className="wrap grid gap-5 lg:grid-cols-12">
          <div className={`${card} lg:col-span-5`}>
            <h2 className="t-eyebrow font-[family-name:var(--font-sans)] text-blue-deep">{t.common.address}</h2>
            <address className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.9rem,3vw,2.6rem)] font-bold not-italic leading-[1] tracking-[-0.03em]">
              {siteConfig.name}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </address>
            <p className="mt-4 flex items-center gap-2 text-ink/75">
              <TrainFront className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              {siteConfig.address.metro[locale]}
            </p>
            <p className="t-small mt-1 text-ink/70">{v.onSite}</p>
            <CopyButton text={`${siteConfig.name}, ${fullAddress}`} label={t.common.copyAddress} done={t.common.copied} className="mt-2 text-[0.95rem]" />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href={mapsLinks.directions}
                magnetic
                fill="var(--color-blue)"
                ariaLabel={`${t.common.directions} ${t.a11y.newTab}`}
                icon={<MapPin className="btn-icon h-4 w-4" strokeWidth={2} aria-hidden="true" />}
              >
                {t.common.directions}
              </ButtonLink>
              <ButtonLink href={mapsLinks.place} variant="outline" ariaLabel={`${t.common.openInMaps} ${t.a11y.newTab}`}>
                {t.common.openInMaps}
              </ButtonLink>
            </div>
          </div>

          <div className={`${card} lg:col-span-4`}>
            <h2 className="t-eyebrow font-[family-name:var(--font-sans)] text-blue-deep">{t.common.hours}</h2>
            <HoursList locale={locale} className="mt-3" />
            <p className="t-small mt-4 text-ink/70">{v.exceptionsNote}</p>
          </div>

          <figure className="relative lg:col-span-3">
            <Reveal
              variant="clip-up"
              className="relative h-full min-h-[22rem] overflow-hidden rounded-[var(--radius)] bg-blue"
              style={{ "--clip-r": "var(--radius)" } as CSSProperties}
            >
              <div className="zoom absolute inset-0">
                <Photo id="p08" locale={locale} sizes="(min-width: 1024px) 62vw, 164vw" focus="50% 45%" />
              </div>
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink font-[family-name:var(--font-display)] text-[1.6rem] font-bold tracking-[-0.04em]"
              >
                27
              </span>
            </Reveal>
          </figure>
        </div>
      </section>

      <section aria-labelledby="map-title" className="bg-ivory pb-32 pt-16 md:pb-44 md:pt-24">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="map-title" className="t-h2">
              {v.map.title}
            </h2>
            <div className="mt-6">
              <MapConsent locale={locale} />
            </div>
          </div>
          <div className="grid content-start gap-5 lg:col-span-4 lg:col-start-9 lg:pt-20">
            <Reveal className="rounded-[var(--radius)] bg-pink-soft p-6">
              <h2 className="t-h3">{t.common.contact}</h2>
              <p className="mt-2 text-ink/75">{v.emailText}</p>
              <a href={mailto} className="link-draw mt-3 inline-flex min-h-11 items-center gap-2 break-all font-semibold">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                {siteConfig.email}
              </a>
            </Reveal>
            <Reveal className="rounded-[var(--radius)] bg-lavender-soft p-6" delay={0.08}>
              <h2 className="t-h3">Instagram</h2>
              <p className="mt-2 text-ink/75">{v.instagramText}</p>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-3 inline-flex min-h-11 items-center font-semibold"
              >
                {siteConfig.instagram.handle}
                <span className="sr-only"> {t.a11y.newTab}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
