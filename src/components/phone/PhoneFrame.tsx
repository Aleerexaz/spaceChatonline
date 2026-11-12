import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { onAccent } from '@/config'

/**
 * A device frame that scales to whatever width its parent gives it.
 * The screen is always laid out at 390 × 844 and scaled with a transform,
 * so the UI inside keeps its exact proportions at any size.
 */
export default function PhoneFrame({
  children,
  className = '',
  style,
  label,
  accent,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  label?: string
  /** hex colour; when given, the whole phone (and only the phone) wears it */
  accent?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.6)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / 414)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`phone ${className}`}
      style={{
        ...style,
        aspectRatio: '414 / 868',
        ...(accent ? ({ '--accent': accent, '--on-accent': onAccent(accent) } as CSSProperties) : null),
      }}
      role="img"
      aria-label={label ?? 'SpaceChat app screen'}
    >
      <div className="phone__body" style={{ transform: `scale(${scale})` }}>
        <span className="phone__btn" style={{ left: -3, top: 150, height: 30 }} />
        <span className="phone__btn" style={{ left: -3, top: 210, height: 58 }} />
        <span className="phone__btn" style={{ left: -3, top: 282, height: 58 }} />
        <span className="phone__btn" style={{ right: -3, top: 236, height: 92 }} />
        <div className="phone__screen">
          <div className="phone__island" />
          <div className="app">{children}</div>
        </div>
      </div>
    </div>
  )
}
