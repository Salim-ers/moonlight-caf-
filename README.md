# Moonlight Café — site web (V2)

Site vitrine bilingue (FR / EN) du Moonlight Café, coffee shop créatif au 27 rue des Gravilliers, Paris 3e.

- **Stack** : Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · Lucide
- **Animations** : un moteur maison de ≈ 3 Ko (IntersectionObserver + variables CSS) — plus de GSAP ni de Lenis.
- **Rendu** : toutes les pages sont générées statiquement (SSG) ; seul le 404 est rendu à la demande. CSS inliné dans le `<head>`.
- **Aucune base de données, aucun CMS** : tout le contenu se modifie dans `src/data/` et `src/i18n/`.

---

## 1. Installation et lancement

Prérequis : Node.js 20.9 ou plus récent (testé avec Node 24), npm 10.

```bash
npm install          # installe les dépendances
npm run dev          # serveur de développement → http://localhost:3000
npm run build        # build optimisé (lance d'abord l'audit des photos)
npm run start        # sert le build → http://localhost:3000
```

Contrôles qualité :

```bash
npm run typecheck     # TypeScript strict
npm run lint          # ESLint (règles Next.js + React Hooks)
npm run check:photos  # audit anti-doublon des 26 photographies
npm run check         # typecheck + lint + build
npm run qa            # recette fonctionnelle (serveur lancé, voir docs/VERIFICATION.md)
```

## 2. Déploiement sur Vercel

1. Poussez la branche sur le dépôt GitHub relié au projet Vercel.
2. Vercel détecte Next.js, aucun réglage de build n'est nécessaire (`npm run build` exécute aussi l'audit des photos : un doublon fait échouer le déploiement).
3. **Settings → Environment Variables** : `NEXT_PUBLIC_SITE_URL` = l'URL finale (ex. `https://www.moonlightcafe.fr`, sans `/` final).
4. **Settings → Domains** pour brancher le nom de domaine.

En ligne de commande : `npx vercel` (prévisualisation) puis `npx vercel --prod`.
Sur les déploiements de prévisualisation, `robots.txt` interdit automatiquement l'indexation.

## 3. Structure du projet

```
assets/originals/        Photos et logo d'origine, non retouchés (non servis par le site)
public/brand/            Logo complet optimisé (moonlight-logo.webp), logo-full.png (SEO), icônes
public/og/               Image de partage Open Graph (logo complet, sans photo)
scripts/
  check-photos.mjs       Audit des photos (doublons d'usage, empreintes MD5, hachage perceptuel)
  generate-brand-assets.mjs  Régénère logo web, icônes, favicon et image OG depuis le logo original
  qa.mjs                 Recette fonctionnelle Playwright (38 contrôles)
src/
  app/                   Routes (fr) sans préfixe, (en) sous /en, sitemap, robots, manifest, icônes
  assets/photos/         Les 26 photos (Next.js génère AVIF/WebP et tailles responsive)
  components/
    layout/              En-tête, menu mobile, pied de page, sélecteur de langue
    motion/              MotionRuntime (moteur d'animation), PageTransition (logo complet), Reveal
    home/                Les 9 scènes de l'accueil
    menu/                Navigation collante de la carte
    gallery/             Visionneuse
    pages/               Contenu de chaque page (partagé FR/EN)
    ui/                  Photo, Logo, boutons, horaires, statut d'ouverture, plan avec consentement…
  data/
    photo-manifest.ts    Registre central des 26 photos : un seul emplacement par photo
    menu-data.ts         La carte : produits, prix, suppléments, couleur de chaque catégorie
    favorites.ts         « Nos favoris » : ordre, textes, photo (si fiable), couleur
    site-config.ts       Coordonnées, réseaux, faits vérifiés, données juridiques à valider
    opening-hours.ts     Horaires et fermetures exceptionnelles
  fonts/                 Polices auto-hébergées, sous-ensemblées (82 Ko au total)
  i18n/                  Textes FR (fr.ts) et EN (en.ts), routes localisées (config.ts)
  lib/                   SEO, horaires (fuseau Europe/Paris), consentement, polices, couleurs (tones.ts)
  styles/globals.css     Tokens, typographie fluide, système d'animation CSS, compositions
```

## 4. Modifier le contenu

### La carte (prix, produits)
`src/data/menu-data.ts`. Chaque produit :

```ts
{ id: "flat-white", name: same("Flat White"), price: 5.5 },
{ id: "chocolat-chaud", name: { fr: "Chocolat chaud", en: "Hot chocolate" }, price: 5 },
```

Changer un prix met à jour toutes les pages (carte, favoris, accueil). `tone` règle la couleur de la catégorie.

### Les favoris
`src/data/favorites.ts` : l'ordre du tableau = l'ordre d'affichage ; la numérotation « 01 / 06 » et le compteur sont calculés. `photo` n'est renseigné que si la photo montre réellement le produit ; sans photo, la page affiche une composition typographique.

### Les horaires
`src/data/opening-hours.ts`. Jours : 0 = dimanche … 6 = samedi. Fermetures exceptionnelles dans `exceptions`.
Le statut « Ouvert jusqu'à… » est calculé dans le navigateur à l'heure de Paris, uniquement à partir de ces données.

### Les textes
`src/i18n/fr.ts` et `src/i18n/en.ts`. TypeScript signale toute clé manquante dans l'une des deux langues.

## 5. Photographies — règle « une photo = un emplacement »

Les 26 photos sont déclarées dans `src/data/photo-manifest.ts` (identifiant `p01`…`p26`, fichier source du ZIP, page et section propriétaires, fichier autorisé à l'utiliser, textes alternatifs FR/EN, point focal).
La numérotation suit l'ordre du ZIP original `Moonlight  café.zip` (vérifié par empreinte MD5).

`npm run check:photos` (lancé automatiquement avant chaque build) échoue si :
- un identifiant est utilisé plus d'une fois, ou ailleurs que dans le fichier déclaré ;
- un fichier est identique à un autre (MD5) ou quasi identique (hachage perceptuel dHash) ;
- une photo est importée directement sans passer par le registre.

Remplacer une photo : déposez le fichier dans `src/assets/photos/`, mettez à jour l'import et l'entrée du registre.

## 6. Logo

Le fichier original (`assets/originals/logo-moonlight-cafe-original.png`, identique pixel à pixel à « Jeune fille au café Moonlight.png ») n'est jamais redessiné ni recadré. `npm run brand-assets` en dérive :
- `public/brand/moonlight-logo.webp` — logo **complet** détouré (33 Ko), utilisé par l'en-tête, la transition de page et le pied de page (un seul téléchargement) ; sur fond sombre il est inversé en CSS ;
- les icônes (logo complet sur fond crème), le favicon (illustration entière à 16–48 px) et l'image Open Graph.

## 7. Animations

- **Entrées au chargement** (hero, en-têtes) : CSS pur, visibles dès le premier affichage, ≤ 0,9 s. Aucune introduction bloquante.
- **Révélations au défilement** : attribut `data-reveal` (rideaux, cercle, fenêtre, lignes de titre…), déclenchées par IntersectionObserver.
- **Séquences liées au défilement** : attribut `data-progress` → variable CSS `--p` (scène matcha épinglée, fenêtre sur la salle, mots révélés, table qui tourne…). Un seul écouteur de défilement passif.
- **Souris** (ordinateur uniquement) : parallaxe du hero (`data-pointer`), boutons magnétiques (`data-magnetic`), curseur « Glisser » sur le rail des signatures.
- **Transition de page** : couleur de la page d'arrivée + logo complet centré, ≈ 0,5 s ; aucune attente artificielle.
- `prefers-reduced-motion` : aucune animation, aucun contenu masqué, navigation instantanée.
- Garde-fou : si le JavaScript ne démarre pas en 4 s, tout le contenu s'affiche.

## 8. Confidentialité

- Polices auto-hébergées (aucune requête vers Google Fonts).
- Aucun outil de mesure d'audience, aucun cookie publicitaire → pas de bannière.
- Le plan Google Maps ne se charge qu'après un clic explicite ; l'accord est révocable sur `/cookies`.

## 9. Sources des informations

- specialtycoffee.paris : torréfacteur Fève, matcha bio d'Uji, horaires, ouverture juillet 2024.
- Instagram @moonlight.cafe.paris (extrait de bio) : « Specialty coffee – Fève · Ceremonial organic matcha from Uji ».
- Zoom Japon / PARI PARI, 5 juin 2025 : ouverture en juillet 2024, pâtisseries maison, accessoires en vente.
- Carte et prix : données transmises (octobre 2026).

Voir `docs/DIRECTION-ARTISTIQUE.md`, `docs/VERIFICATION.md` (tests et mesures) et `docs/VALIDATION-CLIENT.md` (points à faire confirmer).
