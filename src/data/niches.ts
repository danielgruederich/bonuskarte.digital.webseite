export type NicheSlug = 'cafes' | 'doener' | 'pizza' | 'restaurant'
export type FormType = 'full' | 'simple'

export interface NicheData {
  slug: NicheSlug
  fomoKey: 'cafe' | 'doener' | 'pizza' | 'restaurant' // key into VeedelData.fomoCount
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
    label: 'Café',
    emoji: '☕',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Cafés in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Cafés in {veedelName}. Ein fester Platz im Smartphone-Wallet eurer Gäste. Ohne App-Download, ohne Papierchaos.',
    heroCopy: {
      eyebrow: 'Cafés in {veedelName}',
      headlineLight: 'Macht aus Laufkundschaft',
      headlineBold: 'in {veedelName} eine Community.',
      bodyText: 'Digitale Kundenbindung für Kölner Institutionen. Ohne App-Download, ohne Papierchaos – ein fester Platz im Smartphone-Wallet eurer Gäste.',
      fomoText: '{fomoCount} Cafés in {veedelName} sind bereits dabei. Sei das nächste.',
      ctaLabel: 'Demo-Karte laden',
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
    label: 'Döner',
    emoji: '🥙',
    formType: 'simple',
    seoTitle: 'Digitaler Veedel-Chef | Stempelkarte für Dönerläden in {veedelName}',
    seoDescription: 'Sorge dafür, dass Kunden in {veedelName} nur zu DIR kommen. Digitale Stempelkarte direkt auf dem Handy. 90 Tage gratis.',
    heroCopy: {
      eyebrow: 'Für Dönerläden in {veedelName}',
      headlineLight: 'Sei der Veedel-Chef',
      headlineBold: 'in {veedelName}.',
      bodyText: 'In Köln gibt es Hunderte Dönerläden. Sorge dafür, dass die Kunden nur zu DIR kommen. Mit der digitalen Stempelkarte direkt auf dem Handy.',
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
    label: 'Pizzeria',
    emoji: '🍕',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Pizzerien in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Pizzerien in {veedelName}. Mehr Stammkunden, mehr Bestellungen. 90 Tage komplett kostenlos.',
    heroCopy: {
      eyebrow: 'Pizzerien in {veedelName}',
      headlineLight: 'Die Pizzeria,',
      headlineBold: 'die man nicht vergisst in {veedelName}.',
      bodyText: 'In Köln gibt es Pizza an jeder Ecke. Sorge dafür, dass Deine Kunden immer zu DIR bestellen. Mit der digitalen Stempelkarte direkt auf dem Handy.',
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
    label: 'Restaurant',
    emoji: '🍽️',
    formType: 'full',
    seoTitle: 'Digitale Stempelkarte für Restaurants in {veedelName} – 90 Tage gratis | bonuskarte.digital',
    seoDescription: 'Digitale Kundenbindung für Restaurants & Bistros in {veedelName}. Mehr Stammgäste, weniger Leerstand.',
    heroCopy: {
      eyebrow: 'Restaurants & Bistros in {veedelName}',
      headlineLight: 'Volle Tische.',
      headlineBold: 'Treue Gäste in {veedelName}.',
      bodyText: 'In Köln kämpfen Hunderte Restaurants um dieselben Gäste. Mit der digitalen Stempelkarte holst Du sie immer wieder zurück – direkt auf ihr Handy.',
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
]

export function getNicheBySlug(slug: string): NicheData | undefined {
  return niches.find(n => n.slug === slug)
}
