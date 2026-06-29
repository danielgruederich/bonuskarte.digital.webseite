# Buchungsbestätigungsseite — Design Spec
*2026-06-29 | bonuskarte.digital*

## Überblick

Statische Bestätigungsseite, die nach einer SimplyMeet.me-Buchung angezeigt wird. Sie liest Meeting-Details aus URL-Parametern, zeigt sie dem Besucher an, und feuert einmalig einen Webhook an Pabbly (für Google Sheets Logging und weitere Automationen).

---

## URL & Routing

- **Route:** `/danke` → `bonuskarte.digital/danke`
- **noindex:** true (wie `/termin`)
- **SimplyMeet.me Redirect-URL** in den "Additional options" eintragen: `https://bonuskarte.digital/danke`

---

## URL-Parameter (von SimplyMeet.me)

| Parameter | Beschreibung | Beispiel |
|---|---|---|
| `invitee_full_name` | Vollständiger Name | `Max Mustermann` |
| `invitee_email` | E-Mail-Adresse | `max@cafe.de` |
| `meeting_starts_at` | Datum & Uhrzeit | `Wednesday, July 2, 2026 10:00` |
| `meeting_type` | Meeting-Typ-Name | `Setup-Gespräch` |
| `invitee_phone_number` | Telefon (optional) | `+49 221 ...` |

---

## UI-Layout

### Hero-Bereich
- Hintergrund: Paper + Grid-Pattern (wie `/termin`)
- Amber-Badge: `Buchung bestätigt`
- H1: `Wir sehen uns, [Vorname]!` (Vorname = erstes Wort aus `invitee_full_name`)
- Subtext: `Dein Termin am [Datum] ist reserviert. Wir freuen uns drauf.`

### Buchungsdetails-Box
Border `amber/20`, Paper-Background, drei Zeilen:
- Kalender-Icon + formatiertes Datum & Uhrzeit
- E-Mail-Icon + `invitee_email`
- Meeting-Icon + `meeting_type`

### Nächste Schritte (3 Punkte)
1. Du bekommst eine Bestätigungsmail von SimplyMeet.me
2. Bereite gerne ein paar Infos vor: Name, Branche, Anzahl Kunden
3. Bei Fragen: WhatsApp-Link oder E-Mail

### CTA
- Button: `Zur Startseite` → `/koeln`
- Design: Amber-Button, volle Breite auf Mobile

---

## Datenfluss

```
SimplyMeet.me Buchung abgeschlossen
  → Redirect zu /danke?invitee_full_name=...&invitee_email=...&...
  → Client-JS liest URL-Parameter
  → UI zeigt personalisierte Details
  → Einmaliger POST an Pabbly Webhook
```

### Pabbly Webhook-Payload
```json
{
  "invitee_full_name": "Max Mustermann",
  "invitee_email": "max@cafe.de",
  "meeting_starts_at": "Wednesday, July 2, 2026 10:00",
  "meeting_type": "Setup-Gespräch",
  "invitee_phone_number": "+49 221 ...",
  "source": "simplymeet"
}
```

---

## Technische Umsetzung

**Datei:** `src/pages/danke.astro`

- Statische Astro-Seite (kein SSR nötig)
- Eingebetteter `<script>`-Tag mit Vanilla JS
- Pabbly-Webhook-URL als Build-Variable: `PUBLIC_PABBLY_WEBHOOK_URL` in `.env`

### Doppel-Fire-Schutz
`sessionStorage`-Flag (`booking_tracked`) verhindert erneuten Webhook-Call beim Browser-Back oder Page-Reload.

### Fallback (kein `invitee_email` vorhanden)
- Kein Webhook-Call
- Generischer Text: `Vielen Dank für deine Buchung! Wir melden uns in Kürze.`
- Kein personalisierter Name im H1

---

## Design-System

- Farben: Paper / Ink / Amber (identisch mit restlicher Site)
- Font: Geist
- Layout: `BaseLayout.astro` + `Navbar.astro` + `Footer.astro`
- Responsive: Mobile First

---

## Offene Punkte (vom User zu liefern)

- Pabbly Webhook-URL
- Zusätzliche Texte, Bilder, Videos für die Seite
- WhatsApp-Nummer / Kontakt-Link für die "Nächste Schritte"-Section
