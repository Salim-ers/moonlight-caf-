# Rapport de vérification — Moonlight Café

Date : 22 octobre 2026 · Build de production (`next build` + `next start`) servi en local · Chromium (build Playwright 1194) · Lighthouse 12.

Tous les tests ci-dessous ont été **réellement exécutés**. Le script fonctionnel est fourni (`scripts/qa.mjs`) pour pouvoir les rejouer.

## 1. Contrôles de code

| Contrôle | Commande | Résultat |
|---|---|---|
| TypeScript strict | `npm run typecheck` | 0 erreur |
| ESLint (Next.js + React Hooks) | `npm run lint` | 0 erreur, 0 avertissement |
| Build de production | `npm run build` | OK — 26 routes, toutes statiques sauf le 404 dynamique |
| Audit des dépendances de production | `npm audit --omit=dev` | 0 vulnérabilité |

Note : `npm audit` complet signale 5 alertes dans l'outillage de développement (ESLint), sans impact sur le site publié.

## 2. Tests fonctionnels automatisés (35/35 réussis)

`CHROME_PATH=… node scripts/qa.mjs http://localhost:3000`

| Domaine | Ce qui est vérifié | Résultat |
|---|---|---|
| 18 pages FR + EN | statut 200, un seul `<h1>`, `lang` correct, meta description, Open Graph, JSON-LD, 3 balises hreflang (fr / en / x-default), aucune image sans `alt`, aucune image cassée, aucun débordement horizontal | ✅ 18/18 |
| Liens internes | 34 liens internes distincts testés → tous 200 | ✅ |
| Liens externes | uniquement Instagram officiel, Google Maps (lieu + itinéraire), mailto, Vercel | ✅ |
| 404 | `/inexistant` et `/en/nothing` → statut 404 et page personnalisée dans la bonne langue | ✅ |
| Carte | onglet « Matcha » filtre la carte, ancre `#matcha` dans l'URL, prix Iced Strawberry Matcha 6,80 €, 33 produits + 5 suppléments, lien profond `/la-carte#patisseries` | ✅ |
| Galerie | filtre « Les gestes » (4 photos), ouverture de la visionneuse, flèche clavier → photo 2/4, Échap ferme | ✅ |
| Plan Google Maps | aucun iframe avant accord ; iframe après clic ; état visible sur /cookies ; retrait de l'accord → plus d'iframe | ✅ |
| Transition de page | navigation client vers /le-cafe, voile retiré, bon `<h1>` | ✅ |
| Langue | le sélecteur de /la-carte pointe vers /en/menu | ✅ |
| Menu mobile (375 × 667) | contenu derrière rendu `inert`, focus sur le 1er lien, Échap ferme, navigation, pas de débordement | ✅ |
| Animations réduites | aucune animation, aucun contenu masqué, aucune section épinglée, pas d'intro | ✅ |
| Intro | jouée à la 1re visite (≈ 2,5 s), pas rejouée au rechargement | ✅ |
| Clavier | le lien d'évitement « Aller au contenu » est le premier élément tabulable | ✅ |

Erreurs JavaScript relevées pendant les tests : aucune erreur applicative. (Seuls apparaissent le statut 404 attendu des pages inexistantes et un message lié au script de test lui-même dans l'iframe Google.)

## 3. Lighthouse (mesuré, build de production local)

Profil « mobile » = simulation Moto G Power, 4G lente, processeur ralenti ×4. Profil « desktop » = préréglage desktop. Mesures sur `localhost` : en production sur le CDN de Vercel, les valeurs réelles dépendront du réseau des visiteurs.

| Page | Profil | Perf. | Access. | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 81 | 100 | 100 | 100 | 3.4 s | 0.001 | 430 ms |
| / | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0.022 | 30 ms |
| /la-carte | mobile | 95 | 100 | 100 | 100 | 2.7 s | 0 | 120 ms |
| /la-carte | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 10 ms |
| /nos-favoris | mobile | 88 | 100 | 100 | 100 | 3.8 s | 0 | 100 ms |
| /nos-favoris | desktop | 99 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |
| /le-cafe | mobile | 86 | 100 | 100 | 100 | 3.4 s | 0 | 270 ms |
| /le-cafe | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 20 ms |
| /notre-histoire | mobile | 84 | 100 | 100 | 100 | 4.0 s | 0 | 200 ms |
| /notre-histoire | desktop | 81 | 100 | 100 | 100 | 1.2 s | 0 | 350 ms |
| /nous-trouver | mobile | 95 | 100 | 100 | 100 | 2.8 s | 0 | 50 ms |
| /nous-trouver | desktop | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| /en | mobile | 81 | 100 | 100 | 100 | 3.1 s | 0 | 490 ms |
| /en | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0.015 | 40 ms |

**Objectifs** : Accessibilité, Bonnes pratiques et SEO atteignent 100 partout. Performance ≥ 90 sur desktop (sauf une mesure à 81 sur /notre-histoire desktop, liée au temps de blocage et variable d'un passage à l'autre) et sur les pages pratiques mobile (carte, nous trouver).

**Limites connues, assumées** :
- Accueil mobile (81) : le LCP inclut volontairement l'intro (≈ 2,3 s, 1re visite seulement) et le « lever de lune » du hero. Toutes ces entrées sont en CSS pur et démarrent dès le premier affichage, sans attendre JavaScript. Aux visites suivantes de la session, l'intro ne rejoue pas.
- LCP mobile entre 2,7 et 4,0 s en 4G lente simulée : au-dessus de la cible de 2,5 s. Leviers possibles si besoin : intro raccourcie ou supprimée, photo du hero plus légère.
- Mesures variables de ±10 points selon la charge de la machine de test.

Optimisations en place : images AVIF/WebP responsive avec flou de chargement, préchargement de la photo du hero, polices auto-hébergées (3 graisses × 2 familles, sous-ensemble latin), kanji en SVG (aucune police japonaise téléchargée), révélations au défilement par IntersectionObserver plutôt que ScrollTrigger, parallaxe désactivée sous 768 px, pages 100 % statiques.

## 4. Revue visuelle

Captures d'écran prises et relues à chaque étape (bureau 1440 × 900, mobile 390 × 844 et 375 × 667) : accueil complet en défilement, carte, favoris, café et galerie, histoire, nous trouver, pages juridiques, 404, menu mobile ouvert, visionneuse. Aperçus et vidéo dans `docs/apercus/`.

Problèmes repérés grâce à cette revue et corrigés : photo du hero mal cadrée dans la lune, titres restés masqués à cause d'un décalage résiduel, chevauchement d'images dans la section matcha, bouton « Fermer » du menu mobile caché derrière le menu, adresse e-mail coupée dans le pied de page, script d'intro exécuté trop tard.

## 5. Non testé ici

- Appareils physiques iOS / Android et Safari (moteur WebKit) : seulement Chromium en émulation mobile. À vérifier sur un iPhone réel avant livraison, en particulier les sections épinglées au défilement.
- Écrans 4K physiques : mise en page bornée à 120 rem de large, vérifiée par le code, pas sur un écran réel.
- Chargement réel du plan Google Maps : l'iframe est bien insérée après accord, mais son contenu n'a pas pu s'afficher depuis l'environnement de test (accès réseau à Google bloqué).
- Déploiement Vercel effectif : le build est conforme, le déploiement reste à faire.
