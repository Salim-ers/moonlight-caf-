import { TLink } from "@/components/motion/PageTransition";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { DrinkArt } from "@/components/ui/DrinkArt";
import { favorites } from "@/data/favorites";
import { findItem, formatPrice } from "@/data/menu-data";
import { toneVars } from "@/lib/tones";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";
import { DragRail } from "./DragRail";

/**
 * SCÈNE 03 — Les signatures. Un rail horizontal : la table Moonlight vue du dessus (qui tourne
 * doucement au défilement), puis les six créations, chacune dans sa couleur.
 * Les photos de produits restent réservées à la page « Nos favoris » : ici, illustrations et typographie.
 */
export function Signatures({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.home.signatures;
  return (
    <section aria-labelledby="sig-title" className="relative overflow-hidden bg-lavender-soft py-24 md:py-32">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="t-eyebrow text-lavender-deep">{s.eyebrow}</p>
          <Lines id="sig-title" lines={s.title} accent={1} className="t-h1 mt-5 [&_em]:text-lavender-deep" />
        </div>
        <Reveal className="md:col-span-4 md:col-start-9">
          <p className="t-lede text-ink/80">{s.text}</p>
          <ButtonLink href={href("favorites", locale)} variant="outline" size="sm" className="mt-6">
            {s.cta}
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-14 md:mt-20">
        <DragRail label={s.eyebrow} dragLabel={s.drag} prevLabel={t.cafePage.gallery.prev} nextLabel={t.cafePage.gallery.next}>
          <li data-progress="through" className="sig-table">
            <figure className="relative">
              <div className="sig-table-disc">
                <div className="sig-table-spin">
                  <Photo id="p16" locale={locale} sizes="(min-width: 1024px) 55vw, 120vw" />
                </div>
              </div>
              <figcaption className="mt-5 max-w-[18rem]">
                <span className="t-h3 block">{s.table}</span>
                <span className="t-small mt-1 block text-ink/70">{s.tableCaption}</span>
              </figcaption>
            </figure>
          </li>
          {favorites.map((f) => {
            const item = findItem(f.itemId);
            return (
              <li key={f.itemId}>
                <TLink href={`${href("favorites", locale)}#${item.id}`} className="sig-card group" style={toneVars(f.tone)} draggable={false}>
                  <span className="sig-stage" aria-hidden="true">
                    <svg viewBox="0 0 200 200" className="sig-shape">
                      <path fill="var(--tone)" d="M104 12c40 2 76 30 84 70 8 42-14 86-52 104-36 18-86 10-112-20C-2 136 6 86 30 52 50 24 72 10 104 12z" />
                    </svg>
                    <DrinkArt uid={`sig-${f.itemId}`} kind={f.art.kind} colors={f.art.colors} className="sig-art" />
                  </span>
                  <span className="mt-auto block">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="t-h3 block">{item.name[locale]}</span>
                      <span className="shrink-0 font-semibold tabular-nums">{formatPrice(item.price, locale)}</span>
                    </span>
                    <span className="t-small mt-2 block text-ink/75">{f.line[locale]}</span>
                  </span>
                </TLink>
              </li>
            );
          })}
        </DragRail>
      </div>
    </section>
  );
}
