"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type MotionContextValue = {
  reduced: boolean;
  lenis: () => Lenis | null;
  scrollTo: (target: number | string | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
};

const MotionContext = createContext<MotionContextValue>({
  reduced: false,
  lenis: () => null,
  scrollTo: () => {},
});

export const useMotion = () => useContext(MotionContext);

/**
 * Défilement doux (Lenis) synchronisé avec GSAP ScrollTrigger.
 * Désactivé entièrement si l'utilisateur préfère réduire les animations.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    (window as Window & { __mlMotionReady?: boolean }).__mlMotionReady = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      document.documentElement.classList.toggle("motion", !mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Les sections épinglées (pin) décalent celles qui suivent : on trie puis on recalcule
  // après chaque changement de page, chargement des polices et des images.
  const pathname = usePathname();
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    const id = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    // ScrollTrigger se recalcule déjà seul au chargement complet de la page ;
    // on ajoute un seul tri + recalcul quand les polices sont prêtes.
    document.fonts?.ready.then(refresh);
  }, []);

  const value = useMemo<MotionContextValue>(
    () => ({
      reduced,
      lenis: () => lenisRef.current,
      scrollTo: (target, opts) => {
        const lenis = lenisRef.current;
        const offset = opts?.offset ?? 0;
        if (lenis) {
          lenis.scrollTo(target, { immediate: opts?.immediate, offset, force: true });
          return;
        }
        if (typeof target === "number") window.scrollTo({ top: target, behavior: opts?.immediate ? "auto" : "smooth" });
        else {
          const el = typeof target === "string" ? document.querySelector(target) : target;
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: opts?.immediate ? "auto" : "smooth" });
          }
        }
      },
    }),
    [reduced],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
