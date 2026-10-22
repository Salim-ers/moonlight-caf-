import { Lines, Fade, ClipReveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import type { PhotoKey } from "@/data/gallery-data";
import type { Locale } from "@/i18n/config";
import type { ReactNode } from "react";

/**
 * En-tête des pages intérieures. Trois compositions pour éviter la monotonie :
 * - "split"  : titre à gauche, photo verticale à droite ;
 * - "wide"   : titre au-dessus d'une photo panoramique ;
 * - "text"   : titre seul (pages juridiques).
 */
export function PageHero({
  title,
  lede,
  photo,
  locale,
  layout = "split",
  aside,
  focus,
}: {
  title: string | readonly string[];
  lede?: string;
  photo?: PhotoKey;
  locale: Locale;
  layout?: "split" | "wide" | "text";
  aside?: ReactNode;
  focus?: string;
}) {
  const lines = typeof title === "string" ? [title] : title;

  if (layout === "wide" && photo) {
    return (
      <header className="relative bg-paper pt-32 md:pt-40">
        <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
          <Lines as="h1" lines={lines} trigger="load" className="t-h1 md:col-span-7" />
          {lede ? (
            <Fade trigger="load" delay={0.35} className="md:col-span-4 md:col-start-9">
              <p className="t-lede text-ink-soft">{lede}</p>
              {aside}
            </Fade>
          ) : null}
        </div>
        <div className="wrap mt-12 md:mt-16">
          <ClipReveal trigger="load" delay={0.2} className="aspect-[4/3] w-full md:aspect-[21/9]" parallax={10}>
            <Photo id={photo} locale={locale} sizes="100vw" preload focus={focus} />
          </ClipReveal>
        </div>
      </header>
    );
  }

  if (layout === "text" || !photo) {
    return (
      <header className="bg-paper pb-10 pt-36 md:pb-14 md:pt-44">
        <div className="wrap">
          <Lines as="h1" lines={lines} trigger="load" className="t-h1 max-w-5xl" />
          {lede ? (
            <Fade trigger="load" delay={0.3} className="mt-6 max-w-2xl">
              <p className="t-lede text-ink-soft">{lede}</p>
            </Fade>
          ) : null}
          {aside}
        </div>
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden bg-paper pt-28 md:pt-32">
      <div className="wrap grid gap-10 pb-12 md:grid-cols-12 md:items-end md:gap-8 md:pb-20">
        <div className="md:col-span-6 md:pb-6">
          <Lines as="h1" lines={lines} trigger="load" className="t-h1" />
          {lede ? (
            <Fade trigger="load" delay={0.35} className="mt-6 max-w-md">
              <p className="t-lede text-ink-soft">{lede}</p>
            </Fade>
          ) : null}
          {aside ? (
            <Fade trigger="load" delay={0.5} className="mt-8">
              {aside}
            </Fade>
          ) : null}
        </div>
        <ClipReveal trigger="load" delay={0.15} className="aspect-[4/3] md:col-span-6 md:aspect-[5/4]" parallax={8}>
          <Photo id={photo} locale={locale} sizes="(min-width: 768px) 50vw, 92vw" preload focus={focus} />
        </ClipReveal>
      </div>
    </header>
  );
}
