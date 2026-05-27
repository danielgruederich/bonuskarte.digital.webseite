export interface GruenderCityConfig {
  city: string                        // slug, lowercase, e.g. 'koeln'
  cityCapitalized: string             // e.g. 'Köln'
  cityDative: string                  // e.g. 'Kölner' (used in pre-headline)
  faq: { q: string; a: string }[]
}

export const koeln: GruenderCityConfig = {
  city: 'koeln',
  cityCapitalized: 'Köln',
  cityDative: 'Kölner',
  faq: [
    {
      q: 'Was passiert nach dem Absenden?',
      a: 'Wir melden uns innerhalb 24 h per WhatsApp und Telefon. Im Gespräch klären wir Branding (Logo, Farbe, Belohnung), Bezahlweg (Rechnung per E-Mail, SEPA oder klassische Überweisung) und den Setup-Termin. Deine Karte ist in unter 24 h nach Zahlungseingang live.',
    },
    {
      q: 'Wie zahle ich die 100 €?',
      a: 'Nach unserem Telefonat schicken wir dir eine Rechnung per E-Mail. Du zahlst per SEPA-Überweisung oder klassischer Überweisung. Keine Kreditkarte nötig, kein Abo-Vertrag mit versteckten Klauseln.',
    },
    {
      q: 'Was bedeutet die 90-Tage-Geld-zurück-Garantie?',
      a: 'Du startest mit dem vollen Funktionsumfang. Wenn du innerhalb von 90 Tagen ab Zahlungseingang merkst, dass die Karte für deinen Betrieb nicht das Richtige ist, schreibst du uns kurz — wir erstatten die 100 € ohne Rückfragen.',
    },
    {
      q: 'Was, wenn ich später Standorte dazunehme?',
      a: 'Dein Gründer-Tarif gilt für einen Standort. Zusätzliche Standorte buchst du regulär als Solo-Abos (29 €/Monat pro Standort) oder steigst ab 10 Standorten auf den Kette-Tarif (100 €/Monat Flatrate) um. Dein Gründer-Standort bleibt ohne Folgekosten.',
    },
    {
      q: 'Was, wenn die 100 Plätze voll sind?',
      a: 'Dann gibt es das Angebot nicht mehr. Wir vergeben Plätze in der Reihenfolge, in der bezahlte Verträge bei uns eingehen. Eine Reservierungs-Anfrage zählt zeitlich; der Platz ist aber erst bestätigt, sobald die Bezahlung bei uns eingegangen ist.',
    },
  ],
}
