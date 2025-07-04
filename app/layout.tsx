import Link from "next/link";
import "./globals.css";
import "./neumorphism-variants.css";
import Head from "next/head";
import LayoutClient from "../components/LayoutClient";

export const metadata = {
  title: "Zaur's Portfolio",
  description: "Portfolio von Zaur – Webentwicklung, Projekte, Skills und Kontakt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deine-domain.de" />
        <meta property="og:image" content="https://placehold.co/1200x630/06b6d4/fff?text=Zaur+Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-black text-white font-sans min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
