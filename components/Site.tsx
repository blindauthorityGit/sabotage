"use client";
import {useEffect, useRef, useState} from 'react';
import type {Page,Module,Release,Link,Localized,NewsItem} from '../lib/content';
import {normalizeReleaseTitle, releaseArtworkKey} from '../lib/release-artwork';
import LanguageSwitch from './LanguageSwitch';
import {languageHref, locales, tr, type Language} from '../lib/language';
import {translateText, newsTranslation} from '../lib/translations';
import archiveData from '../lib/archive-data.json';
const local=(value:Localized|undefined,lang:Language)=>normalizeReleaseTitle(value?.[lang] || translateText(lang, value?.en || value?.de || ''));
function External({item, lang = 'en'}:{item:Link;lang?:Language}){if(!item.enabled||!item.url)return null;return <a href={item.url} target={item.url.startsWith('mailto:')?undefined:'_blank'} rel="noopener noreferrer">{translateText(lang, item.label)} ↗</a>}
function Art({url,title,lang}:{url?:string;title:string;lang:Language}){return url?<img className="cover" src={url} alt={title}/>:<div className="art-placeholder"><img src="/assets/sabotage-symbol.png" alt=""/><span>{tr(lang,'ARTWORK PENDING','COVER FOLGT','POCHETTE À VENIR','PORTADA PENDIENTE')}</span></div>}
function releaseDate(release:Release){return release.digitalReReleaseDate||release.originalReleaseDate}
const vinylPhotos = {
  black: {
    height: 1250,
    alt: {en: 'Black vinyl edition', de: 'Schwarze Vinyl-Edition'},
    description: {en: 'Black Vinyl with inlay', de: 'Schwarzes Vinyl mit Einleger'},
  },
  red: {
    height: 1500,
    alt: {en: 'Red vinyl edition', de: 'Rote Vinyl-Edition'},
    description: {en: 'Red Vinyl, Inlay, T-Shirt, Buttons, Sticker-Set', de: 'Rotes Vinyl, Einleger, T-Shirt, Buttons, Sticker-Set'},
  },
};

function ReleaseEditions({release, lang}: {release: Release; lang: Language}) {
  const hasVinylPhotos = releaseArtworkKey(release) === 'no-bottom-no-top';

  return (
    <div className="tags">
      {release.editions?.map((edition, index) => {
        const color = edition.color?.trim().toLowerCase();
        const photo = hasVinylPhotos && edition.format?.trim().toLowerCase() === 'vinyl'
          && (color === 'black' || color === 'red') ? vinylPhotos[color] : null;
        const colorName = color === 'black' ? tr(lang, 'Black', 'Schwarz', 'noir', 'negro')
          : color === 'red' ? tr(lang, 'Red', 'Rot', 'rouge', 'rojo') : edition.color;
        const format = edition.format?.toLowerCase() === 'vinyl' ? tr(lang,'Vinyl','Vinyl','vinyle','vinilo') : edition.format;
        const label = (lang === 'fr' || lang === 'es'
          ? [edition.quantity, format, colorName] : [edition.quantity, colorName, format]).filter(Boolean).join(' ');

        return photo ? (
          <div className="vinyl-edition" key={index}>
            <span>{label}</span>
            <p className="vinyl-edition-description">{local(photo.description, lang)}</p>
            <img
              src={`/assets/no-bottom-no-top-${color}-vinyl.webp`}
              alt={local(photo.alt, lang)}
              width={1000}
              height={photo.height}
              loading="lazy"
            />
          </div>
        ) : <span key={index}>{label}</span>;
      })}
    </div>
  );
}

function ReleaseCard({release,lang}:{release:Release;lang:Language}){const date=releaseDate(release);return <article className="release-card"><Art url={release.coverUrl} title={normalizeReleaseTitle(release.title)} lang={lang}/><div className="release-card-copy"><small>{release.artist||'SABOTAGE QCQC?'} / {translateText(lang, release.releaseStatus || 'pending')}{date?` / ${date}`:''}</small><h3>{normalizeReleaseTitle(release.title)}</h3><p>{release.labelUrl?<a href={release.labelUrl} target="_blank" rel="noopener noreferrer">{release.label} ↗</a>:release.label||''}</p><div className="inline-links">{release.links?.map((l,i)=><External key={i} item={l} lang={lang}/>)}</div></div></article>}
const emptyNews: NewsItem[] = [];

function NewsSection({items, lang, header}: {
  items: NewsItem[]; lang: Language; header: React.ReactNode;
}) {
  const [selectedId, setSelectedId] = useState('');
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function syncSelection() {
      const hash = window.location.hash;
      const item = items.find(item => hash === `#news-${item._id}`);
      setSelectedId(item?._id ?? '');
      if (item) panel.current?.scrollIntoView({block: 'start'});
    }
    syncSelection();
    window.addEventListener('hashchange', syncSelection);
    return () => window.removeEventListener('hashchange', syncSelection);
  }, [items]);

  const news = items.map(item => {
    const isoDate = item.title.trim().toUpperCase().endsWith('THE PAST RETURNS. THE FUTURE BEGINS.')
      ? '2026-11-09'
      : item.date;
    const date = isoDate ? new Date(isoDate + 'T00:00:00Z') : null;
    const validDate = date && !Number.isNaN(date.getTime()) ? date : null;
    const shortDate = validDate ? isoDate?.slice(5, 7) + '/' + isoDate?.slice(0, 4) : null;
    const fullDate = validDate && new Intl.DateTimeFormat(locales[lang], {
      month: 'short', timeZone: 'UTC',
    }).format(validDate).replace(/\.$/, '');

    return {...item, isoDate, shortDate, fullDate: fullDate && `${isoDate?.slice(8, 10)}. ${fullDate}.${isoDate?.slice(0, 4)}`};
  }).sort((a, b) => (b.isoDate ?? '').localeCompare(a.isoDate ?? ''));

  const item = news.find(item => item._id === selectedId) ?? news[0];

  return (
    <section className="section news" id="news">
      {header}
      <div className="news-layout">
        <div className="news-articles" ref={panel} aria-live="polite">
          {item && (
            <article className="news-article" id={`news-${item._id}`} key={item._id}>
              {item.shortDate && <time className="news-date" dateTime={item.isoDate}>{item.shortDate}</time>}
              <h3>{normalizeReleaseTitle(item.title)}</h3>
              {item.imageUrl && (
                <img className="news-image" src={item.imageUrl} alt={local(item.imageAlt, lang)}
                  width={item.imageWidth} height={item.imageHeight} loading="lazy"
                  style={item.imageClipPath ? {clipPath: item.imageClipPath} : undefined}/>
              )}
              <div className="news-body">
                {(item.body?.[lang] || newsTranslation(item._id, lang)?.body || local(item.body, lang)).split('\n\n').map((paragraph, i) => {
                  const link = item.links?.find(link => link.enabled && link.url === paragraph);
                  if (link) return <p key={i}><External item={link} lang={lang}/></p>;

                  return <p key={i}>
                    {paragraph.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((text, j) => {
                      if (j % 2 === 0) return text;
                      if (text.startsWith('**')) return <strong key={j}>{text.slice(2, -2)}</strong>;
                      return <em key={j}>{text.slice(1, -1)}</em>;
                    })}
                  </p>;
                })}
              </div>
            </article>
          )}
        </div>
        <aside className="news-index" aria-label={tr(lang,'News headlines','News-Überschriften','Titres des actualités','Titulares de noticias')}>
          <span className="eyebrow red">HEADLINES</span>
          {news.map(entry => (
            <a key={entry._id} href={`#news-${entry._id}`}
              aria-current={entry._id === item?._id ? 'true' : undefined}
              onClick={event => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                const hash = event.currentTarget.hash;
                if (window.location.hash !== hash) window.history.pushState(null, '', hash);
                setSelectedId(entry._id);
                if (panel.current && (window.matchMedia('(max-width: 760px)').matches ||
                  panel.current.getBoundingClientRect().top < 110)) {
                  panel.current.scrollIntoView({block: 'start'});
                }
              }}>
              {entry.fullDate && <time className="news-date" dateTime={entry.isoDate}>{entry.fullDate}</time>}
              {normalizeReleaseTitle(entry.title)}
            </a>
          ))}
        </aside>
      </div>
    </section>
  );
}

const sections = [
  {key: 'hero', label: '01 SABOTAGE QCQC? / 2026-2027'},
  {key: 'statement', label: '02 STATEMENT / MANIFEST'},
  {key: 'news', label: '03 NEWS GRID'},
  {key: 'feature', label: '04 LATEST RELEASES'},
  {key: 'current-releases', label: '05 FORTHCOMING RELEASES'},
  {key: 'catalogue', label: '06 DIGITAL BACK CATALOGUE'},
  {key: 'wear', label: '08 SABOTAGE PROTEST WEAR'},
  {key: 'archive', label: '09 ARCHIVE GRID'},
  {key: 'labels', label: '10 LINKGRID LABELS'},
  {key: 'links', label: '11 LINKLIST'},
];

function sectionPosition(module: Module) {
  const key = module._key === 'single' ? 'current-releases' : module._key;
  const position = sections.findIndex(section => section.key === key);
  if (position !== -1) return position;

  const fallbackKeys: Readonly<Record<string, string>> = {
    module_hero: 'hero',
    module_statement: 'statement',
    module_newsGrid: 'news',
    module_releaseFeature: 'feature',
    module_releaseGrid: module.releaseCategory === 'current' ? 'current-releases' : 'catalogue',
    module_archiveGrid: 'archive',
  };
  const fallback = sections.findIndex(section => section.key === fallbackKeys[module._type]);
  return fallback === -1 ? sections.length : fallback;
}

function Section({module, lang, index}: {module: Module; lang: Language; index: number}) {
  const type = module._type.replace('module_', '');
  const heading = local(module.heading, 'en');
  const intro = local(module.intro, lang);
  const releases = module.releaseRefs || [];
  const wearTitle = type === 'linkGrid' ? heading.match(/^(SABOTAGE)\s+(WEAR)(\s*\/.*)?$/i) : null;
  const isWear = module._key === 'wear' || wearTitle !== null;
  const sectionLabel = (isWear ? sections.find(section => section.key === 'wear') : sections[sectionPosition(module)])?.label
    ?? `${String(index).padStart(2, '0')} ${type.toUpperCase()}`;
  const titleWithPrefix = heading.match(/^(THE|DAS|BACK|LATEST|AKTUELLER|CURRENT|AKTUELLE|LISTEN &|HÖREN &)\s+(.+)$/i);
  const titleWithSuffix = heading.match(/^(.+?)\s+(\/\s*.+)$/);
  const graphic = isWear
    ? {src: '/assets/sabotage-fist.webp', width: 640, height: 827}
    : type === 'statement'
      ? {src: '/assets/sabotage-roundel.webp', width: 640, height: 681}
      : null;
  const header = (
    <div className={graphic ? 'section-head section-head-illustrated' : 'section-head'}>
      <span className="index">{sectionLabel}</span>
      <h2 className={wearTitle ? 'wear-title' : undefined}>
        {wearTitle ? (
          <>
            {wearTitle[1]} <span className="wear-title-accent">{wearTitle[2]}</span>
            {wearTitle[3] && <span className="wear-title-status">{wearTitle[3]}</span>}
          </>
        ) : titleWithPrefix ? (
          <><span className="headline-prefix">{titleWithPrefix[1]}</span> {titleWithPrefix[2]}</>
        ) : titleWithSuffix ? (
          <>{titleWithSuffix[1]} <span className="headline-suffix">{titleWithSuffix[2]}</span></>
        ) : heading}
      </h2>
      {graphic && <img className="section-head-mark" {...graphic} alt="" loading="lazy"/>}
      {intro && type !== 'statement' && <p>{intro}</p>}
    </div>
  );
if (type === 'hero') {
  const titleLines = heading.match(/^(NO BOTTOM\s*[-–—])\s+(NO TOP)$/i);
  return <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">01 SABOTAGE QCQC? <span className="red">/</span> 2026-2027</p><h1>{titleLines ? <>{titleLines[1]} <span className="hero-title-emphasis">{titleLines[2]}</span></> : heading}</h1><p className="hero-label">{intro}</p><a className="btn primary" href="#releases">{tr(lang,'EXPLORE RELEASE','RELEASE ENTDECKEN','DÉCOUVRIR LA SORTIE','DESCUBRIR EL LANZAMIENTO')}</a></div><div className="hero-art"><img src="/assets/sabotage-symbol.png" alt="SABOTAGE emblem"/></div></section>;
}
if(type==='releaseFeature'){const r=releases[0];const date=r&&releaseDate(r);return <section className="section releases" id={module._key==='single'?'the-flood':'releases'}>{header}{r?<div className="feature"><div><Art url={r.coverUrl} title={normalizeReleaseTitle(r.title)} lang={lang}/><div className="inline-links">{r.links?.map((l,i)=><External key={i} item={l} lang={lang}/>)}</div></div><div><p className="eyebrow red">{r.labelUrl?<a href={r.labelUrl} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>:r.label}{date?` / ${date}`:''}</p><h3>{normalizeReleaseTitle(r.title)}</h3><div className="release-description">{(local(r.description,lang)|| (tr(lang,'Limited vinyl edition.','Limitierte Vinyl-Edition.','Édition vinyle limitée.','Edición limitada en vinilo.'))).split('\n\n').map((paragraph,i)=><p key={i}>{paragraph.split('\n').map((line,j)=><span key={j}>{j>0&&<br/>}{line}</span>)}</p>)}</div><ReleaseEditions release={r} lang={lang}/></div></div>:<p>{tr(lang,'Release details will follow.','Details zur Veröffentlichung folgen.','Les détails de la sortie suivront.','Los detalles del lanzamiento se anunciarán más adelante.')}</p>}</section>}
if(type==='releaseGrid')return <section className="section catalogue" id="catalogue">{header}<div className="release-grid">{releases.map(r=><ReleaseCard key={r._id} release={r} lang={lang}/>)}</div></section>;
if(type==='archiveGrid')return <section className="section archive" id="archive">{header}<div className="archive-title-list"><h3>RELEASES</h3><ul><li>ANNORLUNDA <span>1994</span></li><li>LES ENFANTS SAUVAGES <span>1995</span></li><li>TUMULTE <span>1993</span></li><li>DEUTSCHER HERBST ’77 <span>1996</span></li><li>NO BOTTOM - NO TOP <span>2027 · VINYL EP</span></li><li>THE FLOOD <span>2026 · DIGITAL SINGLE</span></li><li>LIBERTINAGE</li><li>SEXPLOITATION CINEMA</li><li>SCHLAGER</li><li>GODDESS</li><li>ACOUSTIC COSTUMES</li><li>CONCRETE</li></ul></div><div className="archive-tracklists"><h3>TRACK & COMPILATION ARCHIVE</h3><p className="archive-note">{tr(lang,'Track positions from the complete archive. Tracks on different releases are listed separately.','Trackpositionen aus dem Gesamtarchiv. Gleiche Titel auf verschiedenen Veröffentlichungen bleiben separat aufgeführt.','Positions des titres dans les archives. Les titres parus sur différentes sorties sont indiqués séparément.','Posiciones de los temas en el archivo. Los temas que aparecen en distintos lanzamientos se enumeran por separado.')}</p>{Object.entries(archiveData.tracks.reduce<Record<string, typeof archiveData.tracks>>((groups,track)=>{(groups[track.release||tr(lang,'More tracks','Weitere Titel','Autres titres','Más temas')]??=[]).push(track);return groups},{})).map(([release,tracks])=><details key={release}><summary>{release}<span>{tracks.length} {tr(lang,'tracks','Titel','titres','temas')}</span></summary><ol>{tracks.map((track,i)=><li key={`${release}-${i}`}><span>{track.title}{track.version?` — ${track.version}`:''}</span><small>{track.year}{track.position?` · Track ${track.position}`:''}</small></li>)}</ol></details>)}<details><summary>Samplers & Compilations<span>{archiveData.compilations.length} {tr(lang,'documented entries','dokumentierte Einträge','entrées documentées','entradas documentadas')}</span></summary><ol>{archiveData.compilations.map((item,i)=><li key={`comp-${i}`}><span>{item.title}{item.version?` — ${item.version}`:''}</span><small>{item.compilation}{item.year?` · ${item.year}`:''}</small></li>)}</ol></details></div><div className="archive-items">{module.archiveRefs?.map(a=><article key={a._id}><Art url={a.imageUrl} title={normalizeReleaseTitle(a.title)} lang={lang}/><h3>{normalizeReleaseTitle(a.title)}</h3></article>)}</div><div className="archive-discogs"><a href="https://www.discogs.com/artist/69880-Sabotage-QCQC?superFilter=Appearances&subFilter=Compilations" target="_blank" rel="noopener noreferrer">DISCOGS ↗</a></div></section>;
if (type === 'newsGrid') return <NewsSection items={module.newsRefs ?? emptyNews} lang={lang} header={header}/>;
if(type==='mediaGrid')return <section className="section" id="media">{header}<div className="linkgrid">{module.mediaRefs?.filter(m=>m.url).map(m=><a key={m._id} href={m.url} target="_blank" rel="noopener noreferrer">{normalizeReleaseTitle(m.title)} ↗</a>)}</div></section>;
if (type === 'statement') return (
  <section className="section about" id="about">
    {header}
    <p className="statement">{intro}</p>
    <a className="btn primary manifesto-link" href={languageHref("/manifesto", lang)}>MANIFESTO ↗</a>
    <small className="manifest-names">ISABELLE GERNAND, MARC WERNER, DETLEF WEINREICH, JOHANNES BUCHNER</small>
  </section>
);
if (type === 'linkGrid') {
  return (
    <section className="section connect" id={isWear ? 'wear' : 'connect'}>
      {header}
      <div className="linkgrid">
        {module.links?.map((link, i) => <External key={i} item={link} lang={lang}/>)}
      </div>
      {isWear && (
        <div className="wear-photos">
          <img src="/assets/sabotage-wear-alley.webp" width={900} height={1599} loading="lazy"
            alt={lang === 'de' ? 'SABOTAGE-Shirts in einer nächtlichen Gasse' : 'SABOTAGE shirts in an alley at night'}/>
          <img src="/assets/sabotage-wear-rain.webp" width={900} height={1599} loading="lazy"
            alt={lang === 'de' ? 'SABOTAGE-Shirts bei einem Nachtprotest im Regen' : 'SABOTAGE shirts at a nighttime protest in the rain'}/>
        </div>
      )}
    </section>
  );
}
return null}
export default function Site({page,contactEmail,lang}:{page:Page;contactEmail:string;lang:Language}){const modules=page.modules.filter(m=>m.enabled!==false).sort((a,b)=>sectionPosition(a)-sectionPosition(b));return <div lang={lang} className="site-language"><header className="topbar"><a className="brand" href="#top" aria-label="SABOTAGE QCQC? home"><img src="/assets/sabotage-logo.png" alt="SABOTAGE QCQC?"/></a><nav>
  <a href="#releases">RELEASES</a>
  <a href="#catalogue">BACK CATALOGUE</a>
  <a href="#archive">ARCHIVE</a>
  <a href="#news">NEWS</a>
  <a href="#about">ABOUT</a>
  <a href={languageHref('/manifesto',lang)}>MANIFESTO</a>
  <a href="#connect">CONNECT</a>
</nav><LanguageSwitch lang={lang} path="/"/></header><main className="site-content">{modules.map((m,i)=><Section key={m._key||i} module={m} index={i+1} lang={lang}/>)}</main><footer><span>© {new Date().getFullYear()} SABOTAGE QCQC?</span><span>QU'EST-CE QUE C'EST?</span><a href={'mailto:'+contactEmail}>{contactEmail}</a><a href={languageHref("/impressum", lang)}>{tr(lang,'LEGAL NOTICE','IMPRESSUM','MENTIONS LÉGALES','AVISO LEGAL')}</a><a href={languageHref("/impressum#disclaimer", lang)}>{tr(lang,'DISCLAIMER','DISCLAIMER','RESPONSABILITÉ','RESPONSABILIDAD')}</a></footer></div>}
