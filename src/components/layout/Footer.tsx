import { TLink } from "@/components/motion/PageTransition";
import { Lines } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/Logo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { href, type Locale, type NavKey } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteConfig, mapsLinks } from "@/data/site-config";
import { groupedHours, formatTime } from "@/lib/hours";
import { LangSwitch } from "./LangSwitch";
import { BackToTop } from "./BackToTop";

const EXPLORE: NavKey[] = ["menu", "favorites", "cafe", "story", "visit"];

function dayRange(days: number[], names: string[]) {
  if (days.length === 1) return names[days[0]];
  return `${names[days[0]]} – ${names[days[days.length - 1]]}`;
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer data-site-footer className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink text-ivory md:-mt-14 md:rounded-t-[3.5rem]">
      <div className="wrap pb-8 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Lines as="p" lines={t.footer.invite} accent={1} className="t-display lg:col-span-8 [&_em]:text-pink" />
          <div className="lg:col-span-4 lg:justify-self-end">
            <TLink href={href("home", locale)} aria-label={t.a11y.home} className="inline-block">
              <Logo light alt="Moonlight café" className="h-auto w-[min(60vw,250px)]" />
            </TLink>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ivory/15 pt-10 sm:grid-cols-2 lg:grid-cols-12">
          <p className="max-w-xs text-ivory/75 lg:col-span-4">{t.footer.tagline}</p>
          <div className="lg:col-span-3">
            <h2 className="t-eyebrow mb-4 font-[family-name:var(--font-sans)] text-ivory/60">{t.footer.visit}</h2>
            <address className="not-italic">
              <a href={mapsLinks.place} target="_blank" rel="noopener noreferrer" className="link-draw">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <span className="sr-only"> {t.a11y.newTab}</span>
              </a>
            </address>
            <OpenStatus locale={locale} className="t-small mt-3 text-ivory/80" />
            <ul className="t-small mt-4 space-y-1 text-ivory/70">
              {groupedHours().map((g) => (
                <li key={g.days.join()}>
                  {dayRange(g.days, t.days)} ·{" "}
                  <span className="tabular-nums text-ivory">{g.closed ? "—" : `${formatTime(g.open!, locale)} – ${formatTime(g.close!, locale)}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label={t.a11y.footerNav} className="lg:col-span-2">
            <h2 className="t-eyebrow mb-4 font-[family-name:var(--font-sans)] text-ivory/60">{t.footer.explore}</h2>
            <ul className="space-y-1.5">
              {EXPLORE.map((k) => (
                <li key={k}>
                  <TLink href={href(k, locale)} className="link-draw">
                    {t.nav[k]}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="t-eyebrow mb-4 font-[family-name:var(--font-sans)] text-ivory/60">{t.footer.follow}</h2>
            <ul className="space-y-1.5">
              <li>
                <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="link-draw">
                  Instagram {siteConfig.instagram.handle}
                  <span className="sr-only"> {t.a11y.newTab}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t.common.emailSubject)}`} className="link-draw break-all">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="t-small mt-14 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-ivory/65 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {siteConfig.name}. {t.footer.rights}
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
              <LangSwitch locale={locale} long className="link-draw inline-flex min-h-11 items-center font-normal" />
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
