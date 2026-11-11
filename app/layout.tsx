import './globals.css';
import CookieBanner from '../components/CookieBanner';
export const metadata={title:'SABOTAGE QCQC? — MUSIC / RELEASES / ARCHIVE',description:'SABOTAGE QCQC? — current releases, back catalogue and archive.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<CookieBanner /></body></html>}
