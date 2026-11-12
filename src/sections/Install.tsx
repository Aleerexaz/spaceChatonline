import DownloadButton from '@/components/DownloadButton'
import Checksum from '@/components/Checksum'
import Mark from '@/components/Mark'
import { Headline, Reveal } from '@/hooks/useReveal'
import { useViewProgress } from '@/hooks/useProgress'
import { APP } from '@/config'

const ease = (x: number) => 1 - Math.pow(1 - x, 3)

/** The only flat field of violet on the page: the first-open screen, grown to fit. */
export default function Install() {
  const [ref, p] = useViewProgress<HTMLDivElement>(1.0, 0.4)
  const e = ease(p)
  return (
    <section className="section install" id="install">
      <div className="wrap">
        <div ref={ref} className="panel" style={{ transform: `scale(${(0.9 + 0.1 * e).toFixed(4)})`, borderRadius: `${(72 - 36 * e).toFixed(1)}px` }}>
          <div className="panel__grid">
            <div className="panel__copy">
              <p className="kicker">Android {APP.version}</p>
              <Headline className="install__title" lines={['Install it on', 'every phone', 'in the room.']} />
              <Reveal className="panel__cta" delay={0.1}>
                <DownloadButton variant="ink" />
                <p className="mono install__fine">
                  {APP.size} · {APP.minAndroid} · package {APP.packageName}.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Checksum />
              </Reveal>
            </div>
            <Reveal className="panel__mark" variant="rise" delay={0.15}>
              <div className="panel__spin">
                <Mark size={300} variant="field" starColor="#c79bff" starScale={0.5} />
              </div>
            </Reveal>
          </div>
          <Reveal className="soon draw" delay={0.2}>
            <div className="soon__row">
              <span>iOS</span>
              <span className="mono">coming soon</span>
            </div>
            <div className="soon__row">
              <span>Desktop</span>
              <span className="mono">coming soon</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
