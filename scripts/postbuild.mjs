// GitHub Pages nie zna tras SPA: /pomoc odświeżone w przeglądarce dałoby 404.
// Dla każdej trasy kładziemy kopię index.html jako <trasa>/index.html (Pages oddaje ją z kodem 200),
// a 404.html łapie resztę.
import fs from 'node:fs'
import path from 'node:path'

const routes = ['pomoc', 'wspolpraca', 'o-fundacji', 'przejrzystosc', 'kontakt']

const html = fs.readFileSync('dist/index.html', 'utf8')
// każda trasa dostaje swój <title> i opis z src/content/seo.json
const seo = JSON.parse(fs.readFileSync('src/content/seo.json', 'utf8'))
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const withMeta = (m) =>
  html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(m.description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(m.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(m.description)}"`)
for (const r of routes) {
  const out = path.join('dist', r, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, withMeta(seo['/' + r]))
}
fs.writeFileSync('dist/404.html', html)
fs.writeFileSync('dist/.nojekyll', '')
console.log(`postbuild: ${routes.length} tras + 404.html`)
