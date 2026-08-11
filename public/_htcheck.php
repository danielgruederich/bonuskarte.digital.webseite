<?php
// Abgeschaltet. Diese Datei war ein einmaliger Ist-Zustand-Check (11.08.2026),
// um vor dem Anlegen der .htaccess zu pruefen, ob dort bereits eine liegt.
// Ergebnis: es lag keine vor. Der Check wird nicht mehr gebraucht.
// Die Datei bleibt als leere Huelle bestehen, weil deploy.php beim Entpacken
// nur ueberschreibt und geloeschte Dateien nicht vom Server entfernt.
header('HTTP/1.1 404 Not Found');
exit;
