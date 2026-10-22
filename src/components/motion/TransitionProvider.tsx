"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, type ComponentProps } from "react";
import { gsap, ScrollTrigger, holdPage, releasePage } from "@/lib/gsap";
import { useMotion } from "./MotionProvider";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const HEADER_OFFSET = -88;

/**
 * Transition entre les pages : un voile vert matcha monte comme une lune qui se lève,
 * la page change dessous, puis le voile se retire vers le haut.
 * ~0,9 s au total, jamais bloquant ; désactivé si « réduire les animations ».
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { reduced, scrollTo } = useMotion();
  const overlay = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const arrived = useRef<(() => void) | null>(null);

  useEffect(() => {
    arrived.current?.();
    arrived.current = null;
  }, [pathname]);

  const scrollToHash = useCallback(
    (hash: string, immediate: boolean) => {
      const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (el) scrollTo(el, { immediate, offset: HEADER_OFFSET });
      else scrollTo(0, { immediate: true });
    },
    [scrollTo],
  );

  const navigate = useCallback(
    async (href: string) => {
      const url = new URL(href, window.location.href);
      const samePage = url.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "");
      if (samePage) {
        if (url.hash) {
          history.replaceState(null, "", url.hash);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
          scrollToHash(url.hash, false);
        } else scrollTo(0);
        return;
      }
      if (reduced || !overlay.current) {
        router.push(href, { scroll: !url.hash });
        if (url.hash) setTimeout(() => scrollToHash(url.hash, true), 120);
        return;
      }
      if (busy.current) return;
      busy.current = true;
      holdPage();
      const el = overlay.current;
      const panel = el.querySelector<HTMLElement>("[data-panel]");
      const mark = el.querySelector<HTMLElement>("[data-mark]");

      gsap.set(el, { visibility: "visible" });
      await gsap
        .timeline()
        .fromTo(
          panel,
          { yPercent: 100, borderTopLeftRadius: "50% 18vh", borderTopRightRadius: "50% 18vh" },
          { yPercent: 0, borderTopLeftRadius: "50% 0vh", borderTopRightRadius: "50% 0vh", duration: 0.55, ease: "power3.inOut" },
        )
        .fromTo(mark, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.2")
        .then();

      const done = new Promise<void>((resolve) => {
        arrived.current = resolve;
      });
      document.documentElement.classList.add("navigating");
      router.push(href, { scroll: false });
      await Promise.race([done, new Promise((r) => setTimeout(r, 3000))]);
      // laisse React peindre la nouvelle page
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      scrollToHash(url.hash, true);

      releasePage();
      document.documentElement.classList.remove("navigating");
      await gsap
        .timeline()
        .to(mark, { autoAlpha: 0, y: -10, duration: 0.25, ease: "power2.in" })
        .to(
          panel,
          { yPercent: -100, borderBottomLeftRadius: "50% 18vh", borderBottomRightRadius: "50% 18vh", duration: 0.65, ease: "power3.inOut" },
          "-=0.05",
        )
        .then();
      gsap.set(panel, { clearProps: "all" });
      gsap.set(el, { visibility: "hidden" });
      busy.current = false;
    },
    [pathname, reduced, router, scrollTo, scrollToHash],
  );

  // Arrivée directe sur une URL avec ancre (/la-carte#matcha)
  useEffect(() => {
    if (window.location.hash) {
      const h = window.location.hash;
      const t = setTimeout(() => scrollToHash(h, true), 300);
      return () => clearTimeout(t);
    }
  }, [scrollToHash]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlay}
        data-transition-overlay
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[90]"
      >
        <div data-panel className="absolute inset-0 flex items-center justify-center bg-matcha-night will-change-transform">
          <div data-mark className="flex flex-col items-center gap-4 opacity-0">
            <Image src="/brand/logo-cup-light.png" alt="" width={135} height={237} className="h-16 w-auto" />
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

type TLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Lien interne avec transition de page. Les clics Cmd/Ctrl gardent le comportement natif. */
export function TLink({ href, onClick, ...props }: TLinkProps) {
  const { navigate } = usePageTransition();
  return (
    <Link
      href={href}
      {...props}
      onClick={onClick}
      onNavigate={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
