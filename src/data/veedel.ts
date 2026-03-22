export interface VeedelData {
  name: string
  slug: string
  intro: string
  fomoCount: {
    cafe: number
    doener: number
    restaurant: number
    pizza: number
  }
}

// Köln neighborhoods with FOMO counts
// Update these numbers as real clients sign up
export const veedel: VeedelData[] = [
  { name: 'Nippes',        slug: 'nippes',        intro: 'Nippes ist eines der lebendigsten Kölner Veedel – von der Neusser Straße bis zum Wilhelmsplatz. Hier kennen sich Betreiber und Stammkunden noch persönlich. Genau der richtige Ort für eine digitale Stempelkarte.',        fomoCount: { cafe: 2, doener: 1, restaurant: 1, pizza: 0 } },
  { name: 'Ehrenfeld',     slug: 'ehrenfeld',     intro: 'Ehrenfeld ist Kölns kreativster Kiez – und einer der härtesten Gastro-Märkte der Stadt. An der Venloer Straße und Subbelrather Straße kämpfen Cafés, Imbisse und Restaurants Seite an Seite. Wer hier bestehen will, braucht Stammkunden.',     fomoCount: { cafe: 3, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Sülz',          slug: 'suelz',         intro: 'Sülz ist eines der beliebtesten Wohnviertel Kölns – ruhig, grün, mit einer treuen Stammkundschaft. Cafés und Restaurants in der Sülzburgstraße und rund um den Äußeren Grüngürtel profitieren besonders von Kundenbindung.',          fomoCount: { cafe: 2, doener: 1, restaurant: 0, pizza: 1 } },
  { name: 'Lindenthal',    slug: 'lindenthal',    intro: 'Lindenthal verbindet Studenten-Flair rund um die Universität mit gutbürgerlicher Stammkunden-Kultur. Betriebe in der Dürener Straße und am Stadtwald haben eine loyale Zielgruppe – die man halten muss.',    fomoCount: { cafe: 1, doener: 0, restaurant: 2, pizza: 0 } },
  { name: 'Deutz',         slug: 'deutz',         intro: 'Deutz wächst. Neue Bürokomplexe, das Rheinauhafen-Publikum, Messe-Besucher – und dazwischen eine gewachsene Nachbarschaft mit echtem Veedel-Charakter. Für Gastronomen hier ist Kundenbindung ein echtes Differenzierungsmerkmal.',         fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Mülheim',       slug: 'muelheim',      intro: 'Mülheim ist vielfältig, gewachsen und preisbewusst. Betriebe an der Mülheimer Freiheit oder rund um die Wiener Platz wissen: Wer einmal Stammkunde ist, kommt täglich wieder. Die digitale Stempelkarte ist hier oft der entscheidende Schritt.',       fomoCount: { cafe: 0, doener: 3, restaurant: 1, pizza: 1 } },
  { name: 'Kalk',          slug: 'kalk',          intro: 'Kalk entwickelt sich. Das aufstrebende Veedel mit wachsender Gastro-Szene hat eine Stammkundschaft, die ihren Lieblingsbetrieben treu bleibt – wenn man sie hält. Digitale Kundenkarten passen perfekt in dieses lebendige Kölner Quartier.',          fomoCount: { cafe: 1, doener: 3, restaurant: 0, pizza: 2 } },
  { name: 'Rodenkirchen',  slug: 'rodenkirchen',  intro: 'Rodenkirchen ist das ruhige, noble Südufer des Rheins. Die Café- und Restaurantkultur am Maternusplatz und am Rhein ist anspruchsvoll – und die Gäste kommen wieder, wenn das Erlebnis stimmt. Stempelkarten sind hier ein elegantes Kundenbindungsinstrument.',  fomoCount: { cafe: 2, doener: 0, restaurant: 2, pizza: 0 } },
  { name: 'Porz',          slug: 'porz',          intro: 'Porz im Kölner Süden hat eine starke lokale Identität. Von Urbach bis Zündorf: Betriebe hier bedienen echte Stammkunden aus der Nachbarschaft – und profitieren enorm davon, sie digital an sich zu binden.',          fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Chorweiler',    slug: 'chorweiler',    intro: 'Chorweiler ist ein urbaner Ballungsraum im Kölner Norden – mit großer Nachbarschaft und wenig gastronomischem Wettbewerb. Wer hier mit einer digitalen Stempelkarte sichtbar ist, hat einen echten Vorteil.',    fomoCount: { cafe: 0, doener: 2, restaurant: 0, pizza: 1 } },
  { name: 'Longerich',     slug: 'longerich',     intro: 'Longerich ist ein ruhiges Veedel im Kölner Norden mit treuer Laufkundschaft. Betriebe, die hier auf Stammkunden setzen, brauchen ein System – keine Papier-Karte, sondern etwas, das Gäste wirklich dabei haben.',     fomoCount: { cafe: 1, doener: 1, restaurant: 0, pizza: 0 } },
  { name: 'Bickendorf',    slug: 'bickendorf',    intro: 'Bickendorf liegt zwischen Ehrenfeld und dem Inneren Grüngürtel – ein gemischtes Veedel mit gewachsener Gastro-Kultur und Stammkunden, die ihre Lieblingsläden kennen und schätzen.',    fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 0 } },
  { name: 'Ossendorf',     slug: 'ossendorf',     intro: 'Ossendorf ist ein Kölner Stadtteil mit Industrie-Geschichte und lebendiger Nachbarschaft. Gastronomen hier haben eine Stammkundschaft, die es wert ist, gepflegt zu werden – mit mehr als einer Stempel auf Papier.',     fomoCount: { cafe: 0, doener: 1, restaurant: 1, pizza: 1 } },
  { name: 'Neuehrenfeld',  slug: 'neuehrenfeld',  intro: 'Neuehrenfeld grenzt an Ehrenfeld und teilt dessen Charme – ohne den gleichen Wettbewerbsdruck. Für Cafés und Imbisse hier ist es einfacher, Stammkunden zu gewinnen und zu halten. Eine digitale Stempelkarte gibt dem Vorteil eine klare Form.',  fomoCount: { cafe: 2, doener: 1, restaurant: 0, pizza: 0 } },
  { name: 'Innenstadt',    slug: 'innenstadt',    intro: 'Die Kölner Innenstadt ist das pulsierendste Gastro-Gebiet der Stadt. Rund um den Dom, auf der Hohen Straße, in der Altstadt und rund um den Rudolfplatz kämpfen Hunderte Betriebe um dieselben Laufkunden. Wer hier Stammkunden aufbaut, hat einen entscheidenden Vorteil.',    fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2 } },
]

export function getVeedelBySlug(slug: string): VeedelData | undefined {
  return veedel.find(v => v.slug === slug.toLowerCase())
}

// Fallback for unknown veedel
export const fallbackVeedel: VeedelData = {
  name: 'Köln',
  slug: 'koeln',
  fomoCount: { cafe: 5, doener: 4, restaurant: 3, pizza: 2 },
}
