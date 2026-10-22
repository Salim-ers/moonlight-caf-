"use client";

import Image from "next/image";
import { useEffect } from "react";

/**
 * Introduction (première visite de la session, accueil uniquement).
 * L'animation elle-même est en CSS (globals.css) et démarre avant même le chargement de React :
 * le logo original se dessine à l'encre, puis le voile se lève sur la lune du hero (≈ 2,3 s).
 * Ce composant ajoute seulement la possibilité de la passer (clic, toucher ou clavier).
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro")) return;
    const skip = () => {
      html.classList.add("intro-skip");
      setTimeout(() => {
        html.classList.remove("intro", "intro-skip");
        try {
          sessionStorage.setItem("ml-intro", "1");
        } catch {}
      }, 300);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div className="intro-overlay fixed inset-0 z-[80] items-center justify-center" aria-hidden="true">
      <div data-intro-veil className="absolute inset-0 bg-paper" style={{ clipPath: "inset(0% 0% 0% 0%)" }} />
      <div data-intro-logo className="ink-mask relative w-[min(62vw,300px)]" style={{ "--ink": "0%" } as React.CSSProperties}>
        <Image src="/brand/logo-full.png" alt="" width={1339} height={947} preload className="h-auto w-full" />
      </div>
      <p className="t-small absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-soft">{skipLabel}</p>
    </div>
  );
}
