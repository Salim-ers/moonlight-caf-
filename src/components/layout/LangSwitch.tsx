"use client";

import { usePathname } from "next/navigation";
import { routes, routeKeyFromPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Bascule FR / EN vers la page équivalente.
 * Les deux langues ont chacune leur mise en page racine : le changement recharge la page (voulu).
 */
export function LangSwitch({ locale, className = "", long = false }: { locale: Locale; className?: string; long?: boolean }) {
  const pathname = usePathname();
  const t = getDictionary(locale);
  const other: Locale = locale === "fr" ? "en" : "fr";
  const key = routeKeyFromPath(pathname) ?? "home";
  return (
    <a
      href={routes[key][other]}
      hrefLang={other}
      lang={other}
      className={`font-semibold ${className}`}
      aria-label={long ? undefined : `${t.common.switchToShort} – ${t.common.switchTo}`}
    >
      {long ? t.common.switchTo : t.common.switchToShort}
    </a>
  );
}
