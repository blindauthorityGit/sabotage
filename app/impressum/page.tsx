import Link from 'next/link';

export const metadata = {title: 'Impressum — SABOTAGE QCQC?'};

export default function Impressum() {
  return (
    <main className="legal-page" lang="de">
      <Link href="/">← SABOTAGE QCQC?</Link>
      <h1>Impressum</h1>
      <p>Angaben nach § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 1 Medienstaatsvertrag (MStV).</p>

      <h2>Anbieter</h2>
      <p>
        SABOCON GmbH<br/>
        Alte Bogengasse 25<br/>
        63303 Dreieich<br/>
        Deutschland
      </p>
      <p>Vertreten durch Marc Werner, erreichbar unter der oben genannten Anschrift.</p>

      <h2>Kontakt</h2>
      <p>
        Telefon <a href="tel:+496103984937">+49 6103 9849-37</a><br/>
        E-Mail <a href="mailto:contact@sabocon.com">contact@sabocon.com</a>
      </p>

      <h2>Handelsregister und Umsatzsteuer-ID</h2>
      <p>
        Amtsgericht Offenbach am Main, HRB 34388<br/>
        Umsatzsteuer-Identifikationsnummer nach § 27a UStG: DE204691339
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Die SABOCON GmbH ist weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer">Disclaimer</h2>
        <p>
          Diese Website enthält Links zu Angeboten Dritter, darunter Shops und Streamingdienste.
          Für die Inhalte und Angebote der verlinkten Seiten sind deren jeweilige Betreiber
          verantwortlich. Maßgeblich für Bestellungen sind die Angaben des jeweiligen Anbieters.
        </p>
        <p>
          Hinweise auf mögliche Rechtsverletzungen in eigenen oder verlinkten Inhalten können
          Sie per E-Mail an <a href="mailto:contact@sabocon.com">contact@sabocon.com</a> senden.
          Wir prüfen solche Hinweise und entfernen rechtswidrige Inhalte oder Links, soweit wir
          darüber verfügen können.
        </p>
      </section>
    </main>
  );
}
