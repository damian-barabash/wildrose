import { ROSE_CUT, ROSE_HEART, ROSE_PETALS } from '../lib/rose'

// Linie między płatkami mają kolor tła: zmienna --k (domyślnie biel).
export function Rose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" stroke="var(--k, #fff)" strokeWidth={ROSE_CUT} aria-hidden="true">
      {ROSE_PETALS.map(([cx, cy, r]) => (
        <circle key={r} cx={cx} cy={cy} r={r} />
      ))}
      <path d={ROSE_HEART} fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Arrow({ dir = 'right' }: { dir?: 'right' | 'left' | 'up-right' | 'down' }) {
  const rot = { right: 0, left: 180, 'up-right': -45, down: 90 }[dir]
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Phone() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.6 3.5h2.6l1.4 4-1.9 1.4a11 11 0 0 0 6.4 6.4l1.4-1.9 4 1.4v2.6a2.1 2.1 0 0 1-2.3 2.1A16.4 16.4 0 0 1 4.5 5.8a2.1 2.1 0 0 1 2.1-2.3Z" />
    </svg>
  )
}

export function Close() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
