import {redirect} from 'next/navigation';
import {languageHref, readLanguage} from '../../lib/language';

export default async function Archive({searchParams}: {searchParams: Promise<{lang?: string}>}) {
  const lang = readLanguage((await searchParams).lang);
  redirect(languageHref('/archive/history', lang));
}
