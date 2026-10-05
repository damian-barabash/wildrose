import { Flower } from './Icons'

// LOGO TESTOWE. Docelowe wybierzemy z klientem (brand/Wild-Rose-Logo-Propozycje.pdf) —
// wtedy podmieniamy ten jeden komponent i public/favicon.svg.
export function Logo({ tag = true, className = '' }: { tag?: boolean; className?: string }) {
  return (
    <span className={`logo ${className}`} role="img" aria-label="Wild Rose — logo testowe">
      <span className="logo__word" aria-hidden="true">
        WILD R<Flower className="logo__flower" />SE
      </span>
      {tag && <span className="logo__tag" aria-hidden="true">test logo</span>}
    </span>
  )
}
