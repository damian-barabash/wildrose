import { Link } from 'react-router-dom'
import { hotlines, nav, site, telHref } from '../content/site'
import { Logo } from './Logo'

const todo = 'do uzupełnienia'

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft__in">
        <div className="ft__col">
          <h2 className="lbl">Pomoc od razu</h2>
          <ul className="ft__tel">
            {hotlines.slice(0, 3).map((h) => (
              <li key={h.tel}>
                <a href={telHref(h.tel)}>{h.tel}</a>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ft__col">
          <h2 className="lbl">Fundacja</h2>
          <p>
            {site.legalName}
            <br />
            {site.address || `Adres: ${todo}`}
            <br />
            {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : `E-mail: ${todo}`}
          </p>
          <p className="ft__reg">
            KRS {site.krs || '—'} · NIP {site.nip || '—'} · REGON {site.regon || '—'}
          </p>
        </div>
        <nav className="ft__nav" aria-label="Stopka">
          {nav.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="ft__big" aria-hidden="true">
        <Logo tag={false} />
      </div>
      <div className="wrap ft__bot">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <span>Zdjęcia tymczasowe: StockSnap (CC0)</span>
      </div>
    </footer>
  )
}
