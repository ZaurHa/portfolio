import type { Metadata } from 'next';

export const SITE_URL = 'https://brandwerkx.de';
export const SITE_NAME = 'BrandWerkX';
/** Fester Stand für die Sitemap – bei inhaltlichen Änderungen anpassen. */
export const SITEMAP_LAST_MODIFIED = '2026-10-01';

type Lang = 'de' | 'en';

const OG_LOCALE: Record<Lang, string> = { de: 'de_DE', en: 'en_US' };

interface PageMetaInput {
  lang: string;
  /** Pfad ohne Sprachpräfix, z. B. "/leistungen" oder "" für die Startseite */
  path: string;
  title: string;
  description: string;
  /** true = Titel ohne Marken-Suffix aus dem Root-Template ausliefern */
  absoluteTitle?: boolean;
  noindex?: boolean;
}

/**
 * Einheitliche Metadaten pro Seite: selbstreferenzierende Canonical,
 * hreflang (de/en/x-default), OpenGraph und Twitter inkl. Vorschaubild.
 * Verhindert, dass Seiten Canonical/hreflang der Startseite erben.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
  absoluteTitle = false,
  noindex = false,
}: PageMetaInput): Metadata {
  const locale: Lang = lang === 'en' ? 'en' : 'de';
  const url = `/${locale}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const image = {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} – ${locale === 'de' ? 'Webdesign aus Geretsried' : 'Web design from Geretsried'}`,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        de: `/de${path}`,
        en: `/en${path}`,
        'x-default': `/de${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === 'de' ? 'en' : 'de'],
      url,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
