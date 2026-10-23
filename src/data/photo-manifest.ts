/**
 * Registre central des 27 photographies du Moonlight Café.
 *
 * Règle : une photographie n'apparaît qu'à UN SEUL emplacement éditorial sur tout le site
 * (les versions FR et EN d'une même page partagent leurs images, la visionneuse qui agrandit
 * une vignette n'est pas un second emplacement). `scripts/check-photos.mjs` vérifie à chaque
 * build que chaque identifiant n'est utilisé qu'une fois, dans le fichier déclaré par `usedIn`,
 * et qu'aucun fichier n'est un doublon d'un autre (empreinte + hachage perceptuel).
 *
 * Numérotation = ordre des 26 images du ZIP original « Moonlight  café.zip »
 * (vérifiée par empreinte MD5 : 01 = « …13_51_33-1.png » … 26 = « …13_59_12-10.png »).
 * 27 = photo de l'Iced Mango Matcha Latte, envoyée séparément le 23 octobre 2026.
 * 07 et 22 (salle, affichées en très grand) : agrandies ×4 par IA (Real-ESRGAN x4plus) puis
 * ramenées à 3840 px, pour rester nettes en plein écran et sur les écrans 4K.
 *
 * Pour remplacer une photo : déposez le fichier dans `src/assets/photos/`, modifiez l'import
 * et l'entrée correspondante. Lancez ensuite `npm run images` (AVIF/WebP/JPEG, toutes tailles).
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
import p27 from "@/assets/photos/27-iced-mango-matcha-latte.jpg";

export type PhotoPage = "home" | "favorites" | "menu" | "cafe" | "story" | "visit";

export type PhotoEntry = {
  /** Identifiant stable, utilisé une seule fois dans le code. */
  id: string;
  /** Nom du fichier dans le ZIP original fourni par le café. */
  source: string;
  /** Fichier optimisé servi par le site (`npm run images` en dérive AVIF/WebP/JPEG). */
  file: string;
  src: StaticImageData;
  width: number;
  height: number;
  page: PhotoPage;
  section: string;
  /** Seul fichier autorisé à référencer l'identifiant. */
  usedIn: string;
  description: string;
  alt: { fr: string; en: string };
  /** Point focal pour les recadrages responsive (object-position). */
  focus: string;
  status: "used" | "unused";
};

const photo = (e: Omit<PhotoEntry, "width" | "height">): PhotoEntry => ({ ...e, width: e.src.width, height: e.src.height });

export const photoManifest = {
  p01: photo({
    id: "p01",
    source: "Image ChatGPT 22 oct. 2026, 13_51_33-1.png",
    file: "01-etageres-objets-plantes.jpg",
    src: p01,
    page: "cafe",
    section: "Le café — Sur les étagères",
    usedIn: "src/components/pages/CafePage.tsx",
    description: "Étagères blanches : tasses, bols, accessoires et plantes.",
    alt: {
      fr: "Étagères blanches garnies de tasses, de bols, d'accessoires pour le café et le matcha et de plantes vertes",
      en: "White shelves with cups, bowls, coffee and matcha accessories and green plants",
    },
    focus: "50% 45%",
    status: "used",
  }),
  p02: photo({
    id: "p02",
    source: "Image ChatGPT 22 oct. 2026, 13_51_33-2.png",
    file: "02-preparation-boisson-violette.jpg",
    src: p02,
    page: "home",
    section: "Accueil — Scène 01 Hero (médaillon)",
    usedIn: "src/components/home/Hero.tsx",
    description: "Lait versé dans une boisson violette glacée.",
    alt: {
      fr: "Un barista verse du lait dans une boisson violette glacée, sur le comptoir en bois",
      en: "A barista pours milk into an iced purple drink on the wooden counter",
    },
    focus: "49% 60%",
    status: "used",
  }),
  p03: photo({
    id: "p03",
    source: "Image ChatGPT 22 oct. 2026, 13_51_34-3.png",
    file: "03-matcha-latte-art-vue-dessus.jpg",
    src: p03,
    page: "home",
    section: "Accueil — Scène 04 Matcha moment (vue du dessus)",
    usedIn: "src/components/home/MatchaMoment.tsx",
    description: "Matcha latte vu du dessus sur un carnet bleu, cookie au matcha.",
    alt: {
      fr: "Matcha latte avec latte art vu du dessus, posé sur un carnet bleu près d'un cookie au matcha",
      en: "Matcha latte with latte art seen from above, on a blue notebook beside a matcha cookie",
    },
    focus: "45% 48%",
    status: "used",
  }),
  p04: photo({
    id: "p04",
    source: "Image ChatGPT 22 oct. 2026, 13_51_34-4.png",
    file: "04-table-ronde-matcha.jpg",
    src: p04,
    page: "cafe",
    section: "Le café — L'espace",
    usedIn: "src/components/pages/CafePage.tsx",
    description: "Table ronde en bois devant une banquette, matcha glacé.",
    alt: {
      fr: "Table ronde en bois devant une banquette, avec un matcha glacé, une tasse et une pâtisserie",
      en: "Round wooden table in front of a bench, with an iced matcha, a cup and a pastry",
    },
    focus: "48% 52%",
    status: "used",
  }),
  p05: photo({
    id: "p05",
    source: "Image ChatGPT 22 oct. 2026, 13_51_35-5.png",
    file: "05-versement-matcha-geste-barista.jpg",
    src: p05,
    page: "home",
    section: "Accueil — Scène 04 Matcha moment (geste)",
    usedIn: "src/components/home/MatchaMoment.tsx",
    description: "Matcha mousseux versé sur une boisson glacée ambrée.",
    alt: {
      fr: "Geste de barista : un matcha mousseux versé sur une boisson glacée ambrée",
      en: "Barista gesture: frothy matcha poured over an amber iced drink",
    },
    focus: "48% 55%",
    status: "used",
  }),
  p06: photo({
    id: "p06",
    source: "Image ChatGPT 22 oct. 2026, 13_51_35-6.png",
    file: "06-matcha-rose-et-vert-en-couches.jpg",
    src: p06,
    page: "home",
    section: "Accueil — Scène 01 Hero (image principale)",
    usedIn: "src/components/home/Hero.tsx",
    description: "Matcha versé sur un lait rose : couches verte, blanche et rose.",
    alt: {
      fr: "Matcha versé sur un lait rose, formant des couches verte, blanche et rose dans un verre",
      en: "Matcha poured over pink milk, forming green, white and pink layers in a glass",
    },
    focus: "47% 50%",
    status: "used",
  }),
  p07: photo({
    id: "p07",
    source: "Image ChatGPT 22 oct. 2026, 13_51_36-7.png",
    file: "07-salle-bancs-bois.jpg",
    src: p07,
    page: "cafe",
    section: "Le café — En-tête",
    usedIn: "src/components/pages/CafePage.tsx",
    description: "La salle : banquettes, tabourets et tables rondes en bois clair.",
    alt: {
      fr: "La salle du café : longues banquettes, tabourets et tables rondes en bois clair sous des pans de lin",
      en: "The café room: long benches, stools and round light-wood tables under hanging linen",
    },
    focus: "45% 60%",
    status: "used",
  }),
  p08: photo({
    id: "p08",
    source: "Image ChatGPT 22 oct. 2026, 13_51_36-8.png",
    file: "08-facade-comptoir.jpg",
    src: p08,
    page: "visit",
    section: "Nous trouver — Façade",
    usedIn: "src/components/pages/VisitPage.tsx",
    description: "Façade avec lettrage, vitrine des pâtisseries et banc garni de boissons.",
    alt: {
      fr: "Façade du Moonlight Café avec son lettrage, la vitrine des pâtisseries et un banc en bois garni de boissons",
      en: "Moonlight Café shopfront with its lettering, the pastry window and a wooden bench set with drinks",
    },
    focus: "50% 45%",
    status: "used",
  }),
  p09: photo({
    id: "p09",
    source: "Image ChatGPT 22 oct. 2026, 13_51_37-9.png",
    file: "09-boissons-colorees-patisseries.jpg",
    src: p09,
    page: "home",
    section: "Accueil — Scène 05 Coffee & colors",
    usedIn: "src/components/home/CoffeeColors.tsx",
    description: "Lattes violet, vert et bleu, café au lait saupoudré, cookies et brioche.",
    alt: {
      fr: "Table garnie de lattes violet, vert et bleu, d'un café au lait que l'on saupoudre, de cookies et d'une brioche",
      en: "Table set with purple, green and blue lattes, a milky coffee being dusted, cookies and a bun",
    },
    focus: "50% 50%",
    status: "used",
  }),
  p10: photo({
    id: "p10",
    source: "Image ChatGPT 22 oct. 2026, 13_51_38-10.png",
    file: "10-latte-art-vert-et-bleu.jpg",
    src: p10,
    page: "favorites",
    section: "Nos favoris — 04 Blue Latte",
    usedIn: "src/data/favorites.ts",
    description: "Deux tasses vues du dessus : un latte vert et un Blue Latte.",
    alt: {
      fr: "Deux tasses vues du dessus sur une table en bois : un Blue Latte et un latte vert, chacun avec son latte art",
      en: "Two cups seen from above on a wooden table: a Blue Latte and a green latte, each with latte art",
    },
    focus: "48% 50%",
    status: "used",
  }),
  p11: photo({
    id: "p11",
    source: "Image ChatGPT 22 oct. 2026, 13_56_14-1.png",
    file: "11-presentoir-cookies.jpg",
    src: p11,
    page: "home",
    section: "Accueil — Scène 06 The sweet side",
    usedIn: "src/components/home/SweetSide.tsx",
    description: "Présentoir en bois garni de cookies près de la vitrine.",
    alt: {
      fr: "Présentoir en bois garni de cookies au matcha, aux pépites et au chocolat près de la vitrine",
      en: "Wooden display of matcha, chocolate chip and chocolate cookies by the window",
    },
    focus: "52% 55%",
    status: "used",
  }),
  p12: photo({
    id: "p12",
    source: "Image ChatGPT 22 oct. 2026, 13_56_15-2.png",
    file: "12-cookies-matcha-gros-plan.jpg",
    src: p12,
    page: "favorites",
    section: "Nos favoris — 03 Cookie",
    usedIn: "src/data/favorites.ts",
    description: "Gros plan sur des cookies au matcha et aux pépites de chocolat.",
    alt: {
      fr: "Gros plan sur des cookies au matcha et aux pépites de chocolat, sur des plateaux en bois",
      en: "Close-up of matcha and chocolate chip cookies on wooden trays",
    },
    focus: "55% 55%",
    status: "used",
  }),
  p13: photo({
    id: "p13",
    source: "Image ChatGPT 22 oct. 2026, 13_56_16-3.png",
    file: "13-latte-art-vue-dessus.jpg",
    src: p13,
    page: "menu",
    section: "La carte — En-tête",
    usedIn: "src/components/pages/MenuPage.tsx",
    description: "Café au lait avec latte art, vu du dessus.",
    alt: {
      fr: "Café au lait avec un latte art en forme de feuille, vu du dessus sur une table en bois",
      en: "Milky coffee with leaf latte art, seen from above on a wooden table",
    },
    focus: "50% 50%",
    status: "used",
  }),
  p14: photo({
    id: "p14",
    source: "Image ChatGPT 22 oct. 2026, 13_56_17-4.png",
    file: "14-viennoiserie-feuilletee.jpg",
    src: p14,
    page: "story",
    section: "Notre histoire — Chapitre 03",
    usedIn: "src/components/pages/StoryPage.tsx",
    description: "Viennoiserie feuilletée à la cannelle coupée en deux.",
    alt: {
      fr: "Viennoiserie feuilletée à la cannelle coupée en deux, sur une assiette en métal",
      en: "Flaky cinnamon pastry cut in half on a metal plate",
    },
    focus: "52% 50%",
    status: "used",
  }),
  p15: photo({
    id: "p15",
    source: "Image ChatGPT 22 oct. 2026, 13_56_17-5.png",
    file: "15-trois-boissons-vue-dessus.jpg",
    src: p15,
    page: "favorites",
    section: "Nos favoris — En-tête",
    usedIn: "src/components/pages/FavoritesPage.tsx",
    description: "Mains tenant un café au lait entre un latte bleu et un latte vert.",
    alt: {
      fr: "Des mains tiennent un café au lait entre un latte bleu et un latte vert, sur une table en bois",
      en: "Hands holding a milky coffee between a blue latte and a green latte on a wooden table",
    },
    focus: "52% 45%",
    status: "used",
  }),
  p16: photo({
    id: "p16",
    source: "Image ChatGPT 22 oct. 2026, 13_56_18-6.png",
    file: "16-table-ronde-boissons-gateaux.jpg",
    src: p16,
    page: "home",
    section: "Accueil — Scène 03 Les signatures (la table)",
    usedIn: "src/components/home/Signatures.tsx",
    description: "Table ronde vue du dessus : lattes, matcha, cookies et gâteaux.",
    alt: {
      fr: "Table ronde vue du dessus avec des lattes, des matcha, des cookies et des gâteaux",
      en: "Round table seen from above with lattes, matcha, cookies and cakes",
    },
    focus: "50% 50%",
    status: "used",
  }),
  p17: photo({
    id: "p17",
    source: "Image ChatGPT 22 oct. 2026, 13_59_04-1.png",
    file: "17-matcha-glace-sachet-cafe.jpg",
    src: p17,
    page: "cafe",
    section: "Le café — À la fenêtre",
    usedIn: "src/components/pages/CafePage.tsx",
    description: "Matcha glacé à côté d'un sachet de café Moonlight, près de la vitrine.",
    alt: {
      fr: "Matcha glacé à côté d'un sachet de café Moonlight, sur une table près de la vitrine",
      en: "Iced matcha next to a Moonlight coffee bag, on a table by the window",
    },
    focus: "55% 55%",
    status: "used",
  }),
  p18: photo({
    id: "p18",
    source: "Image ChatGPT 22 oct. 2026, 13_59_05-2.png",
    file: "18-latte-et-cake.jpg",
    src: p18,
    page: "story",
    section: "Notre histoire — Chapitre 02",
    usedIn: "src/components/pages/StoryPage.tsx",
    description: "Café au lait en verre avec latte art et part de cake.",
    alt: {
      fr: "Café au lait dans un verre avec latte art, à côté d'une part de cake sur un plateau en bois",
      en: "Milky coffee in a glass with latte art, next to a slice of cake on a wooden tray",
    },
    focus: "45% 50%",
    status: "used",
  }),
  p19: photo({
    id: "p19",
    source: "Image ChatGPT 22 oct. 2026, 13_59_06-3.png",
    file: "19-iced-strawberry-matcha.jpg",
    src: p19,
    page: "favorites",
    section: "Nos favoris — 01 Iced Strawberry Matcha Latte",
    usedIn: "src/data/favorites.ts",
    description: "Iced Strawberry Matcha Latte en trois couches, framboises.",
    alt: {
      fr: "Iced Strawberry Matcha Latte en trois couches, vert, blanc et rouge, entouré de framboises",
      en: "Iced Strawberry Matcha Latte in three layers, green, white and red, surrounded by raspberries",
    },
    focus: "38% 52%",
    status: "used",
  }),
  p20: photo({
    id: "p20",
    source: "Image ChatGPT 22 oct. 2026, 13_59_06-4.png",
    file: "20-cookie-et-matcha-latte.jpg",
    src: p20,
    page: "favorites",
    section: "Nos favoris — 02 Matcha Latte",
    usedIn: "src/data/favorites.ts",
    description: "Matcha latte avec latte art, cookie cassé en deux au premier plan.",
    alt: {
      fr: "Matcha latte avec son latte art, et au premier plan un cookie aux pépites cassé en deux",
      en: "Matcha latte with latte art, and a chocolate chip cookie broken in half in the foreground",
    },
    focus: "45% 40%",
    status: "used",
  }),
  p21: photo({
    id: "p21",
    source: "Image ChatGPT 22 oct. 2026, 13_59_07-5.png",
    file: "21-lettrage-mural.jpg",
    src: p21,
    page: "home",
    section: "Accueil — Scène 02 L'univers Moonlight",
    usedIn: "src/components/home/Universe.tsx",
    description: "Lettrage « Moonlight café » au mur, au-dessus des gobelets.",
    alt: {
      fr: "Lettrage manuscrit « Moonlight café » sur le mur blanc, au-dessus des gobelets empilés",
      en: "Hand-drawn “Moonlight café” lettering on the white wall above stacked cups",
    },
    focus: "55% 40%",
    status: "used",
  }),
  p22: photo({
    id: "p22",
    source: "Image ChatGPT 22 oct. 2026, 13_59_08-6.png",
    file: "22-salle-vue-large.jpg",
    src: p22,
    page: "home",
    section: "Accueil — Scène 07 The Moonlight feeling (plein écran)",
    usedIn: "src/components/home/Feeling.tsx",
    description: "Vue large de la salle : lin suspendu, tables rondes, tabourets.",
    alt: {
      fr: "Vue large de la salle : pans de lin suspendus, tables rondes, banquettes et tabourets en bois",
      en: "Wide view of the room: hanging linen, round tables, benches and wooden stools",
    },
    focus: "50% 58%",
    status: "used",
  }),
  p23: photo({
    id: "p23",
    source: "Image ChatGPT 22 oct. 2026, 13_59_09-7.png",
    file: "23-facade-gobelet-moonlight.jpg",
    src: p23,
    page: "story",
    section: "Notre histoire — Chapitre 01",
    usedIn: "src/components/pages/StoryPage.tsx",
    description: "Gobelet de matcha glacé tenu devant la façade et l'enseigne illustrée.",
    alt: {
      fr: "Un gobelet de matcha glacé Moonlight tenu devant la façade et son enseigne illustrée",
      en: "A Moonlight iced matcha cup held up in front of the shopfront and its illustrated sign",
    },
    focus: "40% 45%",
    status: "used",
  }),
  p24: photo({
    id: "p24",
    source: "Image ChatGPT 22 oct. 2026, 13_59_10-8.png",
    file: "24-barista-boisson-glacee.jpg",
    src: p24,
    page: "cafe",
    section: "Le café — Les gestes",
    usedIn: "src/components/pages/CafePage.tsx",
    description: "Barista versant un matcha sur une boisson glacée dans un gobelet Moonlight.",
    alt: {
      fr: "Un barista verse un matcha sur une boisson glacée dans un gobelet Moonlight",
      en: "A barista pours matcha over an iced drink in a Moonlight cup",
    },
    focus: "55% 50%",
    status: "used",
  }),
  p25: photo({
    id: "p25",
    source: "Image ChatGPT 22 oct. 2026, 13_59_11-9.png",
    file: "25-matcha-glace-gobelet.jpg",
    src: p25,
    page: "favorites",
    section: "Nos favoris — 05 Iced Matcha Latte",
    usedIn: "src/data/favorites.ts",
    description: "Matcha glacé dans un gobelet Moonlight, table baignée de lumière.",
    alt: {
      fr: "Iced Matcha Latte dans un gobelet Moonlight, sur une table en bois baignée de lumière",
      en: "Iced Matcha Latte in a Moonlight cup on a sunlit wooden table",
    },
    focus: "50% 55%",
    status: "used",
  }),
  p26: photo({
    id: "p26",
    source: "Image ChatGPT 22 oct. 2026, 13_59_12-10.png",
    file: "26-matcha-glace-poire.jpg",
    src: p26,
    page: "cafe",
    section: "Le café — À la fenêtre (diptyque)",
    usedIn: "src/components/pages/CafePage.tsx",
    description: "Boisson glacée au matcha à côté d'une poire.",
    alt: {
      fr: "Boisson glacée au matcha à côté d'une poire, sur une table en bois",
      en: "Iced matcha drink beside a pear on a wooden table",
    },
    focus: "48% 55%",
    status: "used",
  }),
  p27: photo({
    id: "p27",
    source: "Photo envoyée le 23 oct. 2026 (hors ZIP)",
    file: "27-iced-mango-matcha-latte.jpg",
    src: p27,
    page: "favorites",
    section: "Nos favoris — Iced Mango Matcha Latte",
    usedIn: "src/data/favorites.ts",
    description: "Iced Mango Matcha Latte en couches dans un gobelet Moonlight, Iced Strawberry Matcha Latte en arrière-plan.",
    alt: {
      fr: "Iced Mango Matcha Latte en trois couches, matcha, lait et mangue, dans un gobelet Moonlight sur une table en bois, avec un Iced Strawberry Matcha Latte en arrière-plan",
      en: "Iced Mango Matcha Latte in three layers, matcha, milk and mango, in a Moonlight cup on a wooden table, with an Iced Strawberry Matcha Latte behind it",
    },
    focus: "55% 35%",
    status: "used",
  }),
} satisfies Record<string, PhotoEntry>;

export type PhotoId = keyof typeof photoManifest;
