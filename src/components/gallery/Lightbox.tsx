"use client";

import Image, { type StaticImageData } from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxItem = { src: StaticImageData; alt: string };
type Labels = { open: string; close: string; prev: string; next: string; counter: string };

const Ctx = createContext<{ open: (i: number) => void; labels: Labels; items: LightboxItem[] } | null>(null);

/**
 * Visionneuse : une photo affichée en grand à la suite d'un clic sur sa propre vignette
 * (même emplacement éditorial, pas un doublon). Dialogue modal, focus piégé, Échap pour fermer,
 * flèches du clavier et glissement tactile. L'image est montrée entière, sans recadrage.
 */
export function LightboxProvider({ items, labels, children }: { items: LightboxItem[]; labels: Labels; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<number | null>(null);
  const isOpen = index !== null;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)), [items.length]);
  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (!isOpen) return;
    const node = dialog.current!;
    document.documentElement.style.overflow = "hidden";
    node.querySelector<HTMLElement>("[data-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const f = Array.from(node.querySelectorAll<HTMLElement>("button"));
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener.current?.focus();
    };
  }, [isOpen, close, go]);

  const open = useCallback((i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setIndex(i);
  }, []);

  const p = index !== null ? items[index] : null;
  return (
    <Ctx.Provider value={{ open, labels, items }}>
      {children}
      {p && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-label={p.alt}
              className="lightbox fixed inset-0 z-[95] flex flex-col bg-ink/95 text-ivory"
              onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touch.current === null) return;
                const dx = e.changedTouches[0].clientX - touch.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                touch.current = null;
              }}
            >
              <div className="wrap flex h-[var(--header-h)] items-center justify-between">
                <p className="t-small tabular-nums text-ivory/70" aria-live="polite">
                  {labels.counter.replace("{n}", String(index! + 1)).replace("{total}", String(items.length))}
                </p>
                <button data-close type="button" onClick={close} className="chip min-h-11 gap-2 bg-ivory/10 text-ivory hover:bg-ivory/20">
                  {labels.close}
                  <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <div className="relative flex-1" onClick={close}>
                <div key={index} className="lightbox-img absolute inset-x-[var(--gutter)] inset-y-2 md:inset-x-24">
                  <Image src={p.src} alt={p.alt} fill sizes="100vw" quality={72} className="object-contain" onClick={(e) => e.stopPropagation()} />
                </div>
              </div>
              <div className="wrap flex min-h-24 items-center justify-between gap-6 py-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={labels.prev}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-ink"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </button>
                <p className="t-small max-w-xl text-center text-ivory/80">{p.alt}</p>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={labels.next}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-ink"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </Ctx.Provider>
  );
}

/** Vignette cliquable qui ouvre la visionneuse sur sa propre photo. */
export function LightboxTrigger({ index, children, className = "" }: { index: number; children: ReactNode; className?: string }) {
  const ctx = useContext(Ctx);
  if (!ctx) return <>{children}</>;
  return (
    <button
      type="button"
      onClick={() => ctx.open(index)}
      className={`group lb-trigger ${className}`}
      aria-label={`${ctx.labels.open} : ${ctx.items[index].alt}`}
    >
      {children}
    </button>
  );
}
