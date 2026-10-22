import { chromium } from "playwright-core";
// Usage : npm run build && npm run start, puis : CHROME_PATH=/chemin/vers/chrome node scripts/qa.mjs http://localhost:3000
const BASE = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const results = [];
const ok = (name, pass, info = "") => { results.push([pass ? "PASS" : "FAIL", name, info]); };
const errorsAll = [];
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errorsAll.push(`${p.url()} pageerror ${e.message}`));
  p.on("console", (m) => { if (m.type() === "error" && !/google|maps|gstatic|ERR_|net::/.test(m.text())) errorsAll.push(`${p.url()} console ${m.text().slice(0, 200)}`); });
  await p.addInitScript(() => sessionStorage.setItem("ml-intro", "1"));
  return p;
}
const routes = ["/", "/la-carte", "/nos-favoris", "/le-cafe", "/notre-histoire", "/nous-trouver", "/mentions-legales", "/confidentialite", "/cookies",
  "/en", "/en/menu", "/en/favourites", "/en/the-cafe", "/en/our-story", "/en/find-us", "/en/legal-notice", "/en/privacy", "/en/cookies"];

// 1. Every route: status, title, h1, lang, canonical, hreflang, images alt, broken images, internal links
const links = new Set();
const page = await newPage();
for (const r of routes) {
  const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const d = await page.evaluate(async () => {
    // scroll to load lazy images
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    await new Promise((r) => setTimeout(r, 800));
    const imgs = [...document.images];
    return {
      title: document.title, lang: document.documentElement.lang,
      h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
      canonical: document.querySelector('link[rel=canonical]')?.href,
      alternates: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.hreflang),
      desc: document.querySelector('meta[name=description]')?.content?.length ?? 0,
      og: !!document.querySelector('meta[property="og:image"]'),
      noAlt: imgs.filter((i) => !i.hasAttribute("alt")).length,
      broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src).slice(0, 3),
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      jsonld: !!document.querySelector('script[type="application/ld+json"]'),
    };
  });
  d.links.forEach((l) => links.add(l));
  ok(`route ${r}`, res.status() === 200 && d.h1.length === 1 && d.noAlt === 0 && d.broken.length === 0 && d.overflow <= 0 && d.alternates.length === 3 && d.desc > 50 && d.og && d.jsonld && d.lang === (r.startsWith("/en") ? "en" : "fr"),
    `status=${res.status()} h1=${d.h1.length} noAlt=${d.noAlt} broken=${d.broken.join(",")} overflow=${d.overflow} hreflang=${d.alternates.join("/")} title="${d.title}"`);
}
// 2. internal links resolve
for (const l of links) {
  if (!l.startsWith("/")) continue;
  const path = l.split("#")[0] || "/";
  const res = await page.request.get(BASE + path);
  if (res.status() !== 200) ok(`link ${l}`, false, `status ${res.status()}`);
}
ok(`internal links checked (${[...links].filter((l) => l.startsWith("/")).length})`, true);
const external = [...links].filter((l) => /^(https?:|mailto:)/.test(l));
ok("external links", external.every((l) => /instagram\.com\/moonlight\.cafe\.paris|google\.com\/maps|mailto:moonlightcafeparis@gmail\.com|vercel\.com/.test(l)), [...new Set(external)].join(" | "));

// 3. 404
for (const r of ["/inexistant", "/en/nothing"]) {
  const res = await page.goto(BASE + r);
  ok(`404 ${r}`, res.status() === 404 && (await page.locator("h1").count()) === 1, `status=${res.status()}`);
}

// 4. Menu tabs & prices
await page.goto(BASE + "/la-carte", { waitUntil: "networkidle" });
await page.getByRole("tab", { name: "Matcha" }).click();
await page.waitForTimeout(900);
const cats = await page.locator("[data-menu-category] h2").allTextContents();
ok("menu tab Matcha filters", cats[0] === "Matcha" && !cats.includes("Classiques"), cats.join(","));
ok("menu hash updated", page.url().endsWith("#matcha"), page.url());
const prices = await page.evaluate(() => [...document.querySelectorAll("#menu-panel li")].map((l) => l.textContent.replace(/\s+/g, " ").trim()));
ok("strawberry price 6,80", prices.some((p) => /Iced Strawberry Matcha Latte.*6,80/.test(p)), prices.slice(0, 6).join(" | "));
await page.getByRole("tab", { name: "Toute la carte" }).click(); await page.waitForTimeout(600);
const count = await page.locator("#menu-panel li").count();
ok("full menu items (33 produits + 5 suppléments)", count === 38, `count=${count}`);
await page.goto(BASE + "/la-carte#patisseries", { waitUntil: "networkidle" }); await page.waitForTimeout(1200);
const c2 = await page.locator("[data-menu-category] h2").first().textContent();
ok("deep link #patisseries selects tab", c2 === "Pâtisseries", c2);

// 5. Gallery lightbox
await page.goto(BASE + "/le-cafe", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Les gestes" }).click(); await page.waitForTimeout(800);
const n = await page.locator("#main ul li button").count();
await page.locator("#main ul li button").first().click(); await page.waitForTimeout(700);
const dlg = page.getByRole("dialog");
const c1 = await dlg.locator("[aria-live]").textContent();
await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400);
const c3 = await dlg.locator("[aria-live]").textContent();
await page.keyboard.press("Escape"); await page.waitForTimeout(400);
ok("gallery filter + lightbox + keyboard", n === 4 && /1 sur 4/.test(c1) && /2 sur 4/.test(c3) && (await page.getByRole("dialog").count()) === 0, `n=${n} ${c1} -> ${c3}`);

// 6. Map consent
await page.goto(BASE + "/nous-trouver", { waitUntil: "networkidle" });
const before = await page.locator("iframe").count();
await page.getByRole("button", { name: "Afficher le plan" }).click(); await page.waitForTimeout(500);
const after = await page.locator("iframe").count();
await page.goto(BASE + "/cookies", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
const state = await page.getByText("Autorisé sur cet appareil").count();
await page.getByRole("button", { name: "Retirer mon accord" }).click(); await page.waitForTimeout(300);
await page.goto(BASE + "/nous-trouver", { waitUntil: "networkidle" });
const after2 = await page.locator("iframe").count();
ok("map loads only after consent, revocable", before === 0 && after === 1 && state === 1 && after2 === 0, `${before}/${after}/${state}/${after2}`);

// 7. Page transition navigation
await page.goto(BASE + "/", { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
await page.locator("header nav").getByRole("link", { name: "Le café" }).click();
await page.waitForURL("**/le-cafe", { timeout: 5000 }); await page.waitForTimeout(1600);
const vis = await page.evaluate(() => getComputedStyle(document.querySelector("[data-transition-overlay]")).visibility);
ok("client navigation with transition", page.url().endsWith("/le-cafe") && vis === "hidden" && (await page.locator("h1").textContent()) === "Le café", `overlay=${vis}`);

// 8. Lang switch
await page.goto(BASE + "/la-carte", { waitUntil: "networkidle" });
const hrefEn = await page.locator('header a[hreflang="en"]').getAttribute("href");
ok("lang switch targets equivalent page", hrefEn === "/en/menu", hrefEn);

// 9. Mobile menu
const m = await newPage({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
await m.goto(BASE + "/", { waitUntil: "networkidle" }); await m.waitForTimeout(2500);
await m.getByRole("button", { name: "Ouvrir le menu" }).click(); await m.waitForTimeout(900);
const inert = await m.evaluate(() => document.querySelector("main").hasAttribute("inert"));
const focused = await m.evaluate(() => document.activeElement?.textContent);
await m.keyboard.press("Escape"); await m.waitForTimeout(600);
const closed = await m.evaluate(() => !document.querySelector("main").hasAttribute("inert"));
await m.getByRole("button", { name: "Ouvrir le menu" }).click(); await m.waitForTimeout(900);
await m.locator("#mobile-menu").getByRole("link", { name: "La carte" }).click();
await m.waitForURL("**/la-carte", { timeout: 5000 }); await m.waitForTimeout(1500);
const ov = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
ok("mobile menu: inert, focus, Esc, navigation", inert && focused === "Accueil" && closed && m.url().endsWith("/la-carte") && ov <= 0, `focus=${focused} overflow=${ov}`);

// 10. Reduced motion: everything visible, no intro
const rm = await newPage({ reducedMotion: "reduce" });
await rm.goto(BASE + "/", { waitUntil: "networkidle" }); await rm.waitForTimeout(600);
const hidden = await rm.evaluate(() => {
  const cls = document.documentElement.className;
  const bad = [...document.querySelectorAll("[data-anim], .line-inner, h1, h2, p")].filter((e) => !e.closest("[aria-hidden=true]")).filter((e) => { const s = getComputedStyle(e); return s.opacity === "0" || s.visibility === "hidden"; }).length;
  return { cls, bad, pins: document.querySelectorAll(".pin-spacer").length };
});
ok("reduced motion: no hidden content, no pin, no intro", hidden.bad === 0 && hidden.pins === 0 && !/intro|motion\b/.test(hidden.cls.replace("motion-failsafe", "")), JSON.stringify(hidden));

// 11. Intro plays once
const ip = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const t0 = Date.now();
await ip.goto(BASE + "/", { waitUntil: "domcontentloaded" });
const introOn = await ip.evaluate(() => document.documentElement.classList.contains("intro"));
await ip.waitForFunction(() => !document.documentElement.classList.contains("intro"), null, { timeout: 6000 });
const dur = Date.now() - t0;
await ip.reload({ waitUntil: "domcontentloaded" });
const introAgain = await ip.evaluate(() => document.documentElement.classList.contains("intro"));
ok("intro plays once per session, short", introOn && !introAgain && dur < 3500, `duration≈${dur}ms`);

// 12. Keyboard: skip link
const kb = await newPage();
await kb.goto(BASE + "/la-carte", { waitUntil: "networkidle" });
await kb.keyboard.press("Tab");
const skip = await kb.evaluate(() => document.activeElement?.textContent);
ok("skip link first in tab order", skip === "Aller au contenu", skip);

console.log(results.map((r) => r.join("  ")).join("\n"));
console.log("\nJS errors:", errorsAll.length ? [...new Set(errorsAll)].slice(0, 10).join("\n") : "none");
await browser.close();
