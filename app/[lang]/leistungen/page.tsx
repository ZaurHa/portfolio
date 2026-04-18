import { getDictionary, type Locale } from "../../../lib/i18n";
import LeistungenClient from "./LeistungenClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isDE = lang !== "en";

  return isDE ? {
    title: "Webdesign Preise München – Pakete ab 790€ | BrandWerkX",
    description: "Website erstellen lassen ab 790€. Klare Pakete ohne Kleingedrucktes: Landingpage, Business-Website oder Premium-Lösung. Freelancer Webentwickler München – schnell, fair, messbar.",
    keywords: [
      "Website erstellen lassen Kosten", "Webdesign Preise München", "Landingpage Kosten",
      "Freelancer Website München", "Webentwickler Preise", "Website ab 790 Euro",
      "Webdesign Pakete", "UI/UX Design München Preis", "Next.js Website Kosten",
    ],
    alternates: { canonical: "https://brandwerkx.de/de/leistungen" },
    openGraph: {
      title: "Webdesign Preise München – Pakete ab 790€ | BrandWerkX",
      description: "Website erstellen lassen ab 790€. Landingpage, Business-Website oder Premium. Freelancer München.",
      url: "https://brandwerkx.de/de/leistungen",
    },
  } : {
    title: "Web Design Prices München – Packages from €790 | BrandWerkX",
    description: "Get a professional website from €790. Clear packages, no hidden costs. Freelance web developer München – fast delivery, fair pricing.",
    keywords: ["web developer München prices", "website cost München", "freelance web design München"],
    alternates: { canonical: "https://brandwerkx.de/en/leistungen" },
    openGraph: {
      title: "Web Design Prices München – Packages from €790 | BrandWerkX",
      description: "Professional website from €790. Freelance web developer München.",
      url: "https://brandwerkx.de/en/leistungen",
    },
  };
}

export default async function Leistungen({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const dict = await getDictionary(locale);
  return <LeistungenClient lang={lang} dict={dict} />;
}
