/**
 * Textes du site — version française (langue principale).
 * Chaque clé existe aussi dans `en.ts`. TypeScript signale toute traduction manquante.
 */
export const fr = {
  meta: {
    siteTitle: "Moonlight Café — Coffee shop & matcha dans le Marais, Paris 3e",
    siteDescription:
      "Coffee shop de spécialité au 27 rue des Gravilliers, Paris 3e : café torréfié par Fève, matcha de cérémonie bio d'Uji, cookies et pâtisseries maison. Ouvert tous les jours.",
    pages: {
      home: {
        title: "Moonlight Café — Coffee shop & matcha dans le Marais, Paris 3e",
        description:
          "Café de spécialité, matcha de cérémonie d'Uji et pâtisseries maison au cœur du Haut-Marais. 27 rue des Gravilliers, Paris 3e. Ouvert tous les jours.",
      },
      menu: {
        title: "La carte — cafés, matcha, thés et pâtisseries",
        description:
          "La carte complète du Moonlight Café : espresso, flat white, matcha latte, Iced Strawberry Matcha, thés bio, cookies maison. Prix et suppléments.",
      },
      favorites: {
        title: "Nos favoris — la sélection Moonlight",
        description:
          "Iced Strawberry Matcha Latte, Matcha Latte, Blue Latte, cookies maison : les créations que l'on vous recommande au Moonlight Café, Paris 3e.",
      },
      cafe: {
        title: "Le café — un lieu lumineux dans le Haut-Marais",
        description:
          "Bois blond, lin suspendu et lumière du jour : découvrez en images le Moonlight Café, coffee shop rue des Gravilliers, Paris 3e.",
      },
      story: {
        title: "Notre histoire — un coffee shop ouvert en 2024 dans le Marais",
        description:
          "Ouvert en juillet 2024 rue des Gravilliers, Moonlight Café s'inspire des coffee shops japonais et coréens : café de spécialité, matcha d'Uji et calme.",
      },
      visit: {
        title: "Nous trouver — adresse, horaires et itinéraire",
        description:
          "Moonlight Café, 27 rue des Gravilliers, 75003 Paris. Métro Arts et Métiers. Du lundi au vendredi 8h30–17h30, samedi et dimanche 9h30–18h.",
      },
      legal: { title: "Mentions légales", description: "Mentions légales du site du Moonlight Café, coffee shop au 27 rue des Gravilliers, Paris 3e : éditeur, hébergeur et propriété intellectuelle." },
      privacy: { title: "Politique de confidentialité", description: "Comment le site du Moonlight Café traite vos données personnelles : aucune mesure d'audience, aucun formulaire, vos droits RGPD." },
      cookies: { title: "Cookies et stockage local", description: "Les cookies et données stockées par le site du Moonlight Café, et comment gérer vos choix." },
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
    scrollProgress: "Progression de la lecture",
    language: "Langue",
  },
  nav: {
    menu: "La carte",
    favorites: "Nos favoris",
    cafe: "Le café",
    story: "Notre histoire",
    visit: "Nous trouver",
    home: "Accueil",
  },
  common: {
    directions: "Itinéraire",
    openInMaps: "Ouvrir dans Google Maps",
    copyAddress: "Copier l'adresse",
    copied: "Adresse copiée",
    follow: "Suivre Moonlight",
    writeUs: "Nous écrire",
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
    skipIntro: "Passer l'introduction",
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
      title: ["Un clair", "de lune", "en plein jour."],
      lede: "Café de spécialité, matcha de cérémonie et pâtisseries maison, au 27 rue des Gravilliers.",
      moonCaption: "月光, le clair de lune en japonais",
      scroll: "Défiler",
    },
    intro: {
      title: ["Ici, le Marais", "prend son temps."],
      text: "Un petit coffee shop indépendant du Haut-Marais, ouvert en juillet 2024. Un café extrait avec soin, un matcha préparé à la commande, des pâtisseries maison et beaucoup de lumière.",
      facts: [
        { label: "Le quartier", value: "Haut-Marais, Paris 3e" },
        { label: "Le café", value: "Torréfié par Fève" },
        { label: "Le matcha", value: "Bio, d'Uji au Japon" },
        { label: "Les horaires", value: "Ouvert tous les jours" },
      ],
    },
    favorites: {
      title: "La sélection Moonlight",
      text: "Six créations que l'on vous recommande pour une première visite. Une sélection de cœur, pas un classement.",
      all: "Toute la sélection",
      menu: "La carte complète",
      noPhoto: "À découvrir au comptoir",
    },
    matcha: {
      title: ["Le matcha,", "à la main."],
      text: "Un matcha de cérémonie bio, venu d'Uji, au Japon. Chaque boisson est préparée à la commande : une texture soyeuse, un goût net et végétal, servi chaud ou sur glace.",
      steps: [
        { title: "Tamiser", text: "La poudre passe au tamis, pour une boisson sans grumeaux." },
        { title: "Fouetter", text: "Au fouet en bambou, jusqu'à une mousse fine et serrée." },
        { title: "Verser", text: "Sur un lait chaud avec un dessin, ou sur un lait glacé." },
      ],
      cta: "Les boissons au matcha",
    },
    pastry: {
      title: ["Fait maison,", "et généreux."],
      text: "Des cookies épais, croustillants au bord et fondants à cœur, des cakes en tranches et un granola bowl pour les matins tranquilles.",
      flavorsTitle: "Les cookies du moment sur la carte",
      cta: "Voir les pâtisseries",
    },
    place: {
      title: ["Bois blond, lin suspendu,", "lumière du jour."],
      text: "Des banquettes le long des murs, des tables rondes et des tabourets en bois, de grands tissus clairs qui adoucissent la lumière. On s'y installe seul avec un livre, ou à plusieurs.",
      cta: "Explorer le café",
    },
    story: {
      date: "Juillet 2024",
      title: "Un café de quartier, pensé avec soin.",
      text: "Moonlight a ouvert ses portes en juillet 2024, rue des Gravilliers. L'envie de départ : servir un café et un matcha de grande qualité dans un lieu calme, inspiré des coffee shops japonais et coréens.",
      cta: "Découvrir notre histoire",
    },
    social: {
      title: "Sur Instagram",
      text: "Les créations du moment, les nouveautés de la vitrine et la lumière du café, au fil des jours.",
      note: "Une sélection de photos du café. Le compte Instagram s'ouvre dans un nouvel onglet.",
    },
    visit: {
      title: ["Passez", "nous voir."],
      text: "À quelques pas du métro Arts et Métiers. Sur place ou à emporter.",
    },
  },
  menuPage: {
    title: "La carte",
    lede: "Café de spécialité, matcha de cérémonie, thés bio et pâtisseries maison.",
    all: "Toute la carte",
    categoriesLabel: "Catégories de la carte",
    extrasTitle: "Suppléments",
    extrasNote: "Selon les boissons, demandez au comptoir.",
    print: "Imprimer la carte",
    footnote:
      "La carte évolue au fil des saisons. Pour toute question sur les allergènes, l'équipe vous renseigne au comptoir.",
    flavors: "Parfums",
    photoOf: "Photo",
    favoritesLink: "Nos favoris en images",
  },
  favoritesPage: {
    title: "Nos favoris",
    lede: "Une sélection, pas un classement : les créations que l'on aime vous faire découvrir, chaudes, glacées ou à croquer.",
    seeMenu: "Voir la carte complète",
    count: "{n} créations",
  },
  cafePage: {
    title: "Le café",
    lede: "Un lieu clair et calme au 27 rue des Gravilliers. Quelques images avant de venir.",
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
    gallery: {
      title: "Galerie",
      filters: { all: "Tout", lieu: "Le lieu", gestes: "Les gestes", table: "À table", patisserie: "Pâtisseries" },
      open: "Agrandir la photo",
      close: "Fermer",
      prev: "Photo précédente",
      next: "Photo suivante",
      counter: "Photo {n} sur {total}",
      filterLabel: "Filtrer la galerie",
    },
  },
  storyPage: {
    title: "Notre histoire",
    lede: "Un coffee shop de quartier ouvert en juillet 2024, qui fait du calme et de la précision une manière d'accueillir.",
    chapters: [
      {
        kicker: "Chapitre 01",
        title: "Une adresse dans le Marais",
        text: [
          "Moonlight a ouvert en juillet 2024 au 27 rue des Gravilliers, dans le Haut-Marais, entre Arts et Métiers et Beaubourg.",
          "Une rue étroite bordée de petites boutiques, dans un quartier souvent présenté comme le premier quartier chinois de Paris.",
        ],
      },
      {
        kicker: "Chapitre 02",
        title: "Le goût des choses bien faites",
        text: [
          "Le café vient de Fève, torréfacteur de spécialité. Le matcha est un matcha de cérémonie bio d'Uji, au Japon, tamisé avant chaque préparation.",
          "Les boissons chaudes sont servies avec un latte art, les pâtisseries sont faites maison.",
        ],
      },
      {
        kicker: "Chapitre 03",
        title: "Une inspiration venue d'ailleurs",
        text: [
          "Le lieu s'inspire des coffee shops japonais et coréens : tons clairs, bois naturel, tissus de lin, peu d'objets mais bien choisis.",
          "Les teintes beiges rappellent la lune. La vaisselle est soignée, la musique reste douce.",
        ],
      },
      {
        kicker: "Chapitre 04",
        title: "Moonlight, au quotidien",
        text: [
          "En semaine dès 8h30, le week-end dès 9h30. Un espresso au comptoir, un matcha glacé à emporter ou une heure à table avec un cookie.",
          "Sur les étagères, des tasses et des accessoires pour prolonger le rituel à la maison.",
        ],
      },
    ],
    founderLine: "Le projet est porté par {name}, ancienne barista, qui a grandi dans le quartier.",
    closing: "La suite s'écrit au comptoir.",
  },
  visitPage: {
    title: "Nous trouver",
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
    title: "Cette page s'est perdue au clair de lune.",
    text: "L'adresse est peut-être incorrecte, ou la page a été déplacée. La carte et les horaires, eux, sont toujours là.",
    home: "Retour à l'accueil",
  },
  footer: {
    tagline: "Coffee shop de spécialité et matcha, Haut-Marais, Paris 3e.",
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
    pending:
      "Document en cours de validation. Les informations de l'éditeur seront complétées avec l'exploitant du café avant la mise en ligne.",
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
