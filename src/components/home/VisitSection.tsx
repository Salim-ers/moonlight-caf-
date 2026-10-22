import { MapPin } from "lucide-react";
import { Lines, Fade, ClipReveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursList } from "@/components/ui/HoursList";
import { CopyButton } from "@/components/ui/CopyButton";
import { siteConfig, mapsLinks, fullAddress } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Invitation finale : façade, adresse, horaires du jour et itinéraire. Fond « lune ». */
export function VisitSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section aria-labelledby="visit-title" className="relative overflow-hidden bg-moon py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <ClipReveal className="aspect-[4/5] w-full lg:col-span-5 lg:aspect-[4/5]" parallax={8}>
          <Photo id="facadeCup" locale={locale} sizes="(min-width: 1024px) 40vw, 92vw" />
        </ClipReveal>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Lines id="visit-title" lines={t.home.visit.title} className="t-h1" />
          <Fade className="mt-6">
            <p className="t-lede text-ink-soft">{t.home.visit.text}</p>
          </Fade>
          <Fade className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="t-label">{t.common.address}</h3>
              <address className="mt-2 font-[family-name:var(--font-display)] text-[1.35rem] not-italic leading-snug">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </address>
              <p className="t-small mt-2 text-ink-soft">{siteConfig.address.metro[locale]}</p>
              <CopyButton text={`${siteConfig.name}, ${fullAddress}`} label={t.common.copyAddress} done={t.common.copied} className="t-small mt-3" />
              <OpenStatus locale={locale} className="t-small mt-4" />
            </div>
            <div>
              <h3 className="t-label">{t.common.hours}</h3>
              <div className="mt-1">
                <HoursList locale={locale} compact />
              </div>
            </div>
          </Fade>
          <Fade className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={mapsLinks.directions} external icon={<MapPin className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />} ariaLabel={`${t.common.directions} ${t.a11y.newTab}`}>
              {t.common.directions}
            </ButtonLink>
            <ButtonLink href={mapsLinks.place} external variant="outline" ariaLabel={`${t.common.openInMaps} ${t.a11y.newTab}`}>
              {t.common.openInMaps}
            </ButtonLink>
          </Fade>
        </div>
      </div>
    </section>
  );
}
