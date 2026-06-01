# Spec: Walk-in-Landingpage + nische-unabhängige Gründer-Seiten + lückenloses Funnel-Tracking

**Datum:** 2026-06-01
**Autor:** Daniel + Claude
**Status:** Entwurf zur Review

## Ziel

Eine zweite Landingpage `/koeln/walkin` für den iPad-Einsatz beim Walk-in, plus Umbau der bestehenden Gründer-Seite auf **Branchen-unabhängigkeit** (Nische wird Auswahlfeld statt fest verdrahtet). Jeder Funnel-Step wird getrackt, damit sichtbar wird, **wo ein Lead abspringt** — getrennt nach Walk-in vs. Online.

## Kontext / Ist-Zustand (verifiziert)

- `/koeln/gruender` ist live, noindex + aus Sitemap-Filter ausgeschlossen, `source='gruender'`.
- `GruenderLanding.astro:189-193` bindet `<LeadForm niche="cafes" city="koeln" mode="gruender" />` — **Nische fest „cafes"**.
- `LeadForm.tsx` feuert bereits: `signup_form_start` (erster Feld-Fokus), `signup_submit_attempt` (Submit-Klick), `signup_submit` / `signup_submit_error` (Ergebnis). Der `source`-Param kommt aktuell aus `mode`.
- `submit.php:37-44`: nur `cafe` (1046392) + `eiscafe` (1060441) haben ein Template; die anderen 8 nutzen `TEMPLATE_FALLBACK = 1046392` (Café). `submit.php:232-238`: `mode==='gruender'` → Tags `gruender-100`, `lifetime-100eur`, `<city>`.
- `niches.ts`: 10 Branchen (cafes, doener, pizza, restaurant, eiscafe, baeckerei, friseur, fitnessstudio, yoga, blumenladen).

## Entscheidungen (vom User bestätigt)

1. **Zwei Seiten**, beide nische-unabhängig, beide noindex:
   - `/koeln/gruender` → öffentlich (Ads/Organic), `source='gruender'`, Kunde wählt Branche selbst.
   - `/koeln/walkin` (neu) → iPad, `source='gruender_walkin'`, Gründer wählt Branche.
2. **Einziger Unterschied der Seiten = der `source`-Wert.** Layout, Copy, Offer identisch.
3. **Branchen-Dropdown mit allen 10 Branchen.** Pflichtfeld, Platzhalter „Branche wählen". Café-Fallback für die 8 ohne eigenes Template wird bewusst akzeptiert (Nische wird trotzdem korrekt getrackt + getaggt; Template später nachbaubar).
4. **Keine** Veedel- und **keine** Gründer-Felder (bewusst raus, YAGNI).
5. **Hero-Wallet-Mockup bleibt statisch** (Café-Optik). Nur das *Formular* bekommt die Branchenwahl; die *erstellte* Demo-Karte nutzt die gewählte Branche.

## Architektur

### Seiten / Komponenten

- `src/pages/koeln/walkin.astro` (neu): Wrapper, rendert `<GruenderLanding config={koeln} source="gruender_walkin" />`.
- `src/pages/koeln/gruender.astro` (bestehend): wird zu `<GruenderLanding config={koeln} source="gruender" />`.
- `src/components/GruenderLanding.astro`: neuer Prop `source: 'gruender' | 'gruender_walkin'` (default `'gruender'`). Bindet `LeadForm` **ohne** feste Nische, dafür mit `selectableNiche` + `source`.
- `src/components/LeadForm.tsx`:
  - Neuer Prop `selectableNiche?: boolean`. Wenn true: `<select>` mit allen 10 Branchen oben im Formular; die Auswahl ist der `niche`-Wert für Tracking **und** Submit. Wenn false (Veedel-Seiten): bisheriges Verhalten mit festem `niche`-Prop.
  - Neuer Prop `source?: string` (default = `mode`). Entkoppelt den Analytics-`source` von `mode`, damit Walk-in `source='gruender_walkin'` tracken kann, während `mode='gruender'` (Offer-/Template-Logik) erhalten bleibt.
  - `source` wird zusätzlich im POST-Body an `submit.php` mitgeschickt.
- `astro.config.mjs`: `/koeln/walkin` in den Sitemap-Filter aufnehmen (ausschließen). noindex-Meta wie bei `/koeln/gruender` sicherstellen.

### submit.php

- Liest neues Feld `source` aus dem Body.
- Wenn `source === 'gruender_walkin'`: zusätzlich Salesflare-Tag `walkin` an Account/Contact/Opportunity. Restliche Gründer-Tags (`gruender-100`, `lifetime-100eur`, `<city>`) bleiben, da Walk-in dasselbe Angebot ist (`mode` weiterhin `gruender`).
- Template-Auswahl unverändert (`TEMPLATE_IDS[$niche] ?? TEMPLATE_FALLBACK`).

## Funnel-Tracking — jeder Step

Vollständige Event-Kette (alle Events tragen `source` ∈ {`gruender`, `gruender_walkin`} + `niche`):

| # | Event | Trigger | Status |
|---|---|---|---|
| 1 | `page_view` | GA4 Enhanced Measurement (Seitenaufruf) | vorhanden |
| 2 | `demo_card_view` | Hero-Mockup ≥50 % im Viewport | vorhanden |
| 3 | `niche_selected` | Branche im Dropdown gewählt (einmal pro Session) | **NEU** |
| 4 | `signup_form_start` | erster Fokus eines Kontaktfelds (Vorname) | vorhanden |
| 5 | `signup_submit_attempt` | Submit-Button gedrückt | vorhanden |
| 6a | `signup_submit` | Anmeldung erfolgreich (Karte erstellt) | vorhanden |
| 6b | `signup_submit_error` | API- oder Network-Fehler | vorhanden |

**Wo der Lead verloren geht — ablesbar an den Lücken:**
- 1→2: Seite gesehen, aber Angebot/Demo nicht wahrgenommen
- 2→3: Demo gesehen, aber keine Branche gewählt (Form gar nicht angefasst)
- 3→4: Branche gewählt, aber keine Kontaktdaten begonnen
- 4→5: Formular begonnen, aber nicht abgeschickt
- 5→6a: abgeschickt, aber technischer Fehler (6b)

Neues Event `niche_selected` wird in `analytics.ts` als Funktion ergänzt und im GA4-Setup (`setup_ga4_events.py`) als Event/ggf. Key Event registriert. Custom Dimension `source` deckt `gruender_walkin` bereits ab (Freitext-Wert).

### Post-Conversion (bereits vorhanden, unverändert)
`wallet_install_clicked`, `whatsapp_clicked` — zeigen, ob der frische Lead die Demo-Karte auch wirklich installiert.

## Doku-Updates

- `MESSPLAN.md`: neues Event `niche_selected`, neue `source`-Werte (`gruender_walkin`), neuer Salesflare-Tag `walkin`, Funnel-Reihenfolge aktualisieren.
- `CLAUDE.md` (Projekt): `/koeln/walkin` in die Seiten-Übersicht aufnehmen.

## Out of Scope

- Boomerang-Templates für die 8 fehlenden Branchen (Dashboard-Aufgabe, Daniel).
- Trial→Paid-Tracking (separates Thema, lebt in Salesflare).
- Veedel-/Gründer-Erfassung.
- Dynamisches Hero-Mockup je Branche.

## Testkriterien

- `/koeln/walkin` lädt, ist noindex, nicht in der Sitemap.
- Branchen-Dropdown zeigt alle 10, ist Pflichtfeld.
- Auswahl „Döner" → GA4-Event `niche_selected` mit `niche='doener'`, `source='gruender_walkin'`; Submit erzeugt Karte (Café-Fallback-Template) und Salesflare-Lead mit Tags `doener`, `gruender-100`, `lifetime-100eur`, `walkin`.
- `/koeln/gruender` verhält sich identisch, aber `source='gruender'`, kein `walkin`-Tag.
- Bestehende Veedel-Seiten (`/koeln/nippes/cafes`) unverändert (fester `niche`, kein Dropdown).
- Alle 6 Funnel-Events feuern in korrekter Reihenfolge (per GA4 Echtzeit-Bericht prüfbar).
</content>
</invoke>
