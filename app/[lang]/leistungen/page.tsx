import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";
import type { Locale } from "../../../lib/i18n";
import { getHomeContent } from "../../../lib/home";
import PageHero from "../../../components/v3/PageHero";
import PriceBoard from "../../../components/v3/PriceBoard";
import Steps from "../../../components/v3/Steps";
import Faq from "../../../components/v3/Faq";
import ClosingCta from "../../../components/v3/ClosingCta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/leistungen", title: "Web Design Prices – Website from €490", description: "Web design pricing: template website from €490, custom website from €990, SEO & care from €99/month. Fixed price, no fine print." })
    : pageMetadata({ lang, path: "/leistungen", title: "Webdesign Preise – Website ab 490 €", description: "Preise für Webdesign: Muster-Website ab 490 €, Custom-Website ab 990 €, SEO & Wartung ab 99 €/Monat. Festpreis, Endpreise nach § 19 UStG." });
}

type Cell = string | boolean;

export default async function Leistungen({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "de";
  const de = locale === "de";
  const c = getHomeContent(locale);

  const cols = de ? ["Muster", "Custom", "SEO & Wartung"] : ["Template", "Custom", "SEO & care"];
  const rows: [string, Cell, Cell, Cell][] = de
    ? [
        ["Preis", "ab 490 €", "ab 990 €", "ab 99 € / Monat"],
        ["Lieferzeit", "3–5 Werktage", "7–14 Werktage", "laufend"],
        ["Design", "Vorlage, angepasst", "individuell", "–"],
        ["Seiten", "je nach Vorlage", "bis zu 5 Seiten", "–"],
        ["Kontaktformular", true, true, "–"],
        ["Mobil optimiert", true, true, true],
        ["SEO-Grundlagen", true, true, true],
        ["Laufende SEO-Optimierung", false, false, true],
        ["Updates & Änderungen", false, false, true],
        ["Domain & Hosting im 1. Jahr", true, true, "–"],
        ["Support nach Übergabe", "30 Tage", "30 Tage", "laufend"],
      ]
    : [
        ["Price", "from €490", "from €990", "from €99 / month"],
        ["Delivery", "3–5 working days", "7–14 working days", "ongoing"],
        ["Design", "template, adapted", "custom", "–"],
        ["Pages", "as per template", "up to 5 pages", "–"],
        ["Contact form", true, true, "–"],
        ["Mobile-optimised", true, true, true],
        ["SEO basics", true, true, true],
        ["Ongoing SEO", false, false, true],
        ["Updates & changes", false, false, true],
        ["Domain & hosting year one", true, true, "–"],
        ["Support after handover", "30 days", "30 days", "ongoing"],
      ];

  const extras: [string, string, string][] = de
    ? [
        ["Google-Unternehmensprofil einrichten", "149 € einmalig", "Profil anlegen, optimieren und bei der Verifizierung helfen – für lokale Suchen."],
        ["Speed-Optimierung", "199 € einmalig", "Ladezeit einer bestehenden Website verbessern, Core Web Vitals in den grünen Bereich."],
        ["Zusätzliche Seite", "ab 99 €", "Weitere Unterseite, z. B. Leistung, Galerie oder Über uns."],
        ["Wartung & Updates", "ab 49 € / Monat", "Texte und Bilder ändern, technische Wartung – ohne dass du dich kümmern musst."],
      ]
    : [
        ["Google Business Profile setup", "€149 one-off", "Create and optimise the profile and help with verification – for local search."],
        ["Speed optimisation", "€199 one-off", "Improve load time of an existing website, Core Web Vitals into the green."],
        ["Additional page", "from €99", "Another subpage, e.g. a service, gallery or about page."],
        ["Maintenance & updates", "from €49 / month", "Change copy and images, technical maintenance – no effort for you."],
      ];

  const faq: [string, string][] = de
    ? [
        ...c.faq.items,
        ["Was ist der Unterschied zwischen Muster und Custom?", "Bei der Muster-Website ist ein fertiges, geprüftes Design die Basis – das spart Zeit und Geld. Eine Custom-Website wird von Grund auf nach deinen Vorstellungen gestaltet und dauert etwas länger."],
        ["Was kostet die Website ab dem zweiten Jahr?", "Für Domain und Hosting fallen je nach Anbieter etwa 10–15 € im Monat an. Wartung (ab 49 €) oder SEO & Wartung (ab 99 €) sind optional."],
        ["Muss ich Texte und Bilder selbst liefern?", "Du lieferst Logo, Kerninfos und vorhandene Fotos. Daraus entstehen die Seitentexte – wenn etwas fehlt, helfe ich dir."],
      ]
    : [
        ...c.faq.items,
        ["What's the difference between template and custom?", "A template website starts from a ready-made, proven design – saving time and money. A custom website is designed from scratch to your ideas and takes a little longer."],
        ["What does the website cost from year two?", "Domain and hosting cost about €10–15 per month depending on the provider. Maintenance (from €49) or SEO & care (from €99) are optional."],
        ["Do I have to supply copy and images?", "You provide your logo, key info and existing photos. I turn that into page copy – and help if something is missing."],
      ];

  const renderCell = (v: Cell) =>
    v === true ? <span className="yes" aria-label={de ? "enthalten" : "included"}>✓</span>
    : v === false ? <span className="no" aria-label={de ? "nicht enthalten" : "not included"}>–</span>
    : v;

  return (
    <div className="v3">
      <PageHero
        meta={de ? "Leistungen & Preise" : "Services & pricing"}
        metaRight={<b>{de ? "Endpreise · § 19 UStG" : "Final prices · § 19 UStG"}</b>}
        title={de
          ? <><span className="l">Drei Wege zur</span><span className="l"><span className="c">Website.</span></span></>
          : <><span className="l">Three ways to</span><span className="l"><span className="c">your website.</span></span></>}
        lead={de
          ? "Wähle, was zu dir passt: fertiges Design ab 490 €, individuelle Website ab 990 € oder laufende Betreuung ab 99 € im Monat. Klarer Festpreis, kein Kleingedrucktes."
          : "Pick what suits you: a ready-made design from €490, a custom website from €990 or ongoing care from €99 a month. Clear fixed price, no fine print."}
        actions={
          <>
            <Link href="/muster" className="v3-btn v3-btn-ghost">{de ? "Designs ansehen" : "View designs"}</Link>
            <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{de ? "Kostenloses Erstgespräch" : "Free initial call"} <span className="arr" aria-hidden="true">→</span></Link>
          </>
        }
        facts={[
          { label: de ? "Muster-Website" : "Template", value: de ? "ab 490 € · 3–5 Werktage" : "from €490 · 3–5 days" },
          { label: "Custom", value: de ? "ab 990 € · 7–14 Werktage" : "from €990 · 7–14 days" },
          { label: de ? "Inklusive" : "Included", value: de ? "Domain & Hosting 1. Jahr" : "Domain & hosting year one" },
          { label: "Support", value: de ? "30 Tage nach Übergabe" : "30 days after handover" },
        ]}
      />

      <section className="v3-sec" aria-labelledby="h-pakete">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">01 / {de ? "Pakete" : "Packages"}</span>
            <h2 id="h-pakete">{c.pricing.h1}<br /><span className="c">{c.pricing.hc}</span>{` ${c.pricing.h2}`}</h2>
            <p>{c.pricing.text}</p>
          </div>
          <PriceBoard pricing={c.pricing} />
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-vergleich">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">02 / {de ? "Vergleich" : "Compare"}</span>
            <h2 id="h-vergleich">{de ? <>Was genau<br /><span className="o">drin ist.</span></> : <>What exactly<br /><span className="o">is included.</span></>}</h2>
            <p>{de ? "Alle Leistungen auf einen Blick – damit du weißt, was du bekommst." : "Everything at a glance – so you know what you get."}</p>
          </div>
          <div className="v3-compare-wrap">
            <table className="v3-compare">
              <thead>
                <tr><th scope="col"><span className="v3-sr">{de ? "Leistung" : "Feature"}</span></th>{cols.map((col, i) => <th scope="col" key={col} className={i === 1 ? "hot" : undefined}>{col}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((v, i) => <td key={i} className={i === 1 ? "hot" : undefined}>{renderCell(v)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-extras">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">03 / Extras</span>
            <h2 id="h-extras">{de ? <>Mehr<br /><span className="c">herausholen.</span></> : <>Get<br /><span className="c">more out.</span></>}</h2>
            <p>{de ? "Einzeln buchbar – zu jeder Website, auch zu bestehenden." : "Bookable separately – for any website, including existing ones."}</p>
          </div>
          <div className="v3-extra-list">
            {extras.map(([name, price, desc]) => (
              <div key={name}>
                <h3>{name}</h3>
                <p>{desc}</p>
                <span className="price">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-ablauf">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">04 / {de ? "Ablauf" : "Process"}</span>
            <h2 id="h-ablauf">{c.process.h1}<br />{`${c.process.h2} `}<span className="o">{c.process.h2o}</span></h2>
            <p>{c.process.text}</p>
          </div>
          <Steps steps={c.process.steps} />
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-faq">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">05 / FAQ</span>
            <h2 id="h-faq">{de ? "Häufige Fragen." : "Common questions."}</h2>
          </div>
          <Faq label={c.faq.label} items={faq} jsonLd />
          {de && (
            <p className="v3-faq-more">
              Mehr dazu: <Link href="/de/webdesign/website-kosten">Was kostet eine Website?</Link> · <Link href="/de/webdesign/seo-optimierung">SEO für kleine Betriebe</Link> · <Link href="/de/webdesign/landingpage-erstellen">Landingpage erstellen</Link>
            </p>
          )}
        </div>
      </section>

      <ClosingCta lang={lang} />
    </div>
  );
}
