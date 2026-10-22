"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, type ComponentProps } from "react";
import { routeKeyFromPath } from "@/i18n/config";
import { pageTone, tones } from "@/lib/tones";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const frame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/** Durées de la transition signature (ms). Aucune attente artificielle au-delà. */
const COVER = 150;
const MIN_LOGO = 90;
const REVEAL = 280;

function focusMain() {
  document.getElementById("main")?.focus({ preventScroll: true });
}

function scrollToTarget(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

/**
 * Transition entre les pages : une couleur douce (celle de la page d'arrivée) recouvre l'écran,
 * le logo officiel COMPLET apparaît au centre (jeune femme, tasse, vapeur et lettrage,
 * en `object-fit: contain`, jamais recadré), la page change dessous, puis tout s'efface.
 * ≈ 450 ms quand la page est prête (elle est préchargée par Next.js), jamais bloquant.
 * « Réduire les animations » : navigation instantanée, sans voile.
 * Le bouton Précédent du navigateur garde le comportement natif.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const arrived = useRef<(() => void) | null>(null);

  useEffect(() => {
    arrived.current?.();
    arrived.current = null;
  }, [pathname]);

  const navigate = useCallback(
    async (href: string) => {
      const url = new URL(href, window.location.href);
      const samePage = url.pathname.replace(/\/$/, "") === window.location.pathname.replace(/\/$/, "");
      const motion = document.documentElement.classList.contains("js-motion");

      if (samePage) {
        if (url.hash) {
          history.pushState(null, "", url.hash);
          const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
          el?.scrollIntoView({ behavior: motion ? "smooth" : "instant", block: "start" });
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } else window.scrollTo({ top: 0, behavior: motion ? "smooth" : "instant" });
        return;
      }

      if (busy.current) return;
      const el = overlay.current;

      if (!motion || !el) {
        const arrival = new Promise<void>((r) => (arrived.current = r));
        router.push(href, { scroll: !url.hash });
        await Promise.race([arrival, wait(4000)]);
        if (url.hash) scrollToTarget(url.hash);
        focusMain();
        return;
      }
      busy.current = true;
      const arrival = new Promise<void>((r) => (arrived.current = r));

      const key = routeKeyFromPath(url.pathname);
      el.style.setProperty("--pt-bg", tones[key ? pageTone[key] : "butter"].soft);
      el.dataset.state = "cover";
      await wait(COVER);

      const covered = performance.now();
      document.documentElement.classList.add("is-navigating");
      router.push(href, { scroll: false });
      await Promise.race([arrival, wait(4000)]);
      scrollToTarget(url.hash);
      await frame();
      await frame();
      const shown = performance.now() - covered;
      if (shown < MIN_LOGO) await wait(MIN_LOGO - shown);

      document.documentElement.classList.remove("is-navigating");
      el.dataset.state = "reveal";
      focusMain();
      await wait(REVEAL);
      if (el.dataset.state === "reveal") el.dataset.state = "idle";
      busy.current = false;
    },
    [router],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={overlay} className="pt" data-state="idle" data-transition-overlay aria-hidden="true">
        <Image src="/brand/moonlight-logo.webp" alt="" width={900} height={637} unoptimized className="pt-logo" />
      </div>
    </TransitionContext.Provider>
  );
}

type TLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Lien interne avec transition de page. Cmd/Ctrl + clic garde le comportement natif (nouvel onglet). */
export function TLink({ href, ...props }: TLinkProps) {
  const { navigate } = useContext(TransitionContext);
  return (
    <Link
      href={href}
      {...props}
      onNavigate={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
