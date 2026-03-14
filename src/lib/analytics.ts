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
