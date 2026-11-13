export const languages = ['en', 'de', 'fr', 'es'] as const;
export type Language = typeof languages[number];
export const locales = {en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES'};

export function readLanguage(value?: string): Language {
  return languages.find(language => language === value) ?? 'en';
}

export function languageHref(path: string, language: Language) {
  const [pathname, hash] = path.split('#');
  return pathname + (language === 'en' ? '' : '?lang=' + language) + (hash ? '#' + hash : '');
}

export function tr(language: Language, en: string, de: string, fr: string, es: string) {
  return {en, de, fr, es}[language];
}
