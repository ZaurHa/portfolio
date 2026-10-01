/**
 * Gemeinsame Bausteine der Root-Layouts (app/[lang]/layout.tsx, app/muster/layout.tsx):
 * Schriften, Basis-Metadaten, Viewport und strukturierte Daten.
 */
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0b0a",
};

// Load fonts via next/font — eliminates render-blocking @import in CSS
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Display-Schrift für Headlines (Design V3)
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Mono für Metadaten/Labels (Design V3)
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontClassName = `${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`;

export const baseMetadata: Metadata = {
  metadataBase: new URL('https://brandwerkx.de'),
  title: {
    default: "Webdesign Geretsried & München – Website ab 490 € | BrandWerkX",
    template: "%s | BrandWerkX",
  },
  description: "Website erstellen lassen ab 490 €: Webdesign aus Geretsried für Handwerker und kleine Betriebe in München und dem Oberland. In 5 Tagen live, SEO inklusive.",
  authors: [{ name: "Zaur Hatuev", url: "https://brandwerkx.de/de/ueber-mich" }],
  creator: "Zaur Hatuev",
  publisher: "BrandWerkX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const SITE = "https://brandwerkx.de";

// Verknüpfter Entity-Graph (@id) — eine Quelle der Wahrheit für Name, Ort, Preise.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "name": "BrandWerkX",
      "url": SITE,
      "inLanguage": ["de", "en"],
      "publisher": { "@id": `${SITE}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#business`,
      "name": "BrandWerkX",
      "alternateName": "BrandWerkX Webdesign",
      "description": "Webdesign und Webentwicklung für Handwerker, Selbstständige und kleine Unternehmen — Website ab 490 €, fertig in 5 Tagen, SEO inklusive.",
      "url": SITE,
      "logo": `${SITE}/images/brandwerkxweiss.webp`,
      "image": `${SITE}/opengraph-image`,
      "email": "brandwerkx@gmail.com",
      "telephone": "+491728471641",
      "founder": { "@id": `${SITE}/#zaur` },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Steiner Ring 64",
        "postalCode": "82538",
        "addressLocality": "Geretsried",
        "addressRegion": "Bayern",
        "addressCountry": "DE"
      },
      "areaServed": [
        { "@type": "City", "name": "Geretsried" },
        { "@type": "City", "name": "München" },
        { "@type": "AdministrativeArea", "name": "Landkreis Bad Tölz-Wolfratshausen" },
        { "@type": "Country", "name": "Deutschland" }
      ],
      "priceRange": "ab 490 €",
      "serviceType": [
        "Webdesign",
        "Webentwicklung",
        "Landingpage-Erstellung",
        "SEO-Optimierung",
        "Website-Wartung"
      ],
      "sameAs": [
        "https://github.com/ZaurHa",
        "https://www.linkedin.com/in/zaur-hatuev-8559b91a1/"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website-Pakete",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Muster-Website",
            "description": "Fertiges Website-Design individuell angepasst — mit Logo, Texten, Kontaktformular und SEO. Fertig in 3–5 Werktagen.",
            "priceSpecification": { "@type": "PriceSpecification", "minPrice": 490, "priceCurrency": "EUR" }
          },
          {
            "@type": "Offer",
            "name": "Custom Website",
            "description": "Individuell gestaltete Website nach Kundenwunsch — SEO-optimiert, mobile-first.",
            "priceSpecification": { "@type": "PriceSpecification", "minPrice": 990, "priceCurrency": "EUR" }
          },
          {
            "@type": "Offer",
            "name": "SEO & Wartung",
            "description": "Bestehende Website für Google optimieren, monatliche Updates und technische Betreuung.",
            "priceSpecification": { "@type": "UnitPriceSpecification", "minPrice": 99, "priceCurrency": "EUR", "unitText": "MON" }
          }
        ]
      }
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#zaur`,
      "name": "Zaur Hatuev",
      "jobTitle": "Webdesigner & Webentwickler",
      "worksFor": { "@id": `${SITE}/#business` },
      "url": `${SITE}/de/ueber-mich`,
      "sameAs": [
        "https://github.com/ZaurHa",
        "https://www.linkedin.com/in/zaur-hatuev-8559b91a1/"
      ],
      "knowsAbout": ["Webdesign", "Webentwicklung", "Next.js", "React", "TypeScript", "UI/UX Design", "SEO", "TailwindCSS", "Figma"],
      "knowsLanguage": ["de", "en", "ru"]
    }
  ]
};

