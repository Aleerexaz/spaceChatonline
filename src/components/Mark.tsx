import { useId } from 'react'
import { MARK_PATH } from '@/lib/markPath'

const STARS = (() => {
  let s = 11
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
  return Array.from({ length: 44 }, () => ({
    x: 326 + rnd() * 386,
    y: 241 + rnd() * 522,
    r: 2.4 + rnd() * rnd() * 6,
    o: 0.25 + rnd() * 0.7,
  }))
})()
const SPARKLES = [
  { x: 470, y: 381, r: 20 },
  { x: 604, y: 657, r: 20 },
  { x: 421, y: 520, r: 11 },
  { x: 666, y: 573, r: 10 },
]

/**
 * `glyph`  a plain S in the current text color (the page's logo, strictly black and white).
 * `field`  the app's mark: a black S filled with stars (used on the first-open screen).
 * `tile`   the app icon on its rounded accent square.
 */
export default function Mark({
  size = 32,
  variant = 'glyph',
  starColor = 'var(--accent-text, #c9a0ff)',
  starScale = 1,
  className = '',
}: {
  size?: number
  variant?: 'glyph' | 'field' | 'tile'
  starColor?: string
  /** shrink the stars on large renders so they stay stars */
  starScale?: number
  className?: string
}) {
  const id = useId()
  const tile = variant === 'tile'
  const stars = variant !== 'glyph'
  return (
    <svg
      width={size}
      height={tile ? size : (size * 522) / 386}
      viewBox={tile ? '0 0 1024 1024' : '316 231 406 542'}
      className={className}
      role="img"
      aria-label="SpaceChat"
    >
      <defs>
        <clipPath id={id}>
          <path d={MARK_PATH} />
        </clipPath>
      </defs>
      {tile && <rect width="1024" height="1024" rx="228" style={{ fill: 'var(--accent)' }} />}
      <path d={MARK_PATH} fill={variant === 'glyph' ? 'currentColor' : '#000'} />
      {stars && (
        <g clipPath={`url(#${id})`} style={{ fill: starColor }}>
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r * starScale} opacity={s.o} />
          ))}
          {SPARKLES.map((s, i) => (
            <circle key={`b${i}`} cx={s.x} cy={s.y} r={s.r * starScale} />
          ))}
        </g>
      )}
    </svg>
  )
}
