import type {NewsItem, Release} from './content';

export function contentSlug(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function newsSlug(item: NewsItem) {
  const id = item._id.replace(/-\d{4}-\d{2}-\d{2}$/, '');
  return contentSlug(id === item._id ? item.title : id) || contentSlug(item._id);
}

export function releaseSlug(release: Release) {
  const slug = contentSlug(release.slug || release.title) || contentSlug(release._id);
  if (/^no-bottom-no-top[pz]?$/.test(slug)) return 'no-bottom-no-top';
  if (slug === 'the-flood-without-bottom-no-top-single') return 'the-flood';
  return slug;
}

export const newsPath = (item: NewsItem) => '/news/' + newsSlug(item);
export const releasePath = (release: Release) => '/releases/' + releaseSlug(release);

export const relatedReleases: Record<string, readonly string[]> = {
  'sexploitation-cinema': ['sexploitation-cinema', 'sexploitation-cinema-limited-edition'],
  goddess: ['goddess'],
  schlager: ['schlager'],
  tumulte: ['tumulte', 'en-ordre', 'no-bottom-no-top'],
  'en-ordre': ['en-ordre'],
  'the-flood': ['the-flood'],
  'emmo-biz-records': ['no-bottom-no-top'],
  'sub-culture-records': ['annorlunda', 'les-enfants-sauvages'],
};
