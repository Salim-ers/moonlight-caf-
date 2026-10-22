"use client";

import { useEffect, useState } from "react";
import { weeklyHours } from "@/data/opening-hours";
import { formatTime, parisNow } from "@/lib/hours";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Tableau des horaires, jour par jour, avec la ligne du jour (heure de Paris) mise en avant. */
export function HoursList({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setToday(parisNow().day);
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  const order = [1, 2, 3, 4, 5, 6, 0];

  return (
    <table className={`w-full border-collapse ${className}`}>
      <caption className="sr-only">{t.common.hours}</caption>
      <tbody>
        {order.map((d) => {
          const h = weeklyHours.find((x) => x.day === d);
          const isToday = today === d;
          return (
            <tr key={d} className={`border-b border-current/12 transition-colors ${isToday ? "font-semibold" : "opacity-80"}`}>
              <th scope="row" className="py-2.5 pr-4 text-left font-[inherit]">
                {t.days[d]}
                {isToday ? <span className="ml-2.5 rounded-full bg-ink px-2 py-0.5 text-[0.72rem] font-semibold text-ivory">{t.common.today}</span> : null}
              </th>
              <td className="py-2.5 text-right tabular-nums">{!h || "closed" in h ? "—" : `${formatTime(h.open, locale)} – ${formatTime(h.close, locale)}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
