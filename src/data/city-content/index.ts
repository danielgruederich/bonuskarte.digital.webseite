import type { CityContentMap, PremiumContent } from './types'
import { berlinContent } from './berlin'

export type { PremiumContent, PremiumFaqItem, CityContentMap } from './types'

// citySlug → (niche → viertel → Content).
// Städte werden hier eingehängt, sobald ihr Premium-Content vollständig
// abgenommen ist. Fehlt eine Kombination, fällt CityNichePage auf das
// bisherige Verhalten zurück — kein Bruch für noch nicht bespielte Seiten.
const registry: Record<string, CityContentMap> = {
  berlin: berlinContent,
}

export function getPremiumContent(
  citySlug: string,
  nicheSlug: string,
  viertelSlug: string,
): PremiumContent | undefined {
  return registry[citySlug]?.[nicheSlug]?.[viertelSlug]
}
