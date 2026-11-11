"use client";
import {useEffect, useState} from 'react';
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(localStorage.getItem('sabotage-cookie-choice') !== 'accepted'); }, []);
  function accept() { localStorage.setItem('sabotage-cookie-choice', 'accepted'); setVisible(false); }
  if (!visible) return null;
  return <aside className="cookie-banner" aria-label="Cookie notice"><p>We use cookies to improve your experience.</p><button onClick={accept}>OK</button></aside>;
}
