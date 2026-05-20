# Design-Spec: Französische Version (/fr/) + Paris

**Datum:** 2026-05-20
**Projekt:** bonuskarte.digital
**Ziel:** Markteintritt Frankreich (Paris) als eigene Sprachversion — SEO-first.

---

## 1. Ziel & Kontext
bonuskarte.digital ist eine programmatische SEO-Seite (15 deutsche Städte, Branche × Stadtteil). Für den Verkauf in Paris wird eine **französische Sprachversion** ergänzt. Die ganze Seite existiert für SEO → Übersetzung = **lokalisiertes französisches SEO**, keine 1:1-Übersetzung.

## 2. Strategie (entschieden)
- **Unterverzeichnis `bonuskarte.digital/fr/`** + hreflang.
- **Die deutsche Seite bleibt vollständig unangetastet live** (15 Städte).
- Architektur: **manuelles `/fr/`-Spiegel-Verzeichnis** (kein Astro-i18n-Umbau → kein Risiko für die DE-Live-SEO).

## 3. URL-Struktur
```
/fr/                                  französische Startseite
/fr/paris/                            Paris-Hub (Arrondissement-Auswahl)
/fr/paris/[arr]/                      Arrondissement-Hub (Branchen-Auswahl)   ×20
/fr/paris/[arr]/[niche]               Branchen-Seite (SEO-Geld-Seiten)        ×200
/fr/tarifs                            Preise
/fr/mentions-legales                  Impressum (FR-Pflicht)
/fr/confidentialite                   Datenschutz / RGPD
```
- **Arrondissement-Slug = Kurzform** `1er`, `2e` … `20e` (so suchen Franzosen: „… paris 11e"). Volle Keyword-Varianten („11e arrondissement", PLZ „75011", Quartiers) stehen in **Title/H1/Text**, nicht in der URL.
- **Alle 20 Arrondissements.**
- Seiten gesamt: 1 + 1 + 20 + 200 + 3 = **~225 FR-Seiten**.

## 4. Branchen (final, 10) — FR-Slug
| DE | FR-Label | Slug |
|---|---|---|
| Bäckerei | Boulangerie | `boulangerie` |
| Café | Café / Salon de thé | `cafe` |
| Restaurant | Restaurant | `restaurant` |
| Friseur | Coiffeur | `coiffeur` |
| Döner | Kebab | `kebab` |
| Pizza | Pizzeria | `pizzeria` |
| Eiscafé | Glacier | `glacier` |
| Blumenladen | Fleuriste | `fleuriste` |
| Fitnessstudio | Salle de sport | `salle-de-sport` |
| Beauty | Institut de beauté | `institut-de-beaute` |

Jede Branche bekommt **eigene französische SEO-Copy** (seoTitle, seoDescription, Hero, Argumente) — Begriffe wie Franzosen sie suchen, nicht wörtlich übersetzt. B2B-Zielkeyword-Muster: „carte de fidélité [branche]".

## 5. SEO-Kern (oberste Priorität)
- **hreflang nur zwischen echten Übersetzungs-Paaren:** `/` ↔ `/fr/`, `/preise` ↔ `/fr/tarifs`, Recht ↔ Recht. Paris-Seiten & deutsche Stadt-Seiten haben **keinen** Partner → nur self-canonical + `lang`, **nicht** falsch verlinken.
- **`BaseLayout` wird locale-fähig** (neue optionale Props `lang`/`locale`/`alternates`, Defaults = `de`/`de_DE` → DE-Verhalten unverändert). FR-Seiten rendern `<html lang="fr">`, `og:locale=fr_FR`.
- **Einzigartiger FR-Intro pro Arrondissement** (mit Quartiers/Wahrzeichen: Le Marais, Montmartre …) → gegen Thin/Duplicate Content bei 200 ähnlichen Seiten.
- **FOMO-Zähler = 0** für alle Paris-Branchen zum Start (neuer Markt, keine erfundenen „X Betriebe dabei"). Badge erscheint erst mit echten Kunden.
- Sitemap nimmt `/fr/`-Seiten automatisch auf (`@astrojs/sitemap` läuft).

## 6. Neue / geänderte Dateien
**Neu:**
- `src/data/fr/paris.ts` — 20 Arrondissements (slug, name, einzigartiger FR-Intro, fomoCount=0)
- `src/data/fr/niches-fr.ts` — FR-SEO-Copy der 10 Branchen
- `src/pages/fr/index.astro`, `src/pages/fr/paris/index.astro`, `src/pages/fr/paris/[arr]/index.astro`, `src/pages/fr/paris/[arr]/[niche].astro`, `src/pages/fr/tarifs.astro`, `src/pages/fr/mentions-legales.astro`, `src/pages/fr/confidentialite.astro`
- `src/components/NavbarFr.astro`, `src/components/FooterFr.astro` (FR-Kopien → DE-Komponenten bleiben unberührt)

**Minimal geändert:**
- `src/layouts/BaseLayout.astro` — optionale locale-Props (DE-Defaults)
- **Sprachumschalter DE/FR** in der **Navbar** (Desktop oben rechts, Mobile im Klappmenü) — nur ein zusätzlicher Link, nichts wird entfernt. **Kein** Footer-Switcher. Einziger Eingriff in eine DE-Live-Datei (`Navbar.astro`).

## 7. Rechtliches
Deutsche/EU-Firma (fuerte.digital) bleibt Betreiber. `/fr/mentions-legales` + `/fr/confidentialite` auf Französisch, RGPD-konform, gleiche Firmen-/Kontaktdaten.

## 8. Bewusst NICHT in v1
Blog (25 Artikel) + Hilfe-Center (17 Artikel). Kommen später als **echte französische Artikel** (nicht als Übersetzung der DE-stadtspezifischen Texte). FR-Navigation blendet diese Punkte vorerst aus.

## 9. Übersetzungs-/Copy-Ansatz
Ich erstelle die französische SEO-Copy (lokalisiert). **Daniel prüft alles vor dem Deploy.** Muttersprachliches Feintuning = letzter Schritt.

## 10. Entscheidungen (alle getroffen)
- Sprachumschalter: **ja**, nur **Navbar** (Desktop rechts, Mobile im Klappmenü). Kein Footer-Switcher.

## 11. Out of Scope / später
- Conversion-Tracking ist bereits live (separat erledigt).
- Keyword-Daten via Google Ads API: blockiert (Token nur Explorer-Access) — nicht Teil dieses Specs.
