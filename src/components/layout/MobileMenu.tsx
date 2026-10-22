"use client";

import { useEffect, useRef } from "react";
import { TLink } from "@/components/motion/TransitionProvider";
import { useMotion } from "@/components/motion/MotionProvider";
import { href, type Locale, type NavKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteConfig, fullAddress } from "@/data/site-config";
import { LangSwitch } from "./LangSwitch";
import { OpenStatus } from "@/components/ui/OpenStatus";

const ITEMS: NavKey[] = ["home", "menu", "favorites", "cafe", "story", "visit"];

/**
 * Menu mobile plein écran : il s'ouvre comme une lune qui grandit depuis le bouton.
 * Le reste de la page devient `inert` (focus et lecteurs d'écran restent dans le menu).
 */
export function MobileMenu({ open, onClose, locale }: { open: boolean; onClose: () => void; locale: Locale }) {
  const t = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);
  const { lenis } = useMotion();

  useEffect(() => {
    const targets = [document.querySelector("main"), document.querySelector("[data-site-footer]")];
    if (open) {
      targets.forEach((el) => el?.setAttribute("inert", ""));
      lenis()?.stop();
      document.documentElement.style.overflow = "hidden";
      const first = ref.current?.querySelector<HTMLElement>("a");
      setTimeout(() => first?.focus(), 250);
    } else {
      targets.forEach((el) => el?.removeAttribute("inert"));
      lenis()?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, lenis]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.a11y.mainNav}
      aria-hidden={!open}
      inert={!open}
      className="on-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-matcha-night text-paper transition-[clip-path] duration-[900ms] ease-[var(--ease-ink)] lg:hidden"
      style={{ clipPath: open ? "circle(150% at calc(100% - 2.6rem) 2.2rem)" : "circle(0% at calc(100% - 2.6rem) 2.2rem)" }}
    >
      <nav aria-label={t.a11y.mainNav} className="wrap flex flex-1 flex-col justify-center pb-8 pt-28">
        <ul className="space-y-1">
          {ITEMS.map((key, i) => (
            <li key={key} className="overflow-hidden">
              <TLink
                href={href(key, locale)}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-1.5 font-[family-name:var(--font-display)] text-[clamp(2.3rem,10vw,3.6rem)] leading-[1.08] tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-moon)]"
                style={{
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  transitionDelay: open ? `${180 + i * 60}ms` : "0ms",
                }}
              >
                <span className="transition-colors group-hover:text-moon">{t.nav[key]}</span>
              </TLink>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="wrap grid gap-6 border-t border-paper/15 pb-10 pt-6 text-[0.9375rem] transition-opacity duration-700"
        style={{ opacity: open ? 1 : 0, transitionDelay: open ? "550ms" : "0ms" }}
      >
        <div>
          <p className="t-label">{t.common.address}</p>
          <p>{fullAddress}</p>
          <OpenStatus locale={locale} className="mt-1 text-paper/80" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="link-draw">
            Instagram <span className="sr-only">{t.a11y.newTab}</span>
          </a>
          <LangSwitch locale={locale} long />
        </div>
      </div>
    </div>
  );
}
