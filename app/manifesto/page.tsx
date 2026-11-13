import Link from 'next/link';
import manifesto from './text.json';
import covers from './covers.json';

export const metadata = {title: 'Manifesto — SABOTAGE QCQC?'};

const keywords = /\b(friction|rhythm|electronic underground|transformation|freedom|diversity|curiosity|resistance)\b/gi;

const titleAccent = 'TO FIT IN.';

export default function Manifesto() {
  return (
    <main className="site-content manifesto" lang="en">
      <header className="manifesto-header">
        <Link className="textlink" href="/#about">← SABOTAGE QCQC?</Link>
        <p className="eyebrow">Manifesto</p>
        <h1>{manifesto.title.slice(0, -titleAccent.length).trimEnd()} <em>{titleAccent}</em></h1>
        <img className="manifesto-symbol" src="/assets/sabotage-symbol.png" alt="" width={1920} height={1920}/>
        <p className="eyebrow">{manifesto.subtitle}</p>
      </header>
      {manifesto.chapters.map(({heading, paragraphs}, index) => (
        <section className={`manifesto-chapter${index === 3 ? ' manifesto-chapter-silence' : ''}`} key={heading}>
          <h2>{heading}</h2>
          <div className="manifesto-prose">
            {paragraphs.filter(paragraph => paragraph !== "BUT SILENCE CERTAINLY WON'T.").map(paragraph => (
              paragraph === 'MUSIC TO MOVE THE BODY. AND DISTURB THE MIND.'
                ? <p className="manifesto-pull" key={paragraph}>{paragraph}</p>
                : <p key={paragraph}>{paragraph.split(keywords).map((part, i) =>
                  i % 2 === 1 ? <strong className="manifesto-keyword" key={i}>{part}</strong> : part
                )}</p>
            ))}
          </div>
          {index === 3 && (
            <div className="manifesto-silence">
              <p>BUT SILENCE CERTAINLY WON'T.</p>
              <img src="/assets/manifesto-silence.webp" alt="Black-and-white collage of hands holding the vertical SABOTAGE lettering" width={1024} height={1536} loading="lazy"/>
            </div>
          )}
          {index === 6 && (
            <img className="manifesto-voice" src="/assets/manifesto-voice.webp" alt="SABOTAGE poster reading Use your own voice. Disrupt the system. Ignore the narrative." width={1440} height={960} loading="lazy"/>
          )}
          {heading === 'THE YEARS OF NOISE.' && (
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
        {manifesto.closing.map(line => <span key={line}>{line}</span>)}
        <Link className="textlink" href="/#about">← Back to SABOTAGE</Link>
      </footer>
    </main>
  );
}
