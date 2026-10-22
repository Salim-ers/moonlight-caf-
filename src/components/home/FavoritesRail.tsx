"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Galerie horizontale synchronisée au défilement (grand écran uniquement).
 * Sur mobile, tablette ou si les animations sont réduites : liste verticale native.
 */
export function FavoritesRail({ header, children }: { header: ReactNode; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const track = el.querySelector<HTMLElement>("[data-track]")!;
        const bar = el.querySelector<HTMLElement>("[data-bar]");
        const distance = () => Math.max(0, track.scrollWidth - el.clientWidth);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });
        tl.to(track, { x: () => -distance() }, 0).fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0);
        // chaque carte se redresse légèrement en entrant
        el.querySelectorAll<HTMLElement>("[data-card]").forEach((card, i) => {
          if (i < 2) return;
          gsap.fromTo(
            card,
            { y: 60, rotate: 1.5 },
            {
              y: 0,
              rotate: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl.getChildren()[0] as gsap.core.Tween,
                start: "left 105%",
                end: "left 60%",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="favorites-title" className="relative overflow-hidden bg-paper py-20 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
      {header}
      <div
        data-track
        className="wrap mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:mt-14 lg:flex lg:w-max lg:max-w-none lg:gap-[3vw] lg:pr-[10vw] [html:not(.motion)_&]:lg:grid [html:not(.motion)_&]:lg:w-full [html:not(.motion)_&]:lg:grid-cols-3"
      >
        {children}
      </div>
      <div className="wrap mt-10 hidden lg:block [html:not(.motion)_&]:lg:hidden">
        <div className="h-px w-full bg-ink/10">
          <div data-bar className="h-px origin-left scale-x-0 bg-ink" />
        </div>
      </div>
    </section>
  );
}
