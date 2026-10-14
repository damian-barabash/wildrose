import type { CSSProperties } from 'react'
import { Img, PageHead, PillLink } from '../components/Bits'
import { missionAreas, principles, site, statuteGoals } from '../content/site'
import { Audiences, Pillars } from './Home'

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
      <PageHead kicker="O fundacji" title="Fundacja Wild Roses: społeczność niezależnych Kobiet" lead={site.goal} />

      <section className="wrap sec sec--tight">
        <div className="open">
          <div data-rv><Img name="mother-child" /></div>
          <div className="open__txt">
            <p className="lbl" data-rv>Misja</p>
            <h2 className="h2" data-rv>Zauważyć siebie i zbudować własną siłę</h2>
            <p data-rv>{site.mission} Wierzymy, że bezpieczeństwo psychiczne i finansowe można zbudować na własnej sile — z wiedzą, wsparciem i ludźmi obok.</p>
            <p data-rv>Wspieramy Kobiety w zakresie:</p>
            <ul className="ticks" data-rv>
              {missionAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="filary">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Cztery filary naszej pracy</h2>
          <p className="sec__note" data-rv>Edukacja, rozwój, wsparcie i uważność — tak realizujemy cel fundacji.</p>
        </div>
        <Pillars />
      </section>

      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h2" data-rv>Do kogo kierujemy nasze działania</h2>
        </div>
        <Audiences />
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
          <h2 className="h2" data-rv>Cele statutowe fundacji</h2>
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
          <h2 className="h2" data-rv>Dane Fundacji Wild Roses</h2>
        </div>
        <Registry />
        <div className="sec__cta" data-rv><PillLink to="/przejrzystosc" kind="line">Finanse i dokumenty</PillLink></div>
      </section>
    </>
  )
}
