// Erzeugt die Vorschaubilder (og:image) aller Blog-Artikel als 1200×630-JPG
// unter public/images/blog-og/<slug>.jpg.
//
// Aufruf: npm run blog:og            (alle Artikel ohne Bild)
//         npm run blog:og -- --all   (alle neu erzeugen)
//
// Ablauf: Astro-Dev-Server mit BLOG_OG=1 starten (nur dann gibt es die Vorlage
// src/pages/blog-og/[...slug].astro), jede Seite mit Google Chrome headless
// fotografieren, mit sharp als JPG speichern. Braucht Google Chrome unter macOS.
// Neue Artikel: Skript laufen lassen und die neuen JPGs mit committen –
// ohne Bild fällt der Artikel automatisch auf heroImage zurück.
import { spawn, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const CONTENT = path.join(ROOT, 'src/content/blog')
const OUT = path.join(ROOT, 'public/images/blog-og')
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 4331
const all = process.argv.includes('--all')

if (!fs.existsSync(CHROME)) {
  console.error(`Google Chrome nicht gefunden: ${CHROME}`)
  process.exit(1)
}

// Slugs = Dateipfade unter src/content/blog ohne .md (z. B. "en/psychology-of-stamp-cards")
const slugs = []
for (const entry of fs.readdirSync(CONTENT, { recursive: true })) {
  if (entry.endsWith('.md')) slugs.push(entry.replace(/\.md$/, '').split(path.sep).join('/'))
}
const todo = slugs.filter(s => all || !fs.existsSync(path.join(OUT, `${s}.jpg`))).sort()
if (todo.length === 0) {
  console.log('Alle Vorschaubilder vorhanden. Mit --all neu erzeugen.')
  process.exit(0)
}

const server = spawn('npx', ['astro', 'dev', '--port', String(PORT), '--host', '127.0.0.1'], {
  cwd: ROOT,
  env: { ...process.env, BLOG_OG: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
const stop = () => { try { server.kill('SIGTERM') } catch {} }
process.on('exit', stop)

async function waitForServer() {
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/blog-og/${todo[0]}/`)
      if (res.ok) return
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error('Astro-Dev-Server antwortet nicht')
}

try {
  await waitForServer()
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-og-'))
  let done = 0
  for (const slug of todo) {
    const png = path.join(tmp, 'shot.png')
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
      '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${png}`,
      `http://127.0.0.1:${PORT}/blog-og/${slug}/`,
    ], { stdio: 'ignore' })
    const target = path.join(OUT, `${slug}.jpg`)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    const meta = await sharp(png).metadata()
    if (meta.width !== 1200 || meta.height !== 630) throw new Error(`${slug}: ${meta.width}×${meta.height} statt 1200×630`)
    await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(target)
    done++
    console.log(`${done}/${todo.length}  ${slug}.jpg`)
  }
  fs.rmSync(tmp, { recursive: true, force: true })
} finally {
  stop()
}
