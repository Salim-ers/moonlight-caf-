"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/**
 * « Le lieu » : une photo de la salle, d'abord petite fenêtre, s'agrandit
 * jusqu'à occuper tout l'écran ; le texte apparaît ensuite sur l'image.
 */
export function PlaceSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.place;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const isSmall = window.innerWidth < 768;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
          defaults: { ease: "none" },
        });
        tl.fromTo(
          q("[data-window]"),
          { clipPath: isSmall ? "inset(30% 8% 30% 8% round 999px 999px 4px 4px)" : "inset(22% 30% 22% 30% round 999px 999px 4px 4px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", duration: 1, ease: "power2.inOut" },
          0,
        )
          .fromTo(q("[data-window-img]"), { scale: 1.35 }, { scale: 1, duration: 1, ease: "power2.inOut" }, 0)
          .fromTo(q("[data-pre]"), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, duration: 0.3 }, 0)
          .fromTo(q("[data-shade]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0.6)
          .fromTo(q("[data-post] .line-inner"), { y: 0, yPercent: 105 }, { yPercent: 0, stagger: 0.06, duration: 0.3, ease: "power3.out" }, 0.72)
          .fromTo(q("[data-post-fade]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.8);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="place-title" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-paper">
      <p data-pre aria-hidden="true" className="wrap t-label absolute inset-x-0 top-[12%] z-10 hidden text-center [html.motion_&]:block">
        27 rue des Gravilliers
      </p>
      <div data-window className="absolute inset-0 overflow-hidden">
        <div data-window-img className="absolute inset-0 will-change-transform">
          <Photo id="roomWide" locale={locale} sizes="100vw" />
        </div>
        <div data-shade aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent [html.motion_&]:opacity-0" />
      </div>
      <div className="on-dark wrap absolute inset-x-0 bottom-0 z-10 pb-14 text-paper md:pb-20">
        <h2 id="place-title" data-post className="t-h2 max-w-4xl">
          {t.title.map((l, i) => (
            <span key={i} className="line-mask">
              <span className="line-inner">{l}</span>
              {i < t.title.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
        <div data-post-fade className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between [html.motion_&]:opacity-0">
          <p className="measure text-paper/85">{t.text}</p>
          <ButtonLink href={href("cafe", locale)} variant="light" className="self-start md:self-auto">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
