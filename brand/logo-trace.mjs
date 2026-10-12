// Logo klienta (brand/klient/wild-roses-logo.png, raster 1536×1024) → wektor.
// Kanał alfa ×4 → próg → potrace; trzy części: znak (róże), napis, „FUNDACJA”.
// Wynik: src/lib/logo.ts (ścieżki dla komponentu Logo), public/favicon.svg i public/apple-touch-icon.png.  Uruchom: npm run logo
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'

const SRC = new URL('./klient/wild-roses-logo.png', import.meta.url).pathname
const K = 4 // powiększenie przed śledzeniem
const PAD = 6 // margines wycinka w px źródła
// pasy wierszy źródła (puste wiersze między nimi)
const PARTS = { mark: [38, 704], word: [716, 872], sub: [912, 977] }

const { data, info } = await sharp(SRC).ensureAlpha().extractChannel('alpha').raw().toBuffer({ resolveWithObject: true })
const W = info.width
const tmp = mkdtempSync(join(tmpdir(), 'wr-logo-'))
const out = {}

for (const [name, [y0, y1]] of Object.entries(PARTS)) {
  let x0 = W, x1 = 0
  for (let y = y0; y <= y1; y++) for (let x = 0; x < W; x++) if (data[y * W + x] > 128) { if (x < x0) x0 = x; if (x > x1) x1 = x }
  const box = { left: x0 - PAD, top: y0 - PAD, width: x1 - x0 + 1 + PAD * 2, height: y1 - y0 + 1 + PAD * 2 }
  const big = await sharp(data, { raw: { width: W, height: info.height, channels: 1 } })
    .extract(box)
    .resize({ width: box.width * K, kernel: 'cubic' })
    .blur(0.8)
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true })
  // PGM: potrace śledzi ciemne, więc odwracamy alfę
  const pgm = Buffer.concat([Buffer.from(`P5\n${big.info.width} ${big.info.height}\n255\n`), Buffer.from(big.data.map((v) => 255 - v))])
  const pgmPath = join(tmp, `${name}.pgm`)
  writeFileSync(pgmPath, pgm)
  const svg = execFileSync('potrace', [pgmPath, '-b', 'svg', '-k', '0.5', '-t', '8', '-a', '1.1', '-O', '0.4', '-u', '1', '-o', '-'], { maxBuffer: 1 << 26 }).toString()
  const d = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1].replace(/\s+/g, ' ').trim()).join(' ')
  // potrace: jednostki = px×K, oś y do góry → w komponencie transform scale(1/K, -1/K) + przesunięcie
  out[name] = { x: box.left, y: box.top, w: box.width, h: box.height, d }
  console.log(name, box, `${(d.length / 1024).toFixed(1)} KB`)
}

const S = 1 / K
const ts = `// WYGENEROWANE przez brand/logo-trace.mjs z logo klienta — nie edytować ręcznie.
// Każda część: położenie i rozmiar w px źródła oraz ścieżka w jednostkach potrace (transform w Logo.tsx).
export const LOGO_SCALE = ${S}
${Object.entries(out).map(([k, v]) => `export const LOGO_${k.toUpperCase()} = { x: ${v.x}, y: ${v.y}, w: ${v.w}, h: ${v.h}, d: '${v.d}' }`).join('\n')}
`
writeFileSync(new URL('../src/lib/logo.ts', import.meta.url), ts)

// favicon: sam znak w kwadracie
const m = out.mark
const side = Math.max(m.w, m.h)
const icon = (pad, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${side + pad * 2} ${side + pad * 2}">${bg}<path fill="#B4033D" transform="translate(${(side - m.w) / 2} ${(side - m.h) / 2 + m.h}) scale(${S} ${-S})" d="${m.d}"/></svg>\n`
writeFileSync(new URL('../public/favicon.svg', import.meta.url), icon(0, ''))
const touch = icon(90, `<rect x="-90" y="-90" width="${side + 180}" height="${side + 180}" fill="#fff"/>`)
await sharp(Buffer.from(touch)).resize(180, 180).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname)
