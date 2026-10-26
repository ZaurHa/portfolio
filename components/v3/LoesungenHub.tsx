import Link from "next/link";
import type { LoesungSprache } from "../../lib/loesungen-typen";
import { loesungen, katalog } from "../../lib/loesungen";
import { LOESUNGEN_BASIS, RU_PFAD, loesungPfad } from "../../lib/loesungen-pfade";
import { SITE_URL } from "../../lib/seo";
import PageHero from "./PageHero";
import ClosingCta from "./ClosingCta";

export const HUB_TEXT = {
  de: {
    metaTitle: "KI, Apps und Automatisierung für kleine Betriebe",
    metaDescription:
      "KI-Telefonassistent, Chatbot, Recruiting, Web-Apps, Büro-Automatisierung und mehr: alle Angebote für kleine Betriebe mit Preisen, von BrandWerkX aus Geretsried.",
    meta: "Lösungen · KI, Apps, Automatisierung",
    metaRight: "Festpreise · § 19 UStG",
    h1a: "KI, Apps und Automatisierung",
    h1b: "für kleine Betriebe",
    lead: "Ich baue nicht nur Websites. Für Betriebe ohne eigene IT löse ich drei Probleme: verpasste Anrufe und Anfragen, fehlendes Personal und Zettelwirtschaft im Büro. Hier findest du alle Angebote mit Preisen.",
    cta: "Kostenloses Erstgespräch",
    seitenNum: "01 / Lösungen",
    seitenTitel: "Die wichtigsten Lösungen",
    katalogNum: "02 / Alle Angebote",
    katalogTitel: "Alle Angebote im Überblick",
    katalogLead: "Jedes Angebot gibt es einzeln oder kombiniert. Feste Pakete haben ihren Preis auf der jeweiligen Seite, Projekte bekommen nach einem kostenlosen Erstgespräch einen schriftlichen Festpreis.",
    mehr: "Mehr →",
    foerderTitel: "Digitalbonus Bayern",
    foerderText:
      "Für Web-Apps, Portale, Automatisierung und KI in deinen Abläufen kann der Digitalbonus Bayern die Hälfte der Kosten übernehmen, bis 7.500 € bei Projekten ab 4.000 € (Stand Oktober 2026). Den Antrag stellt dein Betrieb selbst über das ELSTER-Unternehmenskonto, und zwar bevor etwas beauftragt wird. Normale Websites fördert das Programm nicht.",
    foerderLink: "Web-App mit Förderung",
    ru: "Русская версия: сайты, ИИ-ассистенты и автоматизация на русском",
    ask: "Welche Lösung passt zu deinem Betrieb?",
  },
  en: {
    metaTitle: "AI, web apps and automation for small businesses",
    metaDescription:
      "AI phone assistants, chatbots, custom web apps, automation and multilingual websites at fixed prices. GDPR-minded, from Germany, in English, German or Russian.",
    meta: "Solutions · AI, apps, automation",
    metaRight: "Fixed prices · no German VAT",
    h1a: "AI assistants, web apps",
    h1b: "and automation for small businesses",
    lead: "I build more than websites: AI assistants that answer calls and chats, web apps that replace spreadsheets and paper, and automations that take work off your desk. Fixed prices, GDPR in mind, in English, German or Russian.",
    cta: "Book a free call",
    seitenNum: "01 / Solutions",
    seitenTitel: "Main solutions",
    katalogNum: "02 / All offers",
    katalogTitel: "All offers at a glance",
    katalogLead: "Every offer is available on its own or combined. Fixed packages show their price on their own page; projects get a written fixed price after a free call.",
    mehr: "More →",
    foerderTitel: "",
    foerderText: "",
    foerderLink: "",
    ru: "Русская версия: сайты, ИИ-ассистенты и автоматизация на русском",
    ask: "Which solution fits your business?",
  },
} as const;

/** Kurzer Preis für Karten und Links: Zahlenpreise wie „ab 490 €“, sonst nur „Festpreis“ (Projekte nach Erstgespräch). */
export function kurzPreis(betrag: string | undefined, lang: LoesungSprache): string {
  if (betrag && /\d/.test(betrag) && !/%/.test(betrag)) return betrag;
  return lang === "de" ? "Festpreis" : "Fixed price";
}

/** Übersicht aller Lösungen mit Katalog (DE: /de/loesungen, EN: /en/solutions). Preise stehen nur auf den Einzelseiten. */
export default function LoesungenHub({ lang }: { lang: LoesungSprache }) {
  const t = HUB_TEXT[lang];
  const seiten = loesungen[lang];
  const familien = katalog[lang];
  const hubUrl = `${SITE_URL}${LOESUNGEN_BASIS[lang]}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${hubUrl}#page`,
        url: hubUrl,
        name: t.metaTitle,
        description: t.metaDescription,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "ItemList",
        itemListElement: seiten.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.label,
          url: `${SITE_URL}${loesungPfad(s.key, lang)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "BrandWerkX", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: lang === "de" ? "Lösungen" : "Solutions", item: hubUrl },
        ],
      },
    ],
  };

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        meta={t.meta}
        metaRight={<b>{t.metaRight}</b>}
        title={<><span className="l">{t.h1a}</span><span className="l"><span className="c">{t.h1b}</span></span></>}
        lead={t.lead}
        actions={<Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{t.cta} <span className="arr" aria-hidden="true">→</span></Link>}
      />

      <section className="v3-sec" aria-labelledby="h-seiten">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">{t.seitenNum}</span>
            <h2 id="h-seiten">{t.seitenTitel}</h2>
          </div>
          <nav className="v3-links v3-links-desc" aria-label={t.seitenTitel}>
            {seiten.map((s) => (
              <Link key={s.key} href={loesungPfad(s.key, lang) ?? LOESUNGEN_BASIS[lang]}>
                <b>{s.label}</b>
                <small>{s.metaDescription}</small>
                <span>{kurzPreis(s.preise[0]?.betrag, lang)} · {t.mehr}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-katalog">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">{t.katalogNum}</span>
            <h2 id="h-katalog">{t.katalogTitel}</h2>
          </div>
          <p className="v3-katalog-lead">{t.katalogLead}</p>
          <div className="v3-katalog">
            {familien.map((f) => (
              <div key={f.titel} className="v3-katalog-fam">
                <h3>{f.titel}</h3>
                <p>{f.warum}</p>
                <table>
                  <tbody>
                    {f.angebote.map((a) => {
                      const ziel = a.seite ? loesungPfad(a.seite, lang) : null;
                      return (
                        <tr key={a.name}>
                          <td>
                            <b>{ziel ? <Link href={ziel}>{a.name}</Link> : a.name}</b>
                            {a.hinweis && <span className="v3-katalog-tag">{a.hinweis}</span>}
                            <small>{a.was}</small>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {lang === "de" && (
            <div className="v3-foerder">
              <span className="v3-mono v3-accent-txt">{t.foerderTitel}</span>
              <p>{t.foerderText}</p>
              <Link href={loesungPfad("web-apps", "de") ?? "/de/loesungen"} className="v3-btn v3-btn-ghost">{t.foerderLink} <span className="arr" aria-hidden="true">→</span></Link>
            </div>
          )}

          <p className="v3-ru-hinweis">
            <Link href={RU_PFAD} lang="ru" hrefLang="ru">{t.ru} →</Link>
          </p>
        </div>
      </section>

      <ClosingCta lang={lang} ask={t.ask} />
    </div>
  );
}
