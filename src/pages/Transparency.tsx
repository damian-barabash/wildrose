import type { CSSProperties } from 'react'
import { PageHead, PillLink } from '../components/Bits'
import { documents, principles, spending } from '../content/site'
import { Registry } from './About'

export function Transparency() {
  return (
    <>
      <PageHead kicker="Przejrzystość" title="Każda złotówka ma adres" lead="Zaufanie buduje się faktami. Tu znajdziesz nasze finanse, dokumenty i zasady." />

      <section className="wrap sec sec--tight">
        <div className="open">
          <div className="open__txt">
            <h2 className="h2" data-rv>Na co wydajemy pieniądze</h2>
            <p data-rv>Większość środków trafia bezpośrednio do osób, którym pomagamy. Koszty administracji trzymamy poniżej 10%.</p>
          </div>
          <ul className="bars" aria-label="Podział wydatków — dane przykładowe">
            {spending.map((s, n) => (
              <li key={s.label} data-rv style={{ '--i': n } as CSSProperties}>
                <span>{s.label}</span>
                <b>{s.value}%</b>
                <i style={{ '--w': `${s.value}%` } as CSSProperties} />
              </li>
            ))}
            <li className="bars__note">Dane przykładowe — pierwsze sprawozdanie opublikujemy po zamknięciu roku.</li>
          </ul>
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Dokumenty</h2>
        </div>
        <ul className="docs">
          {documents.map((d) => (
            <li key={d.name} data-rv>
              <span>{d.name}</span>
              <small>{d.status}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap sec">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Nasze zasady</h2>
        </div>
        <ul className="ways">
          {principles.map((p, n) => (
            <li key={p.name} data-rv style={{ '--i': n } as CSSProperties}>
              <h3 className="h3">{p.name}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap sec">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Dane rejestrowe</h2>
        </div>
        <Registry />
        <div className="sec__cta" data-rv><PillLink to="/wspolpraca">Chcę wesprzeć fundację</PillLink></div>
      </section>
    </>
  )
}
