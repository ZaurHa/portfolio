import "../globals.css";
import "../design-v3.css";
import type { Metadata } from "next";
import { getDictionary, type Locale } from "../../lib/i18n";
import LayoutClient from "../../components/LayoutClient";
import { baseMetadata, fontClassName, jsonLd } from "../../lib/root";

export { viewport } from "../../lib/root";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") return baseMetadata;
  return {
    ...baseMetadata,
    title: { default: "Web Design Geretsried & Munich – Website from €490 | BrandWerkX", template: "%s | BrandWerkX" },
    description: "Websites that win clients: web design from Geretsried near Munich for tradespeople and small businesses. Fixed price from €490.",
  };
}

/** Root-Layout der Sprachseiten: setzt <html lang> passend zur Sprache. */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={fontClassName}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-black text-white font-sans min-h-screen" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <LayoutClient lang={locale} dict={dict}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
