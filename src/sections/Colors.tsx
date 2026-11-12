import { useState } from 'react'
import PhoneFrame from '@/components/phone/PhoneFrame'
import { DiscoverScreen, StatusBar, type Peer } from '@/components/phone/screens'
import { Headline, Reveal } from '@/hooks/useReveal'
import { ACCENTS } from '@/config'

const PEERS: Peer[] = [
  { id: 'nova', name: 'Nova', x: 290, y: 258, state: 'linked' },
  { id: 'tide', name: 'Tide', x: 90, y: 560, state: 'nearby' },
]

export default function Colors() {
  const [sel, setSel] = useState(0)
  const [pulse, setPulse] = useState(0)
  const a = ACCENTS[sel]
  return (
    <section className="section" id="color">
      <div className="wrap colors">
        <div className="colors__copy">
          <p className="kicker">Settings</p>
          <Headline className="h2" lines={['Your star wears', 'the color you pick.']} />
          {/* the one place the page itself takes the colour you choose */}
          <div className="colors__word display" aria-live="polite">
            <span key={a.id} style={{ color: a.hex }}>
              {a.name}
            </span>
          </div>
          <div className="swatches" role="radiogroup" aria-label="Star color">
            {ACCENTS.map((c, i) => (
              <Reveal key={c.id} className="swatch-wrap" delay={0.15 + i * 0.06}>
                <button
                  className="swatch"
                  role="radio"
                  aria-checked={i === sel}
                  data-on={i === sel ? '' : undefined}
                  onClick={() => {
                    setSel(i)
                    setPulse((n) => n + 1)
                  }}
                >
                  <span className="swatch__dot" style={{ background: c.hex, ['--c' as string]: c.hex }}>
                    {i === sel && <i key={pulse} className="swatch__ping" />}
                  </span>
                  <span className="swatch__name">{c.name}</span>
                  <span className="swatch__hex mono">{c.hex}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal variant="rise" className="colors__phone">
          <PhoneFrame accent={a.hex} label={`Discover with a ${a.name} star`}>
            <DiscoverScreen peers={PEERS} />
            <StatusBar time="9:41" />
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  )
}
