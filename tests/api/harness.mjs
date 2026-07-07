/**
 * Test-Harness für public/api/submit.php.
 *
 * Startet zwei Server:
 *  1. Mock-Upstream (Node): spielt Boomerang, Salesflare UND Telegram in einem —
 *     zeichnet jeden eingehenden Request auf und liefert Canned-Responses.
 *  2. PHP Built-in-Server mit Doc-Root `public/`, dessen Env-Vars
 *     (BOOMERANG_BASE, SALESFLARE_BASE, TELEGRAM_BASE) auf den Mock zeigen.
 *
 * So läuft der echte PHP-Code der Lead-Pipeline — nur die externen APIs sind ersetzt.
 * Es verlässt kein einziger Request die Maschine.
 */
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

export const TEST_KEYS = {
  BOOMERANG_API_KEY: 'test-boomerang-key',
  SALESFLARE_API_KEY: 'test-salesflare-key',
  TELEGRAM_BOT_TOKEN: 'test-telegram-token',
  TELEGRAM_CHAT_ID: '42',
}

export const CANNED_CARD = {
  installLink: 'https://cards.example/install/abc',
  shareLink: 'https://cards.example/share/abc',
  directInstallLink: {
    universal: 'https://cards.example/u/abc',
    apple: 'https://cards.example/a/abc',
    google: 'https://cards.example/g/abc',
    pwa: 'https://cards.example/p/abc',
  },
  qrLink: 'https://cards.example/qr/abc.png',
}

export async function startMockUpstream() {
  const state = {
    /** Aufgezeichnete Requests in Empfangsreihenfolge: {method, path, query, headers, body} */
    requests: [],
    /** 'ok' | 'customer409' | 'customerFail' | 'cardFail' | 'salesflareFail' */
    mode: 'ok',
  }

  const server = createServer((req, res) => {
    let raw = ''
    req.on('data', (c) => (raw += c))
    req.on('end', () => {
      const url = new URL(req.url, 'http://mock')
      const entry = {
        method: req.method,
        path: url.pathname,
        query: Object.fromEntries(url.searchParams),
        headers: req.headers,
        body: raw ? JSON.parse(raw) : null,
      }
      state.requests.push(entry)

      const json = (code, obj) => {
        res.writeHead(code, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(obj))
      }

      // ── Salesflare ────────────────────────────────────────────────────
      if (url.pathname === '/accounts') {
        if (state.mode === 'salesflareFail') return json(500, { error: 'boom' })
        return json(200, { id: 9001 })
      }
      if (url.pathname === '/contacts' && req.method === 'GET') {
        // Dedup-Lookup. 'existingContact' → passender Kontakt; sonst leer.
        if (state.mode === 'existingContact') {
          return json(200, [
            { id: 9002, email: 'test@example.com', account: 9001, phone_numbers: [{ number: '0170 5551234' }] },
          ])
        }
        return json(200, [])
      }
      if (url.pathname === '/contacts') return json(200, { id: 9002 })
      if (url.pathname === '/opportunities') return json(200, { id: 9003 })

      // ── Boomerang ─────────────────────────────────────────────────────
      if (url.pathname === '/api/v2/customers' && req.method === 'POST') {
        if (state.mode === 'customer409') return json(409, { error: 'exists' })
        if (state.mode === 'customerFail') return json(500, { error: 'boom' })
        return json(201, { data: { id: 555 } })
      }
      if (url.pathname === '/api/v2/customers' && req.method === 'GET') {
        return json(200, { data: [{ id: 777 }] })
      }
      if (url.pathname === '/api/v2/cards') {
        if (state.mode === 'cardFail') return json(500, { error: 'boom' })
        return json(201, { data: { ...CANNED_CARD } })
      }

      // ── Telegram ──────────────────────────────────────────────────────
      if (url.pathname.startsWith('/bot')) return json(200, { ok: true })

      json(404, { error: `mock: unhandled ${req.method} ${url.pathname}` })
    })
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port

  return {
    url: `http://127.0.0.1:${port}`,
    state,
    reset() {
      state.requests.length = 0
      state.mode = 'ok'
    },
    /** Requests an einen Pfad-Präfix (optional nach Methode gefiltert), in Reihenfolge */
    sent(prefix, method) {
      return state.requests.filter((r) => r.path.startsWith(prefix) && (!method || r.method === method))
    },
    close: () => new Promise((resolve) => server.close(resolve)),
  }
}

export async function startPhpServer(upstreamUrl, extraEnv = {}) {
  const port = 8100 + Math.floor(Math.random() * 800)
  const child = spawn('php', ['-S', `127.0.0.1:${port}`, '-t', path.join(ROOT, 'public')], {
    env: {
      ...process.env,
      BOOMERANG_BASE: upstreamUrl,
      SALESFLARE_BASE: upstreamUrl,
      TELEGRAM_BASE: upstreamUrl,
      ...TEST_KEYS,
      ...extraEnv,
    },
    stdio: ['ignore', 'ignore', 'pipe'],
  })
  let stderr = ''
  child.stderr.on('data', (c) => (stderr += c))

  const base = `http://127.0.0.1:${port}`
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`${base}/api/submit.php`, { method: 'OPTIONS' })
      return {
        url: base,
        submit: (body, init = {}) =>
          fetch(`${base}/api/submit.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: typeof body === 'string' ? body : JSON.stringify(body),
            ...init,
          }),
        close: () => child.kill('SIGTERM'),
      }
    } catch {
      await sleep(100)
    }
  }
  child.kill('SIGTERM')
  throw new Error(`PHP server did not start on ${base}\n${stderr}`)
}
