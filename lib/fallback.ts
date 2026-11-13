import type {Page,Release} from './content';
// Demo content only. It is intentionally marked as pending, not as published digital releases.
export const sampleReleases:Release[]=[{_id:'demo-vinyl',title:'NO BOTTOM - NO TOP',artist:'SABOTAGE QCQC?',category:'current',label:'EMMO.BIZ',coverUrl:'/assets/no-bottom-no-top.png',labelUrl:'https://www.emmobizrecords.de',releaseStatus:'announced',originalReleaseDate:'2027-01-15',editions:[{format:'Vinyl',color:'Black',quantity:100},{format:'Vinyl',color:'Red',quantity:50}],links:[{label:'EMMO.BIZ',url:'https://www.emmobizrecords.de',kind:'shop',enabled:true}]},{_id:'the-flood-single',title:'THE FLOOD (without bottom no top) - Single',artist:'SABOTAGE QCQC?',category:'current',releaseStatus:'available',coverUrl:'/assets/the-flood.png',description:{en:`Downstairs, it becomes a flood.

Inspired by the social architecture at the heart of Parasite, THE FLOOD is about above and below. About privilege and dependence. About those who enjoy the view — and those whose labour holds the entire structure up.

WE HOLD YOU UP.
YOU KEEP US DOWN.

Musically, THE FLOOD turns that pressure into physical force: 130 BPM, massive Taiko drums colliding with dry machine rhythms, industrial percussion and relentless sequences pushing forward without release.

It doesn’t accompany you.

It drives you.

Until rhythm becomes pressure.
Pressure becomes resistance.
And resistance begins to rise.

Because every hierarchy depends on what it places beneath itself.

WITHOUT THE BOTTOM
THERE IS NO TOP.

The flood is not a natural disaster.

It is the moment when what has been held down refuses to stay there.

This is part of the DNA of SABOTAGE: electronic music not as an escape from social reality, but as a force pushing against it.

Physical.
Confrontational.
Uncomfortable.
And made to move bodies as much as minds.

SAME CITY. DIFFERENT WEATHER.
WE HOLD YOU UP. YOU KEEP US DOWN.
WITHOUT THE BOTTOM THERE IS NO TOP.`},links:[{label:'Apple Music',url:'https://music.apple.com/us/album/the-flood-without-bottom-no-top-single/6817367441',kind:'stream',enabled:true},{label:'Amazon Music',url:'https://www.amazon.com/gp/product/B0HLFWW1B8',kind:'stream',enabled:true},{label:'Spotify',url:'https://open.spotify.com/intl-de/album/0Tbkwur2HQT3SXiwrlszVM',kind:'stream',enabled:true},{label:'All digital platforms',url:'https://distrokid.com/hyperfollow/sabotageqcqc/the-flood-without-bottom-no-top',kind:'stream',enabled:true}]},...['ANNORLUNDA','LES ENFANTS SAUVAGES','TUMULTE','DEUTSCHER HERBST ’77'].map((title,i)=>({_id:'demo-'+i,title,artist:'SABOTAGE QCQC?',category:'backCatalogue',label:'SubCulture Records',releaseStatus:'pending',...(i===0?{coverUrl:'/assets/annorlunda.png'}:i===1?{coverUrl:'/assets/les-enfants-sauvages.png'}:i===2?{coverUrl:'/assets/tumulte.png'}:i===3?{coverUrl:'/assets/deutscher-herbst-77.png'}:{})}))];
export const fallbackPage:Page={title:'Home',modules:[{_key:'hero',_type:'module_hero',heading:{en:'NO BOTTOM - NO TOP',de:'NO BOTTOM - NO TOP'},intro:{en:'NEW VINYL EP · 15 JAN 2027 · EMMO.BIZ',de:'NEUE VINYL-EP · 15. JAN 2027 · EMMO.BIZ'},releaseRefs:[sampleReleases[0]],enabled:true},{_key:'feature',_type:'module_releaseFeature',heading:{en:'LATEST RELEASE',de:'AKTUELLER RELEASE'},releaseRefs:[sampleReleases[0]],enabled:true},{_key:'single',_type:'module_releaseFeature',heading:{en:'THE FLOOD / SINGLE',de:'THE FLOOD / SINGLE'},intro:{en:'Listen to the single',de:'Single anhören'},releaseRefs:[sampleReleases[1]],enabled:true},{_key:'catalogue',_type:'module_releaseGrid',heading:{en:'BACK CATALOGUE',de:'BACK CATALOGUE'},intro:{en:'Original releases and planned digital re-releases. Dates and links only when confirmed.',de:'Originalveröffentlichungen und geplante digitale Re-Releases. Termine und Links erst nach Bestätigung.'},releaseRefs:sampleReleases.slice(2),enabled:true},{_key:'archive',_type:'module_archiveGrid',heading:{en:'THE ARCHIVE',de:'DAS ARCHIV'},intro:{en:'Original artwork, flyers, photography and press material. More material will follow.',de:'Original-Artworks, Flyer, Fotografien und Presseberichte. Weitere Materialien folgen.'},enabled:true},{_key:'news',_type:'module_newsGrid',heading:{en:'NEWS',de:'NEWS'},newsRefs:[{_id:'record-deals-2027',date:'2026-11-09',title:'SABOTAGE QCQC? – THE PAST RETURNS. THE FUTURE BEGINS.',body:{en:`SABOTAGE QCQC? SIGN TWO RECORD DEALS – BACK CATALOGUE RETURNS AS NEW ALBUM TAKES SHAPE

Two labels. Two countries. One new chapter.

German EBM and electro-punk pioneers SABOTAGE QCQC? are preparing for an eventful 2027, with two record deals connecting their musical past with an ambitious new future.

Following the announcement of their forthcoming vinyl EP NO BOTTOM - NO TOP, scheduled for release on January 15, 2027, through Germany's EMMO.BIZ Records, the band have also signed a digital distribution agreement with Norway's Sub Culture Records, run by longtime friend and label owner Per Aksel Lundgreen.

The collaboration will bring the band's extensive back catalogue to digital streaming and download platforms, making recordings from the early 1990s accessible to a new generation of listeners while reconnecting with longtime fans.

THE FIRST TWO RELEASES ARRIVE FRIDAY, NOVEMBER 13, 2026.

The campaign kicks off with the digital reissues of ANNORLUNDA (1994) and the full-length album LES ENFANTS SAUVAGES.

Further releases will follow over the coming months, including material from the band's 1993 album TUMULTE and other recordings from their extensive 1990s catalogue.

The plan is to make the historic recordings available digitally in time for the band's upcoming new releases.

FIRST THE VINYL. THEN A BRAND-NEW ALBUM.

On January 15, 2027, EMMO.BIZ Records will release NO BOTTOM - NO TOP, a limited-edition 12-inch vinyl EP featuring two brand-new compositions, THE FLOOD and IMPULS KONTAKT, alongside new interpretations of the SABOTAGE classics SOUVENIR and EWIGKEIT.

But this is only the beginning.

Following the vinyl release, SABOTAGE QCQC? are planning a completely new full-length studio album for later in 2027, marking their first new album since TUMULTE in 1993.

More than three decades after their last full-length release, the band are returning not simply to revisit their past, but to create something new.

Rooted in the uncompromising energy of electronic body music, industrial electronics and electro-punk, the new material carries the band's distinctive sound into the present, combining driving bass sequences, relentless rhythms and raw electronic intensity with a contemporary production approach.

A BACK CATALOGUE REDISCOVERED. A FUTURE REINVENTED.

With Sub Culture Records bringing their musical history back into circulation, EMMO.BIZ Records releasing new vinyl material and a completely new studio album planned for 2027, SABOTAGE QCQC? are entering one of the most active periods in their history.

The past and the future are finally coming together.

THE PAST IS NOT DEAD. IT'S JUST GETTING LOUDER.

SABOTAGE QCQC?

Physical release: EMMO.BIZ Records (Germany)

Digital back catalogue: Sub Culture Records (Norway)`}}],enabled:true},{_key:'statement',_type:'module_statement',heading:{en:'MUSIC FIRST.',de:'MUSIK ZUERST.'},intro:{en:'SABOTAGE QCQC? — electronic body music, electro-punk and industrial. New works and historical recordings, presented side by side.',de:'SABOTAGE QCQC? — Electronic Body Music, Electro-Punk und Industrial. Neue Werke und historische Aufnahmen, gleichberechtigt nebeneinander.'},enabled:true},{_key:'labels',_type:'module_linkGrid',heading:{en:'LABELS',de:'LABELS'},intro:{en:'Release partners',de:'Veröffentlichungspartner'},links:[{label:'EMMO.BIZ',url:'https://www.emmobizrecords.de',kind:'shop',enabled:true},{label:'Sub Culture Records',url:'https://www.facebook.com/norwegiansubculture',kind:'label',enabled:true}],enabled:true},{_key:'wear',_type:'module_linkGrid',heading:{en:'SABOTAGE WEAR',de:'SABOTAGE WEAR'},links:[{label:'SABOTAGE WEAR',url:'https://sabotage-wear.myspreadshop.de',kind:'shop',enabled:true}],enabled:true},{_key:'links',_type:'module_linkGrid',heading:{en:'LISTEN & FOLLOW',de:'HÖREN & FOLGEN'},links:[{label:'Instagram',url:'https://www.instagram.com/sabotageqcqc/',enabled:true},{label:'Facebook',url:'https://www.facebook.com/SABOTAGE2QC/',enabled:true},{label:'YouTube',url:'https://www.youtube.com/@SABOTAGEQCQC',enabled:true},{label:'SoundCloud',url:'https://soundcloud.com/marc-w-904754736',enabled:true},{label:'Apple Music — THE FLOOD',url:'https://music.apple.com/de/album/the-flood-without-bottom-no-top-single/6817367441',enabled:true},{label:'THE FLOOD — All platforms',url:'https://distrokid.com/hyperfollow/sabotageqcqc/the-flood-without-bottom-no-top',enabled:true},{label:'EMMO.BIZ',url:'https://www.emmobizrecords.de',enabled:true},{label:'Sub Culture Records',url:'https://www.facebook.com/norwegiansubculture',enabled:true},{label:'SABOTAGE WEAR',url:'https://sabotage-wear.myspreadshop.de',enabled:true}],enabled:true}]};
