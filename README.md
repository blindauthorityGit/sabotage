# SABOTAGE QCQC? — Next.js + Sanity v0.2

## Was bereits funktioniert
- Responsives Frontend in der bestehenden SABOTAGE-CI: `#E02040`, `#2E3130`, `#0C0906`, Weiß.
- Originale hochgeladene Bildassets für Wortmarke und Emblem, keine generative Nachzeichnung.
- CMS-Schemas für Releases, Editionen, Tracks, Archiv, News, Medien, Links, globale Einstellungen und Seiten.
- Acht flexible Homepage-Module (Hero, Release-Feature, Release-Grid, Archive-Grid, News-Grid, Media-Grid, Statement, Link-Grid).
- Module können in Sanity über die Array-Reihenfolge per Drag-and-drop sortiert, ein-/ausgeblendet und mit Referenzen, Bildern, Texten und Links befüllt werden.
- DE/EN-Felder und Umschalter; keine erfundenen Streaming-Links oder Re-Release-Daten.
- Ohne Sanity-Konfiguration erscheint ein ausdrücklich provisorischer Fallback-Inhalt.

## Lokal starten
1. Node.js 20+ installieren.
2. `npm install`
3. `cp .env.example .env.local` und Sanity-Projekt-ID / Dataset ergänzen.
4. `npm run dev` und `http://localhost:3000` öffnen.
5. Studio unter `http://localhost:3000/studio` öffnen.

## Sanity einrichten
1. Sanity-Projekt und Dataset `production` anlegen; die Project ID in `.env.local` eintragen.
2. In Sanity CORS-Origin `http://localhost:3000` und später die echte Website-Domain freigeben.
3. In `/studio` ein Dokument **Seiten / Inhaltsblöcke** mit Titel `Home` und Slug `home` anlegen.
4. Module hinzufügen und mit veröffentlichten Release-Dokumenten verknüpfen. Reihenfolge im Array steuert die Reihenfolge auf der Website.
5. Nur Inhalte mit bestätigten Links und korrektem Veröffentlichungsstatus auf der Website freigeben. Die Demo-Module werden durch die gespeicherte Homepage ersetzt.
6. Für öffentlich lesbare Website-Inhalte kann das Dataset öffentlich konfiguriert werden. Für private Datasets muss ein serverseitiges Read-Token eingerichtet werden; diese Version enthält bewusst noch keine Tokenverwaltung.

## Stand / noch offen
- Kein produktiver Sanity-Account verbunden; CMS und Deployment sind noch nicht aktiviert.
- Keine automatische Zeitsteuerung für geplante Releases, keine Live-Preview und kein Auth-geschütztes Draft-Preview. Diese Funktionen sind für die nächste Ausbaustufe vorgesehen.
- Weitere Detailseiten und vollständige SEO-/Rechtsseiten fehlen noch.
- Verlinkte Shop-Startseite ist **kein** bestätigter Preorder-Link.
- CMS-Referenzen sind bewusst unabhängig vom Website-Layout. Releases und Editionen können später mehrfach verwendet werden.
- Original-Wordmark-Asset stammt aus dem vorherigen Prototyp; endgültige Logo-Freigabe vor Go-live prüfen.

## Nächster Schritt
Sanity-Projekt-ID verbinden, Homepage im Studio anlegen, echte Cover und geprüfte Links einpflegen, anschließend Build / Deployment testen.


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
