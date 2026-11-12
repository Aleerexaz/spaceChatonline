import { useRef, type PointerEvent, type ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'solid' | 'violet' | 'ink' | 'line'
interface Base {
  label: string
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
}
type Props =
  | (Base & { to: string })
  | (Base & { href: string; download?: string })
  | (Base & { onClick?: () => void; disabled?: boolean })

/** Rolls a label letter by letter: each glyph is stacked with a copy of itself. */
export function RollText({ text }: { text: string }) {
  return (
    <span className="btn__label" aria-hidden="true">
      {Array.from(text).map((c, i) => (
        <span key={i} className="ch" style={{ ['--i' as string]: i }}>
          <i>{c === ' ' ? '\u00a0' : c}</i>
          <i>{c === ' ' ? '\u00a0' : c}</i>
        </span>
      ))}
    </span>
  )
}

/** Wires up the magnetic pull and the cursor-origin fill on any element with `.btn`. */
export function useMagnet<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const enter = (e: PointerEvent<T>) => {
    const el = ref.current
    if (!el || !canHover()) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
    el.style.setProperty('--d', `${Math.hypot(r.width, r.height) * 2.1}px`)
  }
  const move = (e: PointerEvent<T>) => {
    const el = ref.current
    if (!el || !canHover()) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    el.setAttribute('data-moving', '')
    el.style.setProperty('--mx', `${(dx * 0.14).toFixed(1)}px`)
    el.style.setProperty('--my', `${(dy * 0.28).toFixed(1)}px`)
  }
  const leave = (e: PointerEvent<T>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.removeAttribute('data-moving')
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
  }
  return { ref, handlers: { onPointerEnter: enter, onPointerMove: move, onPointerLeave: leave } }
}

export default function Btn(props: Props) {
  const { label, variant = 'solid', size = 'md', icon, className = '' } = props
  const { ref, handlers } = useMagnet<HTMLElement>()
  const cls = `btn btn--${variant} ${size !== 'md' ? `btn--${size}` : ''} ${className}`
  const inner = (
    <>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__in">
        {icon && <span className="btn__ic">{icon}</span>}
        <RollText text={label} />
      </span>
    </>
  )
  if ('to' in props)
    return (
      <Link ref={ref as never} to={props.to} className={cls} aria-label={label} {...handlers}>
        {inner}
      </Link>
    )
  if ('href' in props)
    return (
      <a ref={ref as never} href={props.href} download={props.download} className={cls} aria-label={label} {...handlers}>
        {inner}
      </a>
    )
  return (
    <button ref={ref as never} type="button" className={cls} aria-label={label} onClick={props.onClick} disabled={props.disabled} {...handlers}>
      {inner}
    </button>
  )
}
