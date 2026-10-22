"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Easing signature du site : départ franc, arrivée très douce. */
export const EASE = "expo.out";
export const EASE_INOUT = "power3.inOut";

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type MotionWindow = Window & { __mlBusy?: number };

/**
 * Les animations d'entrée de page attendent la fin de l'intro ou de la transition de page.
 * `holdPage()` / `releasePage()` sont appelés par l'intro et par la transition.
 */
export function holdPage() {
  const w = window as MotionWindow;
  w.__mlBusy = (w.__mlBusy ?? 0) + 1;
}
export function releasePage() {
  const w = window as MotionWindow;
  w.__mlBusy = Math.max(0, (w.__mlBusy ?? 1) - 1);
  if (w.__mlBusy === 0) window.dispatchEvent(new Event("ml:page-ready"));
}
export function whenPageReady(cb: () => void) {
  const w = window as MotionWindow;
  if (!w.__mlBusy) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("ml:page-ready", handler, { once: true });
  return () => window.removeEventListener("ml:page-ready", handler);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
