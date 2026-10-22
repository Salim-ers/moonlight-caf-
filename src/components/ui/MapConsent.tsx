"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getMapsConsent, setMapsConsent, onConsentChange } from "@/lib/consent";
import { mapsLinks } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Plan Google Maps chargé uniquement après accord explicite.
 * Avant accord : aucune requête vers Google, seulement un plan stylisé dessiné en CSS et un lien externe.
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
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] bg-blue-soft sm:aspect-[4/3]">
      {allowed ? (
        <iframe
          title={t.visitPage.map.iframeTitle}
          src={mapsLinks.embed}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          {/* plan stylisé : rues en diagonale, sans aucune donnée tierce */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 47%, rgb(255 249 240 / 0.9) 47% 53%, transparent 53%), linear-gradient(25deg, transparent 30%, rgb(255 249 240 / 0.75) 30% 33%, transparent 33%), linear-gradient(25deg, transparent 66%, rgb(255 249 240 / 0.75) 66% 69%, transparent 69%), linear-gradient(rgb(114 157 214 / 0.18) 1px, transparent 1px), linear-gradient(90deg, rgb(114 157 214 / 0.18) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 100% 100%, 100% 100%, 28px 28px, 28px 28px",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center sm:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory shadow-lg">
              <MapPin className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="max-w-sm text-[0.95rem] text-ink">{t.visitPage.map.consentText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" className="btn btn-sm" onClick={() => setMapsConsent(true)}>
                {t.visitPage.map.load}
              </button>
              <a
                href={mapsLinks.place}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-light"
                aria-label={`${t.common.openInMaps} ${t.a11y.newTab}`}
              >
                {t.common.openInMaps}
              </a>
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
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] bg-butter px-6 py-5">
      <div>
        <p className="font-semibold">{t.mapsState}</p>
        <p className="t-small text-ink-soft" aria-live="polite">
          {allowed ? t.allowed : t.notAllowed}
        </p>
      </div>
      <button type="button" className={`btn btn-sm ${allowed ? "btn-outline" : ""}`} onClick={() => setMapsConsent(!allowed)}>
        {allowed ? t.revoke : t.allow}
      </button>
    </div>
  );
}
