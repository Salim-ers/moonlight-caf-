/**
 * « Nos favoris » — sélection éditoriale (pas un classement des ventes).
 * Réordonnez le tableau pour changer l'ordre d'affichage sur l'accueil et sur /nos-favoris.
 * Les prix viennent automatiquement de `menu-data.ts`.
 */
type L = { fr: string; en: string };

export type Favorite = {
  itemId: string;
  line: L;
  /** Texte plus long pour la page lookbook. */
  story: L;
  /** Teinte d'accent de la carte quand aucune photo fiable n'existe. */
  tone?: "matcha" | "moon" | "wood";
};

export const favorites: Favorite[] = [
  {
    itemId: "iced-strawberry-matcha-latte",
    line: { fr: "Fraise, lait, matcha : trois couches à mélanger à la paille.", en: "Strawberry, milk, matcha: three layers to stir with your straw." },
    story: {
      fr: "Celle qu'on regarde avant de la goûter. Trois couches nettes, puis un tour de paille pour obtenir un rose tendre.",
      en: "The one you look at before you taste it. Three clean layers, then a stir of the straw for a soft pink.",
    },
  },
  {
    itemId: "matcha-latte",
    line: { fr: "Matcha de cérémonie d'Uji, mousse fine et latte art.", en: "Ceremonial matcha from Uji, fine foam and latte art." },
    story: {
      fr: "Le classique de Moonlight. Un matcha tamisé puis fouetté, allongé d'un lait chaud et terminé par un dessin à la surface.",
      en: "The Moonlight classic. Matcha sifted then whisked, topped with warm milk and finished with a pattern on the surface.",
    },
  },
  {
    itemId: "cookie",
    line: { fr: "Croustillant au bord, fondant à cœur. Quatre parfums.", en: "Crisp at the edge, soft in the middle. Four flavours." },
    story: {
      fr: "Matcha chocolat blanc, pépites chocolat noir, pécan choco coco ou beurre de cacahuète et cacao : de grands cookies à partager, ou pas.",
      en: "Matcha & white chocolate, dark chocolate chip, pecan choc coconut or peanut butter & cocoa: big cookies to share, or not.",
    },
  },
  {
    itemId: "iced-matcha-latte",
    line: { fr: "Le vert profond du matcha versé sur un lait bien froid.", en: "Deep green matcha poured over ice-cold milk." },
    story: {
      fr: "Pour les jours où le Marais se réchauffe. Le matcha se pose sur le lait, puis descend lentement dans le gobelet.",
      en: "For warm days in the Marais. The matcha settles on the milk, then slowly sinks through the cup.",
    },
  },
  {
    itemId: "blue-latte",
    line: { fr: "Un bleu franc dans la tasse, sans une goutte de café.", en: "A bold blue cup, without a drop of coffee." },
    story: {
      fr: "La couleur surprend, la douceur rassure. Une boisson lactée servie chaude, avec son latte art.",
      en: "The colour surprises, the softness reassures. A milky drink served hot, with its own latte art.",
    },
  },
  {
    itemId: "iced-mango-matcha-latte",
    tone: "wood",
    line: { fr: "La mangue rencontre le matcha, sur glace.", en: "Mango meets matcha, over ice." },
    story: {
      fr: "La version fruitée du matcha glacé, à découvrir au comptoir.",
      en: "The fruity take on iced matcha, waiting for you at the counter.",
    },
  },
];
