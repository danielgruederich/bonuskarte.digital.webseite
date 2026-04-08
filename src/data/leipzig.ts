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
  { name: 'Zentrum',      slug: 'zentrum',      fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Connewitz',    slug: 'connewitz',    fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Plagwitz',     slug: 'plagwitz',     fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Reudnitz',     slug: 'reudnitz',     fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Lindenau',     slug: 'lindenau',     fomoCount: { cafe: 2, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Gohlis',       slug: 'gohlis',       fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 1, yoga: 0, blumenladen: 1 } },
  { name: 'Schleußig',    slug: 'schleussig',   fomoCount: { cafe: 2, doener: 0, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Südvorstadt',  slug: 'suedvorstadt',  fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Leipzig',
  slug: 'leipzig',
  fomoCount: { cafe: 5, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 },
}
