import { Rose } from './Icons'

// LOGO TESTOWE. Docelowe wybierzemy z klientem (brand/Wild-Roses-Logo-Propozycje.pdf) —
// wtedy podmieniamy ten jeden komponent i public/favicon.svg.
export function Logo({ tag = true, className = '' }: { tag?: boolean; className?: string }) {
  return (
    <span className={`logo ${className}`} role="img" aria-label="Wild Roses — logo testowe">
      <span className="logo__word" aria-hidden="true">
        WILD R<Rose className="logo__rose" />SES
      </span>
      {tag && <span className="logo__tag" aria-hidden="true">test logo</span>}
    </span>
  )
}
