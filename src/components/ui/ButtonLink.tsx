import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { TLink } from "@/components/motion/PageTransition";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "ink" | "outline" | "light";
  size?: "md" | "sm";
  icon?: ReactNode;
  /** Bouton magnétique (souris uniquement). */
  magnetic?: boolean;
  className?: string;
  ariaLabel?: string;
  /** Couleur qui remplit le bouton au survol. */
  fill?: string;
};

/** Bouton-lien : interne (transition de page) ou externe (nouvel onglet, flèche ↗). */
export function ButtonLink({ href, children, variant = "ink", size = "md", icon, magnetic, className = "", ariaLabel, fill }: Props) {
  const cls = `btn ${variant === "outline" ? "btn-outline" : variant === "light" ? "btn-light" : ""} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const style = fill ? ({ "--btn-fill": fill } as React.CSSProperties) : undefined;
  const external = /^(https?:|mailto:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {icon ?? (external && href.startsWith("http") ? <ArrowUpRight className="btn-icon h-4 w-4" strokeWidth={2} aria-hidden="true" /> : null)}
    </>
  );
  if (external) {
    const blank = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        style={style}
        data-magnetic={magnetic ? "6" : undefined}
        aria-label={ariaLabel}
        {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <TLink href={href} className={cls} style={style} data-magnetic={magnetic ? "6" : undefined} aria-label={ariaLabel}>
      {content}
    </TLink>
  );
}
