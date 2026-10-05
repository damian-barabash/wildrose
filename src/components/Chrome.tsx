import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DRAFT, mainHotline, telHref } from '../content/site'
import { quickExit } from '../lib/exit'
import { Phone } from './Icons'

export function DraftBar() {
  if (!DRAFT) return null
  return <p className="draft">Wersja robocza. Teksty, liczby i dane fundacji są przykładowe; logo testowe.</p>
}

// Dolny pasek na telefonie: telefon i formularz zawsze pod kciukiem.
export function MobileBar() {
  return (
    <div className="mbar">
      <a className="pill pill--rose" href={telHref(mainHotline.tel)}>
        <i><Phone /></i>
        <span>
          {mainHotline.tel}
          <small>{mainHotline.label}, całą dobę</small>
        </span>
      </a>
      <Link className="pill pill--line" to="/pomoc#formularz">
        <span>Napisz</span>
      </Link>
    </div>
  )
}

// Dwa razy Esc w ciągu sekundy = szybkie wyjście (opisane na stronie „Szukam pomocy”).
export function useEscExit() {
  useEffect(() => {
    let last = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const cl = document.documentElement.classList
      if (cl.contains('menu-open')) return
      const now = Date.now()
      if (now - last < 1000) quickExit()
      last = now
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
