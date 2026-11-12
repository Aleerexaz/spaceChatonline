/* eslint-disable react-refresh/only-export-components */
import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { onScrollTick } from '@/lib/scroll'

let io: IntersectionObserver | null = null
function getIO() {
  if (io || typeof IntersectionObserver === 'undefined') return io
  io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-in', '')
          io?.unobserve(e.target)
        }
      }),
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  )
  return io
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = getIO()
    if (!o) {
      el.setAttribute('data-in', '')
      return
    }
    o.observe(el)
    return () => o.unobserve(el)
  }, [])
  return ref
}

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  delay?: number
  variant?: 'up' | 'rise' | 'fade'
  children?: ReactNode
}

export function Reveal({ as = 'div', delay = 0, variant = 'up', className = '', style, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>()
  return createElement(
    as,
    {
      ref,
      className: `rv ${variant === 'fade' ? '' : `rv-${variant}`} ${className}`,
      style: { ...style, '--d': `${delay}s` } as CSSProperties,
      ...rest,
    },
    children,
  )
}

/** Headline whose lines rise out of a mask, one after another. */
export function Headline({
  lines,
  as = 'h2',
  className = '',
  delay = 0,
  label,
}: {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  label?: string
}) {
  const ref = useReveal<HTMLElement>()
  return createElement(
    as,
    { ref, className: `display ${className}`, 'aria-label': label ?? lines.join(' ') },
    lines.map((l, i) => {
      const dot = l.endsWith('.')
      const style = { '--d': `${delay + i * 0.09}s` } as CSSProperties
      return createElement(
        'span',
        { key: i, className: 'ln', 'aria-hidden': true },
        createElement(
          'span',
          { style },
          dot ? l.slice(0, -1) : l,
          dot ? createElement('i', { className: 'pd' }, '.') : null,
        ),
      )
    }),
  )
}

/** Eased pointer tilt for 3D product shots. Sets --rx / --ry on the element. */
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover)').matches) return
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let raf = 0
    const move = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const loop = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`)
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [max])
  return ref
}

/** Gentle vertical drift tied to scroll position. Sets --py on the element. */
export function useParallax<T extends HTMLElement>(strength = 40) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    return onScrollTick(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -200 || r.top > vh + 200) return
      const p = (r.top + r.height / 2 - vh / 2) / vh
      el.style.setProperty('--py', `${(-p * strength).toFixed(1)}px`)
    })
  }, [strength])
  return ref
}
