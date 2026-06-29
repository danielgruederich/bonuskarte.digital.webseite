# Buchungsbestätigungsseite /danke — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Statische `/danke`-Seite, die SimplyMeet.me-Buchungsdetails aus URL-Parametern anzeigt und einmalig einen Pabbly-Webhook feuert.

**Architecture:** Statische Astro-Seite (output: static) mit eingebettetem Vanilla-JS-Script. Die Pabbly-Webhook-URL wird über `src/config/integrations.ts` konfiguriert und per `define:vars` in den Client-Script-Block injiziert. Kein Backend, kein SSR.

**Tech Stack:** Astro 4, Tailwind CSS, Vanilla JS, Pabbly Connect Webhook

## Global Constraints

- Sprache: Deutsch (Labels, Texte)
- Design-System: Paper / Ink / Amber (identisch mit `/termin`)
- `noindex: true` — Seite soll nicht indexiert werden
- `showStickyCta: false` — kein Sticky-CTA-Bar
- Mobile First
- Kein API-Key im Client — nur öffentliche Webhook-URL

---

### Task 1: Pabbly Config zu integrations.ts hinzufügen

**Files:**
- Modify: `src/config/integrations.ts`

**Interfaces:**
- Produces: `pabbly.webhookUrl: string` — importierbar in danke.astro

- [ ] **Step 1: integrations.ts öffnen und Pabbly-Block am Ende einfügen**

Datei: `src/config/integrations.ts` — folgenden Block **vor** der letzten Zeile (`export const integrations = ...`) einfügen:

```typescript
// ── Pabbly Connect (Buchungsbestätigung → SimplyMeet.me /danke) ──────────────
export const pabbly = {
  /**
   * Pabbly Connect Webhook-URL für Buchungsbestätigungen von SimplyMeet.me.
   * Leer lassen → kein Webhook wird gefeuert, Seite bleibt voll funktional.
   * Eintragen sobald Pabbly-Workflow erstellt ist.
   */
  webhookUrl: '' as string,
}
```

Und die letzte Zeile aktualisieren:

```typescript
export const integrations = { zipchat, trafft, pabbly }
```

- [ ] **Step 2: Build-Check**

```bash
cd "/Users/danielgruederich/Developer/Claude projects/bonuskarte-digital"
npm run build 2>&1 | tail -5
```

Erwartete Ausgabe: `✓ Completed in` — kein Fehler.

- [ ] **Step 3: Commit**

```bash
cd "/Users/danielgruederich/Developer/Claude projects/bonuskarte-digital"
git add src/config/integrations.ts
git commit -m "feat: add pabbly webhook config to integrations"
```

---

### Task 2: danke.astro erstellen

**Files:**
- Create: `src/pages/danke.astro`

**Interfaces:**
- Consumes: `pabbly.webhookUrl: string` aus `src/config/integrations.ts`
- Consumes: `BaseLayout`, `Navbar`, `Footer` aus bestehenden Komponenten

- [ ] **Step 1: Datei erstellen**

Neue Datei `src/pages/danke.astro` mit folgendem Inhalt:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import Navbar from '../components/Navbar.astro'
import Footer from '../components/Footer.astro'
import { pabbly } from '../config/integrations'
---

<BaseLayout
  title="Buchung bestätigt | bonuskarte.digital"
  description="Dein Termin ist gebucht. Wir freuen uns auf das Gespräch!"
  noindex={true}
  showStickyCta={false}
>
  <Navbar ctaHref="/koeln" ctaLabel="Zur Startseite" />

  <!-- Hero -->
  <section class="relative bg-paper overflow-hidden pt-28 pb-12 px-5 sm:px-8">
    <div class="absolute inset-0 bg-grid-ink"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber rounded-full blur-[200px] opacity-5 pointer-events-none"></div>

    <div class="relative max-w-3xl mx-auto text-center">
      <div class="inline-flex items-center gap-3 border border-amber/50 px-4 py-2 mb-8">
        <span class="w-1 h-1 bg-amber animate-pulse-slow"></span>
        <span class="text-amber text-xs font-normal tracking-[0.3em] uppercase">
          Buchung bestätigt
        </span>
      </div>
      <h1 class="text-4xl sm:text-5xl leading-[1.1] tracking-tight mb-6">
        <span class="font-normal text-ink block mb-2">Wir sehen uns,</span>
        <span id="invitee-name" class="font-bold text-amber block">bald!</span>
      </h1>
      <p id="hero-subtext" class="text-ink/60 text-base font-normal leading-relaxed max-w-lg mx-auto">
        Dein Termin ist reserviert. Wir freuen uns drauf.
      </p>
    </div>
  </section>

  <!-- Details + Next Steps + CTA -->
  <section class="bg-ink pb-16 px-5 sm:px-8">
    <div class="max-w-3xl mx-auto space-y-6 pt-8">

      <!-- Buchungsdetails -->
      <div class="border border-amber/20 bg-paper p-6 sm:p-8 space-y-4">
        <div id="row-date" class="hidden items-start gap-4">
          <svg class="w-5 h-5 text-amber mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span id="meeting-date" class="text-ink text-sm font-normal leading-relaxed"></span>
        </div>
        <div id="row-email" class="hidden items-start gap-4">
          <svg class="w-5 h-5 text-amber mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span id="invitee-email-text" class="text-ink text-sm font-normal"></span>
        </div>
        <div id="row-type" class="hidden items-start gap-4">
          <svg class="w-5 h-5 text-amber mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span id="meeting-type-text" class="text-ink text-sm font-normal"></span>
        </div>
      </div>

      <!-- Nächste Schritte -->
      <div class="border border-amber/20 bg-paper p-6 sm:p-8">
        <h2 class="text-ink text-xs font-bold tracking-[0.25em] uppercase mb-6">Was passiert als nächstes?</h2>
        <ol class="space-y-5">
          <li class="flex items-start gap-4">
            <span class="text-amber text-xs font-bold tracking-widest mt-0.5 shrink-0">01</span>
            <p class="text-ink/70 text-sm font-normal leading-relaxed">
              Du bekommst eine Bestätigungsmail von SimplyMeet.me mit allen Details.
            </p>
          </li>
          <li class="flex items-start gap-4">
            <span class="text-amber text-xs font-bold tracking-widest mt-0.5 shrink-0">02</span>
            <p class="text-ink/70 text-sm font-normal leading-relaxed">
              Bereite gerne ein paar Infos vor: dein Name, Branche, und ungefähr wie viele Kunden du hast.
            </p>
          </li>
          <li class="flex items-start gap-4">
            <span class="text-amber text-xs font-bold tracking-widest mt-0.5 shrink-0">03</span>
            <p class="text-ink/70 text-sm font-normal leading-relaxed">
              Bei Fragen erreichst du uns jederzeit per
              <a href="https://wa.me/DEINENUMMER" class="text-amber hover:underline">WhatsApp</a>
              oder <a href="mailto:hallo@bonuskarte.digital" class="text-amber hover:underline">E-Mail</a>.
            </p>
          </li>
        </ol>
      </div>

      <!-- CTA -->
      <a
        href="/koeln"
        class="flex items-center justify-center w-full bg-amber hover:bg-amber-dark text-black px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase transition-all"
      >
        Zur Startseite
      </a>

    </div>
  </section>

  <Footer />

  <script define:vars={{ webhookUrl: pabbly.webhookUrl }}>
    (function () {
      const KEY = 'booking_tracked'
      const params = new URLSearchParams(window.location.search)

      const fullName  = params.get('invitee_full_name')    || ''
      const email     = params.get('invitee_email')         || ''
      const startsAt  = params.get('meeting_starts_at')     || ''
      const type      = params.get('meeting_type')          || ''
      const phone     = params.get('invitee_phone_number')  || ''

      // Personalize hero
      const firstName = fullName.split(' ')[0]
      if (firstName) {
        var nameEl = document.getElementById('invitee-name')
        if (nameEl) nameEl.textContent = firstName + '!'
      }
      if (startsAt) {
        var subtextEl = document.getElementById('hero-subtext')
        if (subtextEl) subtextEl.textContent = 'Dein Termin am ' + startsAt + ' ist reserviert. Wir freuen uns drauf.'
      }

      // Show booking detail rows
      function showRow(rowId, contentId, text) {
        if (!text) return
        var row     = document.getElementById(rowId)
        var content = document.getElementById(contentId)
        if (row && content) {
          content.textContent = text
          row.classList.remove('hidden')
          row.classList.add('flex')
        }
      }
      showRow('row-date',  'meeting-date',       startsAt)
      showRow('row-email', 'invitee-email-text', email)
      showRow('row-type',  'meeting-type-text',  type)

      // Pabbly webhook — once per session, only when email present
      if (email && webhookUrl && !sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, '1')
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            invitee_full_name:    fullName,
            invitee_email:        email,
            meeting_starts_at:    startsAt,
            meeting_type:         type,
            invitee_phone_number: phone,
            source:               'simplymeet'
          })
        }).catch(function () {
          // Webhook-Fehler ist still — User Experience unberührt
        })
      }
    })()
  </script>

</BaseLayout>
```

- [ ] **Step 2: WhatsApp-Nummer eintragen**

In `danke.astro` Zeile mit `wa.me/DEINENUMMER` anpassen:

```
https://wa.me/DEINENUMMER
→ https://wa.me/4922XXXXXXX  (mit Ländervorwahl, kein +, kein Leerzeichen)
```

Falls noch keine WhatsApp-Nummer feststeht: Placeholder so lassen und nach Deployment ändern.

- [ ] **Step 3: Dev-Server starten und Seite manuell testen**

```bash
cd "/Users/danielgruederich/Developer/Claude projects/bonuskarte-digital"
npm run dev
```

Browser öffnen:
```
http://localhost:4321/danke
```
Erwartung: Generischer Text (`Wir sehen uns, bald!`), keine Detail-Zeilen sichtbar (alle `hidden`).

Dann mit Parametern testen:
```
http://localhost:4321/danke?invitee_full_name=Max+Mustermann&invitee_email=max%40cafe.de&meeting_starts_at=Wednesday%2C+July+2%2C+2026+10%3A00&meeting_type=Setup-Gespr%C3%A4ch
```
Erwartung:
- H1: `Wir sehen uns, Max!`
- Subtext: `Dein Termin am Wednesday, July 2, 2026 10:00 ist reserviert.`
- Drei Detail-Zeilen sichtbar (Datum, E-Mail, Meeting-Typ)
- Browser Dev Tools → Network: kein Webhook-Call (webhookUrl ist leer)

- [ ] **Step 4: Build-Check**

```bash
npm run build 2>&1 | tail -5
```

Erwartung: `✓ Completed` — `/danke` taucht in der Ausgabe auf.

- [ ] **Step 5: Commit**

```bash
git add src/pages/danke.astro
git commit -m "feat: add booking confirmation page /danke"
```

---

### Task 3: Pabbly-Webhook-URL eintragen und live testen

**Voraussetzung:** Pabbly-Workflow ist erstellt und die Webhook-URL liegt vor.

**Files:**
- Modify: `src/config/integrations.ts` (webhookUrl befüllen)

- [ ] **Step 1: Webhook-URL in integrations.ts eintragen**

```typescript
export const pabbly = {
  webhookUrl: 'https://connect.pabbly.com/workflow/sendwebhookdata/DEINE-ID' as string,
}
```

- [ ] **Step 2: Live testen mit Testaufruf**

Browser Dev Tools → Network Tab öffnen. Dann URL aufrufen:
```
http://localhost:4321/danke?invitee_full_name=Test+Person&invitee_email=test%40test.de&meeting_starts_at=Wednesday%2C+July+2%2C+2026+10%3A00&meeting_type=Setup-Gespr%C3%A4ch
```

Erwartung: POST-Request an Pabbly sichtbar im Network-Tab, Status 200.
In Pabbly: Webhook-Eingang mit korrektem JSON-Payload verifizieren.

- [ ] **Step 3: Doppel-Fire-Schutz testen**

Seite neu laden (F5). Erwartung: **kein** zweiter Webhook-Call im Network-Tab.
`sessionStorage` im Browser prüfen: `booking_tracked = "1"` vorhanden.

- [ ] **Step 4: Commit und Push**

```bash
git add src/config/integrations.ts
git commit -m "feat: configure pabbly webhook url for booking confirmation"
git push
```

---

### Task 4: SimplyMeet.me Redirect konfigurieren

**Kein Code** — reine Konfiguration im SimplyMeet.me-Dashboard.

- [ ] **Step 1: SimplyMeet.me Dashboard öffnen**

Einstellungen → Meeting-Typ → "Additional options" → "Redirect after booking"

- [ ] **Step 2: Redirect-URL eintragen**

```
https://bonuskarte.digital/danke
```

SimplyMeet.me fügt automatisch die Parameter an:
```
https://bonuskarte.digital/danke?invitee_full_name=...&invitee_email=...&meeting_starts_at=...&meeting_type=...
```

- [ ] **Step 3: Live-Buchung testen**

Einen echten Testtermin über SimplyMeet.me buchen und prüfen:
- Redirect landet auf `/danke` mit korrekten URL-Parametern
- Vorname erscheint im H1
- Pabbly-Webhook empfängt die Buchung
- Google Sheets (via Pabbly) enthält den neuen Eintrag
