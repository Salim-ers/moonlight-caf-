/**
 * La carte du Moonlight Café — source unique des produits et des prix.
 *
 * - Prix en euros (nombre décimal). Modifiez-les ici, toutes les pages suivent.
 * - Pour ajouter une boisson : copiez une ligne dans la bonne catégorie.
 * - `note` sert aux précisions écrites sur la carte (variantes, composition).
 * - `tone` : couleur d'accent de la catégorie sur la page « La carte ».
 *
 * Données transcrites depuis la carte fournie (octobre 2026). Les descriptions
 * de parfums des thés n'ont pas été reprises faute de visuel lisible : à compléter
 * après relecture de la carte physique.
 * Aucune photo n'est rattachée aux produits : chaque photographie n'a qu'un seul
 * emplacement sur le site (voir `photo-manifest.ts`).
 */
import type { Tone } from "@/lib/tones";

type L = { fr: string; en: string };

export type MenuItem = {
  id: string;
  name: L;
  price: number;
  note?: L;
  /** Variantes listées une à une (parfums de cookies…). */
  variants?: { fr: string[]; en: string[] };
};

export type MenuCategory = {
  id: string;
  title: L;
  subtitle?: L;
  tone: Tone;
  items: MenuItem[];
};

const same = (s: string): L => ({ fr: s, en: s });

export const menu: MenuCategory[] = [
  {
    id: "classiques",
    title: { fr: "Classiques", en: "Classics" },
    subtitle: { fr: "Café de spécialité torréfié par Fève", en: "Specialty coffee roasted by Fève" },
    tone: "caramel",
    items: [
      { id: "espresso", name: same("Espresso"), price: 2.5 },
      { id: "double-espresso", name: same("Double Espresso"), price: 3.5 },
      { id: "long-black", name: same("Long Black"), price: 3.5 },
      { id: "cortado", name: same("Cortado"), price: 4 },
      { id: "cappuccino", name: same("Cappuccino"), price: 5 },
      { id: "latte", name: same("Latte"), price: 5 },
      { id: "flat-white", name: same("Flat White"), price: 5.5 },
      { id: "filtre", name: { fr: "Filtre", en: "Filter coffee" }, price: 4.5 },
      { id: "iced-americano", name: same("Iced Americano"), price: 4.5 },
      { id: "iced-latte", name: same("Iced Latte"), price: 6 },
      { id: "cold-brew", name: same("Cold Brew"), price: 6 },
    ],
  },
  {
    id: "matcha",
    title: { fr: "Matcha", en: "Matcha" },
    subtitle: {
      fr: "Matcha bio de cérémonie d'Uji, tamisé et fouetté à la commande",
      en: "Organic ceremonial matcha from Uji, sifted and whisked to order",
    },
    tone: "matcha",
    items: [
      { id: "matcha-latte", name: same("Matcha Latte"), price: 5.5 },
      { id: "iced-matcha-latte", name: same("Iced Matcha Latte"), price: 6 },
      {
        id: "usucha",
        name: same("Usucha"),
        note: { fr: "Matcha à l'eau", en: "Matcha whisked with water" },
        price: 5,
      },
      { id: "iced-mango-matcha-latte", name: same("Iced Mango Matcha Latte"), price: 6.8 },
      { id: "iced-strawberry-matcha-latte", name: same("Iced Strawberry Matcha Latte"), price: 6.8 },
    ],
  },
  {
    id: "sans-cafe",
    title: { fr: "Sans café", en: "Not coffee" },
    subtitle: { fr: "Sans une goutte de café", en: "Without a drop of coffee" },
    tone: "lavender",
    items: [
      { id: "hojicha-latte", name: same("Hojicha Latte"), price: 5.5 },
      { id: "chai-latte", name: same("Chai Latte"), price: 5.5 },
      { id: "sesame-latte", name: { fr: "Sésame Latte", en: "Sesame Latte" }, price: 5.5 },
      { id: "blue-latte", name: same("Blue Latte"), price: 5.5 },
      { id: "chocolat-chaud", name: { fr: "Chocolat chaud", en: "Hot chocolate" }, price: 5 },
    ],
  },
  {
    id: "thes-bio",
    title: { fr: "Thés bio", en: "Organic teas" },
    tone: "butter",
    items: [
      { id: "blanc-yunnan", name: { fr: "Blanc Yunan", en: "Yunan white tea" }, price: 5 },
      { id: "vert-genmaicha", name: { fr: "Vert Genmaicha", en: "Genmaicha green tea" }, price: 5 },
      { id: "noir-rukeri", name: { fr: "Noir Rukeri", en: "Rukeri black tea" }, price: 5 },
      {
        id: "honeybush",
        name: same("Honeybush"),
        note: { fr: "Rooibos", en: "Rooibos" },
        price: 5,
      },
    ],
  },
  {
    id: "boissons-fraiches",
    title: { fr: "Boissons fraîches", en: "Soft drinks" },
    tone: "blue",
    items: [
      { id: "limonade-bio", name: { fr: "Limonade bio", en: "Organic lemonade" }, price: 5.5 },
      { id: "the-glace-bio", name: { fr: "Thés glacés bio", en: "Organic iced teas" }, price: 5.5 },
      { id: "jus-de-fruits", name: { fr: "Jus de fruits", en: "Fruit juice" }, price: 5.5 },
      { id: "eau-plate", name: { fr: "Eau plate", en: "Still water" }, price: 3 },
      { id: "eau-gazeuse", name: { fr: "Eau gazeuse", en: "Sparkling water" }, price: 3.5 },
    ],
  },
  {
    id: "patisseries",
    title: { fr: "Pâtisseries", en: "Pastries" },
    subtitle: { fr: "Faites maison", en: "Homemade" },
    tone: "pink",
    items: [
      { id: "cake", name: same("Cake"), price: 4.5 },
      {
        id: "cookie",
        name: same("Cookie"),
        price: 4.5,
        variants: {
          fr: ["Matcha chocolat blanc", "Pépites chocolat noir", "Pécan choco coco", "Beurre de cacahuète et cacao"],
          en: ["Matcha & white chocolate", "Dark chocolate chip", "Pecan choc coconut", "Peanut butter & cocoa"],
        },
      },
      {
        id: "granola-bowl",
        name: same("Granola Bowl"),
        price: 6,
        note: {
          fr: "Granola, fromage blanc et coulis de fraise",
          en: "Granola, fromage blanc and strawberry coulis",
        },
      },
    ],
  },
];

/** Suppléments affichés sur la carte — ne s'appliquent pas forcément à toutes les boissons. */
export const extras: { id: string; name: L; price: number }[] = [
  { id: "extra-shot", name: { fr: "Extra shot", en: "Extra shot" }, price: 1 },
  { id: "grand-format", name: { fr: "Grand format", en: "Large size" }, price: 1 },
  { id: "lait-vegetal", name: { fr: "Lait avoine, soja ou coco", en: "Oat, soy or coconut milk" }, price: 0.5 },
  { id: "iced", name: { fr: "Version glacée", en: "Iced" }, price: 0.5 },
  { id: "sirop", name: { fr: "Sirop aromatisé", en: "Flavoured syrup" }, price: 0.5 },
];

export function formatPrice(price: number, locale: "fr" | "en", sign = false) {
  const s = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);
  return sign ? `+${s}` : s;
}

export function findItem(id: string) {
  for (const c of menu) {
    const it = c.items.find((i) => i.id === id);
    if (it) return { ...it, category: c };
  }
  throw new Error(`Menu item not found: ${id}`);
}

export const menuItemCount = menu.reduce((n, c) => n + c.items.length, 0);
