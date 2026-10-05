import type { CSSProperties } from 'react'
import { Img, PageHead, PillLink } from '../components/Bits'
import { PartnerForm } from '../components/Forms'
import { site, supportWays } from '../content/site'

export function Support() {
  return (
    <>
      <PageHead
        kicker="Dla darczyńców, firm i inwestorów"
        title="Twoje wsparcie zamienia się w czyjś nowy początek"
        lead="Możesz pomóc pieniędzmi, miejscem pracy albo wiedzą. Pokażemy dokładnie, co z tym zrobiliśmy."
      />

      <section className="wrap sec sec--tight">
        <ul className="ways">
          {supportWays.map((w, n) => (
            <li key={w.id} data-rv style={{ '--i': n } as CSSProperties}>
              <h2 className="h3">{w.name}</h2>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap sec">
        <div className="open">
          <div className="open__txt">
            <p className="lbl" data-rv>Co dostajesz w zamian</p>
            <h2 className="h2" data-rv>Jasny cel, budżet i raport</h2>
            <p data-rv>Przed startem ustalamy, co finansujesz. Po zakończeniu dostajesz raport: ile osób skorzystało, co się udało, a co nie. Dane osób, którym pomagamy, zawsze pozostają poufne.</p>
            <div data-rv><PillLink to="/przejrzystosc" kind="line">Zasady przejrzystości</PillLink></div>
          </div>
          <div data-rv><Img name="meeting" /></div>
        </div>
      </section>

      <section className="wrap sec" id="formularz">
        <div className="split">
          <div className="split__side">
            <h2 className="h2" data-rv>Porozmawiajmy</h2>
            <p data-rv>Wypełnij formularz, a odezwiemy się, żeby ustalić szczegóły.</p>
            <dl className="facts" data-rv>
              <dt>Numer konta do darowizn</dt>
              <dd>{site.account || 'do uzupełnienia'}</dd>
              <dt>Tytuł przelewu</dt>
              <dd>Darowizna na cele statutowe</dd>
            </dl>
          </div>
          <div data-rv><PartnerForm /></div>
        </div>
      </section>
    </>
  )
}
