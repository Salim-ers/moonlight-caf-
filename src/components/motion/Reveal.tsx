import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Primitives d'animation déclaratives, utilisables dans des Server Components :
 * elles posent seulement des attributs/classes. Le moteur (`MotionRuntime`) et le CSS font le reste.
 * Si JavaScript ou les animations sont désactivés, le contenu reste entièrement visible.
 */

export type RevealVariant = "up" | "fade" | "pop" | "lines" | "stagger" | "clip-up" | "clip-left" | "clip-right" | "circle" | "window";

const withDelay = (style: CSSProperties | undefined, delay: number) => (delay ? ({ ...style, "--d": `${delay}s` } as CSSProperties) : style);

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

/** Révélé une fois, à l'entrée dans l'écran. */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", style, children, id }: RevealProps) {
  return (
    <Tag id={id} data-reveal={variant} className={className} style={withDelay(style, delay)}>
      {children}
    </Tag>
  );
}

/** Animé dès le premier affichage, en CSS pur (pas d'attente de React). */
export function Enter({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  style,
  children,
}: Omit<RevealProps, "variant"> & { variant?: "up" | "clip" | "pop" | "fade" }) {
  return (
    <Tag className={`enter-${variant} ${className}`} style={withDelay(style, delay)}>
      {children}
    </Tag>
  );
}

type LinesProps = {
  as?: ElementType;
  lines: readonly string[];
  /** Index de la ligne composée en italique serif (la touche « campagne »). */
  accent?: number;
  /** `load` : au premier affichage (en-têtes) ; `scroll` : à l'entrée dans l'écran. */
  mode?: "load" | "scroll";
  delay?: number;
  className?: string;
  id?: string;
};

/** Titre révélé ligne à ligne derrière un masque. Le texte reste un vrai titre HTML, lisible sans JS. */
export function Lines({ as: Tag = "h2", lines, accent, mode = "scroll", delay = 0, className = "", id }: LinesProps) {
  return (
    <Tag
      id={id}
      data-reveal={mode === "scroll" ? "lines" : undefined}
      className={`${mode === "load" ? "enter-lines" : ""} ${className}`}
      style={withDelay(undefined, delay)}
    >
      {lines.map((l, i) => (
        <span key={i} className="ln">
          <span style={{ "--i": i } as CSSProperties}>{i === accent ? <em>{l}</em> : l}</span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
