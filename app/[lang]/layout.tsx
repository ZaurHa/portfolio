import { getDictionary, type Locale } from '../../lib/i18n';
import LayoutClient from '../../components/LayoutClient';

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'de') as Locale;
  const dict = await getDictionary(locale);

  return (
    <LayoutClient lang={locale} dict={dict}>
      {children}
    </LayoutClient>
  );
}
