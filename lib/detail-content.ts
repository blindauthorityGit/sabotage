import {cache} from 'react';
import type {NewsItem, Release} from './content';
import {newsSlug, releaseSlug} from './detail-paths';
import {getSiteContent} from './site-content';
import {withCoverFallback} from './release-artwork';
import covers from '../app/manifesto/covers.json';

function indexBySlug<T>(entries: T[], slug: (entry: T) => string) {
  const index = new Map<string, T>();
  for (const entry of entries) {
    const key = slug(entry);
    if (!index.has(key)) index.set(key, entry);
  }
  return index;
}

export const getDetails = cache(async () => {
  const {page, releases} = await getSiteContent();
  const modules = page.modules.filter(module => module.enabled !== false);
  const archiveReleases: Release[] = covers.map(cover => ({
    _id: cover.src,
    title: cover.title,
    coverUrl: cover.src,
  }));
  return {
    news: indexBySlug<NewsItem>(modules.flatMap(module => module.newsRefs ?? []), newsSlug),
    releases: indexBySlug([
      ...modules.flatMap(module => module.releaseRefs ?? []),
      ...releases.map(withCoverFallback),
      ...archiveReleases,
    ], releaseSlug),
  };
});
