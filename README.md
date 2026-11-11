# SABOTAGE QCQC? — Next.js + Sanity

## Was bereits funktioniert
- Responsives Frontend in der bestehenden SABOTAGE-CI: `#E02040`, `#2E3130`, `#0C0906`, Weiß.
- Originale hochgeladene Bildassets für Wortmarke und Emblem, keine generative Nachzeichnung.
- Sanity-Schemas für Releases, Editionen, Tracks, Labels, Archiv, News, Medien und Homepage.
- Releases werden nach Kategorie, Datum und optionaler Sortierung auf der Website angezeigt. Ein neuer Release braucht keine manuelle Referenz in der Homepage-Liste.
- Die Homepage-Abschnitte können in Sanity sortiert, ein-/ausgeblendet und mit Texten und Links gepflegt werden.
- DE/EN-Felder und Umschalter; keine erfundenen Streaming-Links oder Re-Release-Daten.
- Ohne Sanity-Konfiguration erscheint ein ausdrücklich provisorischer Fallback-Inhalt.

## Lokal starten
1. Node.js 20+ installieren.
2. `npm install`
3. `.env.example` nach `.env.local` kopieren. Die Projekt-ID und das Dataset sind bereits eingetragen.
4. `npm run dev` und `http://localhost:3000` öffnen.
5. Studio unter derselben Adresse mit `/studio` öffnen. Wenn Port 3000 belegt ist, nimmt Next.js zum Beispiel Port 3001.

## Sanity einrichten
1. Das Projekt `cvif55we` und Dataset `production` sind in `.env.example` und `sanity.cli.ts` eingetragen.
2. Das Dataset muss öffentlich lesbar sein, weil die Website veröffentlichte Inhalte ohne API-Token abruft. Im Studio anmelden und bei Bedarf die lokale CORS-Origin mit Credentials erlauben.
3. Einmalig `npx sanity login` ausführen und danach `npm run seed:sanity`. Das legt die bisherigen Releases, Labels, Homepage-Texte, Links und Website-Einstellungen an. Bereits vorhandene Einträge werden vom Seed-Skript nicht überschrieben.
4. Neue Releases unter **Releases** anlegen, veröffentlichen und **Auf Website anzeigen** aktivieren. Für das Highlight zusätzlich **Als aktuellen Highlight-Release verwenden** aktivieren.
5. Die Homepage zeigt freigegebene Releases automatisch im passenden Release-Grid. Nur ein festes Release-Feature muss bei Bedarf explizit ausgewählt werden.

## Stand / noch offen
- Detailseiten pro Release, Preview-Modus und geplante automatische Veröffentlichung sind noch nicht umgesetzt.
- Keine automatische Zeitsteuerung für geplante Releases, keine Live-Preview und kein Auth-geschütztes Draft-Preview. Diese Funktionen sind für die nächste Ausbaustufe vorgesehen.
- Weitere Detailseiten und vollständige SEO-/Rechtsseiten fehlen noch.
- Verlinkte Shop-Startseite ist **kein** bestätigter Preorder-Link.
- CMS-Referenzen sind bewusst unabhängig vom Website-Layout. Releases und Editionen können später mehrfach verwendet werden.
- Original-Wordmark-Asset stammt aus dem vorherigen Prototyp; endgültige Logo-Freigabe vor Go-live prüfen.

## Nächster Schritt
Echte Cover und geprüfte Release-Daten im Studio ergänzen. Für Deployments die Produktionsdomain als CORS-Origin eintragen.


## V0.3 — bestätigte Links und Inhalte (10.11.2026)
- SoundCloud: https://soundcloud.com/marc-w-904754736
- Presse: contact@sabocon.com
- EMMO.BIZ: https://www.emmobizrecords.de
- SABOTAGE WEAR (Coming Soon): https://sabotage-wear.myspreadshop.de
- THE FLOOD Single: Apple Music https://music.apple.com/de/album/the-flood-without-bottom-no-top-single/6817367441
- THE FLOOD Smartlink: https://distrokid.com/hyperfollow/sabotageqcqc/the-flood-without-bottom-no-top
- NUDE nicht im Demo-/Fallback-Katalog und nicht als Artist-Vorauswahl.
- Neues CMS-Dokument `recordLabel` mit optionaler bestätigter Website; EMMO.BIZ verlinkt. SUB CULTURE RECORDS bleibt als Labelname ohne Link, bis eine eindeutig zugehörige URL vorliegt (nicht mit `Subkultur Records` verwechseln).
- Impressum unter `/impressum` mit SABOCON-Daten als vorläufiger Entwurf. Anbieterstellung und Rechtsangaben vor Veröffentlichung prüfen. Datenschutzseite muss vor Go-live erstellt und eingebunden werden.
- Hinweis: Bei bestehendem Sanity-Projekt überschreiben Fallback-Daten keine CMS-Dokumente. Diese Links müssen in den entsprechenden CMS-Dokumenten eingepflegt werden.
