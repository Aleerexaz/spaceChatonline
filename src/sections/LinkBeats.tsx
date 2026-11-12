import PhoneFrame from '@/components/phone/PhoneFrame'
import { DiscoverScreen, StatusBar, type Peer, type PeerState } from '@/components/phone/screens'
import { Headline, Reveal } from '@/hooks/useReveal'
import { useSeen, useViewProgress } from '@/hooks/useProgress'

const BEATS: { state: PeerState; title: string; body: string; color: string }[] = [
  { state: 'nearby', title: 'Nearby', body: 'Their name is on the map. The advertisement is live. Nothing is linked yet.', color: 'var(--nearby)' },
  { state: 'linking', title: 'Linking', body: 'The request is in their hands. Accept forms the link. A no, or a failure, is said out loud.', color: 'var(--linking)' },
  { state: 'linked', title: 'Linked', body: 'Direct when you are neighbors. Through the room when you are not. While you are both here, the line stays.', color: 'var(--violet)' },
]

function Beat({ i }: { i: number }) {
  const b = BEATS[i]
  const [ref, seen] = useSeen<HTMLDivElement>(0.4)
  // the third phone draws its line only once it is in view
  const state: PeerState = b.state === 'linked' && !seen ? 'nearby' : b.state
  const peers: Peer[] = [{ id: 'r', name: 'Rezaaa', x: 285, y: 460, state }]
  return (
    <Reveal className="beat" delay={i * 0.12}>
      <div ref={ref} className="beat__crop">
        <PhoneFrame label={`Discover with a star that is ${b.title.toLowerCase()}`}>
          <DiscoverScreen peers={peers} hint={false} />
          <StatusBar time="12:30" />
        </PhoneFrame>
      </div>
      <div className="beat__text draw">
        <h3 className="display beat__title">
          <span className="beat__dot" style={{ background: b.color }} />
          {b.title}
        </h3>
        <p className="beat__body">{b.body}</p>
      </div>
    </Reveal>
  )
}

export default function LinkBeats() {
  const [ref, p] = useViewProgress<HTMLDivElement>(0.8, 0.1)
  const lit = [p > 0.02, p >= 0.5, p >= 0.98]
  return (
    <section className="section" id="link">
      <div className="wrap">
        <p className="kicker">The link</p>
        <Headline className="h2 link__title" lines={['Three beats.', 'Then the line holds.']} />
        <div ref={ref} className="beats">
          <div className="rail" aria-hidden="true">
            <span className="rail__track">
              <span className="rail__fill" style={{ transform: `scaleX(${p.toFixed(3)})` }} />
            </span>
            {BEATS.map((b, i) => (
              <span key={i} className="rail__node" data-on={lit[i] ? '' : undefined} style={{ ['--k' as string]: i, ['--c' as string]: b.color }} />
            ))}
          </div>
          {BEATS.map((_, i) => (
            <Beat key={i} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
