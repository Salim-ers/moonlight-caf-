import Image from "next/image";
import { TLink } from "@/components/motion/TransitionProvider";
import { href, type Locale, type NavKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteConfig, mapsLinks } from "@/data/site-config";
import { groupedHours, formatTime } from "@/lib/hours";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { LangSwitch } from "./LangSwitch";
import { InkLogo } from "@/components/motion/InkLogo";
import { BackToTop } from "./BackToTop";

const EXPLORE: NavKey[] = ["menu", "favorites", "cafe", "story", "visit"];

function dayRange(days: number[], names: string[]) {
  if (days.length === 1) return names[days[0]];
  return `${names[days[0]]} – ${names[days[days.length - 1]]}`;
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = 2026;
  return (
    <footer data-site-footer className="relative overflow-hidden bg-cream text-ink">
      <div className="wrap grid gap-14 pb-10 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <TLink href={href("home", locale)} aria-label={t.a11y.home} className="inline-block">
            <InkLogo className="w-[min(78vw,340px)]" />
          </TLink>
          <p className="t-lede mt-6 max-w-sm text-ink-soft">{t.footer.tagline}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-[1fr_0.8fr_1.35fr] lg:col-span-7">
          <div>
            <h2 className="t-label mb-4 font-[family-name:var(--font-sans)]">{t.footer.visit}</h2>
            <address className="not-italic">
              <a href={mapsLinks.place} target="_blank" rel="noopener noreferrer" className="link-draw">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <span className="sr-only"> {t.a11y.newTab}</span>
              </a>
            </address>
            <OpenStatus locale={locale} className="t-small mt-3 text-ink-soft" />
            <ul className="t-small mt-4 space-y-1 text-ink-soft">
              {groupedHours().map((g) => (
                <li key={g.days.join()}>
                  {dayRange(g.days, t.days)}
                  <br />
                  <span className="tabular-nums text-ink">
                    {g.closed ? "—" : `${formatTime(g.open!, locale)} – ${formatTime(g.close!, locale)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label={t.a11y.footerNav}>
            <h2 className="t-label mb-4 font-[family-name:var(--font-sans)]">{t.footer.explore}</h2>
            <ul className="space-y-2">
              {EXPLORE.map((k) => (
                <li key={k}>
                  <TLink href={href(k, locale)} className="link-draw">
                    {t.nav[k]}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="t-label mb-4 font-[family-name:var(--font-sans)]">{t.footer.follow}</h2>
            <ul className="space-y-2">
              <li>
                <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="link-draw">
                  Instagram<span className="sr-only"> {t.a11y.newTab}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t.common.emailSubject)}`} className="link-draw">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <div className="mt-8 hidden sm:block">
              <Image src="/brand/logo-cup.png" alt="" width={135} height={237} className="h-14 w-auto opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="t-small flex flex-col gap-4 border-t border-ink/12 py-6 text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
            {siteConfig.credit ? (
              <>
                {" "}
                {siteConfig.credit.url ? (
                  <a href={siteConfig.credit.url} className="link-draw" target="_blank" rel="noopener noreferrer">
                    {siteConfig.credit.label}
                  </a>
                ) : (
                  siteConfig.credit.label
                )}
              </>
            ) : null}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <li>
              <TLink href={href("legal", locale)} className="link-draw">
                {t.footer.legal}
              </TLink>
            </li>
            <li>
              <TLink href={href("privacy", locale)} className="link-draw">
                {t.footer.privacy}
              </TLink>
            </li>
            <li>
              <TLink href={href("cookies", locale)} className="link-draw">
                {t.footer.cookies}
              </TLink>
            </li>
            <li>
              <LangSwitch locale={locale} long />
            </li>
            <li>
              <BackToTop label={t.footer.backTop} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
