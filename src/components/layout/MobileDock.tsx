"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { TLink } from "@/components/motion/PageTransition";
import { mapsLinks } from "@/data/site-config";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Barre d'actions des téléphones et tablettes : les deux gestes utiles toujours sous le pouce
 * (la carte, l'itinéraire). Elle apparaît une fois le haut de page passé et s'efface dès que le
 * pied de page — qui contient déjà ces informations — entre dans l'écran.
 */
export function MobileDock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [past, setPast] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPast(window.scrollY > window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const foot = document.querySelector("[data-site-footer]");
    const io = foot ? new IntersectionObserver(([e]) => setFooter(e.isIntersecting)) : null;
    if (foot) io?.observe(foot);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  const onMenu = pathname.replace(/\/$/, "") === href("menu", locale);
  const show = past && !footer;
  return (
    <div className="dock" data-on={show} aria-hidden={!show} inert={!show}>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("ml:open-menu"))}
        aria-controls="mobile-menu"
        aria-label={t.a11y.openMenu}
        className="dock-menu"
      >
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span className="absolute left-0 top-0 h-[1.5px] w-5 bg-current" />
          <span className="absolute bottom-0 left-0 h-[1.5px] w-3.5 bg-current" />
        </span>
      </button>
      <TLink href={onMenu ? href("favorites", locale) : href("menu", locale)} className="btn btn-light btn-sm">
        {onMenu ? t.nav.favorites : t.common.seeMenu}
      </TLink>
      <a
        href={mapsLinks.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-dock-accent"
        aria-label={`${t.common.directions} ${t.a11y.newTab}`}
      >
        <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span>{t.common.directions}</span>
      </a>
    </div>
  );
}
