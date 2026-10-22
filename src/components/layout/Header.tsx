"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TLink } from "@/components/motion/TransitionProvider";
import { href, type Locale, type NavKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { MoonPhase } from "./MoonPhase";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";
import { ButtonLink } from "@/components/ui/Button";

export const NAV: NavKey[] = ["menu", "favorites", "cafe", "story"];

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const delta = y - last.current;
        if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 320);
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

  // ferme le menu et réaffiche l'en-tête à chaque changement de page
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setHidden(false);
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--sticky-top", hidden ? "0px" : "var(--header-h)");
  }, [hidden]);

  const isCurrent = (key: NavKey) => pathname === href(key, locale);

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-moon)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "bg-paper/85 shadow-[0_1px_0_rgba(35,35,31,0.08)] backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <TLink href={href("home", locale)} aria-label={t.a11y.home} className="relative z-[61] -ml-1 block p-1">
            <Image
              src={open ? "/brand/logo-wordmark-light.png" : "/brand/logo-wordmark.png"}
              alt="Moonlight café"
              width={1339}
              height={295}
              preload
              className="h-[22px] w-auto sm:h-[26px]"
            />
          </TLink>

          <nav aria-label={t.a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.9375rem]">
              {NAV.map((key) => (
                <li key={key}>
                  <TLink
                    href={href(key, locale)}
                    aria-current={isCurrent(key) ? "page" : undefined}
                    className="link-draw py-2"
                  >
                    {t.nav[key]}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <MoonPhase label={t.a11y.scrollProgress} className="hidden text-ink sm:block" />
            <div className="hidden items-center gap-5 lg:flex">
              <LangSwitch locale={locale} />
              <ButtonLink href={href("visit", locale)} size="sm" variant="ink">
                {t.nav.visit}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              className={`relative z-[61] -mr-2 flex min-h-11 items-center gap-3 px-2 lg:hidden ${open ? "text-paper" : "text-ink"}`}
            >
              <span className="t-small font-medium">{open ? t.a11y.closeMenu.split(" ")[0] : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-moon)] ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-moon)] ${
                    open ? "w-6 -translate-y-[5.5px] -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
