import { fr, type Dictionary } from "./fr";
import { en } from "./en";
import type { Locale } from "./config";

export const dictionaries: Record<Locale, Dictionary> = { fr, en };
export const getDictionary = (locale: Locale) => dictionaries[locale];

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}

export type { Dictionary };
export * from "./config";
