# Deploy bonuskarte.digital

Stand: 2026-09-14

## Ablauf

1. Push auf `main` (oder täglich 6 Uhr MEZ per Cron, oder manuell `gh workflow run deploy.yml`)
2. GitHub Actions baut die Seite (`astro build`), schreibt den Commit-SHA nach `dist/deploy-version.txt`, zippt `dist/` (~52 MB, ~4.000 Dateien) und hängt das ZIP als Release `deploy-latest` ans Repo
3. Der Workflow ruft `https://bonuskarte.digital/deploy.php?token=…` auf
4. `deploy.php` lädt das ZIP vom Release, entpackt es und kopiert die Dateien ins Webroot — **unveränderte Dateien werden übersprungen** (Größe + MD5)
5. Der Workflow pollt `https://bonuskarte.digital/deploy-version.txt`, bis der SHA des Runs live ist (max. 10 Minuten), und macht danach einen Smoke-Test auf `/api/submit.php`

Erfolg wird **am ausgelieferten Commit** gemessen, nicht an der HTTP-Antwort des Webhooks.

## Warum so

- **Cloudflare kappt Requests nach 100 s mit 524.** `deploy.php` braucht ohne Änderungen 16–35 s, bei einem Vollkopieren (z. B. nach CSS-Änderung, weil jede HTML-Seite die gehashten Asset-Namen enthält) auch mal 140 s. Der Server arbeitet trotz 524 fertig (`ignore_user_abort`). Deshalb ist 524 im Workflow kein Fehler; nur 403 (falscher Token) bricht sofort ab.
- **Das Hosting läuft ohne PHP-FPM.** Ein „sofort antworten, im Hintergrund weiterarbeiten" (`fastcgi_finish_request` oder Flush + Connection: close) funktioniert nicht — der Webserver beendet das Script nach der Antwort. Am 14.09. ausprobiert, Script starb nach dem Entpacken. Nicht nochmal versuchen.
- **`/tmp` ist auf dem Hosting nicht verlässlich zwischen Requests geteilt.** Lock, Arbeitsordner und Log liegen deshalb im Home-Verzeichnis über dem Webroot.

## Dateien auf dem Server (StackCP, Account `fuerte.digital`)

| Pfad | Zweck | Im Repo? |
|---|---|---|
| `bonuskarte/` | Webroot von bonuskarte.digital | Inhalt = `dist/` |
| `bonuskarte/deploy.php` | Webhook-Script, enthält den Deploy-Token | **Nein** (gitignored; lokale Kopie in `deploy.php` im Repo-Root) |
| `bonuskarte/deploy-version.txt` | SHA des live ausgelieferten Commits | wird vom Build erzeugt |
| `bonuskarte-secrets.php` | API-Keys für `submit.php` | Nein (Vorlage: `bonuskarte-secrets.example.php`) |
| `bonuskarte-deploy.log` | Deploy-Log, wächst pro Lauf um 4 Zeilen | Nein |
| `bonuskarte-deploy.lock` | existiert nur während eines Laufs | Nein |
| `bonuskarte-deploy-tmp/` | ZIP + entpackte Dateien, wird nach jedem Lauf gelöscht | Nein |

`deploy.php` ist nicht im ZIP und wird von Deploys nie überschrieben. Änderungen daran: lokal in `deploy.php` bearbeiten, `php -l deploy.php`, dann per **StackCP-Dateimanager** nach `bonuskarte/` hochladen (Drag & Drop überschreibt ohne Rückfrage). Kein SSH-Schlüssel auf dem Mac; der Workflow hat nur den Webhook, keinen SFTP-Zugang.

## Ohne SSH nachsehen

```bash
# Deploy-Log (letzte 40 Zeilen) und ob gerade ein Lauf aktiv ist
curl -s "https://bonuskarte.digital/deploy.php?token=$TOKEN&status=1"

# Welcher Commit ist live?
curl -s "https://bonuskarte.digital/deploy-version.txt?t=$(date +%s)"

# Deploy von Hand anstoßen (antwortet erst am Ende, ggf. 524)
curl -s "https://bonuskarte.digital/deploy.php?token=$TOKEN"
# → {"ok":true,"live":"<sha>","copied":0,"skipped":3999,"seconds":16.1}
```

Der Token steht in der lokalen `deploy.php` und im GitHub-Secret `DEPLOY_TOKEN`.

## Wenn etwas schiefgeht

| Symptom | Bedeutung | Tun |
|---|---|---|
| Run rot in „Auf Live-Stand warten" | Server liefert nach 10 Min nicht den neuen SHA | Log per `status=1` lesen; `deploy.php` noch da? Release `deploy-latest` vorhanden? |
| Webhook 403 | Token in `deploy.php` ≠ GitHub-Secret | Beides abgleichen |
| Webhook 409 | Lock-Datei existiert, ein Lauf läuft (oder ist vor < 30 Min abgestürzt) | Warten; hartnäckig: `bonuskarte-deploy.lock` im Dateimanager löschen |
| Webhook 524 | Cloudflare-Timeout, Server arbeitet weiter | Nichts — der Live-Check entscheidet |
| Smoke-Test rot: „Serverkonfiguration unvollständig" | `bonuskarte-secrets.php` fehlt auf dem Server | Aus der Vorlage anlegen, außerhalb des Webroots |

## Geschichte

- 22.06.2026 — Webhook-Deploy eingeführt (Release-ZIP statt FTP/rsync)
- 14.09.2026 — Workflow misst am Live-Stand statt am HTTP-Status; `deploy.php` überspringt unveränderte Dateien, loggt, hat Lock + Status-Endpoint. Hintergrund-Variante verworfen (kein FPM).
