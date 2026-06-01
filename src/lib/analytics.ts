/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  function gtag(...args: any[]): void
}

const ADS_LEAD_TAG = 'AW-18176373682/jWsvCIyIj7AcELLnldtD'

function track(name: string, params?: Record<string, unknown>) {
  if (typeof gtag === 'undefined') return
  gtag('event', name, params)
}

/**
 * Event-Namen sind im MESSPLAN.md dokumentiert. Reihenfolge im Funnel:
 *   page_view (automatisch, GA4)
 *   → demo_card_view
 *   → signup_form_start
 *   → signup_submit
 *   ↘ demo_booking (parallel, falls Termin gebucht wird)
 *   ↘ chatbot_open  (parallel, Engagement-Indikator)
 */
export const analytics = {
  // ── Funnel: Demo & Trial-Signup ───────────────────────────────────────

  /** Self-Demo-Karte ist sichtbar / wurde geöffnet (PhoneMockup IntersectionObserver) */
  demoCardView: (location: string = 'hero') =>
    track('demo_card_view', { location }),

  /** Funnel-Step: erstes Form-Feld fokussiert */
  signupFormStart: (niche: string, city: string, source: string = 'standard') =>
    track('signup_form_start', { niche, city, source }),

  /** Funnel-Step: Branche im Dropdown gewählt (einmal pro Session) */
  nicheSelected: (niche: string, city: string, source: string = 'standard') =>
    track('niche_selected', { niche, city, source }),

  /** Funnel-Step: Submit-Button gedrückt (Diagnose-Event für API-Drop-off) */
  signupSubmitAttempt: (niche: string, city: string, source: string = 'standard') =>
    track('signup_submit_attempt', { niche, city, source }),

  /**
   * Funnel-Conversion: Trial-Anmeldung erfolgreich abgeschickt.
   * Feuert BEIDES: GA4 `signup_submit` (Key Event) + Google Ads Conversion.
   */
  signupSubmit: (niche: string, city: string, source: string = 'standard') => {
    track('signup_submit', { niche, city, source, value: 1.0, currency: 'EUR' })
    track('conversion', { send_to: ADS_LEAD_TAG, value: 1.0, currency: 'EUR' })
  },

  /** Drop-off-Diagnose: API- oder Network-Fehler nach Submit */
  signupSubmitError: (
    niche: string,
    city: string,
    error_type: 'api_error' | 'network_error',
    source: string = 'standard',
  ) => track('signup_submit_error', { niche, city, error_type, source }),

  /** Backend-Bestätigung: Boomerang-Demo-Karte wurde erfolgreich erzeugt */
  demoCardCreated: (niche: string, city: string) =>
    track('demo_card_created', { niche, city }),

  /**
   * Demo-Termin gebucht. TODO: aktuell kein Calendly/cal.com auf der Site eingebaut.
   * Sobald Termin-Buchen-Feature existiert, im Booking-Erfolg aufrufen.
   */
  demoBooking: (source: string = 'standard') =>
    track('demo_booking', { source }),

  /**
   * Chatbot (ZipChat) geöffnet. TODO: ZipChat-Widget ist derzeit NICHT auf bonuskarte.digital
   * eingebaut (nur Outreach-Tool). Sobald Widget eingebettet ist, im onOpen-Hook rufen.
   */
  chatbotOpen: (location: string = 'unknown') =>
    track('chatbot_open', { location }),

  // ── CTA / Engagement ──────────────────────────────────────────────────

  /** Klick auf "Demo-Karte ins Wallet laden" im Success-State */
  walletInstallClicked: (niche: string) =>
    track('wallet_install_clicked', { niche }),

  /** Klick auf WhatsApp-Button */
  whatsappClicked: (location: 'hero' | 'success') =>
    track('whatsapp_clicked', { location }),

  /** Klick auf goldene CTA-Buttons (Hero, Offer-Block, Final) */
  ctaClicked: (location: string) =>
    track('cta_clicked', { location }),

  // ── Deprecated (Backward-Compat, nicht mehr nutzen) ──────────────────

  /** @deprecated → `signupFormStart(niche, city, source)` */
  formStarted: (niche: string, city: string) =>
    track('signup_form_start', { niche, city, source: 'standard' }),

  /** @deprecated → `signupSubmit(niche, city, source)` (feuert auch GA4-Event) */
  leadConversion: () =>
    track('conversion', { send_to: ADS_LEAD_TAG, value: 1.0, currency: 'EUR' }),
}
