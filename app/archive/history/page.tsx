import Link from 'next/link';
import LanguageSwitch from '../../../components/LanguageSwitch';
import {languageHref, readLanguage, tr} from '../../../lib/language';
import {archiveRarities} from '../catalogue';
import {archiveFuture, collaborations, collaborationsIntro} from '../collaborations';
import CreditSearch from '../CreditSearch';
import {getDetails} from '../../../lib/detail-content';
import {releasePath} from '../../../lib/detail-paths';
import {normalizeReleaseTitle} from '../../../lib/release-artwork';
import {tapeHistory, tapeHistoryClosing, tapeHistoryTitle} from '../tape-history';

import {siteMetadata, type SearchProps} from '../../../lib/seo';

export async function generateMetadata({searchParams}: SearchProps) {
  return siteMetadata('history', readLanguage((await searchParams).lang));
}

export default async function History({searchParams}: {searchParams: Promise<{lang?: string}>}) {
  const lang = readLanguage((await searchParams).lang);
  const {releases} = await getDetails();
  const historyReleases = ['tumulte', 'annorlunda', 'les-enfants-sauvages', 'sexploitation-cinema', 'goddess', 'schlager'];

  return (
    <main className="site-content manifesto network-archive" lang={lang}>
      <header className="manifesto-header">
        <Link className="textlink" href={languageHref('/#archive', lang)}>← ARCHIVE GRID</Link>
        <LanguageSwitch lang={lang} path="/archive/history"/>
        <p className="eyebrow">SABOTAGE QCQC?</p>
        <h1>HISTORY</h1>
        <p>{tr(lang,
          'From the cassette underground to a European network of artists, producers and remixers.',
          'Vom Kassetten-Underground zum europäischen Netzwerk aus Künstlern, Produzenten und Remixern.',
          'De la scène cassette underground à un réseau européen d’artistes, de producteurs et de remixeurs.',
          'De la escena underground del casete a una red europea de artistas, productores y remezcladores.'
        )}</p>
        <a className="btn primary" href="#credits">{tr(lang, 'Search the archive', 'Archiv durchsuchen', 'Rechercher dans les archives', 'Buscar en el archivo')}</a>
      </header>
      <section className="manifesto-chapter" aria-labelledby="tape-underground">
        <span className="eyebrow red">01</span>
        <h2 id="tape-underground">THE TAPE UNDERGROUND</h2>
        <div className="manifesto-prose">
          <h3 lang="en">{tapeHistoryTitle}</h3>
          <p><small>{tr(lang, 'From the band’s account', 'Aus der Bandgeschichte', 'D’après le récit du groupe', 'Según el relato de la banda')}</small></p>
          {tapeHistory[lang].map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <p><strong>{tapeHistoryClosing[lang]}</strong></p>
        </div>
      </section>
      <section className="manifesto-chapter" aria-labelledby="collaborations">
        <span className="eyebrow red">02</span>
        <h2 id="collaborations">COLLABORATIONS &amp; REMIXES</h2>
        <div className="manifesto-prose">
          <p><strong>DECADES OF CREATIVE CONNECTIONS.</strong></p>
          <p>{collaborationsIntro[lang]}</p>
        </div>
        {collaborations.map(({title, outro, entries}) => (
          <section className="history-collaborations manifesto-prose" key={title}>
            <h3>{title}</h3>
            <dl>
              {entries.map(({title, copy}) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{typeof copy === 'string' ? copy : copy[lang]}</dd>
                </div>
              ))}
            </dl>
            {outro && <p>{outro[lang]}</p>}
          </section>
        ))}
      </section>
      <section className="manifesto-chapter" aria-labelledby="archive-future">
        <span className="eyebrow red">03</span>
        <h2 id="archive-future">THE ARCHIVE IS STILL GROWING</h2>
        <div className="manifesto-prose">
          <p>{archiveFuture[lang]}</p>
          <p>{archiveRarities[lang]}</p>
          <p><strong>MORE THAN A DISCOGRAPHY. A NETWORK OF CREATIVE CONNECTIONS.</strong></p>
        </div>
      </section>
      <section className="manifesto-chapter" aria-labelledby="history-releases">
        <h2 id="history-releases">RELATED RELEASES</h2>
        <ul className="archive-credits">
          {historyReleases.map(slug => {
            const release = releases.get(slug);
            return release && <li key={slug}><Link className="textlink" href={languageHref(releasePath(release), lang)}>
              {normalizeReleaseTitle(release.title)} →
            </Link></li>;
          })}
        </ul>
      </section>
      <section className="manifesto-chapter" aria-labelledby="press-coverage">
        <h2 id="press-coverage">PRESS COVERAGE</h2>
        <ul className="archive-credits">
          <li><a className="textlink" lang="en" href="https://www.side-line.com/sabotage-qcqc-digital-reissues/">
            SIDE-LINE · Sabotage Q.C.Q.C.? sets 1990s reissues and 2027 album ↗
          </a></li>
          <li><a className="textlink" lang="de" href="https://www.medienkonverter.de/artikel/sabotage-qcqc-holen-zwei-neunziger-veroeffentlichungen-ins-netz">
            MEDIENKONVERTER · Sabotage Q.C.Q.C.? holen zwei Neunziger-Veröffentlichungen ins Netz ↗
          </a></li>
        </ul>
      </section>
      <CreditSearch lang={lang}/>
    </main>
  );
}
