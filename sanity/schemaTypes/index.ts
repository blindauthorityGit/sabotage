import {defineArrayMember, defineField, defineType} from 'sanity';
import {CogIcon, DocumentIcon, DocumentTextIcon, ImageIcon, LinkIcon, TagIcon} from '@sanity/icons';

const localizedText = defineType({
  name: 'localizedText',
  title: 'Mehrsprachiger Text',
  type: 'object',
  fields: [
    defineField({name: 'de', title: 'Deutsch', type: 'text', rows: 3}),
    defineField({name: 'en', title: 'English', type: 'text', rows: 3}),
    defineField({name: 'fr', title: 'Français', type: 'text', rows: 3}),
    defineField({name: 'es', title: 'Español', type: 'text', rows: 3}),
  ],
});

const externalLink = defineType({
  name: 'externalLink',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', title: 'Linktext', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['https', 'mailto']}),
    }),
    defineField({
      name: 'kind',
      title: 'Linktyp',
      type: 'string',
      options: {list: [
        {title: 'Streaming', value: 'stream'},
        {title: 'Video', value: 'video'},
        {title: 'Social Media', value: 'social'},
        {title: 'Shop / Label', value: 'shop'},
        {title: 'Presse', value: 'press'},
        {title: 'Sonstiges', value: 'other'},
      ]},
    }),
    defineField({name: 'enabled', title: 'Anzeigen', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'label', subtitle: 'url'}},
});

const edition = defineType({
  name: 'edition',
  title: 'Edition',
  type: 'object',
  fields: [
    defineField({
      name: 'format', title: 'Format', type: 'string',
      options: {list: [
        {title: 'Vinyl', value: 'Vinyl'},
        {title: 'CD', value: 'CD'},
        {title: 'MCD', value: 'MCD'},
        {title: 'CD Single', value: 'CDS'},
        {title: 'Digital', value: 'Digital'},
        {title: 'Sonstiges', value: 'Other'},
      ]},
    }),
    defineField({name: 'color', title: 'Farbe / Variante', type: 'string'}),
    defineField({name: 'quantity', title: 'Auflage', type: 'number', validation: (rule) => rule.min(0)}),
    defineField({name: 'date', title: 'Erscheinungsdatum dieser Edition', type: 'date'}),
    defineField({
      name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'externalLink'})],
    }),
  ],
  preview: {select: {title: 'format', subtitle: 'color'}},
});

const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'object',
  fields: [
    defineField({name: 'number', title: 'Tracknummer', type: 'number'}),
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'duration', title: 'Länge (z. B. 4:32)', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'duration'}},
});

const recordLabel = defineType({
  name: 'recordLabel',
  title: 'Label',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'name', title: 'Labelname', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'website', title: 'Offizielle Website', type: 'url',
      description: 'Nur eine bestätigte offizielle Website eintragen.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({name: 'description', title: 'Beschreibung', type: 'localizedText'}),
  ],
  preview: {select: {title: 'name', subtitle: 'website'}},
});

const release = defineType({
  name: 'release',
  title: 'Releases',
  type: 'document',
  icon: TagIcon,
  groups: [
    {name: 'overview', title: 'Übersicht', default: true},
    {name: 'dates', title: 'Veröffentlichung'},
    {name: 'artwork', title: 'Cover & Beschreibung'},
    {name: 'music', title: 'Tracklist & Editionen'},
    {name: 'links', title: 'Links'},
    {name: 'website', title: 'Website'},
  ],
  fields: [
    defineField({name: 'title', title: 'Release-Titel', type: 'string', group: 'overview', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug', title: 'URL-Slug', type: 'slug', group: 'overview',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'artist', title: 'Artist', type: 'string', group: 'overview', initialValue: 'SABOTAGE QCQC?'}),
    defineField({
      name: 'category', title: 'Bereich', type: 'string', group: 'overview', initialValue: 'current',
      options: {layout: 'radio', list: [
        {title: 'Aktueller Release', value: 'current'},
        {title: 'Back Catalogue', value: 'backCatalogue'},
        {title: 'Remix', value: 'remix'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseStatus', title: 'Status', type: 'string', group: 'overview', initialValue: 'announced',
      options: {layout: 'radio', list: [
        {title: 'Angekündigt', value: 'announced'},
        {title: 'Vorbestellung', value: 'preorder'},
        {title: 'Erhältlich', value: 'available'},
        {title: 'Noch zu bestätigen', value: 'pending'},
        {title: 'Rechteprüfung', value: 'rightsReview'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'originalReleaseDate', title: 'Erstveröffentlichung', type: 'date', group: 'dates',
      description: 'Datum der ursprünglichen Veröffentlichung.',
    }),
    defineField({
      name: 'digitalReReleaseDate', title: 'Digitale Wiederveröffentlichung', type: 'date', group: 'dates',
      description: 'Nur ausfüllen, wenn das Datum bestätigt ist.',
    }),
    defineField({
      name: 'labelRef', title: 'Label', type: 'reference', group: 'overview', to: [{type: 'recordLabel'}],
      description: 'Wiederverwendbares Label auswählen. Offizielle Website am Label pflegen.',
    }),
    defineField({
      name: 'label', title: 'Labelname (falls nicht in der Liste)', type: 'string', group: 'overview',
      description: 'Nur verwenden, wenn kein Label-Dokument existiert.',
    }),
    defineField({
      name: 'cover', title: 'Cover', type: 'image', group: 'artwork', options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternativtext', type: 'string'})],
    }),
    defineField({name: 'description', title: 'Beschreibung', type: 'localizedText', group: 'artwork'}),
    defineField({
      name: 'tracklist', title: 'Tracklist', type: 'array', group: 'music',
      of: [defineArrayMember({type: 'track'})],
    }),
    defineField({
      name: 'editions', title: 'Formate & Editionen', type: 'array', group: 'music',
      of: [defineArrayMember({type: 'edition'})],
    }),
    defineField({
      name: 'links', title: 'Streaming-, Shop- und weitere Links', type: 'array', group: 'links',
      of: [defineArrayMember({type: 'externalLink'})],
    }),
    defineField({
      name: 'publishedOnSite', title: 'Auf Website anzeigen', type: 'boolean', group: 'website',
      initialValue: false,
      description: 'Aktivieren, damit der Release automatisch in seiner Kategorie auf der Website erscheint.',
    }),
    defineField({
      name: 'featured', title: 'Als aktuellen Highlight-Release verwenden', type: 'boolean', group: 'website',
      initialValue: false,
      description: 'Der erste veröffentlichte Highlight-Release wird im Release-Feature angezeigt.',
    }),
    defineField({
      name: 'sortOrder', title: 'Sortierung (kleinere Zahl zuerst)', type: 'number', group: 'website',
      description: 'Optional. Ohne Zahl sortiert die Website nach Veröffentlichungsdatum.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'releaseStatus', media: 'cover'},
    prepare: ({title, subtitle, media}) => ({title: title || 'Neuer Release', subtitle, media}),
  },
});

const archiveItem = defineType({
  name: 'archiveItem', title: 'Archiv', type: 'document', icon: ImageIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'category', title: 'Kategorie', type: 'string',
      options: {list: [
        {title: 'Foto', value: 'photo'}, {title: 'Flyer', value: 'flyer'},
        {title: 'Presse', value: 'press'}, {title: 'Dokument', value: 'document'},
        {title: 'Video', value: 'video'}, {title: 'Sonstiges', value: 'other'},
        {title: 'RANDOM', value: 'random'},
      ]},
    }),
    defineField({name: 'date', title: 'Datum', type: 'date'}),
    defineField({name: 'image', title: 'Bild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'file', title: 'Datei', type: 'file'}),
    defineField({name: 'description', title: 'Beschreibung', type: 'localizedText'}),
    defineField({name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'externalLink'})]}),
    defineField({name: 'publishedOnSite', title: 'Auf Website anzeigen', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
});

const newsItem = defineType({
  name: 'newsItem', title: 'News', type: 'document', icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'date', title: 'Datum', type: 'date'}),
    defineField({name: 'image', title: 'Bild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'body', title: 'Text', type: 'localizedText'}),
    defineField({name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'externalLink'})]}),
    defineField({name: 'publishedOnSite', title: 'Auf Website anzeigen', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
});

const mediaItem = defineType({
  name: 'mediaItem', title: 'Audio & Video', type: 'document', icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'platform', title: 'Plattform', type: 'string',
      options: {list: [
        {title: 'YouTube', value: 'YouTube'}, {title: 'SoundCloud', value: 'SoundCloud'},
        {title: 'Sonstiges', value: 'Other'},
      ]},
    }),
    defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.uri({scheme: ['https']})}),
    defineField({name: 'image', title: 'Vorschaubild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'publishedOnSite', title: 'Auf Website anzeigen', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'title', subtitle: 'platform', media: 'image'}},
});

const headingFields = [
  defineField({name: 'heading', title: 'Überschrift Deutsch / Englisch', type: 'localizedText'}),
  defineField({name: 'intro', title: 'Einleitung Deutsch / Englisch', type: 'localizedText'}),
  defineField({name: 'enabled', title: 'Abschnitt anzeigen', type: 'boolean', initialValue: true}),
];

const heroModule = defineType({
  name: 'module_hero', title: 'Hero / Titelbereich', type: 'object',
  fields: [...headingFields, defineField({name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'externalLink'})]})],
});

const releaseFeatureModule = defineType({
  name: 'module_releaseFeature', title: 'Release-Highlight', type: 'object',
  fields: [
    ...headingFields,
    defineField({
      name: 'releaseRef', title: 'Fester Release (optional)', type: 'reference', to: [{type: 'release'}],
      description: 'Leer lassen, um automatisch den als Highlight markierten Release zu verwenden.',
    }),
  ],
});

const releaseGridModule = defineType({
  name: 'module_releaseGrid', title: 'Release-Liste', type: 'object',
  fields: [
    ...headingFields,
    defineField({
      name: 'releaseCategory', title: 'Welche Releases zeigen?', type: 'string', initialValue: 'backCatalogue',
      options: {list: [
        {title: 'Aktuelle Releases', value: 'current'},
        {title: 'Back Catalogue', value: 'backCatalogue'},
        {title: 'Remixes', value: 'remix'},
        {title: 'Alle Kategorien', value: 'all'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'releaseLimit', title: 'Maximale Anzahl', type: 'number', initialValue: 12, validation: (rule) => rule.min(1).max(100)}),
    defineField({
      name: 'excludeFeatured', title: 'Highlight im Grid auslassen', type: 'boolean', initialValue: true,
      description: 'Verhindert, dass ein hervorgehobener Release zusätzlich in dieser Liste erscheint.',
    }),
  ],
});

const archiveGridModule = defineType({
  name: 'module_archiveGrid', title: 'Archiv-Liste', type: 'object',
  fields: [
    ...headingFields,
    defineField({
      name: 'archiveRefs', title: 'Archiv-Einträge', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'archiveItem'}]})],
    }),
  ],
});

const newsGridModule = defineType({
  name: 'module_newsGrid', title: 'News-Liste', type: 'object',
  fields: [
    ...headingFields,
    defineField({
      name: 'newsRefs', title: 'News-Einträge', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'newsItem'}]})],
    }),
  ],
});

const mediaGridModule = defineType({
  name: 'module_mediaGrid', title: 'Audio- & Video-Liste', type: 'object',
  fields: [
    ...headingFields,
    defineField({
      name: 'mediaRefs', title: 'Medien-Einträge', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'mediaItem'}]})],
    }),
  ],
});

const statementModule = defineType({name: 'module_statement', title: 'Statement', type: 'object', fields: headingFields});

const linkGridModule = defineType({
  name: 'module_linkGrid', title: 'Link-Liste', type: 'object',
  fields: [
    ...headingFields,
    defineField({name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'externalLink'})]}),
  ],
});

const modules = [heroModule, releaseFeatureModule, releaseGridModule, archiveGridModule, newsGridModule, mediaGridModule, statementModule, linkGridModule];

const page = defineType({
  name: 'page', title: 'Seiten', type: 'document', icon: DocumentIcon,
  fields: [
    defineField({name: 'title', title: 'Seitentitel', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modules', title: 'Homepage-Abschnitte (per Drag & Drop sortieren)', type: 'array',
      of: modules.map((module) => defineArrayMember({type: module.name})),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
});

const siteSettings = defineType({
  name: 'siteSettings', title: 'Website-Einstellungen', type: 'document', icon: CogIcon,
  fields: [
    defineField({name: 'siteTitle', title: 'Website-Titel', type: 'string'}),
    defineField({name: 'contactEmail', title: 'Kontakt-E-Mail', type: 'string', validation: (rule) => rule.email()}),
    defineField({name: 'socialLinks', title: 'Social Links', type: 'array', of: [defineArrayMember({type: 'externalLink'})]}),
    defineField({name: 'artistStatement', title: 'Artist Statement Deutsch / Englisch', type: 'localizedText'}),
    defineField({name: 'footerText', title: 'Footer Deutsch / Englisch', type: 'localizedText'}),
  ],
});

export const schemaTypes = [
  localizedText, externalLink, edition, track, recordLabel, release,
  archiveItem, newsItem, mediaItem, ...modules, page, siteSettings,
];
