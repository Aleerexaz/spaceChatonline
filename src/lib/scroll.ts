import type Lenis from 'lenis'

let instance: Lenis | null = null
export const setScroller = (l: Lenis | null) => {
  instance = l
}

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (typeof target !== 'number' && !el) return
  if (instance) {
    instance.resize() // the page may have just changed height (route change)
    instance.scrollTo(typeof target === 'number' ? target : (el as HTMLElement), { offset, duration: 1.4 })
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
  }
}

/** One rAF-throttled scroll loop shared by every scroll-linked effect. */
type Tick = () => void
const ticks = new Set<Tick>()
let queued = false
function run() {
  queued = false
  ticks.forEach((t) => t())
}
function onScroll() {
  if (!queued) {
    queued = true
    requestAnimationFrame(run)
  }
}
export function onScrollTick(fn: Tick) {
  if (ticks.size === 0) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  }
  ticks.add(fn)
  fn()
  return () => {
    ticks.delete(fn)
    if (ticks.size === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }
}

/** Instant jump to the top, used when the route changes. */
export function jumpTop() {
  if (instance) instance.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
