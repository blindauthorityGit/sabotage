"use client";
import {useState} from 'react';
import type {Page,Module,Release,Link,Localized} from '../lib/content';
import archiveData from '../lib/archive-data.json';
const local=(value:Localized|undefined,lang:'en'|'de')=>value?.[lang]||value?.en||value?.de||'';
function External({item}:{item:Link}){if(!item.enabled||!item.url)return null;return <a href={item.url} target={item.url.startsWith('mailto:')?undefined:'_blank'} rel="noopener noreferrer">{item.label} ↗</a>}
function Art({url,title}:{url?:string;title:string}){return url?<img className="cover" src={url} alt={title}/>:<div className="art-placeholder"><img src="/assets/sabotage-symbol.png" alt=""/><span>ARTWORK PENDING</span></div>}
function releaseDate(release:Release){return release.digitalReReleaseDate||release.originalReleaseDate}
const vinylPhotos = {
  black: {height: 1250, alt: {en: 'Black vinyl edition', de: 'Schwarze Vinyl-Edition'}},
  red: {height: 1500, alt: {en: 'Red vinyl edition', de: 'Rote Vinyl-Edition'}},
};

function ReleaseEditions({release, lang}: {release: Release; lang: 'en' | 'de'}) {
  const hasVinylPhotos = /^no bottom\s*[-–—]\s*no top$/i.test(release.title.trim());

  return (
    <div className="tags">
      {release.editions?.map((edition, index) => {
        const color = edition.color?.trim().toLowerCase();
        const photo = hasVinylPhotos && edition.format?.trim().toLowerCase() === 'vinyl'
          && (color === 'black' || color === 'red') ? vinylPhotos[color] : null;
        const label = [edition.quantity, edition.color, edition.format].filter(Boolean).join(' ');

        return photo ? (
          <div className="vinyl-edition" key={index}>
            <span>{label}</span>
            <img
              src={`/assets/no-bottom-no-top-${color}-vinyl.webp`}
              alt={photo.alt[lang]}
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

function ReleaseCard({release}:{release:Release}){const date=releaseDate(release);return <article className="release-card"><Art url={release.coverUrl} title={release.title}/><div className="release-card-copy"><small>{release.artist||'SABOTAGE QCQC?'} / {release.releaseStatus||'pending'}{date?` / ${date}`:''}</small><h3>{release.title}</h3><p>{release.labelUrl?<a href={release.labelUrl} target="_blank" rel="noopener noreferrer">{release.label} ↗</a>:release.label||''}</p><div className="inline-links">{release.links?.map((l,i)=><External key={i} item={l}/>)}</div></div></article>}
function Section({module,lang,index}:{module:Module;lang:'en'|'de';index:number}){const type=module._type.replace('module_','');const heading=local(module.heading,lang);const intro=local(module.intro,lang);const releases=module.releaseRefs||[];const header=<div className="section-head"><span className="index">{String(index).padStart(2,'0')} / {type.toUpperCase()}</span><h2>{heading}</h2>{intro&&type!=='statement'&&<p>{intro}</p>}</div>;
if(type==='hero')return <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">SABOTAGE QCQC? <span className="red">/</span> 2026—2027</p><h1>{heading}</h1><p className="hero-label">{intro}</p><a className="btn primary" href="#releases">{lang==='de'?'RELEASE ENTDECKEN':'EXPLORE RELEASE'}</a></div><div className="hero-art"><img src="/assets/sabotage-symbol.png" alt="SABOTAGE emblem"/></div></section>;
if(type==='releaseFeature'){const r=releases[0];const date=r&&releaseDate(r);return <section className="section releases" id={module._key==='single'?'the-flood':'releases'}>{header}{r?<div className="feature"><div><Art url={r.coverUrl} title={r.title}/><div className="inline-links">{r.links?.map((l,i)=><External key={i} item={l}/>)}</div></div><div><p className="eyebrow red">{r.labelUrl?<a href={r.labelUrl} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>:r.label}{date?` / ${date}`:''}</p><h3>{r.title}</h3><div className="release-description">{(local(r.description,lang)|| (lang==='de'?'Limitierte Vinyl-Edition.':'Limited vinyl edition.')).split('\n\n').map((paragraph,i)=><p key={i}>{paragraph.split('\n').map((line,j)=><span key={j}>{j>0&&<br/>}{line}</span>)}</p>)}</div><ReleaseEditions release={r} lang={lang}/></div></div>:<p>Release in Sanity auswählen oder Highlight aktivieren.</p>}</section>}
if(type==='releaseGrid')return <section className="section catalogue" id="catalogue">{header}<div className="release-grid">{releases.map(r=><ReleaseCard key={r._id} release={r}/>)}</div></section>;
if(type==='archiveGrid')return <section className="section archive" id="archive">{header}<div className="archive-title-list"><h3>RELEASES</h3><ul><li>ANNORLUNDA <span>1994</span></li><li>LES ENFANTS SAUVAGES <span>1995</span></li><li>TUMULTE <span>1993</span></li><li>DEUTSCHER HERBST ’77 <span>1996</span></li><li>NO BOTTOM – NO TOP <span>2027 · VINYL EP</span></li><li>THE FLOOD <span>2026 · DIGITAL SINGLE</span></li><li>LIBERTINAGE</li><li>SEXPLOITATION CINEMA</li><li>SCHLAGER</li><li>GODDESS</li><li>ACOUSTIC COSTUMES</li><li>CONCRETE</li></ul></div><div className="archive-tracklists"><h3>TRACK & COMPILATION ARCHIVE</h3><p className="archive-note">Trackpositionen aus dem Gesamtarchiv. Gleiche Titel auf verschiedenen Veröffentlichungen bleiben separat aufgeführt.</p>{Object.entries(archiveData.tracks.reduce<Record<string, typeof archiveData.tracks>>((groups,track)=>{(groups[track.release||'Weitere Titel']??=[]).push(track);return groups},{})).map(([release,tracks])=><details key={release}><summary>{release}<span>{tracks.length} Titel</span></summary><ol>{tracks.map((track,i)=><li key={`${release}-${i}`}><span>{track.title}{track.version?` — ${track.version}`:''}</span><small>{track.year}{track.position?` · Track ${track.position}`:''}</small></li>)}</ol></details>)}<details><summary>Sampler & Compilations<span>{archiveData.compilations.length} dokumentierte Einträge</span></summary><ol>{archiveData.compilations.map((item,i)=><li key={`comp-${i}`}><span>{item.title}{item.version?` — ${item.version}`:''}</span><small>{item.compilation}{item.year?` · ${item.year}`:''}</small></li>)}</ol></details></div><div className="archive-items">{module.archiveRefs?.map(a=><article key={a._id}><Art url={a.imageUrl} title={a.title}/><h3>{a.title}</h3></article>)}</div><div className="archive-discogs"><a href="https://www.discogs.com/artist/69880-Sabotage-QCQC?superFilter=Appearances&subFilter=Compilations" target="_blank" rel="noopener noreferrer">DISCOGS ↗</a></div></section>;
if(type==='newsGrid')return <section className="section news" id="news">{header}<div className="news-layout"><div className="news-articles">{module.newsRefs?.map(n=><article className="news-article" id={`news-${n._id}`} key={n._id}><h3>{n.title}</h3><div className="news-body">{local(n.body,lang).split('\n\n').map((para,i)=><p key={i}>{para}</p>)}</div></article>)}</div><aside className="news-index" aria-label="News headlines"><span className="eyebrow red">HEADLINES</span>{module.newsRefs?.map(n=><a key={n._id} href={`#news-${n._id}`}>{n.title}</a>)}</aside></div></section>;
if(type==='mediaGrid')return <section className="section" id="media">{header}<div className="linkgrid">{module.mediaRefs?.filter(m=>m.url).map(m=><a key={m._id} href={m.url} target="_blank" rel="noopener noreferrer">{m.title} ↗</a>)}</div></section>;
if(type==='statement')return <section className="section about" id="about">{header}<p className="statement">{intro}</p></section>;
if (type === 'linkGrid') {
  const isWear = module._key === 'wear' || /^sabotage wear(?:\s*\/|$)/i.test(heading.trim());
  return (
    <section className="section connect" id={isWear ? 'wear' : 'connect'}>
      {header}
      <div className="linkgrid">
        {module.links?.map((link, i) => <External key={i} item={link}/>)}
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
export default function Site({page,contactEmail}:{page:Page;contactEmail:string}){const [lang,setLang]=useState<'en'|'de'>('en');const modules=page.modules.filter(m=>m.enabled!==false);return <><header className="topbar"><a className="brand" href="#top" aria-label="SABOTAGE QCQC? home"><img src="/assets/sabotage-logo.png" alt="SABOTAGE QCQC?"/></a><nav><a href="#releases">RELEASES</a><a href="#catalogue">BACK CATALOGUE</a><a href="#archive">{lang==='de'?'ARCHIV':'ARCHIVE'}</a><a href="#news">NEWS</a><a href="#about">ABOUT</a><a href="#connect">CONNECT</a></nav><button id="lang" onClick={()=>setLang(lang==='en'?'de':'en')}>{lang==='en'?'DE':'EN'}</button></header><main className="site-content">{modules.map((m,i)=><Section key={m._key||i} module={m} index={i+1} lang={lang}/>)}</main><footer><span>© {new Date().getFullYear()} SABOTAGE QCQC?</span><span>QU'EST-CE QUE C'EST?</span><a href={'mailto:'+contactEmail}>{contactEmail}</a><a href="/impressum">{lang==='de'?'IMPRESSUM':'LEGAL NOTICE'}</a></footer></>}
