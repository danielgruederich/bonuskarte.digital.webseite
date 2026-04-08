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
  { name: 'Schwabing',    slug: 'schwabing',    fomoCount: { cafe: 4, doener: 2, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 2, fitnessstudio: 2, yoga: 2, blumenladen: 1 } },
  { name: 'Maxvorstadt',  slug: 'maxvorstadt',  fomoCount: { cafe: 3, doener: 2, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Haidhausen',   slug: 'haidhausen',   fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Sendling',     slug: 'sendling',     fomoCount: { cafe: 2, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Giesing',      slug: 'giesing',      fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Neuhausen',    slug: 'neuhausen',    fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Bogenhausen',  slug: 'bogenhausen',  fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Pasing',       slug: 'pasing',       fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Au',           slug: 'au',           fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Lehel',        slug: 'lehel',        fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 1, blumenladen: 1 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'München',
  slug: 'muenchen',
  fomoCount: { cafe: 5, doener: 3, restaurant: 4, pizza: 2, eiscafe: 0, baeckerei: 3, friseur: 2, fitnessstudio: 2, yoga: 2, blumenladen: 1 },
}
