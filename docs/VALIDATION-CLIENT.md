# Points à faire valider par Moonlight Café avant la mise en ligne

Chaque point indique où le modifier une fois la réponse obtenue.

## A. Informations juridiques (bloquant pour la publication)

Les mentions légales affichent « [À compléter] » et un bandeau « Document en cours de validation » tant que ces données ne sont pas fournies. Fichier : `src/data/site-config.ts` → `legalConfig`, puis passer `validated: true`.

1. **Société exploitante** : dénomination, forme juridique, capital.
   Les registres publics mentionnent au 27 rue des Gravilliers la **SASU LOUISE CAFE (SIREN 924 855 117)**. Une autre société, **MOONLIGHT BAR (SIREN 939 669 396, 41 rue Servan)**, ressort dans certaines recherches sans lien confirmé avec le café. Aucune des deux n'est publiée sur le site : à confirmer par l'exploitant.
2. SIREN / SIRET, RCS, n° de TVA intracommunautaire.
3. Adresse du siège social.
4. Nom du directeur ou de la directrice de la publication.
5. Téléphone (facultatif).
6. Adresse de l'hébergeur Vercel : à vérifier au moment de la mise en ligne.
7. Crédit de réalisation à afficher en pied de page (`siteConfig.credit`), si prévu au contrat.

## B. Histoire et personnes

8. **Fondatrice** : la presse (Zoom Japon, 2025) cite **Émilie Zhou**, ancienne barista chez Coutume, ayant grandi dans le quartier. Les registres font apparaître une identité « Émilie Zhang / Zhou ». Le site ne publie **aucun nom** pour l'instant. Si elle est d'accord : `siteConfig.founderName` → une phrase s'ajoute automatiquement sur la page Histoire.
9. Confirmer les faits utilisés : ouverture en **juillet 2024**, café torréfié par **Fève**, matcha **bio de cérémonie d'Uji**, matcha **tamisé** avant préparation, inspiration coffee shops **japonais et coréens**, **tons beiges** évoquant la lune, **accessoires** en vente sur les étagères.
10. Mention du quartier « souvent présenté comme le premier quartier chinois de Paris » (page Histoire, chapitre 1) : à garder ou retirer selon le souhait du café.

## C. Carte et produits

11. La photo de la carte physique n'était pas jointe : les produits et prix viennent du brief. Faire relire la page `/la-carte` en entier.
12. **Descriptions des thés et des softs** (notes aromatiques de la carte physique) : non reprises, faute de visuel lisible. À transmettre pour les ajouter (champ `note` dans `menu-data.ts`).
13. Orthographe exacte : « Blanc **Yunan** » (repris tel quel, l'orthographe usuelle est « Yunnan »), « Sésame Latte », variantes de cookies (« Matcha chocolat blanc », « Pépites chocolat noir », « Pécan choco coco », « Beurre de cacahuète et cacao »).
14. Granola Bowl : libellé retenu « Granola, fromage blanc et coulis de fraise ». À confirmer.
15. Suppléments : le site précise « selon les boissons ». Indiquer s'il existe des restrictions particulières.
16. **Iced Coconut Matcha** (6,50 €) et **banana bread** (4,50 €) cités par la presse : absents de la carte fournie, donc non affichés. À ajouter s'ils sont toujours proposés.
17. Correspondances photo / produit à confirmer :
    - photo 19 (boisson en trois couches et framboises) = **Iced Strawberry Matcha Latte** ;
    - photo 03 (tasse verte, latte art) = **Matcha Latte** ;
    - photo 25 (gobelet vert) = **Iced Matcha Latte** ;
    - photo 10 (tasse bleue) = **Blue Latte** ;
    - photo 12 (cookies verts et pépites) = **Cookie**.
    Les boissons des photos 02 (violette), 05 (matcha sur boisson ambrée), 06 (rose et verte) et 26 (poire), ainsi que la viennoiserie de la photo 14, sont montrées **sans nom ni prix**.
18. Iced Mango Matcha Latte : aucune photo fiable, il apparaît dans les favoris sous forme de carte typographique. Une vraie photo serait un plus.

## D. Informations pratiques

19. Horaires : lun.–ven. 8h30–17h30, sam.–dim. 9h30–18h. Indiquer les **fermetures exceptionnelles** (jours fériés, congés) à saisir dans `src/data/opening-hours.ts` → `exceptions`.
20. Coordonnées GPS de la façade (`siteConfig.address.geo`) : valeur approximative, à vérifier sur Google Maps (utilisée seulement par les données structurées SEO).
21. Accès : « Métro Arts et Métiers (lignes 3 et 11) » et « Sur place ou à emporter » : à confirmer.
22. E-mail de contact : moonlightcafeparis@gmail.com, à confirmer comme adresse publique.

## E. Photographies

23. Les 26 photos ont été fournies en 1672 × 941 px, sous des noms de fichier « Image ChatGPT… », ce qui laisse penser qu'elles ont été retouchées ou recadrées avec un outil d'IA. Faire confirmer par le café qu'elles **représentent fidèlement le lieu et les produits**, et qu'il en détient les droits de diffusion. Des originaux en plus haute définition amélioreraient la netteté sur grands écrans.

## F. Nom de domaine et mise en ligne

24. Nom de domaine choisi → variable `NEXT_PUBLIC_SITE_URL` sur Vercel.
25. Après la mise en ligne : déclarer le sitemap (`/sitemap.xml`) dans Google Search Console et ajouter l'URL du site sur la fiche Google Business Profile du café.
