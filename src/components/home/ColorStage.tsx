"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type ColorOption = {
  key: string;
  word: string;
  label: string;
  detail: string;
  price?: string;
  x: number;
  y: number;
  bg: string;
  deep: string;
  dot: string;
};

/** Zoom ×1,9 sur un point de la photo, recadré pour que l'image couvre toujours le cadre. */
const SCALE = 1.9;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
function zoomTo(x: number, y: number) {
  const tx = clamp(50 - SCALE * x, 100 - 100 * SCALE, 0);
  const ty = clamp(50 - SCALE * y, 100 - 100 * SCALE, 0);
  return `translate(${tx}%, ${ty}%) scale(${SCALE})`;
}

/**
 * Îlot interactif de la scène « Coffee & colors ».
 * Défilement automatique doux tant que la section est visible (arrêté dès que l'on choisit une
 * couleur, au survol, au focus, et jamais si l'on a demandé à réduire les animations).
 */
export function ColorStage({
  options,
  hint,
  eyebrow,
  heading,
  photo,
  cta,
}: {
  options: ColorOption[];
  hint: string;
  eyebrow: string;
  heading: ReactNode;
  photo: ReactNode;
  cta: ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const root = useRef<HTMLElement>(null);
  const userPicked = useRef(false);
  const paused = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el || !document.documentElement.classList.contains("js-motion")) return;
    let timer = 0;
    let visible = false;
    const tick = () => {
      if (visible && !paused.current && !userPicked.current && document.visibilityState === "visible") setIdx((i) => (i + 1) % options.length);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    timer = window.setInterval(tick, 3400);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [options.length]);

  const o = options[idx];
  return (
    <section
      ref={root}
      aria-labelledby="colors-title"
      className="cc relative overflow-hidden py-24 md:py-32"
      style={{ "--cc-bg": o.bg, "--cc-deep": o.deep, "--cc-dot": o.dot } as CSSProperties}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <p className="t-eyebrow text-[var(--cc-deep)]">{eyebrow}</p>
          {heading}
          <p aria-hidden="true" className="cc-word-wrap mt-8">
            <span key={o.key} className="cc-word">
              {o.word}
            </span>
          </p>
          <div className="mt-4 min-h-[5.5rem] max-w-[26rem]">
            <p className="flex items-baseline gap-3 font-semibold">
              <span>{o.label}</span>
              {o.price ? <span className="tabular-nums text-[var(--cc-deep)]">{o.price}</span> : null}
            </p>
            <p className="t-small mt-1 text-ink/75">{o.detail}</p>
          </div>
          <div role="group" aria-label={hint} className="mt-6 flex flex-wrap gap-2">
            {options.map((op, i) => (
              <button
                key={op.key}
                type="button"
                aria-pressed={i === idx}
                onClick={() => {
                  userPicked.current = true;
                  setIdx(i);
                }}
                className={`chip min-h-11 gap-2 px-4 font-semibold transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 ${
                  i === idx ? "bg-ink text-ivory" : "bg-ivory/80"
                }`}
              >
                <span className="dot" style={{ "--dot": op.dot } as CSSProperties} aria-hidden="true" />
                {op.word}
              </button>
            ))}
          </div>
          <div className="mt-8">{cta}</div>
        </div>

        <div className="lg:col-span-7">
          <div className="cc-frame">
            <div className="cc-photo" style={{ transform: zoomTo(o.x, o.y) }}>
              {photo}
            </div>
            <span className="cc-pin" aria-hidden="true">
              <span className="dot h-3 w-3" style={{ "--dot": "var(--cc-dot)" } as CSSProperties} />
              {o.word}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
