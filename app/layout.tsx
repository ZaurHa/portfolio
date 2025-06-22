import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import FlowerPetals from '../components/FlowerPetals'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = "https://zairabeauty.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zaira Beauty | Kosmetikstudio in Geretsried | Aquafacial, Lashlifting & Mehr',
  description: 'Ihr professionelles Kosmetikstudio in Geretsried. Exklusive Gesichtsbehandlungen, Anti-Aging, dauerhafte Haarentfernung und mehr. Buchen Sie jetzt Ihren Termin bei Zaira Beauty!',
  keywords: 'Kosmetikstudio Geretsried, Zaira Beauty, Aquafacial, Lashlifting, Browlifting, Microneedling, Anti-Aging, dauerhafte Haarentfernung, BB-Glow, Zahnbleaching, Gesichtsbehandlung',
  authors: [{ name: 'Zaira Beauty' }],
  openGraph: {
    title: 'Zaira Beauty | Exklusives Kosmetikstudio in Geretsried',
    description: 'Entdecken Sie professionelle Gesichtsbehandlungen, Anti-Aging, Haarentfernung und mehr bei Zaira Beauty.',
    url: siteUrl,
    siteName: 'Zaira Beauty',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaira Beauty | Exklusives Kosmetikstudio in Geretsried',
    description: 'Entdecken Sie professionelle Gesichtsbehandlungen, Anti-Aging, Haarentfernung und mehr bei Zaira Beauty.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Zaira Beauty",
    "image": "https://zairabeauty.de/images/logo.webp",
    "@id": "https://zairabeauty.de",
    "url": "https://zairabeauty.de",
    "telephone": "+4915159414259",
    "email": "zaira.beauty.face@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Johannispl. 10",
      "addressLocality": "Geretsried",
      "postalCode": "82538",
      "addressCountry": "DE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "00:00"
      }
    ]
  };

  return (
    <html lang="de">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <FlowerPetals />
        <main>{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
} 