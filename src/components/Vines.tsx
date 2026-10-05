import { useEffect, useRef } from 'react'
import { abuseLines } from '../content/site'

// Tło: ledwo widoczna łodyga dzikiej róży, która rośnie razem z przewijaniem strony.
// W odstępach między sekcjami przebija zdania, które padają w domach z przemocą —
// po przebiciu zdanie blednie, a na jego końcu zakwita kwiat.
// Warstwa jest czysto dekoracyjna (aria-hidden) i leży pod treścią.

const NS = 'http://www.w3.org/2000/svg'
const HEART = 'M50 46C43.5 41.5 36 33 37.6 23.2C38.9 15.6 46.6 13.6 50 20.6C53.4 13.6 61.1 15.6 62.4 23.2C64 33 56.5 41.5 50 46Z'
const LEAF = 'M0 0C5 -6.5 14 -7 21 0C14 7 5 6.5 0 0Z'
const THORN = 'M-2.6 0L0 -6.5L2.6 0Z'

type Pt = [number, number]
type Mark = { len: number; el: Element }

// gładka krzywa przez punkty (Catmull-Rom → Bézier)
function smooth(p: Pt[]) {
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[Math.max(0, i - 1)], b = p[i], c = p[i + 1], e = p[Math.min(p.length - 1, i + 2)]
    d += `C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`
  }
  return d
}

const el = (name: string, attrs: Record<string, string | number>, parent: Element) => {
  const n = document.createElementNS(NS, name)
  for (const k in attrs) n.setAttribute(k, String(attrs[k]))
  parent.appendChild(n)
  return n
}

export function Vines() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = host.current
    const main = box?.parentElement
    if (!box || !main) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let path: SVGPathElement | null = null
    let total = 0
    let lens: number[] = [] // długość łodygi w próbkach…
    let maxY: number[] = [] // …i najniższy punkt osiągnięty do tej próbki
    let marks: Mark[] = []
    let shown = 0
    let cur = 0
    let reached = 0
    let raf = 0

    function build() {
      const W = main!.clientWidth
      const H = main!.offsetHeight
      const wrap = main!.querySelector<HTMLElement>('.wrap')
      if (!wrap || H < 400) return
      const pad = parseFloat(getComputedStyle(wrap).paddingLeft)
      const xL = Math.max(5, wrap.offsetLeft + pad - Math.min(26, pad * 0.58))
      const xR = W - xL
      const sway = W < 700 ? 2.5 : 7
      const fs = Math.max(17, Math.min(36, W * 0.03))

      const gaps = [...main!.querySelectorAll<HTMLElement>(':scope > .sec')]
        .map((s) => ({ y: s.offsetTop + parseFloat(getComputedStyle(s).paddingTop) / 2, h: parseFloat(getComputedStyle(s).paddingTop) }))
        .filter((g) => g.h >= 80)

      // punkty łodygi: pionowo przy krawędzi, w każdym odstępie przejście na drugą stronę
      const pts: Pt[] = []
      let side = -1
      let y = 36
      let k = 0
      const edge = () => (side < 0 ? xL : xR)
      const down = (to: number) => {
        for (; y < to; y += 150) pts.push([edge() + (k++ % 2 ? sway : -sway), y])
      }
      for (const g of gaps) {
        const reach = Math.min(74, g.h * 0.42)
        down(g.y - reach - 40)
        const from = edge()
        side = -side
        const to = edge()
        const dir = Math.sign(to - from)
        pts.push([from, g.y - reach], [from + dir * 46, g.y - 9], [W / 2, g.y], [to - dir * 46, g.y + 9], [to, g.y + reach])
        y = g.y + reach + 110
      }
      down(H - 60)
      pts.push([edge(), H - 24])

      box!.textContent = ''
      const svg = el('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}`, 'aria-hidden': 'true' }, box!)
      const words = el('g', { class: 'vn-words' }, svg)
      path = el('path', { class: 'vn-stem', d: smooth(pts) }, svg) as SVGPathElement
      const deco = el('g', {}, svg)

      total = path.getTotalLength()
      const step = 10
      lens = []
      maxY = []
      const xy: Pt[] = []
      let top = 0
      for (let l = 0; l <= total; l += step) {
        const p = path.getPointAtLength(l)
        top = Math.max(top, p.y)
        lens.push(l)
        maxY.push(top)
        xy.push([p.x, p.y])
      }

      marks = []
      const boxes: { x0: number; x1: number; y: number }[] = []
      gaps.forEach((g, n) => {
        const t = el('text', { class: 'vn-word', x: W / 2, y: g.y + fs * 0.34, 'text-anchor': 'middle', 'font-size': fs }, words)
        t.textContent = `„${abuseLines[n % abuseLines.length]}”`
        const b = (t as SVGTextElement).getBBox()
        boxes.push({ x0: b.x - 14, x1: b.x + b.width + 14, y: g.y })
        // kwiat zakwita tam, gdzie łodyga wychodzi ze zdania
        const exitRight = xy.findIndex(([, py]) => Math.abs(py - g.y) < 40) >= 0 && xy.find(([, py]) => Math.abs(py - g.y) < 40)![0] < W / 2
        const tx = exitRight ? b.x + b.width + fs * 0.75 : b.x - fs * 0.75
        let best = -1
        let bd = 1e9
        xy.forEach(([px, py], i) => {
          if (Math.abs(py - g.y) > 30) return
          const d = Math.abs(px - tx)
          if (d < bd) { bd = d; best = i }
        })
        if (best < 0) return
        const size = fs * 0.92
        const f = el('g', { transform: `translate(${xy[best][0].toFixed(1)} ${xy[best][1].toFixed(1)}) scale(${(size / 100).toFixed(3)}) translate(-50 -50)` }, deco)
        const bloom = el('g', { class: 'vn-bloom' }, f)
        for (let a = 0; a < 360; a += 72) el('path', { d: HEART, transform: `rotate(${a} 50 50)` }, bloom)
        marks.push({ len: lens[best], el: bloom }, { len: lens[best], el: t })
      })

      // liście i kolce co kawałek łodygi, poza zdaniami
      const gapLen = W < 700 ? 150 : 120
      for (let l = 70, n = 0; l < total - 30; l += gapLen, n++) {
        const p = path.getPointAtLength(l)
        const q = path.getPointAtLength(l + 2)
        if (boxes.some((b) => Math.abs(p.y - b.y) < 24 && p.x > b.x0 && p.x < b.x1)) continue
        const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI
        const flip = n % 2 ? 1 : -1
        const leaf = n % 3 !== 2
        const g = el('g', { transform: `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(ang + (leaf ? flip * 52 : flip > 0 ? 180 : 0)).toFixed(1)})` }, deco)
        marks.push({ len: l, el: el('path', { class: leaf ? 'vn-leaf' : 'vn-thorn', d: leaf ? LEAF : THORN }, g) })
      }
      marks.sort((a, b) => a.len - b.len)
      shown = 0

      path.style.strokeDasharray = `${total}`
      cur = Math.min(cur, total)
      tick(true)
    }

    // ile łodygi wolno pokazać, żeby jej czubek nie wyszedł poniżej wysokości y
    function lenAt(yy: number) {
      let lo = 0
      let hi = maxY.length - 1
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1
        if (maxY[mid] <= yy) lo = mid
        else hi = mid - 1
      }
      return lens[lo] ?? 0
    }

    function tick(jump = false) {
      raf = 0
      if (!path) return
      const tip = still ? 1e9 : window.innerHeight * 0.74 - main!.getBoundingClientRect().top
      reached = Math.max(reached, tip)
      const target = lenAt(reached)
      cur = jump || still ? Math.max(cur, target) : cur + (target - cur) * 0.07
      if (target - cur < 0.6) cur = target
      path.style.strokeDashoffset = `${total - cur}`
      while (shown < marks.length && marks[shown].len <= cur) marks[shown++].el.classList.add('on')
      if (cur < target) raf = requestAnimationFrame(() => tick())
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => tick()) }

    let timer = 0
    let lastW = 0
    let lastH = 0
    const ro = new ResizeObserver(() => {
      if (main.clientWidth === lastW && Math.abs(main.offsetHeight - lastH) < 4) return
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        lastW = main.clientWidth
        lastH = main.offsetHeight
        build()
      }, 180)
    })
    ro.observe(main)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <div className="vines" ref={host} aria-hidden="true" />
}
