# Testimonials – Design Spec (2026-06-18)

## Ziel
Ersetze die drei Platzhalter-Testimonials auf `index.astro` durch echte Kundenstimmen mit Business-Logos.

## Scope
Nur `src/pages/index.astro` — keine anderen Seiten.

## Testimonial-Daten

| # | Zitat (gekürzt) | Name | Rolle | Standort | Logo |
|---|---|---|---|---|---|
| 1 | „Wir haben von Anfang an..." | Yussuf | Inhaber, Der Dönermacher | Köln Braunsfeld | `donermacher.png` |
| 2 | „Daniel kam schon bei der Eröffnung..." | Tim | Inhaber, Café Erste Liebe | Köln, Neustadt Süd | `erste-liebe.jpg` |
| 3 | „We have been using Daniels..." | Jao | ASAP Cafe Corralejo | Fuerteventura | `ASAP.Brunch.jpg` |

Zitat 3 (Jao) bleibt auf Englisch.

## Layout – Option A (Minimal)

Bestehendes 3-Spalten-Grid bleibt. Jede Karte bekommt oben ein kreisrundes Logo-Bild (48×48px):

```
┌──────────────────────────────┐
│ [Logo 48px]                  │
│ "                            │
│ Zitat-Text...                │
│                              │
│ Name                         │
│ Rolle                        │
│ Standort (gold)              │
└──────────────────────────────┘
```

- Logo: `rounded-full object-cover w-12 h-12 border border-gold-600/30 mb-3`
- Sonst kein Layout-Umbau

## Assets
Alle drei Bilder liegen in `public/images/testimonials/`.

## Änderungen
1. Testimonials-Array in `index.astro` durch echte Daten ersetzen (inkl. `logo`-Feld)
2. Karten-Template: Logo-`<img>` oben einfügen
