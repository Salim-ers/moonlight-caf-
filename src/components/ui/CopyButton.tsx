"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copie un texte dans le presse-papiers, avec confirmation visible et annoncée. */
export function CopyButton({ text, label, done, className = "" }: { text: string; label: string; done: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button type="button" onClick={copy} className={`group inline-flex min-h-11 items-center gap-2 font-medium ${className}`}>
      <span className="relative h-4 w-4" aria-hidden="true">
        <Copy className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${copied ? "scale-50 opacity-0" : ""}`} strokeWidth={1.8} />
        <Check className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${copied ? "" : "scale-50 opacity-0"}`} strokeWidth={2} />
      </span>
      <span className="link-draw" aria-live="polite">
        {copied ? done : label}
      </span>
    </button>
  );
}
