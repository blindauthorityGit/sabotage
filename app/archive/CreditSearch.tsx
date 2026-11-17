'use client';

import {useState} from 'react';
import {tr, type Language} from '../../lib/language';
import {credits, roles} from './catalogue';

const searchKey = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

export default function CreditSearch({lang}: {lang: Language}) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');
  const terms = searchKey(query).trim().split(/\s+/).filter(Boolean);
  const results = credits.filter(([artist, release, credit]) =>
    (!role || role === credit) && terms.every(term =>
      searchKey(`${artist} ${release} ${roles[credit][lang]}`).includes(term)
    )
  );

  return (
    <section className="manifesto-chapter" aria-labelledby="credits-title" id="credits">
      <h2 id="credits-title">ARCHIVE CREDITS</h2>
      <div className="archive-search">
        <label>
          {tr(lang, 'Search artists or releases', 'Künstler oder Releases suchen', 'Rechercher un artiste ou une sortie', 'Buscar artistas o lanzamientos')}
          <input type="search" value={query} onChange={event => setQuery(event.target.value)}/>
        </label>
        <label>
          {tr(lang, 'Credit', 'Beitrag', 'Contribution', 'Contribución')}
          <select value={role} onChange={event => setRole(event.target.value)}>
            <option value="">{tr(lang, 'All credits', 'Alle Beiträge', 'Toutes les contributions', 'Todas las contribuciones')}</option>
            {Object.entries(roles).map(([key, labels]) => <option key={key} value={key}>{labels[lang]}</option>)}
          </select>
        </label>
      </div>
      <p role="status">{results.length} {tr(lang, 'results', 'Treffer', 'résultats', 'resultados')}</p>
      <ul className="archive-credits">
        {results.map(([artist, release, credit]) => (
          <li key={`${artist}:${release}`}>
            <strong>{artist}</strong>
            {release && <span>{release}</span>}
            <small>{roles[credit][lang]}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
