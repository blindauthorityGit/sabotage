import {readLanguage} from '../lib/language';
import Site from '../components/Site';
import {getHome, getReleases, getSettings, type Link, type Module, type Page} from '../lib/content';
import {additionalCatalogueReleases, currentReleasesModule, enOrdreRelease, fallbackPage, sampleReleases} from '../lib/fallback';
import {coldFragmentsNews, emmoBizNews, enOrdreNews, memeNews, monCoeurNews, orageRemixNews, secretTracksNews, subCultureNews, theFloodNews} from '../lib/news';
import {releaseArtworkKey, withCoverFallback} from '../lib/release-artwork';

export const dynamic = 'force-dynamic';

const catalogueStreaming: Readonly<Record<string, Link[]>> = {
  annorlunda: [
    {label: 'Apple Music', url: 'https://music.apple.com/de/album/annorlunda-ep/6831185707', kind: 'stream', enabled: true},
    {label: 'Spotify', url: 'https://open.spotify.com/album/5IWeIOmlCJQD7mDGPMHvSB', kind: 'stream', enabled: true},
    {label: 'Amazon Music', url: 'https://amazon.de/music/player/albums/B0HQDDXM2W', kind: 'stream', enabled: true},
  ],
  'les-enfants-sauvages': [
    {label: 'Apple Music', url: 'https://music.apple.com/de/album/les-enfants-sauvages/6830698564', kind: 'stream', enabled: true},
    {label: 'Spotify', url: 'https://open.spotify.com/album/5N52aUWQb8i0KXJAgJ1JE7', kind: 'stream', enabled: true},
    {label: 'Amazon Music', url: 'https://amazon.de/music/player/albums/B0HQDDXM2W', kind: 'stream', enabled: true},
  ],
};

function connectReleases(page: Page, releases: Awaited<ReturnType<typeof getReleases>>, useFallback: boolean): Page {
  const hasCurrentGrid = page.modules.some(module => module._type === 'module_releaseGrid' &&
    (module._key === 'current-releases' || module.releaseCategory === 'current'));
  const forthcomingModule: Module = {
    _key: 'forthcoming-releases',
    _type: 'module_releaseGrid',
    heading: {en: 'FORTHCOMING RELEASES'},
    enabled: true,
  };
  const sourceModules = (hasCurrentGrid ? page.modules : [...page.modules, currentReleasesModule])
    .filter(module => module._key !== 'single' && module._key !== 'forthcoming-releases');
  const fallbackFlood = sampleReleases[1];
  const isFlood = (release: typeof fallbackFlood) => release.slug === 'the-flood' ||
    /^the flood(?:$|\s*[(–—-])/i.test(release.title.trim());
  const cmsFlood = releases.find(isFlood);
  const flood = cmsFlood ? {
    ...withCoverFallback(cmsFlood),
    coverUrl: cmsFlood.coverUrl || fallbackFlood.coverUrl,
    links: [
      ...(fallbackFlood.links ?? []),
      ...(cmsFlood.links ?? []).filter(link => {
        const label = link.label.trim().toLowerCase();
        return label !== 'spotify' && !fallbackFlood.links?.some(platform =>
          platform.label.toLowerCase() === label || platform.url === link.url,
        );
      }),
    ],
  } : fallbackFlood;
  const connectedModules = sourceModules.map((module): Module => {
      if (module._type === 'module_releaseFeature') {
        if (module.releaseRef?.publishedOnSite) {
          return {...module, releaseRefs: [withCoverFallback(module.releaseRef)]};
        }

        const featured = releases.find((release) => release.featured) ?? releases.find((release) => release.category === 'current');
        return featured ? {...module, releaseRefs: [withCoverFallback(featured)]} : module;
      }

      if (module._type === 'module_releaseGrid') {
        const source = releases.length > 0 ? releases : useFallback ? module.releaseRefs ?? [] : [];
        const categoryFiltered = module.releaseCategory && module.releaseCategory !== 'all'
          ? source.filter((release) => release.category === module.releaseCategory)
          : source;
        const filtered = module.excludeFeatured ? categoryFiltered.filter((release) => !release.featured) : categoryFiltered;
        if (module._key === 'catalogue' || module.releaseCategory === 'backCatalogue') {
          const addedKeys = new Set(additionalCatalogueReleases.map(releaseArtworkKey));
          const existing = filtered.filter(release => !addedKeys.has(releaseArtworkKey(release)));
          const additions = additionalCatalogueReleases.map(entry =>
            filtered.find(release => releaseArtworkKey(release) === entry.slug) ?? entry,
          );
          const limit = module.releaseLimit ? Math.max(0, module.releaseLimit - additions.length) : undefined;

          const releaseRefs = [...existing.slice(0, limit), ...additions].map(release => {
            const streaming = catalogueStreaming[releaseArtworkKey(release)];
            return {
              ...withCoverFallback(release),
              label: 'SUB CULTURE RECORDS',
              labelUrl: 'https://www.facebook.com/norwegiansubculture',
              ...(streaming && {
                releaseStatus: 'available',
                links: [...streaming, ...(release.links ?? []).filter(link =>
                  !streaming.some(platform => platform.label.toLowerCase() === link.label.trim().toLowerCase() ||
                    platform.url === link.url),
                )],
              }),
            };
          });
          return {...module, releaseRefs};
        }
        const isCurrentGrid = module._key === 'current-releases' || module.releaseCategory === 'current';
        const current = isCurrentGrid ? [
          enOrdreRelease, flood,
          ...filtered.filter(release => !isFlood(release) && release.slug !== 'en-ordre-rework-ep' &&
            release.slug !== enOrdreRelease.slug && release.title.trim().toUpperCase() !== enOrdreRelease.title),
        ] : filtered;
        return {...module, releaseRefs: current.slice(0, isCurrentGrid && module.releaseLimit ? Math.max(2, module.releaseLimit) : module.releaseLimit || undefined).map(withCoverFallback)};
      }

      return module;
    });
  if (!connectedModules.some((module) => module._type === 'module_newsGrid')) {
    const fallbackNews = fallbackPage.modules.find((module) => module._type === 'module_newsGrid');
    if (fallbackNews) connectedModules.push(fallbackNews);
  }
  const modules = [...connectedModules, forthcomingModule].map(module => {
    if (module._type === 'module_linkGrid' && module._key === 'labels') {
      const partner = fallbackPage.modules.find(entry => entry._key === 'labels')
        ?.links?.find(link => link.label === 'Sub Culture Records');
      if (!partner) return module;

      const links = module.links ?? [];
      const existing = links.findIndex(link => link.label.toLowerCase().replace(/\s/g, '') === 'subculturerecords');
      return {
        ...module,
        links: existing === -1
          ? [...links, partner]
          : links.map((link, index) => index === existing ? {...link, ...partner} : link),
      };
    }
    if (module._type === 'module_linkGrid' && module._key === 'links') {
      const linkList = fallbackPage.modules.find(entry => entry._key === 'links');
      return {...module, heading: linkList?.heading ?? module.heading, links: linkList?.links ?? module.links};
    }
    if (module._type !== 'module_newsGrid') return module;

    const news = module.newsRefs ?? [];
    const localNews = [enOrdreNews, orageRemixNews, subCultureNews, emmoBizNews, theFloodNews, memeNews, monCoeurNews, coldFragmentsNews, secretTracksNews].filter(entry => !news.some(item =>
      item._id === entry._id || (item.date === entry.date &&
        item.title.trim().replace(/:$/, '').toUpperCase() === entry.title.replace(/:$/, ''))
    ));
    return {...module, newsRefs: [...news, ...localNews]};
  });
  return {...page, modules};
}

export default async function Home({searchParams}: {searchParams: Promise<{lang?: string}>}) {
  const [cmsPage, settings, releases] = await Promise.all([getHome(), getSettings(), getReleases()]);
  const basePage = cmsPage?.modules?.length ? cmsPage : fallbackPage;
  const useFallback = basePage === fallbackPage;
  const page = connectReleases(basePage, releases, useFallback);

  const lang = readLanguage((await searchParams).lang);
  return <Site lang={lang} page={page} contactEmail={settings?.contactEmail || 'contact@sabocon.com'} />;
}
