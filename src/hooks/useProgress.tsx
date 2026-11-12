/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { onScrollTick } from '@/lib/scroll'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Progress through a tall, pinned section: 0 when its top reaches the top of
 * the screen, 1 when its bottom reaches the bottom. Scroll is the single
 * source of truth, so scrolling back runs everything backward.
 */
export function usePinnedProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return onScrollTick(() => {
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      const v = range > 0 ? clamp(-r.top / range) : 0
      setP((prev) => (Math.abs(prev - v) < 0.0012 ? prev : v))
    })
  }, [])
  return [ref, p] as const
}

/** Words that light up one after another as `progress` advances (and dim again going back). */
export function LitText({
  lines,
  progress,
  className = '',
  from = 0,
  to = 1,
}: {
  lines: string[]
  progress: number
  className?: string
  from?: number
  to?: number
}) {
  const words = lines.map((l) => l.split(' '))
  const total = words.flat().length
  const t = prefersReducedMotion() ? 1 : clamp((progress - from) / (to - from))
  let i = 0
  return (
    <span className={className}>
      {words.map((line, li) => (
        <span key={li} className="lit__line">
          {line.map((w, wi) => {
            const local = clamp(t * total - i++)
            return (
              <span key={wi} className="lit__word" style={{ ['--w' as string]: local.toFixed(3) } as CSSProperties}>
                {w.endsWith('.') ? (
                  <>
                    {w.slice(0, -1)}
                    <i className="pd">.</i>
                  </>
                ) : (
                  w
                )}
                {wi < line.length - 1 ? '\u00a0' : ''}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

/** True once the element has been about a third on screen. */
export function useSeen<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return setSeen(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

/** 0 as the element's top rises past `start` of the viewport height, 1 by `end`. */
export function useViewProgress<T extends HTMLElement>(start = 0.9, end = 0.35) {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return onScrollTick(() => {
      const r = el.getBoundingClientRect()
      const v = clamp((start * window.innerHeight - r.top) / ((start - end) * window.innerHeight))
      setP((prev) => (Math.abs(prev - v) < 0.0015 ? prev : v))
    })
  }, [start, end])
  return [ref, p] as const
}
