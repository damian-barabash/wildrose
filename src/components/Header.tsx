import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../content/site'
import { quickExit } from '../lib/exit'
import { Arrow, Close } from './Icons'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="hd">
      <div className="wrap hd__in">
        <Link to="/" className="hd__logo" aria-label="Wild Rose — strona główna">
          <Logo />
        </Link>
        <nav className={`hd__nav ${open ? 'is-open' : ''}`} id="menu" aria-label="Główna nawigacja">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className="hd__link">
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hd__act">
          <Link to="/pomoc" className="pill pill--rose hd__cta">
            <span>Potrzebuję pomocy</span>
            <i><Arrow dir="up-right" /></i>
          </Link>
          <button type="button" className="pill pill--line hd__exit" onClick={quickExit} title="Natychmiast zamyka tę stronę i otwiera prognozę pogody">
            <span className="hd__exit-long">Szybkie wyjście</span>
            <span className="hd__exit-short">Wyjście</span>
            <i><Close /></i>
          </button>
          <button type="button" className="hd__burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
            <span className="sr">{open ? 'Zamknij menu' : 'Otwórz menu'}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
