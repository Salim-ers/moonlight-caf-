# Direction artistique — Moonlight Café V2

## Idée directrice
**« Votre pause, en plus coloré. »** Moonlight est un coffee shop parisien créatif : café de spécialité, matcha et boissons originales, pâtisseries maison. Les produits sont déjà une palette — matcha, fraise, violet, bleu latte, caramel, crème. Le site les met en scène comme une campagne : grandes typographies, photographies réelles, aplats de couleur francs, mouvement précis.

*Playful premium coffee culture × editorial design × colorful art direction × high-end motion.*

Aucune décoration culturelle (caractères, motifs ou références asiatiques) : l'identité vient des produits, des photos et du logo.

## Palette
| Nom | Hex | Rôle |
|---|---|---|
| Matcha | `#70894E` | scène matcha, accents, pastilles |
| Matcha profond | `#3B4F27` | fond de la scène « Matcha moment » |
| Fraise | `#E9A9BA` / doux `#F8DDE4` | hero, Nos favoris, mots en italique (`#A8385D`) |
| Lavande | `#A79AD9` / doux `#E7E2F7` | signatures, menu mobile, Le café |
| Bleu latte | `#729DD6` / doux `#DDE8F7` | communauté Instagram, Nous trouver |
| Caramel | `#C78B59` / doux `#F3DFCA` | côté gourmand, La carte |
| Crème beurre | `#F7ECCD` | final « Venez dire bonjour », Notre histoire |
| Ivoire chaud | `#FFF9F0` | zones de respiration |
| Encre espresso | `#272420` | texte, boutons, pied de page |

Chaque page a sa couleur d'accent (reprise par la transition de page et l'indicateur de navigation) ; chaque catégorie de la carte et chaque favori a la sienne. Les sections ivoire laissent respirer les photos.

## Typographie
- **Bricolage Grotesque** (titres) : grotesque éditoriale expressive, axe optique figé en version « display », graisse 700. Titres monumentaux en `clamp()`.
- **Instrument Serif italique** : un mot par titre (« *coloré.* », « *bonjour.* ») — la signature « campagne ».
- **Instrument Sans** (texte) : nette, très lisible ; micro-titres en capitales espacées.
- **Le lettrage manuscrit du logo** comme signature, toujours dans le logo complet.

## Logo
Toujours le logo officiel **complet** (jeune femme, tasse, vapeur, lettrage « Moonlight café ») : en-tête, transition de page, pied de page, menu mobile, Instagram, Notre histoire, 404, image de partage. Jamais la tasse seule, jamais recadré, toujours en `object-fit: contain`.

## Les neuf scènes de l'accueil
1. **Hero campagne** (rose) : titre monumental, arche photographique (matcha sur lait rose), médaillon (boisson violette), forme matcha, badge tournant, palette ; parallaxe souris et défilement.
2. **L'univers** (ivoire) : une phrase révélée mot à mot au défilement, le lettrage du comptoir, les faits.
3. **Les signatures** (lavande) : rail horizontal — la table vue du dessus qui tourne, puis six cartes colorées illustrées.
4. **Matcha moment** (vert) : le vert s'ouvre en cercle ; scène épinglée, photo dans un iris qui s'agrandit, étapes qui s'allument.
5. **Coffee & colors** : choisir une couleur zoome sur la tasse correspondante et teinte la section.
6. **The sweet side** (caramel) : bandeau typographique incliné, présentoir à cookies, parfums et prix de la carte.
7. **The Moonlight feeling** (ivoire) : une fenêtre arrondie s'ouvre sur la salle jusqu'au plein écran.
8. **Community** (bleu) : lettrage géant @moonlight.cafe.paris qui glisse et ondule — pas de grille de photos répétées.
9. **Come say hello** (crème) : tampon « 27 », adresse copiable, horaires du jour, itinéraire.

## Langage de mouvement
Transform, opacity et clip-path uniquement ; easing « expo out » pour les entrées, « in-out » pour les masques. Révélations variées (rideau vertical, horizontal, cercle, fenêtre, arche, pop), jamais la même sur toutes les photos. Rien ne bloque la lecture ni le clic ; tout est désactivé avec « réduire les animations ».

## Photographie
Répartition exclusive des 26 photos : voir `src/data/photo-manifest.ts` (accueil 9, Nos favoris 6, Le café 6, Notre histoire 3, La carte 1, Nous trouver 1). Une photo n'est associée à un produit que si elle le montre réellement ; sinon, composition typographique ou illustration abstraite.
