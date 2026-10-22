# Rapport de vérification — Moonlight Café V2

Date : 22 octobre 2026 · Build de production (`next build` + `next start`) servi en local · Chrome 156 · Lighthouse 12.8 · Playwright 1.64.
Comparaison avant / après : la version d'origine (branche `main`, commit `9d9e7ac`) et la V2 ont été construites et servies **sur la même machine, dans les mêmes conditions**, et mesurées à la suite.

Tout ce qui figure ici a été **réellement exécuté**. Les scripts sont fournis pour rejouer les tests.

## 1. Contrôles de code

| Contrôle | Commande | Résultat |
|---|---|---|
| TypeScript strict | `npm run typecheck` | 0 erreur |
| ESLint (Next.js + React Hooks) | `npm run lint` | 0 erreur, 0 avertissement |
| Audit des photos | `npm run check:photos` | 26 photos, 26 emplacements uniques, aucun doublon MD5 ni perceptuel |
| Build de production | `npm run build` | OK — 26 routes, toutes statiques sauf le 404 |

## 2. Recette fonctionnelle (39/39)

`CHROME_PATH=… node scripts/qa.mjs http://localhost:3000`

| Domaine | Ce qui est vérifié | Résultat |
|---|---|---|
| 18 pages FR + EN | statut 200, un seul `<h1>`, `lang`, meta description, Open Graph, JSON-LD, 3 hreflang, aucune image sans `alt` ni cassée, aucun débordement horizontal, **aucun caractère japonais/chinois, aucune référence « japonais / coréen / chinois »** | 18/18 |
| Photos | les 26 photos sont affichées et **aucune n'apparaît sur deux pages** (contrôle dans le navigateur, FR et EN regroupées) | OK |
| Liens | 34 liens internes → 200 ; externes limités à Instagram, Google Maps, e-mail, Vercel | OK |
| 404 | `/inexistant`, `/en/nothing` → 404 dans la bonne langue | OK |
| Transition de page | logo **complet** (`moonlight-logo.webp`), `object-fit: contain`, ratio d'origine (1,413), centré à < 1 px près, entièrement dans l'écran ; arrivée, titre de page, focus sur le contenu ; durée < 900 ms | OK |
| Navigateur | bouton Précédent | OK |
| Menu mobile | contenu derrière `inert`, focus dans le menu, Échap ferme et rend le focus, navigation | OK |
| Langue | /la-carte → /en/menu | OK |
| Carte | 6 catégories, 33 produits, 5 suppléments, prix exacts, lien profond `#patisseries`, une seule photo | OK |
| Favoris | 6 créations affichées, compteur « 6 créations » généré depuis les données | OK |
| Logo d'ouverture | logo complet visible ≈ 1 s à la première page, n'intercepte pas les clics, ne rejoue pas au rechargement | OK |
| Sobriété | aucune étiquette « fig. 0x », aucun « Défiler », aucune numérotation « 01 / 06 » sur les 18 pages | OK |
| Visionneuse | ouverture, flèche clavier, Échap | OK |
| Plan Google Maps | aucun iframe avant accord, iframe après, retrait sur /cookies effectif | OK |
| Animations réduites | aucun contenu masqué, navigation sans voile | OK |
| Clavier | lien d'évitement en premier | OK |
| Console | aucune erreur JavaScript | OK |

## 3. Responsive

Pages FR et EN (13) × largeurs 320, 375, 390, 430, 768, 1024, 1440, 1920 px : **aucun débordement horizontal, aucune image déformée, aucune image cassée, aucun titre coupé** (après correction de deux titres trop larges sur la carte et l'accueil). Revue visuelle des captures défilées à 390, 768 et 1440 px.

## 4. Temps perçus (script Playwright, mêmes conditions)

| Mesure | Avant | Après |
|---|---|---|
| Titre du hero lisible + bouton « Voir la carte » cliquable — desktop | 3,70 s (intro de 2,45 s) | 1,40 s |
| Idem — mobile 390 px, processeur ralenti ×4 | 4,30 s | 0,74 s |
| Changement de page utilisable (voile retiré), 6 navigations | 1,56 – 1,63 s | 0,49 – 0,51 s |

## 5. Lighthouse (médiane de 3 passages par page)

### 5.1 Mobile, étranglement réellement appliqué (méthode « devtools » : 4G lente, processeur ×4)
Mesure la plus proche d'un vrai téléphone : le réseau et le processeur sont ralentis pendant le chargement.

| Page | Perf. avant → après | FCP | LCP | TBT | Speed Index | CLS | Thread principal |
|---|---|---|---|---|---|---|---|
| / | 84 → **98** | 1,94 → 1,27 s | 2,33 → 2,06 s | 434 → 127 ms | 4,17 → 1,53 s | 0,007 → 0,017 | 6,0 → 2,3 s |
| /la-carte | 98 → **99** | 1,74 → 1,06 s | 1,77 → 1,82 s | 77 → 75 ms | 2,23 → 1,20 s | 0 → 0,001 | 2,1 → 1,0 s |
| /nos-favoris | 91 → **99** | 1,75 → 1,04 s | 3,31 → 2,05 s | 50 → 57 ms | 3,20 → 1,27 s | 0 → 0,005 | 2,2 → 1,0 s |
| /le-cafe | 95 → **99** | 1,80 → 1,01 s | 1,92 → 2,14 s | 194 → 52 ms | 2,26 → 1,33 s | 0 → 0,001 | 3,1 → 0,9 s |
| /notre-histoire | 98 → **100** | 1,74 → 1,03 s | 1,77 → 1,74 s | 90 → 47 ms | 2,53 → 1,33 s | 0 → 0,031 | 1,9 → 0,9 s |
| /nous-trouver | 99 → **100** | 1,73 → 1,02 s | 1,75 → 1,02 s | 41 → 51 ms | 2,33 → 1,14 s | 0 → 0,030 | 1,9 → 0,8 s |
| /en | 83 → **99** | 1,97 → 1,28 s | 2,35 → 1,35 s | 458 → 114 ms | 4,21 → 1,55 s | 0,007 → 0,017 | 6,2 → 2,2 s |

### 5.2 Mobile, profil Lighthouse par défaut (simulation « lantern » : Moto G Power, 4G lente, ×4)

| Page | Perf. avant → après | FCP | LCP | TBT | Speed Index | Octets transférés |
|---|---|---|---|---|---|---|
| / | 91 → **93** | 0,90 → 1,01 s | 3,46 → 3,25 s | 59 → 37 ms | 2,03 → 1,30 s | 585 → 452 Ko |
| /la-carte | 91 → **95** | 0,90 → 0,97 s | 3,46 → 2,94 s | 13 → 16 ms | 1,84 → 1,05 s | 452 → 383 Ko |
| /nos-favoris | 88 → **92** | 0,90 → 0,97 s | 3,88 → 3,31 s | 19 → 14 ms | 1,63 → 0,97 s | 486 → 484 Ko |
| /le-cafe | 91 → **91** | 0,90 → 0,95 s | 3,46 → 3,46 s | 29 → 13 ms | 2,08 → 0,95 s | 565 → 520 Ko |
| /notre-histoire | 89 → **91** | 0,90 → 0,94 s | 3,79 → 3,50 s | 13 → 13 ms | 1,57 → 0,94 s | 489 → 455 Ko |
| /nous-trouver | 95 → **95** | 0,90 → 0,93 s | 3,01 → 3,01 s | 15 → 14 ms | 1,69 → 0,93 s | 448 → 383 Ko |
| /en | 92 → **93** | 0,90 → 1,01 s | 3,24 → 3,24 s | 73 → 38 ms | 2,15 → 1,34 s | 586 → 452 Ko |

### 5.3 Desktop (profil Lighthouse desktop)
Performance 99–100 → **100** sur les 7 pages ; LCP 0,64–0,79 s ; TBT 0 ms ; CLS ≤ 0,001.

### 5.4 Autres catégories
Accessibilité **100**, Bonnes pratiques **100**, SEO **100** sur toutes les pages mesurées, mobile et desktop (après correction de trois contrastes de textes secondaires repérés par cette campagne, revérifiée ensuite).

### 5.5 Lecture honnête des résultats
- **Objectif LCP ≤ 2,5 s** : atteint en étranglement appliqué (1,0 – 2,1 s sur toutes les pages). En simulation « lantern », le LCP mobile reste à 2,9 – 3,5 s (contre 3,0 – 3,9 s avant) : ce modèle rattache l'affichage de la première image à l'exécution du JavaScript du framework (Next.js / React), incompressible ici. Seules des données terrain (CrUX) après mise en ligne trancheront.
- **FCP simulé** légèrement plus élevé (+0,05 à +0,11 s) : le CSS est désormais inliné dans le HTML (pas de requête bloquante), ce qui alourdit le HTML dans le modèle simulé ; en conditions appliquées le FCP baisse nettement (1,73 – 1,97 s → 1,01 – 1,28 s).
- **CLS** : légèrement supérieur à zéro (maximum 0,031, objectif ≤ 0,1), dû au remplacement des polices de secours.
- **JavaScript** : 996 Ko → 668 Ko de fichiers JS au total (GSAP, ScrollTrigger, SplitText et Lenis supprimés) ; temps d'exécution au démarrage de l'accueil divisé par ≈ 2 (simulé) à ≈ 3 (appliqué).

## 6. Non testé ici

- Appareils physiques iOS / Android (Safari / WebKit) : uniquement Chrome en émulation mobile.
- Données terrain (CrUX, 75e percentile) : le site n'est pas encore en ligne avec ce code ; les valeurs ci-dessus sont des mesures de laboratoire.
- Contenu réel du plan Google Maps : l'iframe est bien insérée après accord, son rendu dépend de Google.
- Déploiement Vercel : non effectué (jeton Vercel de l'environnement de travail invalide) ; voir README §2.
