<?php
/**
 * Vorlage für die Secrets-Datei von public/api/submit.php.
 *
 * Die echte Datei heißt `bonuskarte-secrets.php` und liegt auf dem Server
 * AUSSERHALB des Webroots — eine Ebene über dem Deploy-Verzeichnis, also
 * im Home-Verzeichnis neben `bonuskarte/`:
 *
 *   ssh fuerte.digital@ssh.gb.stackcp.com
 *   nano ~/bonuskarte-secrets.php   (Inhalt dieser Vorlage, echte Werte eintragen)
 *   chmod 600 ~/bonuskarte-secrets.php
 *
 * Sie wird beim Deploy nicht angefasst — neue Keys eintragen wirkt sofort,
 * ohne Deploy. Diese Datei mit echten Werten NIEMALS ins Repo committen.
 */
return [
    // Boomerang Cards — Dashboard auf digitalwallet.cards → API
    'boomerang_api_key'   => 'HIER_BOOMERANG_API_KEY',

    // Salesflare — Settings → API Keys
    'salesflare_api_key'  => 'HIER_SALESFLARE_API_KEY',

    // Telegram-Bot @bonuskarte_leads_bot — Token via @BotFather
    'telegram_bot_token'  => 'HIER_TELEGRAM_BOT_TOKEN',
    'telegram_chat_id'    => 'HIER_TELEGRAM_CHAT_ID',

    // Google Apps Script Web-App-URL fürs Sheets-Logging
    'sheets_webhook_url'  => 'HIER_SHEETS_WEBHOOK_URL',

    // MailerCloud — Settings → API Key
    'mailercloud_api_key' => 'HIER_MAILERCLOUD_API_KEY',
];
