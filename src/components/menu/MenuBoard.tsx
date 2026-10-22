"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Printer } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/components/motion/MotionProvider";
import { menu, extras, formatPrice, type MenuCategory } from "@/data/menu-data";
import { photos } from "@/data/gallery-data";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

const EXTRAS_AFTER = "matcha";

/**
 * Carte interactive : onglets par catégorie (sans rechargement, adresse partageable
 * via l'ancre #categorie), transitions douces, vignettes rondes pour les produits
 * qui ont une vraie photo. Toute la carte s'imprime proprement.
 */
export function MenuBoard({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [active, setActive] = useState<string>("all");
  const list = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const { reduced, scrollTo } = useMotion();

  const moveIndicator = useCallback(() => {
    const btn = tabs.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!btn || !indicator.current) return;
    indicator.current.style.width = `${btn.offsetWidth}px`;
    indicator.current.style.transform = `translateX(${btn.offsetLeft}px)`;
    // recentre l'onglet actif sans déplacer le point de départ du focus clavier
    const bar = tabs.current!;
    bar.scrollTo({ left: btn.offsetLeft - bar.clientWidth / 2 + btn.offsetWidth / 2, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  useEffect(() => {
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  // ancre de l'URL → catégorie
  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (menu.some((c) => c.id === h)) {
        setActive(h);
        setTimeout(() => {
          const top = document.getElementById("carte");
          if (top) scrollTo(top, { offset: -10 });
        }, 350);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    // à l'impression, toute la carte est affichée
    const beforePrint = () => flushSync(() => setActive("all"));
    window.addEventListener("beforeprint", beforePrint);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener("beforeprint", beforePrint);
    };
  }, [scrollTo]);

  // transition entre catégories
  useEffect(() => {
    if (reduced || !list.current) return;
    const blocks = list.current.querySelectorAll("[data-menu-category]");
    gsap.fromTo(
      blocks,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, overwrite: true },
    );
  }, [active, reduced]);

  const select = (id: string) => {
    setActive(id);
    const url = id === "all" ? window.location.pathname : `${window.location.pathname}#${id}`;
    history.replaceState(null, "", url);
    const top = document.getElementById("carte");
    if (top && top.getBoundingClientRect().top < 0) scrollTo(top, { offset: -20 });
  };

  const visible: MenuCategory[] = active === "all" ? menu : menu.filter((c) => c.id === active);
  const showExtras = active === "all" || active === "classiques" || active === EXTRAS_AFTER;

  return (
    <div id="carte" className="relative">
      {/* Onglets */}
      <div className="no-print sticky top-[var(--sticky-top,0px)] z-30 transition-[top] duration-500 ease-[var(--ease-moon)] border-y border-ink/10 bg-paper/90 backdrop-blur-md">
        <div className="wrap flex items-center justify-between gap-6">
          <div
            ref={tabs}
            role="tablist"
            aria-label={t.menuPage.categoriesLabel}
            className="no-scrollbar relative -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] py-3 md:mx-0 md:px-0"
          >
            <span
              ref={indicator}
              aria-hidden="true"
              className="absolute bottom-3 left-0 top-3 -z-0 rounded-full bg-ink transition-[transform,width] duration-500 ease-[var(--ease-moon)]"
            />
            {[{ id: "all", title: { fr: t.menuPage.all, en: t.menuPage.all } }, ...menu].map((c) => {
              const selected = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  data-tab={c.id}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  onClick={() => select(c.id)}
                  className={`relative z-10 min-h-11 shrink-0 rounded-full px-4 text-[0.9375rem] transition-colors duration-300 ${
                    selected ? "text-paper" : "text-ink hover:text-matcha-deep"
                  }`}
                >
                  {c.title[locale]}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="link-draw hidden min-h-11 shrink-0 items-center gap-2 text-[0.9375rem] md:inline-flex"
          >
            <Printer className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {t.menuPage.print}
          </button>
        </div>
      </div>

      {/* En-tête imprimé */}
      <div className="print-only mb-6">
        <Image src="/brand/logo-full.png" alt="Moonlight café" width={1339} height={947} className="h-24 w-auto" />
        <p className="mt-2">27 Rue des Gravilliers, 75003 Paris</p>
      </div>

      <div id="menu-panel" role="tabpanel" ref={list} className="wrap py-14 md:py-20">
        {visible.map((cat) => (
          <div key={cat.id}>
            <CategoryBlock cat={cat} locale={locale} flavorsLabel={t.menuPage.flavors} />
            {cat.id === EXTRAS_AFTER && showExtras ? <ExtrasBlock locale={locale} /> : null}
          </div>
        ))}
        {active === "classiques" ? <ExtrasBlock locale={locale} /> : null}
        <p className="t-small mt-16 max-w-xl text-ink-soft">
          {t.common.priceNote} {t.menuPage.footnote}
        </p>
      </div>
    </div>
  );
}

function CategoryBlock({ cat, locale, flavorsLabel }: { cat: MenuCategory; locale: Locale; flavorsLabel: string }) {
  return (
    <section
      id={`cat-${cat.id}`}
      data-menu-category
      aria-labelledby={`title-${cat.id}`}
      className="grid gap-8 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8 md:py-16"
    >
      <div className="md:col-span-4">
        <h2 id={`title-${cat.id}`} className="t-h2">
          {cat.title[locale]}
        </h2>
        {cat.subtitle ? <p className="mt-3 text-ink-soft">{cat.subtitle[locale]}</p> : null}
        {cat.photo ? (
          <div className="no-print relative mt-8 hidden aspect-[4/3] max-w-sm overflow-hidden rounded-[2px] md:block">
            <Image
              src={photos[cat.photo].src}
              alt={photos[cat.photo].alt[locale]}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 28vw, 0px"
              quality={70}
              className="object-cover"
              style={{ objectPosition: photos[cat.photo].focus }}
            />
          </div>
        ) : null}
      </div>
      <ul className="md:col-span-7 md:col-start-6">
        {cat.items.map((item) => (
          <li key={item.id} className="border-b border-ink/8 py-4 last:border-b-0">
            <div className="flex items-baseline gap-3">
              {item.photo ? (
                <span className="no-print relative top-1 block h-9 w-9 shrink-0 self-center overflow-hidden rounded-full bg-cream ring-1 ring-ink/10">
                  <Image
                    src={photos[item.photo].src}
                    alt=""
                    fill
                    sizes="96px"
                    quality={70}
                    className="object-cover"
                    style={{ objectPosition: photos[item.photo].focus }}
                  />
                </span>
              ) : null}
              <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] leading-snug md:text-[1.3rem]">{item.name[locale]}</h3>
              <span aria-hidden="true" className="leader" />
              <span className="shrink-0 tabular-nums">{formatPrice(item.price, locale)}</span>
            </div>
            {item.note ? (
              <p className={`t-small mt-1.5 text-ink-soft ${item.photo ? "pl-12" : ""}`}>
                {item.id === "cookie" ? <span className="sr-only">{flavorsLabel} : </span> : null}
                {item.note[locale]}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExtrasBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).menuPage;
  return (
    <aside data-menu-category aria-labelledby="extras-title" className="mb-4 rounded-[3px] bg-cream px-6 py-8 md:ml-[calc(41.66%+0.5rem)] md:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="extras-title" className="font-[family-name:var(--font-display)] text-[1.5rem]">
          {t.extrasTitle}
        </h2>
        <p className="t-small text-ink-soft">{t.extrasNote}</p>
      </div>
      <ul className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2">
        {extras.map((x) => (
          <li key={x.id} className="flex items-baseline gap-3">
            <span>{x.name[locale]}</span>
            <span aria-hidden="true" className="leader" />
            <span className="tabular-nums text-ink-soft">{formatPrice(x.price, locale, true)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
