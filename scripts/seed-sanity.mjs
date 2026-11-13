import {getCliClient} from 'sanity/cli';

const client = getCliClient({apiVersion: '2025-02-19'});
const localized = (de, en) => ({_type: 'localizedText', de, en});
const link = (label, url, kind = 'other') => ({
  _type: 'externalLink',
  _key: `${label}-${url}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  label,
  url,
  kind,
  enabled: true,
});

const labelSeeds = [
  {name: 'EMMO.BIZ', website: 'https://www.emmobizrecords.de'},
  {name: 'SUB CULTURE RECORDS'},
];

const releaseSeeds = [
  {
    title: 'NO BOTTOM - NO TOP', slug: 'no-bottom-no-top', category: 'current', releaseStatus: 'announced',
    originalReleaseDate: '2027-01-15', label: 'EMMO.BIZ', featured: true, sortOrder: 1,
    editions: [
      {_type: 'edition', _key: 'vinyl-black', format: 'Vinyl', color: 'Black', quantity: 100},
      {_type: 'edition', _key: 'vinyl-red', format: 'Vinyl', color: 'Red', quantity: 50},
    ],
    links: [link('EMMO.BIZ', 'https://www.emmobizrecords.de', 'shop')],
  },
  {
    title: 'THE FLOOD (without bottom no top) - Single', slug: 'the-flood-without-bottom-no-top-single',
    category: 'current', releaseStatus: 'available', featured: false, sortOrder: 2,
    links: [
      link('Apple Music', 'https://music.apple.com/de/album/the-flood-without-bottom-no-top-single/6817367441', 'stream'),
      link('Listen / DistroKid', 'https://distrokid.com/hyperfollow/sabotageqcqc/the-flood-without-bottom-no-top', 'stream'),
    ],
  },
  ...[
    ['ANNORLUNDA', 'annorlunda'],
    ['LES ENFANTS SAUVAGES', 'les-enfants-sauvages'],
    ['TUMULTE', 'tumulte'],
    ['DEUTSCHER HERBST ’77', 'deutscher-herbst-77'],
  ].map(([title, slug], index) => ({
    title, slug, category: 'backCatalogue', releaseStatus: 'pending', label: 'SUB CULTURE RECORDS',
    featured: false, sortOrder: index + 1,
  })),
];

const socialLinks = [
  link('Instagram', 'https://www.instagram.com/sabotageqcqc/', 'social'),
  link('YouTube', 'https://www.youtube.com/@SABOTAGEQCQC', 'video'),
  link('SoundCloud', 'https://soundcloud.com/marc-w-904754736', 'social'),
  link('Apple Music — THE FLOOD', 'https://music.apple.com/de/album/the-flood-without-bottom-no-top-single/6817367441', 'stream'),
  link('THE FLOOD — All platforms', 'https://distrokid.com/hyperfollow/sabotageqcqc/the-flood-without-bottom-no-top', 'stream'),
  link('EMMO.BIZ', 'https://www.emmobizrecords.de', 'shop'),
  link('SABOTAGE WEAR — Coming soon', 'https://sabotage-wear.myspreadshop.de', 'shop'),
];

const modules = [
  {
    _key: 'hero', _type: 'module_hero', enabled: true,
    heading: localized('NO BOTTOM - NO TOP', 'NO BOTTOM - NO TOP'),
    intro: localized('NEUE VINYL-EP · 15. JAN 2027 · EMMO.BIZ', 'NEW VINYL EP · 15 JAN 2027 · EMMO.BIZ'),
  },
  {
    _key: 'feature', _type: 'module_releaseFeature', enabled: true,
    heading: localized('AKTUELLER RELEASE', 'LATEST RELEASE'),
  },
  {
    _key: 'current-releases', _type: 'module_releaseGrid', enabled: true, releaseCategory: 'current',
    releaseLimit: 12, excludeFeatured: true,
    heading: localized('AKTUELLE RELEASES', 'CURRENT RELEASES'),
    intro: localized('Neue Singles und Releases', 'New singles and releases'),
  },
  {
    _key: 'catalogue', _type: 'module_releaseGrid', enabled: true, releaseCategory: 'backCatalogue', releaseLimit: 12,
    heading: localized('BACK CATALOGUE', 'BACK CATALOGUE'),
    intro: localized(
      'Originalveröffentlichungen und geplante digitale Wiederveröffentlichungen. Termine und Links nur nach Bestätigung.',
      'Original releases and planned digital re-releases. Dates and links only when confirmed.',
    ),
  },
  {
    _key: 'archive', _type: 'module_archiveGrid', enabled: true, archiveRefs: [],
    heading: localized('DAS ARCHIV', 'THE ARCHIVE'),
    intro: localized('Original-Artworks, Flyer, Fotografien und Presseberichte. Weitere Materialien folgen.', 'Original artwork, flyers, photography and press material. More materials will follow.'),
  },
  {
    _key: 'statement', _type: 'module_statement', enabled: true,
    heading: localized('MUSIK ZUERST.', 'MUSIC FIRST.'),
    intro: localized(
      'SABOTAGE QCQC? — Electronic Body Music, Electro-Punk und Industrial. Neue Werke und historische Aufnahmen, gleichberechtigt nebeneinander.',
      'SABOTAGE QCQC? — electronic body music, electro-punk and industrial. New works and historical recordings, presented side by side.',
    ),
  },
  {
    _key: 'labels', _type: 'module_linkGrid', enabled: true,
    heading: localized('LABELS', 'LABELS'), intro: localized('Veröffentlichungspartner', 'Release partners'),
    links: [link('EMMO.BIZ', 'https://www.emmobizrecords.de', 'shop')],
  },
  {
    _key: 'wear', _type: 'module_linkGrid', enabled: true,
    heading: localized('SABOTAGE WEAR / BALD VERFÜGBAR', 'SABOTAGE WEAR / COMING SOON'),
    links: [link('SABOTAGE WEAR', 'https://sabotage-wear.myspreadshop.de', 'shop')],
  },
  {
    _key: 'links', _type: 'module_linkGrid', enabled: true,
    heading: localized('HÖREN & FOLGEN', 'LISTEN & FOLLOW'), links: socialLinks,
  },
];

for (const seed of labelSeeds) {
  const existing = await client.fetch('*[_type == "recordLabel" && name == $name][0]._id', {name: seed.name});
  if (existing) continue;
  await client.create({_type: 'recordLabel', ...seed});
  console.log(`Label angelegt: ${seed.name}`);
}

for (const seed of releaseSeeds) {
  const existing = await client.fetch('*[_type == "release" && slug.current == $slug][0]._id', {slug: seed.slug});
  if (existing) continue;
  const labelId = seed.label
    ? await client.fetch('*[_type == "recordLabel" && name == $name][0]._id', {name: seed.label})
    : null;
  const {_id, ...fields} = seed;
  await client.create({
    _type: 'release',
    title: seed.title,
    slug: {_type: 'slug', current: seed.slug},
    artist: 'SABOTAGE QCQC?',
    category: seed.category,
    releaseStatus: seed.releaseStatus,
    originalReleaseDate: seed.originalReleaseDate,
    label: seed.label,
    labelRef: labelId ? {_type: 'reference', _ref: labelId} : undefined,
    editions: seed.editions,
    links: seed.links,
    featured: seed.featured,
    sortOrder: seed.sortOrder,
    publishedOnSite: true,
  });
  console.log(`Release angelegt: ${seed.title}`);
}

const home = await client.fetch('*[_type == "page" && slug.current == "home"][0]._id');
if (!home) {
  await client.create({_id: 'home', _type: 'page', title: 'Home', slug: {_type: 'slug', current: 'home'}, modules});
  console.log('Homepage angelegt.');
} else {
  const currentModules = await client.fetch('*[_id == "home"][0].modules');
  const needsUpdate = !currentModules?.some((module) => module._key === 'current-releases')
    || currentModules?.some((module) => module._key === 'current-releases'
      && (module.heading?.en === 'THE FLOOD / SINGLE' || module.intro?.en === 'Listen to the single'));
  if (needsUpdate) {
    const dynamicModule = modules.find((module) => module._key === 'current-releases');
    const hasGrid = currentModules.some((module) => module._key === 'current-releases');
    const nextModules = hasGrid
      ? currentModules.map((module) => module._key === 'current-releases' ? dynamicModule : module)
      : [...currentModules, dynamicModule];
    await client.patch('home').set({modules: nextModules}).commit();
    console.log('Homepage auf automatische aktuelle Releases umgestellt.');
  }
}

await client.createIfNotExists({
  _id: 'siteSettings', _type: 'siteSettings', siteTitle: 'SABOTAGE QCQC?',
  contactEmail: 'contact@sabocon.com',
  artistStatement: localized(
    'SABOTAGE QCQC? — Electronic Body Music, Electro-Punk und Industrial. Neue Werke und historische Aufnahmen, gleichberechtigt nebeneinander.',
    'SABOTAGE QCQC? — electronic body music, electro-punk and industrial. New works and historical recordings, presented side by side.',
  ),
  socialLinks,
});

console.log('Seed abgeschlossen. Vorhandene Releases, Labels und Website-Einstellungen wurden beibehalten.');
