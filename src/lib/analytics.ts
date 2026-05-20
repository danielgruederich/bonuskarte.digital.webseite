/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  function gtag(...args: any[]): void
}

function track(name: string, params?: Record<string, unknown>) {
  if (typeof gtag === 'undefined') return
  gtag('event', name, params)
}

export const analytics = {
  /** Nutzer hat das erste Formular-Feld fokussiert */
  formStarted: (niche: string, city: string) =>
    track('form_started', { niche, city }),

  /** Demo-Karte erfolgreich erstellt — Haupt-Conversion */
  demoCardCreated: (niche: string, city: string) =>
    track('demo_card_created', { niche, city }),

  /** Google Ads Conversion: Lead-Formular erfolgreich abgeschickt */
  leadConversion: () =>
    track('conversion', {
      send_to: 'AW-18176373682/jWsvCIyIj7AcELLnldtD',
      value: 1.0,
      currency: 'EUR',
    }),

  /** Klick auf "Demo-Karte ins Wallet laden" im Success-State */
  walletInstallClicked: (niche: string) =>
    track('wallet_install_clicked', { niche }),

  /** Klick auf WhatsApp-Button */
  whatsappClicked: (location: 'hero' | 'success') =>
    track('whatsapp_clicked', { location }),

  /** Klick auf goldene CTA-Buttons (Hero, Offer-Block, Final) */
  ctaClicked: (location: string) =>
    track('cta_clicked', { location }),
}
