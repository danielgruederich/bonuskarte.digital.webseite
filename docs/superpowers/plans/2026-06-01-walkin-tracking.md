# Walk-in-Landingpage + nische-unabhängiges Tracking — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine zweite, noindexte Landingpage `/koeln/walkin` fürs iPad beim Walk-in bauen und die Gründer-Seiten nische-unabhängig machen, sodass jeder Funnel-Step getrackt wird und Walk-in vs. Online getrennt auslesbar ist.

**Architecture:** Beide Seiten rendern dieselbe `GruenderLanding`-Komponente; der einzige Unterschied ist ein `source`-Prop (`gruender` vs. `gruender_walkin`). Die Nische wird vom festen Prop zu einem Pflicht-Dropdown im `LeadForm`. Ein neues Event `niche_selected` schließt die Tracking-Lücke zwischen „Demo gesehen" und „Formular begonnen".

**Tech Stack:** Astro 4 (static), React-Islands (TSX), Tailwind, PHP-Endpoint (`submit.php`), GA4 + Google Ads, Salesflare. Kein Unit-Test-Framework vorhanden → Verifikation per Build, HTML-Grep, GA4-Echtzeit, Browser-Check.

> **iCloud-Build-Caveat:** Lokaler `npm run build` hängt unter System-Node + iCloud. Vor jedem Build: `fnm use 22` (ggf. `fnm install 22`). Wenn der Build trotzdem hängt, ist die kanonische Verifikation der Deploy-Build via GitHub Actions. Siehe Memory `feedback_icloud_breaks_local_builds`.

---

## File Structure

| Datei | Verantwortung | Aktion |
|---|---|---|
| `src/lib/analytics.ts` | Funnel-Events | Modify — `nicheSelected` ergänzen |
| `src/components/LeadForm.tsx` | Lead-Formular + Tracking | Modify — `selectableNiche`/`source`-Props, Branchen-Dropdown, `source` entkoppeln |
| `src/components/GruenderLanding.astro` | Gründer-Seiten-Layout | Modify — `source`-Prop, Branchen-Liste + `selectableNiche` an LeadForm, festes `niche` raus |
| `src/pages/koeln/gruender.astro` | Wrapper öffentlich | Modify — `source="gruender"` |
| `src/pages/koeln/walkin.astro` | Wrapper Walk-in | **Create** — `source="gruender_walkin"` |
| `astro.config.mjs` | Sitemap-Filter | Modify — `/walkin` ausschließen |
| `public/api/submit.php` | Lead → Boomerang + Salesflare | Modify — `source` lesen, `walkin`-Tag |
| `MESSPLAN.md` | Tracking-Doku | Modify — neues Event/Source/Tag |
| `CLAUDE.md` | Projekt-Doku | Modify — `/koeln/walkin` eintragen |

---

## Task 1: `niche_selected`-Event in analytics.ts

**Files:**
- Modify: `src/lib/analytics.ts`

- [ ] **Step 1: Funktion ergänzen**

In `src/lib/analytics.ts`, direkt nach dem `signupFormStart`-Block (vor `signupSubmitAttempt`), einfügen:

```typescript
  /** Funnel-Step: Branche im Dropdown gewählt (einmal pro Session) */
  nicheSelected: (niche: string, city: string, source: string = 'standard') =>
    track('niche_selected', { niche, city, source }),
```

- [ ] **Step 2: Verifizieren**

Run: `grep -n "niche_selected" src/lib/analytics.ts`
Expected: 2 Treffer (Kommentar-Doku + `track(`-Aufruf).

- [ ] **Step 3: Commit**

```bash
git add src/lib/analytics.ts
git commit -m "feat(analytics): niche_selected funnel-event ergänzen"
```

> **Notiz (außerhalb dieses Repos, optional):** GA4 sammelt `niche_selected` automatisch, sobald es feuert. Es als Key Event/Conversion zu markieren ist optional und liefe über `setup_ga4_events.py` im `fuerte-agency-data`-Repo — für die Funnel-Drop-off-Analyse nicht nötig.

---

## Task 2: LeadForm — Branchen-Dropdown + `source` entkoppeln

**Files:**
- Modify: `src/components/LeadForm.tsx`

- [ ] **Step 1: Props-Interface erweitern**

In `src/components/LeadForm.tsx` das `interface Props` ersetzen durch:

```typescript
interface NicheOption {
  slug: string
  label: string
}

interface Props {
  niche: string
  city: string
  formspreeId?: string
  whatsappUrl?: string
  mode?: 'standard' | 'gruender'
  bannerText?: string
  submitLabel?: string
  successHeadline?: string
  /** Wenn true: Branche wird per Dropdown gewählt statt festem `niche`-Prop */
  selectableNiche?: boolean
  /** Auswahloptionen fürs Dropdown (Pflicht wenn selectableNiche=true) */
  nicheOptions?: NicheOption[]
  /** Analytics-source; default = mode. Erlaubt z.B. 'gruender_walkin' bei identischem mode. */
  source?: string
}
```

- [ ] **Step 2: Funktions-Signatur + abgeleitete Werte**

Die Destrukturierung im `export default function LeadForm({...})` erweitern um `selectableNiche = false, nicheOptions = [], source` und direkt nach den `useState`/`useRef`-Zeilen (nach `const formStartedRef = useRef(false)`) ergänzen:

```typescript
  const [selectedNiche, setSelectedNiche] = useState('')
  const nicheSelectedRef = useRef(false)
  const trackSource = source ?? mode
  const effectiveNiche = selectableNiche ? selectedNiche : niche
```

- [ ] **Step 3: niche_selected-Handler + alle Analytics-Calls auf trackSource/effectiveNiche umstellen**

Neuen Handler nach `handleInstagramChange` einfügen:

```typescript
  function handleNicheChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedNiche(e.target.value)
    if (e.target.value && !nicheSelectedRef.current) {
      nicheSelectedRef.current = true
      analytics.nicheSelected(e.target.value, city, trackSource)
    }
  }
```

Dann in `handleSubmit`, `handleFirstFocus` und im success-Block jeden Analytics-Aufruf von `niche`→`effectiveNiche` und `mode`→`trackSource` umstellen. Konkret:

```typescript
    // in handleSubmit, ersetze:
    analytics.signupSubmitAttempt(effectiveNiche, city, trackSource)
    // ... im success-Zweig:
        analytics.demoCardCreated(effectiveNiche, city)
        analytics.signupSubmit(effectiveNiche, city, trackSource)
    // ... im api_error-Zweig:
        analytics.signupSubmitError(effectiveNiche, city, 'api_error', trackSource)
    // ... im catch/network-Zweig:
        analytics.signupSubmitError(effectiveNiche, city, 'network_error', trackSource)
```

Und der POST-Body in `handleSubmit` (das `body: JSON.stringify({...})`) wird zu:

```typescript
        body: JSON.stringify({
          vorname:   data.vorname,
          instagram: cleanInstagram,
          telefon:   data.telefon,
          niche:     effectiveNiche.toLowerCase(),
          city:      city.toLowerCase(),
          mode,
          source:    trackSource,
          utm:       getUtmParams(),
        }),
```

Und `handleFirstFocus`:

```typescript
  function handleFirstFocus() {
    if (!formStartedRef.current) {
      formStartedRef.current = true
      analytics.signupFormStart(effectiveNiche, city, trackSource)
    }
  }
```

- [ ] **Step 4: ChangeEvent-Import für Select sicherstellen**

Prüfen, dass `ChangeEvent` schon importiert ist (Zeile 1: `import { useState, type FormEvent, type ChangeEvent, useRef } from 'react'`). Ist vorhanden — nichts zu tun.

- [ ] **Step 5: Branchen-Dropdown ins Formular einfügen**

Im `return`-Block, direkt nach `<p ...>2 Pflichtfelder · 30 Sekunden</p>` und VOR dem Vorname-`<div>`, einfügen:

```tsx
      {selectableNiche && (
        <div>
          <label htmlFor="niche-select" className={labelClass}>Branche *</label>
          <select
            id="niche-select"
            name="niche-select"
            required
            value={selectedNiche}
            onChange={handleNicheChange}
            className={inputClass}
          >
            <option value="" disabled>Branche wählen</option>
            {nicheOptions.map((n) => (
              <option key={n.slug} value={n.slug} className="bg-black text-white">
                {n.label}
              </option>
            ))}
          </select>
        </div>
      )}
```

- [ ] **Step 6: Build verifizieren**

Run: `fnm use 22 && npm run build`
Expected: Build erfolgreich, keine TypeScript-Fehler. (Bei iCloud-Hang: via GitHub Actions verifizieren.)

- [ ] **Step 7: Commit**

```bash
git add src/components/LeadForm.tsx
git commit -m "feat(leadform): branchen-dropdown + source von mode entkoppeln"
```

---

## Task 3: GruenderLanding — source-Prop + Branchenliste an LeadForm

**Files:**
- Modify: `src/components/GruenderLanding.astro`

- [ ] **Step 1: Imports + Prop ergänzen**

Im Frontmatter (`---`-Block oben). Zusätzlichen Import unter den bestehenden Imports:

```astro
import { niches } from '../data/niches'
```

Den Props-Zugriff erweitern. Aktuell wird `config` als Prop genutzt; ergänze `source`:

```astro
const { config, source = 'gruender' } = Astro.props
```

(Falls aktuell `const config = Astro.props.config` o.ä. dasteht: durch die Zeile oben ersetzen. `const { cityCapitalized, cityDative, faq } = config` bleibt darunter.)

Und eine Branchen-Liste für das Dropdown ableiten:

```astro
const nicheOptions = niches.map((n) => ({ slug: n.slug, label: n.label }))
```

- [ ] **Step 2: LeadForm-Einbindung umstellen**

ZUERST den aktuellen `<LeadForm ... />`-Block in `GruenderLanding.astro` lesen (Read), um ALLE bestehenden Props zu sehen (`bannerText`, `submitLabel`, `successHeadline` etc. — diese Copy ist live und darf NICHT verändert werden).

Dann **nur drei neue Props ergänzen** und die bestehenden 1:1 beibehalten:

```astro
        source={source}
        selectableNiche={true}
        nicheOptions={nicheOptions}
```

> `niche="cafes"` bleibt als harmloser Fallback-Prop stehen (wird bei `selectableNiche=true` nicht fürs Tracking genutzt). Bestehende Banner-/Button-/Success-Texte unverändert lassen — keine Copy erfinden oder überschreiben.

- [ ] **Step 3: Build verifizieren**

Run: `fnm use 22 && npm run build`
Expected: Build erfolgreich.

- [ ] **Step 4: Commit**

```bash
git add src/components/GruenderLanding.astro
git commit -m "feat(gruender): source-prop + branchen-dropdown an leadform"
```

---

## Task 4: Wrapper-Seiten — gruender.astro anpassen + walkin.astro anlegen

**Files:**
- Modify: `src/pages/koeln/gruender.astro`
- Create: `src/pages/koeln/walkin.astro`

- [ ] **Step 1: gruender.astro auf explizites source umstellen**

`src/pages/koeln/gruender.astro` komplett ersetzen durch:

```astro
---
import GruenderLanding from '../../components/GruenderLanding.astro'
import { koeln } from '../../data/gruender'
---
<GruenderLanding config={koeln} source="gruender" />
```

- [ ] **Step 2: walkin.astro neu anlegen**

Datei `src/pages/koeln/walkin.astro` erstellen mit:

```astro
---
import GruenderLanding from '../../components/GruenderLanding.astro'
import { koeln } from '../../data/gruender'
---
<GruenderLanding config={koeln} source="gruender_walkin" />
```

- [ ] **Step 3: Build verifizieren — beide Seiten existieren**

Run: `fnm use 22 && npm run build && ls dist/koeln/gruender/index.html dist/koeln/walkin/index.html`
Expected: beide Dateien vorhanden.

- [ ] **Step 4: noindex im gebauten HTML prüfen**

Run: `grep -o 'noindex' dist/koeln/walkin/index.html`
Expected: Treffer `noindex` (von `BaseLayout` via `GruenderLanding`).

- [ ] **Step 5: Commit**

```bash
git add src/pages/koeln/gruender.astro src/pages/koeln/walkin.astro
git commit -m "feat(pages): /koeln/walkin anlegen, gruender source explizit"
```

---

## Task 5: Sitemap-Filter — /walkin ausschließen

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Filter erweitern**

In `astro.config.mjs` (Zeile 10) den Sitemap-Filter ändern von:

```javascript
sitemap({ filter: (page) => !page.includes('/preview-') && !page.includes('/gruender') }),
```

zu:

```javascript
sitemap({ filter: (page) => !page.includes('/preview-') && !page.includes('/gruender') && !page.includes('/walkin') }),
```

- [ ] **Step 2: Build + Sitemap prüfen**

Run: `fnm use 22 && npm run build && grep -c 'walkin' dist/sitemap-0.xml`
Expected: `0` (walkin NICHT in der Sitemap).

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(seo): /walkin aus sitemap ausschließen"
```

---

## Task 6: submit.php — source lesen + walkin-Tag

**Files:**
- Modify: `public/api/submit.php`

- [ ] **Step 1: source aus dem Body lesen**

In `public/api/submit.php`, bei den Body-Feld-Zuweisungen (nahe `$niche = strtolower(trim($body['niche'] ?? 'cafe'));`, ~Zeile 54), ergänzen:

```php
$source = strtolower(trim($body['source'] ?? ''));
```

- [ ] **Step 2: walkin-Tag im Gründer-Tag-Block**

Im Salesflare-Block (`if ($mode === 'gruender') { ... }`, ~Zeile 232) innerhalb des `if`-Blocks nach den bestehenden Tags ergänzen:

```php
        if ($source === 'gruender_walkin') {
            $baseTags[] = 'walkin';
        }
```

- [ ] **Step 3: Verifizieren (statisch — PHP läuft lokal nicht)**

Run: `grep -n "gruender_walkin\|\$source" public/api/submit.php`
Expected: `$source`-Zuweisung + `walkin`-Tag-Block sichtbar. Funktionaler Test erfolgt per echtem Test-Lead nach Deploy (Task 8).

- [ ] **Step 4: Commit**

```bash
git add public/api/submit.php
git commit -m "feat(api): walkin-source → salesflare walkin-tag"
```

---

## Task 7: Doku aktualisieren

**Files:**
- Modify: `MESSPLAN.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: MESSPLAN.md — neues Event + Source + Tag**

In `MESSPLAN.md` im Abschnitt „Funnel-Events" nach dem `signup_form_start`-Block einfügen:

```markdown
### `niche_selected`
- **Bedeutet:** Nutzer hat im Branchen-Dropdown (Gründer-/Walk-in-Seite) eine Branche gewählt.
- **Trigger:** `onChange` des Branchen-Selects in `LeadForm.tsx` (einmal pro Session).
- **Parameter:** `niche`, `city`, `source` (`'gruender'` oder `'gruender_walkin'`).
- **Nutzen:** Schließt die Funnel-Lücke zwischen `demo_card_view` und `signup_form_start` — zeigt Abbrecher, die zwar die Branche wählen, aber keine Kontaktdaten eingeben.
- **Status:** ✅ Live.
```

In der `source`-Werte-Tabelle (Abschnitt „Custom Dimension `source`") eine Zeile ergänzen:

```markdown
| `gruender_walkin` | Walk-in-Seite `/koeln/walkin/` (iPad-Anlage durch Gründer) |
```

In der Funnel-Reihenfolge oben (`page_view → demo_card_view → signup_form_start → signup_submit`) `niche_selected` zwischen `demo_card_view` und `signup_form_start` einfügen.

- [ ] **Step 2: CLAUDE.md — Walk-in-Seite eintragen**

In `CLAUDE.md` unter „Wichtige Dateien" oder „URL-Struktur" ergänzen:

```markdown
- `src/pages/koeln/walkin.astro` — Walk-in-Landingpage fürs iPad (noindex, `source='gruender_walkin'`), nische-unabhängig
```

- [ ] **Step 3: Commit**

```bash
git add MESSPLAN.md CLAUDE.md
git commit -m "docs: niche_selected event + walkin-seite dokumentieren"
```

---

## Task 8: End-to-End-Verifikation (nach Deploy)

> Diese Task ist manuell und erfolgt NACH dem Merge/Deploy auf die Live-/Preview-Umgebung. Kein Code, nur Prüfung. Erfordert Daniel.

- [ ] **Step 1: Branch deployen lassen**

Branch `feat/walkin-tracking` → nach Daniels Bestätigung mergen/deployen (GitHub Actions baut + FTP). Vorher prüfen, ob `feat/funnel-tracking` (Basis-Branch) schon auf main ist; falls nicht, gemeinsame Merge-Reihenfolge mit Daniel klären.

- [ ] **Step 2: Seiten live aufrufen (Desktop + Mobile)**

`https://bonuskarte.digital/koeln/walkin` und `/koeln/gruender` öffnen. Prüfen: Branchen-Dropdown sichtbar, alle 10 Branchen, Pflichtfeld, Layout korrekt auf Desktop UND Mobile.

- [ ] **Step 3: noindex live prüfen**

Run: `curl -s https://bonuskarte.digital/koeln/walkin/ | grep -o 'noindex'`
Expected: Treffer.

- [ ] **Step 4: GA4-Echtzeit — Funnel-Events**

GA4 → Berichte → Echtzeit. Auf `/koeln/walkin` Branche wählen + Formular abschicken. Prüfen, dass in Reihenfolge feuern: `demo_card_view`, `niche_selected`, `signup_form_start`, `signup_submit_attempt`, `signup_submit` — jeweils mit `source=gruender_walkin` und korrekter `niche`.

- [ ] **Step 5: Test-Lead in Salesflare prüfen**

Den Test-Lead aus Step 4 in Salesflare öffnen. Tags prüfen: `<branche>`, `gruender-100`, `lifetime-100eur`, `koeln`, **`walkin`**. Auf `/koeln/gruender` denselben Test machen → identisch, aber **ohne** `walkin`-Tag, `source=gruender`.

- [ ] **Step 6: Regression — Veedel-Seite unverändert**

`https://bonuskarte.digital/koeln/nippes/cafes` öffnen: KEIN Branchen-Dropdown, festes Café-Formular wie zuvor. Funnel-Events feuern mit `source=standard`.
</content>
