// Schneidet aus den Karten-Mockups (public/images/karten/*.webp, 900×1774 aus
// scripts/compose_karte.py) die Wallet-Karte aus (x 278–862, y 677–1492) und
// speichert sie als public/images/karten/pass/<name>.webp – für die Blog-Titelbilder.
// Aufruf: node scripts/karten-pass.mjs  (nach jeder Änderung an den Mockups)
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.join(process.cwd(), 'public/images/karten')
const OUT = path.join(SRC, 'pass')
fs.mkdirSync(OUT, { recursive: true })
for (const file of fs.readdirSync(SRC).filter(f => f.endsWith('.webp'))) {
  const meta = await sharp(path.join(SRC, file)).metadata()
  if (meta.width !== 900 || meta.height !== 1774) throw new Error(`${file}: ${meta.width}×${meta.height}, erwartet 900×1774`)
  await sharp(path.join(SRC, file))
    .extract({ left: 278, top: 677, width: 584, height: 815 })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, file))
  console.log(`pass/${file}`)
}
