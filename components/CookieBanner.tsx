"use client";
import {readLanguage, tr} from '../lib/language';
import {useEffect, useState} from 'react';
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(localStorage.getItem('sabotage-cookie-choice') !== 'accepted'); }, []);
  function accept() { localStorage.setItem('sabotage-cookie-choice', 'accepted'); setVisible(false); }
  if (!visible) return null;
  const lang = readLanguage(new URLSearchParams(window.location.search).get('lang') ?? undefined);
  return <aside className="cookie-banner" lang={lang} aria-label={tr(lang,'Cookie notice','Cookie-Hinweis','Avis sur les cookies','Aviso de cookies')}><p>{tr(lang,'We use cookies to improve your experience.','Wir verwenden Cookies, um die Nutzung der Website zu verbessern.','Nous utilisons des cookies pour améliorer votre expérience.','Usamos cookies para mejorar tu experiencia.')}</p><button onClick={accept}>OK</button></aside>;
}
