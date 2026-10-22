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
  const target = routes[key][other];
  return (
    <a
      href={target}
      hrefLang={other}
      lang={other}
      className={`link-draw t-small inline-flex min-h-11 items-center ${className}`}
      aria-label={`${t.a11y.language} : ${t.common.switchTo}`}
    >
      {long ? t.common.switchTo : t.common.switchToShort}
    </a>
  );
}
