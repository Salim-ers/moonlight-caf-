import type { Dictionary } from "./fr";

/** Site copy — English version. Must mirror every key of `fr.ts`. */
export const en: Dictionary = {
  meta: {
    siteTitle: "Moonlight Café — Specialty coffee & matcha in the Marais, Paris",
    siteDescription:
      "Specialty coffee shop at 27 rue des Gravilliers, Paris 3rd: coffee roasted by Fève, organic ceremonial matcha from Uji, homemade cookies and pastries. Open every day.",
    pages: {
      home: {
        title: "Moonlight Café — Specialty coffee & matcha in the Marais, Paris",
        description:
          "Specialty coffee, ceremonial matcha from Uji and homemade pastries in the heart of the Upper Marais. 27 rue des Gravilliers, Paris 3rd. Open every day.",
      },
      menu: {
        title: "Menu — coffee, matcha, tea and pastries",
        description:
          "The full Moonlight Café menu: espresso, flat white, matcha latte, Iced Strawberry Matcha, organic teas, homemade cookies. Prices and extras.",
      },
      favorites: {
        title: "Favourites — the Moonlight selection",
        description:
          "Iced Strawberry Matcha Latte, Matcha Latte, Blue Latte, homemade cookies: what we recommend at Moonlight Café, Paris 3rd.",
      },
      cafe: {
        title: "The café — a bright spot in the Upper Marais",
        description:
          "Blond wood, hanging linen and daylight: see Moonlight Café, a coffee shop on rue des Gravilliers in Paris's 3rd arrondissement, in pictures.",
      },
      story: {
        title: "Our story — a Marais coffee shop opened in 2024",
        description:
          "Opened in July 2024 on rue des Gravilliers, Moonlight Café draws on Japanese and Korean coffee shops: specialty coffee, Uji matcha and calm.",
      },
      visit: {
        title: "Find us — address, opening hours and directions",
        description:
          "Moonlight Café, 27 rue des Gravilliers, 75003 Paris. Arts et Métiers metro. Monday to Friday 8:30am–5:30pm, weekends 9:30am–6pm.",
      },
      legal: { title: "Legal notice", description: "Legal notice for the Moonlight Café website, coffee shop at 27 rue des Gravilliers, Paris 3rd: publisher, host and intellectual property." },
      privacy: { title: "Privacy policy", description: "How the Moonlight Café website handles your personal data: no analytics, no forms, and your rights under the GDPR." },
      cookies: { title: "Cookies and local storage", description: "Cookies and data stored by the Moonlight Café website, and how to manage your choices." },
      notFound: { title: "Page not found", description: "This page doesn't exist or has moved." },
    },
  },
  a11y: {
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    footerNav: "Footer links",
    home: "Moonlight Café, home",
    newTab: "(opens in a new tab)",
    scrollProgress: "Reading progress",
    language: "Language",
  },
  nav: {
    menu: "Menu",
    favorites: "Favourites",
    cafe: "The café",
    story: "Our story",
    visit: "Find us",
    home: "Home",
  },
  common: {
    directions: "Directions",
    openInMaps: "Open in Google Maps",
    copyAddress: "Copy address",
    copied: "Address copied",
    follow: "Follow Moonlight",
    writeUs: "Email us",
    seeMenu: "See the menu",
    findUs: "Find us",
    address: "Address",
    hours: "Opening hours",
    contact: "Contact",
    today: "Today",
    emailSubject: "Hello Moonlight Café",
    switchTo: "Français",
    switchToShort: "FR",
    priceNote: "Prices in euros, service included.",
    skipIntro: "Skip intro",
  },
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  status: {
    open: "Open until {time}",
    opensLater: "Opens today at {time}",
    closed: "Closed, reopens {day} at {time}",
    tomorrow: "tomorrow",
    checking: "Today's hours",
  },
  home: {
    hero: {
      title: ["Moonlight,", "in broad", "daylight."],
      lede: "Specialty coffee, ceremonial matcha and homemade pastries at 27 rue des Gravilliers, Paris.",
      moonCaption: "月光, moonlight in Japanese",
      scroll: "Scroll",
    },
    intro: {
      title: ["Here, the Marais", "takes its time."],
      text: "A small independent coffee shop in the Upper Marais, open since July 2024. Carefully pulled coffee, matcha made to order, homemade pastries and plenty of daylight.",
      facts: [
        { label: "The neighbourhood", value: "Upper Marais, Paris 3rd" },
        { label: "The coffee", value: "Roasted by Fève" },
        { label: "The matcha", value: "Organic, from Uji, Japan" },
        { label: "Opening hours", value: "Open every day" },
      ],
    },
    favorites: {
      title: "The Moonlight selection",
      text: "Six drinks and bakes we recommend for a first visit. A selection from the heart, not a sales chart.",
      all: "The full selection",
      menu: "The full menu",
      noPhoto: "Discover it at the counter",
    },
    matcha: {
      title: ["Matcha,", "made by hand."],
      text: "Organic ceremonial matcha from Uji, Japan. Every drink is made to order: a silky texture and a clean, vegetal taste, served hot or over ice.",
      steps: [
        { title: "Sift", text: "The powder goes through a sieve, so the drink stays smooth." },
        { title: "Whisk", text: "With a bamboo whisk, until the foam is fine and tight." },
        { title: "Pour", text: "Over warm milk with a pattern on top, or over iced milk." },
      ],
      cta: "Matcha drinks",
    },
    pastry: {
      title: ["Homemade,", "and generous."],
      text: "Thick cookies, crisp at the edge and soft in the middle, sliced cakes and a granola bowl for slow mornings.",
      flavorsTitle: "Cookie flavours on the menu",
      cta: "See the pastries",
    },
    place: {
      title: ["Blond wood, hanging linen,", "daylight."],
      text: "Benches along the walls, round tables and wooden stools, large pale fabrics softening the light. Come alone with a book, or with friends.",
      cta: "Explore the café",
    },
    story: {
      date: "July 2024",
      title: "A neighbourhood café, made with care.",
      text: "Moonlight opened in July 2024 on rue des Gravilliers. The idea: serve excellent coffee and matcha in a calm space inspired by Japanese and Korean coffee shops.",
      cta: "Read our story",
    },
    social: {
      title: "On Instagram",
      text: "New drinks, what's on the counter and the light in the café, day after day.",
      note: "A selection of photos of the café. Instagram opens in a new tab.",
    },
    visit: {
      title: ["Come and", "see us."],
      text: "A short walk from Arts et Métiers metro. Eat in or take away.",
    },
  },
  menuPage: {
    title: "Menu",
    lede: "Specialty coffee, ceremonial matcha, organic teas and homemade pastries.",
    all: "Full menu",
    categoriesLabel: "Menu categories",
    extrasTitle: "Extras",
    extrasNote: "Depending on the drink, just ask at the counter.",
    print: "Print the menu",
    footnote: "The menu changes with the seasons. For allergen information, please ask the team at the counter.",
    flavors: "Flavours",
    photoOf: "Photo",
    favoritesLink: "Our favourites in pictures",
  },
  favoritesPage: {
    title: "Favourites",
    lede: "A selection, not a ranking: the drinks and bakes we love to share, hot, iced or crunchy.",
    seeMenu: "See the full menu",
    count: "{n} favourites",
  },
  cafePage: {
    title: "The café",
    lede: "A bright, quiet room at 27 rue des Gravilliers. A few pictures before you visit.",
    space: {
      title: "The space",
      text: "White walls, natural wood, long benches and round tables. Large panels of hanging linen filter the light coming through the window.",
    },
    gestures: {
      title: "At the counter",
      text: "Everything is made in front of you: matcha being poured, milk being steamed, a pattern taking shape on the surface of the cup.",
    },
    objects: {
      title: "On the shelves",
      text: "Cups, bowls and tools to make coffee and matcha at home, between a couple of green plants.",
    },
    gallery: {
      title: "Gallery",
      filters: { all: "All", lieu: "The space", gestes: "At the counter", table: "At the table", patisserie: "Pastries" },
      open: "Enlarge photo",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
      counter: "Photo {n} of {total}",
      filterLabel: "Filter the gallery",
    },
  },
  storyPage: {
    title: "Our story",
    lede: "A neighbourhood coffee shop opened in July 2024, where calm and precision are a way of welcoming people.",
    chapters: [
      {
        kicker: "Chapter 01",
        title: "An address in the Marais",
        text: [
          "Moonlight opened in July 2024 at 27 rue des Gravilliers, in the Upper Marais, between Arts et Métiers and Beaubourg.",
          "A narrow street lined with small shops, in an area often described as Paris's first Chinatown.",
        ],
      },
      {
        kicker: "Chapter 02",
        title: "A taste for things done well",
        text: [
          "The coffee comes from Fève, a specialty roaster. The matcha is organic ceremonial grade from Uji, Japan, sifted before every drink.",
          "Hot drinks come with latte art, and the pastries are homemade.",
        ],
      },
      {
        kicker: "Chapter 03",
        title: "Inspired from afar",
        text: [
          "The space draws on Japanese and Korean coffee shops: pale tones, natural wood, linen, few objects but well chosen ones.",
          "The beige hues are a nod to the moon. The tableware is lovely, the music stays soft.",
        ],
      },
      {
        kicker: "Chapter 04",
        title: "Moonlight, every day",
        text: [
          "From 8:30am on weekdays and 9:30am at weekends. An espresso at the counter, an iced matcha to go, or an hour at a table with a cookie.",
          "On the shelves, cups and tools to carry the ritual home.",
        ],
      },
    ],
    founderLine: "The project is led by {name}, a former barista who grew up in the neighbourhood.",
    closing: "The rest of the story happens at the counter.",
  },
  visitPage: {
    title: "Find us",
    lede: "In the heart of the Upper Marais, a short walk from Arts et Métiers metro.",
    getThere: "Getting here",
    onSite: "Eat in or take away.",
    map: {
      title: "Map",
      consentText:
        "The interactive map is provided by Google Maps. When it loads, Google may set cookies and collect data about your browsing.",
      load: "Show the map",
      remember: "Your choice is saved on this device. You can withdraw it on the Cookies page.",
      iframeTitle: "Google Maps view of Moonlight Café",
    },
    emailText: "A question or a project? Write to us.",
    instagramText: "New drinks and what's on the counter.",
    exceptionsNote: "On public holidays, check Instagram before you come.",
  },
  notFound: {
    title: "This page wandered off in the moonlight.",
    text: "The address may be wrong, or the page has moved. The menu and opening hours are right where they should be.",
    home: "Back to home",
  },
  footer: {
    tagline: "Specialty coffee and matcha, Upper Marais, Paris 3rd.",
    visit: "Visit",
    explore: "Explore",
    follow: "Follow",
    legal: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies",
    rights: "All rights reserved.",
    backTop: "Back to top",
  },
  legalCommon: {
    pending:
      "This document is awaiting validation. Publisher details will be completed with the café's operator before going live.",
    toComplete: "To be completed",
    toVerify: "to be checked",
    updated: "Last updated",
  },
  cookiesPage: {
    mapsState: "Google Maps",
    allowed: "Allowed on this device",
    notAllowed: "Not allowed",
    revoke: "Withdraw consent",
    allow: "Allow",
  },
};
