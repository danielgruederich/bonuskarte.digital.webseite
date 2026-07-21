# MESSPLAN — bonuskarte.digital

> Was wird wo gemessen und wie liest man es aus? Stand: 2026-05-27.

## Setup-Übersicht

| Tool | ID | Zweck |
|---|---|---|
| Google Analytics 4 | `G-HFS45SFQ8S` (`properties/539219188`) | Funnel, Engagement, Quellen |
| Google Ads Conversion-Tag | `AW-18176373682` + `/jWsvCIyIj7AcELLnldtD` (Lead) | Performance-Tracking + Auto-Bidding |
| Google Search Console | Property `https://bonuskarte.digital/` (siteOwner) | Organic-Traffic, Indexierung |

Tracking-Snippet liegt in `src/layouts/BaseLayout.astro`. Funnel-Events feuern aus `src/lib/analytics.ts` und werden in den React-Komponenten (`LeadForm.tsx`, `LeadFormDoener.tsx`, `LeadFormFr.tsx`, `PhoneMockup.tsx`) aufgerufen.

---

## Funnel-Events

Reihenfolge im Trial-Funnel:

```
page_view  →  demo_card_view  →  niche_selected  →  signup_form_start  →  signup_submit
                                                          ↘ demo_booking (parallel)
                                                          ↘ chatbot_open (parallel)
```

### `page_view`
- **Bedeutet:** Jeder Seitenaufruf. Wird automatisch von GA4 erfasst (Enhanced Measurement).
- **Trigger:** Browser lädt eine bonuskarte.digital-URL.
- **Filterung:** In GA4-Berichten nach `page_location` → ermöglicht z.B. „nur `/koeln/gruender/`-Aufrufe".
- **Status:** ✅ Live.

### `demo_card_view`
- **Bedeutet:** Die Self-Demo-Karte (iPhone-Mockup mit Bonuskarten-Screenshots) ist erstmals zu mindestens 50 % im Viewport.
- **Trigger:** `IntersectionObserver` in `PhoneMockup.tsx` (einmal pro Page-Load).
- **Parameter:** `location` (default `'hero'`) — beschreibt wo das Mockup eingebettet ist.
- **Status:** ✅ Live.

### `signup_form_start`
- **Bedeutet:** Nutzer fokussiert das erste Pflicht-Feld im Lead-Formular.
- **Trigger:** `onFocus` des Vorname/Prénom-Inputs (einmal pro Session).
- **Parameter:** `niche`, `city`, `source` (z.B. `'gruender'`, `'standard'`, `'doener'`, `'fr_paris'`).
- **Status:** ✅ Live.

### `niche_selected`
- **Bedeutet:** Nutzer hat im Branchen-Dropdown (Gründer-/Walk-in-Seite) eine Branche gewählt.
- **Trigger:** `onChange` des Branchen-Selects in `LeadForm.tsx` (einmal pro Session).
- **Parameter:** `niche`, `city`, `source` (`'gruender'` oder `'gruender_walkin'`).
- **Nutzen:** Schließt die Funnel-Lücke zwischen `demo_card_view` und `signup_form_start` — zeigt Abbrecher, die zwar die Branche wählen, aber keine Kontaktdaten eingeben.
- **Status:** ✅ Live.

### `signup_submit_attempt`
- **Bedeutet:** Submit-Button wurde gedrückt — vor dem API-Call. Diagnose-Event: zeigt Drop-offs zwischen Klick und Backend-Erfolg.
- **Trigger:** Erste Zeile in `handleSubmit` (nach `setState('submitting')`).
- **Parameter:** wie `signup_form_start`.
- **Status:** ✅ Live (kein Key Event, nur Diagnose).

### `signup_submit` ⭐ Haupt-Conversion
- **Bedeutet:** Trial-Anmeldung erfolgreich abgeschickt. Boomerang-Demo-Karte wurde erstellt.
- **Trigger:** Im success-Zweig von `handleSubmit` (alle drei Forms).
- **Parameter:** `niche`, `city`, `source`, `value: 1.0`, `currency: 'EUR'`.
- **Doppel-Tracking:** Feuert parallel `gtag('event', 'conversion', {send_to: 'AW-18176373682/jWsvCIyIj7AcELLnldtD'})` für Google Ads.
- **Status:** ✅ Live.

### `signup_submit_error`
- **Bedeutet:** Submit fehlgeschlagen — API-Error (Boomerang/Server) oder Network-Error.
- **Trigger:** else-Zweig oder catch-Zweig in `handleSubmit`.
- **Parameter:** `error_type: 'api_error' | 'network_error'`, sonst wie oben.
- **Nutzen:** Frühwarnung bei API-Ausfällen.
- **Status:** ✅ Live.

### `demo_card_created`
- **Bedeutet:** Backend-Bestätigung — Boomerang Cards API hat erfolgreich eine Demo-Karte erzeugt. Wird unmittelbar vor `signup_submit` gefeuert.
- **Status:** ✅ Live, historisch (kann mittelfristig entfernt werden, da redundant zu `signup_submit`).

### `demo_booking`
- **Bedeutet:** Ein Demo-/Beratungstermin wurde gebucht (Calendly o.ä.).
- **Trigger:** TODO — derzeit ist KEIN Termin-Buch-Feature auf der Site eingebaut.
- **Anleitung sobald Feature kommt:** In `analytics.ts` ist `demoBooking(source)` bereits angelegt. Im Calendly-Success-Webhook oder onSubmit-Callback aufrufen.
- **Status:** ⏳ Funktion angelegt, Aufruf-Stelle existiert noch nicht.

### `chatbot_open`
- **Bedeutet:** Chatbot-Widget (ZipChat) auf bonuskarte.digital wurde vom User geöffnet.
- **Trigger:** TODO — Site hat derzeit KEIN ZipChat-Widget eingebettet (ZipChat läuft nur im Outreach-Tool).
- **Anleitung sobald Widget kommt:** In `analytics.ts` ist `chatbotOpen(location)` bereits angelegt. Im ZipChat-onOpen-Callback aufrufen.
- **Status:** ⏳ Funktion angelegt, Widget existiert noch nicht.

### Engagement-Events (nicht im Haupt-Funnel)
- `cta_clicked(location)` — Klick auf goldenen CTA-Button.
- `whatsapp_clicked(location)` — Klick auf WhatsApp-Knopf.
- `wallet_install_clicked(niche)` — Klick auf „Demo-Karte ins Wallet laden".

---

## Wo finde ich die Events in GA4?

1. Login: https://analytics.google.com — Property `bonuskarte.digital` (G-HFS45SFQ8S).
2. **Berichte → Engagement → Ereignisse** — Liste aller Events mit Counts der letzten 28 Tage.
3. **Berichte → Engagement → Conversions** — Liste der als „Key Event" markierten Events (= Conversions).
4. **Erkunden → Leeres Format** — Custom-Reports mit Filtern.

> **Hinweis Verzögerung:** Events erscheinen in den Berichten erst nach 24–48 h. Für sofortige Sichtprüfung: **Berichte → Echtzeit** → zeigt Events der letzten 30 Min.

### Key Events (zählen als Conversion)
Nach dem GA4-Setup-Script in `~/Documents/Claude projects/fuerte-agency-data/scripts/bonuskarte/setup_ga4_events.py` werden folgende Events automatisch als Key Event markiert:
- `signup_submit`
- `demo_card_view`
- `signup_form_start`
- `demo_booking`
- `chatbot_open`

---

## Funnel-Erkundung einrichten (page_view → signup_submit)

Einmaliger Setup-Aufwand: ca. 5 Min in der GA4-UI. Geht **nicht per API**, nur über die Benutzeroberfläche.

1. **Erkunden → Funktion „Funnel-Erkundung"** wählen
2. **„Schritte" konfigurieren:**
   - Schritt 1 — Name: `Seitenaufruf`, Ereignis: `page_view`, Bedingung: `page_location enthält /koeln/gruender`
   - Schritt 2 — Name: `Demo-Karte gesehen`, Ereignis: `demo_card_view`
   - Schritt 3 — Name: `Formular gestartet`, Ereignis: `signup_form_start`
   - Schritt 4 — Name: `Trial abgeschickt`, Ereignis: `signup_submit`
3. **Aufschlüsselung** (rechts in der Toolbar): `source` als Dimension hinzufügen — zeigt Drop-off pro Quelle.
4. **Zeitraum:** letzte 28 Tage (Default).
5. **Speichern unter** → Name z.B. „Gründer-Funnel".

Anschließend siehst du:
- Abschluss-Rate pro Schritt (z.B. 100 % → 78 % → 41 % → 12 %)
- Drop-off-Quote zwischen den Schritten
- Filterbar nach `source` (Gründer vs. Standard vs. Döner vs. Paris)

---

## Custom Dimension `source`

Die Dimension `source` wird vom Setup-Script `setup_ga4_events.py` angelegt und ist auf allen Funnel-Events vorhanden.

Werte:
| `source` | Bedeutung |
|---|---|
| `standard` | Reguläre Veedel-/Stadt-Landing-Pages |
| `gruender` | Gründer-Landing `/koeln/gruender/` |
| `gruender_walkin` | Walk-in-Seite `/koeln/walkin/` (iPad-Anlage durch Gründer) |
| `doener` | Döner-spezifische Form |
| `fr_paris` | Französischer Markt (`/fr/`-Pfad) |

In GA4-Berichten dann als sekundäre Dimension aktivieren → Daten lassen sich pro Source filtern.

---

## A/B-Test: Hero-Headline (`hero_variant`) — nur `/v2`

Seit 2026-07-21 läuft auf `/v2` ein Split-Test der Hero-Headline. Die Variante wird beim ersten Aufruf zufällig 50/50 zugelost, in `localStorage` (`v2_hero_variant`) fixiert (gleicher Besucher = immer dieselbe Variante) und als GA4-User-Property gesetzt.

| Variante | Headline |
|---|---|
| `A` | „Aus Erstbesuchern werden Stammkunden." (server-gerendert, Default) |
| `B` | „Aus einem Besuch wird eine Routine." (client-seitig eingeblendet) |

**Was gefeuert wird** (Inline-Script in `src/pages/v2.astro`, Hero):
- `gtag('set', 'user_properties', { hero_variant: 'A' | 'B' })` — hängt an ALLE folgenden Events der Session, damit auch an `signup_submit`.
- `gtag('event', 'experiment_impression', { experiment: 'hero_headline', variant: 'A' | 'B' })` — eine Impression pro Page-Load (= Nenner für die Conversion-Rate).

**Einmalig in GA4 registrieren** (Pflicht — sonst ist `hero_variant` in Berichten nicht auswählbar; Daten werden aber ab dem Deploy schon gesammelt):
1. GA4 → **Verwalten (⚙️) → Benutzerdefinierte Definitionen → Benutzerdefinierte Dimensionen → Erstellen**
2. Dimensionsname: `hero_variant` · **Bereich: Nutzer** (User-scoped!) · Nutzereigenschaft: `hero_variant`
3. Speichern. Danach ~24–48 h, bis die Dimension in Berichten erscheint (rückwirkend erst ab Registrierung — also besser früh anlegen).

**Auswerten** (Conversion pro Variante):
1. **Erkunden → Leeres Format**
2. Zeile: `hero_variant` · Wert: `Ereignisanzahl`
3. Filter 1: `Ereignisname = signup_submit` → Conversions je Variante.
4. Zweite Tabelle mit Filter `Ereignisname = experiment_impression` → Impressions je Variante.
5. Rate = `signup_submit / experiment_impression` pro Variante → A vs. B vergleichen.

> Faustregel: erst ab ~100 Conversions pro Arm belastbar. Bis dahin laufen lassen, nicht voreilig eine Variante abschalten.

---

## Trial → Zahlend (manuelles Tracking)

GA4 + Google Ads zeigen Trial-Anmeldungen (`signup_submit`). **Den Übergang Trial → zahlend muss du selbst pflegen**, weil Bezahlung außerhalb des Webflows passiert (Salesflare-CRM + manuelle Buchhaltung).

**Empfehlung — eine simple Tabelle pflegen:**

| Spalte | Quelle | Frequenz |
|---|---|---|
| `signup_date` | GA4 oder Salesflare (Account-Created) | täglich |
| `source` | GA4 Custom Dimension oder UTM-Eintrag | täglich |
| `trial_end_date` | `signup_date + 90 Tage` | rechnerisch |
| `converted` (Y/N) | manuell aus Salesflare/Rechnung | wöchentlich nach Trial-Ende |
| `mrr_eur` | manuell, Buchhaltung | wöchentlich |

Datei z.B. `data/trial-to-paid.csv` in diesem Repo oder Google Sheet. Wichtige Kennzahlen:

- **Trial→Paid Conversion-Rate** (% der `signup_submit` die zahlen)
- **Time-to-Paid** (Tage zwischen `signup_date` und erstem Payment — meist ~7–14 nach Trial-Ende)
- **MRR pro `source`** (welche Quelle bringt nicht nur Leads, sondern zahlende Kunden)

Sobald genug Daten (≥30 zahlende Kunden pro Quelle): GA4 Key Event `purchase` per Measurement-Protocol nachträglich rückspielen — dann sieht man die echte End-to-End-Conversion direkt in GA4 + Google Ads.

---

## UTM-Konvention für ausgehende Links

Alle Links die auf bonuskarte.digital zeigen sollen UTM-Parameter tragen — sonst landet alles als „direct/(none)" in GA4.

Format:
```
?utm_source=<wo>&utm_medium=<typ>&utm_campaign=<kampagne>
```

Beispiele:
| Quelle | URL-Suffix |
|---|---|
| Instagram-Bio | `?utm_source=instagram&utm_medium=bio&utm_campaign=gruender_koeln_2026` |
| QR-Code Walk-in | `?utm_source=qr&utm_medium=walkin&utm_campaign=koeln_cafes` |
| Cold-Mail-Footer | `?utm_source=email&utm_medium=cold&utm_campaign=koeln_<niche>` |
| LinkedIn Post | `?utm_source=linkedin&utm_medium=social&utm_campaign=launch_2026` |
| Google Ads | wird automatisch durch GCLID gesetzt — keine UTMs nötig |

UTMs werden in `LeadForm.tsx` (Function `getUtmParams`) ausgelesen und an Salesflare mitgeschickt — Lead-Source ist also durchgängig nachvollziehbar.

---

## Search Console — Organic-Traffic

- Property: https://bonuskarte.digital/ (siteOwner mit `danielgruederich@gmail.com`)
- **GSC öffnen → Leistung → Suchanfragen** — welche Keywords bringen Klicks
- **Abdeckung** — wie viele der 1.800+ Seiten sind indexiert
- **Sitemap** — automatisch über `/sitemap-index.xml` einreichen (siehe Setup-Script)

API-Zugriff für tägliche Snapshots: über die `fuerte-agency-data`-Pipeline, Script kommt separat.

---

## Reporting-Scripts

Pipeline liegt in einem **separaten Reporting-Repo** (nicht in der Site):
```
~/Documents/Claude projects/fuerte-agency-data/
  ├── scripts/
  │   └── bonuskarte/
  │       ├── setup_ga4.py            (Property + Stream — schon ausgeführt)
  │       ├── setup_ga4_events.py     (Key Events + Custom Dimension — siehe Task 14)
  │       └── (kommt: report_funnel_28d.py, report_sources.py …)
  └── data/bonuskarte/                (CSV-Exports, gitignored)
```

Auth läuft über `~/.config/fuerte-agency/google-ads.yaml` (geteilt mit anderen fuerte-Projekten wie Halfen).

---

## Änderungen & Versionierung

Wenn ein Event-Schema sich ändert (neue Felder, andere Bedeutung), hier dokumentieren. Beispiel-Eintrag:

> **2026-05-27** — Initial-Spec (Daniel + Claude). Funnel-Events `signup_form_start`, `signup_submit`, `demo_card_view` live; `demo_booking` + `chatbot_open` als Stub angelegt.
>
> **2026-07-21** — A/B-Test Hero-Headline auf `/v2` live: User-Property `hero_variant` (A/B) + Event `experiment_impression`. Custom Dimension `hero_variant` (Bereich: Nutzer) in GA4 registrieren, siehe Abschnitt „A/B-Test: Hero-Headline".
