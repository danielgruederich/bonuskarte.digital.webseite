// Premium-SEO-Content pro Stadt × Viertel × Nische.
// Anspruch: nicht Namens-Swap, sondern eigenständiger, lokal verankerter,
// ranking-fähiger Text je Kombination — mit eigener FAQ und eigenen Metas.
// Bewusst KEINE erfundenen Statistiken oder Testimonials.

export interface PremiumFaqItem {
  q: string
  a: string
}

export interface PremiumContent {
  /** <title> — einzigartig, Keyword-Variante, < 60 Zeichen wo möglich */
  metaTitle: string
  /** Meta-Description — einzigartig, < 155 Zeichen, mit Nutzenversprechen */
  metaDescription: string
  /** Langform-Body als HTML: <h2>, <h3>, <p>, <ul> — je Seite eigener Aufbau */
  bodyHtml: string
  /** Seiten-eigene FAQ (nicht die sitewide LandingFaq) → eigenes FAQPage-Schema */
  faq: PremiumFaqItem[]
}

/** niche-slug → viertel-slug → Content */
export type CityContentMap = Record<string, Record<string, PremiumContent>>
