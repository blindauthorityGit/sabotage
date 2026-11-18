export const bandName = 'SABOTAGE QCQC?';

export function normalizeBandName(text: string): string {
  return text.replace(
    /https?:\/\/[^\s<>"']+|(?<![\w/#@.\-])sabotage(?:[ \t]+q\.?c\.?q\.?c\.?\??|\?)?(?!\w|[ \t]+(?:PROTEST[ \t]+)?WEAR\b|-qcqc\b|-wear\b|\.[a-z]{2,}\b)/gi,
    match => /^https?:\/\//i.test(match) ? match : bandName,
  );
}
