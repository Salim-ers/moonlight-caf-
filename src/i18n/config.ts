export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type RouteKey = "home" | "menu" | "favorites" | "cafe" | "story" | "visit" | "legal" | "privacy" | "cookies";

/** URLs localisées. Le français est servi sans préfixe, l'anglais sous /en. */
export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/en" },
  menu: { fr: "/la-carte", en: "/en/menu" },
  favorites: { fr: "/nos-favoris", en: "/en/favourites" },
  cafe: { fr: "/le-cafe", en: "/en/the-cafe" },
  story: { fr: "/notre-histoire", en: "/en/our-story" },
  visit: { fr: "/nous-trouver", en: "/en/find-us" },
  legal: { fr: "/mentions-legales", en: "/en/legal-notice" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
  cookies: { fr: "/cookies", en: "/en/cookies" },
};

export const href = (key: RouteKey, locale: Locale) => routes[key][locale];

export function routeKeyFromPath(pathname: string): RouteKey | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const [key, v] of Object.entries(routes) as [RouteKey, Record<Locale, string>][]) {
    if (v.fr === clean || v.en === clean) return key;
  }
  return null;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export type NavKey = Extract<RouteKey, "home" | "menu" | "favorites" | "cafe" | "story" | "visit">;
