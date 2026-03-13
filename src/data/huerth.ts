export interface StadtteilData {
  name: string
  slug: string
  fomoCount: {
    cafe: number
    doener: number
    restaurant: number
    pizza: number
  }
}

export const stadtteile: StadtteilData[] = [
  { name: 'Hürth-Mitte',  slug: 'huerth-mitte',  fomoCount: { cafe: 2, doener: 2, restaurant: 2, pizza: 1 } },
  { name: 'Hermülheim',   slug: 'hermuelheim',   fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Efferen',      slug: 'efferen',       fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 0 } },
  { name: 'Fischenich',   slug: 'fischenich',    fomoCount: { cafe: 1, doener: 0, restaurant: 1, pizza: 0 } },
  { name: 'Kendenich',    slug: 'kendenich',     fomoCount: { cafe: 0, doener: 1, restaurant: 0, pizza: 1 } },
  { name: 'Kalscheuren',  slug: 'kalscheuren',   fomoCount: { cafe: 1, doener: 1, restaurant: 0, pizza: 0 } },
  { name: 'Berrenrath',   slug: 'berrenrath',    fomoCount: { cafe: 0, doener: 1, restaurant: 1, pizza: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Hürth',
  slug: 'huerth',
  fomoCount: { cafe: 2, doener: 2, restaurant: 2, pizza: 1 },
}
