"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photos, type PhotoKey } from "@/data/gallery-data";
import { useMotion } from "@/components/motion/MotionProvider";
import { gsap } from "@/lib/gsap";
import { getDictionary, fill } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Visionneuse accessible : dialogue modal, focus piégé, Échap pour fermer,
 * flèches du clavier et glissement tactile. L'image est montrée entière (sans recadrage).
 */
export function Lightbox({
  items,
  index,
  onChange,
  onClose,
  locale,
}: {
  items: PhotoKey[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
  locale: Locale;
}) {
  const t = getDictionary(locale).cafePage.gallery;
  const dialog = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const touch = useRef<number | null>(null);
  const { lenis, reduced } = useMotion();
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    lenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    const node = dialog.current!;
    node.querySelector<HTMLElement>("[data-close]")?.focus();
    if (!reduced) gsap.fromTo(node, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
      lenis()?.start();
      document.documentElement.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose, go, lenis, reduced]);

  useEffect(() => {
    if (open && !reduced && img.current) gsap.fromTo(img.current, { autoAlpha: 0, scale: 0.985 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" });
  }, [index, open, reduced]);

  if (!open || typeof document === "undefined") return null;
  const p = photos[items[index]];

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={p.alt[locale]}
      className="on-dark fixed inset-0 z-[95] flex flex-col bg-ink/[0.97] text-paper"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between">
        <p className="t-small tabular-nums text-paper/70" aria-live="polite">
          {fill(t.counter, { n: index + 1, total: items.length })}
        </p>
        <button data-close type="button" onClick={onClose} className="flex min-h-11 items-center gap-2 rounded-full px-3 hover:bg-paper/10">
          <span className="t-small">{t.close}</span>
          <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex-1" onClick={onClose}>
        <div ref={img} className="absolute inset-x-[var(--gutter)] inset-y-2 md:inset-x-24">
          <Image src={p.src} alt={p.alt[locale]} fill sizes="100vw" quality={82} className="object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      </div>
      <div className="wrap flex min-h-24 items-center justify-between gap-6 py-4">
        <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-ink">
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <p className="t-small max-w-xl text-center text-paper/80">{p.alt[locale]}</p>
        <button type="button" onClick={() => go(1)} aria-label={t.next} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-ink">
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
