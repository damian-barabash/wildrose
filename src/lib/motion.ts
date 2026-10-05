import { useEffect } from 'react'
import Lenis from 'lenis'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

// Płynne przewijanie kółkiem myszy. Na dotyku zostaje natywne przewijanie telefonu.
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    lenis = new Lenis({ lerp: 0.11, autoRaf: true, anchors: { offset: -88 } })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -88 })
  else el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' })
}

// Elementy z atrybutem data-rv pojawiają się raz, gdy wejdą w kadr.
// `key` zmienia się przy zmianie trasy — wtedy zbieramy elementy nowej strony.
export function useReveal(key: string) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-rv]:not(.in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
