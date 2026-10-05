import { type FormEvent, type ReactNode, useId, useState } from 'react'
import { mainHotline, supportWays, telHref } from '../content/site'
import { type FormKind, submitForm } from '../lib/forms'
import { Arrow } from './Icons'

type State = 'idle' | 'sending' | 'sent' | 'demo' | 'error'

function Field({ label, hint, children }: { label: string; hint?: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div className="fld">
      <label htmlFor={id}>{label}</label>
      {children(id)}
      {hint && <small>{hint}</small>}
    </div>
  )
}

function useForm(kind: FormKind) {
  const [state, setState] = useState<State>('idle')
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return // pułapka na boty
    fd.delete('website')
    setState('sending')
    const res = await submitForm(kind, Object.fromEntries(fd))
    setState(!res.ok ? 'error' : res.demo ? 'demo' : 'sent')
  }
  return { state, onSubmit, reset: () => setState('idle') }
}

function Result({ state, sent, reset }: { state: State; sent: ReactNode; reset: () => void }) {
  return (
    <div className="fres" role="status" tabIndex={-1}>
      {state === 'sent' && sent}
      {state === 'demo' && (
        <>
          <h3 className="h3">Formularz działa w trybie testowym</h3>
          <p>
            Ta wiadomość <b>nie została wysłana</b> — strona jest jeszcze w przygotowaniu. Jeśli potrzebujesz pomocy teraz, zadzwoń:{' '}
            <a href={telHref(mainHotline.tel)}>{mainHotline.tel}</a> ({mainHotline.label}, bezpłatnie, całą dobę).
          </p>
        </>
      )}
      <button type="button" className="pill pill--line" onClick={reset}>
        <span>Wróć do formularza</span>
      </button>
    </div>
  )
}

const Honey = () => (
  <div className="hp" aria-hidden="true">
    <label>
      Nie wypełniaj tego pola
      <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
  </div>
)

function Submit({ state, children }: { state: State; children: ReactNode }) {
  return (
    <>
      {state === 'error' && (
        <p className="ferr" role="alert">
          Nie udało się wysłać wiadomości. Sprawdź połączenie z internetem i spróbuj ponownie albo zadzwoń: <a href={telHref(mainHotline.tel)}>{mainHotline.tel}</a>.
        </p>
      )}
      <button type="submit" className="pill pill--rose pill--lg" disabled={state === 'sending'}>
        <span>{state === 'sending' ? 'Wysyłamy…' : children}</span>
        <i><Arrow /></i>
      </button>
    </>
  )
}

export function HelpForm() {
  const { state, onSubmit, reset } = useForm('help_requests')
  if (state === 'sent' || state === 'demo')
    return (
      <Result
        state={state}
        reset={reset}
        sent={
          <>
            <h3 className="h3">Wiadomość wysłana</h3>
            <p>Odezwiemy się w sposób i o porze, które zostały wskazane. Jeśli sytuacja się pogorszy, nie czekaj na nas — dzwoń pod 112.</p>
          </>
        }
      />
    )
  return (
    <form className="form" onSubmit={onSubmit}>
      <Field label="Jak mamy się do Ciebie zwracać?" hint="Wystarczy imię albo pseudonim.">
        {(id) => <input id={id} name="name" required autoComplete="off" />}
      </Field>
      <fieldset className="fld">
        <legend>Jak możemy się bezpiecznie odezwać?</legend>
        <div className="chips">
          {['Telefon', 'SMS', 'E-mail'].map((c, i) => (
            <label key={c} className="chip">
              <input type="radio" name="channel" value={c} defaultChecked={i === 0} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Numer telefonu lub adres e-mail" hint="Podaj kontakt, do którego nikt poza Tobą nie ma dostępu.">
        {(id) => <input id={id} name="contact" required autoComplete="off" inputMode="email" />}
      </Field>
      <Field label="Kiedy możemy się odezwać?" hint="Na przykład: w dni robocze między 9 a 14.">
        {(id) => <input id={id} name="safe_time" autoComplete="off" />}
      </Field>
      <Field label="Czego potrzebujesz?">
        {(id) => (
          <select id={id} name="topic" defaultValue="Rozmowa">
            {['Rozmowa', 'Bezpieczeństwo — doświadczam przemocy', 'Pomoc prawna', 'Wsparcie psychologiczne', 'Powrót do pracy', 'Coś innego'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        )}
      </Field>
      <Field label="Co chcesz nam powiedzieć?" hint="To pole możesz zostawić puste.">
        {(id) => <textarea id={id} name="message" rows={4} />}
      </Field>
      <label className="chk">
        <input type="checkbox" name="voicemail_ok" value="tak" />
        <span>Możecie zostawić wiadomość, jeśli nie odbiorę.</span>
      </label>
      <label className="chk">
        <input type="checkbox" name="consent" value="tak" required />
        <span>Zgadzam się na kontakt w mojej sprawie. Dane posłużą wyłącznie do udzielenia pomocy.</span>
      </label>
      <Honey />
      <Submit state={state}>Wyślij wiadomość</Submit>
    </form>
  )
}

export function PartnerForm() {
  const { state, onSubmit, reset } = useForm('partner_requests')
  if (state === 'sent' || state === 'demo')
    return (
      <Result
        state={state}
        reset={reset}
        sent={
          <>
            <h3 className="h3">Wiadomość wysłana</h3>
            <p>Dziękujemy. Odpowiemy w ciągu kilku dni roboczych.</p>
          </>
        }
      />
    )
  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="fld">
        <legend>Jak chcesz wesprzeć fundację?</legend>
        <div className="chips">
          {supportWays.map((w, i) => (
            <label key={w.id} className="chip">
              <input type="radio" name="kind" value={w.name} defaultChecked={i === 0} />
              <span>{w.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form__row">
        <Field label="Imię i nazwisko">{(id) => <input id={id} name="name" required autoComplete="name" />}</Field>
        <Field label="Firma lub organizacja" hint="Opcjonalnie.">
          {(id) => <input id={id} name="company" autoComplete="organization" />}
        </Field>
      </div>
      <div className="form__row">
        <Field label="E-mail">{(id) => <input id={id} name="email" type="email" required autoComplete="email" />}</Field>
        <Field label="Telefon" hint="Opcjonalnie.">
          {(id) => <input id={id} name="phone" type="tel" autoComplete="tel" />}
        </Field>
      </div>
      <Field label="Napisz kilka słów o tym, jak chcesz pomóc">{(id) => <textarea id={id} name="message" rows={4} />}</Field>
      <label className="chk">
        <input type="checkbox" name="consent" value="tak" required />
        <span>Zgadzam się na kontakt w sprawie współpracy z fundacją.</span>
      </label>
      <Honey />
      <Submit state={state}>Wyślij zgłoszenie</Submit>
    </form>
  )
}
