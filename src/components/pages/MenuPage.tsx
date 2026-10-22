import { PageHero } from "@/components/ui/PageHero";
import { MenuBoard } from "@/components/menu/MenuBoard";
import { TextLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

export function MenuPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <PageHero
        layout="wide"
        title={t.menuPage.title}
        lede={t.menuPage.lede}
        photo="colorful"
        locale={locale}
        focus="50% 55%"
        aside={
          <p className="mt-4 text-[0.9375rem]">
            <TextLink href={href("favorites", locale)}>{t.menuPage.favoritesLink}</TextLink>
          </p>
        }
      />
      <div className="mt-16 md:mt-24">
        <MenuBoard locale={locale} />
      </div>
    </>
  );
}
