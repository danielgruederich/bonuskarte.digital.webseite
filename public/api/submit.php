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

// ── Config ───────────────────────────────────────────────────────────────────
const BOOMERANG_API_KEY  = 'a34f3829b32b7c629059a780a0919a13';
const BOOMERANG_BASE     = 'https://api.digitalwallet.cards';
const SALESFLARE_API_KEY = 'Lh1Qucl715Sp6Pwy4DZpoxzlGWt64Ugz7GA3M9G5_NKjm';
const SALESFLARE_BASE    = 'https://api.salesflare.com';

// Add new niche template IDs here as you create them in Boomerang
const TEMPLATE_IDS = [
    'cafe'       => 1046392, // Kölner Kaffee Laden — active ✅
    'doener'     => 1115375, // active ✅
    'pizza'      => 1115406, // active ✅
    'restaurant' => 1115409, // active ✅
    'eiscafe'    => 1060441, // Eiscafé — active ✅
    'baeckerei'  => 1115411, // active ✅
    'friseur'    => 1115412, // active ✅
    // TODO: fitnessstudio, yoga, blumenladen — noch kein Template (Café-Fallback)
];
const TEMPLATE_FALLBACK = 1046392; // used if niche has no template yet

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
    'café'      => 'cafe',
    'cafés'     => 'cafe',
    'cafes'     => 'cafe',
    'pizzeria'  => 'pizza',
    'döner'     => 'doener',
    'doner'     => 'doener',
];
$niche = $nicheAliases[$niche] ?? $niche;

// LeadFormDoener: kontakt is either phone or email
if ($kontakt && !$email && !$phone) {
    if (str_contains($kontakt, '@')) {
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

// ── Step 3: Create lead in Salesflare (fire & forget — never blocks response) ─
try {
    // Extract city/veedel/niche from utm_campaign (e.g. "koeln-nippes-cafes")
    $utmCampaign   = $utm['utm_campaign'] ?? '';
    $utmSource     = $utm['utm_source'] ?? 'bonuskarte.digital';
    $pathParts     = explode('-', $utmCampaign);
    $leadCity      = $pathParts[0] ?? 'unbekannt';
    $leadVeedel    = $pathParts[1] ?? '';
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

// ── UTM helper: append UTM params to a URL ───────────────────────────────────
function appendUtm(string $url, array $utm): string
{
    if (!$url || !$utm) return $url;
    $allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    $params = array_intersect_key($utm, array_flip($allowed));
    if (!$params) return $url;
    $sep = str_contains($url, '?') ? '&' : '?';
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
]);
