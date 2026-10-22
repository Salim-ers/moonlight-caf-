import { FavoritesRail } from "./FavoritesRail";
import { ProductCard } from "@/components/menu/ProductCard";
import { Lines, Fade } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { favorites } from "@/data/favorites";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

export function FavoritesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.favorites;
  const header = (
    <div className="wrap flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <Lines id="favorites-title" lines={[t.title]} className="t-h2 max-w-3xl" />
      <Fade className="max-w-sm">
        <p className="text-ink-soft">{t.text}</p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <TextLink href={href("favorites", locale)}>{t.all}</TextLink>
          <TextLink href={href("menu", locale)}>{t.menu}</TextLink>
        </p>
      </Fade>
    </div>
  );
  return (
    <FavoritesRail header={header}>
      {favorites.map((f, i) => (
        <div
          key={f.itemId}
          data-card
          className={`lg:w-[clamp(250px,min(25vw,40svh),420px)] lg:shrink-0 ${i % 2 === 1 ? "max-sm:ml-auto max-sm:w-[88%]" : "max-sm:w-[88%]"} ${
            i % 2 === 1 ? "lg:mt-[8vh]" : ""
          }`}
        >
          <ProductCard fav={f} locale={locale} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 88vw" />
        </div>
      ))}
    </FavoritesRail>
  );
}
