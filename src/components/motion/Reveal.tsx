"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";

/**
 * Révélations.
 *
 * Choix de performance :
 * - les entrées « au chargement » (`trigger="load"`) sont 100 % CSS : elles démarrent dès
 *   le premier rendu, sans attendre l'hydratation de React (meilleur LCP) ;
 * - les entrées « au défilement » utilisent un IntersectionObserver (aucun calcul de mise en page
 *   à chaque rafraîchissement, contrairement à ScrollTrigger) ;
 * - ScrollTrigger n'est utilisé que pour ce qui suit réellement le défilement (parallaxe, pins).
 */

const motionAllowed = () =>
  typeof window !== "undefined" &&
  document.documentElement.classList.contains("motion") &&
  !document.documentElement.classList.contains("motion-failsafe");

/** Lance `play` la première fois que l'élément entre dans l'écran. */
function useInView(ref: React.RefObject<HTMLElement | null>, play: (el: HTMLElement) => void, rootMargin = "0px 0px -10% 0px") {
  const playRef = useRef(play);
  useEffect(() => {
    playRef.current = play;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          playRef.current(el);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
}

type LinesProps = {
  as?: ElementType;
  lines: readonly string[];
  className?: string;
  id?: string;
  trigger?: "scroll" | "load";
  delay?: number;
  stagger?: number;
};

/** Titre révélé ligne par ligne derrière un masque. Le texte reste un vrai titre HTML. */
export function Lines({ as: Tag = "h2", lines, className = "", id, trigger = "scroll", delay = 0, stagger = 0.09 }: LinesProps) {
  const ref = useRef<HTMLElement>(null);
  const load = trigger === "load";
  useInView(ref, (el) => {
    if (load) return;
    gsap.fromTo(el.querySelectorAll(".line-inner"), { y: 0, yPercent: 105 }, { yPercent: 0, duration: 1.25, ease: EASE, stagger, delay });
  });
  return (
    <Tag
      ref={ref}
      id={id}
      data-anim={load ? undefined : "lines"}
      className={`${load ? "enter-lines" : ""} ${className}`}
      style={load ? ({ "--enter-delay": `${delay}s`, "--stagger": `${stagger}s` } as CSSProperties) : undefined}
    >
      {lines.map((l, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner" style={load ? ({ "--i": i } as CSSProperties) : undefined}>
            {l}
          </span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

type FadeProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  trigger?: "scroll" | "load";
  /** Anime les enfants directs un par un. */
  stagger?: number;
  style?: CSSProperties;
};

/** Apparition douce (opacité + léger décalage). */
export function Fade({ as: Tag = "div", children, className = "", delay = 0, y = 18, trigger = "scroll", stagger, style }: FadeProps) {
  const ref = useRef<HTMLElement>(null);
  const load = trigger === "load";
  useInView(ref, (el) => {
    if (load) return;
    const targets = stagger ? Array.from(el.children) : el;
    if (stagger) gsap.set(el, { opacity: 1 });
    gsap.fromTo(targets, { opacity: 0, y }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay, stagger, clearProps: "transform" });
  });
  return (
    <Tag
      ref={ref}
      data-anim={load ? undefined : "fade"}
      className={`${load ? "enter-fade" : ""} ${className}`}
      style={load ? ({ ...style, "--enter-delay": `${delay}s` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}

/**
 * Image révélée par un rideau (clip-path) avec un léger dézoom,
 * puis parallaxe interne pendant le défilement (écrans ≥ 768 px uniquement).
 */
export function ClipReveal({
  children,
  className = "",
  parallax = 8,
  from = "bottom",
  trigger = "scroll",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  parallax?: number;
  from?: "bottom" | "top" | "left" | "right";
  trigger?: "scroll" | "load";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const load = trigger === "load";

  useInView(
    ref,
    (el) => {
      if (load) return;
      gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", delay });
      gsap.fromTo(zoom.current, { scale: 1.25 }, { scale: 1.08, duration: 1.9, ease: "expo.out", delay });
    },
    "0px 0px -12% 0px",
  );

  useGSAP(
    () => {
      if (!parallax) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -parallax / 2 },
          { yPercent: parallax / 2, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      data-anim={load ? undefined : "clip"}
      data-from={from}
      className={`relative overflow-hidden ${load ? "enter-clip" : ""} ${className}`}
      style={load ? ({ "--enter-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      <div ref={inner} className="absolute inset-0 will-change-transform">
        <div ref={zoom} className="enter-zoom absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Parallaxe simple d'un bloc (écrans ≥ 768 px uniquement). */
export function Parallax({ children, className = "", speed = 10 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { yPercent: speed },
          { yPercent: -speed, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
