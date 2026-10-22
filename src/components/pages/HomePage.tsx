import type { Locale } from "@/i18n/config";
import { Hero } from "@/components/home/Hero";
import { Universe } from "@/components/home/Universe";
import { Signatures } from "@/components/home/Signatures";
import { MatchaMoment } from "@/components/home/MatchaMoment";
import { CoffeeColors } from "@/components/home/CoffeeColors";
import { SweetSide } from "@/components/home/SweetSide";
import { Feeling } from "@/components/home/Feeling";
import { Social } from "@/components/home/Social";
import { Hello } from "@/components/home/Hello";

/**
 * L'accueil, en neuf scènes : chaque section a son intention, sa couleur et son mouvement.
 * Rose (hero) → ivoire → lavande → matcha → couleur choisie → caramel → ivoire → bleu → crème.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Universe locale={locale} />
      <Signatures locale={locale} />
      <MatchaMoment locale={locale} />
      <CoffeeColors locale={locale} />
      <SweetSide locale={locale} />
      <Feeling locale={locale} />
      <Social locale={locale} />
      <Hello locale={locale} />
    </>
  );
}
