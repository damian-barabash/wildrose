import { PageHead, PillLink } from '../components/Bits'
import { NewsletterForm } from '../components/Newsletter'
import { mainHotline, newsletter, site, telHref } from '../content/site'

const todo = 'do uzupełnienia'

export function Contact() {
  return (
    <>
      <PageHead kicker="Kontakt" title="Napisz albo zadzwoń" lead="Wybierz drogę, która pasuje do Twojej sprawy. Odpowiadamy w dni robocze." />

      <section className="wrap sec sec--tight">
        <ul className="ways">
          <li data-rv>
            <h2 className="h3">Szukam pomocy</h2>
            <p>Formularz dla osób, które potrzebują wsparcia. Wystarczy imię i bezpieczny sposób kontaktu.</p>
            <PillLink to="/pomoc#formularz" kind="line">Formularz pomocy</PillLink>
          </li>
          <li data-rv>
            <h2 className="h3">Chcę wesprzeć fundację</h2>
            <p>Darowizny, partnerstwa firmowe, inwestycje społeczne i wolontariat.</p>
            <PillLink to="/wspolpraca#formularz" kind="line">Formularz współpracy</PillLink>
          </li>
          <li data-rv>
            <h2 className="h3">Biuro fundacji</h2>
            <p>
              {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : `E-mail: ${todo}`}
              <br />
              {site.phone ? <a href={telHref(site.phone)}>{site.phone}</a> : `Telefon: ${todo}`}
              <br />
              {site.address || `Adres: ${todo}`}
            </p>
          </li>
          <li data-rv>
            <h2 className="h3">Pilna sprawa</h2>
            <p>
              Zagrożenie życia: <a href="tel:112">112</a>.
              <br />
              {mainHotline.label}: <a href={telHref(mainHotline.tel)}>{mainHotline.tel}</a>, bezpłatnie, całą dobę.
            </p>
          </li>
        </ul>
      </section>

      <section className="wrap sec" id="newsletter">
        <div className="split">
          <div className="split__side">
            <h2 className="h2" data-rv>{newsletter.title}</h2>
            <p data-rv>{newsletter.text}</p>
          </div>
          <div className="form" data-rv>
            <NewsletterForm source="kontakt" onTint />
          </div>
        </div>
      </section>
    </>
  )
}
