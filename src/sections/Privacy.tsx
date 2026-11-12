import { Link } from 'react-router'
import { Reveal } from '@/hooks/useReveal'
import { LitText, useSeen, useViewProgress } from '@/hooks/useProgress'

/** Two phones circle an empty centre. The line between them never goes through it. */
function Orbit() {
  const [ref, seen] = useSeen<SVGSVGElement>(0.3)
  return (
    <svg ref={ref} className="orbit" data-seen={seen ? '' : undefined} viewBox="0 0 400 400" role="img" aria-label="Two phones linked directly, with nothing in the middle">
      <circle className="orbit__ring" cx="200" cy="200" r="176" pathLength={1} />
      <circle className="orbit__ring orbit__ring--in" cx="200" cy="200" r="58" pathLength={1} />
      <g className="orbit__spin" style={{ transformOrigin: '200px 200px' }}>
        <line className="orbit__link" x1="40.5" y1="125.6" x2="359.5" y2="125.6" />
        <circle className="orbit__a" cx="40.5" cy="125.6" r="11" />
        <circle className="orbit__b" cx="359.5" cy="125.6" r="11" />
      </g>
      <text className="orbit__nil" x="200" y="204" textAnchor="middle">
        nothing here
      </text>
    </svg>
  )
}

export default function NoServer() {
  const [ref, p] = useViewProgress<HTMLHeadingElement>(0.92, 0.38)
  return (
    <section className="section" id="privacy">
      <div className="wrap ns">
        <div className="ns__left">
          <h2 ref={ref} className="display ns__title">
            <LitText lines={['There is', 'no server.']} progress={p} />
          </h2>
          <div className="ns__row">
            <Reveal as="p" className="lede ns__body" delay={0.1}>
              Keys live on the phone. History lives on the phone. Uninstall, or clear storage, and this device forgets. The privacy policy names every permission, and why it is there.
            </Reveal>
            <Reveal delay={0.25}>
              <Link to="/privacy" className="tlink ns__link">
                Read the privacy policy.
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal className="ns__art" delay={0.2}>
          <Orbit />
        </Reveal>
      </div>
    </section>
  )
}
