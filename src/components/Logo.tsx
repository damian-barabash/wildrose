import { useId } from 'react'
import { LOGO_MARK, LOGO_SCALE, LOGO_SUB, LOGO_WORD } from '../lib/logo'

// Logo klienta, wektor z brand/klient/wild-roses-logo.png (npm run logo → src/lib/logo.ts).
//   full — cały znak: róże, napis, „FUNDACJA” (hero)
//   row  — róże obok napisu (nagłówek)
//   word — sam napis (stopka)
//   mark — same róże (okno, drobne akcenty)
// `shade` włącza przejście tonalne z oryginału (kolory z palety klienta); bez niego logo ma jeden kolor (currentColor).
// Kreska róż jest cienka — w małych wariantach (row, mark) znak dostaje obrys `thick` (jednostki viewBox), żeby nie znikał.
type Part = typeof LOGO_MARK
type Variant = 'full' | 'row' | 'word' | 'mark'

// środek napisu od góry pełnego logo, w szerokościach logo — na tej wysokości w hero stoją linie
export const LOGO_LINE_Y = (LOGO_WORD.y + LOGO_WORD.h / 2 - LOGO_MARK.y) / LOGO_WORD.w

const ROW_MARK = 300 / LOGO_MARK.h // wysokość róż w układzie poziomym
const ROW_GAP = 56

function Piece({ part, x, y, k = 1, fill, thick = 0 }: { part: Part; x: number; y: number; k?: number; fill: string; thick?: number }) {
  const t = thick ? { stroke: fill, strokeWidth: thick / (LOGO_SCALE * k), strokeLinejoin: 'round' as const } : {}
  return <path fill={fill} {...t} transform={`translate(${x} ${y + part.h * k}) scale(${LOGO_SCALE * k} ${-LOGO_SCALE * k})`} d={part.d} />
}

export function Logo({ variant = 'full', shade = false, thick = 0, className = '' }: { variant?: Variant; shade?: boolean; thick?: number; className?: string }) {
  const id = useId()
  const g = (n: string) => (shade ? `url(#${id}${n})` : 'currentColor')

  let box: [number, number, number, number]
  let body
  if (variant === 'full') {
    box = [LOGO_WORD.x, LOGO_MARK.y, LOGO_WORD.w, LOGO_SUB.y + LOGO_SUB.h - LOGO_MARK.y]
    body = (
      <>
        <Piece part={LOGO_MARK} x={LOGO_MARK.x} y={LOGO_MARK.y} fill={g('m')} />
        <Piece part={LOGO_WORD} x={LOGO_WORD.x} y={LOGO_WORD.y} fill={g('w')} />
        <Piece part={LOGO_SUB} x={LOGO_SUB.x} y={LOGO_SUB.y} fill={g('s')} />
      </>
    )
  } else if (variant === 'row') {
    const mw = LOGO_MARK.w * ROW_MARK
    box = [0, 0, mw + ROW_GAP + LOGO_WORD.w, 300]
    body = (
      <>
        <Piece part={LOGO_MARK} x={0} y={0} k={ROW_MARK} fill={g('m')} thick={thick} />
        <Piece part={LOGO_WORD} x={mw + ROW_GAP} y={(300 - LOGO_WORD.h) / 2 + 8} fill={g('w')} />
      </>
    )
  } else {
    const part = variant === 'word' ? LOGO_WORD : LOGO_MARK
    box = [0, 0, part.w, part.h]
    body = <Piece part={part} x={0} y={0} fill={g(variant === 'word' ? 'w' : 'm')} thick={variant === 'mark' ? thick : 0} />
  }

  return (
    <svg className={`logo logo--${variant} ${className}`} viewBox={box.join(' ')} role="img" aria-label="Fundacja Wild Roses">
      {shade && (
        <defs>
          <linearGradient id={`${id}m`} x1="0" y1="1" x2="0.3" y2="0">
            <stop offset="0" stopColor="#9D0776" />
            <stop offset="0.45" stopColor="#BB018A" />
            <stop offset="0.8" stopColor="#E7199D" />
            <stop offset="1" stopColor="#FE5CB0" />
          </linearGradient>
          <linearGradient id={`${id}w`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#9D0776" />
            <stop offset="0.5" stopColor="#BB018A" />
            <stop offset="1" stopColor="#E7199D" />
          </linearGradient>
          <linearGradient id={`${id}s`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#9D0776" />
            <stop offset="1" stopColor="#BB018A" />
          </linearGradient>
        </defs>
      )}
      {body}
    </svg>
  )
}
