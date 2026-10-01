import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/impressum", title: "Legal Notice", description: "Legal notice of BrandWerkX, Zaur Hatuev, Geretsried.", noindex: true })
    : pageMetadata({ lang, path: "/impressum", title: "Impressum", description: "Impressum von BrandWerkX, Zaur Hatuev, Geretsried.", noindex: true });
}

export default async function Impressum({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const d = await getDictionary(locale);
  const t = d.impressum;

  return (
    <div className="v3">
      <div className="v3-wrap v3-legal">
        <span className="v3-mono"><span className="v3-dot" />{t.subtitle}</span>
        <h1>{t.title}</h1>
        <p className="v3-mono stand">BrandWerkX · Zaur Hatuev · Geretsried</p>

        <section>
          <h2>{t.responsible}</h2>
          <div><p>BrandWerkX – Inhaber Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried<br />Deutschland</p></div>
        </section>
        <section>
          <h2>{t.contactTitle}</h2>
          <div>
            <p>
              Telefon: <a href="tel:+491728471641">0172 8471641</a><br />
              E-Mail: <a href="mailto:brandwerkx@gmail.com">brandwerkx@gmail.com</a><br />
              Website: <a href="https://brandwerkx.de">brandwerkx.de</a>
            </p>
          </div>
        </section>
        <section>
          <h2>{t.taxTitle}</h2>
          <div><p>{t.taxText}</p></div>
        </section>
        <section>
          <h2>{t.contentTitle}</h2>
          <div><p>Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried</p></div>
        </section>
        <section>
          <h2>{t.liabilityTitle}</h2>
          <div><p>{t.liabilityText}</p></div>
        </section>
        <section>
          <h2>{locale === "de" ? "Streitschlichtung" : "Dispute resolution"}</h2>
          <div>
            <p>
              {locale === "de"
                ? "Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
                : "I am neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board."}
            </p>
          </div>
        </section>
        <section>
          <h2>{locale === "de" ? "Datenschutz" : "Privacy"}</h2>
          <div><p><Link href={`/${lang}/datenschutz`}>{d.footer.datenschutz} →</Link></p></div>
        </section>
      </div>
    </div>
  );
}
