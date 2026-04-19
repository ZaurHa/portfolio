import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

// Load fonts via next/font — eliminates render-blocking @import in CSS
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://brandwerkx.de'),
  title: {
    default: "Webentwickler München – Website erstellen lassen | BrandWerkX",
    template: "%s | BrandWerkX"
  },
  description: "Webentwickler & UI/UX Designer aus München. Ich erstelle moderne Websites, Landingpages und Webanwendungen mit Next.js. Schnelle Umsetzung, faire Preise, messbare Ergebnisse.",
  keywords: [
    "Webentwickler München",
    "Webdesign München",
    "Website erstellen lassen München",
    "Freelancer Webentwicklung München",
    "Landingpage erstellen München",
    "Next.js Entwickler München",
    "UI/UX Designer München",
    "Website für Handwerker",
    "Webdesign für kleine Unternehmen",
    "günstige Website erstellen",
    "Zaur Hatuev",
    "BrandWerkX",
    "Full-Stack Entwickler München",
    "React Entwickler",
    "SEO Optimierung München",
  ],
  authors: [{ name: "Zaur Hatuev", url: "https://brandwerkx.de/de/ueber-mich" }],
  creator: "Zaur Hatuev",
  publisher: "BrandWerkX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://brandwerkx.de/de",
    languages: {
      "de": "https://brandwerkx.de/de",
      "en": "https://brandwerkx.de/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    url: "https://brandwerkx.de",
    siteName: "BrandWerkX",
    title: "Webentwickler München – Website erstellen lassen | BrandWerkX",
    description: "Webentwickler & UI/UX Designer aus München. Moderne Websites, Landingpages und Webanwendungen mit Next.js. Schnelle Umsetzung, faire Preise.",
    images: [
      {
        url: "https://brandwerkx.de/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BrandWerkX – Webentwickler München",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webentwickler München – Website erstellen lassen | BrandWerkX",
    description: "Webentwickler & UI/UX Designer aus München. Moderne Websites mit Next.js. Faire Preise, messbare Ergebnisse.",
    images: ["https://brandwerkx.de/opengraph-image"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Strukturierte Daten */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "BrandWerkX",
                "url": "https://brandwerkx.de",
                "description": "Webentwickler & UI/UX Designer aus München. Moderne Websites, Landingpages und Webanwendungen.",
                "inLanguage": ["de", "en"],
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://brandwerkx.de/de/projekte"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "BrandWerkX – Webentwicklung München",
                "description": "Professionelle Websites für Handwerker, Selbstständige und kleine Unternehmen — ab 490€, fertig in 5 Tagen, SEO-optimiert.",
                "url": "https://brandwerkx.de",
                "email": "zaurhatu@gmail.com",
                "founder": "Zaur Hatuev",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "München",
                  "addressCountry": "DE"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "München"
                },
                "priceRange": "€€",
                "serviceType": [
                  "Webentwicklung",
                  "UI/UX Design",
                  "Landingpage Erstellung",
                  "SEO Optimierung",
                  "Webdesign",
                  "Branding"
                ],
                "sameAs": [
                  "https://github.com/ZaurHa",
                  "https://www.linkedin.com/in/zaur-hatuev-8559b91a1/"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Website-Pakete München",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "name": "Muster-Website",
                      "description": "Fertiges Website-Design individuell angepasst — mit Logo, Texten, Kontaktformular und SEO. Fertig in 3–5 Werktagen.",
                      "price": "490",
                      "priceCurrency": "EUR"
                    },
                    {
                      "@type": "Offer",
                      "name": "Custom Website",
                      "description": "Individuell gestaltete Website nach deinen Wünschen — bis zu 5 Seiten, SEO-optimiert, mobile-first.",
                      "price": "990",
                      "priceCurrency": "EUR"
                    },
                    {
                      "@type": "Offer",
                      "name": "SEO & Wartung",
                      "description": "Bestehende Website für Google optimieren, monatliche Updates und technische Betreuung.",
                      "price": "99",
                      "priceCurrency": "EUR"
                    }
                  ]
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Zaur Hatuev",
                "jobTitle": "Webentwickler & UI/UX Designer München",
                "worksFor": { "@type": "Organization", "name": "BrandWerkX" },
                "url": "https://brandwerkx.de/de/ueber-mich",
                "sameAs": [
                  "https://github.com/ZaurHa",
                  "https://www.linkedin.com/in/zaur-hatuev-8559b91a1/"
                ],
                "knowsAbout": [
                  "Webentwicklung München",
                  "Next.js",
                  "React",
                  "TypeScript",
                  "UI/UX Design",
                  "SEO",
                  "TailwindCSS",
                  "Figma"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "Kundenanfragen",
                  "email": "zaurhatu@gmail.com",
                  "availableLanguage": ["German", "English", "Russian"]
                }
              }
            ])
          }}
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
