/**
 * Einzige Wahrheitsquelle für Indexierbarkeit.
 *
 * REGEL: Eine Seite ist indexierbar, wenn — und nur wenn — sie eigenen,
 * einzigartigen Inhalt hat. Token-Swap (ein Text pro Nische mit ersetztem
 * Ortsnamen) zählt NICHT.
 *
 * Hintergrund: Google Scaled Content Abuse (März 2026). Seiten, die nur
 * Ortsnamen austauschen, werden nicht indexiert und entziehen der gesamten
 * Domain Crawl-Budget. Siehe docs/seo-index-analyse-2026-07-28.md
 *
 * Diese Datei wird von DREI Stellen genutzt — Sitemap-Filter, CityNichePage
 * und der Köln-Route —, damit Sitemap und Seiten-Meta nicht auseinanderlaufen
 * können. Genau dieser Widerspruch existierte vorher bei 68 URLs.
 *
 * SELBSTHEILEND: Sobald für eine Kombination echter Inhalt hinterlegt wird,
 * wird die Seite automatisch indexierbar und erscheint in der Sitemap.
 */
import { nicheVeedelContent } from '../data/niche-veedel-content'
import { getPremiumContent } from '../data/city-content'

export const CITY_SLUGS = [
  'berlin', 'bonn', 'dortmund', 'dresden', 'duesseldorf', 'essen', 'frankfurt',
  'hamburg', 'hannover', 'huerth', 'koeln', 'leipzig', 'muenchen', 'nuernberg',
  'stuttgart',
]

/**
 * Top-Level-Bereiche, die sich selbst auf noindex setzen und deshalb auch
 * nicht in die Sitemap gehören. Belegt durch Auswertung des Builds.
 */
const NEVER_INDEX_TOP_LEVEL = new Set([
  'blog',            // globaler Blog: noindex + canonical -> Stadt-Blog (Duplikat)
  'danke',           // Buchungsbestätigung
  'termin',          // Terminseite
  'cafes-koeln',     // Legacy-Redirects
  'doener-koeln',
  'pizza-koeln',
  'restaurant-koeln',
  'pitch-Tallinn',   // internes Pitch-Deck
  'preview',
  'v2',              // A/B-Variante, canonical -> /
])

/** Unterseiten einer Stadt, die nicht indexiert werden (Vertrieb/intern). */
const NEVER_INDEX_CITY_SUB = new Set(['gruender', 'walkin'])

/**
 * Hat diese Kombination eigenen, einzigartigen Inhalt?
 * Prüft beide Content-Quellen; fehlt der Inhalt, ist die Seite nicht indexierbar.
 */
export function hasUniqueContent(
  citySlug: string,
  viertelSlug: string,
  nicheSlug: string,
): boolean {
  if (getPremiumContent(citySlug, nicheSlug, viertelSlug)) return true
  if (citySlug === 'koeln') return nicheVeedelContent[nicheSlug]?.[viertelSlug] != null
  return false
}

/**
 * Darf dieser Pfad in die Sitemap? Nimmt sowohl volle URLs als auch Pfade.
 */
export function isIndexablePath(input: string): boolean {
  const path = input.replace(/^https?:\/\/[^/]+/, '')
  const segs = path.split('/').filter(Boolean)

  if (segs.length === 0) return true                      // Startseite
  if (NEVER_INDEX_TOP_LEVEL.has(segs[0])) return false
  if (segs[0].startsWith('preview')) return false

  if (CITY_SLUGS.includes(segs[0])) {
    // /stadt/gruender, /stadt/walkin
    if (segs.length === 2 && NEVER_INDEX_CITY_SUB.has(segs[1])) return false
    // /stadt/blog/... bleibt indexierbar (die kanonische Blog-Variante)
    if (segs[1] === 'blog') return true
    // /stadt/viertel/nische — nur mit eigenem Inhalt
    if (segs.length === 3) return hasUniqueContent(segs[0], segs[1], segs[2])
    // /stadt und /stadt/viertel (Hubs) bleiben indexierbar
    return true
  }

  return true
}
