import {normalizeBandName} from './band-name';
import type {NewsItem} from './content';
import type {Language} from './language';
import {newsTranslation, translateText} from './translations';

export function newsBody(item: NewsItem, lang: Language) {
  return normalizeBandName(item.body?.[lang] || newsTranslation(item._id, lang)?.body ||
    translateText(lang, item.body?.en || item.body?.de || ''));
}

export function newsDate(item: NewsItem) {
  return item.title.trim().toUpperCase().endsWith('THE PAST RETURNS. THE FUTURE BEGINS.')
    ? '2026-11-09' : item.date;
}
