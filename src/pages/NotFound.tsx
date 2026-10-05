import { PageHead, PillLink } from '../components/Bits'

export function NotFound() {
  return (
    <>
      <PageHead kicker="Błąd 404" title="Tej strony nie ma" lead="Adres mógł się zmienić. Wróć na stronę główną albo przejdź od razu do pomocy." />
      <section className="wrap sec sec--tight">
        <div className="sec__cta sec__cta--row">
          <PillLink to="/pomoc">Szukam pomocy</PillLink>
          <PillLink to="/" kind="line">Strona główna</PillLink>
        </div>
      </section>
    </>
  )
}
