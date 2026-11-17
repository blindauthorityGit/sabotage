import type {Metadata} from 'next';
import {languageHref, languages, tr, type Language} from './language';
import {credits} from '../app/archive/catalogue';

export const siteUrl = 'https://www.sabotageqcqc.online';
export const bandName = 'SABOTAGE QCQC?';
export type SearchProps = {searchParams: Promise<{lang?: string}>};

export const archiveNames = [...new Set(credits.flatMap(([name]) => name.split(' / ')))];
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

type PageMetadata = {
  path: string; lang: Language; title: string; description: string;
  image?: string; keywords?: string[]; type?: 'website' | 'article';
};

export function pageMetadata({path, lang, title, description, image, keywords, type = 'website'}: PageMetadata): Metadata {
  const url = absoluteUrl(languageHref(path, lang));
  const alternates = Object.fromEntries(languages.map(language => [
    language, absoluteUrl(languageHref(path, language)),
  ]));
  return {
    title,
    description,
    keywords: [...new Set([bandName, 'SABOTAGE Q.C.Q.C.?', ...(keywords ?? [])])],
    alternates: {canonical: url, languages: {...alternates, 'x-default': alternates.en}},
    openGraph: {
      type, url, title, description, siteName: bandName,
      locale: {en: 'en_GB', de: 'de_DE', fr: 'fr_FR', es: 'es_ES'}[lang],
      images: [{url: absoluteUrl(image || '/assets/sabotage-logo.png')}],
    },
    twitter: {card: image ? 'summary_large_image' : 'summary', title, description, images: [absoluteUrl(image || '/assets/sabotage-logo.png')]},
  };
}

export function siteMetadata(page: 'home' | 'history' | 'manifesto' | 'legal', lang: Language) {
  const entries = {
    home: {
      path: '/',
      title: tr(lang, 'Official site · EBM, releases & archive', 'Offizielle Website · EBM, Releases & Archiv', 'Site officiel · EBM, sorties et archives', 'Sitio oficial · EBM, lanzamientos y archivo'),
      description: tr(lang,
        'Official site of SABOTAGE QCQC?, the German EBM and electro-punk band. Discover new releases, news, the digital back catalogue and band history.',
        'Offizielle Website der deutschen EBM- und Electro-Punk-Band SABOTAGE QCQC?. Mit neuen Releases, News, digitalem Back Catalogue und Bandgeschichte.',
        'Site officiel du groupe allemand d’EBM et d’électro-punk SABOTAGE QCQC?. Sorties, actualités, catalogue numérique et histoire du groupe.',
        'Sitio oficial de SABOTAGE QCQC?, banda alemana de EBM y electropunk. Lanzamientos, noticias, catálogo digital e historia de la banda.'),
      keywords: ['EBM', 'electro-punk', 'industrial music', 'THE FLOOD', 'EN ORDRE', 'NO BOTTOM - NO TOP', 'SUB CULTURE RECORDS', 'EMMO.BIZ'],
    },
    history: {
      path: '/archive/history',
      title: tr(lang, 'History · Collaborations & remixes', 'HISTORY · Bandgeschichte, Kollaborationen und Remixe', 'HISTORY · Histoire, collaborations et remixes', 'HISTORY · Historia, colaboraciones y remezclas'),
      description: tr(lang,
        'Explore the SABOTAGE QCQC? archive, from cassette culture to productions with PANKOW and FRONT 242, plus remixes, artwork and searchable credits.',
        'Das Archiv von SABOTAGE QCQC? führt von der Kassettenszene zu Produktionen mit PANKOW und FRONT 242 sowie zu Remixen, Artwork und durchsuchbaren Credits.',
        'Les archives de SABOTAGE QCQC?, de la scène cassette aux productions avec PANKOW et FRONT 242, avec remixes, visuels et crédits consultables.',
        'El archivo de SABOTAGE QCQC?, desde la escena del casete hasta las producciones con PANKOW y FRONT 242, con remezclas, arte y créditos consultables.'),
      keywords: [...archiveNames, 'KONTRAST', 'NUDE', 'BLUE VELVET STUDIO', 'SUB CULTURE RECORDS',
        ...credits.flatMap(([, work]) => work.split(' / ').filter(Boolean))],
    },
    manifesto: {
      path: '/manifesto', title: 'MANIFESTO',
      description: tr(lang,
        'The official SABOTAGE QCQC? manifesto on electronic music, resistance and artistic independence.',
        'Das offizielle Manifest von SABOTAGE QCQC? über elektronische Musik, Widerstand und künstlerische Unabhängigkeit.',
        'Le manifeste officiel de SABOTAGE QCQC? sur la musique électronique, la résistance et l’indépendance artistique.',
        'El manifiesto oficial de SABOTAGE QCQC? sobre música electrónica, resistencia e independencia artística.'),
    },
    legal: {
      path: '/impressum',
      title: tr(lang, 'Legal notice', 'Impressum', 'Mentions légales', 'Aviso legal'),
      description: tr(lang, 'Legal and contact information for the official SABOTAGE QCQC? website.', 'Rechtliche Angaben und Kontakt zur offiziellen Website von SABOTAGE QCQC?.', 'Informations légales et coordonnées du site officiel de SABOTAGE QCQC?.', 'Información legal y contacto del sitio oficial de SABOTAGE QCQC?.'),
    },
  };
  const entry = entries[page];
  return pageMetadata({...entry, lang, title: `${entry.title} | ${bandName}`});
}

export function mentionKeywords(copy: string) {
  const text = copy.toLocaleLowerCase();
  return archiveNames.filter(name => text.includes(name.toLocaleLowerCase()));
}
