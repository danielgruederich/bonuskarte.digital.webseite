// i18n helpers & UI strings for the FR/EN blog.
// Language detection reuses the generic helpers from hilfe-categories
// (getLangFromSlug / stripLang work for any lang-prefixed content slug).
export type BlogLang = 'de' | 'fr' | 'en'

/** URL base path for the blog in the given language */
export function blogBase(lang: BlogLang): string {
  if (lang === 'fr') return '/fr/blog'
  if (lang === 'en') return '/en/blog'
  return '/koeln/blog'
}

/**
 * Category label mapping. FR/EN posts only use Ratgeber / Strategie / How-to
 * (no Lokales / News for international content).
 */
const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  'Ratgeber':  { fr: 'Guide',      en: 'Guide' },
  'Strategie': { fr: 'Stratégie',  en: 'Strategy' },
  'How-to':    { fr: 'Tutoriel',   en: 'How-to' },
  'News':      { fr: 'Actualités', en: 'News' },
  'Lokales':   { fr: 'Local',      en: 'Local' },
}

/** Translate a DE category enum value to the given language label */
export function getBlogCategoryLabel(category: string, lang: BlogLang): string {
  if (lang === 'de') return category
  const entry = CATEGORY_LABELS[category]
  if (!entry) return category
  return lang === 'fr' ? entry.fr : entry.en
}

/** Light-theme category badge classes (bg-paper blog frontend) */
export const blogCategoryColors: Record<string, string> = {
  'Ratgeber':  'bg-amber/15 text-amber border border-amber/40',
  'Strategie': 'bg-blue-100 text-blue-700 border border-blue-200',
  'How-to':    'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'News':      'bg-ink/10 text-ink/60 border border-ink/15',
  'Lokales':   'bg-ink/10 text-ink/60 border border-ink/15',
}

/** UI strings for the blog per language (FR/EN only used here) */
export const BLOG_UI: Record<'fr' | 'en', {
  metaTitle: string
  metaDescription: string
  locale: string
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  allArticles: string
  readingTime: string // suffix, e.g. "min read"
  readingTimeShort: string
  breadcrumbHome: string
  breadcrumbBlog: string
  read: string
  featured: string
  relatedTitle: string
  relatedAll: string
  ctaEyebrow: string
  ctaTitle: string
  ctaText: string
  ctaButton: string
  authorHeading: string
  authorRole: string
  authorBio: string
  dateLocale: string
}> = {
  fr: {
    metaTitle: 'Blog — Guides & conseils fidélité client | bonuskarte.digital',
    metaDescription: 'Guides, tutoriels et stratégies de fidélisation client pour cafés, restaurants et commerces de proximité. Cartes de fidélité numériques Apple & Google Wallet.',
    locale: 'fr_FR',
    heroEyebrow: 'Blog',
    heroTitle: 'Blog',
    heroSubtitle: 'Guides & conseils pour fidéliser vos clients au quotidien.',
    allArticles: 'Tous les articles',
    readingTime: 'min de lecture',
    readingTimeShort: 'min',
    breadcrumbHome: 'Accueil',
    breadcrumbBlog: 'Blog',
    read: 'Lire la suite',
    featured: 'À la une',
    relatedTitle: 'Autres articles',
    relatedAll: 'Tous →',
    ctaEyebrow: 'Pour votre commerce',
    ctaTitle: 'Prêt pour votre carte de fidélité numérique ?',
    ctaText: '90 jours gratuits. Sans carte bancaire. Fonctionne sur chaque smartphone.',
    ctaButton: 'Commencer gratuitement',
    authorHeading: "À propos de l'auteur",
    authorRole: 'Fondateur bonuskarte.digital',
    authorBio: "Daniel Grüderich est le fondateur de bonuskarte.digital et aide les commerces de proximité à remplacer les cartes de fidélité papier par des cartes numériques dans Apple & Google Wallet.",
    dateLocale: 'fr-FR',
  },
  en: {
    metaTitle: 'Blog — Customer loyalty guides & tips | bonuskarte.digital',
    metaDescription: 'Guides, how-tos and strategies for customer loyalty at cafés, restaurants and local shops. Digital loyalty cards for Apple & Google Wallet.',
    locale: 'en_US',
    heroEyebrow: 'Blog',
    heroTitle: 'Blog',
    heroSubtitle: 'Guides & tips to turn first-time guests into regulars.',
    allArticles: 'All articles',
    readingTime: 'min read',
    readingTimeShort: 'min',
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    read: 'Read more',
    featured: 'Featured',
    relatedTitle: 'More articles',
    relatedAll: 'All →',
    ctaEyebrow: 'For your business',
    ctaTitle: 'Ready for your own digital loyalty card?',
    ctaText: '90 days free. No credit card. Runs on every smartphone.',
    ctaButton: 'Start for free',
    authorHeading: 'About the author',
    authorRole: 'Founder bonuskarte.digital',
    authorBio: 'Daniel Grüderich is the founder of bonuskarte.digital and helps local businesses replace paper punch cards with digital loyalty cards in Apple & Google Wallet.',
    dateLocale: 'en-US',
  },
}
