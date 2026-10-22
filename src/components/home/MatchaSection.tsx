"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Lines, Fade, ClipReveal, Parallax } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Kanji } from "@/components/motion/Kanji";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";
import { siteConfig } from "@/data/site-config";

/**
 * Section signature « Matcha » : le vert profond s'ouvre en cercle depuis le centre
 * pendant le défilement, comme une tasse vue du dessus.
 */
export function MatchaSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.matcha;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const stage = root.current!.querySelector("[data-stage]");
        gsap.fromTo(
          stage,
          { clipPath: "circle(12% at 50% 42%)" },
          {
            clipPath: "circle(110% at 50% 42%)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 5%", scrub: 0.5 },
          },
        );
        gsap.fromTo(
          root.current!.querySelectorAll("[data-kanji-big] svg"),
          { yPercent: 30, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 60%", end: "top 0%", scrub: 0.6 },
          },
        );
        // les étapes s'allument une à une
        root.current!.querySelectorAll("[data-step]").forEach((step) => {
          gsap.fromTo(
            step.querySelector("[data-step-line]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: step, start: "top 85%", once: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="matcha-title" className="relative bg-paper">
      <div data-stage className="on-dark relative overflow-hidden bg-matcha-night text-paper">
        <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-8 lg:py-44">
          <div data-kanji-big aria-hidden="true" className="pointer-events-none absolute right-[3vw] top-16 flex flex-col text-matcha/35 lg:static lg:col-span-2 lg:text-matcha/60">
            <Kanji char="抹" className="h-[22vw] w-[22vw] lg:h-[11vw] lg:w-[11vw]" />
            <Kanji char="茶" className="h-[22vw] w-[22vw] lg:h-[11vw] lg:w-[11vw]" />
          </div>

          <div className="relative lg:col-span-5 lg:pt-6">
            <p className="t-label flex items-center gap-3">
              <Kanji char="宇" className="h-5 w-5 text-moon" />
              <Kanji char="治" className="-ml-2 h-5 w-5 text-moon" />
              <span>{siteConfig.facts.matchaOrigin[locale]}</span>
            </p>
            <Lines id="matcha-title" lines={t.title} className="t-h1 mt-6" />
            <Fade className="t-lede measure mt-8 text-paper/80">
              <p>{t.text}</p>
            </Fade>
            <ol className="mt-12 space-y-7">
              {t.steps.map((s, i) => (
                <li key={s.title} data-step className="grid grid-cols-[3rem_1fr] gap-x-4">
                  <span className="font-[family-name:var(--font-display)] text-[1.6rem] leading-none text-moon">{i + 1}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] leading-tight">{s.title}</h3>
                    <span data-step-line aria-hidden="true" className="mt-3 block h-px origin-left bg-paper/25" />
                    <p className="mt-3 text-paper/75">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <ButtonLink href={`${href("menu", locale)}#matcha`} variant="light">
                {t.cta}
              </ButtonLink>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:pt-24">
            <ClipReveal className="aspect-[4/5] w-full lg:ml-auto lg:w-[92%]" parallax={10}>
              <Photo id="matchaPour" locale={locale} sizes="(min-width: 1024px) 38vw, 92vw" />
            </ClipReveal>
            <Parallax speed={18} className="relative -mt-24 w-[58%] md:-mt-40 lg:-ml-[4%] lg:w-[52%]">
              <ClipReveal className="aspect-square shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]" from="left" parallax={6}>
                <Photo id="layered" locale={locale} sizes="(min-width: 1024px) 22vw, 54vw" />
              </ClipReveal>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
