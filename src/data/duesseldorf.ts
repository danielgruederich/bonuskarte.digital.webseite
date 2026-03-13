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
  { name: 'Altstadt',    slug: 'altstadt',    fomoCount: { cafe: 4, doener: 3, restaurant: 4, pizza: 2 } },
  { name: 'Bilk',        slug: 'bilk',        fomoCount: { cafe: 2, doener: 3, restaurant: 1, pizza: 2 } },
  { name: 'Flingern',    slug: 'flingern',    fomoCount: { cafe: 2, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Oberkassel',  slug: 'oberkassel',  fomoCount: { cafe: 2, doener: 1, restaurant: 3, pizza: 1 } },
  { name: 'Carlstadt',   slug: 'carlstadt',   fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 0 } },
  { name: 'Pempelfort',  slug: 'pempelfort',  fomoCount: { cafe: 2, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Düsseltal',   slug: 'duesseltal',  fomoCount: { cafe: 1, doener: 1, restaurant: 2, pizza: 1 } },
  { name: 'Stadtmitte',  slug: 'stadtmitte',  fomoCount: { cafe: 3, doener: 2, restaurant: 2, pizza: 1 } },
  { name: 'Gerresheim',  slug: 'gerresheim',  fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1 } },
  { name: 'Benrath',     slug: 'benrath',     fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Düsseldorf',
  slug: 'duesseldorf',
  fomoCount: { cafe: 5, doener: 4, restaurant: 4, pizza: 2 },
}
