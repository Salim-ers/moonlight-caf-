import type { Dictionary } from "./fr";

/** Site copy — English version. Mirrors `fr.ts` key by key. */
export const en: Dictionary = {
  meta: {
    siteTitle: "Moonlight Café — Creative coffee shop, coffee & matcha in the Marais, Paris",
    siteDescription:
      "Creative coffee shop at 27 rue des Gravilliers, Paris 3rd: specialty coffee roasted by Fève, organic matcha, colourful drinks, homemade cookies and pastries. Open every day.",
    pages: {
      home: {
        title: "Moonlight Café — Creative coffee shop, coffee & matcha in the Marais, Paris",
        description:
          "Specialty coffee, organic matcha whisked to order, colourful drinks, homemade cookies and pastries in the Upper Marais. 27 rue des Gravilliers, Paris 3rd. Open every day.",
      },
      menu: {
        title: "Menu — coffee, matcha, tea and pastries",
        description:
          "The full Moonlight Café menu: espresso, flat white, matcha latte, Iced Strawberry Matcha, Blue Latte, organic teas, homemade cookies. Prices and extras.",
      },
      favorites: {
        title: "Our favourites — the Moonlight selection",
        description:
          "Iced Strawberry Matcha Latte, Matcha Latte, Blue Latte, homemade cookies: the drinks and treats we recommend at Moonlight Café, Paris 3rd.",
      },
      cafe: {
        title: "The café — wooden benches and daylight in the Upper Marais",
        description: "Wooden benches, round tables, hanging linen and a large window: take a look inside Moonlight Café, rue des Gravilliers, Paris 3rd.",
      },
      story: {
        title: "Our story — a coffee shop opened in 2024 in the Marais",
        description:
          "Opened in July 2024 on rue des Gravilliers, Moonlight Café brings together specialty coffee roasted by Fève, organic matcha made to order and homemade pastries.",
      },
      visit: {
        title: "Find us — address, opening hours and directions",
        description:
          "Moonlight Café, 27 rue des Gravilliers, 75003 Paris. Arts et Métiers metro. Monday to Friday 8:30am–5:30pm, Saturday and Sunday 9:30am–6pm.",
      },
      legal: {
        title: "Legal notice",
        description:
          "Legal notice for the Moonlight Café website, coffee shop at 27 rue des Gravilliers, Paris 3rd: publisher, host and intellectual property.",
      },
      privacy: {
        title: "Privacy policy",
        description: "How the Moonlight Café website handles your personal data: no analytics, no forms, your GDPR rights.",
      },
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
    language: "Language",
  },
  nav: {
    home: "Home",
    menu: "Menu",
    favorites: "Favourites",
    cafe: "The café",
    story: "Our story",
    visit: "Find us",
  },
  common: {
    directions: "Directions",
    openInMaps: "Open in Google Maps",
    copyAddress: "Copy address",
    copied: "Address copied",
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
    menuLabel: "Menu",
    close: "Close",
    marquee: ["Coffee", "Matcha", "Cookies", "Good moments"],
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
      eyebrow: "Creative coffee shop · Upper Marais, Paris",
      title: ["Your break,", "in full", "colour."],
      lede: "Specialty coffee, matcha whisked to order, colourful drinks and homemade cookies. At 27 rue des Gravilliers.",
    },
    universe: {
      eyebrow: "The Moonlight world",
      statement: "A small spot in the Upper Marais: good coffee, matcha whisked to order, a homemade cookie. And plenty of light.",
      facts: [
        { label: "Since", value: "July 2024" },
        { label: "Coffee", value: "Roasted by Fève" },
        { label: "Matcha", value: "Organic, ceremonial" },
        { label: "Open", value: "7 days a week" },
      ],
      caption: "The lettering above the counter, rue des Gravilliers.",
    },
    signatures: {
      eyebrow: "Signatures",
      title: ["Six drinks & treats", "to try first."],
      text: "Our pick for a first visit: matcha in every form, a blue latte, a big cookie.",
      table: "The Moonlight table",
      tableCaption: "Lattes, matcha, cookies and pastries, seen from above.",
      drag: "Drag",
      cta: "Favourites in pictures",
    },
    matcha: {
      eyebrow: "Matcha moment",
      title: ["Matcha,", "whisked to order."],
      text: "Organic ceremonial matcha, sifted then whisked for every order. Served hot with a pattern on top, or poured over iced milk.",
      steps: [
        { title: "Sift", text: "The powder goes through a sieve, so the drink stays smooth." },
        { title: "Whisk", text: "Into a fine, tight, deep-green foam." },
        { title: "Pour", text: "Over warm milk with a pattern, or over ice-cold milk." },
      ],
      caption1: "The gesture: frothy matcha poured over an iced drink.",
      caption2: "Matcha latte, seen from above.",
      cta: "Matcha drinks",
    },
    colors: {
      eyebrow: "Coffee & colors",
      title: ["Here, every cup", "has its colour."],
      hint: "Pick a colour",
      options: [
        { key: "violet", word: "Purple", label: "A seasonal creation", detail: "The purple drink changes with the seasons: ask for it at the counter." },
        { key: "matcha", word: "Matcha", label: "Matcha Latte", detail: "Organic ceremonial matcha, warm milk and latte art." },
        { key: "bleu", word: "Blue", label: "Blue Latte", detail: "A bold blue milky drink, coffee-free." },
        { key: "cafe", word: "Coffee", label: "Coffee side", detail: "Specialty coffee roasted by Fève, dusted at the very last moment." },
      ],
      cta: "The full menu",
    },
    sweet: {
      eyebrow: "The sweet side",
      title: ["The sweet", "side."],
      text: "Thick cookies, crisp at the edge and soft in the middle, sliced cakes and a granola bowl for slow mornings. Homemade pastries.",
      flavorsTitle: "Cookies on the menu",
      cta: "See the pastries",
    },
    feeling: {
      eyebrow: "The Moonlight feeling",
      title: ["Sit down.", "Come back."],
      text: "Long wooden benches, round tables, large linen panels softening the light. Come alone with a book or with friends, for an hour or five minutes.",
      cta: "Step inside the café",
    },
    social: {
      eyebrow: "Community",
      text: "New creations, today's window and the light in the café, day after day.",
      cta: "Follow on Instagram",
    },
    hello: {
      eyebrow: "Come say hello",
      title: ["Come say", "hello."],
      text: "A short walk from Arts et Métiers metro. Eat in or take away.",
      stamp: "27 rue des Gravilliers · Paris 3rd · ",
    },
  },
  menuPage: {
    title: "Menu",
    tagline: "coffee, matcha & sweet things",
    lede: "Specialty coffee roasted by Fève, organic ceremonial matcha, organic teas and homemade pastries.",
    categoriesLabel: "Menu categories",
    items: "{n} items",
    categories: "{n} categories",
    extrasTitle: "Extras",
    extrasNote: "Depending on the drink, ask at the counter.",
    print: "Print the menu",
    footnote: "The menu changes with the seasons. Allergens: the team will be happy to help at the counter.",
    flavors: "Flavours",
    favoritesLink: "Our favourites in pictures",
  },
  favoritesPage: {
    title: "Our favourites",
    lede: "A selection, not a ranking: the drinks and treats we love to share, hot, iced or to bite into.",
    count: "{n} favourites",
    index: "Contents",
    seeMenu: "See the full menu",
    closing: ["And there's", "the whole menu."],
    noPhoto: "Photo coming soon — try it at the counter",
  },
  cafePage: {
    title: "The café",
    tagline: "daylight, blond wood",
    lede: "A bright, warm place at 27 rue des Gravilliers. A few pictures before you come.",
    space: {
      title: "The space",
      text: "White walls, natural wood, long benches and round tables. Large hanging linen panels filter the light coming through the window.",
    },
    gestures: {
      title: "The gestures",
      text: "At the counter, everything is made in front of you: matcha being poured, milk being steamed, a pattern forming on the surface of the cup.",
    },
    objects: {
      title: "On the shelves",
      text: "Cups, bowls and accessories to make coffee and matcha at home, between two green plants.",
    },
    window: {
      title: "By the window",
      text: "The tables by the window catch the light: an iced matcha, the Moonlight coffee bag, and the street behind.",
    },
    gallery: {
      open: "Enlarge photo",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
      counter: "Photo {n} of {total}",
    },
  },
  storyPage: {
    title: "Our story",
    tagline: "since July 2024",
    lede: "A neighbourhood coffee shop, opened in July 2024 on rue des Gravilliers, where every drink is made with the same care.",
    chapters: [
      {
        kicker: "The address",
        title: "A small place, a lot of care.",
        text: [
          "Moonlight opened in July 2024 at 27 rue des Gravilliers, in the Upper Marais, between Arts et Métiers and Beaubourg.",
          "A narrow street lined with small shops, a white shopfront, a large window and, on the wall, a line drawing.",
        ],
      },
      {
        kicker: "The counter",
        title: "Good things take shape here.",
        text: [
          "The coffee comes from Fève, a specialty roaster. The matcha is organic and ceremonial grade, sifted before every drink.",
          "Hot drinks come with latte art; iced drinks are built in layers, right in front of you.",
        ],
      },
      {
        kicker: "The window",
        title: "A taste for detail.",
        text: ["The pastries are homemade: big cookies, sliced cakes, a granola bowl.", "They line up in the window, near the entrance."],
      },
      {
        kicker: "The place",
        title: "A café you live as much as you taste.",
        text: [
          "From 8:30am on weekdays, 9:30am at weekends. An espresso at the counter, an iced matcha to go or an hour at a table with a cookie.",
          "On the shelves, cups and accessories to take the moment home.",
        ],
      },
    ],
    founderLine: "The project is led by {name}, a former barista who grew up in the neighbourhood.",
    closing: ["The rest of the story", "happens at the counter."],
  },
  visitPage: {
    title: "Find us",
    tagline: "rue des Gravilliers",
    lede: "In the heart of the Upper Marais, a few steps from Arts et Métiers metro.",
    getThere: "Getting here",
    onSite: "Eat in or take away.",
    map: {
      title: "Map",
      consentText: "The interactive map is provided by Google Maps. When you display it, Google may set cookies and collect data about your browsing.",
      load: "Show the map",
      remember: "Your choice is saved on this device. You can withdraw it on the Cookies page.",
      iframeTitle: "Google Maps view of Moonlight Café",
    },
    emailText: "A question, a project? Write to us.",
    instagramText: "New creations and what's on today.",
    exceptionsNote: "Bank holidays: check Instagram before you come.",
  },
  notFound: {
    title: "This page is on a coffee break.",
    text: "The address may be wrong, or the page has moved. The menu and opening hours are still right here.",
    home: "Back to home",
  },
  footer: {
    tagline: "Creative coffee shop — specialty coffee, matcha and homemade pastries. Upper Marais, Paris 3rd.",
    invite: ["Coffee break?", "We're waiting."],
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
    pending: "Document awaiting validation. The publisher's details will be completed with the café's operator before going live.",
    toComplete: "To be completed",
    toVerify: "to be verified",
    updated: "Last updated",
  },
  cookiesPage: {
    mapsState: "Google Maps view",
    allowed: "Allowed on this device",
    notAllowed: "Not allowed",
    revoke: "Withdraw consent",
    allow: "Allow",
  },
};
