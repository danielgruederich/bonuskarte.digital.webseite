export type NicheSlug = 'cafes' | 'doener' | 'pizza' | 'restaurant' | 'eiscafe' | 'baeckerei' | 'friseur' | 'fitnessstudio' | 'yoga' | 'blumenladen'
export type FomoKey = 'cafe' | 'doener' | 'pizza' | 'restaurant' | 'eiscafe' | 'baeckerei' | 'friseur' | 'fitnessstudio' | 'yoga' | 'blumenladen'
export type FormType = 'full' | 'simple'

export interface NicheData {
  slug: NicheSlug
  fomoKey: FomoKey    // key into VeedelData.fomoCount
  cardType: string    // z.B. "Stempelkarte", "Mitgliedskarte", "10er-Karte"
  label: string       // display name ("Café", "Döner", …)
  emoji: string
  formType: FormType  // 'full' = LeadForm (mit E-Mail), 'simple' = LeadForm variant="simple"
  seoTitle: string    // use {veedelName} as token
  seoDescription: string
  heroCopy: {
    eyebrow: string
    headlineLight: string
    headlineBold: string  // use {veedelName}
    bodyText: string
    fomoText: string      // use {veedelName} and {fomoCount}
    ctaLabel: string
  }
  walletMockup: {
    businessName: string
    reward: string
    stamped: number
    total: number
  }
  arguments: Array<{ icon: string; title: string; desc: string }>
  contentBody: string   // HTML, use {veedelName} token
}

export const niches: NicheData[] = [
  {
    slug: 'cafes',
    fomoKey: 'cafe',
    cardType: 'Stempelkarte',
    label: 'Café',
    emoji: '☕',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Cafés in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Cafés in {veedelName}. Ein fester Platz im Smartphone-Wallet eurer Gäste. Ohne App-Download, ohne Papierchaos.',
    heroCopy: {
      eyebrow: 'Cafés in {veedelName}',
      headlineLight: 'Mehr Stammkunden.',
      headlineBold: 'Dein Café in {veedelName}.',
      bodyText: 'Digitale Kundenbindung für dein Café. Ohne App-Download, ohne Papierchaos – ein fester Platz im Smartphone-Wallet eurer Gäste.',
      fomoText: '{fomoCount} Cafés in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Café Sonnenschein', reward: 'Gratis-Kaffee', stamped: 7, total: 10 },
    arguments: [
      { icon: '📱', title: 'Immer dabei', desc: 'Apple Wallet & Google Wallet. Keine App, keine Registrierung für eure Gäste.' },
      { icon: '🔔', title: 'Push-Nachrichten', desc: 'Erinnert Stammkunden an Aktionen – direkt auf dem Sperrbildschirm.' },
      { icon: '📊', title: 'Live-Statistiken', desc: 'Seht in Echtzeit, wie viele Karten aktiv sind und wie oft gestempelt wird.' },
    ],
    contentBody: '<p>Eine digitale Stempelkarte für Cafés in {veedelName} macht aus Laufkundschaft echte Stammgäste. Statt einer Papier-Karte, die in der Geldbörse zerknittern kann, lebt die Stempelkarte direkt in Apple Wallet oder Google Wallet – auf jedem Smartphone bereits vorinstalliert. Kein App-Download für deine Gäste, kein Aufwand für dich an der Theke.</p><p>So funktioniert es: Dein Gast scannt einmalig einen QR-Code, speichert die Karte und sammelt bei jedem Kaffee einen digitalen Stempel. Beim zehnten Stempel erscheint die Belohnung automatisch. Die Karte zeigt sich beim nächsten Besuch von alleine auf dem Sperrbildschirm – dein Café in {veedelName} bleibt immer präsent, ohne dass du etwas tun musst.</p><p>Als Inhaber siehst du in Echtzeit, wie viele Karten aktiv sind und wann gestempelt wird. Mit Push-Nachrichten erreichst du deine Stammgäste direkt aufs Handy – ohne Social-Media-Algorithmus, ohne Druckkosten. Neue Röstung, Karneval-Aktion oder geänderte Öffnungszeiten: deine Nachricht landet sicher beim richtigen Menschen. Cafés in {veedelName} die auf digitale Stempelkarten setzen, berichten von 30–40 % mehr Stammkunden-Besuchen im ersten halben Jahr.</p>',
  },
  {
    slug: 'doener',
    fomoKey: 'doener',
    cardType: 'Stempelkarte',
    label: 'Döner',
    emoji: '🥙',
    formType: 'simple',
    seoTitle: 'Digitaler Veedel-Chef | Stempelkarte für Dönerläden in {veedelName}',
    seoDescription: 'Sorge dafür, dass Kunden in {veedelName} nur zu DIR kommen. Digitale Stempelkarte direkt auf dem Handy. 90 Tage gratis.',
    heroCopy: {
      eyebrow: 'Für Dönerläden in {veedelName}',
      headlineLight: 'Sei der Veedel-Chef',
      headlineBold: 'in {veedelName}.',
      bodyText: 'Es gibt Hunderte Dönerläden in {veedelName}. Sorge dafür, dass die Kunden nur zu DIR kommen. Mit der digitalen Stempelkarte direkt auf dem Handy.',
      fomoText: '{fomoCount} Dönerläden in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Ehrenfeld Grill', reward: 'Gratis-Döner', stamped: 8, total: 10 },
    arguments: [
      { icon: '📱', title: 'Immer in der Tasche', desc: 'Dein Logo ist auf dem Handy Deines Kunden. Er sieht Dich jeden Tag – nicht die Konkurrenz.' },
      { icon: '🔥', title: 'Der "Nur noch 2"-Effekt', desc: 'Wenn der Kunde Hunger hat, sieht er: "Nur noch 2 Stempel bis zum Gratis-Döner". Er läuft an 3 anderen Läden vorbei, um zu Dir zu kommen.' },
      { icon: '📣', title: 'Direkter Draht', desc: 'Du hast ein neues Angebot? Schick Deinen Stammkunden eine Nachricht direkt aufs Handy.' },
    ],
    contentBody: '<p>In {veedelName} gibt es viele Dönerläden – aber nur wenige, die ihre Kunden aktiv binden. Eine digitale Stempelkarte direkt in Apple Wallet oder Google Wallet sorgt dafür, dass Kunden, die einmal bei dir waren, immer wiederkommen. Kein Zettel, kein App-Download: der Gast scannt beim ersten Besuch einen QR-Code, und die Karte ist dauerhaft auf seinem Handy gespeichert.</p><p>Der entscheidende Effekt: Wenn jemand in {veedelName} Hunger auf Döner hat und auf sein Handy schaut, sieht er deine Karte – und die Information „Nur noch 2 Stempel bis zum Gratis-Döner". Er läuft an drei anderen Läden vorbei und kommt zu dir. Das ist kein Zufall, das ist Psychologie. Die digitale Stempelkarte macht aus dem Impulskauf eine Gewohnheit.</p><p>Als Inhaber schickst du Push-Nachrichten direkt auf die Handys deiner Stammkunden in {veedelName} – für Tagesangebote, Ramadan-Aktionen oder neue Saucen. Keine Social-Media-Reichweite nötig, kein Algorithmus der dich ausbremst. Deine Nachricht kommt an. Dönerläden die bonuskarte.digital nutzen, berichten von bis zu 40 % mehr Stammkunden-Besuchen im ersten Quartal.</p>',
  },
  {
    slug: 'pizza',
    fomoKey: 'pizza',
    cardType: 'Stempelkarte',
    label: 'Pizzeria',
    emoji: '🍕',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Pizzerien in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Pizzerien in {veedelName}. Mehr Stammkunden, mehr Bestellungen. 90 Tage komplett kostenlos.',
    heroCopy: {
      eyebrow: 'Pizzerien in {veedelName}',
      headlineLight: 'Mehr Bestellungen.',
      headlineBold: 'Deine Pizzeria in {veedelName}.',
      bodyText: 'Pizza gibt es an jeder Ecke in {veedelName}. Sorge dafür, dass Deine Kunden immer zu DIR bestellen. Mit der digitalen Stempelkarte direkt auf dem Handy.',
      fomoText: '{fomoCount} Pizzerien in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Veedel Pizza', reward: 'Gratis-Pizza', stamped: 9, total: 10 },
    arguments: [
      { icon: '🍕', title: 'Der "Nur noch 1"-Effekt', desc: 'Wenn der Kunde Hunger hat, sieht er: "Nur noch 1 Stempel bis zur Gratis-Pizza". Er bestellt bei Dir – nicht bei der Konkurrenz.' },
      { icon: '📱', title: 'Im Wallet, nicht im Vergessen', desc: 'Dein Logo auf dem Sperrbildschirm Deines Kunden. Direkt in Apple & Google Wallet.' },
      { icon: '📣', title: 'Push-Nachrichten ohne Social Media', desc: 'Neues Tagesangebot? Direkter Push aufs Handy Deiner Stammkunden. Kein Algorithmus der Dich ausbremst.' },
    ],
    contentBody: '<p>Eine digitale Stempelkarte für Pizzerien in {veedelName} bindet sowohl Abholkunden als auch Lieferkunden – ohne separate App, ohne Registrierung. Dein Gast scannt beim ersten Besuch oder bei der ersten Bestellung einen QR-Code und hat die Karte dauerhaft in Apple Wallet oder Google Wallet. Bei jeder Pizza ein Stempel, bei der zehnten Pizza eine gratis.</p><p>Der Unterschied zur Papier-Stempelkarte: Die digitale Karte geht nicht verloren, kann nicht gefälscht werden und erscheint automatisch auf dem Sperrbildschirm wenn der Kunde in {veedelName} unterwegs ist. Wer Hunger hat und sein Handy zückt, sieht sofort: „Noch 2 Stempel bis zur Gratis-Pizza" – und bestellt bei dir statt bei der Konkurrenz. Das ist der Vorteil von sichtbarer Präsenz auf dem Gerät das Menschen 150-mal am Tag entsperren.</p><p>Push-Nachrichten direkt aufs Handy deiner Stammkunden in {veedelName} ermöglichen Tagesangebote, Pizza-des-Monats-Ankündigungen oder Sonderaktionen – ohne Social-Media-Budget, ohne Flyer-Druckkosten. Pizzerien die bonuskarte.digital einsetzen, steigern ihre Wiederbestellrate messbar innerhalb der ersten 90 Tage.</p>',
  },
  {
    slug: 'restaurant',
    fomoKey: 'restaurant',
    cardType: 'Punktekarte',
    label: 'Restaurant',
    emoji: '🍽️',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Restaurants in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Restaurants & Bistros in {veedelName}. Mehr Stammgäste, weniger Leerstand.',
    heroCopy: {
      eyebrow: 'Restaurants & Bistros in {veedelName}',
      headlineLight: 'Volle Tische.',
      headlineBold: 'Treue Gäste in {veedelName}.',
      bodyText: 'Hunderte Restaurants in {veedelName} kämpfen um dieselben Gäste. Mit der digitalen Kundenkarte holst Du sie immer wieder zurück – direkt auf ihr Handy.',
      fomoText: '{fomoCount} Restaurants in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Bistro am Dom', reward: 'Gratis-Dessert', stamped: 6, total: 10 },
    arguments: [
      { icon: '📱', title: 'Stammkunden, die wiederkommen', desc: 'Dein Restaurant bleibt auf dem Handy Deiner Gäste. Ein Blick auf die Karte – und der Tisch ist reserviert.' },
      { icon: '🔔', title: 'Push-Nachrichten', desc: 'Neues Saisonmenü, Freitagsspecial, Last-Minute-Tische? Direkt aufs Sperrbildschirm. Ohne Social-Media-Algorithmus.' },
      { icon: '🤝', title: 'Keine App für Deine Gäste', desc: 'Apple Wallet & Google Wallet – vorinstalliert auf jedem Smartphone. Kein Download, keine Registrierung nötig.' },
    ],
    contentBody: '<p>Restaurants in {veedelName} kämpfen um dieselben Gäste. Eine digitale Punktekarte sorgt dafür, dass Stammgäste nicht zum Nachbarlokal wechseln – weil sie bei dir Punkte sammeln, die echten Mehrwert bringen. Die Karte lebt in Apple Wallet oder Google Wallet, vorinstalliert auf jedem Smartphone. Kein App-Download, keine Anmeldung: ein QR-Code am Tisch oder an der Theke, und die Karte ist gespeichert.</p><p>Jeder Besuch bringt Punkte, die sich zu einem Gratis-Dessert, einem Freigetränk oder einem Rabatt summieren. Die Karte zeigt Gästen jederzeit ihren aktuellen Punktestand – das motiviert zur Wiederkehr. Gerade an schwachen Wochentagen in {veedelName} hilft eine gezielte Push-Nachricht: „Heute Abend noch Tische frei – doppelte Punkte bis 20 Uhr" landet direkt auf dem Sperrbildschirm deiner Stammkunden.</p><p>Im Dashboard siehst du in Echtzeit, welche Gäste aktiv sind, wann sie kommen und wie oft sie einlösen. So erkennst du frühzeitig wenn jemand ausbleibt – und kannst mit einem gezielten Push reagieren, bevor der Gast für immer weg ist. Restaurants in {veedelName} die digitale Kundenbindung einsetzen, berichten von deutlich stabilerer Auslastung auch in der schwachen Wochenmitte.</p>',
  },
  {
    slug: 'eiscafe',
    fomoKey: 'eiscafe',
    cardType: 'Stempelkarte',
    label: 'Eiscafé',
    emoji: '🍦',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Eiscafés in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Eiscafés in {veedelName}. Jede Kugel zählt. Mehr Stammkunden, mehr Umsatz. 90 Tage komplett kostenlos.',
    heroCopy: {
      eyebrow: 'Eiscafés in {veedelName}',
      headlineLight: 'Jede Kugel zählt.',
      headlineBold: 'Dein Eiscafé in {veedelName}.',
      bodyText: 'Mit der digitalen Stempelkarte holst du deine Gäste immer wieder zurück – direkt auf ihr Handy. Kein Papier, keine App.',
      fomoText: '{fomoCount} Eiscafés in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Eiscafé Sonnenschein', reward: 'Gratis-Eis', stamped: 7, total: 10 },
    arguments: [
      { icon: '🍦', title: 'Jede Kugel zählt', desc: 'Kunden sehen: „Nur noch 2 Stempel bis zum Gratis-Eis”. Sie kommen zu dir – nicht zur Konkurrenz.' },
      { icon: '📱', title: 'Im Wallet, nicht vergessen', desc: 'Dein Logo auf dem Sperrbildschirm. Apple & Google Wallet, kein App-Download.' },
      { icon: '📣', title: 'Push statt Flyer', desc: 'Saisonstart, neue Sorte, Happy Hour? Direkt aufs Handy deiner Stammkunden.' },
    ],
    contentBody: '<p>Eiscafés in {veedelName} haben eine treue Stammkundschaft – aber nur wenn der Gast immer wieder an dich erinnert wird. Eine digitale Stempelkarte in Apple Wallet oder Google Wallet sorgt dafür, dass dein Eiscafé täglich auf dem Handy deiner Gäste sichtbar ist. Kein App-Download nötig: einmal QR-Code scannen, Karte speichern, fertig. Ab sofort sammelt der Gast bei jedem Besuch digital Stempel.</p><p>Der Effekt ist messbar: Wer sieht dass er noch zwei Stempel bis zum Gratis-Eis braucht, läuft in {veedelName} an anderen Eiscafés vorbei und kommt zu dir. Die Karte verschwindet nicht in einer Schublade wie ein Papierblock – sie lebt auf dem Sperrbildschirm. Gerade im Sommer, wenn die Konkurrenz in {veedelName} besonders dicht ist, macht dieser Unterschied pro Woche messbar mehr Umsatz.</p><p>Mit Push-Nachrichten informierst du deine Stammgäste über Saisonstart, neue Eissorten oder Happy-Hour-Aktionen – direkt aufs Handy, ohne Werbebudget. Eiscafés nutzen Push auch zum Saisonende: „Letzte Woche der Saison – heute alle Sorten zum halben Preis” funktioniert besser als jedes Plakat in {veedelName}.</p>',
  },
  {
    slug: 'baeckerei',
    fomoKey: 'baeckerei',
    cardType: 'Stempelkarte',
    label: 'Bäckerei',
    emoji: '🥐',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Bäckereien in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Bäckereien in {veedelName}. Brötchen holen wird belohnt – direkt im Smartphone-Wallet. 90 Tage kostenlos.',
    heroCopy: {
      eyebrow: 'Bäckereien in {veedelName}',
      headlineLight: 'Jeden Morgen.',
      headlineBold: 'Deine Bäckerei in {veedelName}.',
      bodyText: 'Brötchen holen ist Gewohnheit. Mach deine Bäckerei zur ersten Wahl – mit der digitalen Stempelkarte direkt auf dem Handy deiner Kunden.',
      fomoText: '{fomoCount} Bäckereien in {veedelName} sind bereits dabei. Sei die nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Bäckerei Sonnenkorn', reward: 'Gratis-Brot', stamped: 8, total: 10 },
    arguments: [
      { icon: '📱', title: 'Tägliche Sichtbarkeit', desc: 'Dein Logo auf dem Sperrbildschirm – jeden Morgen. Deine Kunden denken zuerst an dich.' },
      { icon: '🔥', title: 'Der "Nur noch 2"-Effekt', desc: 'Kunden sehen: „Nur noch 2 Stempel bis zum Gratis-Brot." Sie kommen zu dir – nicht zum Discounter.' },
      { icon: '📣', title: 'Push statt Plakat', desc: 'Neues Saisonbrot, Oster-Aktion, Frühstücksangebot? Direkt aufs Handy deiner Stammkunden.' },
    ],
    contentBody: '<p>Brötchen holen ist Gewohnheit – und Gewohnheiten lassen sich formen. Eine digitale Stempelkarte für deine Bäckerei in {veedelName} sorgt dafür, dass deine Kunden jeden Morgen an dich denken, weil die Karte im Apple Wallet oder Google Wallet direkt auf dem Sperrbildschirm erscheint. Kein App-Download, keine Anmeldung: ein einmaliger QR-Code-Scan, und die Karte ist dauerhaft auf dem Handy.</p><p>Jeder Kauf bringt einen Stempel. Beim zehnten Stempel gibt es ein Gratis-Brot oder ein Frühstück – je nachdem was du als Belohnung setzt. Kunden in {veedelName} die noch zwei Stempel brauchen, gehen nicht zum Discounter um die Ecke. Sie kommen zu dir. Der Aufwand an der Theke ist minimal: einmal das Dashboard einrichten, dann stempeln per Smartphone-Kamera oder festem QR-Code an der Kasse.</p><p>Push-Nachrichten machen aus deiner Bäckerei in {veedelName} ein Kommunikations-Medium. Neues Saisonbrot? Karnevals-Berliner ab morgen? Samstags-Frühstücksbuffet? Deine Stammkunden erfahren es zuerst – direkt aufs Handy, kostenfrei, ohne Social-Media-Algorithmus. Bäckereien berichten von deutlich mehr Mehrfachkäufen pro Woche nach Einführung der digitalen Stempelkarte.</p>',
  },
  {
    slug: 'friseur',
    fomoKey: 'friseur',
    cardType: 'Stempelkarte',
    label: 'Friseur',
    emoji: '💇',
    formType: 'full',
    seoTitle: 'Digitale Kundenkarte für Friseure in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Friseure & Barbershops in {veedelName}. Stammkunden belohnen, Termine füllen. 90 Tage kostenlos.',
    heroCopy: {
      eyebrow: 'Friseure & Barbershops in {veedelName}',
      headlineLight: 'Immer ausgebucht.',
      headlineBold: 'Dein Salon in {veedelName}.',
      bodyText: 'Deine Kunden kommen alle 4–6 Wochen. Sorge dafür, dass sie jedes Mal zu DIR kommen – mit der digitalen Stempelkarte direkt im Wallet.',
      fomoText: '{fomoCount} Friseure in {veedelName} sind bereits dabei. Sei der nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Salon Haargenau', reward: 'Gratis-Schnitt', stamped: 5, total: 6 },
    arguments: [
      { icon: '📱', title: '6 Schnitte, 1 gratis', desc: 'Deine Kunden sammeln Besuche und bekommen den nächsten Schnitt geschenkt. Einfach, fair, effektiv.' },
      { icon: '🔔', title: 'Terminerinnerung per Push', desc: '„Zeit für einen neuen Schnitt?" – direkt auf dem Sperrbildschirm. Kein Anruf, kein Social Media nötig.' },
      { icon: '🤝', title: 'Kein App-Download', desc: 'Apple Wallet & Google Wallet – vorinstalliert auf jedem Smartphone. Deine Kunden speichern die Karte in Sekunden.' },
    ],
    contentBody: '<p>Kunden kommen alle vier bis sechs Wochen zum Friseur – aber nicht immer zum selben. Eine digitale Kundenkarte für deinen Salon in {veedelName} sorgt dafür, dass deine Stammkunden beim nächsten Termin automatisch an dich denken. Die Karte liegt dauerhaft in Apple Wallet oder Google Wallet auf dem Handy, wird nie verloren und zeigt beim nächsten Öffnen sofort: „Noch 2 Besuche bis zum Gratis-Schnitt."</p><p>Die Einrichtung ist simpel: Deine Kunden scannen einmal einen QR-Code bei der Kasse, die Karte ist gespeichert. Bei jedem Besuch stempelst du digital – per Smartphone-Kamera oder festem QR-Code am Empfang. Nach sechs Besuchen gibt es den siebten kostenlos. Kein Papierblock, keine verlorene Karte, kein Betrug. In {veedelName} wo viele Salons um dieselben Kunden konkurrieren, ist das ein echter Differenzierungsfaktor.</p><p>Push-Nachrichten machen den entscheidenden Unterschied: Wenn jemand seit fünf Wochen nicht war, schickst du eine kurze Nachricht direkt aufs Handy – „Lange nicht gesehen – dein nächster Termin wartet." Das füllt schwache Tage und holt Kunden zurück, bevor sie dauerhaft zum Konkurrenten in {veedelName} wechseln. Friseure berichten von 25 % mehr Wiederbuchungen nach Einführung der digitalen Stempelkarte.</p>',
  },
  {
    slug: 'fitnessstudio',
    fomoKey: 'fitnessstudio',
    cardType: 'Mitgliedskarte',
    label: 'Fitnessstudio',
    emoji: '💪',
    formType: 'full',
    seoTitle: 'Digitale Mitgliedskarte für Fitnessstudios in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitaler Mitgliedsausweis für Fitnessstudios in {veedelName}. Direkt im Smartphone-Wallet, automatische Verlängerung, Push-Nachrichten.',
    heroCopy: {
      eyebrow: 'Fitnessstudios in {veedelName}',
      headlineLight: 'Mehr Mitglieder.',
      headlineBold: 'Dein Studio in {veedelName}.',
      bodyText: 'Der digitale Mitgliedsausweis direkt im Wallet deiner Mitglieder. Kein Plastik, kein Vergessen, kein Aufwand an der Theke.',
      fomoText: '{fomoCount} Fitnessstudios in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'FitVeedel', reward: 'Gratis-Monat', stamped: 9, total: 12 },
    arguments: [
      { icon: '📱', title: 'Digitaler Mitgliedsausweis', desc: 'Kein Plastikkarten-Chaos mehr. Deine Mitglieder haben ihren Ausweis immer dabei – im Smartphone.' },
      { icon: '🔔', title: 'Push-Nachrichten an Mitglieder', desc: 'Neuer Kursplan, Studio-Event, Sonderaktion? Direkt aufs Handy – ohne Social-Media-Algorithmus.' },
      { icon: '📊', title: 'Mitglieder-Statistiken', desc: 'Sieh in Echtzeit, wie viele Mitglieder aktiv sind. Erkenne Abwanderung, bevor es zu spät ist.' },
    ],
    contentBody: '<p>Mitglieder, die ihren Ausweis vergessen, stehen an der Theke und blockieren den Check-in. Eine digitale Mitgliedskarte für dein Fitnessstudio in {veedelName} löst das Problem dauerhaft: Die Karte liegt in Apple Wallet oder Google Wallet, ist immer auf dem Handy und zeigt auf einen Blick den aktuellen Mitgliedsstatus. Kein Suchen, kein Erklären, kein Papierkram.</p><p>Über das Dashboard siehst du in Echtzeit, wer aktiv trainiert und wer seit Wochen nicht mehr aufgetaucht ist. Das ist Gold wert: Statt erst nach der Kündigung zu reagieren, schickst du einen Push – „Hey, wir vermissen dich im Studio" – bevor das Mitglied kündigt. In {veedelName} wo Boutique-Studios und Ketten um dieselben Mitglieder konkurrieren, macht dieser direkte Kanal den Unterschied.</p><p>Push-Nachrichten für neue Kurspläne, Events oder Aktionen erreichen deine Mitglieder ohne Social-Media-Algorithmus – direkt auf dem Sperrbildschirm. Kein Boost nötig, keine organische Reichweite, die wegbricht. Studios in {veedelName} berichten von 30 % weniger No-Shows nach der Einführung von Push-Erinnerungen vor Kursen.</p>',
  },
  {
    slug: 'yoga',
    fomoKey: 'yoga',
    cardType: '10er-Karte',
    label: 'Yoga-Studio',
    emoji: '🧘',
    formType: 'full',
    seoTitle: 'Digitale 10er-Karte für Yoga-Studios in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale 10er-Karte für Yoga- & Pilates-Studios in {veedelName}. Kurse buchen, Stunden tracken – direkt im Wallet. 90 Tage kostenlos.',
    heroCopy: {
      eyebrow: 'Yoga- & Pilates-Studios in {veedelName}',
      headlineLight: 'Volle Kurse.',
      headlineBold: 'Dein Studio in {veedelName}.',
      bodyText: 'Die digitale 10er-Karte für dein Studio. Kunden kaufen ein Paket, lösen Stunden ein – alles direkt im Wallet. Kein Papier, kein Zettelchaos.',
      fomoText: '{fomoCount} Yoga-Studios in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Yoga am Rhein', reward: 'Gratis-Stunde', stamped: 8, total: 10 },
    arguments: [
      { icon: '📱', title: '10er-Karte im Wallet', desc: 'Deine Kunden sehen jederzeit, wie viele Stunden sie noch haben. Kein Nachfragen, keine Zettel.' },
      { icon: '🔔', title: 'Kursplan per Push', desc: 'Neue Kurse, geänderte Zeiten, Vertretung? Deine Teilnehmer erfahren es sofort – direkt auf dem Handy.' },
      { icon: '🔥', title: 'Nachkauf-Effekt', desc: '„Noch 1 Stunde übrig" – deine Kunden buchen rechtzeitig das nächste Paket, bevor sie abspringen.' },
    ],
    contentBody: '<p>Eine digitale 10er-Karte für dein Yoga- oder Pilates-Studio in {veedelName} macht Schluss mit dem Zettelchaos: Kein ausgestanzter Papierblock, keine Stempel, die unleserlich werden. Die Karte liegt im Wallet des Kunden, zeigt sofort den aktuellen Stundenstand und aktualisiert sich automatisch nach jeder eingelösten Stunde. Teilnehmer wissen immer, was sie noch haben – ohne dich fragen zu müssen.</p><p>Der Nachkauf-Effekt ist der entscheidende Hebel: Wenn auf der Karte noch eine oder zwei Stunden stehen, sieht dein Kunde das täglich. Ist die Karte fast leer, schickst du automatisch einen Push – „Nur noch 1 Stunde – jetzt verlängern." Das reduziert die Lücke zwischen zwei Paketen auf ein Minimum und hält die Teilnehmer in der Routine, die ihr Yoga-Habit trägt. Studios in {veedelName} verlieren die meisten Kunden in genau dieser Pause.</p><p>Push-Nachrichten für Kursänderungen oder neue Formate erreichen alle aktiven Karteninhaber sofort. In {veedelName} wo sich kleine Studios gegen günstige Online-Angebote behaupten müssen, ist direkte Kommunikation ohne Plattform-Abhängigkeit ein echter Wettbewerbsvorteil. Keine Algorithmen, keine Streuverluste – nur deine Teilnehmer, direkt auf dem Handy.</p>',
  },
  {
    slug: 'blumenladen',
    fomoKey: 'blumenladen',
    cardType: 'Geschenkkarte',
    label: 'Blumenladen',
    emoji: '💐',
    formType: 'full',
    seoTitle: 'Digitale Geschenkkarte für Blumenläden in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Geschenk- & Kundenkarte für Blumenläden in {veedelName}. Kunden verschenken Sträuße digital, du gewinnst Stammkunden. 90 Tage kostenlos.',
    heroCopy: {
      eyebrow: 'Blumenläden in {veedelName}',
      headlineLight: 'Blumen verschenken.',
      headlineBold: 'Digital. In {veedelName}.',
      bodyText: 'Die digitale Geschenkkarte für deinen Blumenladen. Kunden verschenken Sträuße per Link – und du gewinnst neue Stammkunden, die wiederkommen.',
      fomoText: '{fomoCount} Blumenläden in {veedelName} sind bereits dabei. Sei der nächste.',
      ctaLabel: 'Jetzt 90 Tage gratis testen',
    },
    walletMockup: { businessName: 'Blütenreich', reward: 'Gratis-Strauß', stamped: 7, total: 10 },
    arguments: [
      { icon: '📱', title: 'Geschenkkarte per Link', desc: 'Deine Kunden verschenken einen Strauß per WhatsApp oder E-Mail. Der Beschenkte löst ihn bei dir ein.' },
      { icon: '🔔', title: 'Anlass-Erinnerung', desc: 'Muttertag, Valentinstag, Jahrestag – erinnere deine Kunden per Push, bevor sie es vergessen.' },
      { icon: '🤝', title: 'Neue Kunden gewinnen', desc: 'Jede Geschenkkarte bringt einen neuen Kunden in deinen Laden. Aus Beschenkten werden Stammkunden.' },
    ],
    contentBody: '<p>Ein Blumenladen lebt von Stammkunden und Anlässen. Eine digitale Kundenkarte für deinen Blumenladen in {veedelName} kombiniert beides: Stammkunden sammeln Punkte bei jedem Kauf, und mit Anlass-Erinnerungen per Push bist du zur richtigen Zeit präsent – eine Woche vor Muttertag, Valentinstag oder dem Jahrestag, den dein Kunde eingetragen hat. Das bedeutet mehr Spontankäufe und weniger verpasste Umsätze.</p><p>Die Einrichtung dauert weniger als 30 Minuten: Karte gestalten, QR-Code ausdrucken, an die Theke stellen. Deine Kunden scannen einmal und haben die Karte dauerhaft im Wallet. Bei jedem Besuch stempelst du digital, nach zehn Besuchen gibt es einen Gratis-Strauß. In {veedelName} wo Blumenläden oft gegen den Supermarkt-Stichel an der Ecke kämpfen, ist die persönliche Bindung der entscheidende Vorteil – und eine Karte im Wallet erinnert daran täglich.</p><p>Das Geschenkkarten-Feature ist der Wachstumshebel: Kunden verschenken per WhatsApp einen Strauß-Gutschein direkt aus der Wallet-Karte. Der Beschenkte kommt zum ersten Mal in deinen Laden – und wird durch das gute Erlebnis selbst zum Stammkunden. So wächst dein Kundenstamm in {veedelName} organisch, ohne Werbung.</p>',
  },
]

export function getNicheBySlug(slug: string): NicheData | undefined {
  return niches.find(n => n.slug === slug)
}
