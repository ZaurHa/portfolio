import { getDictionary, type Locale } from "../../../lib/i18n";
import KontaktClient from "./KontaktClient";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/kontakt", title: "Contact – Request a Website", description: "Request your website project: free initial call, reply within 24 hours. Web design from Geretsried for Munich and the surrounding region." })
    : pageMetadata({ lang, path: "/kontakt", title: "Website anfragen – kostenloses Erstgespräch", description: "Projekt anfragen: kostenloses Erstgespräch, Antwort innerhalb von 24 Stunden. Webdesign aus Geretsried für München und das Oberland." });
}

export default async function Kontakt({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const dict = await getDictionary(locale);
  return <KontaktClient lang={locale} dict={dict} />;
}
