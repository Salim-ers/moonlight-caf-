"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { TLink } from "@/components/motion/PageTransition";
import { href, type Locale, type NavKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteConfig, fullAddress } from "@/data/site-config";
import { LangSwitch } from "./LangSwitch";
import { OpenStatus } from "@/components/ui/OpenStatus";

const ITEMS: NavKey[] = ["home", "menu", "favorites", "cafe", "story", "visit"];

/**
 * Menu mobile plein écran, fond lavande : il s'ouvre en cercle depuis le bouton.
 * Pendant l'ouverture, le reste de la page est `inert` (focus et lecteurs d'écran restent dans
 * le menu et l'en-tête), le défilement est bloqué, Échap ferme et rend le focus au bouton.
 */
export function MobileMenu({ open, onClose, locale }: { open: boolean; onClose: () => void; locale: Locale }) {
  const t = getDictionary(locale);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [document.getElementById("main"), document.querySelector("[data-site-footer]")];
    if (!open) return;
    targets.forEach((el) => el?.setAttribute("inert", ""));
    document.documentElement.style.overflow = "hidden";
    const first = setTimeout(() => ref.current?.querySelector<HTMLElement>("a")?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 64rem)");
    const onWide = () => mq.matches && onClose();
    mq.addEventListener("change", onWide);
    return () => {
      clearTimeout(first);
      targets.forEach((el) => el?.removeAttribute("inert"));
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.a11y.mainNav}
      aria-hidden={!open}
      inert={!open}
      data-open={open}
      className="mm fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-lavender text-ink lg:hidden"
    >
      <nav aria-label={t.a11y.mainNav} className="wrap flex flex-1 flex-col justify-center pb-6 pt-[calc(var(--header-h)+1.25rem)]">
        <ol>
          {ITEMS.map((key, i) => (
            <li key={key} className="mm-item border-b border-ink/12 last:border-b-0" style={{ "--i": i } as CSSProperties}>
              <TLink href={href(key, locale)} onClick={onClose} className="group flex items-center gap-4 py-2.5">
                <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,10.5vw,4rem)] font-bold leading-[1] tracking-[-0.035em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1.5">
                  {t.nav[key]}
                </span>
              </TLink>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mm-foot wrap grid gap-5 border-t border-ink/15 pb-10 pt-6 text-[0.95rem]">
        <div>
          <p className="t-eyebrow text-ink">{t.common.address}</p>
          <p className="mt-1 font-medium">{fullAddress}</p>
          <OpenStatus locale={locale} className="mt-1 text-ink/80" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="chip min-h-11 gap-1.5">
            Instagram <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            <span className="sr-only">{t.a11y.newTab}</span>
          </a>
          <LangSwitch locale={locale} long className="chip min-h-11" />
        </div>
      </div>
    </div>
  );
}
