/**
 * Recette fonctionnelle automatisée — Moonlight Café V2.
 * Usage : npm run build && npm run start, puis :
 *   CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" node scripts/qa.mjs http://localhost:3000
 */
import { chromium, firefox, webkit } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3000";
// BROWSER=webkit (moteur de Safari) ou BROWSER=firefox ; par défaut Chrome (CHROME_PATH)
const ENGINE = process.env.BROWSER ?? "chromium";
const browser =
  ENGINE === "webkit"
    ? await webkit.launch()
    : ENGINE === "firefox"
      ? await firefox.launch()
      : await chromium.launch({ executablePath: process.env.CHROME_PATH });
console.log(`Moteur : ${ENGINE} ${browser.version()}`);
const results = [];
const ok = (name, pass, info = "") => results.push([pass ? "PASS" : "FAIL", name, info]);
const errors = [];
async function newPage(opts = {}, { boot = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await ctx.newPage();
  // le logo d'ouverture ne joue qu'une fois par visite : on le neutralise sauf pour son propre test
  if (!boot) await p.addInitScript(() => sessionStorage.setItem("ml-boot", "1"));
  // WebKit signale comme « access control » un préchargement interrompu quand le robot quitte la page aussitôt
  p.on("pageerror", (e) => {
    if (!/_rsc=.*access control checks/.test(e.message)) errors.push(`${p.url()} pageerror ${e.message}`);
  });
  p.on("console", (m) => {
    if (m.type() === "error" && !/google|maps|gstatic|ERR_|net::|404/.test(m.text())) errors.push(`${p.url()} console ${m.text().slice(0, 200)}`);
  });
  return p;
}

const routes = [
  "/",
  "/la-carte",
  "/nos-favoris",
  "/le-cafe",
  "/notre-histoire",
  "/nous-trouver",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
  "/en",
  "/en/menu",
  "/en/favourites",
  "/en/the-cafe",
  "/en/our-story",
  "/en/find-us",
  "/en/legal-notice",
  "/en/privacy",
  "/en/cookies",
];
const pair = {
  "/": "home",
  "/en": "home",
  "/la-carte": "menu",
  "/en/menu": "menu",
  "/nos-favoris": "favorites",
  "/en/favourites": "favorites",
  "/le-cafe": "cafe",
  "/en/the-cafe": "cafe",
  "/notre-histoire": "story",
  "/en/our-story": "story",
  "/nous-trouver": "visit",
  "/en/find-us": "visit",
};

// 1. Toutes les pages : statut, h1 unique, langue, SEO, images, débordement, CJK, photos utilisées
const links = new Set();
const photoPages = new Map();
const page = await newPage();
for (const r of routes) {
  const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
  const d = await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    await new Promise((r) => setTimeout(r, 600));
    // toutes les photos doivent finir de charger (jusqu'à 8 s)
    for (let t = 0; t < 40 && [...document.images].some((i) => !i.complete); t++) await new Promise((r) => setTimeout(r, 200));
    const imgs = [...document.images];
    const photos = [...new Set(imgs.map((i) => decodeURIComponent(i.currentSrc || i.src).match(/\/img\/(\d\d-[a-z0-9-]+)\./)?.[1]).filter(Boolean))];
    return {
      lang: document.documentElement.lang,
      h1: document.querySelectorAll("h1").length,
      alternates: document.querySelectorAll("link[rel=alternate][hreflang]").length,
      desc: document.querySelector("meta[name=description]")?.content?.length ?? 0,
      og: !!document.querySelector('meta[property="og:image"]'),
      jsonld: !!document.querySelector('script[type="application/ld+json"]'),
      noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
      broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      cjk: /[\u3040-\u30ff\u3400-\u9fff]/.test(document.body.innerText),
      asianRefs: /japonais|coréen|chinois|japanese|korean|chinese/i.test(document.body.innerText),
      tropes: /fig\. 0\d|Défiler|Scroll|0\d \/ 0\d/.test(document.body.innerText),
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      photos,
    };
  });
  d.links.forEach((l) => links.add(l));
  d.photos.forEach((ph) => {
    const set = photoPages.get(ph) ?? new Set();
    set.add(pair[r] ?? r);
    photoPages.set(ph, set);
  });
  ok(
    `page ${r}`,
    res.status() === 200 &&
      d.h1 === 1 &&
      d.lang === (r.startsWith("/en") ? "en" : "fr") &&
      d.alternates === 3 &&
      d.desc > 50 &&
      d.og &&
      d.jsonld &&
      !d.noAlt &&
      !d.broken &&
      d.overflow <= 0 &&
      !d.cjk &&
      !d.asianRefs &&
      !d.tropes,
    `status=${res.status()} h1=${d.h1} hreflang=${d.alternates} noAlt=${d.noAlt} broken=${d.broken} overflow=${d.overflow} cjk=${d.cjk} refs=${d.asianRefs} tropes=${d.tropes} photos=${d.photos.length}`,
  );
}
const dup = [...photoPages].filter(([, s]) => s.size > 1);
ok(
  `photos : ${photoPages.size}/26 affichées, aucune sur deux pages`,
  photoPages.size === 26 && dup.length === 0,
  dup.map(([p, s]) => `${p}:${[...s]}`).join(" "),
);

// 2. Liens internes et externes
let bad = 0;
for (const l of links) {
  if (!l.startsWith("/")) continue;
  const res = await page.request.get(BASE + (l.split("#")[0] || "/"));
  if (res.status() !== 200) {
    bad++;
    ok(`lien ${l}`, false, `status ${res.status()}`);
  }
}
ok(`liens internes (${[...links].filter((l) => l.startsWith("/")).length})`, bad === 0);
const external = [...new Set([...links].filter((l) => /^(https?:|mailto:)/.test(l)))];
ok(
  "liens externes (Instagram, Google Maps, e-mail, Vercel)",
  external.every((l) => /instagram\.com\/moonlight\.cafe\.paris|google\.com\/maps|mailto:moonlightcafeparis@gmail\.com|vercel\.com/.test(l)),
  external.join(" | "),
);

// 3. 404
for (const r of ["/inexistant", "/en/nothing"]) {
  const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
  const lang = await page.evaluate(() => document.documentElement.lang);
  ok(`404 ${r}`, res?.status() === 404 && lang === (r.startsWith("/en") ? "en" : "fr"), `status=${res?.status()} lang=${lang}`);
}

// 4. Transition de page : logo officiel complet, centré, non recadré, rapide
{
  const p = await newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const t0 = Date.now();
  await p.click('header a[href="/la-carte"]');
  await p.waitForTimeout(160);
  const logo = await p.evaluate(() => {
    const img = document.querySelector(".pt .pt-logo");
    const r = img.getBoundingClientRect();
    return {
      state: document.querySelector(".pt").dataset.state,
      src: img.getAttribute("src"),
      fit: getComputedStyle(img).objectFit,
      ratio: r.width / r.height,
      natural: img.naturalWidth / img.naturalHeight,
      inside: r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight,
      dx: Math.abs(r.left + r.width / 2 - innerWidth / 2),
      dy: Math.abs(r.top + r.height / 2 - innerHeight / 2),
    };
  });
  ok(
    "transition : logo complet affiché, centré, ratio d'origine",
    logo.state !== "idle" &&
      /moonlight-logo\.webp/.test(logo.src) &&
      logo.fit === "contain" &&
      Math.abs(logo.ratio - logo.natural) < 0.02 &&
      logo.inside &&
      logo.dx < 2 &&
      logo.dy < 2,
    JSON.stringify(logo),
  );
  await p.waitForFunction(() => document.querySelector(".pt").dataset.state === "idle" && location.pathname === "/la-carte", null, { timeout: 4000 });
  const ms = Date.now() - t0;
  const after = await p.evaluate(() => ({ h1: document.querySelector("h1").textContent, focus: document.activeElement?.id, title: document.title }));
  ok(
    "transition : arrivée sur /la-carte, focus sur le contenu",
    /La carte/.test(after.h1) && after.focus === "main" && /La carte/.test(after.title),
    `${ms} ms`,
  );
  ok("transition : durée totale < 900 ms", ms < 900, `${ms} ms`);
  await p.goBack();
  await p.waitForFunction(() => location.pathname === "/", null, { timeout: 4000 });
  ok("bouton Précédent du navigateur", (await p.evaluate(() => document.querySelector("h1").textContent)).includes("pause"));
}

// 5. Menu mobile
{
  const p = await newPage({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.click('button[aria-controls="mobile-menu"]');
  await p.waitForTimeout(500);
  const open = await p.evaluate(() => ({
    inert: document.getElementById("main").hasAttribute("inert"),
    focusInMenu: !!document.activeElement?.closest("#mobile-menu"),
    logo: !!document.querySelector('header img[src*="moonlight-logo"]'),
  }));
  ok("menu mobile : ouverture, contenu inerte, focus dans le menu, logo complet", open.inert && open.focusInMenu && open.logo);
  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  const closed = await p.evaluate(() => ({
    expanded: document.querySelector('button[aria-controls="mobile-menu"]').getAttribute("aria-expanded"),
    focusToggle: document.activeElement?.getAttribute("aria-controls") === "mobile-menu",
    inert: document.getElementById("main").hasAttribute("inert"),
  }));
  ok("menu mobile : Échap ferme et rend le focus au bouton", closed.expanded === "false" && closed.focusToggle && !closed.inert);
  await p.click('button[aria-controls="mobile-menu"]');
  await p.waitForTimeout(500);
  await p.click('#mobile-menu a[href="/nous-trouver"]');
  await p.waitForFunction(() => location.pathname === "/nous-trouver" && document.querySelector(".pt").dataset.state === "idle", null, { timeout: 4000 });
  ok("menu mobile : navigation", true);
}

// 6. Langue
{
  const p = await newPage();
  await p.goto(BASE + "/la-carte", { waitUntil: "networkidle" });
  const target = await p.getAttribute("header a[hreflang=en]", "href");
  ok("sélecteur de langue → page équivalente", target === "/en/menu", target);
}

// 7. Carte
{
  const p = await newPage();
  await p.goto(BASE + "/la-carte#patisseries", { waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  const d = await p.evaluate(() => ({
    cats: document.querySelectorAll("section[data-menu-category]").length,
    items: document.querySelectorAll(".menu-item").length,
    extras: document.querySelectorAll("#extras-title ~ ul li, [aria-labelledby=extras-title] ul li").length,
    strawberry: [...document.querySelectorAll(".menu-item")].find((li) => li.textContent.includes("Iced Strawberry"))?.textContent.includes("6,80"),
    deepLink: Math.abs(document.getElementById("patisseries").getBoundingClientRect().top) < 200,
    photos: document.querySelectorAll('main img[src*="/img/"]').length,
  }));
  ok(
    "carte : 6 catégories, 33 produits, 5 suppléments, prix exacts, lien profond",
    d.cats === 6 && d.items === 33 && d.extras === 5 && d.strawberry && d.deepLink && d.photos === 1,
    JSON.stringify(d),
  );
}

// 8. Favoris : compteur et numérotation générés depuis les données
{
  const p = await newPage();
  await p.goto(BASE + "/nos-favoris", { waitUntil: "networkidle" });
  const d = await p.evaluate(() => ({
    items: document.querySelectorAll("li.fav").length,
    names: [...document.querySelectorAll("li.fav h2")].map((h) => h.textContent.trim()),
    count: document.body.innerText.match(/(\d+)\s+CRÉATIONS/i)?.[1],
  }));
  ok("favoris : 6 créations affichées, compteur « 6 créations » généré", d.items === 6 && d.count === "6" && d.names.length === 6, JSON.stringify(d));
}

// 8 bis. Logo d'ouverture : une fois par visite, logo complet, ne bloque pas
{
  const p = await newPage({}, { boot: true });
  await p.goto(BASE + "/", { waitUntil: "commit" });
  await p.waitForTimeout(350);
  const during = await p.evaluate(() => {
    const img = document.querySelector(".pt .pt-logo");
    const cs = getComputedStyle(document.querySelector(".pt"));
    return {
      boot: document.documentElement.classList.contains("boot"),
      visible: cs.visibility === "visible" && Number(cs.opacity) > 0.9,
      pe: cs.pointerEvents,
      src: img?.getAttribute("src"),
    };
  });
  await p.waitForTimeout(1300);
  const after = await p.evaluate(() => getComputedStyle(document.querySelector(".pt")).visibility === "hidden");
  await p.reload({ waitUntil: "commit" });
  await p.waitForTimeout(200);
  const again = await p.evaluate(() => document.documentElement.classList.contains("boot"));
  ok(
    "ouverture : logo complet ≈ 1 s, non bloquant, une seule fois par visite",
    during.boot && during.visible && during.pe === "none" && /moonlight-logo/.test(during.src) && after && !again,
    JSON.stringify({ during, after, again }),
  );
}

// 9. Visionneuse
{
  const p = await newPage();
  await p.goto(BASE + "/le-cafe", { waitUntil: "networkidle" });
  await p.click(".lb-trigger >> nth=0");
  await p.waitForTimeout(400);
  await p.keyboard.press("ArrowRight");
  await p.waitForTimeout(300);
  const counter = await p.evaluate(() => document.querySelector(".lightbox p")?.textContent);
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  ok("visionneuse : ouverture, flèche, Échap", counter === "Photo 2 sur 6" && !(await p.$(".lightbox")), counter);
}

// 10. Plan Google Maps avec consentement
{
  const p = await newPage();
  await p.goto(BASE + "/nous-trouver", { waitUntil: "networkidle" });
  const before = await p.$$eval("iframe", (f) => f.length);
  await p.click("text=Afficher le plan");
  await p.waitForTimeout(400);
  const after = await p.$$eval("iframe", (f) => f.length);
  await p.goto(BASE + "/cookies", { waitUntil: "networkidle" });
  const state = await p.textContent("text=Autorisé sur cet appareil").catch(() => null);
  await p.click("text=Retirer mon accord");
  await p.goto(BASE + "/nous-trouver", { waitUntil: "networkidle" });
  const revoked = await p.$$eval("iframe", (f) => f.length);
  ok("plan : aucun iframe avant accord, iframe après, retrait effectif", before === 0 && after === 1 && !!state && revoked === 0);
}

// 11. Animations réduites
{
  const p = await newPage({ reducedMotion: "reduce" });
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const d = await p.evaluate(() => ({
    motion: document.documentElement.classList.contains("js-motion"),
    hidden: [...document.querySelectorAll("[data-reveal]")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
  }));
  await p.click('header a[href="/le-cafe"]');
  await p.waitForTimeout(100);
  const overlay = await p.evaluate(() => getComputedStyle(document.querySelector(".pt")).visibility);
  ok("réduire les animations : rien de masqué, navigation sans voile", !d.motion && d.hidden === 0 && overlay === "hidden");
}

// 12. Clavier
{
  const p = await newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  if (ENGINE === "webkit") {
    // Safari, par défaut, ne parcourt au Tab que les boutons (réglage « Tab parcourt chaque élément » désactivé) :
    // on vérifie donc que le lien d'évitement est le premier lien du document et qu'il reçoit bien le focus.
    const d = await p.evaluate(() => {
      const first = document.querySelector("a[href]");
      first?.focus();
      return { first: first?.getAttribute("href"), focused: document.activeElement === first };
    });
    ok("clavier : lien d'évitement en premier (Safari)", d.first === "#main" && d.focused, JSON.stringify(d));
  } else {
    await p.keyboard.press("Tab");
    ok("clavier : lien d'évitement en premier", (await p.evaluate(() => document.activeElement?.getAttribute("href"))) === "#main");
  }
}

ok("aucune erreur JavaScript", errors.length === 0, errors.slice(0, 5).join(" | "));
await browser.close();
const fails = results.filter((r) => r[0] === "FAIL");
for (const [s, n, i] of results) console.log(`${s}  ${n}${i ? `  — ${i}` : ""}`);
console.log(`\n${results.length - fails.length}/${results.length} réussis`);
process.exit(fails.length ? 1 : 0);
