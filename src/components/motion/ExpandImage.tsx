"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Une photographie s'agrandit progressivement jusqu'à occuper tout l'écran.
 * Le contenu `overlay` apparaît sur l'image une fois l'expansion terminée.
 */
export function ExpandImage({ children, overlay, label }: { children: ReactNode; overlay?: ReactNode; label?: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const small = window.innerWidth < 768;
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", pin: true, scrub: 0.7, anticipatePin: 1 },
            defaults: { ease: "none" },
          })
          .fromTo(
            q("[data-x-window]"),
            { clipPath: small ? "inset(26% 10% 26% 10%)" : "inset(24% 34% 24% 34%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" },
            0,
          )
          .fromTo(q("[data-x-img]"), { scale: 1.4 }, { scale: 1, duration: 1, ease: "power2.inOut" }, 0)
          .fromTo(q("[data-x-overlay]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.78);
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} aria-label={label} className="relative h-[100svh] min-h-[520px] overflow-hidden bg-paper">
      <div data-x-window className="absolute inset-0 overflow-hidden">
        <div data-x-img className="absolute inset-0 will-change-transform">
          {children}
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />
      </div>
      {overlay ? (
        <div data-x-overlay className="on-dark wrap absolute inset-x-0 bottom-0 pb-14 text-paper md:pb-20">
          {overlay}
        </div>
      ) : null}
    </section>
  );
}
