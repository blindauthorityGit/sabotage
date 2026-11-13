import {languages, languageHref, type Language} from '../lib/language';

const names = {en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español'};

export default function LanguageSwitch({lang, path}: {lang: Language; path: string}) {
  return (
    <div className="language-switch">
      {languages.map(language => (
        <a key={language} href={languageHref(path, language)} lang={language} hrefLang={language}
          aria-label={names[language]} aria-current={lang === language ? 'page' : undefined}>
          {language.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
