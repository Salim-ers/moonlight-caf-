"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { TLink } from "@/components/motion/PageTransition";
import { Logo } from "@/components/ui/Logo";
import { href, type Locale, type NavKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { pageTone, tones } from "@/lib/tones";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

const NAV: NavKey[] = ["menu", "favorites", "cafe", "story"];

/**
 * En-tête : logo officiel complet à gauche, navigation en capsule flottante (lisible sur toutes
 * les couleurs de section), « Nous trouver » mis en avant. Il s'efface en descendant et revient
 * dès que l'on remonte.
 */
export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const delta = y - last.current;
        if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 420);
        last.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Changement de page : menu fermé, en-tête visible
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setHidden(false);
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--sticky-top", hidden ? "0.75rem" : "var(--header-h)");
  }, [hidden]);

  // La barre d'actions mobile peut ouvrir le menu (l'en-tête est masqué pendant la descente)
  useEffect(() => {
    const openMenu = () => setOpen(true);
    window.addEventListener("ml:open-menu", openMenu);
    return () => window.removeEventListener("ml:open-menu", openMenu);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus();
  }, []);

  const isCurrent = (key: NavKey) => pathname.replace(/\/$/, "") === href(key, locale);

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <TLink
            href={href("home", locale)}
            aria-label={t.a11y.home}
            className={`relative z-[61] -ml-2 block rounded-[1.1rem] px-2 py-1 transition-[background-color,box-shadow] duration-500 ${
              scrolled && !open ? "bg-ivory/95 shadow-[0_6px_24px_-12px_rgb(39_36_32/0.35)] lg:backdrop-blur-md" : ""
            }`}
          >
            <Logo preload alt="Moonlight café" className="h-[56px] w-auto lg:h-[72px]" />
          </TLink>

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-ivory/85 p-1.5 shadow-[0_6px_28px_-14px_rgb(39_36_32/0.4)] backdrop-blur-md">
              {NAV.map((key) => {
                const active = isCurrent(key);
                return (
                  <li key={key}>
                    <TLink
                      href={href(key, locale)}
                      aria-current={active ? "page" : undefined}
                      className="relative flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] font-medium transition-colors duration-300 hover:bg-[var(--nav-tone)]"
                      style={{ "--nav-tone": tones[pageTone[key]].soft, ...(active ? { background: "var(--nav-tone)" } : {}) } as CSSProperties}
                    >
                      <span className="roll">
                        <span>{t.nav[key]}</span>
                        <span aria-hidden="true">{t.nav[key]}</span>
                      </span>
                    </TLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <LangSwitch locale={locale} className="chip min-h-11 bg-ivory/85 backdrop-blur-md" />
              <TLink href={href("visit", locale)} data-magnetic="6" aria-current={isCurrent("visit") ? "page" : undefined} className="btn btn-sm">
                {t.nav.visit}
              </TLink>
            </div>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              className="chip relative z-[61] min-h-11 gap-3 bg-ivory/95 pl-4 pr-3.5 font-semibold lg:hidden"
            >
              <span>{open ? t.common.close : t.common.menuLabel}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-out)] ${
                    open ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-out)] ${
                    open ? "w-5 -translate-y-[5.25px] -rotate-45" : "w-3.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} locale={locale} />
    </>
  );
}
