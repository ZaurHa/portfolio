import { getDictionary, type Locale } from "../../../lib/i18n";
import KontaktClient from "./KontaktClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isDE = lang !== "en";
  return isDE ? {
    title: "Kontakt – Website anfragen | BrandWerkX München",
    description: "Website erstellen lassen? Jetzt Projekt anfragen – kostenlose Erstberatung, Antwort innerhalb 24 Stunden. Webentwickler München, faire Preise ab 790€.",
    keywords: ["Website anfragen München", "Webentwickler kontaktieren", "kostenlose Webdesign Beratung", "Freelancer München anfragen"],
    alternates: { canonical: "https://brandwerkx.de/de/kontakt" },
    openGraph: { title: "Kontakt – Website anfragen | BrandWerkX München", description: "Kostenlose Erstberatung, Antwort in 24h. Webentwickler München ab 790€.", url: "https://brandwerkx.de/de/kontakt" },
  } : {
    title: "Contact – Request a Website | BrandWerkX München",
    description: "Request your website project – free initial consultation, reply within 24 hours. Web developer München, fair prices from €790.",
    keywords: ["contact web developer München", "website quote München", "freelancer inquiry München"],
    alternates: { canonical: "https://brandwerkx.de/en/kontakt" },
    openGraph: { title: "Contact – Request a Website | BrandWerkX München", description: "Free consultation, reply in 24h. Web developer München from €790.", url: "https://brandwerkx.de/en/kontakt" },
  };
}

export default async function Kontakt({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const dict = await getDictionary(locale);
  return <KontaktClient lang={locale} dict={dict} />;
}
