import LanguageSwitch from './LanguageSwitch';
import {languageHref, type Language} from '../lib/language';

export default function DetailHeader({lang, path, back, label, title}: {
  lang: Language; path: string; back: string; label: string; title: string;
}) {
  return <header className="manifesto-header">
    <a className="textlink" href={languageHref(back, lang)}>← {label}</a>
    <LanguageSwitch lang={lang} path={path}/>
    <p className="eyebrow">SABOTAGE QCQC?</p>
    <h1>{title}</h1>
  </header>;
}
