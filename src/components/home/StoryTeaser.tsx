"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Lines, Fade, ClipReveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/** Teaser « Notre histoire » : la vapeur de la tasse du logo se dessine au défilement. */
export function StoryTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.story;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<SVGPathElement>(root.current!.querySelectorAll("[data-steam] path")).forEach((p, i) => {
          gsap.fromTo(
            p,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: `top ${75 - i * 8}%`, end: "center 35%", scrub: 0.8 },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="story-title" className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          <p aria-hidden="true" className="t-display select-none text-wood">
            {t.date.split(" ").map((w, i) => (
              <span key={i} className={`block ${i === 1 ? "pl-[12vw] lg:pl-[8vw]" : ""}`}>
                {w}
              </span>
            ))}
          </p>
          <div className="absolute bottom-[-2rem] right-[6%] flex flex-col items-center lg:right-[12%]">
            <svg data-steam aria-hidden="true" viewBox="0 0 80 260" className="h-40 w-12 overflow-visible text-ink md:h-56 md:w-16">
              <path
                d="M30 258 C 10 225, 52 200, 30 168 S 8 112, 34 84 S 58 34, 36 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
              />
              <path
                d="M52 258 C 66 236, 40 220, 54 196 S 70 156, 54 132"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
              />
            </svg>
            <Image src="/brand/logo-cup.png" alt="" width={135} height={237} className="-mt-1 h-16 w-auto md:h-20" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <ClipReveal className="mb-12 aspect-[3/2] w-full" parallax={6}>
            <Photo id="facade" locale={locale} sizes="(min-width: 1024px) 38vw, 92vw" />
          </ClipReveal>
          <p className="t-label">{t.date}</p>
          <Lines id="story-title" lines={[t.title]} className="t-h3 mt-3 max-w-md text-[clamp(1.7rem,2.6vw,2.5rem)]" />
          <Fade className="mt-6">
            <p className="text-ink-soft">{t.text}</p>
            <div className="mt-8">
              <ButtonLink href={href("story", locale)} variant="outline">
                {t.cta}
              </ButtonLink>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}
