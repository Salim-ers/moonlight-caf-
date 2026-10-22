/**
 * Textes du site — version française (langue principale).
 * Chaque clé existe aussi dans `en.ts`. TypeScript signale toute traduction manquante.
 *
 * Seuls des faits vérifiés sont utilisés (voir README > Sources) : ouverture en juillet 2024,
 * café torréfié par Fève, matcha bio de cérémonie, pâtisseries maison, accessoires en vente.
 */
export const fr = {
  meta: {
    siteTitle: "Moonlight Café — Coffee shop créatif, café & matcha dans le Marais, Paris 3e",
    siteDescription:
      "Coffee shop créatif au 27 rue des Gravilliers, Paris 3e : café de spécialité torréfié par Fève, matcha bio, boissons colorées, cookies et pâtisseries maison. Ouvert tous les jours.",
    pages: {
      home: {
        title: "Moonlight Café — Coffee shop créatif, café & matcha dans le Marais, Paris 3e",
        description:
          "Café de spécialité, matcha bio préparé minute, boissons colorées, cookies et pâtisseries maison au cœur du Haut-Marais. 27 rue des Gravilliers, Paris 3e. Ouvert tous les jours.",
      },
      menu: {
        title: "La carte — cafés, matcha, thés et pâtisseries",
        description:
          "La carte complète du Moonlight Café : espresso, flat white, matcha latte, Iced Strawberry Matcha, Blue Latte, thés bio, cookies maison. Prix et suppléments.",
      },
      favorites: {
        title: "Nos favoris — la sélection Moonlight",
        description:
          "Iced Strawberry Matcha Latte, Matcha Latte, Blue Latte, cookies maison : les créations que l'on vous recommande au Moonlight Café, Paris 3e.",
      },
      cafe: {
        title: "Le café — banquettes en bois et lumière du jour dans le Haut-Marais",
        description:
          "Banquettes en bois, tables rondes, lin suspendu et grande vitrine : découvrez en images le Moonlight Café, rue des Gravilliers, Paris 3e.",
      },
      story: {
        title: "Notre histoire — un coffee shop ouvert en 2024 dans le Marais",
        description:
          "Ouvert en juillet 2024 rue des Gravilliers, Moonlight Café réunit café de spécialité torréfié par Fève, matcha bio préparé à la commande et pâtisseries maison.",
      },
      visit: {
        title: "Nous trouver — adresse, horaires et itinéraire",
        description:
          "Moonlight Café, 27 rue des Gravilliers, 75003 Paris. Métro Arts et Métiers. Du lundi au vendredi 8h30–17h30, samedi et dimanche 9h30–18h.",
      },
      legal: {
        title: "Mentions légales",
        description:
          "Mentions légales du site du Moonlight Café, coffee shop au 27 rue des Gravilliers, Paris 3e : éditeur, hébergeur et propriété intellectuelle.",
      },
      privacy: {
        title: "Politique de confidentialité",
        description: "Comment le site du Moonlight Café traite vos données personnelles : aucune mesure d'audience, aucun formulaire, vos droits RGPD.",
      },
      cookies: {
        title: "Cookies et stockage local",
        description: "Les cookies et données stockées par le site du Moonlight Café, et comment gérer vos choix.",
      },
      notFound: { title: "Page introuvable", description: "Cette page n'existe pas ou a été déplacée." },
    },
  },
  a11y: {
    skip: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNav: "Navigation principale",
    footerNav: "Liens du pied de page",
    home: "Moonlight Café, accueil",
    newTab: "(s'ouvre dans un nouvel onglet)",
    language: "Langue",
  },
  nav: {
    home: "Accueil",
    menu: "La carte",
    favorites: "Nos favoris",
    cafe: "Le café",
    story: "Notre histoire",
    visit: "Nous trouver",
  },
  common: {
    directions: "Itinéraire",
    openInMaps: "Ouvrir dans Google Maps",
    copyAddress: "Copier l'adresse",
    copied: "Adresse copiée",
    seeMenu: "Voir la carte",
    findUs: "Nous trouver",
    address: "Adresse",
    hours: "Horaires",
    contact: "Contact",
    today: "Aujourd'hui",
    emailSubject: "Bonjour Moonlight Café",
    switchTo: "English",
    switchToShort: "EN",
    priceNote: "Prix en euros, service compris.",
    menuLabel: "Menu",
    close: "Fermer",
    marquee: ["Coffee", "Matcha", "Cookies", "Good moments"],
  },
  days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  status: {
    open: "Ouvert jusqu'à {time}",
    opensLater: "Ouvre aujourd'hui à {time}",
    closed: "Fermé, réouverture {day} à {time}",
    tomorrow: "demain",
    checking: "Horaires du jour",
  },
  home: {
    hero: {
      eyebrow: "Coffee shop créatif · Haut-Marais, Paris 3e",
      title: ["Votre pause,", "en plus", "coloré."],
      lede: "Café de spécialité, matcha fouetté minute, boissons colorées et cookies maison. Au 27 rue des Gravilliers.",
    },
    universe: {
      eyebrow: "L'univers Moonlight",
      statement: "Une petite adresse du Haut-Marais : un bon café, un matcha fouetté minute, un cookie maison. Et beaucoup de lumière.",
      facts: [
        { label: "Depuis", value: "Juillet 2024" },
        { label: "Le café", value: "Torréfié par Fève" },
        { label: "Le matcha", value: "Bio, de cérémonie" },
        { label: "Ouvert", value: "7 jours sur 7" },
      ],
      caption: "Le lettrage du comptoir, rue des Gravilliers.",
    },
    signatures: {
      eyebrow: "Les signatures",
      title: ["Six créations", "à goûter d'abord."],
      text: "Une sélection de cœur pour une première visite : du matcha sous toutes ses formes, un latte bleu, un grand cookie.",
      table: "La table Moonlight",
      tableCaption: "Lattes, matcha, cookies et pâtisseries, vus d'en haut.",
      drag: "Glisser",
      cta: "Les favoris en images",
    },
    matcha: {
      eyebrow: "Matcha moment",
      title: ["Le matcha,", "fouetté minute."],
      text: "Un matcha bio de cérémonie, tamisé puis fouetté à chaque commande. Servi chaud avec un dessin à la surface, ou versé sur un lait glacé.",
      steps: [
        { title: "Tamiser", text: "La poudre passe au tamis, pour une boisson sans grumeaux." },
        { title: "Fouetter", text: "Jusqu'à une mousse fine et serrée, d'un vert intense." },
        { title: "Verser", text: "Sur un lait chaud avec un dessin, ou sur un lait bien froid." },
      ],
      caption1: "Le geste : un matcha mousseux versé sur une boisson glacée.",
      caption2: "Matcha latte, vu d'en haut.",
      cta: "Les boissons au matcha",
    },
    colors: {
      eyebrow: "Coffee & colors",
      title: ["Ici, chaque tasse", "a sa couleur."],
      hint: "Choisissez une couleur",
      options: [
        { key: "violet", word: "Violet", label: "Une création du moment", detail: "La boisson violette change au fil des saisons : demandez-la au comptoir." },
        { key: "matcha", word: "Matcha", label: "Matcha Latte", detail: "Matcha bio de cérémonie, lait chaud et latte art." },
        { key: "bleu", word: "Bleu", label: "Blue Latte", detail: "Une boisson lactée d'un bleu franc, sans café." },
        { key: "cafe", word: "Café", label: "Côté café", detail: "Café de spécialité torréfié par Fève, ici saupoudré au dernier moment." },
      ],
      cta: "Toute la carte",
    },
    sweet: {
      eyebrow: "The sweet side",
      title: ["Le côté", "gourmand."],
      text: "Des cookies épais, croustillants au bord et fondants à cœur, des cakes en tranches et un granola bowl pour les matins tranquilles. Des pâtisseries faites maison.",
      flavorsTitle: "Les cookies de la carte",
      cta: "Voir les pâtisseries",
    },
    feeling: {
      eyebrow: "The Moonlight feeling",
      title: ["On s'y pose.", "On y revient."],
      text: "De longues banquettes en bois, des tables rondes, de grands pans de lin qui adoucissent la lumière. On vient seul avec un livre, ou à plusieurs, pour une heure ou cinq minutes.",
      cta: "Entrer dans le café",
    },
    social: {
      eyebrow: "Community",
      text: "Les créations du moment, la vitrine du jour et la lumière du café, au fil des jours.",
      cta: "Suivre sur Instagram",
    },
    hello: {
      eyebrow: "Come say hello",
      title: ["Venez dire", "bonjour."],
      text: "À deux pas du métro Arts et Métiers. Sur place ou à emporter.",
      stamp: "27 rue des Gravilliers · Paris 3e · ",
    },
  },
  menuPage: {
    title: "La carte",
    tagline: "café, matcha & douceurs",
    lede: "Café de spécialité torréfié par Fève, matcha bio de cérémonie, thés bio et pâtisseries faites maison.",
    categoriesLabel: "Catégories de la carte",
    items: "{n} produits",
    categories: "{n} catégories",
    extrasTitle: "Suppléments",
    extrasNote: "Selon les boissons, demandez au comptoir.",
    print: "Imprimer la carte",
    footnote: "La carte évolue au fil des saisons. Allergènes : l'équipe vous renseigne au comptoir.",
    flavors: "Parfums",
    favoritesLink: "Nos favoris en images",
  },
  favoritesPage: {
    title: "Nos favoris",
    lede: "Une sélection, pas un classement : les créations que l'on aime vous faire découvrir, chaudes, glacées ou à croquer.",
    count: "{n} créations",
    index: "Sommaire",
    seeMenu: "Voir la carte complète",
    closing: ["Et il y a", "toute la carte."],
    noPhoto: "Photo à venir — à découvrir au comptoir",
  },
  cafePage: {
    title: "Le café",
    tagline: "lumière du jour, bois blond",
    lede: "Un lieu clair et chaleureux au 27 rue des Gravilliers. Quelques images avant de venir.",
    space: {
      title: "L'espace",
      text: "Des murs blancs, du bois naturel, de longues banquettes et des tables rondes. De grands pans de lin suspendus filtrent la lumière qui entre par la vitrine.",
    },
    gestures: {
      title: "Les gestes",
      text: "Au comptoir, tout se prépare sous vos yeux : un matcha que l'on verse, un lait que l'on texture, un dessin qui se forme à la surface de la tasse.",
    },
    objects: {
      title: "Sur les étagères",
      text: "Tasses, bols et accessoires pour préparer café et matcha à la maison, entre deux plantes vertes.",
    },
    window: {
      title: "Côté vitrine",
      text: "Les tables près de la vitrine prennent la lumière : un matcha glacé, le sachet de café Moonlight, et la rue en arrière-plan.",
    },
    gallery: {
      open: "Agrandir la photo",
      close: "Fermer",
      prev: "Photo précédente",
      next: "Photo suivante",
      counter: "Photo {n} sur {total}",
    },
  },
  storyPage: {
    title: "Notre histoire",
    tagline: "depuis juillet 2024",
    lede: "Un coffee shop de quartier, ouvert en juillet 2024 rue des Gravilliers, où chaque boisson est préparée avec la même attention.",
    chapters: [
      {
        kicker: "L'adresse",
        title: "Une petite adresse, beaucoup d'attention.",
        text: [
          "Moonlight a ouvert en juillet 2024 au 27 rue des Gravilliers, dans le Haut-Marais, entre Arts et Métiers et Beaubourg.",
          "Une rue étroite bordée de petites boutiques, une façade blanche, une grande vitrine et, sur le mur, un dessin au trait.",
        ],
      },
      {
        kicker: "Le comptoir",
        title: "Les bonnes choses prennent forme ici.",
        text: [
          "Le café vient de Fève, torréfacteur de spécialité. Le matcha est un matcha bio de cérémonie, tamisé avant chaque préparation.",
          "Les boissons chaudes sont servies avec un latte art, les boissons glacées se construisent en couches, sous vos yeux.",
        ],
      },
      {
        kicker: "La vitrine",
        title: "Le goût du détail.",
        text: [
          "Les pâtisseries sont faites maison : de grands cookies, des cakes en tranches, un granola bowl.",
          "Ils s'alignent dans la vitrine, près de l'entrée.",
        ],
      },
      {
        kicker: "Le lieu",
        title: "Un café qui se vit autant qu'il se goûte.",
        text: [
          "En semaine dès 8h30, le week-end dès 9h30. Un espresso au comptoir, un matcha glacé à emporter ou une heure à table avec un cookie.",
          "Sur les étagères, des tasses et des accessoires pour prolonger le moment à la maison.",
        ],
      },
    ],
    founderLine: "Le projet est porté par {name}, ancienne barista, qui a grandi dans le quartier.",
    closing: ["La suite s'écrit", "au comptoir."],
  },
  visitPage: {
    title: "Nous trouver",
    tagline: "rue des Gravilliers",
    lede: "Au cœur du Haut-Marais, à quelques pas du métro Arts et Métiers.",
    getThere: "Venir",
    onSite: "Sur place ou à emporter.",
    map: {
      title: "Plan",
      consentText:
        "Le plan interactif est fourni par Google Maps. En l'affichant, Google peut déposer des cookies et collecter des données sur votre navigation.",
      load: "Afficher le plan",
      remember: "Votre choix est mémorisé sur cet appareil. Vous pouvez le retirer sur la page Cookies.",
      iframeTitle: "Plan Google Maps du Moonlight Café",
    },
    emailText: "Une question, un projet ? Écrivez-nous.",
    instagramText: "Nouveautés et créations du moment.",
    exceptionsNote: "Jours fériés : pensez à consulter Instagram avant de venir.",
  },
  notFound: {
    title: "Cette page a pris une pause café.",
    text: "L'adresse est peut-être incorrecte, ou la page a été déplacée. La carte et les horaires, eux, sont toujours là.",
    home: "Retour à l'accueil",
  },
  footer: {
    tagline: "Coffee shop créatif — café de spécialité, matcha et pâtisseries maison. Haut-Marais, Paris 3e.",
    invite: ["Une pause ?", "On vous attend."],
    visit: "Venir",
    explore: "Explorer",
    follow: "Suivre",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    cookies: "Cookies",
    rights: "Tous droits réservés.",
    backTop: "Haut de page",
  },
  legalCommon: {
    pending: "Document en cours de validation. Les informations de l'éditeur seront complétées avec l'exploitant du café avant la mise en ligne.",
    toComplete: "À compléter",
    toVerify: "à vérifier",
    updated: "Dernière mise à jour",
  },
  cookiesPage: {
    mapsState: "Plan Google Maps",
    allowed: "Autorisé sur cet appareil",
    notAllowed: "Non autorisé",
    revoke: "Retirer mon accord",
    allow: "Autoriser",
  },
};

export type Dictionary = typeof fr;
