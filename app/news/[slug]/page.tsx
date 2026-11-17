import {notFound} from 'next/navigation';
import DetailHeader from '../../../components/DetailHeader';
import NewsBody from '../../../components/NewsBody';
import StructuredData from '../../../components/StructuredData';
import {getDetails} from '../../../lib/detail-content';
import {newsPath, relatedReleases, releasePath} from '../../../lib/detail-paths';
import {languageHref, locales, readLanguage, tr} from '../../../lib/language';
import {newsBody, newsDate} from '../../../lib/news-copy';
import {normalizeReleaseTitle} from '../../../lib/release-artwork';
import {absoluteUrl, bandName, mentionKeywords, pageMetadata, type SearchProps} from '../../../lib/seo';

type Props = SearchProps & {params: Promise<{slug: string}>};

export async function generateMetadata({params, searchParams}: Props) {
  const [{slug}, {lang: requested}, {news}] = await Promise.all([params, searchParams, getDetails()]);
  const item = news.get(slug);
  if (!item) notFound();
  const lang = readLanguage(requested);
  const title = normalizeReleaseTitle(item.title);
  const body = newsBody(item, lang);
  const plain = body.replace(/https?:\/\/\S+|[*#]/g, '').replace(/\s+/g, ' ').trim();
  const description = plain.length > 155 ? plain.slice(0, 155).replace(/\s+\S*$/, '') + '…' : plain || title;
  return pageMetadata({
    path: newsPath(item), lang, title: title.includes(bandName) ? title : `${title} | ${bandName}`,
    description, image: item.imageUrl, type: 'article', keywords: [title, ...mentionKeywords(title + ' ' + body)],
  });
}

export default async function NewsPage({params, searchParams}: Props) {
  const [{slug}, {lang: requested}, {news, releases}] = await Promise.all([params, searchParams, getDetails()]);
  const item = news.get(slug);
  if (!item) notFound();

  const lang = readLanguage(requested);
  const path = newsPath(item);
  const date = newsDate(item);
  const validDate = date && !Number.isNaN(Date.parse(date)) ? date : undefined;
  const title = normalizeReleaseTitle(item.title);
  return <main className="site-content manifesto detail-page" lang={lang}>
    <StructuredData data={{
      '@type': 'Article', headline: title, inLanguage: lang, datePublished: validDate,
      image: item.imageUrl ? absoluteUrl(item.imageUrl) : undefined,
      mainEntityOfPage: absoluteUrl(languageHref(path, lang)),
      publisher: {'@type': 'Organization', name: bandName, url: absoluteUrl('/')},
    }}/>
    <DetailHeader lang={lang} path={path} back="/#news" label="NEWS" title={title}/>
    <article className="manifesto-prose">
      {validDate && <time className="news-date" dateTime={validDate}>{new Intl.DateTimeFormat(locales[lang], {dateStyle: 'long', timeZone: 'UTC'}).format(new Date(validDate))}</time>}
      {item.imageUrl && <img className="news-image" src={item.imageUrl} alt={item.imageAlt?.[lang] || item.imageAlt?.en || title}
        width={item.imageWidth} height={item.imageHeight} style={item.imageClipPath ? {clipPath: item.imageClipPath} : undefined}/>}
      <NewsBody item={item} lang={lang}/>
      {(relatedReleases[slug] ?? []).map(key => {
        const release = releases.get(key);
        return release && <p key={key}><a className="textlink" href={languageHref(releasePath(release), lang)}>{normalizeReleaseTitle(release.title)} →</a></p>;
      })}
      <p><a className="textlink" href={languageHref('/archive/history', lang)}>{tr(lang, 'Band history', 'Bandgeschichte', 'Histoire du groupe', 'Historia de la banda')} →</a></p>
    </article>
  </main>;
}
