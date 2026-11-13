import {createClient} from 'next-sanity';

export type Link = {label: string; url?: string; kind?: string; enabled?: boolean};
export type Localized = {de?: string; en?: string; fr?: string; es?: string};
export type Edition = {format?: string; color?: string; quantity?: number; date?: string; links?: Link[]};
export type Track = {number?: number; title: string; duration?: string};
export type Release = {
  _id: string;
  title: string;
  slug?: string;
  artist?: string;
  category?: string;
  label?: string;
  labelUrl?: string;
  releaseStatus?: string;
  originalReleaseDate?: string;
  digitalReReleaseDate?: string;
  coverUrl?: string;
  description?: Localized;
  tracklist?: Track[];
  editions?: Edition[];
  links?: Link[];
  publishedOnSite?: boolean;
  featured?: boolean;
  sortOrder?: number;
};
export type NewsItem = {
  _id: string;
  title: string;
  date?: string;
  body?: Localized;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: Localized;
  imageClipPath?: string;
  links?: Link[];
};
export type Module = {
  _key: string;
  _type: string;
  enabled?: boolean;
  heading?: Localized;
  intro?: Localized;
  imageUrl?: string;
  links?: Link[];
  releaseRef?: Release;
  releaseRefs?: Release[];
  releaseCategory?: string;
  releaseLimit?: number;
  excludeFeatured?: boolean;
  archiveRefs?: {_id: string; title: string; imageUrl?: string}[];
  newsRefs?: NewsItem[];
  mediaRefs?: {_id: string; title: string; url?: string}[];
};
export type Page = {title: string; modules: Module[]};
export type SiteSettings = {contactEmail?: string; socialLinks?: Link[]};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19',
      useCdn: false,
    })
  : null;

const releaseFields = `
  _id,
  title,
  "slug": slug.current,
  artist,
  category,
  "label": coalesce(labelRef->name, label),
  "labelUrl": labelRef->website,
  releaseStatus,
  originalReleaseDate,
  digitalReReleaseDate,
  description,
  tracklist[]{_key, number, title, duration},
  editions[]{_key, format, color, quantity, date, links[]{_key, label, url, kind, enabled}},
  links[]{_key, label, url, kind, enabled},
  "coverUrl": cover.asset->url,
  publishedOnSite,
  featured,
  sortOrder
`;

export async function getHome(): Promise<Page | null> {
  if (!client) return null;
  try {
    return await client.fetch(`
      *[_type == "page" && slug.current == "home"][0]{
        title,
        modules[]{
          ...,
          "imageUrl": image.asset->url,
          "releaseRef": releaseRef->{${releaseFields}},
          "archiveRefs": archiveRefs[]->{_id, title, "imageUrl": image.asset->url},
          "newsRefs": newsRefs[]->{
            _id, title, date, body,
            "imageUrl": image.asset->url,
            "imageWidth": image.asset->metadata.dimensions.width,
            "imageHeight": image.asset->metadata.dimensions.height
          },
          "mediaRefs": mediaRefs[]->{_id, title, url}
        }
      }
    `);
  } catch (error) {
    console.error('Sanity: Homepage konnte nicht geladen werden.', error);
    return null;
  }
}

export async function getReleases(): Promise<Release[]> {
  if (!client) return [];
  try {
    return await client.fetch(`
      *[_type == "release" && publishedOnSite == true]
      | order(coalesce(featured, false) desc, coalesce(sortOrder, 9999) asc, originalReleaseDate desc){
        ${releaseFields}
      }
    `);
  } catch (error) {
    console.error('Sanity: Releases konnten nicht geladen werden.', error);
    return [];
  }
}

export async function getSettings(): Promise<SiteSettings | null> {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "siteSettings"][0]{contactEmail, socialLinks}`);
  } catch (error) {
    console.error('Sanity: Website-Einstellungen konnten nicht geladen werden.', error);
    return null;
  }
}
