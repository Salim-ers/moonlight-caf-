"use client";

import { useEffect, useState } from "react";
import { getOpenState, formatTime, parisNow, type OpenState } from "@/lib/hours";
import { getDictionary, fill } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Statut « ouvert / fermé » calculé à l'heure de Paris (heure d'été comprise),
 * côté navigateur uniquement pour rester juste même sur une page mise en cache.
 * Les jours fériés ne sont pas devinés : voir `exceptions` dans data/opening-hours.ts.
 */
export function OpenStatus({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const [state, setState] = useState<OpenState | null>(null);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      setState(getOpenState());
      setToday(parisNow().day);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  let text = t.status.checking;
  if (state?.status === "open") text = fill(t.status.open, { time: formatTime(state.closesAt, locale) });
  else if (state?.status === "opens-later") text = fill(t.status.opensLater, { time: formatTime(state.opensAt, locale) });
  else if (state?.status === "closed") {
    const isTomorrow = today !== null && (today + 1) % 7 === state.nextDay;
    const day = isTomorrow ? t.status.tomorrow : t.days[state.nextDay].toLowerCase();
    text = fill(t.status.closed, { day, time: formatTime(state.opensAt, locale) });
  }

  const isOpen = state?.status === "open";
  return (
    <p className={`flex items-center gap-2.5 ${className}`} aria-live="polite">
      <span aria-hidden="true" className="relative flex h-2 w-2">
        {isOpen ? <span className="absolute inset-0 animate-ping rounded-full bg-matcha opacity-50 [animation-duration:2.4s]" /> : null}
        <span className={`relative h-2 w-2 rounded-full ${isOpen ? "bg-matcha" : state ? "bg-wood" : "bg-stone-deep"}`} />
      </span>
      <span>{text}</span>
    </p>
  );
}
