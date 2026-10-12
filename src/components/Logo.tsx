import { useId } from 'react'
import { LOGO_MARK, LOGO_SCALE, LOGO_SUB, LOGO_WORD } from '../lib/logo'

// Logo klienta, wektor z brand/klient/wild-roses-logo.png (npm run logo → src/lib/logo.ts).
//   full — cały znak: róże, napis, „FUNDACJA” (hero)
//   row  — róże obok napisu (nagłówek)
//   word — sam napis (stopka)
//   mark — same róże (okno, drobne akcenty)
// `shade` włącza przejście tonalne z oryginału; bez niego logo ma jeden kolor (currentColor).
type Part = typeof LOGO_MARK
type Variant = 'full' | 'row' | 'word' | 'mark'

const ROW_MARK = 300 / LOGO_MARK.h // wysokość róż w układzie poziomym
const ROW_GAP = 56

function Piece({ part, x, y, k = 1, fill }: { part: Part; x: number; y: number; k?: number; fill: string }) {
  return <path fill={fill} transform={`translate(${x} ${y + part.h * k}) scale(${LOGO_SCALE * k} ${-LOGO_SCALE * k})`} d={part.d} />
}

export function Logo({ variant = 'full', shade = false, className = '' }: { variant?: Variant; shade?: boolean; className?: string }) {
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
        <Piece part={LOGO_MARK} x={0} y={0} k={ROW_MARK} fill={g('m')} />
        <Piece part={LOGO_WORD} x={mw + ROW_GAP} y={(300 - LOGO_WORD.h) / 2 + 8} fill={g('w')} />
      </>
    )
  } else {
    const part = variant === 'word' ? LOGO_WORD : LOGO_MARK
    box = [0, 0, part.w, part.h]
    body = <Piece part={part} x={0} y={0} fill={g(variant === 'word' ? 'w' : 'm')} />
  }

  return (
    <svg className={`logo logo--${variant} ${className}`} viewBox={box.join(' ')} role="img" aria-label="Fundacja Wild Roses">
      {shade && (
        <defs>
          <linearGradient id={`${id}m`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#e0245f" />
            <stop offset="0.55" stopColor="#c00642" />
            <stop offset="1" stopColor="#b0033b" />
          </linearGradient>
          <linearGradient id={`${id}w`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#d2064a" />
            <stop offset="0.45" stopColor="#c00340" />
            <stop offset="1" stopColor="#7d0123" />
          </linearGradient>
          <linearGradient id={`${id}s`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#c00340" />
            <stop offset="1" stopColor="#8f012b" />
          </linearGradient>
        </defs>
      )}
      {body}
    </svg>
  )
}
