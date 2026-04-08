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
  { name: 'Mitte',       slug: 'mitte',       fomoCount: { cafe: 3, doener: 2, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Linden',      slug: 'linden',       fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 2, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Nordstadt',   slug: 'nordstadt',    fomoCount: { cafe: 2, doener: 3, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'List',        slug: 'list',          fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Südstadt',    slug: 'suedstadt',    fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Döhren',      slug: 'doehren',      fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Bothfeld',    slug: 'bothfeld',     fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 0, friseur: 1, fitnessstudio: 1, yoga: 0, blumenladen: 0 } },
  { name: 'Vahrenwald',  slug: 'vahrenwald',   fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Hannover',
  slug: 'hannover',
  fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 1 },
}
