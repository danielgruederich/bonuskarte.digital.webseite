export interface StadtteilData {
  name: string
  slug: string
  fomoCount: {
    cafe: number
    doener: number
    restaurant: number
    pizza: number
    eiscafe: number
    baeckerei: number
    friseur: number
    fitnessstudio: number
    yoga: number
    blumenladen: number
  }
}

export const stadtteile: StadtteilData[] = [
  { name: 'Rüttenscheid',  slug: 'ruettenscheid',  fomoCount: { cafe: 3, doener: 2, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Werden',        slug: 'werden',         fomoCount: { cafe: 2, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Steele',        slug: 'steele',         fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Borbeck',       slug: 'borbeck',        fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Altenessen',    slug: 'altenessen',     fomoCount: { cafe: 1, doener: 3, restaurant: 1, pizza: 2, eiscafe: 0, baeckerei: 1, friseur: 2, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Kettwig',       slug: 'kettwig',        fomoCount: { cafe: 2, doener: 0, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 1, blumenladen: 1 } },
  { name: 'Bredeney',      slug: 'bredeney',       fomoCount: { cafe: 2, doener: 0, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Stadtmitte',    slug: 'stadtmitte',     fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Essen',
  slug: 'essen',
  fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 },
}
