import {readLanguage} from '../lib/language';
import {getSiteContent} from '../lib/site-content';
import {absoluteUrl, bandName, siteMetadata, type SearchProps} from '../lib/seo';
import Site from '../components/Site';
import StructuredData from '../components/StructuredData';

export const dynamic = 'force-dynamic';

export async function generateMetadata({searchParams}: SearchProps) {
  return siteMetadata('home', readLanguage((await searchParams).lang));
}

export default async function Home({searchParams}: SearchProps) {
  const [{page, settings}, {lang}] = await Promise.all([getSiteContent(), searchParams]);
  return <>
    <StructuredData data={{
      '@type': 'MusicGroup', '@id': absoluteUrl('/#band'), name: bandName, url: absoluteUrl('/'),
      alternateName: ['SABOTAGE Q.C.Q.C.?', 'SABOTAGE QU’EST-CE QUE C’EST?'],
      image: absoluteUrl('/assets/sabotage-logo.png'),
      genre: ['Electronic Body Music', 'Electro-punk', 'Industrial'],
      member: ['ISABELLE GERNAND', 'MARC WERNER', 'DETLEF WEINREICH', 'JOHANNES BUCHNER']
        .map(name => ({'@type': 'Person', name})),
      sameAs: [
        'https://www.instagram.com/sabotageqcqc/',
        'https://www.facebook.com/SABOTAGE2QC/',
        'https://www.youtube.com/@SABOTAGEQCQC',
        'https://www.discogs.com/artist/69880-Sabotage-QCQC',
      ],
    }}/>
    <Site lang={readLanguage(lang)} page={page} contactEmail={settings?.contactEmail || 'contact@sabocon.com'}/>
  </>;
}
