import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { SteamCup } from "@/components/ui/Doodles";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-lavender-soft pb-24 pt-32">
      <span aria-hidden="true" className="absolute -right-24 top-1/4 h-[60vw] max-h-[34rem] w-[60vw] max-w-[34rem] rounded-full bg-pink" />
      <span aria-hidden="true" className="absolute -bottom-20 left-[30%] h-56 w-56 rounded-full bg-matcha/80" />
      <div className="wrap relative grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="t-eyebrow flex items-center gap-3 text-lavender-deep">
            <SteamCup className="h-6 w-6" /> 404
          </p>
          <h1 className="t-h1 mt-5 max-w-3xl">{t.notFound.title}</h1>
          <p className="t-lede mt-6 max-w-xl text-ink/80">{t.notFound.text}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={href("home", locale)}>{t.notFound.home}</ButtonLink>
            <ButtonLink href={href("menu", locale)} variant="outline">
              {t.common.seeMenu}
            </ButtonLink>
            <ButtonLink href={href("visit", locale)} variant="outline">
              {t.common.findUs}
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Logo alt="" className="h-auto w-[min(70vw,22rem)]" />
        </div>
      </div>
    </section>
  );
}
