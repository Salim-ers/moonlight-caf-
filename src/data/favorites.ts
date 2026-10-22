/**
 * « Nos favoris » — sélection éditoriale (pas un classement des ventes).
 * L'ordre du tableau = l'ordre d'affichage ; la numérotation « 01 / 06 » est calculée automatiquement.
 * Les prix viennent de `menu-data.ts`. Une photo n'est associée que si elle montre réellement le produit ;
 * sinon la création est présentée par une composition typographique.
 */
import type { PhotoId } from "./photo-manifest";
import type { Tone } from "@/lib/tones";
import type { DrinkKind } from "@/components/ui/DrinkArt";

type L = { fr: string; en: string };

export type Favorite = {
  itemId: string;
  photo?: PhotoId;
  /** Recadrage propre à cet emplacement. */
  focus?: string;
  tone: Tone;
  /** Illustration abstraite utilisée sur l'accueil (couleurs de la boisson, de haut en bas). */
  art: { kind: DrinkKind; colors: string[] };
  line: L;
  story: L;
  /** Quelques mots-clés affichés en étiquettes (uniquement des informations connues). */
  notes: { fr: string[]; en: string[] };
};

export const favorites: Favorite[] = [
  {
    itemId: "iced-strawberry-matcha-latte",
    photo: "p19",
    focus: "38% 55%",
    tone: "pink",
    art: { kind: "layered", colors: ["var(--color-matcha)", "var(--color-ivory)", "var(--color-pink-deep)"] },
    line: { fr: "Fraise, lait, matcha : trois couches à mélanger à la paille.", en: "Strawberry, milk, matcha: three layers to stir with your straw." },
    story: {
      fr: "Celle qu'on regarde avant de la goûter. Trois couches nettes, puis un tour de paille pour obtenir un rose tendre.",
      en: "The one you look at before you taste it. Three clean layers, then a stir of the straw for a soft pink.",
    },
    notes: { fr: ["Fraise", "Lait", "Matcha", "Sur glace"], en: ["Strawberry", "Milk", "Matcha", "Over ice"] },
  },
  {
    itemId: "matcha-latte",
    photo: "p20",
    focus: "42% 30%",
    tone: "matcha",
    art: { kind: "latte", colors: ["var(--color-matcha)"] },
    line: { fr: "Matcha bio de cérémonie, mousse fine et latte art.", en: "Organic ceremonial matcha, fine foam and latte art." },
    story: {
      fr: "Le classique de Moonlight. Un matcha tamisé puis fouetté, allongé d'un lait chaud et terminé par un dessin à la surface. Ici avec un cookie, parce que ça va bien ensemble.",
      en: "The Moonlight classic. Matcha sifted then whisked, topped with warm milk and finished with a pattern on the surface. Pictured with a cookie, because they go well together.",
    },
    notes: { fr: ["Matcha bio", "Lait chaud", "Latte art"], en: ["Organic matcha", "Warm milk", "Latte art"] },
  },
  {
    itemId: "cookie",
    photo: "p12",
    tone: "caramel",
    art: { kind: "cookie", colors: ["var(--color-caramel)", "var(--color-matcha)"] },
    line: { fr: "Croustillant au bord, fondant à cœur. Quatre parfums.", en: "Crisp at the edge, soft in the middle. Four flavours." },
    story: {
      fr: "De grands cookies faits maison, épais et généreux, à partager ou pas. Quatre parfums à la carte.",
      en: "Big homemade cookies, thick and generous, to share or not. Four flavours on the menu.",
    },
    notes: {
      fr: ["Matcha chocolat blanc", "Pépites chocolat noir", "Pécan choco coco", "Beurre de cacahuète et cacao"],
      en: ["Matcha & white chocolate", "Dark chocolate chip", "Pecan choc coconut", "Peanut butter & cocoa"],
    },
  },
  {
    itemId: "blue-latte",
    photo: "p10",
    focus: "48% 50%",
    tone: "blue",
    art: { kind: "latte", colors: ["var(--color-blue)"] },
    line: { fr: "Un bleu franc dans la tasse, sans une goutte de café.", en: "A bold blue cup, without a drop of coffee." },
    story: {
      fr: "La couleur surprend, la douceur rassure. Une boisson lactée servie chaude, avec son latte art — ici à côté d'un latte vert.",
      en: "The colour surprises, the softness reassures. A milky drink served hot, with its own latte art — pictured next to a green latte.",
    },
    notes: { fr: ["Sans café", "Servi chaud", "Latte art"], en: ["Coffee-free", "Served hot", "Latte art"] },
  },
  {
    itemId: "iced-matcha-latte",
    photo: "p25",
    tone: "lavender",
    art: { kind: "iced-cup", colors: ["var(--color-matcha-deep)", "var(--color-matcha)", "var(--color-matcha-soft)"] },
    line: { fr: "Le vert profond du matcha versé sur un lait bien froid.", en: "Deep green matcha poured over ice-cold milk." },
    story: {
      fr: "Pour les jours où le Marais se réchauffe. Le matcha se pose sur le lait, puis descend lentement dans le gobelet.",
      en: "For warm days in the Marais. The matcha settles on the milk, then slowly sinks through the cup.",
    },
    notes: { fr: ["Matcha bio", "Lait", "Sur glace"], en: ["Organic matcha", "Milk", "Over ice"] },
  },
  {
    itemId: "iced-mango-matcha-latte",
    tone: "butter",
    art: { kind: "layered", colors: ["var(--color-matcha)", "var(--color-ivory)", "#e9ae3f"] },
    line: { fr: "La mangue rencontre le matcha, sur glace.", en: "Mango meets matcha, over ice." },
    story: {
      fr: "La version fruitée du matcha glacé. Pas encore de photo : elle vous attend au comptoir.",
      en: "The fruity take on iced matcha. No photo yet: it's waiting for you at the counter.",
    },
    notes: { fr: ["Mangue", "Matcha", "Sur glace"], en: ["Mango", "Matcha", "Over ice"] },
  },
];
