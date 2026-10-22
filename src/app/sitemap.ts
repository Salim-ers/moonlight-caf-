import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site-config";
import { routes, type RouteKey } from "@/i18n/config";

const PRIORITY: Partial<Record<RouteKey, number>> = { home: 1, menu: 0.9, visit: 0.9, favorites: 0.8, cafe: 0.7, story: 0.7 };

/** Sitemap XML bilingue avec alternates hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-22");
  return (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    (["fr", "en"] as const).map((locale) => ({
      url: `${SITE_URL}${routes[key][locale] === "/" ? "" : routes[key][locale]}`,
      lastModified,
      changeFrequency: key === "menu" ? ("monthly" as const) : ("yearly" as const),
      priority: (PRIORITY[key] ?? 0.3) * (locale === "fr" ? 1 : 0.9),
      alternates: {
        languages: {
          fr: `${SITE_URL}${routes[key].fr === "/" ? "" : routes[key].fr}`,
          en: `${SITE_URL}${routes[key].en}`,
        },
      },
    })),
  );
}
