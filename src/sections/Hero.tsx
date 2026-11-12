import { useEffect, useRef, useState } from 'react'
import Btn from '@/components/Button'
import PhoneFrame from '@/components/phone/PhoneFrame'
import { DiscoverScreen, StatusBar, type Peer } from '@/components/phone/screens'
import { Headline, Reveal, useParallax, useTilt } from '@/hooks/useReveal'
import { scrollToTarget } from '@/lib/scroll'
import { ArrowDown } from 'lucide-react'

/** The empty room fills with stars, and one of them links. Runs once. */
function LiveDiscover({ onLinked }: { onLinked: () => void }) {
  const [phase, setPhase] = useState(0)
  const cb = useRef(onLinked)
  cb.current = onLinked
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 2600),
      setTimeout(() => setPhase(2), 4700),
      setTimeout(() => {
        setPhase(3)
        cb.current()
      }, 6200),
    ]
    return () => t.forEach(clearTimeout)
  }, [])
  const peers: Peer[] = [
    { id: 'rezaaa', name: 'Rezaaa', x: 285, y: 460, state: phase < 2 ? 'nearby' : phase === 2 ? 'linking' : 'linked' },
    { id: 'tide', name: 'Tide', x: 92, y: 628, state: 'nearby' },
    { id: 'nova', name: 'Nova', x: 262, y: 650, state: 'nearby' },
  ]
  return (
    <>
      <DiscoverScreen peers={peers} empty={phase === 0} />
      <StatusBar time="12:30" />
    </>
  )
}

export default function Hero() {
  const drift = useParallax<HTMLDivElement>(-70)
  const tilt = useTilt<HTMLDivElement>(6)
  const [burst, setBurst] = useState(0)
  return (
    <section className="hero" id="top">
      <div className="wrap hero__wrap">
        <div className="hero__left">
          <Reveal as="p" className="kicker hero__kicker" delay={0.3} variant="fade">
            Android · the room is the network
          </Reveal>
          <Headline as="h1" className="hero__title" lines={['Make', 'connections.', 'Chat offline.']} label="Make connections. Chat offline." delay={0.45} />
          <div className="hero__foot">
            <Reveal as="p" className="lede hero__lede" delay={1.05}>
              Phones that are already near each other find one another, link, and keep the conversation between them. No account. No tower. No feed.
            </Reveal>
            <Reveal className="hero__cta" delay={1.2}>
              <Btn to="/download" label="Download for Android" icon={<ArrowDown size={18} />} />
              <Btn variant="line" label="See the room" onClick={() => scrollToTarget('room')} />
            </Reveal>
          </div>
        </div>

        <Reveal variant="rise" className="hero__right" delay={0.7}>
          {/* radar: the room is the network. Hairlines only, no glow. */}
          <div className="rings" aria-hidden="true">
            <i />
            <i />
            <i />
            {burst > 0 && <b key={burst} />}
          </div>
          <div className="hero__phone">
            <div ref={drift} className="drift">
              <div className="float">
                <div ref={tilt} className="tilt">
                  <PhoneFrame label="SpaceChat Discover: the empty room fills with stars">
                    <LiveDiscover onLinked={() => setBurst((n) => n + 1)} />
                  </PhoneFrame>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
