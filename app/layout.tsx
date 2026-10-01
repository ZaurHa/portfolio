import "./globals.css";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Load fonts via next/font — eliminates render-blocking @import in CSS
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Editorial-Kontrast: kursive Serif für Highlight-Wörter (Hero, CTA)
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
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
const jsonLd = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Strukturierte Daten */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-black text-white font-sans min-h-screen"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
