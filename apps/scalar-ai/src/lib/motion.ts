import { useEffect, type CSSProperties, type PointerEvent } from 'react'

/** Feeds the bento spotlight: cursor position relative to the hovered cell. */
export function trackPointer(e: PointerEvent) {
  const cell = (e.target as HTMLElement).closest<HTMLElement>('.bento-cell')
  if (!cell) return
  const r = cell.getBoundingClientRect()
  cell.style.setProperty('--mx', `${e.clientX - r.left}px`)
  cell.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Stagger for [data-reveal] elements. */
export const delay = (s: number) => ({ '--reveal-delay': `${s}s` }) as CSSProperties

/** Adds .is-visible to [data-reveal] elements as they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    targets.forEach((el) => io.observe(el))
    document.documentElement.classList.add('reveal-ready')
    return () => io.disconnect()
  }, [])
}
