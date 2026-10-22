import { TIMEZONE, weeklyHours, exceptions, type DayHours } from "@/data/opening-hours";
import type { Locale } from "@/i18n/config";

/** Date/heure courante à Paris, quel que soit le fuseau du visiteur (gère l'heure d'été). */
export function parisNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    isoDate: `${get("year")}-${get("month")}-${get("day")}`,
    day: weekdayMap[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function formatTime(hhmm: string, locale: Locale) {
  const [h, m] = hhmm.split(":");
  if (locale === "fr") return `${Number(h)}h${m}`;
  const hour = Number(h);
  const suffix = hour >= 12 ? "pm" : "am";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return m === "00" ? `${h12}${suffix}` : `${h12}:${m}${suffix}`;
}

export function hoursForDay(day: number): DayHours | undefined {
  return weeklyHours.find((d) => d.day === day);
}

function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function hoursFor(isoDate: string, day: number) {
  const ex = exceptions.find((e) => e.date === isoDate);
  if (ex) return "closed" in ex ? null : { open: ex.open, close: ex.close };
  const h = hoursForDay(day);
  if (!h || "closed" in h) return null;
  return { open: h.open, close: h.close };
}

export type OpenState =
  { status: "open"; closesAt: string } | { status: "opens-later"; opensAt: string } | { status: "closed"; nextDay: number; opensAt: string };

/** Calcule l'état d'ouverture à partir de l'heure de Paris et des exceptions configurées. */
export function getOpenState(date = new Date()): OpenState {
  const now = parisNow(date);
  const today = hoursFor(now.isoDate, now.day);
  if (today) {
    if (now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
      return { status: "open", closesAt: today.close };
    }
    if (now.minutes < toMinutes(today.open)) return { status: "opens-later", opensAt: today.open };
  }
  for (let i = 1; i <= 14; i++) {
    const day = (now.day + i) % 7;
    const h = hoursFor(addDays(now.isoDate, i), day);
    if (h) return { status: "closed", nextDay: day, opensAt: h.open };
  }
  return { status: "closed", nextDay: now.day, opensAt: "08:30" };
}

/** Regroupe les jours aux horaires identiques : « Lundi – Vendredi 8h30–17h30 ». */
export function groupedHours() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups: { days: number[]; open?: string; close?: string; closed?: boolean }[] = [];
  for (const d of order) {
    const h = hoursForDay(d);
    const key = !h || "closed" in h ? "closed" : `${h.open}-${h.close}`;
    const last = groups[groups.length - 1];
    const lastKey = last ? (last.closed ? "closed" : `${last.open}-${last.close}`) : null;
    if (last && lastKey === key) last.days.push(d);
    else groups.push(!h || "closed" in h ? { days: [d], closed: true } : { days: [d], open: h.open, close: h.close });
  }
  return groups;
}
