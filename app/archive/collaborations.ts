import type {Language} from '../../lib/language';

type Copy = Record<Language, string>;
type Chapter = {title: string; intro?: Copy; entries: {title: string; copy: Copy | string}[]};

export const collaborationsIntro: Copy = {
  en: 'From the European electronic underground of the early 1990s to contemporary productions, SABOTAGE QCQC? has worked with musicians, producers, remixers, photographers and visual artists. Connections from Belgian EBM and the Italian electronic underground to Chicago industrial and contemporary electronic music have shaped the band’s sound and visual identity for more than three decades.',
  de: 'Vom europäischen Elektronik-Underground der frühen Neunziger bis zu aktuellen Produktionen haben SABOTAGE QCQC? mit Musikern, Produzenten, Remixern, Fotografen und bildenden Künstlern zusammengearbeitet. Verbindungen von der belgischen EBM-Szene und dem italienischen Elektronik-Underground bis zum Chicagoer Industrial und zur heutigen elektronischen Musik prägen seit mehr als drei Jahrzehnten den Sound und die Bildsprache der Band.',
  fr: 'De la scène électronique underground européenne du début des années 1990 aux productions actuelles, SABOTAGE QCQC? a travaillé avec des musiciens, producteurs, remixeurs, photographes et plasticiens. De l’EBM belge et de l’underground italien à la scène industrielle de Chicago et à l’électronique contemporaine, ces liens façonnent le son et l’identité visuelle du groupe depuis plus de trente ans.',
  es: 'Desde la escena electrónica underground europea de principios de los noventa hasta sus producciones actuales, SABOTAGE QCQC? ha trabajado con músicos, productores, remezcladores, fotógrafos y artistas visuales. Desde el EBM belga y la electrónica underground italiana hasta el industrial de Chicago y la electrónica contemporánea, esos vínculos han marcado el sonido y la identidad visual de la banda durante más de tres décadas.',
};

export const collaborations: Chapter[] = [
  {title: 'PRODUCTIONS & COLLABORATIONS', entries: [
    {title: 'FRONT 242 / DANIEL BRESSANUTTI', copy: {
      en: 'FRONT 242 took over the band’s management through ART & STRATEGY. SABOTAGE worked with DANIEL BRESSANUTTI in Belgium on SEXPLOITATION CINEMA, GODDESS and SCHLAGER. BRESSANUTTI and PATRICK CODENYS produced SEXPLOITATION CINEMA in Aarschot. The relationship later contributed to the formation of NUDE, with BRESSANUTTI involved in its early stages. SABOTAGE QCQC? toured Europe with FRONT 242. TIM KROKER, then the drummer in SABOTAGE QCQC?, went on to play live drums for FRONT 242 through their final show in Brussels on 25 January 2025.',
      de: 'FRONT 242 übernahmen das Management der Band über ART & STRATEGY. In Belgien arbeiteten SABOTAGE mit DANIEL BRESSANUTTI an SEXPLOITATION CINEMA, GODDESS und SCHLAGER. BRESSANUTTI und PATRICK CODENYS produzierten SEXPLOITATION CINEMA in Aarschot. Aus dieser Verbindung ging später auch NUDE hervor, an dessen Anfangsphase BRESSANUTTI beteiligt war. SABOTAGE QCQC? gingen mit FRONT 242 auf Europatour. TIM KROKER, damals Schlagzeuger bei SABOTAGE QCQC?, spielte anschließend bis zum Abschiedskonzert am 25. Januar 2025 in Brüssel live Schlagzeug bei FRONT 242.',
      fr: 'FRONT 242 a pris en charge le management du groupe via ART & STRATEGY. En Belgique, SABOTAGE a travaillé avec DANIEL BRESSANUTTI sur SEXPLOITATION CINEMA, GODDESS et SCHLAGER. BRESSANUTTI et PATRICK CODENYS ont produit SEXPLOITATION CINEMA à Aarschot. Cette relation a ensuite contribué à la naissance de NUDE, auquel BRESSANUTTI a participé à ses débuts. SABOTAGE QCQC? a sillonné l’Europe en tournée avec FRONT 242. TIM KROKER, alors batteur de SABOTAGE QCQC?, a ensuite joué de la batterie sur scène avec FRONT 242 jusqu’à leur dernier concert, le 25 janvier 2025 à Bruxelles.',
      es: 'FRONT 242 asumió la representación de la banda a través de ART & STRATEGY. En Bélgica, SABOTAGE trabajó con DANIEL BRESSANUTTI en SEXPLOITATION CINEMA, GODDESS y SCHLAGER. BRESSANUTTI y PATRICK CODENYS produjeron SEXPLOITATION CINEMA en Aarschot. La relación contribuyó más tarde a la formación de NUDE, con BRESSANUTTI en sus primeras etapas. SABOTAGE QCQC? salió de gira por Europa con FRONT 242. TIM KROKER, entonces batería de SABOTAGE QCQC?, pasó a tocar la batería en directo con FRONT 242 hasta su último concierto, el 25 de enero de 2025 en Bruselas.',
    }},
    {title: 'PANKOW', copy: {
      en: 'PANKOW and SABOTAGE QCQC? played several tours and shows together. Their production work in Florence at BLUE VELVET STUDIO included TUMULTE, ANNORLUNDA and LES ENFANTS SAUVAGES. PANKOW later remixed HEIDENANGST for SEXPLOITATION CINEMA (Limited Edition).',
      de: 'PANKOW und SABOTAGE QCQC? spielten mehrere gemeinsame Touren und Konzerte. Im BLUE VELVET STUDIO in Florenz entstanden TUMULTE, ANNORLUNDA und LES ENFANTS SAUVAGES in Zusammenarbeit mit PANKOW. Später remixten PANKOW HEIDENANGST für SEXPLOITATION CINEMA (Limited Edition).',
      fr: 'PANKOW et SABOTAGE QCQC? ont partagé plusieurs tournées et concerts. Leur travail de production au BLUE VELVET STUDIO, à Florence, a donné naissance à TUMULTE, ANNORLUNDA et LES ENFANTS SAUVAGES. PANKOW a ensuite remixé HEIDENANGST pour SEXPLOITATION CINEMA (Limited Edition).',
      es: 'PANKOW y SABOTAGE QCQC? compartieron varias giras y conciertos. Su trabajo de producción en BLUE VELVET STUDIO, en Florencia, dio lugar a TUMULTE, ANNORLUNDA y LES ENFANTS SAUVAGES. Más tarde, PANKOW remezcló HEIDENANGST para SEXPLOITATION CINEMA (Limited Edition).',
    }},
    {title: 'KMFDM / SASCHA KONIETZKO', copy: {
      en: 'KMFDM and SABOTAGE QCQC? shared a longstanding friendship. SASCHA KONIETZKO created remixes for SABOTAGE QCQC? and later for its follow-up project NUDE.',
      de: 'KMFDM und SABOTAGE QCQC? verband eine langjährige Freundschaft. SASCHA KONIETZKO fertigte Remixe für SABOTAGE QCQC? und später auch für das Folgeprojekt NUDE an.',
      fr: 'KMFDM et SABOTAGE QCQC? étaient liés par une amitié de longue date. SASCHA KONIETZKO a réalisé des remixes pour SABOTAGE QCQC?, puis pour le projet qui lui a succédé, NUDE.',
      es: 'KMFDM y SABOTAGE QCQC? mantuvieron una amistad de muchos años. SASCHA KONIETZKO hizo remezclas para SABOTAGE QCQC? y más tarde para su proyecto sucesor, NUDE.',
    }},
    {title: 'TEHO TEARDO / MEATHEAD', copy: {
      en: 'Italian experimental musician TEHO TEARDO contributed to SEXPLOITATION CINEMA with MEATHEAD. The bands also shared the EBOLA IS IN TOWN tour with DIVE and TEMPLEBEAT after first crossing paths in Florence.',
      de: 'Der italienische Experimental-Musiker TEHO TEARDO wirkte mit MEATHEAD an SEXPLOITATION CINEMA mit. Nach der ersten Begegnung in Florenz gingen die Bands mit DIVE und TEMPLEBEAT auf die gemeinsame Tour EBOLA IS IN TOWN.',
      fr: 'Le musicien expérimental italien TEHO TEARDO a contribué à SEXPLOITATION CINEMA avec MEATHEAD. Après leur rencontre à Florence, les groupes ont partagé la tournée EBOLA IS IN TOWN avec DIVE et TEMPLEBEAT.',
      es: 'El músico experimental italiano TEHO TEARDO participó en SEXPLOITATION CINEMA con MEATHEAD. Tras conocerse en Florencia, las bandas compartieron la gira EBOLA IS IN TOWN con DIVE y TEMPLEBEAT.',
    }},
    {title: 'CARLOS PERÓN', copy: {
      en: 'The former YELLO member was involved in the production of LIBERTINAGE, a controversial chapter in the band’s recording history.',
      de: 'Das ehemalige YELLO-Mitglied war an der Produktion von LIBERTINAGE beteiligt, einem kontroversen Kapitel in der Bandgeschichte.',
      fr: 'L’ancien membre de YELLO a participé à la production de LIBERTINAGE, un chapitre controversé dans l’histoire discographique du groupe.',
      es: 'El exintegrante de YELLO participó en la producción de LIBERTINAGE, un capítulo controvertido en la historia discográfica de la banda.',
    }},
    {title: 'DIE WARZAU', copy: {
      en: 'Work involving JIM MARCUS and VAN CHRISTIE linked SABOTAGE to Chicago’s industrial scene. The archive records DIE WARZAU’s contributions to HEARTS & BOMBS and FREIHEIT.',
      de: 'Die Arbeit mit JIM MARCUS und VAN CHRISTIE verband SABOTAGE mit der Industrial-Szene in Chicago. Das Archiv verzeichnet Beiträge von DIE WARZAU zu HEARTS & BOMBS und FREIHEIT.',
      fr: 'Le travail avec JIM MARCUS et VAN CHRISTIE a relié SABOTAGE à la scène industrielle de Chicago. Les archives recensent les contributions de DIE WARZAU à HEARTS & BOMBS et FREIHEIT.',
      es: 'El trabajo con JIM MARCUS y VAN CHRISTIE conectó a SABOTAGE con la escena industrial de Chicago. El archivo recoge las aportaciones de DIE WARZAU a HEARTS & BOMBS y FREIHEIT.',
    }},
  ]},
  {title: 'REMIXES FOR OTHER ARTISTS', intro: {
    en: 'SABOTAGE has brought its electronic sound to recordings by artists across industrial and contemporary electronic music. The band has also created unofficial remixes of tracks by GRAUZONE, ZAHO DE SAGAZAN, QUEEN, BONEY M. and many others.',
    de: 'SABOTAGE hat den eigenen elektronischen Sound in Aufnahmen aus der Industrial-Szene und der zeitgenössischen elektronischen Musik eingebracht. Die Band hat auch inoffizielle Remixes von Stücken von GRAUZONE, ZAHO DE SAGAZAN, QUEEN, BONEY M. und vielen anderen gemacht.',
    fr: 'SABOTAGE a apporté son son électronique à des enregistrements issus de la scène industrielle et de l’électronique contemporaine. Le groupe a également réalisé des remixes non officiels de morceaux de GRAUZONE, ZAHO DE SAGAZAN, QUEEN, BONEY M. et de bien d’autres artistes.',
    es: 'SABOTAGE ha llevado su sonido electrónico a grabaciones de la escena industrial y de la música electrónica contemporánea. La banda también ha creado remezclas no oficiales de temas de GRAUZONE, ZAHO DE SAGAZAN, QUEEN, BONEY M. y muchos otros artistas.',
  }, entries: [
    {title: 'KRIEG-B', copy: 'COLD FRAGMENTS — SABOTAGE remix'},
    {title: 'ALMA MINUIT', copy: 'MON CŒUR — AUBE Mix\nMÉMÉ (feat. SALVA V.) — Dance Version\nPARIS N’EST PAS À VENDRE — ORAGE Remix'},
    {title: 'LACRIMOSA', copy: 'NOT EVERY PAIN HURTS — SABOTAGE QCQC? remix · DURCH NACHT UND FLUT (2002)'},
    {title: 'DISTORTED REALITY', copy: 'FEAR — SABOTAGE QCQC? remix (2003)'},
    {title: 'OOMPH!', copy: 'KRÜPPEL (Urteil Mix) — SABOTAGE QCQC? remix'},
    {title: 'AIBOFORCEN', copy: {
      en: 'Remix collaboration.',
      de: 'Remix-Kollaboration.',
      fr: 'Collaboration de remix.',
      es: 'Colaboración de remezcla.',
    }},
    {title: 'CALVA Y NADA / INTELLIGENCE', copy: {
      en: 'Further remix collaborations. The exact release and version for INTELLIGENCE are still being documented.',
      de: 'Weitere Remix-Kollaborationen. Die genaue Veröffentlichung und Version für INTELLIGENCE werden noch dokumentiert.',
      fr: 'Autres collaborations de remix. La sortie et la version exactes pour INTELLIGENCE restent à documenter.',
      es: 'Otras colaboraciones de remezcla. La edición y la versión exactas de INTELLIGENCE siguen pendientes de documentación.',
    }},
  ]},
  {title: 'REMIXES OF SABOTAGE', entries: [
    {title: 'APOPTYGMA BERZERK / KMFDM / A SPLIT-SECOND', copy: {
      en: 'STEPHAN GROTH remixed WHO AM I? for ANNORLUNDA. LES ENFANTS SAUVAGES includes the KMFDM remix of TO BE (Stripped Down) and the A SPLIT-SECOND remix of LA PASSION (Split Version). SUB CULTURE RECORDS reissued both releases digitally in 2026.',
      de: 'STEPHAN GROTH remixte WHO AM I? für ANNORLUNDA. LES ENFANTS SAUVAGES enthält den KMFDM-Remix von TO BE (Stripped Down) und den A SPLIT-SECOND-Remix von LA PASSION (Split Version). SUB CULTURE RECORDS legte beide Veröffentlichungen 2026 digital neu auf.',
      fr: 'STEPHAN GROTH a remixé WHO AM I? pour ANNORLUNDA. LES ENFANTS SAUVAGES comprend le remix de TO BE (Stripped Down) par KMFDM et celui de LA PASSION (Split Version) par A SPLIT-SECOND. SUB CULTURE RECORDS a réédité les deux disques en numérique en 2026.',
      es: 'STEPHAN GROTH remezcló WHO AM I? para ANNORLUNDA. LES ENFANTS SAUVAGES incluye la remezcla de TO BE (Stripped Down) por KMFDM y la de LA PASSION (Split Version) por A SPLIT-SECOND. SUB CULTURE RECORDS reeditó ambos lanzamientos en formato digital en 2026.',
    }},
    {title: 'THE CASSANDRA COMPLEX / FRONT 242 / BAL PARÉ', copy: {
      en: 'The remix archive also includes work by THE CASSANDRA COMPLEX, the GODDESS (Pure Mix) by FRONT 242 and the BAL PARÉ remix of GOD’S DAD (Anarchie Jetzt). More versions by artists including PANKOW and LASSIGUE BENDTHAUS can be found under Archive Credits.',
      de: 'Zum Remix-Archiv gehören außerdem Arbeiten von THE CASSANDRA COMPLEX, der GODDESS (Pure Mix) von FRONT 242 und der Remix von GOD’S DAD (Anarchie Jetzt) durch BAL PARÉ. Weitere Fassungen, unter anderem von PANKOW und LASSIGUE BENDTHAUS, stehen unter Archive Credits.',
      fr: 'Les archives comprennent aussi des travaux de THE CASSANDRA COMPLEX, le GODDESS (Pure Mix) de FRONT 242 et le remix de GOD’S DAD (Anarchie Jetzt) par BAL PARÉ. D’autres versions, notamment par PANKOW et LASSIGUE BENDTHAUS, figurent dans Archive Credits.',
      es: 'El archivo también recoge trabajos de THE CASSANDRA COMPLEX, el GODDESS (Pure Mix) de FRONT 242 y la remezcla de GOD’S DAD (Anarchie Jetzt) de BAL PARÉ. En Archive Credits figuran más versiones, entre ellas las de PANKOW y LASSIGUE BENDTHAUS.',
    }},
  ]},
  {title: 'PHOTOGRAPHY & VISUAL ART', entries: [
    {title: 'WILFRID MOULIN — PHOTOGRAPHY', copy: {
      en: 'MOULIN contributed cover photography for ANNORLUNDA, LES ENFANTS SAUVAGES and SEXPLOITATION CINEMA. HALVOR BODIN designed the covers of ANNORLUNDA and LES ENFANTS SAUVAGES.',
      de: 'MOULIN fotografierte die Cover von ANNORLUNDA, LES ENFANTS SAUVAGES und SEXPLOITATION CINEMA. HALVOR BODIN gestaltete die Cover von ANNORLUNDA und LES ENFANTS SAUVAGES.',
      fr: 'MOULIN a signé les photos de pochette d’ANNORLUNDA, de LES ENFANTS SAUVAGES et de SEXPLOITATION CINEMA. HALVOR BODIN a conçu les pochettes d’ANNORLUNDA et de LES ENFANTS SAUVAGES.',
      es: 'MOULIN realizó las fotografías de portada de ANNORLUNDA, LES ENFANTS SAUVAGES y SEXPLOITATION CINEMA. HALVOR BODIN diseñó las portadas de ANNORLUNDA y LES ENFANTS SAUVAGES.',
    }},
    {title: 'MAURO CHIAROTTO — ILLUSTRATION', copy: {
      en: 'CHIAROTTO created the distinctive artwork and illustrations for SEXPLOITATION CINEMA.',
      de: 'CHIAROTTO schuf das markante Artwork und die Illustrationen für SEXPLOITATION CINEMA.',
      fr: 'CHIAROTTO a créé le graphisme et les illustrations caractéristiques de SEXPLOITATION CINEMA.',
      es: 'CHIAROTTO creó el diseño y las ilustraciones de SEXPLOITATION CINEMA.',
    }},
  ]},
];

export const archiveFuture: Copy = {
  en: 'Throughout the 1990s SABOTAGE QCQC? appeared on numerous compilations, often with exclusive mixes or alternate versions. Some recordings are now difficult to find. Others are being rediscovered through original releases, archives and digital platforms. The work of documenting them could eventually lead to a dedicated RARITIES AND REMIXES COLLECTION.',
  de: 'SABOTAGE QCQC? waren in den Neunzigern auf zahlreichen Compilations vertreten, oft mit exklusiven Mixen oder alternativen Fassungen. Einige Aufnahmen sind heute schwer zu finden, andere werden über Originalveröffentlichungen, Archive und digitale Plattformen wiederentdeckt. Aus der laufenden Aufarbeitung könnte eine eigene RARITIES AND REMIXES COLLECTION entstehen.',
  fr: 'Dans les années 1990, SABOTAGE QCQC? a figuré sur de nombreuses compilations, souvent avec des mixes exclusifs ou des versions alternatives. Certains enregistrements sont aujourd’hui difficiles à trouver. D’autres refont surface grâce aux éditions originales, aux archives et aux plateformes numériques. Ce travail de documentation pourrait déboucher sur une RARITIES AND REMIXES COLLECTION.',
  es: 'Durante los noventa, SABOTAGE QCQC? participó en numerosas recopilaciones, a menudo con mezclas exclusivas o versiones alternativas. Algunas grabaciones son hoy difíciles de encontrar. Otras se redescubren gracias a las ediciones originales, los archivos y las plataformas digitales. Este trabajo de documentación podría dar lugar a una RARITIES AND REMIXES COLLECTION.',
};
