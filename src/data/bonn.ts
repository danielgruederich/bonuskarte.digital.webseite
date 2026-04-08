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
  { name: 'Innenstadt',    slug: 'innenstadt',    fomoCount: { cafe: 3, doener: 2, restaurant: 3, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Kessenich',     slug: 'kessenich',     fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Beuel',         slug: 'beuel',         fomoCount: { cafe: 2, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Poppelsdorf',   slug: 'poppelsdorf',   fomoCount: { cafe: 2, doener: 1, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Bad Godesberg', slug: 'bad-godesberg', fomoCount: { cafe: 1, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 0, blumenladen: 1 } },
  { name: 'Endenich',      slug: 'endenich',      fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 0, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Hardtberg',     slug: 'hardtberg',     fomoCount: { cafe: 1, doener: 1, restaurant: 0, pizza: 0, eiscafe: 0, baeckerei: 0, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Weststadt',     slug: 'weststadt',     fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Bonn',
  slug: 'bonn',
  fomoCount: { cafe: 3, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 },
}
