<?php
// TEMPORAER — liest den Ist-Zustand der Server-Konfiguration aus, damit eine
// vorhandene .htaccess nicht blind ueberschrieben wird.
// Wird nach einmaligem Auslesen im naechsten Deploy wieder entfernt.
// Ohne gueltigen Token: 404, damit die Datei nicht auffindbar ist.
// PHP 7.0-kompatibel: kein str_contains, kein str_starts_with, kein void-Return.
$token = 'n2v0xKsQHDocBuTkbP0F-LiE0kIYS558';
if (!isset($_GET['token']) || !hash_equals($token, $_GET['token'])) {
    header('HTTP/1.1 404 Not Found');
    exit;
}
header('Content-Type: text/plain; charset=utf-8');

echo "PHP-Version: " . PHP_VERSION . "\n";
echo "Webroot: " . getcwd() . "\n\n";

echo "===== .htaccess =====\n";
if (file_exists('.htaccess')) {
    echo "Groesse: " . filesize('.htaccess') . " Bytes\n";
    echo "Geaendert: " . date('Y-m-d H:i:s', filemtime('.htaccess')) . "\n";
    echo "--- Inhalt ---\n";
    echo file_get_contents('.htaccess');
    echo "\n--- Ende ---\n\n";
} else {
    echo "(existiert NICHT)\n\n";
}

// deploy.php enthaelt das Deploy-Token — nur Metadaten, niemals der Inhalt.
echo "===== deploy.php =====\n";
if (file_exists('deploy.php')) {
    echo "existiert, " . filesize('deploy.php') . " Bytes, geaendert " . date('Y-m-d H:i:s', filemtime('deploy.php')) . "\n\n";
} else {
    echo "(existiert NICHT)\n\n";
}

echo "===== Webroot, oberste Ebene =====\n";
$entries = scandir('.');
foreach ($entries as $e) {
    if ($e === '.' || $e === '..') { continue; }
    echo (is_dir($e) ? '[D] ' : '[F] ') . $e . "\n";
}
