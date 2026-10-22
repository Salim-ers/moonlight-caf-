"use client";

import { useMotion } from "@/components/motion/MotionProvider";

export function BackToTop({ label }: { label: string }) {
  const { scrollTo } = useMotion();
  return (
    <button
      type="button"
      onClick={() => {
        scrollTo(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="link-draw min-h-11"
    >
      {label}
    </button>
  );
}
