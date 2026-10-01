import { getDictionary, type Locale } from "../../../lib/i18n";
import LeistungenClient from "./LeistungenClient";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/leistungen", title: "Web Design Prices – Website from €490", description: "Web design pricing: template website from €490, custom website from €990, SEO & care from €99/month. Fixed price, no fine print." })
    : pageMetadata({ lang, path: "/leistungen", title: "Webdesign Preise – Website ab 490 €", description: "Preise für Webdesign und Webentwicklung: Muster-Website ab 490 €, Custom-Website ab 990 €, SEO & Wartung ab 99 €/Monat. Festpreis, kein Kleingedrucktes." });
}

export default async function Leistungen({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const dict = await getDictionary(locale);
  return <LeistungenClient lang={lang} dict={dict} />;
}
