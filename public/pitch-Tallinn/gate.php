<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name  = isset($data['name'])  ? strip_tags(trim($data['name']))  : '';
$email = isset($data['email']) ? strip_tags(trim($data['email'])) : '';

if ($name === '' && $email === '') {
    echo json_encode(['ok' => true, 'note' => 'no data']);
    exit;
}

$to      = 'daniel@fuerte.digital';
$subject = 'Pitch Deck Viewer: ' . ($name ?: 'Unbekannt');
$body    = "Jemand hat das Pitch Deck angesehen:\n\n"
         . "Name:  " . ($name ?: '–') . "\n"
         . "Email: " . ($email ?: '–') . "\n"
         . "Zeit:  " . date('d.m.Y H:i') . " Uhr\n"
         . "Seite: pitch-Tallinn\n";

$headers = "From: noreply@bonuskarte.digital\r\n"
         . "Reply-To: " . ($email ?: 'noreply@bonuskarte.digital') . "\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $body, $headers);

echo json_encode(['ok' => true]);
