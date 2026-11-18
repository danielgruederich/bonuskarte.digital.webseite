/**
 * Changelog / „Was ist neu“
 *
 * Quelle: Release-Notes der Plattform. Hier stehen die Änderungen, die
 * Händler im Konto tatsächlich sehen. Interne Themen (Agentur-Rechte,
 * Marktplatz-Tokens, White-Label-Onboarding, reine API-Feinheiten) bleiben
 * draußen — sie helfen keinem Café, Friseur oder Studio.
 *
 * Neuer Eintrag: oben in `releases` einfügen, Datum als ISO-String.
 * Kein Token-Swap, keine erfundenen Funktionen — nur was im Release stand.
 */

export type ChangeKind = 'neu' | 'verbessert' | 'behoben'

export interface Change {
  kind: ChangeKind
  title: string
  text: string
}

export interface Release {
  /** ISO-Datum, z. B. '2026-11-13' */
  iso: string
  /** Anzeige-Datum, z. B. '13. November 2026' */
  date: string
  items: Change[]
}

export const KIND_LABEL: Record<ChangeKind, string> = {
  neu: 'Neu',
  verbessert: 'Verbessert',
  behoben: 'Behoben',
}

export const releases: Release[] = [
  {
    iso: '2026-11-13',
    date: '13. November 2026',
    items: [
      {
        kind: 'verbessert',
        title: 'KI-Assistent kündigt Aktionen klarer an',
        text: 'Bevor der KI-Assistent einen Workflow pausiert oder ein Spiel ändert, zeigt er deutlicher, was passiert: Eine Pause kann wartende Läufe verwerfen, Spiele sind öffentliche Seiten.',
      },
      {
        kind: 'behoben',
        title: 'Stornierte Einlösungen geben Punkte und Cashback zurück',
        text: 'Wird eine Einlösung storniert, landen Punkte oder Cashback wieder auf der Karte, statt ein zweites Mal abgezogen zu werden. Bereits gebuchte alte Salden wurden nicht automatisch korrigiert.',
      },
      {
        kind: 'behoben',
        title: 'Große Exporte starten zuverlässiger',
        text: 'Kunden- und Transaktionsexporte brechen seltener ab, während die Datei erzeugt wird. Der Export startet sofort und wird danach im Hintergrund vorbereitet.',
      },
      {
        kind: 'behoben',
        title: 'Kundensegmente aktualisieren stabiler',
        text: 'Passt ein Kunde in kein RFM-Intervall, behält er sein aktuelles Segment, statt das Update abzubrechen. Das betrifft Grenztage.',
      },
    ],
  },
  {
    iso: '2026-11-11',
    date: '11. November 2026',
    items: [
      {
        kind: 'neu',
        title: 'Karten ohne Barcode',
        text: 'Als Barcode-Typ lässt sich jetzt „Ohne Code“ wählen. Praktisch, wenn dein eigener QR-Code ohnehin Teil des Kartendesigns ist und kein zweiter Code darauf soll.',
      },
      {
        kind: 'verbessert',
        title: 'KI-Texte fallen sicher aus',
        text: 'Liefert der KI-Dienst keinen brauchbaren Text, bricht der Vorgang sauber ab, statt eine leere Werbe-Mail oder einen leeren Vorschlag zu verschicken.',
      },
    ],
  },
  {
    iso: '2026-11-10',
    date: '10. November 2026',
    items: [
      {
        kind: 'verbessert',
        title: 'Buttons unter der Karte auch in der Web-App',
        text: 'Die Buttons unter der Karte erscheinen jetzt auch auf PWA-Karten, nicht nur in Apple Wallet und Google Wallet. Kunden können direkt deinen Link öffnen oder dich anrufen.',
      },
      {
        kind: 'verbessert',
        title: 'Per API erstellte Webhooks im Dashboard',
        text: 'Webhooks aus der API oder dem KI-Assistenten stehen jetzt unter Einstellungen → Webhooks — auch die, die früher angelegt wurden.',
      },
      {
        kind: 'behoben',
        title: 'Rückgängig gemachte Einlösungen geben Punkte zurück',
        text: 'Wird eine Einlösung rückgängig gemacht, gehen Punkte, Cashback oder Belohnung zurück auf die Karte. Vorher konnte die Karte sie ein zweites Mal verlieren.',
      },
      {
        kind: 'behoben',
        title: 'Belohnung wird pro Bon nur einmal eingelöst',
        text: 'Wird eine Zahlung neu gestartet, wird die Belohnung nur einmal eingelöst. Kunden verlieren keine zusätzlichen Punkte, Stempel oder Cashback.',
      },
      {
        kind: 'behoben',
        title: 'Karten mit langer Historie öffnen schneller',
        text: 'Karten mit sehr vielen Buchungen öffnen im Dashboard und im Scanner zügig, und die Wallet-Pässe aktualisieren ohne Verzögerung.',
      },
    ],
  },
  {
    iso: '2026-11-07',
    date: '7. November 2026',
    items: [
      {
        kind: 'behoben',
        title: 'Google-Wallet-Updates sind robuster',
        text: 'Meldet Google kurz einen temporären Fehler, wird das Update einmal wiederholt. Karten bleiben seltener veraltet, Pushes gehen seltener verloren.',
      },
    ],
  },
  {
    iso: '2026-11-06',
    date: '6. November 2026',
    items: [
      {
        kind: 'neu',
        title: 'Autopushes per API und KI-Assistent verwalten',
        text: 'Interne und eigene Autopushes lassen sich jetzt auch außerhalb des Dashboards anlegen, auflisten, bearbeiten und löschen — etwa um sie nach der Zahlung automatisch einzurichten.',
      },
      {
        kind: 'verbessert',
        title: 'Externes WhatsApp nur mit Risiko-Bestätigung',
        text: 'Beim Verbinden einer inoffiziellen WhatsApp-Nummer erscheint ein klarer Hinweis und muss bestätigt werden. Ist offizielles WhatsApp Business verfügbar, führt der Hinweis direkt dorthin.',
      },
      {
        kind: 'verbessert',
        title: 'Genauere iOS-Vorschau für einen Karten-Button',
        text: 'Ein einzelner Button unter der Karte wird in der Vorschau als volle Breite im Apple-Wallet-Stil gezeigt. Bei zwei Buttons bleiben es zwei halbe Kacheln.',
      },
      {
        kind: 'behoben',
        title: 'Empfehlungsbedingungen auf der Kartenrückseite',
        text: 'Die Rückseite von Apple- und Google-Wallet-Pässen zeigt jetzt die Konditionen des Empfehlungsprogramms: was der Werber bekommt, was der Freund bekommt und wann die Belohnung gutgeschrieben wird.',
      },
      {
        kind: 'behoben',
        title: 'Neue Vorlagen übernehmen das Land aus dem Profil',
        text: 'Vorwahl-Format und Telefonnummer des Ausstellers richten sich nach dem Land im Firmenprofil. Fehlt das Land, gilt weiter die Sprache; bestehende Vorlagen bleiben unverändert.',
      },
      {
        kind: 'behoben',
        title: 'SVG-App-Icons laden korrekt hoch',
        text: 'Ein SVG als App-Icon für White-Label-Branding führt nicht mehr zu einem Serverfehler und lässt keine alten, anders skalierten Icons zurück. Ungültige Bilddateien werden sauber abgelehnt.',
      },
      {
        kind: 'behoben',
        title: 'Tagesstatistiken mit korrekter Zeitzone',
        text: 'Tageswerte im Dashboard werden mit einheitlichen Zeitzonen-Regeln berechnet und landen nicht mehr am falschen Nachbartag — das betraf Regionen wie Teile Kanadas und Marokkos.',
      },
      {
        kind: 'behoben',
        title: 'Transaktionssuche bei großen Vorlagen schneller',
        text: 'Die Suche in der Transaktionsliste läuft bei großen Vorlagen nicht mehr in ein Timeout. Ergebnisse und Format bleiben gleich.',
      },
    ],
  },
  {
    iso: '2026-11-05',
    date: '5. November 2026',
    items: [
      {
        kind: 'neu',
        title: 'Buttons unter der Wallet-Karte',
        text: 'Bis zu zwei Buttons unter der Karte, etwa Anrufen, Shop, Bestellen oder Termin buchen. Sie erscheinen in Google Wallet auf Android und in Apple Wallet auf unterstützten iOS-Versionen; die Vorschau gibt es im Karten-Konstruktor.',
      },
      {
        kind: 'verbessert',
        title: 'Inbox-Zähler laden schneller',
        text: 'Bei Konten mit langen Gesprächsverläufen laden die Zähler deutlich schneller. Lange Wartezeiten und Timeout-Fehler beim Öffnen der Inbox entfallen.',
      },
      {
        kind: 'behoben',
        title: 'Kleine Einkäufe bleiben in der Historie',
        text: 'Käufe unterhalb der Punktschwelle erscheinen jetzt in Transaktionen, Umsatz und Besuchszahlen. Punkte gibt es weiter erst ab der eingestellten Stufe.',
      },
      {
        kind: 'behoben',
        title: 'Punkte-Ausgabe bricht keine Ablaufberechnung mehr',
        text: 'Punkte oder Stempel mit Dezimalbeständen führen nicht mehr zum Absturz der Ablaufberechnung. Künftige Abläufe werden dadurch nicht mehr über-cancelt.',
      },
      {
        kind: 'behoben',
        title: 'Gelöschte Standorte bleiben aus Vorlagen',
        text: 'Gelöschte Standorte lassen sich nicht wieder zu Kartenvorlagen hinzufügen. Alte Verknüpfungen werden beim Speichern der Vorlage entfernt.',
      },
      {
        kind: 'behoben',
        title: 'Test-Upgrades zeigen die richtige erste Rechnung',
        text: 'Upgradet ein Testkonto vor der ersten echten Zahlung, steht die erste Rechnung bei 0 € statt beim Paketpreis. Die Zahlungshistorie zeigt keinen Umsatz, bevor Geld geflossen ist.',
      },
    ],
  },
  {
    iso: '2026-11-02',
    date: '2. November 2026',
    items: [
      {
        kind: 'verbessert',
        title: 'Statistik-Charts im neuen Dashboard-Stil',
        text: 'Die Charts nutzen jetzt den neueren Dashboard-Stil. Unvollständige Zeiträume wie die laufende Woche oder der laufende Monat sind klarer markiert, Labels passen auf schmalen Bildschirmen.',
      },
      {
        kind: 'behoben',
        title: 'Google-Wallet-Einrichtung erholt sich',
        text: 'Vorlagen, die beim Wallet-Setup hängen geblieben sind, laufen beim erneuten Speichern wieder an. Vorlagen ohne Beschreibung nutzen für Google Wallet den Vorlagennamen.',
      },
      {
        kind: 'behoben',
        title: 'Transaktions-E-Mails beachten Groß- und Kleinschreibung',
        text: 'E-Mails zu Kartenvorgängen gehen auch dann raus, wenn die gespeicherte Adresse anders groß- oder kleingeschrieben ist als im Kundenprofil.',
      },
      {
        kind: 'behoben',
        title: 'Kundentabellen-Spalten speichern zuverlässig',
        text: 'Zwei gleichzeitige erste Speicherungen überschreiben die Spaltenauswahl nicht mehr. Deine Auswahl bleibt erhalten.',
      },
      {
        kind: 'behoben',
        title: 'Eingehende Webhooks bleiben im eigenen Netzwerk',
        text: 'Webhook-Automationen gleichen Karten-Seriennummern nur noch innerhalb der eigenen Firma bzw. des Franchise-Netzwerks ab. Ein Webhook kann keine fremde Karte mehr treffen.',
      },
    ],
  },
  {
    iso: '2026-11-01',
    date: '1. November 2026',
    items: [
      {
        kind: 'neu',
        title: 'Aktivierungsstatus einer Vorlage sichtbar',
        text: 'API- und KI-Assistent-Antworten zu Vorlagen zeigen jetzt, ob eine Vorlage aktiv ist. Integrationen können den Stand nach Updates oder einem Timeout prüfen, statt zu raten.',
      },
      {
        kind: 'verbessert',
        title: 'Logo- und Icon-Uploads werden geprüft',
        text: 'PNG bleibt PNG, JPEG, GIF und WebP werden zu PNG umgewandelt. Defekte Bilder werden übersprungen, statt das Anlegen von Vorlagen abzubrechen. Sieht ein altes Logo falsch aus, lade es einfach erneut hoch.',
      },
      {
        kind: 'verbessert',
        title: 'Schnellere Excel-Kundenimporte',
        text: 'Importe mit knapp 1.000 Kunden laufen deutlich seltener in ein Timeout. Antwortformat und Dateigrößen-Regeln bleiben gleich.',
      },
      {
        kind: 'behoben',
        title: 'Profilfehler erscheinen am richtigen Feld',
        text: 'Ist eine E-Mail-Adresse oder Telefonnummer schon vergeben, steht der Hinweis jetzt unter dem Feld — nicht mehr „das aktuelle Passwort ist falsch“. Echte Passwortfehler verhalten sich wie bisher.',
      },
      {
        kind: 'behoben',
        title: 'Webhook-URLs werden vor dem Speichern geprüft',
        text: 'Zu lange URLs werden mit einer klaren Meldung abgelehnt, bevor etwas geschrieben wird. Der rohe Datenbankfehler entfällt.',
      },
      {
        kind: 'behoben',
        title: 'Saubere Links auf PWA-Karten',
        text: 'PWA-Karten blenden unvollständige Links genauso aus wie Apple Wallet und Google Wallet. Keine leeren Zeilen, keine toten Links in den Kartendetails.',
      },
      {
        kind: 'behoben',
        title: 'Branding- und Profilbilder löschen zuverlässig',
        text: 'Ungültige Eingaben und bereits fehlende Dateien führen nicht mehr zum Serverfehler. Inhaber können Branding-Bilder löschen; Manager ohne Inhaberrechte können diese Dateien nicht ändern.',
      },
      {
        kind: 'behoben',
        title: 'Ungültige Zeitpläne werden früher erkannt',
        text: 'Cron-Zeitpläne, die gültig aussehen, aber nie laufen können, werden beim Speichern abgelehnt. Die Automation scheitert nicht mehr still im Hintergrund.',
      },
      {
        kind: 'behoben',
        title: 'Klarere Fehler bei der Belohnungs-Einlösung',
        text: 'Ist die Belohnung nicht mehr verfügbar oder das Guthaben zu niedrig, zeigt der Scanner eine saubere Ablehnung statt eines Serverfehlers. Das fällt vor allem bei alten Ansichten oder doppelten Taps auf.',
      },
      {
        kind: 'behoben',
        title: 'Inbox-Suche und Favoriten',
        text: 'Die Suche funktioniert mit E-Mail-Adressen und Sonderzeichen. Favoritenfilter zeigen nur noch die eigenen Favoriten, nicht die von Kollegen.',
      },
      {
        kind: 'behoben',
        title: 'Boolean-Einstellungen respektieren „false“',
        text: 'Der Wert „false“ schaltet eine Einstellung jetzt wirklich aus, statt sie einzuschalten. Nicht unterstützte Werte geben eine klare Fehlermeldung.',
      },
      {
        kind: 'behoben',
        title: 'Stripe-Mitgliedschaftszahlungen zuverlässiger',
        text: 'Ein Backend-Deadlock konnte den Abschluss einer Zahlung zurückrollen. Der Fehler ist behoben.',
      },
      {
        kind: 'behoben',
        title: 'Fehlgeschlagene App-Installationen werden gemeldet',
        text: 'Kann eine Marktplatz-App ihr Setup nicht abschließen, erscheint ein Fehler statt „erfolgreich installiert“. Fehlende Webhooks oder Rechte fallen so früher auf.',
      },
    ],
  },
]
