import type { ReactNode } from "react";
import { TLink } from "@/components/motion/TransitionProvider";

type Variant = "ink" | "outline" | "light" | "outline-light" | "matcha";

const variants: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  ink: { base: "bg-ink text-paper", fill: "bg-matcha-deep", hoverText: "group-hover:text-paper" },
  matcha: { base: "bg-matcha-deep text-paper", fill: "bg-ink", hoverText: "group-hover:text-paper" },
  outline: { base: "border border-ink/80 text-ink", fill: "bg-ink", hoverText: "group-hover:text-paper" },
  light: { base: "bg-paper text-ink", fill: "bg-moon", hoverText: "group-hover:text-ink" },
  "outline-light": { base: "border border-paper/70 text-paper", fill: "bg-paper", hoverText: "group-hover:text-ink" },
};

type Common = { children: ReactNode; variant?: Variant; icon?: ReactNode; className?: string; size?: "md" | "sm" };

/** Le libellé roule vers le haut et une « lune » monte pour remplir le bouton au survol. */
function Inner({ children, variant = "ink", icon, size = "md" }: Common) {
  const v = variants[variant];
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-full aspect-square w-[160%] -translate-x-1/2 rounded-full ${v.fill} transition-transform duration-700 ease-[var(--ease-moon)] group-hover:-translate-y-[62%] group-focus-visible:-translate-y-[62%] motion-reduce:transition-none`}
      />
      <span className={`relative inline-flex items-center gap-2.5 ${size === "sm" ? "" : ""} ${v.hoverText} transition-colors duration-500`}>
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[var(--ease-moon)] group-hover:-translate-y-full motion-reduce:transition-none">
            {children}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-moon)] group-hover:translate-y-0 motion-reduce:transition-none"
          >
            {children}
          </span>
        </span>
        {icon ? <span className="transition-transform duration-500 ease-[var(--ease-moon)] group-hover:translate-x-0.5">{icon}</span> : null}
      </span>
    </>
  );
}

const shell = (variant: Variant, size: "md" | "sm", className = "") =>
  `group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full ${
    size === "sm" ? "min-h-10 px-4 text-[0.875rem]" : "min-h-12 px-6 text-[0.9375rem]"
  } font-medium tracking-[0.01em] ${variants[variant].base} ${className}`;

export function ButtonLink({ href, external, ...p }: Common & { href: string; external?: boolean; ariaLabel?: string }) {
  const variant = p.variant ?? "ink";
  const size = p.size ?? "md";
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    const ext = href.startsWith("http");
    return (
      <a
        href={href}
        className={shell(variant, size, p.className)}
        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={p.ariaLabel}
      >
        <Inner {...p} />
      </a>
    );
  }
  return (
    <TLink href={href} className={shell(variant, size, p.className)} aria-label={p.ariaLabel}>
      <Inner {...p} />
    </TLink>
  );
}

export function Button({
  onClick,
  type = "button",
  ariaLabel,
  ...p
}: Common & { onClick?: () => void; type?: "button" | "submit"; ariaLabel?: string }) {
  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={shell(p.variant ?? "ink", p.size ?? "md", p.className)}>
      <Inner {...p} />
    </button>
  );
}

/** Lien texte discret avec trait qui se dessine. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`link-draw ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <TLink href={href} className={`link-draw ${className}`}>
      {children}
    </TLink>
  );
}
