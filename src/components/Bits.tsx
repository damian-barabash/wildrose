import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { hotlines, telHref } from '../content/site'
import { Arrow } from './Icons'

export function Img({ name, alt = '', className = '', eager = false }: { name: string; alt?: string; className?: string; eager?: boolean }) {
  return (
    <span className={`img ${className}`}>
      <img src={`${import.meta.env.BASE_URL}img/${name}.webp`} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </span>
  )
}

export function PillLink({ to, children, kind = 'rose' }: { to: string; children: ReactNode; kind?: 'rose' | 'line' | 'white' }) {
  return (
    <Link to={to} className={`pill pill--${kind}`}>
      <span>{children}</span>
      <i><Arrow dir="up-right" /></i>
    </Link>
  )
}

export function PageHead({ kicker, title, lead }: { kicker: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="wrap phead">
      <p className="lbl" data-rv>{kicker}</p>
      <h1 className="h1" data-rv style={{ '--i': 1 } as React.CSSProperties}>{title}</h1>
      {lead && <p className="lead" data-rv style={{ '--i': 2 } as React.CSSProperties}>{lead}</p>}
    </section>
  )
}

export function Hotlines({ limit = hotlines.length }: { limit?: number }) {
  return (
    <ul className="tels">
      {hotlines.slice(0, limit).map((h, i) => (
        <li key={h.tel} data-rv style={{ '--i': i } as React.CSSProperties}>
          <a href={telHref(h.tel)} className="tel">
            <span className="tel__num">{h.tel}</span>
            <span className="tel__txt">
              <b>{h.label}</b>
              {h.note}
            </span>
            <i className="tel__go"><Arrow dir="up-right" /></i>
          </a>
        </li>
      ))}
    </ul>
  )
}
