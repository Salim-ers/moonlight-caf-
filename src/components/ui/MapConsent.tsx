"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getMapsConsent, setMapsConsent, onConsentChange } from "@/lib/consent";
import { mapsLinks } from "@/data/site-config";
import { photos } from "@/data/gallery-data";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { Button, ButtonLink } from "./Button";

/**
 * Plan Google Maps chargé uniquement après accord explicite.
 * Avant accord : aucune requête vers Google, seulement un aperçu local et un lien externe.
 */
export function MapConsent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(getMapsConsent());
    sync();
    return onConsentChange(sync);
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-cream sm:aspect-[4/3] lg:aspect-[5/4]">
      {allowed ? (
        <iframe
          title={t.visitPage.map.iframeTitle}
          src={mapsLinks.embed}
          className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <Image src={photos.facade.src} alt="" fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover opacity-25 blur-[2px]" placeholder="blur" quality={70} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper">
              <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="max-w-sm text-[0.9375rem] text-ink">{t.visitPage.map.consentText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => setMapsConsent(true)}>{t.visitPage.map.load}</Button>
              <ButtonLink href={mapsLinks.place} external variant="outline" ariaLabel={`${t.common.openInMaps} ${t.a11y.newTab}`}>
                {t.common.openInMaps}
              </ButtonLink>
            </div>
            <p className="t-small max-w-xs text-ink-soft">{t.visitPage.map.remember}</p>
          </div>
        </>
      )}
    </div>
  );
}

/** Interrupteur réel de consentement (page Cookies). */
export function ConsentControl({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cookiesPage;
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const sync = () => setAllowed(getMapsConsent());
    sync();
    return onConsentChange(sync);
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[3px] bg-cream px-6 py-5">
      <div>
        <p className="font-medium">{t.mapsState}</p>
        <p className="t-small text-ink-soft" aria-live="polite">
          {allowed ? t.allowed : t.notAllowed}
        </p>
      </div>
      <Button variant={allowed ? "outline" : "ink"} size="sm" onClick={() => setMapsConsent(!allowed)}>
        {allowed ? t.revoke : t.allow}
      </Button>
    </div>
  );
}
