import type { CSSProperties } from "react";

/**
 * Micro-illustrations abstraites (tasse, vapeur, goutte, étincelle) au trait rond,
 * dans l'esprit du dessin du logo — sans jamais le reproduire ni le modifier.
 */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function SteamCup({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <path {...stroke} d="M24 9c-4 4 4 7 0 12M32 6c-4 5 4 8 0 14M40 9c-4 4 4 7 0 12" />
      <path {...stroke} d="M13 30h34v6c0 10-7 18-17 18s-17-8-17-18z" />
      <path {...stroke} d="M47 34h3a6 6 0 0 1 0 12h-4" />
    </svg>
  );
}

export function Drop({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" className={className} style={style} aria-hidden="true">
      <path d="M20 2C14 14 4 22 4 33a16 16 0 0 0 32 0C36 22 26 14 20 2z" fill="currentColor" />
    </svg>
  );
}

export function Sparkle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <path d="M20 0c1.6 10.4 9.6 18.4 20 20-10.4 1.6-18.4 9.6-20 20C18.4 29.6 10.4 21.6 0 20 10.4 18.4 18.4 10.4 20 0z" fill="currentColor" />
    </svg>
  );
}

/** Courbe de vapeur qui se dessine (séparateur décoratif). */
export function SteamLine({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 60" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
      <path {...stroke} strokeWidth={2} d="M2 40c20-30 40 20 60-6s40-24 60 2 40 18 76-14" />
    </svg>
  );
}

/** Texte disposé en cercle, qui tourne lentement (CSS). */
export function CircleText({ text, className = "", id }: { text: string; className?: string; id: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`spin-slow ${className}`} aria-hidden="true">
      <defs>
        <path id={id} d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
      </defs>
      <text style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15.5, letterSpacing: "0.2em", textTransform: "uppercase" }} fill="currentColor">
        <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
