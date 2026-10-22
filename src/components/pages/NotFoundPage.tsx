import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper pb-20 pt-32">
      <div aria-hidden="true" className="absolute right-[-12vw] top-1/2 h-[70vw] w-[70vw] -translate-y-1/2 rounded-full bg-moon/70 md:right-[-6vw] md:h-[46vw] md:w-[46vw]" />
      <div aria-hidden="true" className="absolute right-[-4vw] top-[calc(50%-4vw)] h-[70vw] w-[70vw] -translate-y-1/2 rounded-full bg-paper md:right-[2vw] md:h-[46vw] md:w-[46vw]" />
      <div className="wrap relative">
        <p className="t-label">404</p>
        <h1 className="t-h1 mt-4 max-w-3xl">{t.notFound.title}</h1>
        <p className="t-lede mt-6 max-w-xl text-ink-soft">{t.notFound.text}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={href("home", locale)}>{t.notFound.home}</ButtonLink>
          <ButtonLink href={href("menu", locale)} variant="outline">
            {t.common.seeMenu}
          </ButtonLink>
          <ButtonLink href={href("visit", locale)} variant="outline">
            {t.common.findUs}
          </ButtonLink>
        </div>
        <Image src="/brand/logo-cup.png" alt="" width={135} height={237} className="mt-16 h-20 w-auto opacity-80" />
      </div>
    </section>
  );
}
