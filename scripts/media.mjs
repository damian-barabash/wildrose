// media-src/*.jpg|png → public/img/*.webp (dłuższy bok do 1600 px).
// Zdjęcia źródłowe nie trafiają do gita; ich autorzy i licencje są w media-src/credits.json.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const src = 'media-src'
const out = 'public/img'
fs.mkdirSync(out, { recursive: true })

for (const f of fs.readdirSync(src).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const name = path.parse(f).name
  const info = await sharp(path.join(src, f))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(out, `${name}.webp`))
  console.log(`${name}.webp ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`)
}
