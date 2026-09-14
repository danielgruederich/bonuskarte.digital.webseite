# Upsell Workflow — Design Spec
**Datum:** 2026-06-26  
**Projekt:** bonuskarte.digital  
**Status:** Approved

---

## Ziel

Bestehende bonuskarte.digital-Kunden manuell auf weitere fuerte.digital-Dienste ansprechen, ohne manuellen Rechercheaufwand. Der Workflow reduziert den Aufwand pro Upsell-Versuch auf einen Tastendruck.

---

## Produkte (Upsell-Angebote)

1. **GEO & SEO-Optimierung** — Google-Profil-Sichtbarkeit
2. **Digitale Speisekarte** — QR-Code, immer aktuell
3. **Digital Signage** — Bildschirm-Werbung im Laden
4. **360°-Fotos/Videos für Google Maps** — professioneller Street View Eintrag

---

## Architektur

```
Du → @bonuskarte_leads_bot: "Dönermacher"
         ↓
     Pabbly Webhook (Telegram Trigger)
         ↓
     Salesflare API: GET /v1/accounts?search=Dönermacher
         ↓ (Lead gefunden)
     [parallel]
     ├── Telegram → dir: Telefonnummer + fertige WhatsApp-Nachricht
     └── Google Calendar: "Follow-up Upsell: Dönermacher"
                          daniel@fuerte.digital · +3 Tage · 10:00 Uhr

     ↓ (Lead NICHT gefunden)
     Telegram → dir: "❌ Kein Lead gefunden für: Dönermacher"
```

**Tool:** Pabbly Connect (kein Code, kein eigener Server)  
**Telegram Bot:** @bonuskarte_leads_bot (bestehend)  
**CRM:** Salesflare  
**Kalender:** Google Calendar, daniel@fuerte.digital

---

## Pabbly-Szenario — Module

| # | Modul | Konfiguration |
|---|-------|---------------|
| 1 | Telegram: Watch Updates | Bot Token, Text-Nachrichten |
| 2 | HTTP: GET Salesflare | `GET /v1/accounts?search={{text}}` + API Key Header |
| 3 | Router | Zweig A: accounts[0] existiert / Zweig B: leer |
| 4a | Telegram: Send Message | Telefonnummer + WhatsApp-Text (Zweig A) |
| 4b | Google Calendar: Create Event | +3 Tage, 10:00, daniel@fuerte.digital (Zweig A) |
| 5b | Telegram: Send Message | Fehlermeldung (Zweig B) |

---

## WhatsApp-Nachricht (Template)

```
Hallo [Vorname] 👋

Ich bin Daniel von bonuskarte.digital — wir haben dir die 
digitale Stempelkarte eingerichtet.

Ich wollte kurz fragen ob du Interesse hast an einem 
unserer anderen Services für [Firmenname]:

📍 GEO & SEO-Optimierung — damit dein Google-Profil 
   bei "Café Köln" ganz oben erscheint

🍽 Digitale Speisekarte — QR-Code am Tisch, immer aktuell, 
   kein Druck mehr

📺 Digital Signage — Bildschirm im Laden mit Angeboten 
   und Aktionen

📸 360°-Fotos für Google Maps — professioneller 
   Google Street View Eintrag

Hast du kurz 15 Minuten für ein Gespräch?
```

---

## Google Calendar Entry

- **Titel:** `Follow-up Upsell: [Firmenname]`
- **Datum:** heute + 3 Tage, 10:00 Uhr
- **Kalender:** daniel@fuerte.digital (Primary)
- **Beschreibung:** `WhatsApp Upsell gesendet. Services: SEO/GEO, Digitale Menü, Digital Signage, 360°`

---

## Fehlerbehandlung

- **Lead nicht gefunden:** Telegram antwortet `❌ Kein Lead gefunden für: [Name]`
- **Telefonnummer fehlt:** Telegram antwortet `⚠️ Lead gefunden, aber keine Telefonnummer hinterlegt`

---

## Was nicht gebaut wird

- Automatisches WhatsApp-Senden (kein WhatsApp Business API nötig)
- Tracking ob Nachricht geöffnet wurde
- Follow-up Automatisierung nach 3 Tagen (manueller Workflow)
