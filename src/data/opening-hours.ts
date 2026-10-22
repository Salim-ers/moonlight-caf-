/**
 * Horaires d'ouverture — modifiez uniquement ce fichier.
 * Les heures sont exprimées à l'heure de Paris (Europe/Paris), format "HH:MM".
 * Jours : 0 = dimanche, 1 = lundi … 6 = samedi.
 */

export const TIMEZONE = "Europe/Paris";

export type DayHours = { day: number; open: string; close: string } | { day: number; closed: true };

export const weeklyHours: DayHours[] = [
  { day: 1, open: "08:30", close: "17:30" },
  { day: 2, open: "08:30", close: "17:30" },
  { day: 3, open: "08:30", close: "17:30" },
  { day: 4, open: "08:30", close: "17:30" },
  { day: 5, open: "08:30", close: "17:30" },
  { day: 6, open: "09:30", close: "18:00" },
  { day: 0, open: "09:30", close: "18:00" },
];

/**
 * Fermetures ou horaires exceptionnels (jours fériés, congés…).
 * Rien n'est deviné automatiquement : ajoutez ici les dates confirmées par le café.
 * Exemple :
 *   { date: "2026-12-25", closed: true, note: { fr: "Fermé pour Noël", en: "Closed for Christmas" } },
 *   { date: "2026-12-31", open: "09:30", close: "15:00" },
 */
export type HoursException =
  { date: string; closed: true; note?: { fr: string; en: string } } | { date: string; open: string; close: string; note?: { fr: string; en: string } };

export const exceptions: HoursException[] = [];
