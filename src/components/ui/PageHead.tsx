import type { CSSProperties, ReactNode } from "react";
import { Enter } from "@/components/motion/Reveal";
import { toneVars, type Tone } from "@/lib/tones";

/**
 * En-tête des pages intérieures : grand titre, sous-titre en italique serif, couleur propre à la page,
 * et un emplacement visuel libre (chaque page compose le sien). Entrée en CSS pur, visible immédiatement.
 */
export function PageHead({
  tone,
  title,
  tagline,
  lede,
  visual,
  aside,
  className = "",
}: {
  tone: Tone;
  title: string;
  tagline?: string;
  lede?: string;
  visual?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`relative overflow-hidden bg-[var(--tone-soft)] pb-14 pt-[calc(var(--header-h)+3rem)] md:pb-20 md:pt-[calc(var(--header-h)+4.5rem)] ${className}`}
      style={toneVars(tone)}
    >
      <div className="wrap relative grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className={visual ? "lg:col-span-7" : "lg:col-span-10"}>
          <h1 className="t-display enter-lines">
            <span className="ln">
              <span style={{ "--i": 0 } as CSSProperties}>{title}</span>
            </span>
            {tagline ? (
              <span className="ln">
                <span style={{ "--i": 1 } as CSSProperties}>
                  {" "}
                  <em className="text-[var(--tone-deep)]">{tagline}</em>
                </span>
              </span>
            ) : null}
          </h1>
          {lede ? (
            <Enter as="p" delay={0.22} className="t-lede mt-7 max-w-[34rem] text-ink/80">
              {lede}
            </Enter>
          ) : null}
          {aside ? (
            <Enter delay={0.3} className="mt-7">
              {aside}
            </Enter>
          ) : null}
        </div>
        {visual ? <div className="relative lg:col-span-5">{visual}</div> : null}
      </div>
    </header>
  );
}
