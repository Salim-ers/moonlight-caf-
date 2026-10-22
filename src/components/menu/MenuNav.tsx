"use client";

import { useEffect, useRef, useState } from "react";
import { Printer } from "lucide-react";

type Cat = { id: string; title: string; dot: string };

/**
 * Navigation collante de la carte : ancres natives (#matcha… partageables), la catégorie lue
 * est suivie au défilement (IntersectionObserver) et la pastille active glisse jusqu'à elle.
 */
export function MenuNav({ cats, label, printLabel }: { cats: Cat[]; label: string; printLabel: string }) {
  const [active, setActive] = useState(cats[0]?.id);
  const bar = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = cats.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [cats]);

  useEffect(() => {
    const ul = bar.current;
    // position mesurée sur le <li> (positionné dans la liste), pas sur le lien
    const li = ul?.querySelector<HTMLElement>(`[data-cat="${active}"]`)?.parentElement;
    if (!ul || !li || !pill.current) return;
    pill.current.style.width = `${li.offsetWidth}px`;
    pill.current.style.transform = `translateX(${li.offsetLeft}px)`;
    const target = li.offsetLeft - ul.clientWidth / 2 + li.offsetWidth / 2;
    ul.scrollTo({ left: target, behavior: document.documentElement.classList.contains("js-motion") ? "smooth" : "instant" });
  }, [active]);

  return (
    <div className="no-print sticky top-[var(--sticky-top,var(--header-h))] z-30 transition-[top] duration-500 ease-[var(--ease-out)]">
      <div className="wrap flex items-center gap-3 py-3">
        <nav aria-label={label} className="min-w-0 flex-1">
          <ul
            ref={bar}
            className="no-scrollbar relative flex gap-1 overflow-x-auto rounded-full bg-ivory/90 p-1.5 shadow-[0_8px_30px_-16px_rgb(39_36_32/0.45)] backdrop-blur-md"
          >
            <span
              ref={pill}
              aria-hidden="true"
              className="absolute bottom-1.5 left-0 top-1.5 rounded-full bg-ink transition-[transform,width] duration-500 ease-[var(--ease-out)]"
            />
            {cats.map((c) => (
              <li key={c.id} className="relative shrink-0">
                <a
                  href={`#${c.id}`}
                  data-cat={c.id}
                  aria-current={active === c.id ? "true" : undefined}
                  onClick={() => setActive(c.id)}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.95rem] font-semibold transition-colors duration-300 ${active === c.id ? "text-ivory" : "text-ink hover:text-ink/70"}`}
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => window.print()}
          className="chip hidden min-h-11 shrink-0 gap-2 bg-ivory/90 font-semibold backdrop-blur-md md:inline-flex"
        >
          <Printer className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          {printLabel}
        </button>
      </div>
    </div>
  );
}
