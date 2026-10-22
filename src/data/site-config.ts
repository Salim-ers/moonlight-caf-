/**
 * Moonlight Café — configuration centrale.
 *
 * Toutes les informations pratiques du café sont ici : modifiez ce fichier
 * pour changer l'e-mail, les réseaux sociaux, l'adresse ou les données légales.
 * Les composants lisent ces valeurs, aucun texte n'est à chercher ailleurs.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://moonlight-cafe.vercel.app").replace(/\/$/, "");

export const siteConfig = {
  name: "Moonlight Café",
  shortName: "Moonlight",
  email: "moonlightcafeparis@gmail.com",
  instagram: {
    handle: "@moonlight.cafe.paris",
    url: "https://www.instagram.com/moonlight.cafe.paris/",
  },
  address: {
    street: "27 Rue des Gravilliers",
    postalCode: "75003",
    city: "Paris",
    country: "FR",
    district: { fr: "Haut-Marais, Paris 3e", en: "Upper Marais, Paris 3rd" },
    /** Coordonnées approximatives de la façade — à confirmer sur Google Maps avant mise en ligne. */
    geo: { lat: 48.86418, lng: 2.35512 },
    metro: {
      fr: "Métro Arts et Métiers (lignes 3 et 11)",
      en: "Arts et Métiers metro (lines 3 & 11)",
    },
  },
  /** Faits vérifiés par au moins deux sources publiques (voir README > Sources). */
  facts: {
    openingMonth: "2024-07",
    coffeeRoaster: "Fève",
    matchaOrigin: { fr: "Uji, Japon", en: "Uji, Japan" },
  },
  /**
   * Nom de la fondatrice : mentionné par la presse (Zoom Japon, 2025) mais à
   * faire confirmer par le propriétaire. Laisser `null` tant que l'accord n'est pas obtenu.
   */
  founderName: null as string | null,
  /** Crédit de réalisation affiché dans le pied de page (laisser null pour masquer). */
  credit: null as { label: string; url?: string } | null,
} as const;

export const mapsLinks = {
  place: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Moonlight Café, 27 Rue des Gravilliers, 75003 Paris")}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Moonlight Café, 27 Rue des Gravilliers, 75003 Paris")}`,
  embed: `https://www.google.com/maps?q=${encodeURIComponent("Moonlight Café, 27 Rue des Gravilliers, 75003 Paris")}&z=17&output=embed`,
};

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`;

/**
 * Informations juridiques — À VALIDER AVEC LE PROPRIÉTAIRE AVANT PUBLICATION.
 * Les registres publics associent plusieurs sociétés au nom « Moonlight » ;
 * aucune n'est publiée tant que l'exploitant n'a pas confirmé ses données.
 * Toute valeur `null` s'affiche comme « à compléter » sur les pages juridiques.
 */
export const legalConfig = {
  validated: false,
  publisher: {
    companyName: null as string | null,
    legalForm: null as string | null,
    shareCapital: null as string | null,
    siren: null as string | null,
    siret: null as string | null,
    rcs: null as string | null,
    vatNumber: null as string | null,
    registeredOffice: null as string | null,
    publicationDirector: null as string | null,
    email: "moonlightcafeparis@gmail.com",
    phone: null as string | null,
  },
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
    /** Adresse reprise des mentions publiques de Vercel — à vérifier au moment de la mise en ligne. */
    toVerify: true,
  },
  lastUpdate: "2026-10-22",
};
