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
  { name: 'St. Pauli',     slug: 'st-pauli',      fomoCount: { cafe: 3, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Altona',        slug: 'altona',         fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Eimsbüttel',  slug: 'eimsbuettel',   fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Winterhude',    slug: 'winterhude',     fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 2, yoga: 2, blumenladen: 1 } },
  { name: 'Eppendorf',     slug: 'eppendorf',      fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 2 } },
  { name: 'Ottensen',      slug: 'ottensen',       fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Barmbek',       slug: 'barmbek',        fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 0, blumenladen: 0 } },
  { name: 'Sternschanze',  slug: 'sternschanze',   fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Wandsbek',      slug: 'wandsbek',       fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Harburg',       slug: 'harburg',        fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 0, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Hamburg',
  slug: 'hamburg',
  fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 3, friseur: 2, fitnessstudio: 1, yoga: 2, blumenladen: 1 },
}
