import { Hotlines, Img, PageHead } from '../components/Bits'
import { HelpForm } from '../components/Forms'
import { faq } from '../content/site'

export function Help() {
  return (
    <>
      <PageHead kicker="Szukam wsparcia" title="Wsparcie dla Kobiet doświadczających przemocy" lead="Jesteś w bezpiecznym miejscu. Możesz zadzwonić albo napisać — nie musisz podawać nazwiska ani opowiadać wszystkiego od razu." />

      <section className="wrap sec sec--tight">
        <div className="sec__head">
          <h2 className="h2" data-rv>Telefony zaufania czynne całą dobę</h2>
          <p className="sec__note" data-rv>Jeśli coś zagraża Tobie lub dzieciom w tej chwili, dzwoń pod 112.</p>
        </div>
        <Hotlines />
      </section>

      <section className="wrap sec">
        <div className="safe" data-rv>
          <div>
            <p className="lbl">Twoje bezpieczeństwo na tej stronie</p>
            <h2 className="h2">Ktoś może sprawdzać Twój telefon lub komputer?</h2>
          </div>
          <ul className="safe__list">
            <li><b>Tryb prywatny.</b> Otwieraj tę stronę w oknie incognito — nie zapisze się w historii.</li>
            <li><b>Historia.</b> Po wizycie usuń stronę z historii przeglądarki i z listy otwartych kart.</li>
            <li><b>Bezpieczny kontakt.</b> Podaj numer lub e-mail, do którego nikt poza Tobą nie ma dostępu.</li>
          </ul>
        </div>
      </section>

      <section className="wrap sec" id="formularz">
        <div className="split">
          <div className="split__side">
            <h2 className="h2" data-rv>Napisz do fundacji — poufnie</h2>
            <p data-rv>Odezwiemy się w sposób i o porze, które wskażesz. Wiadomość czyta wyłącznie zespół fundacji.</p>
            <div data-rv><Img name="window" className="img--tall" /></div>
          </div>
          <div data-rv><HelpForm /></div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Pytania o pomoc i poufność</h2>
        </div>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q} data-rv>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
