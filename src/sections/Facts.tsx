import type { CSSProperties } from 'react'
import { Reveal } from '@/hooks/useReveal'
import { useSeen } from '@/hooks/useProgress'

/** Each digit is a vertical reel that rolls to its value, one after another. */
function Odometer({ value, from }: { value: string; from: number[] }) {
  const [ref, seen] = useSeen<HTMLSpanElement>(0.5)
  return (
    <span ref={ref} className="od" aria-label={value}>
      {value.split('').map((d, i) => (
        <span key={i} className="od__d" aria-hidden="true">
          <span
            className="od__reel"
            style={{ ['--y' as string]: seen ? Number(d) : from[i] ?? 0, ['--i' as string]: i } as CSSProperties}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <i key={n}>{n}</i>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

const FACTS = [
  { n: <Odometer value="0" from={[8]} />, unit: '', label: 'servers holding the chat' },
  { n: <Odometer value="24" from={[0, 0]} />, unit: 'h', label: 'default life of a message' },
  { n: <Odometer value="30" from={[0, 9]} />, unit: 'MB/s', label: 'one phone to one phone, on the direct Wi-Fi link' },
]

export default function Facts() {
  return (
    <section className="section facts" aria-label="Facts">
      <div className="wrap">
        <div className="facts__grid">
          {FACTS.map((f, i) => (
            <Reveal key={i} className="fact draw" delay={i * 0.12}>
              <div className="fact__n display">
                {f.n}
                {f.unit && <span className="fact__u">{f.unit}</span>}
              </div>
              <p className="fact__l">{f.label}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mono fact__note" delay={0.3} variant="fade">
          Measured in tests of the app. On a one-to-one link it reached up to 30 MB/s. With several phones the transfer stays usable and is not yet at that peak.
        </Reveal>
      </div>
    </section>
  )
}
