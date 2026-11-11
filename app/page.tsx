import Site from '../components/Site';
import {getHome, getReleases, getSettings, type Module, type Page} from '../lib/content';
import {fallbackPage} from '../lib/fallback';

export const dynamic = 'force-dynamic';

function connectReleases(page: Page, releases: Awaited<ReturnType<typeof getReleases>>, useFallback: boolean): Page {
  return {
    ...page,
    modules: page.modules.map((module): Module => {
      if (module._type === 'module_releaseFeature') {
        if (module.releaseRef?.publishedOnSite) {
          return {...module, releaseRefs: [module.releaseRef]};
        }

        const featured = releases.find((release) => release.featured) ?? releases.find((release) => release.category === 'current');
        return featured ? {...module, releaseRefs: [featured]} : module;
      }

      if (module._type === 'module_releaseGrid') {
        const source = releases.length > 0 ? releases : useFallback ? module.releaseRefs ?? [] : [];
        const categoryFiltered = module.releaseCategory && module.releaseCategory !== 'all'
          ? source.filter((release) => release.category === module.releaseCategory)
          : source;
        const filtered = module.excludeFeatured ? categoryFiltered.filter((release) => !release.featured) : categoryFiltered;
        return {...module, releaseRefs: filtered.slice(0, module.releaseLimit || undefined)};
      }

      return module;
    }),
  };
}

export default async function Home() {
  const [cmsPage, settings, releases] = await Promise.all([getHome(), getSettings(), getReleases()]);
  const basePage = cmsPage?.modules?.length ? cmsPage : fallbackPage;
  const useFallback = basePage === fallbackPage;
  const page = connectReleases(basePage, releases, useFallback);

  return <Site page={page} contactEmail={settings?.contactEmail || 'contact@sabocon.com'} />;
}
