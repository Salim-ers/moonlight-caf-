"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Proportions des photos fournies (1672 × 941) et point d'intérêt de la photo du hero. */
const PHOTO_RATIO = 1672 / 941;
const FOCUS = { x: 0.47, y: 0.5, span: 0.6 };
import { Photo } from "@/components/ui/Photo";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Kanji } from "@/components/motion/Kanji";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteConfig } from "@/data/site-config";

/**
 * Hero signature : une « lune » photographique se lève (cercle qui s'ouvre),
 * puis, au défilement, elle grandit jusqu'à envahir tout l'écran.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.home.hero;
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = section.current!;
      const q = gsap.utils.selector(el);
      const frame = q("[data-frame]")[0] as HTMLElement;

      /**
       * Au repos, la photo est réduite et recentrée pour que le sujet (le geste du barista)
       * tombe au centre de la lune ; à la fin de l'expansion elle couvre tout l'écran.
       */
      const rest = () => {
        const cs = getComputedStyle(el);
        const r = parseFloat(cs.getPropertyValue("--r")) || 150;
        const cx = parseFloat(cs.getPropertyValue("--cx"));
        const cy = parseFloat(cs.getPropertyValue("--cy"));
        const vw = el.clientWidth;
        const vh = el.clientHeight;
        const imgW = Math.max(vw, vh * PHOTO_RATIO);
        const imgH = imgW / PHOTO_RATIO;
        const ox = (vw - imgW) / 2;
        const oy = (vh - imgH) / 2;
        const fxl = FOCUS.x * imgW;
        const fyl = FOCUS.y * imgH;
        const d = 2 * r * 1.16; // marge pour le zoom d'entrée
        const sc = Math.min(1, Math.max(d / (FOCUS.span * imgW), d / imgW, d / imgH));
        let x = cx - ox - fxl * sc;
        let y = cy - oy - fyl * sc;
        // garde la lune entièrement couverte par l'image
        x = Math.min(cx - r - ox, Math.max(cx + r - ox - imgW * sc, x));
        y = Math.min(cy - r - oy, Math.max(cy + r - oy - imgH * sc, y));
        return { x, y, scale: sc, box: { width: imgW, height: imgH, left: ox, top: oy } };
      };
      const applyRest = () => {
        const p = rest();
        gsap.set(frame, { ...p.box, x: p.x, y: p.y, scale: p.scale, transformOrigin: "0 0" });
        gsap.set(q("[data-photo]"), { transformOrigin: `${FOCUS.x * 100}% ${FOCUS.y * 100}%` });
      };
      applyRest();

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        window.addEventListener("resize", applyRest);
        return () => window.removeEventListener("resize", applyRest);
      });

      mm.add(MOTION_OK, () => {
        // L'entrée (lever de lune, titre, détails) est jouée en CSS dès le premier rendu.
        // Expansion de la lune au défilement
        const bigK = () => {
          const cs = getComputedStyle(el);
          const r = parseFloat(cs.getPropertyValue("--r")) || 1;
          const cx = parseFloat(cs.getPropertyValue("--cx"));
          const cy = parseFloat(cs.getPropertyValue("--cy"));
          return (Math.hypot(Math.max(cx, el.clientWidth - cx), Math.max(cy, el.clientHeight - cy)) + 8) / r;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=115%",
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });
        tl.fromTo(el, { "--grow": 1 }, { "--grow": bigK, ease: "power2.in", duration: 1, immediateRender: false }, 0)
          .fromTo(
            frame,
            { x: () => rest().x, y: () => rest().y, scale: () => rest().scale, width: () => rest().box.width, height: () => rest().box.height, left: () => rest().box.left, top: () => rest().box.top },
            { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.out", immediateRender: false },
            0,
          )
          .fromTo(
            el,
            { "--dy": "0px" },
            {
              "--dy": () => `${el.clientHeight / 2 - parseFloat(getComputedStyle(el).getPropertyValue("--cy"))}px`,
              duration: 0.8,
              ease: "power1.inOut",
              immediateRender: false,
            },
            0,
          )
          .to(q("[data-hero-content]"), { yPercent: -14, autoAlpha: 0, duration: 0.45, ease: "power1.in" }, 0)
          .to(q("[data-hero-bar]"), { autoAlpha: 0, duration: 0.25 }, 0)
          .to(q("[data-ring]"), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(q("[data-kanji]"), { autoAlpha: 0, duration: 0.25 }, 0)
          .fromTo(q("[data-scrim]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, immediateRender: false }, 0.7)
          .fromTo(q("[data-caption]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out", immediateRender: false }, 0.78);

        const onRefresh = () => {
          if (tl.scrollTrigger && tl.scrollTrigger.progress === 0) applyRest();
        };
        ScrollTrigger.addEventListener("refresh", onRefresh);
        return () => ScrollTrigger.removeEventListener("refresh", onRefresh);
      });

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="hero-moon relative h-[100svh] min-h-[600px] overflow-hidden bg-paper lg:min-h-[640px]"
    >
      {/* La lune : la photo est découpée par un cercle animé */}
      <div data-moon className="absolute inset-0 overflow-hidden bg-cream">
        <div data-frame className="absolute inset-0 origin-top-left will-change-transform">
          <div data-photo className="absolute inset-0 will-change-transform">
            <Photo id="baristaIced" locale={locale} sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" preload focus="50% 50%" />
          </div>
        </div>
        <div data-scrim aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent opacity-0" />
        <p
          data-caption
          aria-hidden="true"
          className="wrap t-lede absolute inset-x-0 bottom-0 pb-10 font-[family-name:var(--font-display)] text-paper opacity-0 md:pb-14"
        >
          {siteConfig.address.street}, {siteConfig.address.district[locale]}
        </p>
      </div>

      <svg data-ring aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none overflow-visible text-moon-deep">
        <circle cx="50" cy="50" r="49.6" fill="none" stroke="currentColor" strokeWidth="0.35" pathLength={1} strokeDasharray="1" />
      </svg>

      <div data-kanji aria-hidden="true" className="hidden flex-col gap-1 text-matcha lg:flex">
        <span style={{ "--i": 0 } as React.CSSProperties}>
          <Kanji char="月" className="h-9 w-9" />
        </span>
        <span style={{ "--i": 1 } as React.CSSProperties}>
          <Kanji char="光" className="h-9 w-9" />
        </span>
      </div>

      <div data-hero-content className="wrap relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-28 lg:justify-center lg:pb-0 lg:pt-6">
        <div className="lg:max-w-[48vw]">
          <h1 id="hero-title" data-hero-title className="font-[family-name:var(--font-display)] text-[clamp(2.55rem,11.4vw,4.6rem)] leading-[0.98] tracking-[-0.035em] lg:text-[clamp(4rem,6.5vw,8.4rem)]">
            {h.title.map((l, i) => (
              <span key={i} className="line-mask">
                <span className="line-inner" style={{ "--i": i } as React.CSSProperties}>
                  {l}
                </span>
                {i < h.title.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p data-hero-fade style={{ "--i": 0 } as React.CSSProperties} className="t-lede mt-5 max-w-[26rem] text-ink-soft lg:mt-8">
            {h.lede}
          </p>
          <div data-hero-fade style={{ "--i": 1 } as React.CSSProperties} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 lg:mt-9">
            <ButtonLink href={href("menu", locale)}>{t.common.seeMenu}</ButtonLink>
            <TextLink href={href("visit", locale)} className="text-[0.9375rem]">
              {t.common.findUs}
            </TextLink>
          </div>
        </div>
      </div>

      <div data-hero-bar className="wrap t-small absolute inset-x-0 bottom-0 z-10 flex items-end justify-between pb-6 text-ink-soft">
        <div data-hero-fade style={{ "--i": 2 } as React.CSSProperties} className="hidden sm:block">
          <OpenStatus locale={locale} />
        </div>
        <div data-hero-fade style={{ "--i": 3 } as React.CSSProperties} className="flex items-center gap-3">
          <span>{h.scroll}</span>
          <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-ink)_infinite] bg-ink" />
          </span>
        </div>
      </div>
      <p className="sr-only">{h.moonCaption}</p>
    </section>
  );
}
