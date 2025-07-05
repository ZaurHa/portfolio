import "./globals.css";
import "./neumorphism-variants.css";
import LayoutClient from "../components/LayoutClient";

export const metadata = {
  metadataBase: new URL('https://deine-domain.de'),
  title: "Zaur's Portfolio",
  description: "Portfolio von Zaur – Webentwicklung, Projekte, Skills und Kontakt.",
  openGraph: {
    title: "Zaur's Portfolio",
    description: "Portfolio von Zaur – Webentwicklung, Projekte, Skills und Kontakt.",
    url: "https://deine-domain.de",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630/06b6d4/fff?text=Zaur+Portfolio",
        width: 1200,
        height: 630,
        alt: "Zaur Portfolio OpenGraph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaur's Portfolio",
    description: "Portfolio von Zaur – Webentwicklung, Projekte, Skills und Kontakt.",
    images: [
      "https://placehold.co/1200x630/06b6d4/fff?text=Zaur+Portfolio"
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head />
      <body className="bg-black text-white font-sans min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
