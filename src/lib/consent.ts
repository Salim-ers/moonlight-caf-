"use client";

/**
 * Consentement aux services tiers. Seul Google Maps est concerné (aucune mesure d'audience,
 * aucun cookie publicitaire). Le choix est mémorisé dans le navigateur (localStorage)
 * et peut être retiré à tout moment depuis la page Cookies.
 */
const KEY = "ml-consent-maps";
const EVENT = "ml:consent";

export function getMapsConsent(): boolean {
  try {
    return localStorage.getItem(KEY) === "granted";
  } catch {
    return false;
  }
}

export function setMapsConsent(granted: boolean) {
  try {
    if (granted) localStorage.setItem(KEY, "granted");
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function onConsentChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
