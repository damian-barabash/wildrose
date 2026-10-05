import { type FormEvent, useEffect, useRef, useState } from 'react'
import { hotlines, mainHotline, telHref } from '../content/site'
import { quickExit } from '../lib/exit'
import { submitForm } from '../lib/forms'
import { lockScroll } from '../lib/motion'
import { Arrow, Close, Phone } from './Icons'

// Okno pilnej pomocy. Pokazuje się przy KAŻDYM wejściu na stronę — niczego nie zapamiętujemy
// na urządzeniu (żadnych cookies ani localStorage), więc nie zostaje po nim ślad.
// Otworzyć je ponownie można zdarzeniem `wr:sos` (przycisk „Pilna pomoc”).
const PRESETS = ['Nie mogę rozmawiać', 'Boję się o swoje bezpieczeństwo', 'Proszę o kontakt']

type Step = 'start' | 'signal' | 'sending' | 'sent' | 'demo' | 'error'

export const openSos = () => window.dispatchEvent(new Event('wr:sos'))

export function Sos() {
  const [open, setOpen] = useState(true)
  const [step, setStep] = useState<Step>('start')
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const show = () => {
      setStep('start')
      setOpen(true)
    }
    window.addEventListener('wr:sos', show)
    return () => window.removeEventListener('wr:sos', show)
  }, [])

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    card.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key !== 'Tab' || !card.current) return
      const items = card.current.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === card.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  useEffect(() => card.current?.focus(), [step])

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setStep('sending')
    const res = await submitForm('help_requests', {
      name: 'Cichy sygnał',
      topic: 'Cichy sygnał',
      message: fd.get('preset'),
      contact: fd.get('contact') || '',
    })
    setStep(!res.ok ? 'error' : res.demo ? 'demo' : 'sent')
  }

  if (!open) return null
  const done = step === 'sent' || step === 'demo'

  return (
    <div className="sos" data-lenis-prevent onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="sos__card" role="dialog" aria-modal="true" aria-labelledby="sos-h" tabIndex={-1} ref={card}>
        {step === 'start' && (
          <>
            <h2 className="h2" id="sos-h">Potrzebujesz pomocy teraz?</h2>
            <p className="sos__lead">Wybierz najszybszy sposób. Jeśli jesteś tu w innej sprawie, po prostu przejdź do strony.</p>
            <div className="sos__acts">
              <a className="sos__btn sos__btn--rose" href={telHref(hotlines[0].tel)}>
                <i><Phone /></i>
                <span><b>Zadzwoń {hotlines[0].tel}</b>Zagrożenie życia lub zdrowia</span>
              </a>
              <a className="sos__btn" href={telHref(mainHotline.tel)}>
                <i><Phone /></i>
                <span><b>{mainHotline.tel}</b>{mainHotline.label}. Bezpłatnie, całą dobę</span>
              </a>
              <button type="button" className="sos__btn" onClick={() => setStep('signal')}>
                <i><Arrow /></i>
                <span><b>Wyślij cichy sygnał</b>Bez dzwonienia i bez podawania nazwiska</span>
              </button>
            </div>
          </>
        )}

        {(step === 'signal' || step === 'sending' || step === 'error') && (
          <form onSubmit={send} className="sos__form">
            <h2 className="h2" id="sos-h">Cichy sygnał do fundacji</h2>
            <fieldset>
              <legend className="sr">Co chcesz nam przekazać?</legend>
              <div className="chips">
                {PRESETS.map((p, n) => (
                  <label key={p} className="chip">
                    <input type="radio" name="preset" value={p} defaultChecked={n === 0} />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="fld">
              <label htmlFor="sos-contact">Jak możemy bezpiecznie odpowiedzieć?</label>
              <input id="sos-contact" name="contact" autoComplete="off" placeholder="Numer telefonu lub e-mail — jeśli możesz" />
              <small>Bez kontaktu nie będziemy mogli odpowiedzieć. Podaj tylko taki, do którego nikt poza Tobą nie ma dostępu.</small>
            </div>
            <p className="sos__warn">Fundacja nie jest służbą ratunkową. Gdy coś Ci grozi, dzwoń <a href="tel:112">112</a>.</p>
            {step === 'error' && (
              <p className="ferr" role="alert">Nie udało się wysłać sygnału. Spróbuj ponownie albo zadzwoń: <a href={telHref(mainHotline.tel)}>{mainHotline.tel}</a>.</p>
            )}
            <button type="submit" className="pill pill--rose pill--lg" disabled={step === 'sending'}>
              <span>{step === 'sending' ? 'Wysyłamy…' : 'Wyślij sygnał'}</span>
              <i><Arrow /></i>
            </button>
          </form>
        )}

        {done && (
          <div className="sos__form" role="status">
            {step === 'sent' ? (
              <>
                <h2 className="h2" id="sos-h">Sygnał wysłany</h2>
                <p className="sos__lead">Odezwiemy się, jeśli został podany kontakt. Jeśli sytuacja się pogorszy, nie czekaj na nas — dzwoń 112.</p>
              </>
            ) : (
              <>
                <h2 className="h2" id="sos-h">Tryb testowy</h2>
                <p className="sos__lead">
                  Sygnał <b>nie został wysłany</b> — strona jest jeszcze w przygotowaniu. Jeśli potrzebujesz pomocy teraz, zadzwoń:{' '}
                  <a href={telHref(mainHotline.tel)}>{mainHotline.tel}</a> ({mainHotline.label}).
                </p>
              </>
            )}
          </div>
        )}

        <div className="sos__foot">
          {step === 'start' || done ? (
            <button type="button" className="pill pill--line sos__enter" onClick={() => setOpen(false)}>
              <span>{done ? 'Zostań na stronie' : 'Przejdź do strony'}</span>
            </button>
          ) : (
            <button type="button" className="pill pill--line" onClick={() => setStep('start')}>
              <span>Wróć</span>
            </button>
          )}
          <button type="button" className="pill pill--line" onClick={quickExit}>
            <span>Szybkie wyjście</span>
            <i><Close /></i>
          </button>
        </div>
        <p className="sos__note">Ta strona niczego nie zapisuje na Twoim urządzeniu, ale zostaje w historii przeglądarki. Po wizycie usuń ją z historii.</p>
      </div>
    </div>
  )
}
