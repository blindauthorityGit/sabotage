import Link from 'next/link';
import LanguageSwitch from '../../components/LanguageSwitch';
import {languageHref, readLanguage} from '../../lib/language';
import {manifestoTitles} from './translations';
import manifesto from './text.json';
import localized from './localized-text.json';
import covers from './covers.json';

export const metadata = {title: 'Manifesto — SABOTAGE QCQC?'};

const keywords = /\b(friction|rhythm|electronic underground|transformation|freedom|diversity|curiosity|resistance|Reibung|Rhythmus|Freiheit|Vielfalt|Neugier|Widerstand|Veränderung|rythme|liberté|diversité|curiosité|résistance|underground électronique|fricción|ritmo|libertad|diversidad|curiosidad|resistencia|transformación|underground electrónico)\b/gi;

export default async function Manifesto({searchParams}: {searchParams: Promise<{lang?: string}>}) {
  const lang = readLanguage((await searchParams).lang);
  const copy = manifestoTitles.en;
  const {chapters, closing} = lang === 'en' ? manifesto : localized[lang];
  const silence = chapters[3].paragraphs.at(-1);
  const openingPull = chapters[0].paragraphs.at(-1);
  return (
    <main className="site-content manifesto" lang={lang}>
      <header className="manifesto-header">
        <Link className="textlink" href={languageHref('/#about', lang)}>← SABOTAGE QCQC?</Link>
        <LanguageSwitch lang={lang} path="/manifesto"/>
        <p className="eyebrow">{copy.label}</p>
        <h1 lang="en">{copy.title} <em>{copy.accent}</em></h1>
        <img className="manifesto-symbol" src="/assets/sabotage-symbol.png" alt="" width={1920} height={1920}/>
        <p className="eyebrow">{manifesto.subtitle}</p>
      </header>
      {chapters.map(({heading, paragraphs}, index) => (
        <section className={`manifesto-chapter${index === 3 ? ' manifesto-chapter-silence' : ''}`} key={heading}>
          <h2 lang="en">{manifesto.chapters[index].heading}</h2>
          {index === 7 && (
            <img className="manifesto-voice" src="/assets/manifesto-we-make-music.webp"
              alt="Two people wearing SABOTAGE shirts in a crowd" width={1440} height={960} loading="lazy"/>
          )}
          <div className="manifesto-prose">
            {paragraphs.filter(paragraph => paragraph !== silence).map(paragraph => (
              paragraph === openingPull
                ? <div className="manifesto-prints" key={paragraph}>
                    <p className="manifesto-pull" lang="en">{manifesto.chapters[0].paragraphs.at(-1)}</p>
                    <img src="/assets/manifesto-nbnt-front.webp" alt="SABOTAGE — Without the bottom there is no top"
                      width={1200} height={445} loading="lazy"/>
                  </div>
                : <p key={paragraph}>{paragraph.split(keywords).map((part, i) =>
                  i % 2 === 1 ? <strong className="manifesto-keyword" key={i}>{part}</strong> : part
                )}</p>
            ))}
          </div>
          {index === 2 && (
            <img className="manifesto-collision-print" src="/assets/manifesto-nbnt-back.webp"
              alt="No Bottom — SABOTAGE — No Top" width={1200} height={712} loading="lazy"/>
          )}
          {index === 3 && (
            <div className="manifesto-silence">
              <p lang="en">{manifesto.chapters[3].paragraphs.at(-1)}</p>
              <img src="/assets/manifesto-silence.webp" alt="Black-and-white collage of hands holding the vertical SABOTAGE lettering" width={1024} height={1536} loading="lazy"/>
            </div>
          )}
          {index === 6 && (
            <img className="manifesto-voice" src="/assets/manifesto-voice.webp" alt="SABOTAGE poster reading Use your own voice. Disrupt the system. Ignore the narrative." width={1199} height={1312} loading="lazy"/>
          )}
          {index === 1 && (
            <div className="manifesto-archive">
              {covers.map(({src, title, width, height}) => (
                <img key={src} src={src} alt={title} width={width} height={height} loading="lazy"/>
              ))}
            </div>
          )}
          {index === 5 && (
            <img className="manifesto-cover" src="/assets/no-bottom-no-top.png" alt="No Bottom - No Top cover" loading="lazy"/>
          )}
        </section>
      ))}
      <footer className="manifesto-closing">
        <img className="manifesto-fist" src="/assets/sabotage-fist.webp" alt="" width={640} height={827} loading="lazy"/>
        {closing.map(line => <span key={line}>{line}</span>)}
        <Link className="textlink" href={languageHref('/#about', lang)}>← {manifestoTitles[lang].back}</Link>
      </footer>
    </main>
  );
}
