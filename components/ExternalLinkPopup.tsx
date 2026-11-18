'use client';

import {useEffect} from 'react';

export default function ExternalLinkPopup() {
  useEffect(() => {
    function openExternalLink(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
          event.shiftKey || event.altKey || !(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.hasAttribute('download') ||
          (link.target && link.target !== '_blank' && link.target !== '_self')) return;

      const url = new URL(link.href);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      const hostname = url.hostname.replace(/^www\./, '');
      if (hostname === window.location.hostname.replace(/^www\./, '') ||
          hostname === 'sabotageqcqc.online') return;

      event.preventDefault();
      const popup = window.open('about:blank', '_blank', 'popup,width=960,height=720');
      if (!popup) {
        window.open(url.href, '_blank', 'noopener,noreferrer');
        return;
      }

      popup.opener = null;
      const referrer = popup.document.createElement('meta');
      referrer.name = 'referrer';
      referrer.content = 'no-referrer';
      popup.document.head.append(referrer);
      popup.location.replace(url.href);
    }

    document.addEventListener('click', openExternalLink);
    return () => document.removeEventListener('click', openExternalLink);
  }, []);

  return null;
}
