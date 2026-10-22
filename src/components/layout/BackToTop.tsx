"use client";

export function BackToTop({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = !document.documentElement.classList.contains("js-motion");
        window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className={`link-draw min-h-11 ${className}`}
    >
      {label} ↑
    </button>
  );
}
