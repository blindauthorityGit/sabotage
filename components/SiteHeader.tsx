import LanguageSwitch from './LanguageSwitch';
import {languageHref, tr, type Language} from '../lib/language';

const menu = [
  ['RELEASES', '/#releases'],
  ['BACK CATALOGUE', '/#catalogue'],
  ['ARCHIVE', '/#archive'],
  ['HISTORY', '/archive/history'],
  ['NEWS', '/#news'],
  ['ABOUT', '/#about'],
  ['MANIFESTO', '/manifesto'],
  ['CONNECT', '/#connect'],
] as const;

export default function SiteHeader({lang, path}: {lang: Language; path: string}) {
  return (
    <header className="topbar" lang={lang}>
      <a className="brand" href={languageHref('/#top', lang)} aria-label="SABOTAGE QCQC?">
        <img src="/assets/sabotage-logo.png" alt="SABOTAGE QCQC?"/>
      </a>
      <nav aria-label={tr(lang, 'Main navigation', 'Hauptnavigation', 'Navigation principale', 'Navegación principal')}>
        {menu.map(([label, href]) => (
          <a key={href} href={languageHref(href, lang)} aria-current={href === path ? 'page' : undefined}>
            {label}
          </a>
        ))}
      </nav>
      <LanguageSwitch lang={lang} path={path}/>
    </header>
  );
}
