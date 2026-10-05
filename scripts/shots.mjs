import puppeteer from 'puppeteer-core'
const out = process.argv[2]
const only = process.argv[3]
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const pages = [['home', '/'], ['pomoc', '/pomoc'], ['wspolpraca', '/wspolpraca'], ['o-fundacji', '/o-fundacji'], ['przejrzystosc', '/przejrzystosc']]
for (const [vw, vh, tag, scale] of [[1440, 900, 'd', 0.5], [390, 844, 'm', 1]]) {
  for (const [name, url] of pages) {
    if (only && !only.split(',').includes(name + '-' + tag) && !only.split(',').includes(name)) continue
    const p = await b.newPage()
    const errs = []
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
    p.on('pageerror', (e) => errs.push(String(e)))
    await p.setViewport({ width: vw, height: vh, deviceScaleFactor: scale, isMobile: tag === 'm', hasTouch: tag === 'm' })
    await p.goto('http://localhost:4317' + url, { waitUntil: 'networkidle0' })
    await p.evaluate(async () => {
      await document.fonts.ready
      const h = document.documentElement.scrollHeight
      for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)) }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 1600))
    })
    const info = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      rv: document.querySelectorAll('[data-rv]').length, rvIn: document.querySelectorAll('[data-rv].in').length,
      imgs: [...document.images].filter((i) => !i.complete || !i.naturalWidth).length, h: document.documentElement.scrollHeight,
    }))
    await p.screenshot({ path: `${out}/${name}-${tag}.jpg`, fullPage: true, type: 'jpeg', quality: 78 })
    console.log(name, tag, JSON.stringify(info), errs.length ? errs : '')
    await p.close()
  }
}
await b.close()
