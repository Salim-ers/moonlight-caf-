import { PageHero } from "@/components/ui/PageHero";
import { Lines, Fade, ClipReveal, Parallax } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { HorizontalGallery } from "@/components/gallery/HorizontalGallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

export function CafePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cafePage;
  const common = getDictionary(locale).common;
  return (
    <>
      <PageHero title={t.title} lede={t.lede} photo="benches" locale={locale} layout="split" />

      {/* L'espace */}
      <section aria-labelledby="space-title" className="bg-paper py-20 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 md:pt-10">
            <Lines id="space-title" lines={[t.space.title]} className="t-h2" />
            <Fade className="mt-6">
              <p className="t-lede text-ink-soft">{t.space.text}</p>
            </Fade>
          </div>
          <div className="grid grid-cols-6 gap-4 md:col-span-7 md:col-start-6">
            <ClipReveal className="col-span-6 aspect-[3/2]" parallax={8}>
              <Photo id="roomWide" locale={locale} sizes="(min-width: 768px) 56vw, 92vw" />
            </ClipReveal>
            <Parallax speed={10} className="col-span-3 -mt-10 md:-mt-16">
              <ClipReveal className="aspect-[4/5]" from="left">
                <Photo id="roundTable" locale={locale} sizes="(min-width: 768px) 28vw, 46vw" focus="52% 55%" />
              </ClipReveal>
            </Parallax>
            <Parallax speed={-6} className="col-span-3 mt-8">
              <ClipReveal className="aspect-[4/5]" from="top">
                <Photo id="lettering" locale={locale} sizes="(min-width: 768px) 28vw, 46vw" focus="55% 40%" />
              </ClipReveal>
            </Parallax>
          </div>
        </div>
      </section>

      <HorizontalGallery items={["baristaIced", "purplePour", "matchaPour", "layered"]} locale={locale} title={t.gestures.title} text={t.gestures.text} />

      {/* Objets */}
      <section aria-labelledby="objects-title" className="bg-cream py-20 md:py-32">
        <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-8">
          <ClipReveal className="aspect-[4/5] md:col-span-5" parallax={10}>
            <Photo id="shelves" locale={locale} sizes="(min-width: 768px) 40vw, 92vw" />
          </ClipReveal>
          <div className="md:col-span-5 md:col-start-8">
            <Lines id="objects-title" lines={[t.objects.title]} className="t-h2" />
            <Fade className="mt-6">
              <p className="t-lede text-ink-soft">{t.objects.text}</p>
            </Fade>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section aria-labelledby="gallery-title" className="bg-paper py-20 md:py-32">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Lines id="gallery-title" lines={[t.gallery.title]} className="t-h1" />
          </div>
          <GalleryGrid locale={locale} />
          <div className="mt-16 flex flex-wrap gap-3">
            <ButtonLink href={href("visit", locale)}>{common.findUs}</ButtonLink>
            <ButtonLink href={href("menu", locale)} variant="outline">
              {common.seeMenu}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
