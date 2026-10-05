import type { CSSProperties } from 'react'
import { Img, PageHead, PillLink } from '../components/Bits'
import { principles, site, statuteGoals } from '../content/site'

export function Registry() {
  const v = (s: string) => s || 'do uzupełnienia'
  const rows = [
    ['Pełna nazwa', site.legalName],
    ['KRS', v(site.krs)],
    ['NIP', v(site.nip)],
    ['REGON', v(site.regon)],
    ['Adres', v(site.address)],
    ['E-mail', v(site.email)],
  ]
  return (
    <dl className="facts facts--grid" data-rv>
      {rows.map(([k, val]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{val}</dd>
        </div>
      ))}
    </dl>
  )
}

export function About() {
  return (
    <>
      <PageHead kicker="O fundacji" title="Delikatna i silna jednocześnie" lead="Dzika róża rośnie sama, w trudnych miejscach, i potrafi się obronić. Tak widzimy osoby, którym pomagamy." />

      <section className="wrap sec sec--tight">
        <div className="open">
          <div data-rv><Img name="mother-child" /></div>
          <div className="open__txt">
            <p className="lbl" data-rv>Misja</p>
            <h2 className="h2" data-rv>Od bezpieczeństwa do niezależności</h2>
            <p data-rv>Wyjście z przemocy to dopiero początek. Żeby nie trzeba było wracać, potrzebne są jeszcze praca, własne pieniądze, znajomość swoich praw i ludzie obok.</p>
            <p data-rv>Dlatego łączymy pomoc w kryzysie z powrotem na rynek pracy, wspieraniem przedsiębiorczości kobiet i pilnowaniem, żeby prawo działało także dla osób wykluczonych.</p>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Zasady, których się trzymamy</h2>
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

      <section className="wrap sec" id="cele">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Cele statutowe</h2>
          <p className="sec__note" data-rv>Pełna lista z § 2 statutu fundacji, ułożona w pięć obszarów.</p>
        </div>
        <div className="faq">
          {statuteGoals.map((g, n) => (
            <details key={g.area} open={n === 0} data-rv>
              <summary>{g.area}<span>{g.goals.length}</span></summary>
              <ul>
                {g.goals.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Dane fundacji</h2>
        </div>
        <Registry />
        <div className="sec__cta" data-rv><PillLink to="/przejrzystosc" kind="line">Finanse i dokumenty</PillLink></div>
      </section>
    </>
  )
}
