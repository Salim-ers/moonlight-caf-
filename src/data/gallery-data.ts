/**
 * Photothèque du Moonlight Café.
 *
 * Pour remplacer une photo : déposez le nouveau fichier dans `src/assets/photos/`
 * (JPG/PNG/WebP, 1600 px de large minimum conseillé) puis modifiez l'import ci-dessous.
 * Next.js génère automatiquement les tailles AVIF/WebP et le flou de chargement.
 * Les originaux non retouchés sont conservés dans `assets/originals/`.
 */
import type { StaticImageData } from "next/image";

import p01 from "@/assets/photos/01-etageres-objets-plantes.jpg";
import p02 from "@/assets/photos/02-preparation-boisson-violette.jpg";
import p03 from "@/assets/photos/03-matcha-latte-art-vue-dessus.jpg";
import p04 from "@/assets/photos/04-table-ronde-matcha.jpg";
import p05 from "@/assets/photos/05-versement-matcha-geste-barista.jpg";
import p06 from "@/assets/photos/06-matcha-rose-et-vert-en-couches.jpg";
import p07 from "@/assets/photos/07-salle-bancs-bois.jpg";
import p08 from "@/assets/photos/08-facade-comptoir.jpg";
import p09 from "@/assets/photos/09-boissons-colorees-patisseries.jpg";
import p10 from "@/assets/photos/10-latte-art-vert-et-bleu.jpg";
import p11 from "@/assets/photos/11-presentoir-cookies.jpg";
import p12 from "@/assets/photos/12-cookies-matcha-gros-plan.jpg";
import p13 from "@/assets/photos/13-latte-art-vue-dessus.jpg";
import p14 from "@/assets/photos/14-viennoiserie-feuilletee.jpg";
import p15 from "@/assets/photos/15-trois-boissons-vue-dessus.jpg";
import p16 from "@/assets/photos/16-table-ronde-boissons-gateaux.jpg";
import p17 from "@/assets/photos/17-matcha-glace-sachet-cafe.jpg";
import p18 from "@/assets/photos/18-latte-et-cake.jpg";
import p19 from "@/assets/photos/19-iced-strawberry-matcha.jpg";
import p20 from "@/assets/photos/20-cookie-et-matcha-latte.jpg";
import p21 from "@/assets/photos/21-lettrage-mural.jpg";
import p22 from "@/assets/photos/22-salle-vue-large.jpg";
import p23 from "@/assets/photos/23-facade-gobelet-moonlight.jpg";
import p24 from "@/assets/photos/24-barista-boisson-glacee.jpg";
import p25 from "@/assets/photos/25-matcha-glace-gobelet.jpg";
import p26 from "@/assets/photos/26-matcha-glace-poire.jpg";

export type PhotoCategory = "lieu" | "gestes" | "table" | "patisserie";

export type Photo = {
  id: string;
  src: StaticImageData;
  alt: { fr: string; en: string };
  category: PhotoCategory;
  /** Point focal pour les recadrages responsive (object-position). */
  focus: string;
};

const photo = (id: string, src: StaticImageData, category: PhotoCategory, focus: string, fr: string, en: string): Photo => ({
  id,
  src,
  category,
  focus,
  alt: { fr, en },
});

export const photos = {
  shelves: photo("01", p01, "lieu", "50% 40%", "Étagères blanches garnies de tasses, d'objets autour du thé et du café et de plantes vertes", "White shelves with cups, tea and coffee objects and green plants"),
  purplePour: photo("02", p02, "gestes", "38% 55%", "Un barista verse du lait dans une boisson violette glacée, sur le comptoir en bois", "A barista pours milk into an iced purple drink on the wooden counter"),
  matchaTop: photo("03", p03, "table", "58% 45%", "Matcha latte avec latte art vu du dessus, posé sur un carnet bleu près d'un cookie au matcha", "Matcha latte with latte art seen from above, on a blue notebook beside a matcha cookie"),
  roundTable: photo("04", p04, "lieu", "50% 55%", "Table ronde en bois devant une banquette, avec un matcha glacé et une pâtisserie", "Round wooden table in front of a bench, with an iced matcha and a pastry"),
  matchaPour: photo("05", p05, "gestes", "55% 50%", "Geste de barista : un matcha mousseux versé sur une boisson glacée ambrée", "Barista gesture: frothy matcha poured over an amber iced drink"),
  layered: photo("06", p06, "gestes", "60% 55%", "Matcha versé sur un lait rose, formant des couches verte, blanche et rose", "Matcha poured over pink milk, forming green, white and pink layers"),
  benches: photo("07", p07, "lieu", "45% 60%", "Salle du café : longues banquettes, tabourets et tables rondes en bois clair", "The café room: long benches, stools and round light-wood tables"),
  facade: photo("08", p08, "lieu", "50% 45%", "Façade du Moonlight Café avec son lettrage, la vitrine et un banc en bois garni de boissons", "Moonlight Café shopfront with its lettering, the window and a wooden bench set with drinks"),
  colorful: photo("09", p09, "table", "50% 50%", "Table garnie de boissons colorées, cappuccino saupoudré de cacao, cookies et brioche", "Table set with colourful drinks, a cocoa-dusted cappuccino, cookies and a bun"),
  greenBlue: photo("10", p10, "table", "40% 50%", "Deux tasses vues du dessus, un latte vert et un latte bleu, sur une table en bois", "Two cups seen from above, a green latte and a blue latte, on a wooden table"),
  cookieDisplay: photo("11", p11, "patisserie", "55% 55%", "Présentoir en bois garni de cookies près de la vitrine", "Wooden display of cookies by the window"),
  cookiesClose: photo("12", p12, "patisserie", "55% 55%", "Gros plan sur des cookies au matcha et aux pépites de chocolat", "Close-up of matcha and chocolate chip cookies"),
  latteTop: photo("13", p13, "table", "48% 50%", "Café au lait avec latte art en forme de feuille, vu du dessus", "Milk coffee with leaf latte art, seen from above"),
  pastry: photo("14", p14, "patisserie", "50% 50%", "Viennoiserie feuilletée à la cannelle coupée en deux sur une assiette en métal", "Flaky cinnamon pastry cut in half on a metal plate"),
  threeCups: photo("15", p15, "table", "55% 45%", "Mains tenant un café au lait entre un latte bleu et un latte vert", "Hands holding a milk coffee between a blue latte and a green latte"),
  roundSpread: photo("16", p16, "table", "62% 50%", "Table ronde vue du dessus avec boissons, cookies et gâteaux", "Round table from above with drinks, cookies and cakes"),
  icedWindow: photo("17", p17, "table", "40% 55%", "Matcha glacé à côté d'un sachet de café Moonlight, près de la vitrine", "Iced matcha next to a Moonlight coffee bag, by the window"),
  latteCake: photo("18", p18, "patisserie", "45% 50%", "Café au lait dans un verre avec latte art, à côté d'une part de cake sur un plateau en bois", "Milk coffee in a glass with latte art, next to a slice of cake on a wooden tray"),
  strawberry: photo("19", p19, "table", "45% 50%", "Iced Strawberry Matcha Latte en trois couches entouré de framboises", "Iced Strawberry Matcha Latte in three layers surrounded by raspberries"),
  cookieMatcha: photo("20", p20, "patisserie", "40% 60%", "Cookie au chocolat cassé en deux, avec un matcha latte en arrière-plan", "Chocolate cookie broken in half, with a matcha latte behind"),
  lettering: photo("21", p21, "lieu", "50% 40%", "Lettrage manuscrit « Moonlight café » sur le mur blanc, au-dessus des gobelets", "Hand-drawn “Moonlight café” lettering on the white wall above stacked cups"),
  roomWide: photo("22", p22, "lieu", "50% 55%", "Vue large de la salle : tissus de lin suspendus, tables rondes et tabourets en bois", "Wide view of the room: hanging linen, round tables and wooden stools"),
  facadeCup: photo("23", p23, "lieu", "30% 55%", "Gobelet de matcha glacé Moonlight tenu devant la façade et l'enseigne illustrée", "A Moonlight iced matcha cup held up in front of the shopfront and its illustrated sign"),
  baristaIced: photo("24", p24, "gestes", "50% 50%", "Un barista verse un matcha sur une boisson glacée dans un gobelet Moonlight", "A barista pours matcha over an iced drink in a Moonlight cup"),
  icedCup: photo("25", p25, "table", "50% 55%", "Matcha glacé dans un gobelet Moonlight sur une table en bois baignée de lumière", "Iced matcha in a Moonlight cup on a sunlit wooden table"),
  pear: photo("26", p26, "table", "45% 55%", "Boisson glacée au matcha à côté d'une poire, sur une table en bois", "Iced matcha drink beside a pear on a wooden table"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/** Ordre de la galerie de la page « Le café ». Réordonnez librement. */
export const galleryOrder: PhotoKey[] = [
  "roomWide",
  "matchaTop",
  "baristaIced",
  "lettering",
  "cookieDisplay",
  "benches",
  "layered",
  "greenBlue",
  "shelves",
  "facade",
  "matchaPour",
  "roundSpread",
  "latteCake",
  "facadeCup",
  "purplePour",
  "pastry",
  "roundTable",
  "colorful",
  "icedCup",
  "cookiesClose",
  "threeCups",
  "icedWindow",
  "pear",
  "latteTop",
  "cookieMatcha",
  "strawberry",
];

/** Sélection éditoriale de la grille « Instagram » de l'accueil (photos fournies, pas un flux en direct). */
export const socialGrid: PhotoKey[] = ["purplePour", "roundSpread", "pear", "threeCups", "colorful", "icedWindow", "latteTop"];
