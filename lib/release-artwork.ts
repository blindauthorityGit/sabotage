import type {Release} from './content';

const covers: Readonly<Record<string, string>> = {
  'no-bottom-no-top': 'no-bottom-no-top.png',
  'the-flood-without-bottom-no-top-single': 'the-flood.png',
  'annorlunda': 'annorlunda.png',
  'les-enfants-sauvages': 'les-enfants-sauvages.png',
  'tumulte': 'tumulte.png',
  'deutscher-herbst-77': 'deutscher-herbst-77.png',
};

export function releaseArtworkKey(release: Release) {
  if (release.slug && Object.hasOwn(covers, release.slug)) return release.slug;

  const titleKey = release.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
  return /^no-bottom-no-top[pz]$/.test(titleKey) ? 'no-bottom-no-top' : titleKey;
}

export function withCoverFallback(release: Release): Release {
  if (release.coverUrl) return release;

  const key = releaseArtworkKey(release);
  return Object.hasOwn(covers, key) ? {...release, coverUrl: `/assets/${covers[key]}`} : release;
}

export function normalizeReleaseTitle(text: string): string {
  return text.replace(/\bNO BOTTOM\s*[-–—]\s*NO TOP[PZ]?\b/gi, 'NO BOTTOM - NO TOP');
}
