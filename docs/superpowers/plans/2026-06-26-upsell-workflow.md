# Upsell Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Telegram Bot empfängt Firmenname → Pabbly sucht Lead in Salesflare → antwortet mit WhatsApp-Text + erstellt Google Calendar Follow-up in 3 Tagen.

**Architecture:** Pabbly Connect Szenario mit 6 Modulen: Telegram Trigger → HTTP Salesflare Lookup → Router (gefunden/nicht gefunden) → Telegram Antwort + Google Calendar Event (Zweig A) oder Fehlermeldung (Zweig B).

**Tech Stack:** Pabbly Connect, Telegram Bot API, Salesflare REST API, Google Calendar API

## Global Constraints

- Bot: @bonuskarte_leads_bot (Token: `8557794026:AAHVILm2tKZFbTaTEG7s7wkxZJl8mQ-QsB8`)
- Salesflare API Key: `Lh1Qucl715Sp6Pwy4DZpoxzlGWt64Ugz7GA3M9G5_NKjm`
- Kalender: daniel@fuerte.digital (Google Primary)
- Follow-up: +3 Tage ab heute, 10:00 Uhr
- Telegram Chat ID für Antworten: `128525956` (Daniels eigene ID)

---

### Task 1: Pabbly-Szenario anlegen + Telegram Trigger konfigurieren

**Files:** Kein Code — Pabbly UI

- [ ] **Schritt 1: Neues Szenario anlegen**
  - In Pabbly Connect → "Create Scenario"
  - Name: `bonuskarte Upsell Bot`

- [ ] **Schritt 2: Telegram Trigger hinzufügen**
  - Erstes Modul: App `Telegram Bot` → Trigger `Watch Updates`
  - Verbindung herstellen: Bot Token = `8557794026:AAHVILm2tKZFbTaTEG7s7wkxZJl8mQ-QsB8`
  - Pabbly zeigt einen Webhook-URL — diesen kopieren

- [ ] **Schritt 3: Webhook im Telegram Bot registrieren**
  - Diesen URL im Browser aufrufen (einmalig, ersetzt `WEBHOOK_URL` durch die Pabbly-URL):
  ```
  https://api.telegram.org/bot8557794026:AAHVILm2tKZFbTaTEG7s7wkxZJl8mQ-QsB8/setWebhook?url=WEBHOOK_URL
  ```
  - Erwartete Antwort: `{"ok":true,"result":true,"description":"Webhook was set"}`

- [ ] **Schritt 4: Test-Nachricht senden**
  - Im Telegram an @bonuskarte_leads_bot schreiben: `Dönermacher`
  - Pabbly sollte den Trigger auslösen und `message.text = "Dönermacher"` zeigen
  - ✅ Verifikation: Pabbly zeigt `message.text` in der Run-History

---

### Task 2: Salesflare Lookup

**Files:** Kein Code — Pabbly UI

- [ ] **Schritt 1: HTTP-Modul hinzufügen**
  - Neues Modul nach dem Trigger: App `HTTP` → `Make a Request`

- [ ] **Schritt 2: Modul konfigurieren**
  - **Method:** GET
  - **URL:** `https://api.salesflare.com/accounts`
  - **Query Parameters:**
    - Key: `search` | Value: `{{message.text}}` (aus Modul 1 mappen)
  - **Headers:**
    - Key: `Authorization` | Value: `Bearer Lh1Qucl715Sp6Pwy4DZpoxzlGWt64Ugz7GA3M9G5_NKjm`
    - Key: `Content-Type` | Value: `application/json`
  - **Parse Response:** aktiviert (JSON)

- [ ] **Schritt 3: Test ausführen**
  - Pabbly → "Run Once" mit Test-Nachricht `Dönermacher`
  - Erwartetes Ergebnis: Array mit mindestens einem Account-Objekt
  - Das Objekt enthält: `id`, `name`, `phone_numbers[0].number`
  - ✅ Verifikation: Pabbly zeigt die Salesflare-Response mit Feldern

---

### Task 3: Router — gefunden vs. nicht gefunden

**Files:** Kein Code — Pabbly UI

- [ ] **Schritt 1: Router-Modul hinzufügen**
  - Neues Modul: App `Router` (oder `Condition` in Pabbly)
  - Zwei Zweige anlegen: **Zweig A** (gefunden) und **Zweig B** (nicht gefunden)

- [ ] **Schritt 2: Bedingung für Zweig A**
  - Filter: `{{HTTP.data[0].id}}` **exists / is not empty**
  - (d.h.: mindestens ein Account zurückgegeben)

- [ ] **Schritt 3: Zweig B ist der Fallback**
  - Kein zusätzlicher Filter nötig — Zweig B läuft wenn Zweig A false ist

---

### Task 4: Zweig A — Telegram-Antwort mit WhatsApp-Text

**Files:** Kein Code — Pabbly UI

- [ ] **Schritt 1: Variablen aus Salesflare-Response extrahieren**
  - `firmenname` = `{{HTTP.data[0].name}}`
  - `telefon` = `{{HTTP.data[0].phone_numbers[0].number}}`
  - `vorname` = `{{HTTP.data[0].contacts[0].firstname}}` (falls vorhanden, sonst leer lassen)

- [ ] **Schritt 2: Telegram-Modul hinzufügen (in Zweig A)**
  - App `Telegram Bot` → Action `Send a Text Message or a Reply`
  - **Chat ID:** `128525956`
  - **Text:**
  ```
  📞 {{telefon}}

  ───────────────────────
  Kopiere diese Nachricht in WhatsApp:

  Hallo {{vorname}} 👋

  Ich bin Daniel von bonuskarte.digital — wir haben dir die digitale Stempelkarte eingerichtet.

  Ich wollte kurz fragen ob du Interesse hast an einem unserer anderen Services für {{firmenname}}:

  📍 GEO & SEO-Optimierung — damit dein Google-Profil bei "Café Köln" ganz oben erscheint

  🍽 Digitale Speisekarte — QR-Code am Tisch, immer aktuell, kein Druck mehr

  📺 Digital Signage — Bildschirm im Laden mit Angeboten und Aktionen

  📸 360°-Fotos für Google Maps — professioneller Google Street View Eintrag

  Hast du kurz 15 Minuten für ein Gespräch?
  ```
  - **Parse Mode:** leer lassen (kein HTML/Markdown)

- [ ] **Schritt 3: Test ausführen**
  - Pabbly → Run Once → `Dönermacher` schicken
  - ✅ Verifikation: Telegram-Bot antwortet mit Telefonnummer + WhatsApp-Text

---

### Task 5: Zweig A — Google Calendar Event

**Files:** Kein Code — Pabbly UI

- [ ] **Schritt 1: Google Calendar verbinden**
  - In Pabbly: neues Modul nach dem Telegram-Modul in Zweig A
  - App `Google Calendar` → Action `Create an Event`
  - Google Account verbinden: daniel@fuerte.digital (OAuth)

- [ ] **Schritt 2: Event konfigurieren**
  - **Calendar:** Primary (daniel@fuerte.digital)
  - **Summary (Titel):** `Follow-up Upsell: {{HTTP.data[0].name}}`
  - **Start DateTime:** `{{addDays(now, 3)}}T10:00:00` (Pabbly-Datumsformel)
  - **End DateTime:** `{{addDays(now, 3)}}T10:30:00`
  - **Description:**
  ```
  WhatsApp Upsell gesendet.
  Services: SEO/GEO, Digitale Menü, Digital Signage, 360°
  Telefon: {{HTTP.data[0].phone_numbers[0].number}}
  ```
  - **TimeZone:** `Europe/Berlin`

- [ ] **Schritt 3: Test ausführen**
  - Pabbly → Run Once → `Dönermacher`
  - ✅ Verifikation: Google Kalender zeigt neuen Termin in 3 Tagen

---

### Task 6: Zweig B — Fehlermeldung

**Files:** Kein Code — Pabbly UI

- [ ] **Schritt 1: Telegram-Modul in Zweig B hinzufügen**
  - App `Telegram Bot` → Action `Send a Text Message or a Reply`
  - **Chat ID:** `128525956`
  - **Text:**
  ```
  ❌ Kein Lead gefunden für: {{message.text}}

  Tipp: Prüfe den genauen Firmennamen in Salesflare.
  ```

- [ ] **Schritt 2: Test ausführen**
  - Pabbly → Run Once → `XYZFirmaGibtEsNicht`
  - ✅ Verifikation: Telegram-Bot antwortet mit Fehlermeldung

---

### Task 7: Szenario aktivieren + Endtest

- [ ] **Schritt 1: Szenario auf "Instant" stellen**
  - Pabbly → Szenario-Einstellungen → Scheduling: `Instant` (reagiert sofort auf Webhook)

- [ ] **Schritt 2: Vollständiger Endtest**
  - Im Telegram an @bonuskarte_leads_bot: `ASAP Cafe`
  - Erwartung:
    1. Bot antwortet innerhalb 5 Sekunden mit Telefonnummer + WhatsApp-Text
    2. Google Kalender zeigt `Follow-up Upsell: ASAP Cafe` in 3 Tagen um 10:00 Uhr

- [ ] **Schritt 3: Szenario aktivieren**
  - Pabbly → Toggle auf `ON`
  - ✅ Workflow ist live

---

## Bekannte Stolperstellen

| Problem | Lösung |
|---------|--------|
| `phone_numbers` leer | Manche Leads haben keine Telefonnummer → Task 4 Schritt 1: Fallback-Text `(keine Telefonnummer)` |
| Pabbly `addDays` Syntax verschieden | Manche Pabbly-Versionen: `{{dateAdd(now; 3; "days")}}` — ausprobieren |
| Telegram Webhook belegt | Alter Webhook muss zuerst entfernt werden: `.../deleteWebhook` aufrufen |
| Google Calendar OAuth | Pabbly öffnet Google-Login-Fenster — mit daniel@fuerte.digital einloggen |
