import type { ReactNode } from "react";
import "@/styles/globals.css";
import { mincho, gothic } from "@/lib/fonts";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { TransitionProvider } from "@/components/motion/TransitionProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { localBusinessJsonLd } from "@/lib/seo";

/**
 * Script exécuté avant le premier rendu :
 * - active les animations seulement si le visiteur n'a pas demandé à les réduire ;
 * - joue l'introduction (animation 100 % CSS) une seule fois par session, uniquement sur l'accueil ;
 * - garde-fou : si JavaScript échoue, les éléments révélés au défilement redeviennent visibles après 5 s.
 */
const bootScript = `(function(){var d=document.documentElement;try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');var p=location.pathname.replace(/\\/$/,'');var s=null;try{s=sessionStorage.getItem('ml-intro')}catch(e){}if((p===''||p==='/en')&&!s){d.classList.add('intro','intro-run');setTimeout(function(){d.classList.remove('intro','intro-skip');try{sessionStorage.setItem('ml-intro','1')}catch(e){}},2450)}}}catch(e){}setTimeout(function(){if(!window.__mlMotionReady){d.classList.add('motion-failsafe')}},5000)})();`;

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={locale} className={`${mincho.variable} ${gothic.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router : <head> est autorisé dans le layout racine */}
      <head>
        {/* Script bloquant volontairement minuscule : il doit s'exécuter avant le premier rendu. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-paper transition-transform focus:translate-y-0"
        >
          {t.a11y.skip}
        </a>
        <MotionProvider>
          <TransitionProvider>
            <Header locale={locale} />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer locale={locale} />
          </TransitionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
