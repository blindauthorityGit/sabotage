import SiteHeader from '../../../components/SiteHeader';
import {notFound} from 'next/navigation';
import DetailHeader from '../../../components/DetailHeader';
import StructuredData from '../../../components/StructuredData';
import {credits, roles} from '../../archive/catalogue';
import archiveData from '../../../lib/archive-data.json';
import {getDetails} from '../../../lib/detail-content';
import {contentSlug, newsPath, relatedReleases, releasePath} from '../../../lib/detail-paths';
import {languageHref, readLanguage, tr} from '../../../lib/language';
import {normalizeReleaseTitle} from '../../../lib/release-artwork';
import {absoluteUrl, bandName, pageMetadata, type SearchProps} from '../../../lib/seo';
import {translateText} from '../../../lib/translations';

type Props = SearchProps & {params: Promise<{slug: string}>};

function releaseCredits(slug: string) {
  return credits.filter(([, release]) => release.split(/ · | \/ /).some(part => contentSlug(part) === slug));
}

export async function generateMetadata({params, searchParams}: Props) {
  const [{slug}, {lang: requested}, {releases}] = await Promise.all([params, searchParams, getDetails()]);
  const release = releases.get(slug);
  if (!release) notFound();
  const lang = readLanguage(requested);
  const title = normalizeReleaseTitle(release.title).toUpperCase();
  const label = release.label ? ` · ${release.label}` : '';
  const description = tr(lang, `Discover ${title} by ${bandName}`, `Entdecke ${title} von ${bandName}`,
    `Découvrez ${title} de ${bandName}`, `Descubre ${title} de ${bandName}`) + label + '.';
  return pageMetadata({
    path: releasePath(release), lang, title: `${title} | ${bandName}`, description, image: release.coverUrl,
    keywords: [title, release.label, release.artist, ...releaseCredits(slug).flatMap(([name]) => name.split(' / '))]
      .filter((term): term is string => Boolean(term)),
  });
}

export default async function ReleasePage({params, searchParams}: Props) {
  const [{slug}, {lang: requested}, {releases, news}] = await Promise.all([params, searchParams, getDetails()]);
  const release = releases.get(slug);
  if (!release) notFound();

  const lang = readLanguage(requested);
  const path = releasePath(release);
  const title = normalizeReleaseTitle(release.title).toUpperCase();
  const description = normalizeReleaseTitle(release.description?.[lang] || translateText(lang, release.description?.en || release.description?.de || ''));
  const matchingCredits = releaseCredits(slug);
  const archiveTracks = archiveData.tracks.filter(track => contentSlug(track.release) === slug);
  const tracks = release.tracklist?.length ? release.tracklist : archiveTracks.map(track => ({
    title: track.version ? `${track.title} (${track.version})` : track.title,
  }));
  const articles = Array.from(news).filter(([key]) => relatedReleases[key]?.includes(slug));

  const historyLinks = {
    tumulte: {
      anchor: 'tumulte-promocard',
      label: tr(lang, 'Original TUMULTE promo card', 'Original-Promokarte zu TUMULTE',
        'Carte promo originale de TUMULTE', 'Tarjeta promocional original de TUMULTE'),
    },
    pankow: {anchor: 'pankow', label: tr(lang, 'The sessions with PANKOW', 'Die Aufnahmen mit PANKOW',
      'Les sessions avec PANKOW', 'Las sesiones con PANKOW')},
    front242: {anchor: 'front-242', label: tr(lang, 'The collaboration with FRONT 242', 'Die Zusammenarbeit mit FRONT 242',
      'La collaboration avec FRONT 242', 'La colaboración con FRONT 242')},
  };
  const historyLink = slug === 'tumulte' ? historyLinks.tumulte
    : ['annorlunda', 'les-enfants-sauvages'].includes(slug) ? historyLinks.pankow
    : ['sexploitation-cinema', 'sexploitation-cinema-limited-edition', 'goddess', 'schlager'].includes(slug) ? historyLinks.front242
    : undefined;

  return <>
  <SiteHeader lang={lang} path={path}/>
  <main className="site-content manifesto detail-page" lang={lang}>
    <StructuredData data={{
      '@type': 'MusicRelease', name: title, url: absoluteUrl(languageHref(path, lang)),
      image: release.coverUrl ? absoluteUrl(release.coverUrl) : undefined,
      datePublished: release.originalReleaseDate || release.digitalReReleaseDate,
      recordLabel: release.label ? {'@type': 'Organization', name: release.label} : undefined,
      releaseOf: {'@type': 'MusicAlbum', name: title, byArtist: {'@type': 'MusicGroup', name: normalizeReleaseTitle(release.artist || bandName)}},
    }}/>
    <DetailHeader lang={lang} back={release.category === 'current' ? '/#current-releases' : '/#catalogue'}
      label={release.category === 'current' ? 'RELEASES' : 'BACK CATALOGUE'} title={title}/>
    <div className="manifesto-prose release-detail">
      {release.coverUrl && <img className="release-detail-cover" src={release.coverUrl} alt={title}/>}
      {release.originalReleaseDate && <p>{tr(lang, 'Original release', 'Erstveröffentlichung', 'Sortie originale', 'Lanzamiento original')} · <time dateTime={release.originalReleaseDate}>{release.originalReleaseDate}</time></p>}
      {release.digitalReReleaseDate && <p>{tr(lang, 'Digital re-release', 'Digitale Wiederveröffentlichung', 'Réédition numérique', 'Reedición digital')} · <time dateTime={release.digitalReReleaseDate}>{release.digitalReReleaseDate}</time></p>}
      {release.label && <p>{release.labelUrl ? <a href={release.labelUrl}>{release.label} ↗</a> : release.label}</p>}
      {description && <div className="release-description">{description.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
      {release.links?.filter(link => link.enabled && link.url).map(link =>
        <p key={link.url}><a className="textlink" href={link.url}>{translateText(lang, link.label)} ↗</a></p>)}
      {!!tracks.length && <section><h2>TRACKLIST</h2><ol>{tracks.map((track, index) => <li key={index}>{track.title}</li>)}</ol></section>}
      {!!matchingCredits.length && <section><h2>CREDITS</h2><ul>{matchingCredits.map(([name, work, role]) =>
        <li key={`${name}:${work}:${role}`}><strong>{name}</strong> · {roles[role][lang]}<br/>{work}</li>)}</ul></section>}
      {articles.length > 0 && <section><h2>NEWS</h2><ul>{articles.map(([key, item]) =>
        <li key={key}><a className="textlink" href={languageHref(newsPath(item), lang)}>{normalizeReleaseTitle(item.title)} →</a></li>)}</ul></section>}
      {historyLink && <p><a className="textlink" href={languageHref('/archive/history#' + historyLink.anchor, lang)}>
        {historyLink.label} →
      </a></p>}
      <p><a className="textlink" href={languageHref('/archive/history#credits', lang)}>ARCHIVE CREDITS →</a></p>
    </div>
  </main>
  </>;
}
