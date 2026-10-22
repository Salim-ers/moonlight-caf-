# Moonlight Café — site web

Site vitrine bilingue (FR / EN) du Moonlight Café, coffee shop de spécialité au 27 rue des Gravilliers, Paris 3e.

- **Stack** : Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Lenis · Lucide
- **Rendu** : toutes les pages sont générées statiquement (SSG) ; seul le 404 est rendu à la demande.
- **Aucune base de données, aucun CMS** : tout le contenu se modifie dans `src/data/` et `src/i18n/`.

---

## 1. Installation et lancement

Prérequis : Node.js 20.9 ou plus récent (testé avec Node 22), npm 10.

```bash
npm install          # installe les dépendances
npm run dev          # serveur de développement → http://localhost:3000
```

Production en local :

```bash
npm run build        # build optimisé
npm run start        # sert le build → http://localhost:3000
```

Contrôles qualité :

```bash
npm run typecheck    # TypeScript strict
npm run lint         # ESLint (règles Next.js + React Hooks)
npm run check        # les deux + build
```

> Astuce : si une modification CSS ne s'affiche pas en développement, arrêtez le serveur, supprimez le dossier `.next` et relancez `npm run dev` (cache Turbopack).

## 2. Déploiement sur Vercel

1. Poussez le dossier sur un dépôt GitHub / GitLab / Bitbucket.
2. Sur vercel.com : **Add New → Project**, importez le dépôt. Vercel détecte Next.js, aucun réglage de build n'est nécessaire.
3. Dans **Settings → Environment Variables**, ajoutez :
   - `NEXT_PUBLIC_SITE_URL` = l'URL finale, par exemple `https://www.moonlightcafe.fr` (sans `/` final).
4. Déployez. Puis **Settings → Domains** pour brancher le nom de domaine.

`NEXT_PUBLIC_SITE_URL` sert aux URL canoniques, au sitemap, aux balises hreflang, à Open Graph et aux données structurées. Sur les déploiements de prévisualisation Vercel, `robots.txt` interdit automatiquement l'indexation.

## 3. Structure du projet

```
assets/originals/        Photos et logo d'origine, non retouchés (non servis par le site)
public/brand/            Déclinaisons du logo (complet, illustration, signature, tasse, versions claires), icônes
public/og/               Image de partage Open Graph (1200 × 630)
public/textures/         Grain papier
src/
  app/
    (fr)/                Routes françaises (langue principale, sans préfixe) + layout racine FR
    (en)/en/             Routes anglaises sous /en + layout racine EN
    sitemap.ts robots.ts manifest.ts icon.png apple-icon.png favicon.ico
  assets/photos/         Photos utilisées par le site (Next.js génère AVIF/WebP et tailles responsive)
  components/
    layout/              En-tête, menu mobile, pied de page, sélecteur de langue, indicateur « phase de lune »
    home/                Sections de l'accueil (intro, hero, favoris, matcha, pâtisseries, lieu…)
    menu/                Carte interactive, cartes produits
    gallery/             Galerie masonry, visionneuse, galerie horizontale
    motion/              Animations partagées (révélations, transitions de pages, défilement doux, kanji SVG)
    pages/               Contenu de chaque page (partagé FR/EN)
    ui/                  Boutons, photo, horaires, statut d'ouverture, plan avec consentement…
  data/
    site-config.ts       Coordonnées, réseaux, faits vérifiés, données juridiques à valider
    menu-data.ts         La carte : produits, prix, suppléments
    favorites.ts         Sélection « Nos favoris » et textes associés
    gallery-data.ts      Photos, textes alternatifs FR/EN, points focaux, ordre de la galerie
    opening-hours.ts     Horaires et fermetures exceptionnelles
  i18n/                  Textes FR (fr.ts) et EN (en.ts), routes localisées (config.ts)
  lib/                   SEO, horaires (fuseau Europe/Paris), consentement, GSAP, polices
  styles/globals.css     Tokens de couleurs et typographie, animations CSS
```

## 4. Modifier le contenu

### La carte (prix, produits)
`src/data/menu-data.ts`. Chaque produit :

```ts
{ id: "flat-white", name: same("Flat White"), price: 5.5 },
{ id: "chocolat-chaud", name: { fr: "Chocolat chaud", en: "Hot chocolate" }, price: 5 },
```

- Changer un prix : modifiez `price` (nombre décimal, `5.5` = 5,50 €). Il est mis à jour partout (carte, favoris, accueil).
- Ajouter une boisson : copiez une ligne dans la bonne catégorie, avec un `id` unique.
- Associer une photo : `photo: "strawberry"` (clé de `gallery-data.ts`), uniquement si la photo montre réellement ce produit.
- Suppléments : tableau `extras` en bas du fichier.

### Les favoris
`src/data/favorites.ts` : l'ordre du tableau = l'ordre d'affichage. `itemId` renvoie à un produit de la carte (le prix est repris automatiquement).

### Les horaires
`src/data/opening-hours.ts`. Jours : 0 = dimanche … 6 = samedi.

Fermeture exceptionnelle (jour férié, congés) :

```ts
export const exceptions = [
  { date: "2026-12-25", closed: true },
  { date: "2026-12-31", open: "09:30", close: "15:00" },
];
```

Le statut « Ouvert jusqu'à… » est calculé dans le navigateur à l'heure de Paris (changement d'heure compris). Aucun jour férié n'est deviné : seules les exceptions saisies sont prises en compte.

### E-mail, Instagram, adresse
`src/data/site-config.ts` → `siteConfig`.

### Les textes
`src/i18n/fr.ts` (français) et `src/i18n/en.ts` (anglais). TypeScript signale toute clé manquante dans l'une des deux langues.

### SEO
Titres et descriptions de chaque page : `meta.pages` dans `fr.ts` / `en.ts`. Les données structurées (`CafeOrCoffeeShop`) sont générées depuis `site-config.ts` et `opening-hours.ts` dans `src/lib/seo.ts`.

## 5. Remplacer ou ajouter une photo

1. Déposez le fichier dans `src/assets/photos/` (JPG, PNG ou WebP, idéalement 1600 px de large ou plus). Gardez l'original dans `assets/originals/`.
2. Dans `src/data/gallery-data.ts`, importez-le et ajoutez une entrée :
   ```ts
   import p27 from "@/assets/photos/27-nouvelle-photo.jpg";
   nouvelle: photo("27", p27, "table", "50% 50%", "Texte alternatif FR", "English alt text"),
   ```
   - la catégorie (`lieu`, `gestes`, `table`, `patisserie`) sert aux filtres de la galerie ;
   - le 4e paramètre est le point focal utilisé pour les recadrages (`"40% 60%"` = un peu à gauche, un peu bas).
3. Ajoutez la clé dans `galleryOrder` pour l'afficher dans la galerie de la page « Le café ».

Next.js produit automatiquement les versions AVIF/WebP, les tailles adaptées à chaque écran et le flou de chargement. Les photos fournies mesurent 1672 × 941 px : elles sont servies au maximum à cette définition (pas d'agrandissement artificiel).

## 6. Logo

Le fichier original (`assets/originals/logo-moonlight-cafe-original.png`) n'est jamais redessiné. Les déclinaisons de `public/brand/` sont des **découpes** du même fichier, sans déformation :

| Fichier | Usage |
|---|---|
| `logo-full.png` / `-light.png` | Logo complet (pied de page, intro) |
| `logo-wordmark.png` / `-light.png` | Signature manuscrite seule (en-tête) |
| `logo-illustration.png` | La jeune femme seule |
| `logo-cup.png` / `-light.png` | La tasse fumante (favicon, transitions) |

## 7. Animations

- Les entrées au chargement (intro, lever de lune du hero, titres) sont en **CSS pur** : elles démarrent au premier affichage, sans attendre JavaScript.
- Les effets liés au défilement utilisent GSAP ScrollTrigger (pins, parallaxe, expansions) ; les révélations ponctuelles utilisent IntersectionObserver.
- `prefers-reduced-motion` : aucune animation, aucun défilement doux, pas d'intro, pas de section épinglée.
- L'intro ne joue qu'une fois par session et peut être passée (clic, toucher, clavier).
- Parallaxe désactivée sous 768 px (économie de batterie et de calcul sur mobile).

## 8. Confidentialité

- Polices auto-hébergées (aucune requête vers Google Fonts).
- Aucun outil de mesure d'audience, aucun cookie publicitaire → pas de bannière.
- Le plan Google Maps ne se charge qu'après un clic explicite ; l'accord est révocable sur `/cookies`.

## 9. Sources des informations

- Zoom Japon / PARI PARI, 5 juin 2025 (contenu sponsorisé) : ouverture en juillet 2024, inspiration Corée / Japon, tons beiges évoquant la lune, matcha d'Uji tamisé, pâtisseries maison, accessoires en vente.
- specialtycoffee.paris : torréfacteur Fève, matcha bio d'Uji, horaires, ouverture juillet 2024.
- Instagram @moonlight.cafe.paris (extrait de bio) : « Specialty coffee – Fève · Ceremonial organic matcha from Uji ».
- Carte et prix : données transmises (octobre 2026).

Voir `docs/VERIFICATION.md` (tests réalisés) et `docs/VALIDATION-CLIENT.md` (points à faire confirmer).
