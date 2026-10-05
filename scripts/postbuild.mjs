// GitHub Pages nie zna tras SPA: /pomoc odświeżone w przeglądarce dałoby 404.
// Dla każdej trasy kładziemy kopię index.html jako <trasa>/index.html (Pages oddaje ją z kodem 200),
// a 404.html łapie resztę.
import fs from 'node:fs'
import path from 'node:path'

const routes = ['pomoc', 'wspolpraca', 'o-fundacji', 'przejrzystosc']

const html = fs.readFileSync('dist/index.html', 'utf8')
for (const r of routes) {
  const out = path.join('dist', r, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
}
fs.writeFileSync('dist/404.html', html)
fs.writeFileSync('dist/.nojekyll', '')
console.log(`postbuild: ${routes.length} tras + 404.html`)
