"use client";

import { useEffect, useRef } from "react";

/**
 * Petit indicateur de lecture : la lune passe de « nouvelle » à « pleine »
 * à mesure que l'on descend dans la page.
 */
export function MoonPhase({ label, className = "" }: { label: string; className?: string }) {
  const shadow = useRef<SVGCircleElement>(null);
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      shadow.current?.setAttribute("cx", String(12 + p * 22));
      root.current?.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 24 24"
      className={`h-[22px] w-[22px] ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <defs>
        <clipPath id="moon-clip">
          <circle cx="12" cy="12" r="9" />
        </clipPath>
      </defs>
      <g clipPath="url(#moon-clip)">
        <circle cx="12" cy="12" r="9" className="fill-moon-deep" />
        <circle ref={shadow} cx="12" cy="12" r="9.4" className="fill-paper" />
      </g>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
