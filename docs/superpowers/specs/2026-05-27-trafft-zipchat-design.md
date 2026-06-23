---
name: 2026-05-27-trafft-zipchat-design
status: draft
date: 2026-05-27
owner: daniel
---

# Trafft (Termin-Buchung) + ZipChat (FAQ-Bot) — Integration v1

## Ziele

1. **Trafft** als Express-Pfad zur Demo-Buchung auf der Gründer-Landing — als Ergänzung zum bestehenden Lead-Form, nicht als Ersatz.
2. **ZipChat-FAQ-Bot** als Minimal-Test auf zwei High-Intent-Pages (Preise + Hilfe), um zu lernen ob Chat-Support auf einer Lead-Gen-Site Conversion lifted oder ablenkt — bevor wir sitenweit ausrollen.

Beide Integrationen folgen demselben Prinzip: **kleiner Blast-Radius, schnelles Learning, später ausrollen wenn es zieht**.

## Scope (v1)

**Trafft**
- Nur auf `/koeln/gruender`
- Neue Sektion zwischen `Form` und `FAQ` (Headline: "Lieber direkt sprechen?")
- Inline-Iframe-Embed (offizielles Trafft-Snippet, 768 px Höhe)
- GA4-Event `trafft_view` wenn Embed in Viewport scrollt
- Datenschutzerklärung-Update für `termin.leanr.one`

**ZipChat**
- Nur auf `/preise` (1 Page) und `/hilfe/*` (Hub + 16 Tutorials = 17 Pages) → **18 Pages total**
- Standard-Chat-Widget unten rechts
- System-Prompt: knapp, Deutsch, bei Preis-/Demo-Fragen auf Lead-Form/Trafft routen
- Bot-Training auf Subset der Site (siehe "Bot-Trainings-Content")
- Datenschutzerklärung-Update für `zipchat.ai`
- Kein eigenes Tracking in v1 (ZipChat-Dashboard liefert Konversations-Daten)

## Out of Scope (bewusst nicht in v1)

- Trafft auf Standard-Veedel-Pages, FR-Pages, anderen Städten
- Eigene Google-Ads-Conversion "Termin gebucht" (kommt wenn Volumen messbar wird)
- Trafft-Postback-/postMessage-Handling
- ZipChat auf Homepage, Blog, Veedel-Pages, Gründer-Landing, FR-Pages
- Modal/Popup-Variante für Trafft (Inline-Embed reicht für v1)
- ZipChat als Lead-Qualifier (aktive Frage-Flows)
- Migration vorhandener FAQ-Inhalte in ZipChat Knowledge-Base (manuelles Training reicht für v1)

## Architektur

### Trafft-Integration

**Embed-Snippet** (vom Trafft-Dashboard geliefert):

```html
<div class="embedded-booking"
     data-url="https://termin.leanr.one"
     data-query="&t=s&uuid=90fdcd97-6ada-4591-ad02-bd9e72e2f85f"
     data-lang="de"
     data-autoresize="0"
     data-showsidebar="1"
     data-showservices="0"
     style="min-width: 320px; height: 768px;"></div>
<script type="text/javascript" src="https://termin.leanr.one/embed.js" async></script>
```

**Komponente:** Neue `src/components/TrafftBooking.astro`
- Kapselt das obige Snippet
- Wrapper mit Section-Padding, Headline, Sub-Headline, Trust-Statement
- Lazy-Load via `loading="lazy"` ist beim Wrapper-Div nicht direkt möglich; alternativ IntersectionObserver für Script-Injection (siehe Tracking)

**Einbindung:** In `src/components/GruenderLanding.astro` zwischen `<Form>` und `<FAQ>`.

### ZipChat-Integration

**Komponente:** Neue `src/components/ZipChat.astro`
- Wraps das ZipChat-Script-Snippet (kommt aus ZipChat-Dashboard nach Bot-Setup)
- Wird als Slot-Component am Ende von BaseLayout geladen, ABER nur wenn Prop `enableChat={true}` gesetzt ist
- Default: `enableChat={false}` → kein Bot
- `preise.astro`, `hilfe/index.astro`, `hilfe/[...slug].astro` setzen `enableChat={true}`

**BaseLayout-Änderung:** Optionaler Prop `enableChat?: boolean`, default `false`. Wenn `true`, wird `<ZipChat />` am `</body>`-Ende eingehängt.

### Tracking

**Trafft:**
- `src/lib/analytics.ts` → neue Funktion `trafftView()` → `gtag('event', 'trafft_view', { event_category: 'booking', event_label: 'gruender-koeln' })`
- Trigger via IntersectionObserver in `TrafftBooking.astro`: feuert einmal pro Page-View, wenn Section 50 % im Viewport ist

**ZipChat:**
- v1 ohne Custom-Tracking. ZipChat-Dashboard zeigt Konversationen, Klick-Rates, Bot-Performance.

### Datenschutz

`src/pages/datenschutz.astro` (oder entsprechende MDX-Datei) bekommt zwei neue Abschnitte:

1. **Trafft (Termin-Buchung):**
   - Anbieter: Trafft (Custom-Domain `termin.leanr.one`)
   - Verarbeitete Daten: Name, E-Mail, Telefon, Unternehmen, Termin-Wunsch
   - Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)

2. **ZipChat (KI-gestützter Support-Chat):**
   - Anbieter: ZipChat / `zipchat.ai`
   - Verarbeitete Daten: Chat-Verlauf, ggf. E-Mail bei Lead-Capture, technische Daten (IP, Browser)
   - Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse: Nutzersupport)
   - Hinweis auf Drittland-Datentransfer (USA) falls zutreffend → Daniel klärt mit ZipChat-Doku

## Bot-Trainings-Content (ZipChat)

Limit: **700 Pages** im Tier-1-Plan, davon nutzen wir initial ~30–50:

**Pflicht (~10 Pages):**
- `/` (Homepage)
- `/preise`
- `/hilfe` (Hub) + alle 16 Tutorial-Slugs unter `/hilfe/*`
- `/blog` (Hub) + alle Live-Artikel (laut Memory ~11)

**Optional (~20 Pages):**
- `/koeln` (Stadt-Hub, exemplarisch für eine Branche)
- `/koeln/gruender` (Founder-Pitch — Bot soll dieses Angebot kennen)
- `/pitch-Tallinn/` (statische Pitch-Inhalte als Hintergrund-Kontext)
- FAQ-Sektionen aus Veedel-Pages — können konsolidiert als Markdown in ZipChat eingespielt werden statt 1.500 Pages crawlen zu lassen

**Bewusst NICHT trainiert:**
- 1.500+ Veedel-Pages (sind strukturelle Varianten, würden Quota fressen ohne neue Info)
- 200 Paris-Pages (Sprache: FR, Bot ist DE-only in v1)

## System-Prompt-Vorschlag (ZipChat)

```
Du bist der freundliche FAQ-Helfer für bonuskarte.digital — eine digitale Stempelkarte für lokale Gastronomen in Deutschland.

Stil: Du-Form, Deutsch, kurz und konkret. Keine Roman-Antworten.

Verhalten:
- Beantworte Fragen zu: Funktionsweise, Preise, Apple/Google Wallet, Setup-Dauer, Branchen, technische Voraussetzungen
- Bei Demo-Anfragen oder konkretem Interesse: verweise auf das Lead-Formular auf der Seite ("Trag oben deine Daten ein, dann meldet sich Daniel persönlich") oder den Termin-Buchungs-Link (falls vorhanden)
- Bei Fragen die du nicht sicher beantworten kannst: sag das ehrlich und biete an, daniel@bonuskarte.digital direkt zu fragen
- KEINE Versprechen zu Preisen außerhalb der /preise-Seite
- KEINE Aussagen zu Vertragslaufzeiten/Kündigung außerhalb dokumentierter Inhalte

Du repräsentierst Daniel Gruederich + Jonas Henning (Gründer). Sei sachlich, freundlich, kein Verkäufer-Tonfall.
```

Daniel passt Prompt nach Bot-Setup an, wenn nötig.

## Daniel-Aufgaben (vor Implementation)

1. **Trafft-Service final aktivieren** — Embed-Code liegt vor (`uuid=90fdcd97-6ada-4591-ad02-bd9e72e2f85f`), also Service ist bereits in Trafft angelegt. Daniel verifiziert: kann eine Test-Buchung gemacht werden?
2. **ZipChat-Bot anlegen + trainieren** — Account aktivieren (60-Tage-Fenster!), Bot anlegen, System-Prompt aus diesem Doc übernehmen, Trainings-Content laden (Pflicht-Liste oben).
3. **ZipChat-Embed-Script kopieren** aus ZipChat-Dashboard → an Daniel-Implementation-Branch geben oder mir bereitstellen.
4. **Datenschutzerklärung-Anpassung gegenlesen** — ich entwerfe den Text, du prüfst rechtlich (oder lässt prüfen).

## Code-Aufgaben (Implementation)

1. `src/components/TrafftBooking.astro` neu — kapselt Embed + Section-Wrapper + IntersectionObserver für GA4-Event
2. `src/components/GruenderLanding.astro` — `<TrafftBooking />` zwischen Form und FAQ einhängen
3. `src/components/ZipChat.astro` neu — kapselt ZipChat-Script
4. `src/layouts/BaseLayout.astro` — optionaler Prop `enableChat?: boolean`, conditional Mount
5. `src/pages/preise.astro` — `enableChat={true}` an BaseLayout
6. `src/pages/hilfe/index.astro` + `src/pages/hilfe/[...slug].astro` — `enableChat={true}` an BaseLayout
7. `src/lib/analytics.ts` — `trafftView()` exportieren
8. `src/pages/datenschutz.astro` — zwei neue Abschnitte (Trafft + ZipChat)

## Risiken & Annahmen

- **AI-Quota (ZipChat):** 400 Antworten/Monat. Bei Spike-Traffic könnte Bot in "Human-Reply"-Modus fallen → Daniel muss antworten. Minimal-Rollout (18 Pages) hält Risiko klein.
- **Trafft-Embed-Höhe:** 768 px ist fix. Auf Mobile ggf. cramped → Test im Browser-Mobile-View vor Merge.
- **Drittland-Transfer:** Sowohl `termin.leanr.one` (vermutlich EU-Hosting) als auch `zipchat.ai` (vermutlich USA) müssen DPA-konform sein. Daniel verifiziert mit beiden Anbietern.
- **CTA-Konkurrenz:** Bewusst kein Bot auf `/koeln/gruender` (Funnel-Klarheit). Bewusst kein Trafft auf Standard-Pages (zu hoch-schwellig). Wenn beide gut performen, kann v2 das ausweiten.
- **Annahme:** Trafft-Embed-Script lädt clientseitig ohne weitere Auth — verifiziert via Embed-Snippet vom User.

## Rollout-Plan

Empfehlung: **ein Branch, ein Deploy, beide Integrationen zusammen.** Begründung: kleiner Blast-Radius (insgesamt 19 Pages betroffen, davon 1 für Trafft + 18 für ZipChat ohne Überschneidung), und du willst sowieso heute beides live haben.

1. Branch `feat/trafft-zipchat` von main
2. Trafft + ZipChat Komponenten + Page-Anbindung implementieren
3. Lokaler Test (`npm run preview`, NICHT `npm run dev` wegen iCloud-Falle)
4. Datenschutz-Update committen
5. Branch zu main mergen → GitHub-Actions deployed automatisch
6. Live-Verifikation Daniel: /koeln/gruender (Trafft sichtbar + Test-Buchung), /preise (Bot sichtbar + Test-Chat), /hilfe (Bot sichtbar + Test-Chat)
7. 7 Tage beobachten → entscheiden ob ausweiten (Trafft auf weitere Städte, ZipChat auf mehr Pages)

## Konsistenz-Check (Selbst-Review)

- ✅ Kein Test-Before-Push übersprungen (lokaler Preview-Test + Live-Check in Rollout-Plan verankert)
- ✅ Datenschutz adressiert (eigener Abschnitt + Daniel-Review-Task)
- ✅ Mobile-First respektiert (Trafft-Mobile-Test im Risiko-Abschnitt)
- ✅ Tracking minimal (nur ein GA4-Event für Trafft, kein YAGNI-Verstoß)
- ✅ Existierende Architektur respektiert (Astro-Komponenten, BaseLayout-Locale-Pattern, GruenderLanding parametrisiert)
- ✅ Bewusst nicht in v1: aufgeführt im Out-of-Scope, nicht versteckt
