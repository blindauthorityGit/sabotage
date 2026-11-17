import type {NewsItem} from '../lib/content';
import type {Language} from '../lib/language';
import {newsBody} from '../lib/news-copy';
import {translateText} from '../lib/translations';

export default function NewsBody({item, lang}: {item: NewsItem; lang: Language}) {
  return <div className="news-body">{newsBody(item, lang).split('\n\n').map((paragraph, index) => {
    const link = item.links?.find(link => link.enabled && link.url === paragraph);
    if (link) return <p key={index}><a href={link.url} target="_blank" rel="noopener noreferrer">{translateText(lang, link.label)} ↗</a></p>;

    return <p key={index}>{paragraph.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((text, span) => {
      if (span % 2 === 0) return text;
      if (text.startsWith('**')) return <strong key={span}>{text.slice(2, -2)}</strong>;
      return <em key={span}>{text.slice(1, -1)}</em>;
    })}</p>;
  })}</div>;
}
