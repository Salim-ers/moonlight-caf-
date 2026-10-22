"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand } from "lucide-react";
import { photos, galleryOrder, type PhotoCategory, type PhotoKey } from "@/data/gallery-data";
import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { Lightbox } from "./Lightbox";

const ASPECTS = ["aspect-[3/2]", "aspect-[4/5]", "aspect-[16/9]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]"];
type Filter = "all" | PhotoCategory;
const FILTERS: Filter[] = ["all", "lieu", "gestes", "table", "patisserie"];

/** Galerie en colonnes (masonry), filtres sans rechargement, ouverture en visionneuse. */
export function GalleryGrid({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cafePage.gallery;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const grid = useRef<HTMLUListElement>(null);
  const { reduced } = useMotion();

  const items: PhotoKey[] = galleryOrder.filter((k) => filter === "all" || photos[k].category === filter);

  useEffect(() => {
    if (!grid.current) return;
    ScrollTrigger.refresh();
    if (reduced) return;
    gsap.fromTo(
      grid.current.querySelectorAll("li"),
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.04, ease: "power3.out", overwrite: true },
    );
  }, [filter, reduced]);

  return (
    <div>
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-11 rounded-full border px-5 text-[0.9375rem] transition-colors duration-300 ${
              filter === f ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
            }`}
          >
            {t.filters[f]}
          </button>
        ))}
      </div>
      <ul ref={grid} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((k, i) => {
          const p = photos[k];
          return (
            <li key={`${filter}-${k}`} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden rounded-[2px] bg-cream ${ASPECTS[galleryOrder.indexOf(k) % ASPECTS.length]}`}
                aria-label={`${t.open} : ${p.alt[locale]}`}
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                  quality={70}
                  className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-moon)] group-hover:scale-[1.04]"
                  style={{ objectPosition: p.focus }}
                />
                <span className="absolute bottom-3 right-3 flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} locale={locale} />
    </div>
  );
}
