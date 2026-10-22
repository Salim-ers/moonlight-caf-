import type { ReactNode } from "react";
import { PageHead } from "@/components/ui/PageHead";
import { ConsentControl } from "@/components/ui/MapConsent";
import { TLink } from "@/components/motion/PageTransition";
import { legalConfig, siteConfig } from "@/data/site-config";
import { getDictionary } from "@/i18n";
import { href, type Locale } from "@/i18n/config";

function Pending({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).legalCommon;
  if (legalConfig.validated) return null;
  return (
    <p role="note" className="mb-12 rounded-[var(--radius)] border border-caramel/40 bg-caramel-soft px-5 py-4 text-[0.9375rem] text-ink">
      {t.pending}
    </p>
  );
}

/** Valeur juridique : affichée telle quelle, ou signalée « À compléter » tant qu'elle n'est pas validée. */
function V({ value, locale }: { value: string | null; locale: Locale }) {
  if (value) return <>{value}</>;
  return <mark className="rounded-[4px] bg-butter px-1.5 py-0.5 text-ink">[{getDictionary(locale).legalCommon.toComplete}]</mark>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink/10 py-10 md:grid md:grid-cols-12 md:gap-8">
      <h2 className="t-h3 md:col-span-4">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-soft md:col-span-8 md:mt-0 [&_a]:text-ink [&_dt]:text-ink [&_strong]:font-medium [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}

function Shell({ title, locale, children }: { title: string; locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale).legalCommon;
  return (
    <>
      <PageHead tone="ivory" title={title} />
      <div className="wrap pb-32 pt-4 md:pb-44">
        <Pending locale={locale} />
        {children}
        <p className="t-small border-t border-ink/10 pt-8 text-ink-soft">
          {t.updated} :{" "}
          {new Date(legalConfig.lastUpdate).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
    </>
  );
}

export function LegalNoticePage({ locale }: { locale: Locale }) {
  const p = legalConfig.publisher;
  const h = legalConfig.host;
  const fr = locale === "fr";
  const tv = getDictionary(locale).legalCommon.toVerify;
  return (
    <Shell title={fr ? "Mentions légales" : "Legal notice"} locale={locale}>
      <Section title={fr ? "Éditeur du site" : "Website publisher"}>
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[max-content_1fr]">
          <dt>{fr ? "Dénomination" : "Company name"}</dt>
          <dd>
            <V value={p.companyName} locale={locale} />
          </dd>
          <dt>{fr ? "Nom commercial" : "Trading name"}</dt>
          <dd>{siteConfig.name}</dd>
          <dt>{fr ? "Forme juridique et capital" : "Legal form and share capital"}</dt>
          <dd>
            <V value={p.legalForm && p.shareCapital ? `${p.legalForm}, ${p.shareCapital}` : p.legalForm} locale={locale} />
          </dd>
          <dt>SIREN / SIRET</dt>
          <dd>
            <V value={p.siret ?? p.siren} locale={locale} />
          </dd>
          <dt>RCS</dt>
          <dd>
            <V value={p.rcs} locale={locale} />
          </dd>
          <dt>{fr ? "N° TVA intracommunautaire" : "EU VAT number"}</dt>
          <dd>
            <V value={p.vatNumber} locale={locale} />
          </dd>
          <dt>{fr ? "Siège social" : "Registered office"}</dt>
          <dd>
            <V value={p.registeredOffice} locale={locale} />
          </dd>
          <dt>{fr ? "Établissement" : "Premises"}</dt>
          <dd>27 Rue des Gravilliers, 75003 Paris</dd>
          <dt>{fr ? "Directeur de la publication" : "Publication director"}</dt>
          <dd>
            <V value={p.publicationDirector} locale={locale} />
          </dd>
          <dt>{fr ? "Contact" : "Contact"}</dt>
          <dd>
            <a href={`mailto:${p.email}`} className="link-draw">
              {p.email}
            </a>
          </dd>
        </dl>
      </Section>
      <Section title={fr ? "Hébergement" : "Hosting"}>
        <p>
          <strong>{h.name}</strong>
          <br />
          {h.address}
          {h.toVerify ? <span className="t-small"> ({tv})</span> : null}
          <br />
          <a href={h.website} target="_blank" rel="noopener noreferrer" className="link-draw">
            {h.website.replace("https://", "")}
          </a>
        </p>
      </Section>
      <Section title={fr ? "Propriété intellectuelle" : "Intellectual property"}>
        <p>
          {fr
            ? "Le logo, les photographies et les textes de ce site sont la propriété de Moonlight Café ou de leurs auteurs. Toute reproduction sans autorisation écrite préalable est interdite."
            : "The logo, photographs and texts on this website belong to Moonlight Café or their authors. Any reproduction without prior written permission is prohibited."}
        </p>
        <p>
          {fr
            ? "Polices de caractères : Shippori Mincho et Zen Kaku Gothic New, sous licence SIL Open Font License 1.1, hébergées sur le site."
            : "Typefaces: Shippori Mincho and Zen Kaku Gothic New, under the SIL Open Font License 1.1, self-hosted."}
        </p>
      </Section>
      <Section title={fr ? "Services externes" : "Third-party services"}>
        <p>
          {fr
            ? "Le site propose des liens vers Instagram et Google Maps, qui s'ouvrent sur leurs propres sites. Le plan Google Maps intégré ne se charge qu'après votre accord."
            : "The site links to Instagram and Google Maps, which open on their own websites. The embedded Google Maps view only loads after you agree."}{" "}
          <TLink href={href("cookies", locale)} className="link-draw font-semibold">
            {fr ? "Gérer mes choix" : "Manage my choices"}
          </TLink>
        </p>
      </Section>
      {siteConfig.credit ? (
        <Section title={fr ? "Conception et réalisation" : "Design and development"}>
          <p>{siteConfig.credit.label}</p>
        </Section>
      ) : null}
    </Shell>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const p = legalConfig.publisher;
  return (
    <Shell title={fr ? "Politique de confidentialité" : "Privacy policy"} locale={locale}>
      <Section title={fr ? "Responsable du traitement" : "Data controller"}>
        <p>
          <V value={p.companyName} locale={locale} /> ({siteConfig.name}), {fr ? "joignable à" : "reachable at"}{" "}
          <a href={`mailto:${p.email}`} className="link-draw">
            {p.email}
          </a>
          .
        </p>
      </Section>
      <Section title={fr ? "Données collectées" : "Data collected"}>
        <p>
          {fr
            ? "Ce site vitrine ne comporte ni formulaire, ni compte client, ni outil de mesure d'audience, ni publicité. Il ne collecte aucune donnée personnelle de manière active."
            : "This showcase website has no forms, no customer accounts, no analytics and no advertising. It does not actively collect any personal data."}
        </p>
        <p>
          {fr
            ? "Si vous nous écrivez par e-mail, votre message est traité par notre messagerie uniquement pour vous répondre, puis conservé le temps nécessaire à l'échange."
            : "If you email us, your message is handled by our mailbox solely to reply to you, and kept only as long as the conversation requires."}
        </p>
        <p>
          {fr
            ? "L'hébergeur enregistre des journaux techniques (adresse IP, date, page demandée) nécessaires à la sécurité et au bon fonctionnement du site."
            : "The host records technical logs (IP address, date, requested page) needed for security and for the site to work properly."}
        </p>
      </Section>
      <Section title={fr ? "Services tiers" : "Third parties"}>
        <p>
          {fr
            ? "Google Maps : le plan intégré n'est chargé qu'après votre accord. Google peut alors traiter des données selon sa propre politique de confidentialité. Instagram : les liens ouvrent le site d'Instagram, soumis à sa propre politique."
            : "Google Maps: the embedded map only loads after you agree. Google may then process data under its own privacy policy. Instagram: links open Instagram's website, subject to its own policy."}
        </p>
      </Section>
      <Section title={fr ? "Vos droits" : "Your rights"}>
        <p>
          {fr
            ? "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation. Écrivez-nous pour les exercer. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr)."
            : "Under the GDPR you have the right to access, rectify, erase, object and restrict processing. Email us to exercise these rights. You may also lodge a complaint with the CNIL (cnil.fr)."}
        </p>
      </Section>
    </Shell>
  );
}

export function CookiesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return (
    <Shell title={fr ? "Cookies et stockage local" : "Cookies and local storage"} locale={locale}>
      <Section title={fr ? "En résumé" : "In short"}>
        <p>
          {fr
            ? "Ce site n'utilise aucun cookie publicitaire ni de mesure d'audience. C'est pourquoi aucune bannière ne s'affiche à votre arrivée."
            : "This site uses no advertising or analytics cookies. That's why no banner appears when you arrive."}
        </p>
      </Section>
      <Section title={fr ? "Ce qui est stocké sur votre appareil" : "What is stored on your device"}>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>ml-consent-maps</strong> (localStorage) :{" "}
            {fr
              ? "mémorise votre accord pour afficher le plan Google Maps. Présent uniquement si vous l'avez donné."
              : "remembers that you agreed to display the Google Maps view. Only present if you gave it."}
          </li>
        </ul>
      </Section>
      <Section title={fr ? "Google Maps" : "Google Maps"}>
        <p>
          {fr
            ? "Lorsque vous affichez le plan, Google peut déposer ses propres cookies. Vous pouvez retirer votre accord ci-dessous : le plan ne sera plus chargé."
            : "When you display the map, Google may set its own cookies. You can withdraw your consent below: the map will no longer load."}
        </p>
        <ConsentControl locale={locale} />
      </Section>
    </Shell>
  );
}
