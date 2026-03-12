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
const BOOMERANG_API_KEY = 'a34f3829b32b7c629059a780a0919a13';
const BOOMERANG_BASE    = 'https://api.digitalwallet.cards';

// Add new niche template IDs here as you create them in Boomerang
const TEMPLATE_IDS = [
    'cafe'       => 1046392, // Kölner Kaffee Laden — active ✅
    'doener'     => null,    // TODO: create in Boomerang
    'pizza'      => null,    // TODO: create in Boomerang
    'restaurant' => null,    // TODO: create in Boomerang
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

// ── Boomerang API helper ──────────────────────────────────────────────────────
function boomerang(string $method, string $path, array $data = []): array
{
    $ch = curl_init(BOOMERANG_BASE . $path);
    $headers = [
        'Content-Type: application/json',
        'X-API-Key: ' . BOOMERANG_API_KEY,
    ];
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

// ── Respond ───────────────────────────────────────────────────────────────────
echo json_encode([
    'success'          => true,
    'installLink'      => $card['installLink']      ?? null,
    'shareLink'        => $card['shareLink']        ?? null,
    'directInstallLink' => $card['directInstallLink'] ?? null,
]);
