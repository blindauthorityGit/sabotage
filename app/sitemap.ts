import type {MetadataRoute} from 'next';
import {getDetails} from '../lib/detail-content';
import {languageHref, languages} from '../lib/language';
import {absoluteUrl} from '../lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {news, releases} = await getDetails();
  const paths = ['/', '/manifesto', '/archive/history', '/impressum',
    ...Array.from(news.keys(), slug => '/news/' + slug),
    ...Array.from(releases.keys(), slug => '/releases/' + slug),
  ];
  return paths.flatMap(path => {
    const urls = Object.fromEntries(languages.map(lang => [lang, absoluteUrl(languageHref(path, lang))]));
    return languages.map(lang => ({url: urls[lang], alternates: {languages: {...urls, 'x-default': urls.en}}}));
  });
}
