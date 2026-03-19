# Hilfe & Tutorials — bonuskarte.digital

## Zusammenfassung

Hilfe-Sektion für B2B-Kunden (Gastronomen), die bonuskarte.digital bereits nutzen. Tutorials als MDX-Dateien mit Text, Screenshots und eingebetteten Videos. Inhalt basiert auf Boomerangme-Docs, umgeschrieben für die bonuskarte.digital / FUERTE.DIGITAL Brand.

## Zielgruppe

B2B-Kunden — lokale Gastronomen/Händler in Deutschland, die ihre digitale Stempelkarte bereits erhalten haben und Hilfe bei der Nutzung brauchen.

## URL-Struktur

```
/hilfe/                                    → Übersicht (Kategorie-Grid)
/hilfe/erste-schritte/onboarding           → Einzelnes Tutorial
/hilfe/kartentypen/stempelkarte            → Einzelnes Tutorial
```

## Kategorien & Tutorials

### Erste Schritte
- **Onboarding** — Deine Karte ist da, und jetzt?
- **Karte an Gäste verteilen** — QR-Code, Link, Instagram

### Scanner App
- **Stempel vergeben**
- **Belohnung einlösen**

### Kartentypen
- **Stempelkarte** — Klassische Treuekarte, Stempel sammeln → Belohnung
- **Multipass** — Vorab-gekaufte Mehrfachbesuche (z.B. 10er-Karte)
- **Cashback** — Punkte als Prozentsatz der Einkäufe, progressive Stufen
- **Geschenkkarte** — Digitaler Gutschein mit Guthaben
- **Coupon** — Einmalige Angebote für Neukunden-Akquise
- **Mitgliedskarte** — Digitaler Clubausweis mit Mitgliedschaftsstufen
- **Rabattkarte** — Progressive Rabatte basierend auf Gesamtausgaben
- **Belohnungskarte** — Punktebasiertes Treueprogramm mit Belohnungsstufen
- **Aktionen (Promotions)** — Zeitlich begrenzte Kampagnen auf bestehenden Karten

### Push-Nachrichten
- **Push-Nachricht erstellen**
- **Automatisierung einrichten**

### Support
- **Kontakt & Hilfe**

## Layout

### Hilfe-Übersicht (`/hilfe/`)
- Hero mit Titel "Hilfe & Tutorials"
- Kategorie-Karten als Grid (Icon + Titel + Anzahl Tutorials)
- Klick → Kategorie-Übersicht

### Tutorial-Seite (Zwei-Spalten)
- **Links:** Fixierte Sidebar mit allen Kategorien und Tutorials, aktiver Link gold-highlighted
- **Rechts:** Breadcrumb → Titel → MDX-Content → Vorheriges/Nächstes Tutorial
- **Mobile:** Sidebar wird Hamburger-Dropdown, Content fullwidth

### Design
- Gleiches Black + Gold wie Hauptseite
- Sidebar dunkel, aktiver Link gold-highlighted
- Font: Inter (bestehend)

## Technische Umsetzung

### Astro-Version: 4.x (Content Collections v2)

### Content Collection Schema

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const hilfeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    video: z.string().url().optional(),
  }),
});

export const collections = {
  hilfe: hilfeCollection,
};
```

Die Kategorie wird aus dem Verzeichnisnamen im Slug abgeleitet (z.B. `scanner-app/stempel-vergeben` → Kategorie "Scanner App"). Kein separates `category`-Frontmatter-Feld nötig.

### Kategorie-Konfiguration

```ts
// src/data/hilfe-categories.ts
export const hilfeCategories = [
  { slug: 'erste-schritte', label: 'Erste Schritte', icon: '🚀', order: 1 },
  { slug: 'scanner-app', label: 'Scanner App', icon: '📱', order: 2 },
  { slug: 'kartentypen', label: 'Kartentypen', icon: '💳', order: 3 },
  { slug: 'push-nachrichten', label: 'Push-Nachrichten', icon: '🔔', order: 4 },
  { slug: 'support', label: 'Support', icon: '💬', order: 5 },
];
```

Diese Datei steuert Reihenfolge, Anzeigename und Icon der Kategorien in Sidebar und Übersichtsseite.

### Kategorie-Übersichtsseiten

Klick auf eine Kategorie-Karte führt direkt zum ersten Tutorial der Kategorie (sortiert nach `order`). Keine eigene Zwischenseite — die Sidebar zeigt alle Tutorials der Kategorie.

### Slug-Generierung & Routing

Astro generiert Slugs aus dem Dateipfad relativ zum Collection-Root:
- `src/content/hilfe/scanner-app/stempel-vergeben.mdx` → Slug: `scanner-app/stempel-vergeben`
- `[...slug].astro` matched diesen mehrteiligen Slug via `getStaticPaths()`

```ts
// src/pages/hilfe/[...slug].astro
export async function getStaticPaths() {
  const entries = await getCollection('hilfe');
  return entries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}
```

### Ansatz: Astro Content Collections + MDX

#### Dateistruktur
```
src/
  content/
    hilfe/
      erste-schritte/
        onboarding.mdx
        karte-verteilen.mdx
      scanner-app/
        stempel-vergeben.mdx
        belohnung-einloesen.mdx
      kartentypen/
        stempelkarte.mdx
        multipass.mdx
        cashback.mdx
        geschenkkarte.mdx
        coupon.mdx
        mitgliedskarte.mdx
        rabattkarte.mdx
        belohnungskarte.mdx
        aktionen.mdx
      push-nachrichten/
        push-erstellen.mdx
        automatisierung.mdx
      support/
        kontakt.mdx
```

#### MDX Frontmatter
```yaml
---
title: "Stempel vergeben"
description: "So vergibst du Stempel mit der Scanner App"
order: 1
video: "https://youtube.com/..."  # optional
---
```

#### Neue Komponenten
- `src/components/hilfe/Sidebar.astro` — Sidebar-Navigation mit Kategorien
- `src/components/hilfe/VideoEmbed.astro` — Responsive YouTube/Loom Embed
- `src/components/hilfe/Callout.astro` — Hinweisboxen (Tipp, Warnung, Info)
- `src/components/hilfe/Screenshot.astro` — Bilder mit Caption
- `src/components/hilfe/StepList.astro` — Nummerierte Schritte mit Icons

#### Neue Layouts & Pages
- `src/layouts/HilfeLayout.astro` — Zwei-Spalten-Layout (Sidebar + Content)
- `src/pages/hilfe/index.astro` — Übersichtsseite mit Kategorie-Grid
- `src/pages/hilfe/[...slug].astro` — Dynamische Tutorial-Seiten aus Content Collection

#### Bilder
```
src/assets/hilfe/
  screenshots/
    scanner-stempel.png
    push-erstellen.png
    ...
```
Bilder in `src/assets/` statt `public/` — damit Astro automatische Bildoptimierung (WebP, Größenanpassung) über die `<Image>`-Komponente durchführen kann.

#### Navbar-Erweiterung
Link "Hilfe" wird in die bestehende Navigation (Navbar.astro) eingefügt.

#### Dependencies
- `@astrojs/mdx` — MDX-Integration für Astro (muss installiert werden)

## Content-Erstellung

Die Tutorial-Inhalte werden aus den Boomerangme-Docs übernommen und für die bonuskarte.digital Brand umgeschrieben:
- Boomerangme-Branding → FUERTE.DIGITAL / bonuskarte.digital
- Englisch → Deutsch
- Screenshots aus Boomerangme-Dashboard mit bonuskarte-Branding
- Vorhandene Boomerangme-Videos eingebettet (später ggf. durch eigene ersetzt)
- Tonalität: Einfach, direkt, für Gastronomen ohne Tech-Hintergrund

## Tutorial-Format

Jedes Tutorial folgt diesem Aufbau:
1. **Kurzbeschreibung** — Was lernst du hier? (1-2 Sätze)
2. **Video** — Eingebettetes Video (wenn vorhanden)
3. **Schritt-für-Schritt** — Nummerierte Anleitung mit Screenshots
4. **Tipps/Hinweise** — Callout-Boxen für wichtige Infos
5. **Nächste Schritte** — Link zum nächsten relevanten Tutorial
