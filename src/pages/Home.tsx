import { type CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hotlines, Img, PillLink } from '../components/Bits'
import { Arrow } from '../components/Icons'
import { Logo } from '../components/Logo'
import { heroMessages, mainHotline, programs, site, spending, steps, telHref } from '../content/site'

const i = (n: number) => ({ '--i': n }) as CSSProperties

function Messages() {
  const [n, setN] = useState(0)
  const go = (d: number) => setN((v) => (v + d + heroMessages.length) % heroMessages.length)
  const m = heroMessages[n]
  return (
    <div className="msg">
      <p className="lbl">Zanim zadzwonisz</p>
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
        <div className="hero__logo" data-rv style={i(1)}>
          <i />
          <Logo />
          <i />
        </div>
        <h1 className="hero__h" data-rv style={i(2)}>{site.tagline}</h1>
        <p className="hero__sub" data-rv style={i(3)}>Bezpłatnie. Poufnie. W Twoim tempie.</p>
        <div className="hero__tiles">
          <div data-rv style={i(3)}><Img name="roses-white" className="img--sq" eager /></div>
          <div data-rv style={i(4)}><Messages /></div>
        </div>
      </section>

      <section className="wrap sec" id="teraz">
        <div className="sec__head">
          <h2 className="h2" data-rv>Potrzebujesz pomocy teraz?</h2>
          <p className="sec__note" data-rv style={i(1)}>Te numery działają w całej Polsce. Rozmowa jest bezpłatna i nie zobowiązuje do niczego.</p>
        </div>
        <Hotlines limit={3} />
        <div className="sec__cta" data-rv>
          <PillLink to="/pomoc#formularz" kind="line">Wolę napisać</PillLink>
        </div>
      </section>

      <section className="wrap sec sec--center">
        <p className="lbl" data-rv>O fundacji Wild Roses</p>
        <p className="statement" data-rv style={i(1)}>
          Pomagamy <em>wyjść z przemocy</em>, odzyskać głos i <em>wrócić</em> do samodzielnego życia
        </p>
        <p className="sec__note sec__note--c" data-rv style={i(2)}>
          Dzika róża rośnie tam, gdzie nikt o nią nie dba — i mimo to kwitnie. Jesteśmy po to, żeby było jej łatwiej.
        </p>
        <div className="trio">
          {[
            { to: '/pomoc', img: 'peony-hands', label: 'Szukam pomocy' },
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

      <section className="wrap sec" id="co-robimy">
        <div className="sec__head sec__head--line">
          <h2 className="h2" data-rv>Co robimy</h2>
          <p className="sec__note" data-rv style={i(1)}>Pięć obszarów, jeden cel: żeby osoba po kryzysie mogła stanąć na własnych nogach.</p>
        </div>
        <ul className="progs">
          {programs.map((p) => (
            <li key={p.id} className="prog" data-rv>
              <Img name={p.img} />
              <div className="prog__txt">
                <p className="lbl">{p.kind}</p>
                <h3 className="h3">{p.name}</h3>
                <p>{p.text}</p>
                <Link to={p.id === 'bezpieczenstwo' ? '/pomoc' : '/o-fundacji#cele'} className="rnd rnd--wide" aria-label={`${p.name} — więcej`}><Arrow /></Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h2" data-rv>Jak wygląda pomoc</h2>
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
            <h2 className="h2" data-rv style={i(1)}>Każda złotówka ma adres</h2>
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
          <p className="lbl">Dla darczyńców, firm i inwestorów</p>
          <h2 className="h1">Pomóż komuś zacząć od nowa</h2>
          <p>Darowizna, staż w Twojej firmie, godzina Twojej wiedzy. Każda forma wsparcia zamienia się w czyjś konkretny krok.</p>
          <PillLink to="/wspolpraca" kind="white">Chcę wesprzeć fundację</PillLink>
        </div>
      </section>
    </>
  )
}
