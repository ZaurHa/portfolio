import "./globals.css";
import "./neumorphism-variants.css";
import LayoutClient from "../components/LayoutClient";

export const metadata = {
  metadataBase: new URL('https://brandwerkx.de'),
  title: {
    default: "BrandWerkX - Webentwicklung & Design | Zaur Hatuev",
    template: "%s | BrandWerkX"
  },
  description: "Professionelle Webentwicklung und UI/UX Design für moderne Unternehmen. Next.js, React, TypeScript. Von der Idee bis zur Umsetzung.",
  keywords: [
    "Webentwicklung", "Webdesign", "UI/UX Design", "Next.js", "React", "TypeScript", 
    "Frontend", "Full-Stack", "SEO", "Performance", "Branding", "Kosmetikstudio", "Landingpage"
  ],
  authors: [{ name: "Zaur Hatuev" }],
  creator: "Zaur Hatuev",
  publisher: "BrandWerkX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://brandwerkx.de",
    siteName: "BrandWerkX",
    title: "BrandWerkX - Webentwicklung & Design | Zaur Hatuev",
    description: "Professionelle Webentwicklung und UI/UX Design für moderne Unternehmen. Next.js, React, TypeScript.",
    images: [
      {
        url: "https://brandwerkx.de/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BrandWerkX - Webentwicklung & Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandWerkX - Webentwicklung & Design | Zaur Hatuev",
    description: "Professionelle Webentwicklung und UI/UX Design für moderne Unternehmen.",
    images: ["https://brandwerkx.de/og-image.jpg"],
    creator: "@brandwerkx",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        {/* Preconnect für Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Strukturierte Daten */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Zaur Hatuev",
              "jobTitle": "Full-Stack Webentwickler & UI/UX Designer",
              "worksFor": {
                "@type": "Organization",
                "name": "BrandWerkX"
              },
              "description": "Professionelle Webentwicklung und UI/UX Design für moderne Unternehmen",
              "url": "https://brandwerkx.de",
              "sameAs": [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername"
              ],
              "knowsAbout": [
                "Webentwicklung",
                "UI/UX Design", 
                "Next.js",
                "React",
                "TypeScript",
                "SEO",
                "Performance-Optimierung"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "DE"
              },
              "email": "kontakt@brandwerkx.de"
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BrandWerkX",
              "url": "https://brandwerkx.de",
              "logo": "https://brandwerkx.de/images/brandwerkxweiss.webp",
              "description": "Professionelle Webentwicklung und UI/UX Design für moderne Unternehmen",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "brandwerkx@gmail.com"
              },
              "serviceArea": {
                "@type": "Country",
                "name": "Deutschland"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Webentwicklung Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Webentwicklung",
                      "description": "Moderne Websites und Webanwendungen mit Next.js, React und TypeScript"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "UI/UX Design",
                      "description": "Professionelle Benutzeroberflächen und User Experience Design"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="bg-black text-white font-sans min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
