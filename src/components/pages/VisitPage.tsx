import { MapPin, Mail, TrainFront } from "lucide-react";
import { Lines, Fade, ClipReveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HoursList } from "@/components/ui/HoursList";
import { CopyButton } from "@/components/ui/CopyButton";
import { MapConsent } from "@/components/ui/MapConsent";
import { siteConfig, mapsLinks, fullAddress } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function VisitPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const v = t.visitPage;
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(t.common.emailSubject)}`;
  return (
    <>
      <header className="bg-paper pb-12 pt-36 md:pb-16 md:pt-44">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Lines as="h1" lines={[v.title]} trigger="load" className="t-display" />
          </div>
          <Fade trigger="load" delay={0.3} className="md:col-span-4 md:col-start-9">
            <p className="t-lede text-ink-soft">{v.lede}</p>
            <OpenStatus locale={locale} className="mt-5 text-[1rem]" />
          </Fade>
        </div>
      </header>

      <section aria-label={t.common.address} className="bg-paper pb-20 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ClipReveal trigger="load" delay={0.15} className="aspect-[4/3] w-full" parallax={6}>
              <Photo id="facade" locale={locale} sizes="(min-width: 1024px) 40vw, 92vw" preload />
            </ClipReveal>

            <Fade className="mt-10">
              <h2 className="t-label">{t.common.address}</h2>
              <address className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] not-italic leading-tight">
                {siteConfig.name}
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </address>
              <p className="mt-3 flex items-center gap-2 text-ink-soft">
                <TrainFront className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {siteConfig.address.metro[locale]}
              </p>
              <p className="t-small mt-1 text-ink-soft">{v.onSite}</p>
              <CopyButton text={`${siteConfig.name}, ${fullAddress}`} label={t.common.copyAddress} done={t.common.copied} className="mt-3 text-[0.9375rem]" />
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={mapsLinks.directions} external icon={<MapPin className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />} ariaLabel={`${t.common.directions} ${t.a11y.newTab}`}>
                  {t.common.directions}
                </ButtonLink>
                <ButtonLink href={mapsLinks.place} external variant="outline" ariaLabel={`${t.common.openInMaps} ${t.a11y.newTab}`}>
                  {t.common.openInMaps}
                </ButtonLink>
              </div>
            </Fade>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Fade>
              <h2 className="t-h3">{t.common.hours}</h2>
              <div className="mt-4">
                <HoursList locale={locale} />
              </div>
              <p className="t-small mt-3 text-ink-soft">{v.exceptionsNote}</p>
            </Fade>

            <Fade className="mt-14">
              <h2 className="t-h3">{v.map.title}</h2>
              <div className="mt-5">
                <MapConsent locale={locale} />
              </div>
            </Fade>

            <Fade className="mt-14 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="t-h3">{t.common.contact}</h2>
                <p className="mt-2 text-ink-soft">{v.emailText}</p>
                <a href={mailto} className="link-draw mt-3 inline-flex min-h-11 items-center gap-2">
                  <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h2 className="t-h3">Instagram</h2>
                <p className="mt-2 text-ink-soft">{v.instagramText}</p>
                <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="link-draw mt-3 inline-flex min-h-11 items-center">
                  {siteConfig.instagram.handle}
                  <span className="sr-only"> {t.a11y.newTab}</span>
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
}
