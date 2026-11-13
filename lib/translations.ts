import type {Language} from './language';
import translatedNews from './news-translations.json';

const copy: Record<string, [string, string]> = {
  'NEW VINYL EP · 15 JAN 2027 · EMMO.BIZ': ['NOUVEL EP VINYLE · 15 JANV. 2027 · EMMO.BIZ', 'NUEVO EP EN VINILO · 15 ENE. 2027 · EMMO.BIZ'],
  '02 STATEMENT / MANIFEST': ['02 DÉCLARATION / MANIFESTE', '02 DECLARACIÓN / MANIFIESTO'],
  '03 NEWS GRID': ['03 ACTUALITÉS', '03 NOTICIAS'],
  '04 LATEST RELEASES': ['04 DERNIÈRES SORTIES', '04 ÚLTIMOS LANZAMIENTOS'],
  '05 FORTHCOMING RELEASES': ['05 SORTIES À VENIR', '05 PRÓXIMOS LANZAMIENTOS'],
  '06 DIGITAL BACK CATALOGUE': ['06 CATALOGUE NUMÉRIQUE', '06 CATÁLOGO DIGITAL'],
  '09 ARCHIVE GRID': ['09 ARCHIVES', '09 ARCHIVO'],
  '10 LINKGRID LABELS': ['10 LIENS DES LABELS', '10 ENLACES DE SELLOS'],
  '11 LINKLIST': ['11 LIENS', '11 ENLACES'],
  'All digital platforms': ['Toutes les plateformes numériques', 'Todas las plataformas digitales'],
  'All platforms': ['Toutes les plateformes', 'Todas las plataformas'],
  'THE FLOOD — All platforms': ['THE FLOOD — Toutes les plateformes', 'THE FLOOD — Todas las plataformas'],
  'Listen on Apple Music': ['Écouter sur Apple Music', 'Escuchar en Apple Music'],
  'Black Vinyl with inlay': ['Vinyle noir avec insert', 'Vinilo negro con inserto'],
  'Red Vinyl, Inlay, T-Shirt, Buttons, Sticker-Set': ['Vinyle rouge, insert, t-shirt, badges et autocollants', 'Vinilo rojo, inserto, camiseta, chapas y pegatinas'],
  'Black vinyl edition': ['Édition vinyle noir', 'Edición en vinilo negro'],
  'Red vinyl edition': ['Édition vinyle rouge', 'Edición en vinilo rojo'],
  announced: ['Annoncé', 'Anunciado'],
  preorder: ['Précommande', 'Reserva'],
  available: ['Disponible', 'Disponible'],
  pending: ['À confirmer', 'Por confirmar'],
  rightsReview: ['Droits en cours de vérification', 'Derechos en revisión'],
  'LATEST RELEASE': ['DERNIÈRE SORTIE', 'ÚLTIMO LANZAMIENTO'],
  'CURRENT RELEASES': ['SORTIES ACTUELLES', 'LANZAMIENTOS ACTUALES'],
  'New singles and releases': ['Nouveaux singles et sorties', 'Nuevos sencillos y lanzamientos'],
  'BACK CATALOGUE': ['CATALOGUE HISTORIQUE', 'CATÁLOGO HISTÓRICO'],
  'Original releases and planned digital re-releases. Dates and links only when confirmed.': ['Sorties originales et rééditions numériques prévues. Dates et liens après confirmation.', 'Lanzamientos originales y reediciones digitales previstas. Fechas y enlaces una vez confirmados.'],
  'THE ARCHIVE': ['LES ARCHIVES', 'EL ARCHIVO'],
  'Original artwork, flyers, photography and press material. More material will follow.': ['Pochettes originales, flyers, photographies et documents de presse. D’autres documents suivront.', 'Portadas originales, folletos, fotografías y material de prensa. Se añadirá más material.'],
  'NEWS': ['ACTUALITÉS', 'NOTICIAS'],
  'MUSIC FIRST.': ['LA MUSIQUE D’ABORD.', 'LA MÚSICA PRIMERO.'],
  'SABOTAGE QCQC? — electronic body music, electro-punk and industrial. New works and historical recordings, presented side by side.': ['SABOTAGE QCQC? — electronic body music, électro-punk et musique industrielle. Nouvelles créations et enregistrements historiques côte à côte.', 'SABOTAGE QCQC? — electronic body music, electropunk e industrial. Obras nuevas y grabaciones históricas, lado a lado.'],
  'LABELS': ['LABELS', 'SELLOS'],
  'Release partners': ['Partenaires de publication', 'Sellos colaboradores'],
  'LISTEN & FOLLOW': ['ÉCOUTER ET SUIVRE', 'ESCUCHAR Y SEGUIR'],
  'Listen to the single': ['Écouter le single', 'Escuchar el sencillo'],
  'SABOTAGE WEAR / COMING SOON': ['SABOTAGE WEAR / BIENTÔT DISPONIBLE', 'SABOTAGE WEAR / PRÓXIMAMENTE'],
};

export function translateText(lang: Language, value: string) {
  return lang === 'fr' ? copy[value]?.[0] ?? value : lang === 'es' ? copy[value]?.[1] ?? value : value;
}


export function newsTranslation(id: string, lang: Language) {
  if (lang !== 'fr' && lang !== 'es') return undefined;
  return (translatedNews as Record<string, Record<'fr' | 'es', {body: string}>>)[id]?.[lang];
}
