// Prezentacja „Propozycje logo — Fundacja Wild Roses” (16:9, 1440×810) w stylu ofert Dmytrii Flow.
// node brand/build.mjs → brand/Wild-Roses-Logo-Propozycje.pdf + brand/icons/*.svg + brand/deck.html
// Rysunki róż: brand/roses.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { ICONS, svg } from './roses.mjs'

const dir = path.dirname(fileURLToPath(import.meta.url))
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const ROSE = '#9D0776'
const INK = '#231F20'
const PAPER = '#EEEBE5'
const TINT = '#F8E8F2'

const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">${ICONS[name]}</svg>`

// ---------- 10 wariantów — w każdym jest róża ----------
const V = [
  { id: 'roza', name: 'Róża', font: 'Instrument Sans SemiBold', m: 84, g: 28,
    why: 'Pełna róża widziana z góry, z dwoma liśćmi. Płatki zawijają się do środka po spirali — tak jak w prawdziwym kwiecie. Najbardziej bezpośredni wariant: od razu widać, że to róża.',
    html: (i) => `${i}<span class="t">WILD ROSES</span>` },
  { id: 'litera', name: 'Litera-róża', font: 'Instrument Sans Condensed Medium', m: 136, g: 42,
    why: 'Róża zastępuje literę O, więc logo jest jednocześnie napisem i znakiem. Dobrze działa jako duży nagłówek — ten wariant jest teraz na stronie jako logo testowe.',
    html: (i) => `<span class="t">WILD R${i}SES</span>` },
  { id: 'kontur', name: 'Kontur', font: 'Cormorant Garamond Medium Italic', m: 82, g: 28,
    why: 'Ta sama róża narysowana cienką linią, z klasyczną kursywą. Najspokojniejszy i najdelikatniejszy wariant — kojarzy się z opieką, zaufaniem i dyskrecją.',
    html: (i) => `${i}<span class="t">Wild Roses</span><span class="s">FUNDACJA</span>` },
  { id: 'kolce', name: 'Kolce', font: 'Archivo Expanded Bold', m: 80, g: 25,
    why: 'Róża na łodydze, z liśćmi i kolcami. Dzika róża jest delikatna, ale potrafi się bronić. Wariant o najmocniejszym głosie: siła, sprawczość, stawanie w obronie praw.',
    html: (i) => `${i}<span class="t">WILD<br>ROSES</span>` },
  { id: 'objecie', name: 'Objęcie', font: 'Fraunces Soft', m: 90, g: 29,
    why: 'Otwarty okrąg chroni różę, ale jej nie zamyka. Bezpieczna przestrzeń, z której zawsze można wyjść — tak jak z rozmowy z fundacją.',
    html: (i) => `${i}<span class="t">Wild Roses</span>` },
  { id: 'pieczec', name: 'Pieczęć', font: 'Montserrat Medium', m: 74, g: 26,
    why: 'Róża w podwójnym okręgu. Bardziej instytucjonalny i formalny ton — dobrze wygląda na dokumentach, sprawozdaniach i w rozmowach z partnerami biznesowymi.',
    html: (i) => `${i}<span class="t">WILD ROSES</span><span class="s">FUNDACJA</span>` },
  { id: 'dwie', name: 'Dwie róże', font: 'Manrope ExtraBold', m: 88, g: 28,
    why: 'Nazwa jest w liczbie mnogiej, więc róże są dwie i krzyżują łodygi. Nikt nie zostaje sam: obok jednej osoby staje druga. Najcieplejszy, najbardziej „ludzki” znak.',
    html: (i) => `${i}<span class="t">Wild Roses</span>` },
  { id: 'linia', name: 'Jedna linia', font: 'DM Serif Display', m: 92, g: 30,
    why: 'Róża narysowana jednym pociągnięciem: od zwiniętego środka, przez płatki, po łodygę. Droga wychodzenia z kryzysu krok po kroku. Ręczny charakter.',
    html: (i) => `${i}<span class="t">Wild Roses</span>` },
  { id: 'pak', name: 'Pąk', font: 'Outfit Light', m: 96, g: 31,
    why: 'Róża, która dopiero się otwiera — płatki jeszcze owijają środek. Nowy początek i to, co ma dopiero rozkwitnąć. Miękki, nowoczesny charakter.',
    html: (i) => `${i}<span class="t">wild roses</span>` },
  { id: 'znak', name: 'Sygnet', font: 'Sora SemiBold', m: 90, g: 29,
    why: 'Jasna róża na pełnym kole. Najlepiej widoczny z daleka i w małych rozmiarach: profil w social mediach, przypinka, naklejka, ikona aplikacji.',
    html: (i) => `${i}<span class="t">Wild Roses</span>` },
]

const lockup = (v, size, cls = '') => `<div class="lk lk-${v.id} ${cls}" style="font-size:${size}px">${v.html(icon(v.id))}</div>`

// ---------- slajdy ----------
const FOOT = 'FUNDACJA WILD ROSES — PROPOZYCJE LOGO'
const slide = (label, body, cls = '') => `
<section class="slide ${cls}">
  <div class="top">${label}</div><i class="hl hl-top"></i>
  <div class="body">${body}</div>
  <i class="hl hl-bot"></i><i class="vl vl-l"></i><i class="vl vl-r"></i>
  <img class="star" src="assets/dmytrii-flow.png" alt="">
  <div class="foot"><b>DMYTRII FLOW</b><span>${FOOT}</span></div>
</section>`

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (hex) => (1.05 / (lum(hex) + 0.05)).toFixed(1).replace('.', ',')

const slides = []

slides.push(slide('PROPOZYCJE LOGO', `<h1 class="cover">PROPOZYCJE LOGO<br>FUNDACJI<br>WILD ROSES</h1>`, 'is-cover'))

slides.push(slide('PUNKT WYJŚCIA', `
  <div class="cols">
    <div class="bul"><h3>Co niesie nazwa</h3>
      <p>Dzika róża rośnie sama, bez opieki, w trudnych miejscach. Jest delikatna, ale ma kolce i potrafi się obronić. To gotowa opowieść o osobach, którym fundacja pomaga: o sile, godności i nowym początku. Dlatego w każdym wariancie znakiem jest róża — z zawiniętym środkiem, liśćmi i kolcami — a nie umowny kwiatek.</p></div>
    <div class="bul"><h3>Dla kogo jest znak</h3>
      <p>Po pierwsze dla osób w kryzysie — znak ma uspokajać i budzić zaufanie w pierwszej sekundzie. Po drugie dla darczyńców, inwestorów i partnerów — ma wyglądać wiarygodnie na dokumentach i w rozmowach biznesowych.</p></div>
    <div class="bul"><h3>Zasady, które przyjąłem</h3>
      <p>Biel i jeden kolor. Dużo powietrza. Żadnych obrazów przemocy ani smutku — pokazujemy bezpieczeństwo, nie krzywdę. Znak musi działać w rozmiarze 24 px, bo większość osób trafi na stronę z telefonu.</p></div>
  </div>
  <i class="hl hl-mid"></i><div class="giant">IDEA</div>`))

const sw = (hex, note, pick) => `<div class="sw ${pick ? 'pick' : ''}"><i style="background:${hex}"></i><b>${hex}</b><span>${note}</span></div>`
slides.push(slide('KOLOR', `
  <div class="cols c2">
    <div class="bul"><h3>Biel + jeden kolor: ${ROSE}</h3>
      <p>Z palety magenty wybrałem najgłębszy odcień. Na białym tle ma kontrast ${contrast(ROSE)}:1, więc można nim pisać nawet drobny tekst i numery telefonów — to ważne dla osób, które szukają pomocy w pośpiechu. Jest też spokojniejszy od jaskrawego różu: daje poczucie powagi i bezpieczeństwa, a nie reklamy.</p>
      <p>Jasne tła na stronie to ten sam kolor rozbielony do 8–10 %. Nie dochodzi żaden drugi kolor.</p></div>
    <div class="sws">
      ${sw('#FE87C3', `kontrast ${contrast('#FE87C3')}:1 — za jasny na tekst`)}
      ${sw('#FE5CB0', `kontrast ${contrast('#FE5CB0')}:1 — za jasny na tekst`)}
      ${sw('#E7199D', `kontrast ${contrast('#E7199D')}:1 — tylko duże napisy`)}
      ${sw('#BB018A', `kontrast ${contrast('#BB018A')}:1 — dobra alternatywa`)}
      ${sw(ROSE, `kontrast ${contrast(ROSE)}:1 — wybrany`, true)}
    </div>
  </div>
  <i class="hl hl-mid"></i><div class="giant">KOLOR</div>`))

V.forEach((v, n) => {
  const no = String(n + 1).padStart(2, '0')
  slides.push(slide(`WARIANT ${no} — ${v.name.toUpperCase()}`, `
  <div class="var">
    <div class="p-main on-white">${lockup(v, v.m)}</div>
    <div class="p-side">
      <div class="tile on-rose">${lockup(v, v.g * 0.95)}</div>
      <div class="tile on-tint">${icon(v.id, 'solo')}</div>
      <div class="tile wide on-white">
        ${icon(v.id, 'px16')}${icon(v.id, 'px24')}${icon(v.id, 'px40')}
        ${lockup(v, v.g * 0.5)}
      </div>
      <div class="txt"><h3>${no}. ${v.name}</h3><p>${v.why}</p><small>Krój: ${v.font}</small></div>
    </div>
  </div>`))
})

slides.push(slide('ZESTAWIENIE 10 WARIANTÓW', `
  <div class="grid">${V.map((v, n) => `<div class="cell on-white"><em>${String(n + 1).padStart(2, '0')}</em>${lockup(v, v.g)}</div>`).join('')}</div>`))

slides.push(slide('IKONA — PROFIL, APLIKACJA, FAVIKONA', `
  <div class="avs">${V.map((v, n) => `
    <div class="av"><div class="c on-rose">${icon(v.id)}</div><div class="c on-white">${icon(v.id)}</div><div class="r on-paper">${icon(v.id, 'px24')}${icon(v.id, 'px16')}</div>
    <span>${String(n + 1).padStart(2, '0')} ${v.name}</span></div>`).join('')}</div>`))

slides.push(slide('CO DALEJ', `
  <div class="cols">
    <div class="bul"><h3>1. Wybór kierunku</h3><p>Proszę wskazać 1–2 warianty, które są najbliżej. Można też łączyć: ikona z jednego, napis z drugiego.</p></div>
    <div class="bul"><h3>2. Dopracowanie</h3><p>Wybrany znak rysuję do końca: proporcje, odstępy, wersja pozioma i pionowa, wersja jednokolorowa, pliki SVG / PNG / PDF.</p></div>
    <div class="bul"><h3>3. Wdrożenie na stronie</h3><p>Do tego czasu strona pokazuje tymczasowe „test logo” (wariant 02). Po decyzji podmieniam je w jednym miejscu — w nagłówku, stopce, favikonie i grafice do udostępnień.</p></div>
  </div>
  <i class="hl hl-mid"></i><div class="giant">DALEJ</div>`))

// ---------- CSS ----------
const face = (family, file, weight = '100 900', style = 'normal', extra = '') =>
  `@font-face{font-family:'${family}';src:url(fonts/${file}) format('woff2');font-weight:${weight};font-style:${style};${extra}}`
const css = `
${face('Archivo', 'archivo-latin-wdth-normal.woff2', '100 900', 'normal', 'font-stretch:62% 125%;unicode-range:U+0000-00FF,U+2013-2014,U+201C-201E;')}
${face('Archivo', 'archivo-latin-ext-wdth-normal.woff2', '100 900', 'normal', 'font-stretch:62% 125%;unicode-range:U+0100-024F;')}
${face('Montserrat', 'montserrat-latin-wght-normal.woff2', '100 900', 'normal', 'unicode-range:U+0000-00FF,U+2013-2014,U+201C-201E;')}
${face('Montserrat', 'montserrat-latin-ext-wght-normal.woff2', '100 900', 'normal', 'unicode-range:U+0100-024F;')}
${face('Instrument Sans', 'instrument-sans-latin-wdth-normal.woff2', '400 700', 'normal', 'font-stretch:75% 100%;')}
${face('Outfit', 'outfit-latin-wght-normal.woff2')}
${face('Sora', 'sora-latin-wght-normal.woff2', '100 800')}
${face('Manrope', 'manrope-latin-wght-normal.woff2', '200 800')}
${face('Fraunces', 'fraunces-latin-full-normal.woff2')}
${face('Cormorant Garamond', 'cormorant-garamond-latin-500-italic.woff2', '500', 'italic')}
${face('Cormorant Garamond', 'cormorant-garamond-latin-500-normal.woff2', '500', 'normal')}
${face('DM Serif Display', 'dm-serif-display-latin-400-normal.woff2', '400')}
@page{size:1440px 810px;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#888;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Montserrat',sans-serif;color:#3B3B3B}
.slide{width:1440px;height:810px;position:relative;background:${PAPER};overflow:hidden;break-after:page}
.top{position:absolute;left:81px;top:47px;font-size:21px;letter-spacing:.01em;text-transform:uppercase}
.hl{position:absolute;left:0;right:0;height:1.5px;background:#3B3B3B}
.hl-top{top:100px}.hl-bot{top:719px}.hl-mid{top:396px;left:-81px;right:-81px}
.is-cover .hl-top{top:116px}
.vl{position:absolute;top:720px;bottom:0;width:1.5px;background:#3B3B3B}.vl-l{left:81px}.vl-r{left:1357px}
.star{position:absolute;left:22px;top:744px;height:44px}
.foot{position:absolute;left:112px;top:748px;font-size:14.5px;line-height:1.45;text-transform:uppercase}.foot b{display:block;font-weight:700}
.body{position:absolute;left:81px;right:81px;top:101px;height:618px}
h1.cover{font-family:'Archivo';font-stretch:125%;font-weight:700;font-size:88px;line-height:1.24;margin-top:140px;letter-spacing:.005em}
.giant{position:absolute;left:-4px;top:436px;font-family:'Archivo';font-stretch:125%;font-weight:400;font-size:118px;letter-spacing:-.01em}
.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:44px;padding-top:36px}
.cols.c2{grid-template-columns:1.15fr 1fr;gap:64px}
.bul h3,.txt h3{font-weight:700;font-size:22px;line-height:1.15;margin-bottom:12px}
.bul p,.txt p{font-size:15.5px;line-height:1.5;text-align:left}
.bul p+p{margin-top:10px}
.sws{display:grid;gap:9px}
.sw{display:grid;grid-template-columns:58px 96px 1fr;align-items:center;gap:16px;font-size:14.5px}
.sw i{height:48px;border-radius:4px}.sw b{font-weight:600}
.sw.pick b,.sw.pick span{font-weight:700;color:${ROSE}}

.on-white{background:#fff;--k:#fff;color:${ROSE}}
.on-rose{background:${ROSE};--k:${ROSE};color:#fff}
.on-tint{background:${TINT};--k:${TINT};color:${ROSE}}
.on-paper{--k:${PAPER};color:${ROSE}}
.on-white .t,.on-white .s{color:${INK}}
.on-rose .ic [opacity]{opacity:.62}

.var{display:grid;grid-template-columns:770px 1fr;gap:20px;padding-top:26px;height:596px}
.p-main{display:grid;place-items:center;border-radius:6px;height:570px}
.p-side{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:214px 104px 1fr;gap:14px;height:570px}
.tile{display:grid;place-items:center;border-radius:6px;overflow:hidden}
.tile.wide{grid-column:1/3;display:flex;align-items:center;justify-content:center;gap:22px}
.tile.wide .lk{margin-left:18px}
.ic{width:1em;height:1em;flex:none;display:block}
.ic.solo{width:120px;height:120px}.px16{width:16px;height:16px}.px24{width:24px;height:24px}.px40{width:40px;height:40px}
.txt{grid-column:1/3;padding-top:8px}
.txt h3{font-family:'Archivo';font-stretch:125%;font-size:23px}
.txt p{font-size:14.5px}
.txt small{display:block;margin-top:10px;font-size:12px;letter-spacing:.04em;text-transform:uppercase;opacity:.7}

.grid{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:1fr 1fr;gap:14px;padding:26px 0;height:618px}
.cell{position:relative;display:grid;place-items:center;border-radius:6px}
.cell em{position:absolute;left:14px;top:12px;font-style:normal;font-size:12px;font-weight:600;color:#3B3B3B;opacity:.6}
.avs{display:grid;grid-template-columns:repeat(10,1fr);gap:10px;padding-top:112px}
.av{display:grid;justify-items:center;gap:30px}
.av .c{width:112px;height:112px;border-radius:50%;display:grid;place-items:center}
.av .c .ic{width:58px;height:58px}
.av .c.on-rose .ic,.av .c.on-white .ic{width:60px;height:60px}
.av .r{display:flex;gap:14px;align-items:center;height:30px}
.av span{font-size:11.5px;font-weight:600;text-align:center;line-height:1.3;text-transform:uppercase;letter-spacing:.02em}

/* lockupy: wszystko w em, żeby skalowały się jednym font-size */
.lk{display:flex;align-items:center;line-height:1;white-space:nowrap}
.lk .t{display:block}
.lk-roza{gap:.26em}.lk-roza .ic{font-size:1.7em}
.lk-roza .t{font-family:'Instrument Sans';font-weight:600;letter-spacing:-.025em}
.lk-litera .t{font-family:'Instrument Sans';font-stretch:75%;font-weight:500;letter-spacing:-.01em;display:flex;align-items:center}
.lk-litera .ic{font-size:.8em;margin:0 .005em 0 .02em;color:${ROSE}}
.on-rose .lk-litera .ic{color:#fff}
.lk-kontur{flex-direction:column;gap:.1em}.lk-kontur .ic{font-size:1.9em}
.lk-kontur .t{font-family:'Cormorant Garamond';font-style:italic;font-weight:500;font-size:1.3em;letter-spacing:-.005em}
.lk-kontur .s,.lk-pieczec .s{font-family:'Montserrat';font-weight:500;font-size:.2em;letter-spacing:.46em;margin:.9em -.46em 0 0}
.lk-kolce{gap:.02em}.lk-kolce .ic{font-size:2.5em;margin-left:-.5em}
.lk-kolce .t{font-family:'Archivo';font-stretch:125%;font-weight:700;line-height:.95;letter-spacing:.01em}
.lk-objecie{gap:.24em}.lk-objecie .ic{font-size:1.6em}
.lk-objecie .t{font-family:'Fraunces';font-weight:400;font-variation-settings:'SOFT' 100,'opsz' 144;letter-spacing:-.02em}
.lk-pieczec{flex-direction:column;gap:.34em}.lk-pieczec .ic{font-size:2.3em}
.lk-pieczec .t{font-family:'Montserrat';font-weight:500;font-size:.52em;letter-spacing:.44em;margin-right:-.44em}
.lk-dwie{gap:.2em}.lk-dwie .ic{font-size:1.9em}
.lk-dwie .t{font-family:'Manrope';font-weight:800;letter-spacing:-.035em}
.lk-linia{gap:.02em}.lk-linia .ic{font-size:2em;margin-left:-.3em}
.lk-linia .t{font-family:'DM Serif Display';letter-spacing:-.005em}
.lk-pak{gap:.14em}.lk-pak .ic{font-size:1.9em;margin-left:-.25em}
.lk-pak .t{font-family:'Outfit';font-weight:300;letter-spacing:-.015em;padding-bottom:.08em}
.lk-znak{gap:.26em}.lk-znak .ic{font-size:1.4em}
.lk-znak .t{font-family:'Sora';font-weight:600;letter-spacing:-.045em;padding-bottom:.06em}
`

const html = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Wild Roses — propozycje logo</title><style>${css}</style></head><body>${slides.join('')}</body></html>`
fs.writeFileSync(path.join(dir, 'deck.html'), html)

for (const old of fs.readdirSync(path.join(dir, 'icons'))) fs.rmSync(path.join(dir, 'icons', old))
for (const v of V) fs.writeFileSync(path.join(dir, 'icons', `${v.id}.svg`), svg(v.id))

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })
const page = await browser.newPage()
await page.goto('file://' + path.join(dir, 'deck.html'), { waitUntil: 'networkidle0' })
await page.evaluate(() => document.fonts.ready)
const out = path.join(dir, 'Wild-Roses-Logo-Propozycje.pdf')
await page.pdf({ path: out, width: '1440px', height: '810px', printBackground: true, preferCSSPageSize: true })
await browser.close()
console.log(`brand: ${slides.length} slajdów → ${path.relative(process.cwd(), out)}`)
