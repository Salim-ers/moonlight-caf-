import type { ReactNode } from "react";
import "@/styles/globals.css";
import { display, sans, serif } from "@/lib/fonts";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { PageTransition } from "@/components/motion/PageTransition";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { localBusinessJsonLd } from "@/lib/seo";

/**
 * Script exécuté avant le premier rendu (≈ 300 octets, aucune attente) :
 * - active les animations seulement si le visiteur n'a pas demandé à les réduire ;
 * - à la première page de la visite, affiche le logo complet ≈ 0,8 s puis le lève (CSS pur,
 *   pendant que la page se charge dessous ; rien n'est bloqué, aucun bouton « passer ») ;
 * - garde-fou : si le moteur d'animation ne démarre pas en 4 s, tout le contenu s'affiche.
 */
const bootScript = `(function(){var d=document.documentElement;try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');if(!sessionStorage.getItem('ml-boot')){sessionStorage.setItem('ml-boot','1');d.classList.add('boot');setTimeout(function(){d.classList.remove('boot')},2600)}}}catch(e){}setTimeout(function(){if(!window.__mlReady)d.classList.add('motion-failsafe')},4000)})();`;

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router : <head> est autorisé dans le layout racine */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-ivory transition-transform focus:translate-y-0"
        >
          {t.a11y.skip}
        </a>
        <PageTransition>
          <Header locale={locale} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} />
        </PageTransition>
        <MotionRuntime />
      </body>
    </html>
  );
}
