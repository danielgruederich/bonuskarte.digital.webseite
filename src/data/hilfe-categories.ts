export type Lang = 'de' | 'fr' | 'en'

export interface HilfeCategory {
  slug: string
  label: string
  labelFr: string
  labelEn: string
  icon: string
  order: number
}

export const hilfeCategories: HilfeCategory[] = [
  { slug: 'erste-schritte', label: 'Erste Schritte', labelFr: 'Premiers pas', labelEn: 'Getting started', icon: '🚀', order: 1 },
  { slug: 'scanner-app', label: 'Scanner App', labelFr: 'Application scanner', labelEn: 'Scanner app', icon: '📱', order: 2 },
  { slug: 'kartentypen', label: 'Kartentypen', labelFr: 'Types de cartes', labelEn: 'Card types', icon: '💳', order: 3 },
  { slug: 'push-nachrichten', label: 'Push-Nachrichten', labelFr: 'Notifications push', labelEn: 'Push notifications', icon: '🔔', order: 4 },
  { slug: 'automatisierungen', label: 'Automatisierungen', labelFr: 'Automatisations', labelEn: 'Automations', icon: '⚡', order: 5 },
  { slug: 'inspiration', label: 'Inspiration', labelFr: 'Inspiration', labelEn: 'Inspiration', icon: '💡', order: 6 },
  { slug: 'support', label: 'Support', labelFr: 'Support', labelEn: 'Support', icon: '💬', order: 7 },
]

/** Get the language of a tutorial slug from its first segment ('fr'/'en' → that, else 'de') */
export function getLangFromSlug(slug: string): Lang {
  const first = slug.split('/')[0]
  if (first === 'fr' || first === 'en') return first
  return 'de'
}

/** Remove a leading 'fr/' or 'en/' prefix from a slug; DE slugs stay unchanged */
export function stripLang(slug: string): string {
  if (slug.startsWith('fr/')) return slug.slice(3)
  if (slug.startsWith('en/')) return slug.slice(3)
  return slug
}

/** Get category slug from a tutorial slug like "fr/scanner-app/stempel-vergeben" → "scanner-app" */
export function getCategoryFromSlug(slug: string): string {
  return stripLang(slug).split('/')[0]
}

/** Get display label for a category slug in the given language */
export function getCategoryLabel(slug: string, lang: Lang = 'de'): string {
  const cat = hilfeCategories.find(c => c.slug === slug)
  if (!cat) return slug
  if (lang === 'fr') return cat.labelFr
  if (lang === 'en') return cat.labelEn
  return cat.label
}

/** URL base path for the help center in the given language */
export function hilfeBase(lang: Lang): string {
  if (lang === 'fr') return '/fr/aide'
  if (lang === 'en') return '/en/help'
  return '/hilfe'
}

/** UI strings for the help center per language */
export const HILFE_UI: Record<Lang, {
  centerTitle: string
  navLabel: string
  breadcrumb: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  metaTitle: string
  metaDescription: string
}> = {
  de: {
    centerTitle: 'Hilfe & Tutorials',
    navLabel: 'Hilfe',
    breadcrumb: 'Hilfe',
    heroEyebrow: 'Hilfe-Center',
    heroTitle: 'Hilfe & Tutorials',
    heroSubtitle: 'Alles, was du wissen musst, um deine digitale Stempelkarte erfolgreich einzusetzen.',
    metaTitle: 'Hilfe & Tutorials — Digitale Stempelkarte einrichten | bonuskarte.digital',
    metaDescription: 'Anleitungen für deine digitale Stempelkarte: Onboarding, Scanner App, Kartentypen, Push-Nachrichten. Schritt für Schritt erklärt.',
  },
  fr: {
    centerTitle: 'Aide & Tutoriels',
    navLabel: 'Aide',
    breadcrumb: 'Aide',
    heroEyebrow: "Centre d'aide",
    heroTitle: 'Aide & Tutoriels',
    heroSubtitle: 'Tout ce que tu dois savoir pour utiliser ta carte de fidélité numérique avec succès.',
    metaTitle: 'Aide & Tutoriels — Configurer ta carte de fidélité numérique | bonuskarte.digital',
    metaDescription: 'Guides pour ta carte de fidélité numérique : prise en main, application scanner, types de cartes, notifications push. Expliqué étape par étape.',
  },
  en: {
    centerTitle: 'Help & Tutorials',
    navLabel: 'Help',
    breadcrumb: 'Help',
    heroEyebrow: 'Help center',
    heroTitle: 'Help & Tutorials',
    heroSubtitle: 'Everything you need to know to use your digital loyalty card successfully.',
    metaTitle: 'Help & Tutorials — Set up your digital loyalty card | bonuskarte.digital',
    metaDescription: 'Guides for your digital loyalty card: onboarding, scanner app, card types, push notifications. Explained step by step.',
  },
}
