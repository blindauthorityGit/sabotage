import {languageHref, type Language} from '../lib/language';

export default function DetailHeader({lang, back, label, title}: {
  lang: Language; back: string; label: string; title: string;
}) {
  return <header className="manifesto-header">
    <a className="textlink" href={languageHref(back, lang)}>← {label}</a>
    <p className="eyebrow">SABOTAGE QCQC?</p>
    <h1>{title}</h1>
  </header>;
}
