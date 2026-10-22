"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Fade } from "@/components/motion/Reveal";
import { socialGrid } from "@/data/gallery-data";
import { siteConfig } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

const spans = [
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 md:col-span-1",
  "col-span-2 row-span-1 md:col-span-2",
  "col-span-1 row-span-1",
];

/**
 * Grille éditoriale inspirée d'Instagram, composée des photos fournies
 * (ce n'est pas un flux en direct). Le pseudo glisse horizontalement au défilement.
 */
export function SocialSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          root.current!.querySelector("[data-handle]"),
          { xPercent: 6 },
          { xPercent: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.fromTo(
          root.current!.querySelectorAll("[data-tile]"),
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: { each: 0.07, from: "random" },
            scrollTrigger: { trigger: root.current!.querySelector("[data-grid]"), start: "top 85%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="social-title" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <h2 id="social-title" className="sr-only">
        {t.home.social.title}
      </h2>
      <p
        data-handle
        aria-hidden="true"
        className="whitespace-nowrap pl-[var(--gutter)] font-[family-name:var(--font-display)] text-[clamp(3rem,11vw,12rem)] leading-none tracking-[-0.04em] text-ink"
      >
        {siteConfig.instagram.handle}
      </p>
      <div className="wrap mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
        <Fade className="md:col-span-4">
          <p className="t-label">{t.home.social.title}</p>
          <p className="t-lede mt-3 text-ink-soft">{t.home.social.text}</p>
          <div className="mt-8">
            <ButtonLink href={siteConfig.instagram.url} external ariaLabel={`${t.common.follow} ${t.a11y.newTab}`}>
              {t.common.follow}
            </ButtonLink>
          </div>
          <p className="t-small mt-6 text-ink-soft">{t.home.social.note}</p>
        </Fade>
        <ul data-grid className="grid grid-flow-dense auto-rows-[38vw] grid-cols-3 gap-2 md:col-span-8 md:auto-rows-[13vw] md:grid-cols-4 md:gap-3">
          {socialGrid.map((id, i) => (
            <li key={id} data-tile className={`group relative overflow-hidden rounded-[2px] bg-cream ${spans[i] ?? ""}`}>
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-moon)] group-hover:scale-[1.05]">
                <Photo id={id} locale={locale} sizes="(min-width: 768px) 26vw, 50vw" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
