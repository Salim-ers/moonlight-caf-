import type { CSSProperties } from "react";

export type DrinkKind = "layered" | "latte" | "cookie" | "iced-cup";

/**
 * Illustrations abstraites des créations (verre en couches, tasse, cookie, gobelet glacé),
 * au trait rond comme le logo. Ce ne sont pas des photos : elles signalent une couleur, un format.
 */
export function DrinkArt({
  kind,
  colors,
  uid,
  className = "",
  style,
}: {
  kind: DrinkKind;
  colors: string[];
  uid: string;
  className?: string;
  style?: CSSProperties;
}) {
  const s = { fill: "none", stroke: "var(--color-ink)", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const id = `drink-clip-${uid}`;

  if (kind === "cookie") {
    return (
      <svg viewBox="0 0 140 140" className={className} style={style} aria-hidden="true">
        <path d="M70 14c26 0 52 18 54 50 2 34-22 60-54 60S14 100 16 66C18 34 44 14 70 14z" {...s} fill={colors[0]} />
        {[
          [52, 48],
          [86, 42],
          [96, 78],
          [62, 86],
          [40, 72],
          [76, 104],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 6 : 7.5} fill={i % 3 === 0 ? colors[1] : "var(--color-ink)"} />
        ))}
      </svg>
    );
  }

  if (kind === "latte") {
    return (
      <svg viewBox="0 0 140 140" className={className} style={style} aria-hidden="true">
        <ellipse cx="66" cy="120" rx="52" ry="9" {...s} fill="var(--color-ivory)" />
        <path d="M22 56h88c0 34-18 58-44 58S22 90 22 56z" {...s} fill="var(--color-ivory)" />
        <path d="M110 66h6a12 12 0 0 1 0 24h-9" {...s} />
        <ellipse cx="66" cy="56" rx="44" ry="11" {...s} fill={colors[0]} />
        <path d="M66 49c-6 2-9 5-7 8 2 2 5 1 7-2 2 3 5 4 7 2 2-3-1-6-7-8z" fill="var(--color-ivory)" />
        <path d="M54 30c-5 5 5 8 0 14M68 24c-5 6 5 9 0 16M82 30c-5 5 5 8 0 14" {...s} strokeWidth={2.5} />
      </svg>
    );
  }

  // Verres glacés : couches de couleur découpées dans la forme du verre
  const glass = kind === "iced-cup" ? "M36 40h68l-7 86c-1 6-5 9-11 9H54c-6 0-10-3-11-9z" : "M34 34h72l-8 92c-1 6-5 9-11 9H53c-6 0-10-3-11-9z";
  const bands = colors.length;
  return (
    <svg viewBox="0 0 140 140" className={className} style={style} aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d={glass} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {colors.map((c, i) => {
          const top = 44 + (i * 92) / bands;
          return <rect key={i} x="20" y={top} width="100" height={92 / bands + 2} fill={c} />;
        })}
        <rect x="48" y="56" width="16" height="14" rx="4" fill="rgb(255 255 255 / 0.55)" />
        <rect x="70" y="64" width="14" height="13" rx="4" fill="rgb(255 255 255 / 0.45)" />
      </g>
      {kind === "iced-cup" ? <path d="M30 40c4-14 18-20 40-20s36 6 40 20z" {...s} fill="var(--color-ivory)" /> : null}
      <path d={glass} {...s} />
      <path d={kind === "iced-cup" ? "M82 6l-8 50" : "M88 8l-12 62"} stroke="var(--color-caramel)" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
}
