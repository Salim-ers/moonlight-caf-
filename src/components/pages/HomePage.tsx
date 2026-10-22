import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { Intro } from "@/components/home/Intro";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { FavoritesSection } from "@/components/home/FavoritesSection";
import { MatchaSection } from "@/components/home/MatchaSection";
import { PastrySection } from "@/components/home/PastrySection";
import { PlaceSection } from "@/components/home/PlaceSection";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { SocialSection } from "@/components/home/SocialSection";
import { VisitSection } from "@/components/home/VisitSection";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <Intro skipLabel={t.common.skipIntro} />
      <Hero locale={locale} />
      <IntroSection locale={locale} />
      <FavoritesSection locale={locale} />
      <MatchaSection locale={locale} />
      <PastrySection locale={locale} />
      <PlaceSection locale={locale} />
      <StoryTeaser locale={locale} />
      <SocialSection locale={locale} />
      <VisitSection locale={locale} />
    </>
  );
}
