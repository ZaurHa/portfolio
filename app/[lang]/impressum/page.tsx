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
    <div className="legal-page">
      <div className="legal-inner">
        <Link href={`/${lang}`} className="legal-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.back}
        </Link>

        <h1 className="legal-title">{t.title}</h1>
        <p className="legal-updated">{t.subtitle}</p>

        <div className="legal-section">
          <h2>{t.responsible}</h2>
          <p>BrandWerkX – Inhaber Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried<br />Deutschland</p>
        </div>

        <div className="legal-section">
          <h2>{t.contactTitle}</h2>
          <p>
            E-Mail: <a href="mailto:brandwerkx@gmail.com">brandwerkx@gmail.com</a><br />
            Website: <a href="https://brandwerkx.de" target="_blank" rel="noopener noreferrer">https://brandwerkx.de</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>{t.taxTitle}</h2>
          <p>{t.taxText}</p>
        </div>

        <div className="legal-section">
          <h2>{t.contentTitle}</h2>
          <p>Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried</p>
        </div>

        <div className="legal-section">
          <h2>{t.liabilityTitle}</h2>
          <p>{t.liabilityText}</p>
        </div>

        <div className="legal-footer-links">
          <Link href={`/${lang}/datenschutz`}>{d.footer.datenschutz}</Link>
        </div>
      </div>
    </div>
  );
}
