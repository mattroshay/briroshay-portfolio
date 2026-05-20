import en from './en.json';
import fr from './fr.json';

export type Locale = 'en' | 'fr';
export const locales: Locale[] = ['en', 'fr'];
export const defaultLocale: Locale = 'en';

const dictionaries = { en, fr } as const;

/**
 * Resolve the active locale from a URL pathname.
 * `/fr/...` → 'fr', everything else → 'en'.
 */
export function getLocaleFromUrl(url: URL): Locale {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg === 'fr' ? 'fr' : 'en';
}

/**
 * Returns the translation dictionary for a given locale.
 * Use as: const t = useTranslations(lang); t.nav.paintings
 */
export function useTranslations(locale: Locale) {
  return dictionaries[locale];
}

/**
 * Build a path that respects the current locale.
 * localePath('en', '/paintings') → '/paintings'
 * localePath('fr', '/paintings') → '/fr/paintings'
 */
export function localePath(locale: Locale, path: string): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return normalised;
  return `/${locale}${normalised}`;
}

/**
 * Pick the localised value from a Sanity object of shape { en, fr }.
 * Falls back to the default locale if the requested one is empty.
 */
export function pickLocale<T>(
  field: Partial<Record<Locale, T>> | undefined | null,
  locale: Locale
): T | undefined {
  if (!field) return undefined;
  return field[locale] ?? field[defaultLocale];
}
