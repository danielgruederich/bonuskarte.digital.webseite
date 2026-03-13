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
  { name: 'Innenstadt',    slug: 'innenstadt',    fomoCount: { cafe: 3, doener: 2, restaurant: 3, pizza: 1 } },
  { name: 'Kessenich',     slug: 'kessenich',     fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1 } },
  { name: 'Beuel',         slug: 'beuel',         fomoCount: { cafe: 2, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Poppelsdorf',   slug: 'poppelsdorf',   fomoCount: { cafe: 2, doener: 1, restaurant: 1, pizza: 0 } },
  { name: 'Bad Godesberg', slug: 'bad-godesberg', fomoCount: { cafe: 1, doener: 1, restaurant: 2, pizza: 1 } },
  { name: 'Endenich',      slug: 'endenich',      fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1 } },
  { name: 'Hardtberg',     slug: 'hardtberg',     fomoCount: { cafe: 1, doener: 1, restaurant: 0, pizza: 0 } },
  { name: 'Weststadt',     slug: 'weststadt',     fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Bonn',
  slug: 'bonn',
  fomoCount: { cafe: 3, doener: 3, restaurant: 3, pizza: 2 },
}
