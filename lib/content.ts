import {createClient} from 'next-sanity';
export type Link={label:string;url?:string;kind?:string;enabled?:boolean};
export type Localized={de?:string;en?:string};
export type Release={_id:string;title:string;artist?:string;category?:string;label?:string;labelUrl?:string;releaseStatus?:string;originalReleaseDate?:string;digitalReReleaseDate?:string;coverUrl?:string;description?:Localized;editions?:{format?:string;color?:string;quantity?:number}[];links?:Link[]};
export type Module={_key:string;_type:string;enabled?:boolean;heading?:Localized;intro?:Localized;imageUrl?:string;links?:Link[];releaseRefs?:Release[];archiveRefs?:{_id:string;title:string;imageUrl?:string}[];newsRefs?:{_id:string;title:string;body?:Localized}[];mediaRefs?:{_id:string;title:string;url?:string}[]};
export type Page={title:string;modules:Module[]};
const id=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const client=id?createClient({projectId:id,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||'2025-02-19',useCdn:false}):null;
const image='"https://cdn.sanity.io/images/" + $project + "/" + $dataset + "/" + image.asset->path';
// Asset URLs come from Sanity's asset.url field; no invented artwork or external links.
const releaseFields=`_id,title,artist,category,label,"labelUrl":labelRef->website,releaseStatus,originalReleaseDate,digitalReReleaseDate,description,editions,links,"coverUrl":cover.asset->url`;
export async function getHome():Promise<Page|null>{if(!client)return null;try{return await client.fetch(`*[_type == "page" && slug.current == "home"][0]{title,modules[]{...,"imageUrl":image.asset->url,"releaseRefs":releaseRefs[]->{${releaseFields}},"archiveRefs":archiveRefs[]->{_id,title,"imageUrl":image.asset->url},"newsRefs":newsRefs[]->{_id,title,body},"mediaRefs":mediaRefs[]->{_id,title,url}}}`)}catch{return null}}
export async function getReleases():Promise<Release[]>{if(!client)return [];try{return await client.fetch(`*[_type == "release" && publishedOnSite == true] | order(sortOrder asc, originalReleaseDate desc){${releaseFields}}`)}catch{return []}}
export async function getSettings():Promise<{contactEmail?:string;socialLinks?:Link[]}|null>{if(!client)return null;try{return await client.fetch(`*[_type == "siteSettings"][0]{contactEmail,socialLinks}`)}catch{return null}}
