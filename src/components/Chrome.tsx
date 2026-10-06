import { Link } from 'react-router-dom'
import { DRAFT, mainHotline, telHref } from '../content/site'
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
