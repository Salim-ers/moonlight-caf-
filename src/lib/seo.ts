import type { Metadata } from "next";
import { SITE_URL, siteConfig, fullAddress } from "@/data/site-config";
import { weeklyHours } from "@/data/opening-hours";
import { routes, type Locale, type RouteKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";

const OG_IMAGE = { url: "/og/moonlight-cafe-og.jpg", width: 1200, height: 630, alt: "Moonlight Café, Paris" };

/** Métadonnées complètes d'une page : title, description, canonical, hreflang, Open Graph, Twitter. */
export function pageMetadata(key: RouteKey | "notFound", locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  const page = t.pages[key];
  const isHome = key === "home";
  const base: Metadata = {
    title: isHome ? { absolute: page.title } : page.title,
    description: page.description,
  };
  if (key === "notFound") return { ...base, robots: { index: false, follow: true } };
  const path = routes[key][locale];
  return {
    ...base,
    alternates: {
      canonical: path,
      languages: {
        fr: routes[key].fr,
        en: routes[key].en,
        "x-default": routes[key].fr,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB"] : ["fr_FR"],
      url: path,
      title: isHome ? page.title : `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: isHome ? page.title : `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.siteTitle, template: `%s | ${siteConfig.name}` },
    description: t.siteDescription,
    applicationName: siteConfig.name,
    formatDetection: { telephone: false, address: false, email: false },
    robots: { index: true, follow: true },
    // Les icônes (favicon.ico, icon.png, apple-icon.png) sont détectées depuis src/app.
  };
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Données structurées CafeOrCoffeeShop — aucune note ni nombre d'avis n'est inventé. */
export function localBusinessJsonLd(locale: Locale) {
  const t = getDictionary(locale).meta;
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${SITE_URL}/#cafe`,
    name: siteConfig.name,
    url: `${SITE_URL}${routes.home[locale]}`,
    description: t.siteDescription,
    image: [`${SITE_URL}/og/moonlight-cafe-og.jpg`],
    logo: `${SITE_URL}/brand/logo-full.png`,
    email: siteConfig.email,
    servesCuisine: ["Coffee", "Matcha", "Tea", "Pastries"],
    priceRange: "€",
    currenciesAccepted: "EUR",
    hasMenu: `${SITE_URL}${routes.menu[locale]}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.city,
      addressRegion: "Île-de-France",
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.geo.lat,
      longitude: siteConfig.address.geo.lng,
    },
    openingHoursSpecification: weeklyHours
      .filter((d): d is { day: number; open: string; close: string } => !("closed" in d))
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayNames[d.day]}`,
        opens: d.open,
        closes: d.close,
      })),
    sameAs: [siteConfig.instagram.url],
    inLanguage: locale,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  };
}
