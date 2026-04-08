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
  { name: 'Sachsenhausen',  slug: 'sachsenhausen',  fomoCount: { cafe: 4, doener: 2, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Nordend',        slug: 'nordend',         fomoCount: { cafe: 3, doener: 1, restaurant: 3, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Bornheim',       slug: 'bornheim',        fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Bockenheim',     slug: 'bockenheim',      fomoCount: { cafe: 2, doener: 3, restaurant: 2, pizza: 2, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Westend',        slug: 'westend',         fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 2, yoga: 1, blumenladen: 1 } },
  { name: 'Ostend',         slug: 'ostend',          fomoCount: { cafe: 2, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Höchst',         slug: 'hoechst',         fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Niederrad',      slug: 'niederrad',       fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 0, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Frankfurt',
  slug: 'frankfurt',
  fomoCount: { cafe: 5, doener: 3, restaurant: 4, pizza: 2, eiscafe: 0, baeckerei: 3, friseur: 2, fitnessstudio: 1, yoga: 2, blumenladen: 1 },
}
