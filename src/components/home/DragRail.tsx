"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Rail horizontal : défilement natif (doigt, trackpad, clavier via les liens), sans détournement du
 * défilement vertical. À la souris : glisser-déposer et petit curseur « Glisser » sur le rail
 * uniquement — le curseur du reste du site n'est jamais remplacé.
 */
export function DragRail({
  children,
  label,
  dragLabel,
  prevLabel,
  nextLabel,
}: {
  children: ReactNode;
  label: string;
  dragLabel: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const rail = useRef<HTMLUListElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rail.current;
    const cur = cursor.current;
    if (!el || !cur || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType !== "mouse") return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) el.classList.add("is-dragging");
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      down = false;
      el.classList.remove("is-dragging");
    };
    const onClick = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
      moved = 0;
    };
    const onEnter = () => cur.classList.add("is-on");
    const onLeave = () => {
      cur.classList.remove("is-on");
      onUp();
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("dragstart", (e) => e.preventDefault());
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li:nth-child(2)");
    const reduce = !document.documentElement.classList.contains("js-motion");
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 20 : el.clientWidth * 0.8), behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <div className="relative">
      <ul ref={rail} aria-label={label} className="rail no-scrollbar">
        {children}
      </ul>
      <div className="wrap mt-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={prevLabel}
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={nextLabel}
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      <div ref={cursor} aria-hidden="true" className="rail-cursor">
        <span>{dragLabel}</span>
      </div>
    </div>
  );
}
