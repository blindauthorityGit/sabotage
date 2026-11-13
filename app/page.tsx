import {readLanguage} from '../lib/language';
import Site from '../components/Site';
import {getHome, getReleases, getSettings, type Module, type Page} from '../lib/content';
import {fallbackPage} from '../lib/fallback';
import {coldFragmentsNews, emmoBizNews, memeNews, monCoeurNews, orageRemixNews, secretTracksNews, subCultureNews} from '../lib/news';
import {withCoverFallback} from '../lib/release-artwork';

export const dynamic = 'force-dynamic';

function connectReleases(page: Page, releases: Awaited<ReturnType<typeof getReleases>>, useFallback: boolean): Page {
  const connectedModules = page.modules.map((module): Module => {
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
        return {...module, releaseRefs: filtered.slice(0, module.releaseLimit || undefined).map(withCoverFallback)};
      }

      return module;
    });
  if (!connectedModules.some((module) => module._type === 'module_newsGrid')) {
    const fallbackNews = fallbackPage.modules.find((module) => module._type === 'module_newsGrid');
    if (fallbackNews) connectedModules.push(fallbackNews);
  }
  const modules = connectedModules.map(module => {
    if (module._type !== 'module_newsGrid') return module;

    const news = module.newsRefs ?? [];
    const localNews = [orageRemixNews, subCultureNews, emmoBizNews, memeNews, monCoeurNews, coldFragmentsNews, secretTracksNews].filter(entry => !news.some(item =>
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
