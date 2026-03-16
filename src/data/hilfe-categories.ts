export interface HilfeCategory {
  slug: string
  label: string
  icon: string
  order: number
}

export const hilfeCategories: HilfeCategory[] = [
  { slug: 'erste-schritte', label: 'Erste Schritte', icon: '🚀', order: 1 },
  { slug: 'scanner-app', label: 'Scanner App', icon: '📱', order: 2 },
  { slug: 'kartentypen', label: 'Kartentypen', icon: '💳', order: 3 },
  { slug: 'push-nachrichten', label: 'Push-Nachrichten', icon: '🔔', order: 4 },
  { slug: 'support', label: 'Support', icon: '💬', order: 5 },
]

/** Get display label for a category slug */
export function getCategoryLabel(slug: string): string {
  return hilfeCategories.find(c => c.slug === slug)?.label ?? slug
}

/** Get category from a tutorial slug like "scanner-app/stempel-vergeben" */
export function getCategoryFromSlug(slug: string): string {
  return slug.split('/')[0]
}
