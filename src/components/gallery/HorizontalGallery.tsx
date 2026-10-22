"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/gallery-data";
import type { Locale } from "@/i18n/config";

/**
 * Bande photographique horizontale synchronisée au défilement (≥ 1024 px).
 * Mobile et « animations réduites » : simple pile verticale native.
 */
export function HorizontalGallery({ items, locale, title, text }: { items: PhotoKey[]; locale: Locale; title: string; text: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const track = el.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => Math.max(0, track.scrollWidth - el.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
        });
        el.querySelectorAll<HTMLElement>("[data-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            { xPercent: 8, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="gestures-title" className="relative overflow-hidden bg-ink py-20 text-paper on-dark lg:flex lg:h-[100svh] lg:items-center lg:py-0">
      <div data-track className="flex flex-col gap-6 px-[var(--gutter)] lg:w-max lg:flex-row lg:items-center lg:gap-[4vw] [html:not(.motion)_&]:lg:w-full [html:not(.motion)_&]:lg:flex-wrap">
        <div className="shrink-0 lg:w-[28vw]">
          <h2 id="gestures-title" className="t-h2">
            {title}
          </h2>
          <p className="t-lede mt-6 max-w-sm text-paper/75">{text}</p>
        </div>
        {items.map((k, i) => (
          <figure key={k} className={`relative shrink-0 overflow-hidden lg:h-[62svh] lg:w-[min(56vw,110svh)] ${i % 2 ? "lg:translate-y-[6svh]" : "lg:-translate-y-[4svh]"} aspect-[16/9] lg:aspect-auto`}>
            <div data-img className="absolute inset-[-8%_-10%] will-change-transform">
              <Photo id={k} locale={locale} sizes="(min-width: 1024px) 60vw, 92vw" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
