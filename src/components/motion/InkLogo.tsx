"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Le logo original (PNG fourni, non redessiné) apparaît comme si l'encre se posait :
 * un masque dégradé balaie le dessin de haut en bas. Aucune déformation du fichier.
 */
export function InkLogo({ className = "", light = false, priority = false }: { className?: string; light?: boolean; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { "--ink": "0%" },
          {
            "--ink": "135%",
            duration: 2.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div
      ref={ref}
      className={`ink-mask ${className}`}
      style={{ "--ink": "135%" } as React.CSSProperties}
    >
      <Image
        src={light ? "/brand/logo-full-light.png" : "/brand/logo-full.png"}
        alt="Moonlight café"
        width={1339}
        height={947}
        preload={priority}
        sizes="(max-width: 640px) 78vw, 340px"
        className="h-auto w-full"
      />
    </div>
  );
}
