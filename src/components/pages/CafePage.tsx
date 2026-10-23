import type { CSSProperties, ReactNode } from "react";
import { Expand } from "lucide-react";
import { Lines, Reveal, type RevealVariant } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Photo, photoSources } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LightboxProvider, LightboxTrigger } from "@/components/gallery/Lightbox";
import { photoManifest, type PhotoId } from "@/data/photo-manifest";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

/** Les six photographies réservées à cette page, dans l'ordre de lecture (et de la visionneuse). */
const PHOTOS = ["p22", "p04", "p24", "p01", "p17", "p26"] as const satisfies readonly PhotoId[];

function Shot({
  i,
  locale,
  variant,
  className = "",
  sizes,
  radius = "1.75rem",
  caption,
  preload,
}: {
  i: number;
  locale: Locale;
  variant: RevealVariant | "enter";
  className?: string;
  sizes: string;
  radius?: string;
  caption?: ReactNode;
  preload?: boolean;
}) {
  const frame = (
    <div className="zoom absolute inset-0">
      <Photo
        id={PHOTOS[i]}
        locale={locale}
        sizes={sizes}
        preload={preload}
       
        className="transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
      />
    </div>
  );
  const style = { "--clip-r": radius, borderRadius: radius } as CSSProperties;
  return (
    <figure className={className}>
      <LightboxTrigger index={i} className="relative block h-full w-full overflow-hidden text-left">
        {variant === "enter" ? (
          <div className="enter-rise relative h-full w-full overflow-hidden bg-lavender" style={{ ...style, "--d": "0.08s" } as CSSProperties}>
            {frame}
          </div>
        ) : (
          <Reveal variant={variant} className="relative h-full w-full overflow-hidden bg-lavender" style={style}>
            {frame}
          </Reveal>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-ivory text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <Expand className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </LightboxTrigger>
      {caption ? <figcaption className="t-small mt-3 text-ink/70">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Le café : une mise en page de magazine (grande ouverture, verticales, diptyque, espaces négatifs),
 * chaque photo avec sa propre révélation, et la visionneuse sur les seules photos de cette page.
 */
export function CafePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.cafePage;
  const items = PHOTOS.map((id) => {
    const s = photoSources(photoManifest[id].file);
    return { avif: s.avif, webp: s.webp, jpg: s.jpg, width: s.width, height: s.height, alt: photoManifest[id].alt[locale] };
  });
  return (
    <LightboxProvider items={items} labels={c.gallery}>
      <PageHead tone="lavender" title={c.title} tagline={c.tagline} lede={c.lede} />
      <div className="bg-[var(--color-lavender-soft)] pb-16 md:pb-24">
        <div className="wrap">
          <Shot
            i={0}
            locale={locale}
            variant="enter"
            preload
            sizes="(min-width: 640px) 100vw, 204vw"
            className="mx-auto aspect-[4/3] max-w-[84rem] sm:aspect-[16/9] lg:aspect-[21/9]"
            radius="2rem"
          />
        </div>
      </div>

      {/* L'espace */}
      <section aria-labelledby="space-title" className="bg-ivory py-20 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-5">
            <Lines id="space-title" lines={[c.space.title]} className="t-h1" />
            <Reveal as="p" className="t-lede mt-6 text-ink/80">
              {c.space.text}
            </Reveal>
          </div>
          <Shot
            i={1}
            locale={locale}
            variant="clip-up"
            sizes="(min-width: 768px) 100vw, 204vw"
            className="mx-auto aspect-[4/5] w-full max-w-[36rem] md:col-span-6 md:col-start-7"
            radius="999px 999px 1.75rem 1.75rem"
          />
        </div>
      </section>

      {/* Les gestes */}
      <section aria-labelledby="gestures-title" className="bg-ink py-20 text-ivory md:py-32">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <Lines id="gestures-title" lines={[c.gestures.title]} className="t-h1" />
            </div>
            <Reveal as="p" className="t-lede text-ivory/80 md:col-span-5 md:col-start-8">
              {c.gestures.text}
            </Reveal>
          </div>
          <Shot
            i={2}
            locale={locale}
            variant="window"
            sizes="(min-width: 640px) 100vw, 204vw"
            className="mx-auto mt-12 aspect-[4/3] max-w-[80rem] sm:aspect-[16/9]"
          />
        </div>
      </section>

      {/* Sur les étagères */}
      <section aria-labelledby="objects-title" className="bg-butter py-20 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:items-center md:gap-8">
          <Shot
            i={3}
            locale={locale}
            variant="clip-left"
            sizes="(min-width: 768px) 86vw, 204vw"
            className="mx-auto aspect-[4/5] w-full max-w-[36rem] md:col-span-5"
          />
          <div className="md:col-span-5 md:col-start-8">
            <Lines id="objects-title" lines={[c.objects.title]} className="t-h1" />
            <Reveal as="p" className="t-lede mt-6 text-ink/80">
              {c.objects.text}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Côté vitrine : diptyque décalé */}
      <section aria-labelledby="window-title" className="bg-ivory pb-32 pt-20 md:pb-44 md:pt-32">
        <div className="wrap">
          <div className="max-w-3xl">
            <Lines id="window-title" lines={[c.window.title]} className="t-h1" />
            <Reveal as="p" className="t-lede mt-6 text-ink/80">
              {c.window.text}
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
            <Shot
              i={4}
              locale={locale}
              variant="circle"
              sizes="(min-width: 768px) 84vw, 164vw"
              className="mx-auto aspect-square w-full max-w-[34rem] md:col-span-6"
              radius="50%"
            />
            <Shot
              i={5}
              locale={locale}
              variant="clip-up"
              sizes="(min-width: 768px) 86vw, 204vw"
              className="mx-auto aspect-[4/5] w-full max-w-[34rem] md:col-span-5 md:col-start-8 md:mt-32"
            />
          </div>
          <Reveal className="mt-16 flex flex-wrap gap-3">
            <ButtonLink href={href("visit", locale)} magnetic fill="var(--color-lavender)">
              {t.common.findUs}
            </ButtonLink>
            <ButtonLink href={href("menu", locale)} variant="outline">
              {t.common.seeMenu}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </LightboxProvider>
  );
}
