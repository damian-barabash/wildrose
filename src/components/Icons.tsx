const HEART = 'M50 46C43.5 41.5 36 33 37.6 23.2C38.9 15.6 46.6 13.6 50 20.6C53.4 13.6 61.1 15.6 62.4 23.2C64 33 56.5 41.5 50 46Z'

export function Flower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <g transform="translate(50 50) scale(1.24) translate(-50 -50)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} transform={`rotate(${a} 50 50)`} d={HEART} />
        ))}
      </g>
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
