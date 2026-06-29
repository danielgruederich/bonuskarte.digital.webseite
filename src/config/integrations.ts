/**
 * Zentrale Konfiguration für externe Widgets (Zipchat-Chatbot, Trafft-Buchung).
 *
 * Beide Integrationen sind erst aktiv, wenn hier die echten Werte eingetragen
 * sind. Solange die Felder leer (''), wird NICHTS gerendert — die Seite bleibt
 * sauber und der Build grün. So lässt sich "live schalten" als reine Config-
 * Änderung machen, ohne Komponenten anzufassen.
 */

// ── Zipchat (24/7-Chatbot, fängt Inbound-Leads + bucht Demo) ─────────────────
export const zipchat = {
  /**
   * Das vollständige <script>-Snippet von Zipchat (Dashboard → Install).
   * Wird im <body> 1:1 eingebunden, sobald gesetzt.
   * Beispiel: '<script async src="https://cdn.zipchat.ai/widget.js" data-shop-id="abc123"></script>'
   */
  embedScript: "<script src='https://app.zipchat.ai/widget/zipchat.js?id=8XoH9C09g5b5W3QzrjB0' data-no-optimize='1' defer></script>" as string,

  /**
   * CSS-Selektor des Chat-Launchers (Button unten rechts). Ein Klick darauf
   * feuert das GA4-Event `chatbot_open` (einmal pro Session).
   * Im Zipchat-Dashboard / via DevTools prüfen und ggf. anpassen.
   */
  launcherSelector: '[id*="zipchat"], [class*="zipchat"], iframe[src*="zipchat"]',
}

// ── Trafft ("Kostenloses 24-h-Setup buchen") ────────────────────────────────
export const trafft = {
  /**
   * Öffentliche Trafft-Buchungs-URL (iframe-fähig). Default ist die bestehende
   * Buchungsseite. Falls Trafft das Einbetten per iframe blockt (X-Frame-Options),
   * `allowEmbed` auf false setzen → es wird stattdessen direkt verlinkt.
   */
  bookingUrl: 'https://termin.bonuskarte.digital/15min' as string,

  /** true = iframe-Embed (Seite /termin), false = nur Direktlink. */
  allowEmbed: false,
}

// ── Pabbly Connect (Buchungsbestätigung → SimplyMeet.me /danke) ──────────────
export const pabbly = {
  /**
   * Pabbly Connect Webhook-URL für Buchungsbestätigungen von SimplyMeet.me.
   * Leer lassen → kein Webhook wird gefeuert, Seite bleibt voll funktional.
   * Eintragen sobald Pabbly-Workflow erstellt ist.
   */
  webhookUrl: 'https://connect.pabbly.com/webhook-listener/webhook/IjU3NjUwNTZjMDYzNjA0MzU1MjY5NTUzMCI_3D_pc/IjU3NjcwNTY5MDYzNTA0M2M1MjY0NTUzZDUxMzYi_pc' as string,
}

export const integrations = { zipchat, trafft, pabbly }
