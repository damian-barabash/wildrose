import { type CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hotlines, Img, PillLink } from '../components/Bits'
import { Arrow } from '../components/Icons'
import { LOGO_LINE_Y, Logo } from '../components/Logo'
import { audiences, heroMessages, mainHotline, pillars, programs, site, spending, steps, telHref } from '../content/site'

const i = (n: number) => ({ '--i': n }) as CSSProperties

function Messages() {
  const [n, setN] = useState(0)
  const go = (d: number) => setN((v) => (v + d + heroMessages.length) % heroMessages.length)
  const m = heroMessages[n]
  return (
    <div className="msg">
      <p className="lbl">Dla Ciebie</p>
      <div className="msg__body" key={n} aria-live="polite">
        <h2 className="h2">{m.title}</h2>
        <p>{m.text}</p>
      </div>
      <div className="msg__nav">
        <button type="button" className="rnd" onClick={() => go(-1)} aria-label="Poprzednia informacja"><Arrow dir="left" /></button>
        <span className="msg__n">{n + 1} / {heroMessages.length}</span>
        <button type="button" className="rnd" onClick={() => go(1)} aria-label="Następna informacja"><Arrow /></button>
      </div>
    </div>
  )
}

export function Home() {
  return (
    <>
      <section className="wrap hero">
        <p className="hero__urgent" data-rv>
          <span>Zagrożenie życia: <a href="tel:112">112</a></span>
          <span>{mainHotline.label}: <a href={telHref(mainHotline.tel)}>{mainHotline.tel}</a>, bezpłatnie, całą dobę</span>
        </p>
        <div className="hero__logo" data-rv style={{ ...i(1), '--ly': LOGO_LINE_Y } as CSSProperties}>
          <i />
          <Logo shade />
          <i />
        </div>
        <h1 className="hero__h" data-rv style={i(2)}>{site.tagline}</h1>
        <p className="hero__sub" data-rv style={i(3)}>{site.motto}</p>
        <ul className="hero__pillars" data-rv style={i(3)} aria-label="Filary fundacji">
          {pillars.map((p) => (
            <li key={p.id}>
              <a href="#filary">{p.name}</a>
            </li>
          ))}
        </ul>
        <div className="hero__tiles">
          <div data-rv style={i(3)}><Img name="roses-white" className="img--sq" eager /></div>
          <div data-rv style={i(4)}><Messages /></div>
        </div>
      </section>

      <section className="wrap sec sec--center" id="cel">
        <p className="lbl" data-rv>Kim jesteśmy</p>
        <p className="statement" data-rv style={i(1)}>
          Wspieramy <em>rozwój intelektualny i osobowy</em> Kobiet — od uważności na siebie do <em>niezależności</em>
        </p>
        <p className="sec__note sec__note--c" data-rv style={i(2)}>
          {site.mission} Dzika róża rośnie sama, w trudnych miejscach — i mimo to kwitnie.
        </p>
        <div className="trio">
          {[
            { to: '/pomoc', img: 'peony-hands', label: 'Szukam wsparcia' },
            { to: '/wspolpraca', img: 'blossom', label: 'Chcę wspierać' },
            { to: '/o-fundacji', img: 'mother-child', label: 'Poznaj fundację' },
          ].map((t, n) => (
            <Link key={t.to} to={t.to} className="trio__it" data-rv style={i(n)}>
              <Img name={t.img} />
              <span className="pill pill--rose"><span>{t.label}</span><i><Arrow dir="up-right" /></i></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap sec" id="filary">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Edukacja, rozwój, wsparcie, uważność</h2>
          <p className="sec__note" data-rv style={i(1)}>Cztery filary, jeden cel: Kobieta, która stoi na własnych nogach — psychicznie i finansowo.</p>
        </div>
        <Pillars />
      </section>

      <section className="wrap sec" id="dla-kogo">
        <div className="sec__head">
          <h2 className="h2" data-rv>Dla kogo jest Fundacja Wild Roses</h2>
          <p className="sec__note" data-rv style={i(1)}>Mówimy do Kobiet na różnych etapach — od kryzysu po budowanie własnej marki — i do miejsc, w których przemoc trzeba zatrzymać.</p>
        </div>
        <Audiences />
      </section>

      <section className="wrap sec" id="programy">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Programy wsparcia i rozwoju Kobiet</h2>
          <p className="sec__note" data-rv style={i(1)}>Tu cztery filary zamieniają się w konkretne działania.</p>
        </div>
        <ul className="progs">
          {programs.map((p) => (
            <li key={p.id} className="prog" data-rv>
              <Img name={p.img} />
              <div className="prog__txt">
                <p className="lbl lbl--rose">{p.pillar}</p>
                <h3 className="h3">{p.name}</h3>
                <p>{p.text}</p>
                <Link to={p.to} className="rnd rnd--wide" aria-label={`${p.name} — więcej`}><Arrow /></Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap sec" id="teraz">
        <div className="sec__head">
          <h2 className="h2" data-rv>Pomoc w kryzysie: bezpłatne numery</h2>
          <p className="sec__note" data-rv style={i(1)}>Jeśli doświadczasz przemocy, te numery działają w całej Polsce. Rozmowa jest bezpłatna i do niczego nie zobowiązuje.</p>
        </div>
        <Hotlines limit={3} />
        <div className="sec__cta" data-rv>
          <PillLink to="/pomoc#formularz" kind="line">Wolę napisać</PillLink>
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h2" data-rv>Jak zacząć: trzy kroki</h2>
        </div>
        <ol className="steps">
          {steps.map((s, n) => (
            <li key={s.name} data-rv style={i(n)}>
              <span className="steps__n">{n + 1}</span>
              <h3 className="h3">{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap sec">
        <div className="open">
          <div className="open__txt">
            <p className="lbl" data-rv>Przejrzystość</p>
            <h2 className="h2" data-rv style={i(1)}>Jawne finanse fundacji</h2>
            <p data-rv style={i(2)}>Pokazujemy, skąd mamy pieniądze i na co je wydajemy. Bez drobnego druku.</p>
            <div data-rv style={i(3)}><PillLink to="/przejrzystosc" kind="line">Zobacz, jak działamy</PillLink></div>
          </div>
          <ul className="bars" aria-label="Podział wydatków — dane przykładowe">
            {spending.map((s, n) => (
              <li key={s.label} data-rv style={i(n)}>
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
        <div className="cta" data-rv>
          <p className="lbl">Dla darczyńców, firm i partnerów</p>
          <h2 className="h1">Wzmocnij społeczność Wild Roses</h2>
          <p>Darowizna, partnerstwo, warsztat w Twojej firmie albo godzina Twojej wiedzy jako mentorki. Każda forma wsparcia daje którejś z nas więcej własnej siły.</p>
          <PillLink to="/wspolpraca" kind="white">Chcę wesprzeć fundację</PillLink>
        </div>
      </section>
    </>
  )
}

export function Pillars() {
  return (
    <ul className="pillars">
      {pillars.map((p, n) => (
        <li key={p.id} data-rv style={i(n)}>
          <span className="pillars__n">0{n + 1}</span>
          <h3 className="pillars__name">{p.name}</h3>
          <p className="pillars__title">{p.title}</p>
          <p>{p.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function Audiences() {
  return (
    <ul className="aud">
      {audiences.map((a, n) => (
        <li key={a.name} data-rv style={i(n)}>
          <h3 className="h3">{a.name}</h3>
          <p>{a.text}</p>
        </li>
      ))}
    </ul>
  )
}
