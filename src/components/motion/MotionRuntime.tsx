"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Moteur d'animation unique du site (≈ 3 Ko, aucune bibliothèque) monté une seule fois.
 * Les composants restent des Server Components : ils déclarent leurs intentions par attributs.
 *
 * - `data-reveal="up|lines|clip-up|circle|…"` : révélé une fois à l'entrée dans l'écran (IntersectionObserver),
 *   l'animation elle-même est une transition CSS (transform / opacity / clip-path).
 * - `data-progress="through|in|out|sticky"` : écrit la progression du défilement dans `--p` (0 → 1).
 *   through : de l'entrée par le bas à la sortie par le haut ; in : du bas de l'écran jusqu'en haut ;
 *   out : de la position initiale jusqu'à disparaître (hero) ; sticky : pendant l'épinglage CSS.
 *   Un seul écouteur de défilement passif, lectures groupées puis écritures, seulement pour les
 *   éléments proches de l'écran.
 * - `data-pointer` : parallaxe à la souris (`--mx`, `--my` entre -1 et 1), souris fine uniquement.
 * - `data-magnetic` : bouton légèrement attiré par le curseur (6 px max), souris fine uniquement.
 *
 * Tout est relancé à chaque changement de page et nettoyé à la sortie.
 */
export function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __mlReady?: boolean }).__mlReady = true;
    const root = document.documentElement;
    const motion = root.classList.contains("js-motion") && "IntersectionObserver" in window;
    const cleanups: (() => void)[] = [];

    // 1. Révélations
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!motion) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }
        },
        // seuil 0 : un élément entièrement masqué par clip-path a une surface visible nulle
        { rootMargin: "0px 0px -7% 0px", threshold: 0 },
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    if (!motion) return () => cleanups.forEach((c) => c());

    // 2. Progression au défilement
    type Tracker = { el: HTMLElement; mode: string; active: boolean; last: number };
    const trackers: Tracker[] = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]")).map((el) => ({
      el,
      mode: el.dataset.progress || "through",
      active: false,
      last: -1,
    }));
    if (trackers.length) {
      let raf = 0;
      const update = () => {
        raf = 0;
        const vh = window.innerHeight;
        const rects = trackers.map((t) => (t.active ? t.el.getBoundingClientRect() : null));
        trackers.forEach((t, i) => {
          const r = rects[i];
          if (!r) return;
          let p: number;
          if (t.mode === "sticky") p = -r.top / Math.max(1, r.height - vh);
          else if (t.mode === "in") p = (vh - r.top) / vh;
          else if (t.mode === "out") p = -r.top / Math.max(1, r.height);
          else p = (vh - r.top) / (vh + r.height);
          p = Math.round(Math.min(1, Math.max(0, p)) * 1000) / 1000;
          if (p !== t.last) {
            t.last = p;
            t.el.style.setProperty("--p", String(p));
          }
        });
      };
      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const t = trackers.find((x) => x.el === e.target);
            if (t) t.active = e.isIntersecting;
          }
          schedule();
        },
        { rootMargin: "20% 0px 20% 0px" },
      );
      trackers.forEach((t) => io.observe(t.el));
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      cleanups.push(() => {
        io.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(raf);
      });
    }

    // 3. Interactions souris (ordinateur uniquement)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-pointer]").forEach((el) => {
        let raf = 0;
        let mx = 0;
        let my = 0;
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          mx = ((e.clientX - r.left) / r.width) * 2 - 1;
          my = ((e.clientY - r.top) / r.height) * 2 - 1;
          if (!raf)
            raf = requestAnimationFrame(() => {
              raf = 0;
              el.style.setProperty("--mx", mx.toFixed(3));
              el.style.setProperty("--my", my.toFixed(3));
            });
        };
        const onLeave = () => {
          cancelAnimationFrame(raf);
          raf = 0;
          el.style.setProperty("--mx", "0");
          el.style.setProperty("--my", "0");
        };
        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          cancelAnimationFrame(raf);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic) || 6;
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          el.style.setProperty("--tx", `${(dx * strength).toFixed(1)}px`);
          el.style.setProperty("--ty", `${(dy * strength * 0.6).toFixed(1)}px`);
        };
        const onLeave = () => {
          el.style.setProperty("--tx", "0px");
          el.style.setProperty("--ty", "0px");
        };
        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
