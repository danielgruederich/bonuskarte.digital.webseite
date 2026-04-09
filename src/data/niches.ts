export type NicheSlug = 'cafes' | 'doener' | 'pizza' | 'restaurant' | 'eiscafe' | 'baeckerei' | 'friseur' | 'fitnessstudio' | 'yoga' | 'blumenladen'
export type FomoKey = 'cafe' | 'doener' | 'pizza' | 'restaurant' | 'eiscafe' | 'baeckerei' | 'friseur' | 'fitnessstudio' | 'yoga' | 'blumenladen'
export type FormType = 'full' | 'simple'

export interface NicheData {
  slug: NicheSlug
  fomoKey: FomoKey    // key into VeedelData.fomoCount
  cardType: string    // z.B. "Stempelkarte", "Mitgliedskarte", "10er-Karte"
  label: string       // display name ("Café", "Döner", …)
  emoji: string
  formType: FormType  // 'full' = LeadForm, 'simple' = LeadFormDoener
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
      { icon: '🍦', title: 'Jede Kugel zählt', desc: 'Kunden sehen: „Nur noch 2 Stempel bis zum Gratis-Eis“. Sie kommen zu dir – nicht zur Konkurrenz.' },
      { icon: '📱', title: 'Im Wallet, nicht vergessen', desc: 'Dein Logo auf dem Sperrbildschirm. Apple & Google Wallet, kein App-Download.' },
      { icon: '📣', title: 'Push statt Flyer', desc: 'Saisonstart, neue Sorte, Happy Hour? Direkt aufs Handy deiner Stammkunden.' },
    ],
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
  },
]

export function getNicheBySlug(slug: string): NicheData | undefined {
  return niches.find(n => n.slug === slug)
}
