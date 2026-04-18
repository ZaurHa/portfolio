import type { Dictionary } from './de';

export type { Dictionary };

export type Locale = 'de' | 'en';

export const locales: Locale[] = ['de', 'en'];

const dictionaries = {
  de: () => import('./de').then((m) => m.default),
  en: () => import('./en').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries['de'];
  return loader();
}
