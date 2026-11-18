import type {Language} from '../../lib/language';

export const manifestoTitles: Record<Language, {title: string; accent: string; label: string; back: string}> = {
  en: {title: 'WE WERE NEVER HERE', accent: 'TO FIT IN.', label: 'Manifesto', back: 'Back to SABOTAGE QCQC?'},
  de: {title: 'WIR WAREN NIE HIER,', accent: 'UM DAZUZUGEHÖREN.', label: 'Manifest', back: 'Zurück zu SABOTAGE QCQC?'},
  fr: {title: 'NOUS N’AVONS JAMAIS CHERCHÉ', accent: 'À RENTRER DANS LE MOULE.', label: 'Manifeste', back: 'Retour à SABOTAGE QCQC?'},
  es: {title: 'NUNCA ESTUVIMOS AQUÍ', accent: 'PARA ENCAJAR.', label: 'Manifiesto', back: 'Volver a SABOTAGE QCQC?'},
};
