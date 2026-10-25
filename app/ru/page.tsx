import Link from "next/link";
import type { Metadata } from "next";
import { ruSeite as r } from "../../lib/ru";
import { SITE_URL } from "../../lib/seo";
import { LOESUNGEN_BASIS } from "../../lib/loesungen-pfade";
import { EMAIL, PHONE_TEL } from "../../lib/home";
import PageHero from "../../components/v3/PageHero";
import Faq from "../../components/v3/Faq";
import Steps from "../../components/v3/Steps";

const URL_RU = `${SITE_URL}/ru`;
const WHATSAPP_RU = `https://wa.me/491728471641?text=${encodeURIComponent("Здравствуйте, Заур! Меня интересует ")}`;

export const metadata: Metadata = {
  title: { absolute: r.metaTitle },
  description: r.metaDescription,
  alternates: {
    canonical: "/ru",
    languages: { de: LOESUNGEN_BASIS.de, en: LOESUNGEN_BASIS.en, ru: "/ru", "x-default": LOESUNGEN_BASIS.de },
  },
  openGraph: {
    type: "website",
    siteName: "BrandWerkX",
    locale: "ru_RU",
    alternateLocale: ["de_DE", "en_US"],
    url: "/ru",
    title: r.metaTitle,
    description: r.metaDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "BrandWerkX" }],
  },
  twitter: { card: "summary_large_image", title: r.metaTitle, description: r.metaDescription, images: ["/og.jpg"] },
};

/** Ablauf-Schritt „Titel: Text“ in Überschrift und Beschreibung teilen. */
function schritt(text: string, i: number): [string, string] {
  const k = text.indexOf(": ");
  return k > 0 && k < 48 ? [text.slice(0, k), text.slice(k + 2)] : [`Шаг ${i + 1}`, text];
}

/** Russische Seite für russischsprachige Unternehmer in Deutschland, der EU und Israel. */
export default function RuSeite() {
  const year = new Date().getFullYear();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL_RU}#page`,
        url: URL_RU,
        name: r.metaTitle,
        description: r.metaDescription,
        inLanguage: "ru",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "FAQPage",
        mainEntity: r.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <div className="site-shell min-h-screen">
      <a href="#main" className="v3-skip">Перейти к содержанию</a>
      <header className="v3-nav is-scrolled">
        <div className="v3-wrap v3-nav-row">
          <Link href="/ru" className="v3-logo" aria-label="BrandWerkX">
            <span className="logo-b">B</span>
            {"randWerk".split("").map((ch, i) => (
              <span key={i} className="logo-ch" style={{ animationDelay: `${0.42 + i * 0.055}s` }}>{ch}</span>
            ))}
            <span className="logo-x">X</span>
          </Link>
          <nav aria-label="Языки" className="v3-nav-links v3-ru-sprachen">
            <Link href={LOESUNGEN_BASIS.de} hrefLang="de" lang="de">Deutsch</Link>
            <Link href={LOESUNGEN_BASIS.en} hrefLang="en" lang="en">English</Link>
          </nav>
          <div className="v3-nav-right">
            <a href={WHATSAPP_RU} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent v3-nav-cta">
              Написать <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <div className="v3">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <PageHero
            meta={r.eyebrow}
            metaRight={<b>Герецрид · Мюнхен · онлайн</b>}
            title={<span className="l v3-h1-long">{r.h1}</span>}
            lead={r.intro}
            actions={
              <>
                <a href={`mailto:${EMAIL}`} className="v3-btn v3-btn-ghost">{EMAIL}</a>
                <a href={WHATSAPP_RU} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent">
                  Написать в WhatsApp <span className="arr" aria-hidden="true">→</span>
                </a>
              </>
            }
          />

          <section className="v3-sec" aria-labelledby="h-vorteile">
            <div className="v3-wrap">
              <div className="v3-sec-head v3-sec-head-sm">
                <span className="num">01 / Почему BrandWerkX</span>
                <h2 id="h-vorteile">Один специалист, три языка</h2>
              </div>
              <div className="v3-ru-vorteile">
                {r.vorteile.map((v) => (
                  <div key={v.titel} className="v3-preis" data-tilt="glanz">
                    <b className="v3-ru-vorteil-titel">{v.titel}</b>
                    <span>{v.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="v3-sec" aria-labelledby="h-angebote">
            <div className="v3-wrap">
              <div className="v3-sec-head v3-sec-head-sm">
                <span className="num">02 / Услуги и цены</span>
                <h2 id="h-angebote">Что я делаю для бизнеса</h2>
              </div>
              <p className="v3-katalog-lead">{r.preiseHinweis}</p>
              <div className="v3-katalog v3-katalog-1">
                <div className="v3-katalog-fam">
                  <table>
                    <tbody>
                      {r.angebote.map((a) => (
                        <tr key={a.name}>
                          <td><b>{a.name}</b><small>{a.was}</small></td>
                          <td className="preis">{a.preis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="v3-sec" aria-labelledby="h-ablauf">
            <div className="v3-wrap">
              <div className="v3-sec-head v3-sec-head-sm">
                <span className="num">03 / Как мы работаем</span>
                <h2 id="h-ablauf">Как проходит работа</h2>
              </div>
              <Steps steps={r.ablauf.map(schritt)} />
            </div>
          </section>

          <section className="v3-sec" aria-labelledby="h-faq">
            <div className="v3-wrap">
              <div className="v3-sec-head v3-sec-head-sm">
                <span className="num">FAQ</span>
                <h2 id="h-faq">Частые вопросы</h2>
              </div>
              <Faq label="Вопросы и ответы" items={r.faqs.map((f) => [f.q, f.a] as [string, string])} />
            </div>
          </section>

          <section className="v3-final" aria-labelledby="h-kontakt" id="kontakt">
            <div className="v3-wrap">
              <div className="lbl">
                <span className="v3-mono v3-accent-txt">Контакт</span>
                <span className="v3-mono v3-hide-sm">Ответ в тот же вечер или на следующий рабочий день</span>
              </div>
              <h2 id="h-kontakt" className="ask">{r.kontaktTitel}</h2>
              <p className="v3-ru-kontakt-text">{r.kontaktText}</p>
              <a href={`tel:${PHONE_TEL}`} className="v3-tel v3-tel-int" aria-label="+49 172 8471641">+49 172<span>/</span><br className="mbr" />8471641</a>
              <div className="final-row">
                <a href={WHATSAPP_RU} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent">
                  WhatsApp <span className="arr" aria-hidden="true">→</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="v3-btn v3-btn-ghost">{EMAIL}</a>
                <Link href={`/de/kontakt?thema=${encodeURIComponent("Anfrage auf Russisch")}`} className="v3-btn v3-btn-ghost">Форма (нем.)</Link>
                <span className="v3-mono">Герецрид · Мюнхен · онлайн</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="v3-footer">
        <div className="v3-wrap">
          <div className="v3-copy v3-mono">
            <span>© {year} BrandWerkX · Zaur Hatuev</span>
            <span>
              <Link href="/de/impressum" lang="de">Impressum</Link> · <Link href="/de/datenschutz" lang="de">Datenschutz</Link> · <Link href="/de" lang="de">brandwerkx.de</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
