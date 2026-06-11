# Lead-Flow-Optimierung — Plan & Design

**Datum:** 2026-06-09
**Branch:** `feature/lead-flow-optimization`
**Ziel:** Den kompletten B2B-Lead-Flow (Besuch → Formular → Lead → Kontakt) auf bonuskarte.digital optimieren — höhere Abschlussquote, kein Lead-Verlust, schnelleres Follow-up.

---

## Ist-Zustand (vor Optimierung)

```
1. BESUCH    →  Nischen-Landingpage  /koeln/<veedel>/<niche>  (oder walkin / gruender)
2. FUNNEL    →  Landingpage-Copy + CTA  →  scrollt zum LeadForm (#demo, ganz unten)
3. FORMULAR  →  Vorname*  ·  Handynummer*  ·  Instagram/Geschäftsname (optional)
4. ABSENDEN  →  POST /api/submit.php
                ├─ Boomerang: Kunde + Demo-Karte → Wallet-Links
                └─ Salesflare: Account + Kontakt + Opportunity (NACH Boomerang)
5. SUCCESS   →  Wallet-Install + 3-Schritt-Erklärung + WhatsApp-CTA
6. KONTAKT   →  MANUELLES Follow-up (kein Alert, keine Automation)
```

Zentrale Dateien:
- `src/components/LeadForm.tsx` — Hauptformular
- `public/api/submit.php` — Backend (Boomerang + Salesflare)
- `src/pages/koeln/[veedel]/[niche].astro` — Landingpage (60 Seiten, programmatisch)
- `src/lib/analytics.ts` — Funnel-Tracking (GA4 + Google Ads)

---

## Umfang: 5 Schritte (Reihenfolge nach Risiko)

> #6 (GA4-Funnel-Daten anschauen) ist bewusst NICHT Teil dieser Umsetzung — das ist Daniels
> Hausaufgabe, um die Hypothesen mit echten Zahlen zu validieren.

### [x] Schritt 2 — Lead-Speicherung absichern *(ERLEDIGT 2026-06-10, lokal verifiziert, Test nach Deploy offen)*
**Problem:** In `submit.php` läuft der Salesflare-Eintrag erst NACH erfolgreicher Boomerang-Karte
(Zeile 215–294). Hakt Boomerang (Timeout/500), bekommt der Nutzer einen Fehler **und der Lead ist
komplett weg** — nicht mal in Salesflare.
**Lösung:** Salesflare-Lead-Capture so umstellen, dass er IMMER läuft, unabhängig vom Boomerang-Ergebnis.
Der Lead wird gespeichert, bevor / parallel zur Demo-Karten-Erstellung — Boomerang-Fehler darf den
Lead nicht mehr verschlucken.
**Aufwand:** ~30–60 min · **Risiko:** niedrig (reines Backend)

### [x] Schritt 1 — Sofort-Benachrichtigung bei neuem Lead *(CODE FERTIG 2026-06-10)*
> Code in `submit.php` fertig (`notifyTelegramLead()`, Aufruf in Step 0). Telegram-Bot
> `@bonuskarte_leads_bot` angelegt, Token + Chat-ID (128525956) eingetragen, Format live
> getestet (Beispiel-Nachricht kam an). OFFEN: Daniels Bestätigung „Format/wa.me-Text passt"
> + finaler Live-Test mit echtem Test-Lead nach Deploy.
**Problem:** Follow-up ist manuell. Je länger es dauert, desto kälter der Lead.
**Lösung:** `submit.php` pingt bei jedem Lead sofort per Telegram mit Name + Nummer + Nische +
fertigem `wa.me`-Link (ein Tap zum Zurückschreiben). Fire-and-forget, blockiert die Antwort nie.
**Entscheidung:** Telegram **Option B — eigener Bot** für bonuskarte.
**Braucht von Daniel:** Bot bei @BotFather anlegen → Bot-Token + Chat-ID liefern.
**Aufwand:** ~1–2 h · **Risiko:** niedrig

### [ ] Schritt 4 — E-Mail als Alternative zur Handynummer
**Problem:** Handynummer ist Pflicht — hohe Hürde für Ladenbesitzer.
**Lösung:** Frontend (`LeadForm.tsx`) bietet E-Mail zusätzlich an. Backend akzeptiert E-Mail ODER
Telefon bereits.
**OFFENE ENTSCHEIDUNG:** (a) Telefon Pflicht + E-Mail optional, ODER (b) eines von beiden Pflicht
(senkt Hürde mehr). **Empfehlung: (b).**
**Aufwand:** ~1–2 h · **Risiko:** niedrig–mittel (Form-Logik)

### [ ] Schritt 3 — Formular in den Hero
**Problem:** Formular sitzt ganz unten (nach 4 Sektionen). Rechts im Hero nur statisches Mockup.
**Lösung:** Form in die rechte Hero-Spalte. Desktop: Form ersetzt/ergänzt Mockup. Mobile: gestapelt
wie bisher.
**OFFENE ENTSCHEIDUNG:** Mockup ganz ersetzen, oder kleiner darüber behalten? **Empfehlung: ersetzen,
Mockup als kleines Vertrauenselement darüber.**
**Aufwand:** ~2–4 h + Browser-Test (Desktop + Mobile) · **Risiko:** mittel (Layout, viele Seiten betroffen)

### [ ] Schritt 5 — Demo-Termin buchen (cal.com)
**Problem:** Manche wollen erst reden, bevor sie Daten geben. `demo_booking`-Event ist getrackt
(`analytics.ts:66`), aber kein Buchungs-Tool eingebaut.
**Lösung:** Zweiter Conversion-Pfad — SimplyMeet.me-Buchungs-CTA, `demo_booking`-Event verdrahten.
**Tool:** SimplyMeet.me (Admin: https://secure.simplymeet.me/organization).
**Braucht von Daniel:** ÖFFENTLICHE Buchungs-URL (nicht die Admin-/Login-Seite), z.B. https://NAME.simplymeet.me.
**Aufwand:** ~halber Tag · **Risiko:** niedrig–mittel

---

## Nebenbefund (kein Conversion-Hebel, aber wichtig)
API-Keys (Boomerang + Salesflare) stehen im Klartext in `submit.php` (Zeile 31–33) → im Git-Repo.
Sollten rotiert und in nicht-committete Config ausgelagert werden. NICHT Teil dieses Pakets, separat
zu entscheiden.

---

## Regeln für diese Arbeit
- Eigener Branch `feature/lead-flow-optimization`, **kein Push ohne Daniels Freigabe**.
- Ein Schritt pro Nachricht, jeder Schritt einzeln getestet.
- UI-Änderungen (#3, #4) vor Merge im Browser testen (Desktop + Mobile).
- Keine Secrets in Commits.

---

## Stand bei Session-Ende (2026-06-10)

**Fertig (Code, lokal, noch nicht committet/gepusht/deployed):**
- ✅ Schritt #2 — Lead-Speicherung abgesichert (`recordSalesflareLead()` als Step 0)
- ✅ Schritt #1 — Telegram-Sofort-Alert (`notifyTelegramLead()`), Bot `@bonuskarte_leads_bot`,
  Chat-ID 128525956, Format live getestet

**Offen / nächste Schritte (in dieser Reihenfolge):**
1. Daniel bestätigt: Telegram-Format + vorgeschriebener wa.me-Text passt (oder Änderungswunsch)
2. Commit + Push `feature/lead-flow-optimization` (braucht Daniels Freigabe — Live-Site)
3. Deploy → finaler Live-Test: echtes Test-Formular absenden, prüfen ob Telegram-Alert kommt
   und Salesflare-Lead korrekt angelegt wird
4. Schritt #4 — E-Mail als Alternative zur Handynummer (offene Entscheidung: Telefon-Pflicht +
   E-Mail optional, ODER eines von beiden Pflicht — Empfehlung: eines von beiden)
5. Schritt #3 — Formular in den Hero (Browser-Test Desktop + Mobile nötig)
6. Schritt #5 — SimplyMeet.me-Buchung (braucht öffentliche Buchungs-URL von Daniel)

**Wichtig:** `submit.php` enthält jetzt zusätzlich den Telegram-Token im Klartext → derselbe
Security-Nebenbefund wie die bestehenden API-Keys. Separat angehen (Keys rotieren + auslagern).
