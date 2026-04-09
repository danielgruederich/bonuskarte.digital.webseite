/**
 * Zentrale Zuordnung: Kartentyp → passende Branche.
 * Wird von RotatingWord (Hero-Animation) und Eyebrow-Bar verwendet.
 */
export const cardBranchPairs = [
  { card: 'Stempelkarte',   branch: 'Cafés' },
  { card: 'Punktekarte',    branch: 'Restaurants' },
  { card: 'Mitgliedskarte', branch: 'Fitnessstudios' },
  { card: 'Geschenkkarte',  branch: 'Blumenläden' },
  { card: 'Stempelkarte',   branch: 'Friseure' },
  { card: '10er-Karte',     branch: 'Yoga-Studios' },
] as const

export type CardBranchPair = (typeof cardBranchPairs)[number]
