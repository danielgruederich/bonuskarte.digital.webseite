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
  { name: 'Hürth-Mitte',  slug: 'huerth-mitte',  fomoCount: { cafe: 2, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 0, blumenladen: 0 } },
  { name: 'Hermülheim',   slug: 'hermuelheim',   fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Efferen',      slug: 'efferen',       fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Fischenich',   slug: 'fischenich',    fomoCount: { cafe: 1, doener: 0, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 0, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Kendenich',    slug: 'kendenich',     fomoCount: { cafe: 0, doener: 1, restaurant: 0, pizza: 1, eiscafe: 0, baeckerei: 0, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Kalscheuren',  slug: 'kalscheuren',   fomoCount: { cafe: 1, doener: 1, restaurant: 0, pizza: 0, eiscafe: 0, baeckerei: 0, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Berrenrath',   slug: 'berrenrath',    fomoCount: { cafe: 0, doener: 1, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 0, friseur: 0, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Hürth',
  slug: 'huerth',
  fomoCount: { cafe: 2, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 0, blumenladen: 0 },
}
