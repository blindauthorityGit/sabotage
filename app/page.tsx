import Site from '../components/Site';
import {getHome,getSettings} from '../lib/content';
import {fallbackPage} from '../lib/fallback';
export const dynamic='force-dynamic';
export default async function Home(){const [page,settings]=await Promise.all([getHome(),getSettings()]);return <Site page={page?.modules?.length?page:fallbackPage} contactEmail={settings?.contactEmail||'contact@sabocon.com'}/>}
