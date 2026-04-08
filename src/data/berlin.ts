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
  { name: 'Mitte',           slug: 'mitte',           fomoCount: { cafe: 4, doener: 3, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Prenzlauer Berg', slug: 'prenzlauer-berg', fomoCount: { cafe: 3, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 2, friseur: 1, fitnessstudio: 1, yoga: 2, blumenladen: 1 } },
  { name: 'Kreuzberg',       slug: 'kreuzberg',       fomoCount: { cafe: 3, doener: 3, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 2, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Neukölln',        slug: 'neukoelln',       fomoCount: { cafe: 2, doener: 3, restaurant: 1, pizza: 2, eiscafe: 0, baeckerei: 1, friseur: 2, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Friedrichshain',  slug: 'friedrichshain',  fomoCount: { cafe: 2, doener: 2, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 0 } },
  { name: 'Charlottenburg',  slug: 'charlottenburg',  fomoCount: { cafe: 2, doener: 1, restaurant: 2, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 1, yoga: 1, blumenladen: 1 } },
  { name: 'Schöneberg',      slug: 'schoeneberg',     fomoCount: { cafe: 2, doener: 2, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 1, fitnessstudio: 0, yoga: 1, blumenladen: 0 } },
  { name: 'Wedding',         slug: 'wedding',         fomoCount: { cafe: 1, doener: 3, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 2, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
  { name: 'Steglitz',        slug: 'steglitz',        fomoCount: { cafe: 1, doener: 1, restaurant: 1, pizza: 1, eiscafe: 0, baeckerei: 1, friseur: 0, fitnessstudio: 1, yoga: 0, blumenladen: 0 } },
  { name: 'Tempelhof',       slug: 'tempelhof',       fomoCount: { cafe: 1, doener: 2, restaurant: 1, pizza: 0, eiscafe: 0, baeckerei: 0, friseur: 1, fitnessstudio: 0, yoga: 0, blumenladen: 0 } },
]

export function getStadtteilBySlug(slug: string): StadtteilData | undefined {
  return stadtteile.find(s => s.slug === slug.toLowerCase())
}

export const fallbackStadtteil: StadtteilData = {
  name: 'Berlin',
  slug: 'berlin',
  fomoCount: { cafe: 5, doener: 4, restaurant: 3, pizza: 2, eiscafe: 0, baeckerei: 3, friseur: 2, fitnessstudio: 1, yoga: 2, blumenladen: 1 },
}
