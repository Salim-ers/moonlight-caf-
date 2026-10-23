# Points à faire valider par Moonlight Café avant la mise en ligne

Chaque point indique où le modifier une fois la réponse obtenue.

## A. Informations juridiques (bloquant pour la publication)

Les mentions légales affichent « [À compléter] » et un bandeau « Document en cours de validation » tant que ces données ne sont pas fournies. Fichier : `src/data/site-config.ts` → `legalConfig`, puis passer `validated: true`.

1. **Société exploitante** : dénomination, forme juridique, capital. Les registres publics mentionnent au 27 rue des Gravilliers la SASU LOUISE CAFE (SIREN 924 855 117) ; non publiée tant que l'exploitant ne l'a pas confirmée.
2. SIREN / SIRET, RCS, n° de TVA intracommunautaire, adresse du siège social.
3. Nom du directeur ou de la directrice de la publication ; téléphone (facultatif).
4. Adresse de l'hébergeur Vercel : à vérifier au moment de la mise en ligne.
5. Crédit de réalisation en pied de page (`siteConfig.credit`), si prévu au contrat.

## B. Histoire et faits

6. **Fondatrice** : aucun nom n'est publié. Si elle est d'accord : `siteConfig.founderName` → une phrase s'ajoute sur la page Histoire.
7. Faits utilisés : ouverture en **juillet 2024**, café torréfié par **Fève**, matcha **bio de cérémonie** (d'**Uji**, mentionné uniquement sur la carte, catégorie Matcha), matcha **tamisé**, **pâtisseries maison**, **accessoires** sur les étagères.
8. La V2 ne mentionne plus d'inspiration japonaise ou coréenne ni le « premier quartier chinois de Paris » (demande du client).

## C. Carte et produits

9. Produits et prix : inchangés par rapport à la version précédente. Faire relire `/la-carte` en entier.
10. Sous-titres de catégories ajoutés : « Sans une goutte de café » (Sans café). À confirmer.
11. Notes aromatiques des thés : à transmettre (champ `note` dans `menu-data.ts`).
12. Orthographe : « Blanc Yunan » (repris tel quel), « Sésame Latte », parfums de cookies.
13. **Correspondances photo / produit** (page Nos favoris) à confirmer :
    - photo 19 (trois couches, framboises) = Iced Strawberry Matcha Latte ;
    - photo 20 (matcha latte et cookie) = Matcha Latte ;
    - photo 12 (cookies) = Cookie ;
    - photo 10 (tasses bleue et verte) = Blue Latte ;
    - photo 25 (gobelet vert) = Iced Matcha Latte.
    - photo 27 (gobelet Moonlight, couches mangue / lait / matcha) = Iced Mango Matcha Latte, photo envoyée le 23 octobre 2026.
14. Boissons montrées **sans nom ni prix** (non identifiées sur la carte) : la boisson violette (photos 02 et 09, présentée comme « une création du moment »), le matcha sur boisson ambrée (05), le matcha sur lait rose (06), le matcha à la poire (26), la viennoiserie (14). Si ce sont des produits de la carte, donner leurs noms.

## D. Informations pratiques

15. Horaires : lun.–ven. 8h30–17h30, sam.–dim. 9h30–18h. Fermetures exceptionnelles → `src/data/opening-hours.ts` → `exceptions`.
16. Coordonnées GPS (`siteConfig.address.geo`) : valeur approximative, utilisée seulement par les données structurées.
17. « Métro Arts et Métiers (lignes 3 et 11) » et « Sur place ou à emporter » : à confirmer.
18. E-mail public : moonlightcafeparis@gmail.com.

## E. Photographies

19. Les 26 premières photos ont été fournies en 1672 × 941 px sous des noms « Image ChatGPT… » (la 27e, 1086 × 1448 px, à part) : faire confirmer qu'elles représentent fidèlement le lieu et les produits, et que le café en détient les droits. Des originaux plus grands amélioreraient la netteté sur grands écrans.

## F. Mise en ligne

20. Nom de domaine → variable `NEXT_PUBLIC_SITE_URL` sur Vercel.
21. Déclarer `/sitemap.xml` dans Google Search Console et ajouter l'URL du site sur la fiche Google Business Profile.
