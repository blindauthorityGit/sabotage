import Link from 'next/link';
import LanguageSwitch from '../../components/LanguageSwitch';
import {languageHref, readLanguage, tr} from '../../lib/language';

export const metadata = {title: 'Impressum — SABOTAGE QCQC?'};

export default async function Impressum({searchParams}: {searchParams: Promise<{lang?: string}>}) {
  const lang = readLanguage((await searchParams).lang);
  const text = (en: string, de: string, fr: string, es: string) => tr(lang, en, de, fr, es);

  return (
    <main className="legal-page" lang={lang}>
      <Link href={languageHref('/', lang)}>← SABOTAGE QCQC?</Link>
      <LanguageSwitch lang={lang} path="/impressum"/>
      <h1>{text('Legal notice', 'Impressum', 'Mentions légales', 'Aviso legal')}</h1>
      <p>{text(
        'Information pursuant to section 5 of the German Digital Services Act (DDG) and section 18(1) of the Interstate Media Treaty (MStV).',
        'Angaben nach § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 1 Medienstaatsvertrag (MStV).',
        'Informations conformément à l’article 5 de la loi allemande sur les services numériques (DDG) et à l’article 18, alinéa 1, du traité interétatique sur les médias (MStV).',
        'Información conforme al artículo 5 de la Ley alemana de Servicios Digitales (DDG) y al artículo 18, apartado 1, del Tratado Interestatal de Medios (MStV).'
      )}</p>
      <h2>{text('Provider', 'Anbieter', 'Éditeur', 'Titular')}</h2>
      <p>SABOCON GmbH<br/>Alte Bogengasse 25<br/>63303 Dreieich<br/>{text('Germany', 'Deutschland', 'Allemagne', 'Alemania')}</p>
      <p>{text('Represented by Marc Werner, reachable at the address above.', 'Vertreten durch Marc Werner, erreichbar unter der oben genannten Anschrift.', 'Représentée par Marc Werner, joignable à l’adresse ci-dessus.', 'Representada por Marc Werner, localizable en la dirección indicada.')}</p>
      <h2>{text('Contact', 'Kontakt', 'Contact', 'Contacto')}</h2>
      <p>
        {text('Phone', 'Telefon', 'Téléphone', 'Teléfono')} <a href="tel:+496103984937">+49 6103 9849-37</a><br/>
        {text('Email', 'E-Mail', 'Courriel', 'Correo electrónico')} <a href="mailto:contact@sabocon.com">contact@sabocon.com</a>
      </p>
      <h2>{text('Commercial register and VAT ID', 'Handelsregister und Umsatzsteuer-ID', 'Registre du commerce et numéro de TVA', 'Registro mercantil y número de IVA')}</h2>
      <p>Amtsgericht Offenbach am Main, HRB 34388<br/>
        {text('VAT identification number under section 27a UStG', 'Umsatzsteuer-Identifikationsnummer nach § 27a UStG', 'Numéro d’identification TVA selon l’article 27a UStG', 'Número de identificación a efectos del IVA según el artículo 27a UStG')}: DE204691339
      </p>
      <h2>{text('Consumer dispute resolution', 'Verbraucherstreitbeilegung', 'Règlement des litiges de consommation', 'Resolución de litigios de consumo')}</h2>
      <p>{text(
        'SABOCON GmbH is neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration body.',
        'Die SABOCON GmbH ist weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
        'SABOCON GmbH n’est ni tenue ni disposée à participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation.',
        'SABOCON GmbH no está obligada ni dispuesta a participar en procedimientos ante un organismo de resolución de litigios de consumo.'
      )}</p>
      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer">{text('Disclaimer', 'Disclaimer', 'Responsabilité', 'Responsabilidad')}</h2>
        <p>{text(
          'This website links to third-party services, including shops and streaming platforms. Their operators are responsible for their content and offers. Orders are governed by the information supplied by the respective provider.',
          'Diese Website enthält Links zu Angeboten Dritter, darunter Shops und Streamingdienste. Für die Inhalte und Angebote der verlinkten Seiten sind deren jeweilige Betreiber verantwortlich. Maßgeblich für Bestellungen sind die Angaben des jeweiligen Anbieters.',
          'Ce site contient des liens vers des services tiers, notamment des boutiques et des plateformes de streaming. Leurs exploitants sont responsables de leurs contenus et de leurs offres. Pour les commandes, les informations du prestataire concerné font foi.',
          'Este sitio enlaza con servicios de terceros, incluidas tiendas y plataformas de streaming. Sus operadores son responsables de sus contenidos y ofertas. Los pedidos se rigen por la información del proveedor correspondiente.'
        )}</p>
        <p>{text(
          'You can report possible infringements in our content or linked content by emailing',
          'Hinweise auf mögliche Rechtsverletzungen in eigenen oder verlinkten Inhalten können Sie per E-Mail senden an',
          'Vous pouvez signaler toute infraction éventuelle dans nos contenus ou les contenus liés à',
          'Puede comunicar posibles infracciones en contenidos propios o enlazados por correo a'
        )} <a href="mailto:contact@sabocon.com">contact@sabocon.com</a>. {text(
          'We review reports and remove unlawful content or links within our control.',
          'Wir prüfen solche Hinweise und entfernen rechtswidrige Inhalte oder Links, soweit wir darüber verfügen können.',
          'Nous examinons ces signalements et retirons les contenus ou liens illicites lorsque nous en avons la maîtrise.',
          'Revisamos los avisos y retiramos los contenidos o enlaces ilícitos que estén bajo nuestro control.'
        )}</p>
      </section>
    </main>
  );
}
