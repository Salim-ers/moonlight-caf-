"use client";

import { usePathname } from "next/navigation";
import { Coffee, MapPin } from "lucide-react";
import { TLink } from "@/components/motion/PageTransition";
import { mapsLinks } from "@/data/site-config";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Barre d'actions des téléphones et tablettes, présente sur toutes les pages : les deux gestes
 * utiles toujours sous le pouce — l'itinéraire à gauche, la carte à droite (sur la carte
 * elle-même, ce bouton mène aux favoris). Masquée sur ordinateur (souris, écran ≥ 64rem).
 */
export function MobileDock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const onMenu = pathname.replace(/\/$/, "") === href("menu", locale);
  return (
    <nav data-site-dock aria-label={t.a11y.quickActions} className="dock">
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
      <TLink href={onMenu ? href("favorites", locale) : href("menu", locale)} className="btn btn-light btn-sm">
        <Coffee className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span>{onMenu ? t.nav.favorites : t.nav.menu}</span>
      </TLink>
    </nav>
  );
}
