<?php
/**
 * Boomerang Card Creation Endpoint
 * Receives form data, creates a Boomerang customer + demo card, returns install links.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://bonuskarte.digital');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Anfrage']);
    exit;
}

// ── Honeypot ──────────────────────────────────────────────────────────────────
// Das Feld `website` ist im Formular für Menschen unsichtbar (offscreen,
// aria-hidden, tabindex -1). Nur Bots füllen es aus. Wir tun so, als hätte es
// geklappt (kein Retry-Anreiz) und verwerfen still — kein CRM, kein Boomerang.
if (!empty($body['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// ── Config ───────────────────────────────────────────────────────────────────
// Alle Werte per Env-Var überschreibbar (Integrationstests zeigen die Base-URLs
// auf einen lokalen Mock-Server; Produktion nutzt die Fallbacks unverändert).
define('BOOMERANG_API_KEY',  getenv('BOOMERANG_API_KEY')  ?: 'a34f3829b32b7c629059a780a0919a13');
define('BOOMERANG_BASE',     getenv('BOOMERANG_BASE')     ?: 'https://api.digitalwallet.cards');
define('SALESFLARE_API_KEY', getenv('SALESFLARE_API_KEY') ?: 'Lh1Qucl715Sp6Pwy4DZpoxzlGWt64Ugz7GA3M9G5_NKjm');
define('SALESFLARE_BASE',    getenv('SALESFLARE_BASE')    ?: 'https://api.salesflare.com');

// Telegram Lead-Alert (eigener Bot @bonuskarte_leads_bot)
define('TELEGRAM_BASE',      getenv('TELEGRAM_BASE')      ?: 'https://api.telegram.org');
define('TELEGRAM_BOT_TOKEN', getenv('TELEGRAM_BOT_TOKEN') ?: '8557794026:AAHVILm2tKZFbTaTEG7s7wkxZJl8mQ-QsB8');
define('TELEGRAM_CHAT_ID',   getenv('TELEGRAM_CHAT_ID')   ?: '128525956');

// Rate-Limit pro IP (dateibasiert, fail-open). 0 = deaktiviert (z.B. in Tests).
define('RATE_LIMIT_MAX',    (int) (getenv('RATE_LIMIT_MAX')    !== false ? getenv('RATE_LIMIT_MAX')    : 8));
define('RATE_LIMIT_WINDOW', (int) (getenv('RATE_LIMIT_WINDOW') !== false ? getenv('RATE_LIMIT_WINDOW') : 600));
define('RATE_LIMIT_DIR',    getenv('RATE_LIMIT_DIR') ?: sys_get_temp_dir() . '/bk_ratelimit');

// Add new niche template IDs here as you create them in Boomerang
const TEMPLATE_IDS = [
    'cafe'       => 1046392, // Kölner Kaffee Laden — active ✅
    'doener'     => 1115375, // active ✅
    'pizza'      => 1115406, // active ✅
    'restaurant' => 1115409, // active ✅
    'eiscafe'    => 1060441, // Eiscafé — active ✅
    'baeckerei'  => 1115411, // active ✅
    'friseur'    => 1115412, // active ✅
    'fitnessstudio' => 1115413, // active ✅
    'yoga'          => 1115414, // active ✅
    'blumenladen'   => 1115415, // active ✅
];
const TEMPLATE_FALLBACK = 1046392; // used if niche has no template yet

// ── Rate-Limit (pro IP, fail-open) ────────────────────────────────────────────
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
if ($clientIp && isRateLimited($clientIp)) {
    http_response_code(429);
    echo json_encode(['error' => 'Zu viele Anfragen. Bitte einen Moment warten.']);
    exit;
}

// ── Extract fields ────────────────────────────────────────────────────────────
$firstName = trim($body['vorname']   ?? $body['firstName'] ?? '');
$surname   = trim($body['nachname']  ?? $body['surname']   ?? '');
$business  = trim($body['business']  ?? $body['ladenname'] ?? '');
$instagram = ltrim(trim($body['instagram'] ?? ''), '@');
$email     = trim($body['email']     ?? '');
$phone     = trim($body['telefon']   ?? $body['phone']     ?? '');
$kontakt   = trim($body['kontakt']   ?? ''); // LeadFormDoener combined field
$niche     = strtolower(trim($body['niche'] ?? 'cafe'));
$utm       = $body['utm'] ?? [];
$mode      = strtolower(trim($body['mode'] ?? 'standard'));
$source    = strtolower(trim($body['source'] ?? ''));
$reqCity   = strtolower(trim($body['city'] ?? ''));

// Normalize display names to template keys
$nicheAliases = [
    'café'        => 'cafe',
    'cafés'       => 'cafe',
    'cafes'       => 'cafe',
    'pizzeria'    => 'pizza',
    'döner'       => 'doener',
    'doner'       => 'doener',
    'eiscafé'     => 'eiscafe',
    'bäckerei'    => 'baeckerei',
    'yoga-studio' => 'yoga',
];
$niche = $nicheAliases[$niche] ?? $niche;

// LeadFormDoener: kontakt is either phone or email
if ($kontakt && !$email && !$phone) {
    if (strpos($kontakt, '@') !== false) {
        $email = $kontakt;
    } else {
        $phone = $kontakt;
    }
}

// LeadFormDoener: ladenname is the business, use it as firstName if no vorname
if (!$firstName && $business) {
    $firstName = $business;
}

// ── Validate ──────────────────────────────────────────────────────────────────
if (!$firstName) {
    http_response_code(400);
    echo json_encode(['error' => 'Name ist erforderlich']);
    exit;
}
if (!$email && !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'E-Mail oder Telefon ist erforderlich']);
    exit;
}

// ── Generic API helper ────────────────────────────────────────────────────────
function apiRequest(string $method, string $baseUrl, string $path, array $headers, array $data = []): array
{
    $ch = curl_init($baseUrl . $path);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 15,
    ]);
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    $raw      = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['code' => $httpCode, 'body' => json_decode($raw, true)];
}

// ── Rate-Limit-Helfer ─────────────────────────────────────────────────────────
// Gleitendes Fenster pro IP in einer JSON-Datei. Bei JEDEM Fehler (kein Schreib-
// recht, kaputte Datei …) wird durchgelassen — ein echter Lead darf nie an der
// Spam-Bremse verloren gehen.
function isRateLimited(string $ip): bool
{
    if (RATE_LIMIT_MAX <= 0) {
        return false;
    }
    try {
        $dir = RATE_LIMIT_DIR;
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
        $file = $dir . '/' . md5($ip) . '.json';
        $now  = time();
        $hits = [];
        if (is_readable($file)) {
            $hits = json_decode((string) @file_get_contents($file), true) ?: [];
        }
        $hits = array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - RATE_LIMIT_WINDOW));
        if (count($hits) >= RATE_LIMIT_MAX) {
            return true;
        }
        $hits[] = $now;
        @file_put_contents($file, json_encode($hits), LOCK_EX);
    } catch (\Throwable $e) {
        return false;
    }
    return false;
}

// ── Boomerang API helper ──────────────────────────────────────────────────────
function boomerang(string $method, string $path, array $data = []): array
{
    return apiRequest($method, BOOMERANG_BASE, $path, [
        'Content-Type: application/json',
        'X-API-Key: ' . BOOMERANG_API_KEY,
    ], $data);
}

// ── Salesflare API helper ─────────────────────────────────────────────────────
function salesflare(string $method, string $path, array $data = []): array
{
    return apiRequest($method, SALESFLARE_BASE, $path, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . SALESFLARE_API_KEY,
    ], $data);
}

// ── Salesflare-Dedup ──────────────────────────────────────────────────────────
// Sucht einen bestehenden Kontakt per E-Mail (sonst Telefon) und liefert dessen
// Account-ID zurück. WICHTIG: Wir übernehmen nur bei EXAKTEM Match — falls die
// API den Filter ignoriert und alle Kontakte liefert, würde sonst ein fremder
// Account getroffen. Kein Match / Fehler → null (es wird neu angelegt).
function salesflareFindExistingAccount(string $email, string $phone): ?int
{
    $query = $email
        ? 'email=' . rawurlencode($email)
        : ($phone ? 'phone_number=' . rawurlencode($phone) : '');
    if (!$query) {
        return null;
    }
    $res        = salesflare('GET', '/contacts?' . $query);
    $candidates = is_array($res['body'] ?? null) ? $res['body'] : [];
    $needPhone  = $phone ? preg_replace('/\D+/', '', $phone) : '';

    foreach ($candidates as $c) {
        if (!is_array($c)) {
            continue;
        }
        $matchEmail = $email && strtolower((string) ($c['email'] ?? '')) === strtolower($email);
        $matchPhone = false;
        if ($needPhone) {
            foreach (($c['phone_numbers'] ?? []) as $pn) {
                if (isset($pn['number']) && preg_replace('/\D+/', '', $pn['number']) === $needPhone) {
                    $matchPhone = true;
                    break;
                }
            }
        }
        if ($matchEmail || $matchPhone) {
            $acc = $c['account'] ?? null;
            return is_array($acc) ? ($acc['id'] ?? null) : $acc;
        }
    }
    return null;
}

// ── Salesflare lead recorder ──────────────────────────────────────────────────
// Speichert Account + Kontakt + Opportunity. Läuft VOR Boomerang, damit ein Fehler
// bei der Demo-Karten-Erstellung den Lead nie mehr verschluckt. Fehler hier
// blockieren die Antwort nie (try/catch, fire & forget).
function recordSalesflareLead(
    string $firstName,
    string $instagram,
    string $phone,
    string $email,
    string $niche,
    string $mode,
    string $source,
    string $reqCity,
    array $utm
) {
    try {
        // Dedup: bei Retry / Zweit-Anfrage denselben Account nicht doppelt anlegen.
        if (salesflareFindExistingAccount($email, $phone)) {
            return;
        }

        // Extract city/veedel/niche from utm_campaign (e.g. "koeln-nippes-cafes")
        $utmCampaign   = $utm['utm_campaign'] ?? '';
        $pathParts     = explode('-', $utmCampaign);
        $leadCity      = $pathParts[0] ?? 'unbekannt';
        $leadPage      = str_replace('-', '/', $utmCampaign); // koeln/nippes/cafes
        $baseTags = [$niche, $leadCity, $utmCampaign];
        if ($mode === 'gruender') {
            $baseTags[] = 'gruender-100';
            $baseTags[] = 'lifetime-100eur';
            if ($reqCity) {
                $baseTags[] = $reqCity;
            }
            if ($source === 'gruender_walkin') {
                $baseTags[] = 'walkin';
            }
        }
        $tags          = array_values(array_filter($baseTags));
        $instagramUrl  = $instagram ? 'https://www.instagram.com/' . $instagram : null;
        $nicheLabels   = ['cafe' => 'Café', 'doener' => 'Döner', 'pizza' => 'Pizza', 'restaurant' => 'Restaurant', 'eiscafe' => 'Eiscafé', 'baeckerei' => 'Bäckerei', 'friseur' => 'Friseur', 'fitnessstudio' => 'Fitnessstudio', 'yoga' => 'Yoga-Studio', 'blumenladen' => 'Blumenladen'];
        $nicheLabel    = $nicheLabels[$niche] ?? $niche;

        // ── Account (the business) ──────────────────────────────────────────────
        $accountPayload = [
            'name' => $instagram ? '@' . $instagram : $firstName,
            'tags' => $tags,
        ];
        if ($phone && $instagramUrl) {
            $accountPayload['phone_numbers']   = [['number' => $phone, 'type' => 'mobile']];
            $accountPayload['social_profiles'] = [['type' => 'instagram', 'username' => $instagram, 'url' => $instagramUrl]];
        } elseif ($phone) {
            $accountPayload['phone_numbers'] = [['number' => $phone, 'type' => 'mobile']];
        } elseif ($instagramUrl) {
            $accountPayload['social_profiles'] = [['type' => 'instagram', 'username' => $instagram, 'url' => $instagramUrl]];
        }

        $accountRes = salesflare('POST', '/accounts', $accountPayload);
        $accountId  = $accountRes['body']['id'] ?? null;

        // ── Contact (the person) ────────────────────────────────────────────────
        $contactPayload = [
            'firstname' => $firstName,
            'tags'      => $tags,
        ];
        if ($email) {
            $contactPayload['email'] = $email;
        }
        if ($phone) {
            $contactPayload['phone_numbers'] = [['number' => $phone, 'type' => 'mobile']];
        }
        if ($instagramUrl) {
            $contactPayload['social_profiles'] = [['type' => 'instagram', 'username' => $instagram, 'url' => $instagramUrl]];
        }
        if ($accountId) {
            $contactPayload['account'] = $accountId;
        }

        salesflare('POST', '/contacts', $contactPayload);

        // ── Opportunity ─────────────────────────────────────────────────────────
        if ($accountId) {
            salesflare('POST', '/opportunities', [
                'name'    => $nicheLabel . ' · @' . ($instagram ?: $firstName) . ' · /' . $leadPage,
                'account' => $accountId,
                'tags'    => $tags,
            ]);
        }
    } catch (\Throwable $e) {
        // Salesflare failure never blocks the main response
    }
}

// ── Telegram Lead-Alert ───────────────────────────────────────────────────────
// Pingt sofort bei jedem Lead mit Name + Nummer + Nische + fertigem wa.me-Link,
// damit das Follow-up in einem Tap passieren kann. Fire & forget, blockiert nie.
function notifyTelegramLead(
    string $firstName,
    string $phone,
    string $email,
    string $instagram,
    string $niche,
    string $mode,
    array $utm
) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return;
    }
    try {
        $utmCampaign = $utm['utm_campaign'] ?? '';
        $leadPage    = $utmCampaign ? '/' . str_replace('-', '/', $utmCampaign) : '';
        $nicheLabels = ['cafe' => 'Café', 'doener' => 'Döner', 'pizza' => 'Pizza', 'restaurant' => 'Restaurant', 'eiscafe' => 'Eiscafé', 'baeckerei' => 'Bäckerei', 'friseur' => 'Friseur', 'fitnessstudio' => 'Fitnessstudio', 'yoga' => 'Yoga-Studio', 'blumenladen' => 'Blumenladen'];
        $nicheLabel  = $nicheLabels[$niche] ?? $niche;

        // wa.me-Link aus der Telefonnummer bauen (deutsche Nummern: führende 0 → 49)
        $waLink = '';
        if ($phone) {
            $digits = preg_replace('/\D+/', '', $phone);
            if (strpos($digits, '0') === 0) {
                $digits = '49' . substr($digits, 1);
            }
            if ($digits) {
                $greeting = "Hallo {$firstName}, hier ist Daniel von bonuskarte.digital 👋 Danke, dass du dir eine Demo-Karte erstellt hast! Wann passt dir ein kurzer Call?";
                $waLink = 'https://wa.me/' . $digits . '?text=' . rawurlencode($greeting);
            }
        }

        $lines   = [];
        $lines[] = '🎯 <b>Neuer Lead</b> — ' . htmlspecialchars($nicheLabel) . ($mode === 'gruender' ? ' · Gründer' : '');
        $lines[] = '👤 ' . htmlspecialchars($firstName);
        $lines[] = '📱 ' . ($phone ? htmlspecialchars($phone) : '—');
        if ($email)     $lines[] = '✉️ ' . htmlspecialchars($email);
        if ($instagram) $lines[] = '📷 @' . htmlspecialchars($instagram);
        if ($leadPage)  $lines[] = '🔗 ' . htmlspecialchars($leadPage);
        if ($waLink)    $lines[] = "\n<a href=\"" . htmlspecialchars($waLink) . "\">📲 Auf WhatsApp antworten</a>";

        apiRequest('POST', TELEGRAM_BASE, '/bot' . TELEGRAM_BOT_TOKEN . '/sendMessage', [
            'Content-Type: application/json',
        ], [
            'chat_id'                  => TELEGRAM_CHAT_ID,
            'text'                     => implode("\n", $lines),
            'parse_mode'               => 'HTML',
            'disable_web_page_preview' => true,
        ]);
    } catch (\Throwable $e) {
        // Telegram failure never blocks the main response
    }
}

// ── FR / lead-only path (skip Boomerang, record in Salesflare only) ───────────
if (($body['mode'] ?? '') === 'lead' || ($body['lang'] ?? '') === 'fr') {
    $arrLabel    = trim($body['arr'] ?? '');
    $utmCampaign = $utm['utm_campaign'] ?? '';
    $utmSource   = $utm['utm_source']   ?? 'bonuskarte.digital';
    $tags        = array_values(array_filter(['paris', 'lead-fr', $niche, $utmCampaign]));
    $instagramUrl = $instagram ? 'https://www.instagram.com/' . $instagram : null;
    $nicheLabels  = ['boulangerie' => 'Boulangerie', 'cafe' => 'Café', 'restaurant' => 'Restaurant', 'coiffeur' => 'Coiffeur', 'kebab' => 'Kebab', 'pizzeria' => 'Pizzeria', 'glacier' => 'Glacier', 'fleuriste' => 'Fleuriste', 'salle-de-sport' => 'Salle de sport', 'institut-de-beaute' => 'Institut de beauté'];
    $nicheLabel   = $nicheLabels[$niche] ?? $niche;

    try {
        // Account
        $accountPayload = ['name' => $instagram ? '@' . $instagram : $firstName, 'tags' => $tags];
        if ($phone && $instagramUrl) {
            $accountPayload['phone_numbers']   = [['number' => $phone, 'type' => 'mobile']];
            $accountPayload['social_profiles'] = [['type' => 'instagram', 'username' => $instagram, 'url' => $instagramUrl]];
        } elseif ($phone) {
            $accountPayload['phone_numbers'] = [['number' => $phone, 'type' => 'mobile']];
        } elseif ($instagramUrl) {
            $accountPayload['social_profiles'] = [['type' => 'instagram', 'username' => $instagram, 'url' => $instagramUrl]];
        }
        $accountRes = salesflare('POST', '/accounts', $accountPayload);
        $accountId  = $accountRes['body']['id'] ?? null;

        // Contact
        $contactPayload = ['firstname' => $firstName, 'tags' => $tags];
        if ($phone)        $contactPayload['phone_numbers']   = [['number' => $phone, 'type' => 'mobile']];
        if ($instagramUrl) $contactPayload['social_profiles'] = [['type' => 'instagram', 'username' => $instagram, 'url' => $instagramUrl]];
        if ($accountId)    $contactPayload['account']          = $accountId;
        salesflare('POST', '/contacts', $contactPayload);

        // Opportunity
        if ($accountId) {
            $leadPage = str_replace('-', '/', $utmCampaign);
            salesflare('POST', '/opportunities', [
                'name'    => $nicheLabel . ' · ' . ($arrLabel ?: 'Paris') . ' · @' . ($instagram ?: $firstName),
                'account' => $accountId,
                'tags'    => $tags,
            ]);
        }
    } catch (\Throwable $e) {
        // Salesflare failure never blocks the response
    }

    echo json_encode(['success' => true]);
    exit;
}

// ── Step 0: Record lead in Salesflare FIRST (never lost on Boomerang failure) ─
recordSalesflareLead($firstName, $instagram, $phone, $email, $niche, $mode, $source, $reqCity, $utm);
notifyTelegramLead($firstName, $phone, $email, $instagram, $niche, $mode, $utm);

// ── Step 1: Create customer ───────────────────────────────────────────────────
$customerPayload = ['firstName' => $firstName];
if ($surname)  $customerPayload['surname'] = $surname;
if ($email)    $customerPayload['email']   = $email;
if ($phone)    $customerPayload['phone']   = $phone;

$customerRes = boomerang('POST', '/api/v2/customers', $customerPayload);

// If customer already exists (409), try to find them
if ($customerRes['code'] === 409) {
    $filter = $email ? "?email={$email}" : "?phone={$phone}";
    $findRes = boomerang('GET', '/api/v2/customers' . $filter);
    $customerId = $findRes['body']['data'][0]['id'] ?? null;
} elseif ($customerRes['code'] === 201) {
    $customerId = $customerRes['body']['data']['id'] ?? null;
} else {
    $customerId = null;
}

if (!$customerId) {
    http_response_code(500);
    echo json_encode(['error' => 'Kunde konnte nicht angelegt werden']);
    exit;
}

// ── Step 2: Create card ───────────────────────────────────────────────────────
$templateId = TEMPLATE_IDS[$niche] ?? TEMPLATE_FALLBACK;

$cardRes = boomerang('POST', '/api/v2/cards', [
    'templateId' => $templateId,
    'customerId' => $customerId,
]);

if ($cardRes['code'] !== 201 || empty($cardRes['body']['data'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Karte konnte nicht erstellt werden']);
    exit;
}

$card = $cardRes['body']['data'];

// ── UTM helper: append UTM params to a URL ───────────────────────────────────
function appendUtm(string $url, array $utm): string
{
    if (!$url || !$utm) return $url;
    $allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    $params = array_intersect_key($utm, array_flip($allowed));
    if (!$params) return $url;
    $sep = (strpos($url, '?') !== false) ? '&' : '?';
    return $url . $sep . http_build_query($params);
}

// Append UTM params to all install links
$installLink = isset($card['installLink']) ? appendUtm($card['installLink'], $utm) : null;
$shareLink   = isset($card['shareLink'])   ? appendUtm($card['shareLink'], $utm)   : null;

$directInstallLink = $card['directInstallLink'] ?? null;
if (is_array($directInstallLink)) {
    foreach ($directInstallLink as $key => $link) {
        if (is_string($link)) {
            $directInstallLink[$key] = appendUtm($link, $utm);
        }
    }
}

// ── Respond ───────────────────────────────────────────────────────────────────
echo json_encode([
    'success'           => true,
    'installLink'       => $installLink,
    'shareLink'         => $shareLink,
    'directInstallLink' => $directInstallLink,
    'qrLink'            => $card['qrLink'] ?? null,
]);
