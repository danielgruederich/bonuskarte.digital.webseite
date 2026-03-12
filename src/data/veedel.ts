export interface VeedelData {
  name: string
  slug: string
  fomoCount: {
    cafe: number
    doener: number
    restaurant: number
    pizza: number
  }
}

// Köln neighborhoods with FOMO counts
// Update these numbers as real clients sign up
export const veedel: VeedelData[] = [
  { name: 'Nippes',        slug: 'nippes',        fomoCount: { cafe: 2, doener: 1, restaurant: 1, pizza: 0 } },
  { name: 'Ehrenfeld',     slug: 'ehrenfeld',     fomoCount: { cafe: 3, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Sülz',          slug: 'suelz',         fomoCount: { cafe: 2, doener: 1, restaurant: 0, pizza: 1 } },
  { name: 'Lindenthal',    slug: 'lindenthal',    fomoCount: { cafe: 1, doener: 0, restaurant: 2, pizza: 0 } },
  { name: 'Deutz',         slug: 'deutz',         fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Mülheim',       slug: 'muelheim',      fomoCount: { cafe: 0, doener: 3, restaurant: 1, pizza: 1 } },
  { name: 'Kalk',          slug: 'kalk',          fomoCount: { cafe: 1, doener: 3, restaurant: 0, pizza: 2 } },
  { name: 'Rodenkirchen',  slug: 'rodenkirchen',  fomoCount: { cafe: 2, doener: 0, restaurant: 2, pizza: 0 } },
  { name: 'Porz',          slug: 'porz',          fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1 } },
  { name: 'Chorweiler',    slug: 'chorweiler',    fomoCount: { cafe: 0, doener: 2, restaurant: 0, pizza: 1 } },
  { name: 'Longerich',     slug: 'longerich',     fomoCount: { cafe: 1, doener: 1, restaurant: 0, pizza: 0 } },
  { name: 'Bickendorf',    slug: 'bickendorf',    fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 0 } },
  { name: 'Ossendorf',     slug: 'ossendorf',     fomoCount: { cafe: 0, doener: 1, restaurant: 1, pizza: 1 } },
  { name: 'Neuehrenfeld',  slug: 'neuehrenfeld',  fomoCount: { cafe: 2, doener: 1, restaurant: 0, pizza: 0 } },
  { name: 'Innenstadt',    slug: 'innenstadt',    fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2 } },
]

export function getVeedelBySlug(slug: string): VeedelData | undefined {
  return veedel.find(v => v.slug === slug.toLowerCase())
}

// Fallback for unknown veedel
export const fallbackVeedel: VeedelData = {
  name: 'Köln',
  slug: 'koeln',
  fomoCount: { cafe: 5, doener: 4, restaurant: 3, pizza: 2 },
}
