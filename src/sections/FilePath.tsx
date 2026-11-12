import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Headline, Reveal } from '@/hooks/useReveal'

type Mode = 'inside' | 'outside'
const X = { sender: 110, owner: 360, receiver: 610, next: 900 }
const Y = 170

function Node({ x, label, sub, owner, dim }: { x: number; label: string; sub: string; owner?: boolean; dim?: boolean }) {
  return (
    <g className="fp__node" data-dim={dim ? '' : undefined}>
      <circle cx={x} cy={Y} r={owner ? 15 : 10} className={owner ? 'fp__owner' : 'fp__dot'} />
      <text x={x} y={Y + 52} textAnchor="middle" className="fp__label">
        {label}
      </text>
      <text x={x} y={Y + 74} textAnchor="middle" className="fp__sub">
        {sub}
      </text>
    </g>
  )
}

export default function FilePath() {
  const [mode, setMode] = useState<Mode>('inside')
  const inside = mode === 'inside'
  return (
    <section className="section" id="file">
      <div className="wrap">
        <p className="kicker">The file</p>
        <Headline className="h2 file__title" lines={['Bluetooth keeps the friendship.', 'Wi-Fi carries the file.']} />
        <div className="file__grid">
          <Reveal as="p" className="lede file__body" delay={0.1}>
            One phone owns the group. A file between two members goes to the owner and then across. A file for someone outside is sealed for them and carried over. The phone in the middle delivers it. They are not the person it was written for.
          </Reveal>
          <Reveal delay={0.2} className="file__toggle">
            <div className="tog" style={{ ['--i' as string]: inside ? 0 : 1 }} role="radiogroup" aria-label="Where is the file going">
              <span className="tog__thumb" aria-hidden="true" />
              <button role="radio" aria-checked={inside} onClick={() => setMode('inside')}>
                Same group
              </button>
              <button role="radio" aria-checked={!inside} onClick={() => setMode('outside')}>
                Another group
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal className="fp draw" delay={0.1}>
          <svg viewBox="0 0 1000 340" role="img" aria-label={inside ? 'A file goes from Sender to Owner to Receiver' : 'A sealed file goes from Sender to Owner and is carried to the Next group'}>
            <rect x="30" y="64" width="660" height="212" rx="30" className="fp__group" />
            <text x="56" y="96" className="fp__tag">
              Wi-Fi group
            </text>

            {/* legs */}
            <line x1={X.sender} y1={Y} x2={X.owner} y2={Y} className="fp__leg" data-on />
            <line x1={X.owner} y1={Y} x2={X.receiver} y2={Y} className="fp__leg" data-on={inside ? '' : undefined} />
            <line x1={X.owner + 16} y1={Y} x2={X.next - 12} y2={Y} className="fp__leg fp__leg--sealed" data-on={!inside ? '' : undefined} />

            <g className="fp__lock" data-on={!inside ? '' : undefined}>
              <circle cx="660" cy={Y} r="20" />
              <Lock x="648" y={Y - 12} width="24" height="24" strokeWidth={1.8} />
              <text x="660" y={Y - 36} textAnchor="middle" className="fp__tag">
                Sealed for them
              </text>
            </g>

            <Node x={X.sender} label="Sender" sub="sends" />
            <Node x={X.owner} label="Owner" sub="owns the group" owner />
            <Node x={X.receiver} label="Receiver" sub="same group" dim={!inside} />
            <Node x={X.next} label="Next group" sub="outside" dim={inside} />

            {/* the file in flight, and a ping where each packet lands */}
            <g key={mode} className="fp__packets">
              {(() => {
                const end = inside ? X.receiver : X.next
                const per = 3.2 / 3
                const owner = (3.2 * (X.owner - X.sender)) / (end - X.sender)
                return [
                  <circle key="o" className="fp__ping" cx={X.owner} cy={Y} r="14" style={{ animationDuration: `${per}s`, animationDelay: `${owner % per}s` }} />,
                  <circle key="e" className="fp__ping" cx={end} cy={Y} r="10" style={{ animationDuration: `${per}s`, animationDelay: `${3.2 % per}s` }} />,
                ]
              })()}
              {[0, 1, 2].map((i) => (
                <rect key={i} width="9" height="9" x="-4.5" y={Y - 4.5} className="fp__packet">
                  <animateMotion
                    dur="3.2s"
                    begin={`${(i * 3.2) / 3}s`}
                    repeatCount="indefinite"
                    path={inside ? `M${X.sender} 0 L${X.receiver} 0` : `M${X.sender} 0 L${X.next} 0`}
                  />
                </rect>
              ))}
            </g>
          </svg>
        </Reveal>

        <Reveal as="p" className="mono file__cap" variant="fade" delay={0.2}>
          {inside
            ? 'Sender, then Owner, then Receiver, over the direct Wi-Fi link.'
            : 'Sender, then Owner. Sealed for the Next group, carried across, delivered by the phone in the middle.'}
        </Reveal>
      </div>
    </section>
  )
}
