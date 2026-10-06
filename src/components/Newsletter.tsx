import { type FormEvent, useEffect, useId, useRef, useState } from 'react'
import { newsletter } from '../content/site'
import { submitForm } from '../lib/forms'
import { lockScroll } from '../lib/motion'
import { Arrow, Close, Rose } from './Icons'

type State = 'idle' | 'sending' | 'sent' | 'demo' | 'error'

// Pamiętamy tylko tyle, żeby nie pokazywać okna w kółko: zapis = nigdy więcej, zamknięcie = przerwa 30 dni.
const KEY = 'wr:newsletter'
const PAUSE = 30 * 24 * 3600 * 1000

function seen() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'done' || (v !== null && Date.now() - Number(v) < PAUSE)
  } catch {
    return false
  }
}
function remember(v: string) {
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* tryb prywatny — okno pokaże się ponownie przy następnej wizycie */
  }
}

export function NewsletterForm({ source, onTint = false }: { source: string; onTint?: boolean }) {
  const [state, setState] = useState<State>('idle')
  const id = useId()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return // pułapka na boty
    setState('sending')
    const res = await submitForm('newsletter_subscribers', { email: fd.get('email'), source })
    if (res.ok && !res.demo) remember('done')
    setState(!res.ok ? 'error' : res.demo ? 'demo' : 'sent')
  }

  const cls = `nl ${onTint ? 'nl--on-tint' : ''}`
  if (state === 'sent' || state === 'demo')
    return (
      <div className={cls}>
        <div className="nl__res" role="status">
          <h3 className="h3">{state === 'sent' ? 'Dziękujemy, adres zapisany' : 'Formularz działa w trybie testowym'}</h3>
          <p>
            {state === 'sent'
              ? 'Pierwszą wiadomość wyślemy przy najbliższym wydaniu newslettera.'
              : 'Adres nie został zapisany — strona jest jeszcze w przygotowaniu.'}
          </p>
        </div>
      </div>
    )

  return (
    <form className={cls} onSubmit={onSubmit}>
      <div className="nl__row">
        <label className="sr" htmlFor={id}>Adres e-mail</label>
        <input id={id} name="email" type="email" required autoComplete="email" placeholder="Twój adres e-mail" />
        <button type="submit" className="pill pill--rose pill--lg" disabled={state === 'sending'}>
          <span>{state === 'sending' ? 'Zapisujemy…' : 'Zapisz się'}</span>
          <i><Arrow /></i>
        </button>
      </div>
      <label className="chk">
        <input type="checkbox" name="consent" value="tak" required />
        <span>{newsletter.consent}</span>
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Nie wypełniaj tego pola
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {state === 'error' && <p className="ferr" role="alert">Nie udało się zapisać adresu. Sprawdź połączenie z internetem i spróbuj ponownie.</p>}
    </form>
  )
}

// Okno zapisu: pokazuje się raz, po 10 s od wejścia na stronę. Nie przerywa pisania w formularzu.
export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (seen()) return
    let t = window.setTimeout(function show() {
      const el = document.activeElement
      const busy = el instanceof HTMLElement && el.matches('input, textarea, select') && !el.closest('.pop')
      if (busy || document.documentElement.classList.contains('menu-open')) t = window.setTimeout(show, 3000)
      else if (!seen()) setOpen(true)
    }, newsletter.delay)
    return () => window.clearTimeout(t)
  }, [])

  const close = () => {
    if (!seen()) remember(String(Date.now()))
    setOpen(false)
  }

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    card.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab' || !card.current) return
      const items = card.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not([tabindex="-1"])')
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

  if (!open) return null
  return (
    <div className="pop" data-lenis-prevent onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="pop__card" role="dialog" aria-modal="true" aria-labelledby="pop-h" tabIndex={-1} ref={card}>
        <button type="button" className="pop__x" onClick={close} aria-label="Zamknij okno">
          <Close />
        </button>
        <Rose className="pop__rose" />
        <h2 className="h2" id="pop-h">{newsletter.title}</h2>
        <p className="nl__txt">{newsletter.text}</p>
        <NewsletterForm source="okno" />
      </div>
    </div>
  )
}
