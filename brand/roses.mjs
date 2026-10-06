// Rysunki róż do logo (viewBox 0 0 100 100, kolor = currentColor, wycięcia = var(--k)).
// Wszystkie znaki pokazują różę — z zawiniętym środkiem, liśćmi, łodygą i kolcami — a nie „kwiatek”.
const K = 'var(--k,#fff)'
const f = (n) => +n.toFixed(2)

// Róża widziana z góry: płatki układają się po spirali (kąt 137,5°), młodsze przykrywają starsze.
// mode: 'fill' — pełna, 'line' — sam kontur, 'neg' — jasna na pełnym tle.
export function bloom({ cx = 50, cy = 50, R = 46, n = 9, mode = 'fill', sw = 2.2, turn = 0 } = {}) {
  const fill = mode === 'fill' ? 'currentColor' : K
  const cut = mode === 'fill' ? K : 'currentColor'
  let c = []
  for (let k = n; k >= 1; k--) {
    const t = k / n
    const a = ((k * 137.5 + turn) * Math.PI) / 180
    const d = 0.44 * Math.pow(t, 0.85) * (k === 1 ? 0.35 : 1)
    c.push([d * Math.cos(a), d * Math.sin(a), 0.2 + 0.36 * t])
  }
  // wyśrodkowanie i dopasowanie do promienia R
  const x0 = Math.min(...c.map(([x, , r]) => x - r)), x1 = Math.max(...c.map(([x, , r]) => x + r))
  const y0 = Math.min(...c.map(([, y, r]) => y - r)), y1 = Math.max(...c.map(([, y, r]) => y + r))
  const s = (2 * R - (mode === 'fill' ? 0 : sw)) / Math.max(x1 - x0, y1 - y0)
  c = c.map(([x, y, r]) => [cx + (x - (x0 + x1) / 2) * s, cy + (y - (y0 + y1) / 2) * s, r * s])
  const [hx, hy, hr] = c[c.length - 1]
  const q = hr * 0.42
  // zawinięty środek
  const heart = `<path fill="none" stroke-linecap="round" d="M${f(hx - q)} ${f(hy + q * 0.5)}A${f(q)} ${f(q)} 0 1 1 ${f(hx + q * 0.9)} ${f(hy + q * 0.6)}"/>`
  return `<g fill="${fill}" stroke="${cut}" stroke-width="${sw}">${c.map(([x, y, r]) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/>`).join('')}${heart}</g>`
}

// Liść: od (x,y) w kierunku kąta a, długość L. Z nerwem.
export function leaf(x, y, a, L, { w = 0.3, vein = true, mode = 'fill', sw = 2 } = {}) {
  const d = `M0 0C${f(L * 0.22)} ${f(-L * w)} ${f(L * 0.7)} ${f(-L * w)} ${L} 0C${f(L * 0.7)} ${f(L * w)} ${f(L * 0.22)} ${f(L * w)} 0 0Z`
  const body = mode === 'line' ? `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linejoin="round"/>` : `<path d="${d}"/>`
  const v = vein ? `<path d="M${f(L * 0.16)} 0H${f(L * 0.8)}" fill="none" stroke="${mode === 'line' ? 'currentColor' : K}" stroke-width="${f(sw * 0.7)}" stroke-linecap="round"/>` : ''
  return `<g transform="translate(${x} ${y}) rotate(${a})">${body}${v}</g>`
}

// Działki kielicha pod kwiatem, nasada w (50,64).
export const SEPALS = `<path d="M50 60C44 68 37 71 29 69C34 64 40 61 47 60.5ZM50 60C56 68 63 71 71 69C66 64 60 61 53 60.5Z"/>`

const thorn = (x, y, dir) => `<path d="M${x} ${y - 3.4}L${x + dir * 7.5} ${y - 1.4}L${x} ${y + 3.4}Z"/>`

// Róża na łodydze: kwiat, działki kielicha, liście [y, kąt, długość], kolce.
const LEAVES = [[78, -152, 26], [66, -26, 24]]
export const stemRose = ({ thorns = true, leaves = LEAVES, mode = 'fill' } = {}) =>
  `<path d="M50 44C50 62 48 78 51 97" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>` +
  `<g transform="translate(50 46) scale(.62) translate(-50 -60)">${SEPALS}</g>` +
  leaves.map(([y, a, L]) => leaf(50, y, a, L, { w: 0.34 })).join('') +
  (thorns ? thorn(49.3, 58, -1) + thorn(50.5, 86, 1) : '') +
  bloom({ cy: 24, R: 23, n: 7, sw: 1.7, mode })

function spiralPath(cx, cy, r0, r1, turns, a0 = 0) {
  const pts = []
  const N = Math.round(turns * 60)
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const a = a0 + t * turns * 2 * Math.PI
    const r = (r0 + (r1 - r0) * t) * (1 + 0.07 * Math.sin(2.5 * a))
    pts.push(`${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`)
  }
  return pts
}

export const ICONS = {
  // 01 pełna róża z liśćmi
  roza: leaf(50, 56, 152, 47, { w: 0.3 }) + leaf(50, 56, 28, 47, { w: 0.3 }) + bloom({ cy: 44, R: 40 }),
  // 02 róża zamiast litery O
  litera: bloom({ R: 48, sw: 2.6 }),
  // 03 róża rysowana cienką linią
  kontur: leaf(50, 56, 152, 46, { w: 0.3, mode: 'line', sw: 1.8 }) + leaf(50, 56, 28, 46, { w: 0.3, mode: 'line', sw: 1.8 }) + bloom({ cy: 44, R: 39, mode: 'line', sw: 1.8 }),
  // 04 róża na łodydze z kolcami
  kolce: stemRose(),
  // 05 róża w otwartym okręgu
  objecie:
    `<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="232 58" transform="rotate(-38 50 50)"/>` +
    bloom({ R: 31, sw: 2 }),
  // 06 pieczęć: róża w dwóch okręgach
  pieczec:
    `<circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1.8"/>` +
    `<circle cx="50" cy="50" r="43.5" fill="none" stroke="currentColor" stroke-width=".9"/>` +
    `<g transform="translate(50 52) scale(.74) translate(-50 -50)">${stemRose()}</g>`,
  // 07 dwie skrzyżowane róże — „Roses” w liczbie mnogiej
  dwie:
    `<g transform="rotate(-22 50 90)">${stemRose({ leaves: [[68, -150, 25]] })}</g>` +
    `<g transform="rotate(22 50 90) translate(100 0) scale(-1 1)">${stemRose({ leaves: [[68, -150, 25]] })}</g>`,
  // 08 róża jedną linią: zwinięty kwiat przechodzi w łodygę i liść
  linia: (() => {
    const s = spiralPath(50, 34, 2.5, 27, 2.6, -0.4)
    const [ex, ey] = s[s.length - 1].split(' ').map(Number)
    return `<path d="M${s.join('L')}C${f(ex - 4)} ${f(ey + 12)} 52 66 50 78C49 86 50 92 52 97M50 78C40 80 30 76 24 66C36 64 46 68 50 78M50.5 89C60 89 70 84 75 74C64 74 55 80 50.5 89" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
  })(),
  // 09 pąk: róża sprowadzona do kilku prostych kształtów
  pak:
    `<path d="M50 76V97" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/>` +
    `<g transform="translate(0 15)">${SEPALS}</g>` +
    leaf(50, 92, -38, 27, { w: 0.34 }) +
    `<path d="M50 5C68 5 80 21 80 41C80 60 67 73 50 73C33 73 20 60 20 41C20 21 32 5 50 5Z"/>` +
    `<path d="M21 31C29 53 52 63 80 47M77 26C67 40 51 45 36 40M39 23C43 13 57 12 60 21C62 28 53 32 49 26" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`,
  // 10 sygnet: jasna róża na pełnym kole
  znak: `<circle cx="50" cy="50" r="49"/>` + bloom({ R: 35, mode: 'neg', sw: 2.6 }),
}

export const svg = (name, color = '#9D0776', bg = '#fff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="${color}">${ICONS[name].replaceAll(K, bg).replaceAll('currentColor', color)}</svg>\n`
