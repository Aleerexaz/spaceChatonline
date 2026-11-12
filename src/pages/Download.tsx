import { useEffect, useRef, useState } from 'react'
import { Footer } from '@/components/Chrome'
import Checksum from '@/components/Checksum'
import DownloadButton from '@/components/DownloadButton'
import JourneyPhone, { DURATIONS } from '@/components/JourneyPhone'
import PhoneFrame from '@/components/phone/PhoneFrame'
import { Headline, Reveal } from '@/hooks/useReveal'
import { APP } from '@/config'

const STEPS = [
  { n: '01', t: 'Download', b: 'Save the APK. Compare the SHA-256 if you want to be sure the file was not swapped.' },
  { n: '02', t: 'Allow it', b: 'Android asks before a browser can install an app. The terms describe that choice.' },
  { n: '03', t: 'Open it together', b: 'Bluetooth on. SpaceChat open. Stay in the room. Discover draws a star for each phone it can see.' },
]

/** One clock drives the phone and the list, so they can never drift apart. */
function useJourney() {
  const [step, setStep] = useState(0)
  const [ms, setMs] = useState(0)
  const [auto, setAuto] = useState(true)
  const t0 = useRef(0)
  useEffect(() => {
    let raf = 0
    let last = 0
    t0.current = performance.now()
    const loop = (t: number) => {
      const el = t - t0.current
      if (auto && el >= DURATIONS[step]) return setStep((s) => (s + 1) % 3)
      if (t - last > 70) {
        last = t
        setMs(el)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [step, auto])
  const go = (i: number) => {
    setAuto(false) // someone chose a step: let them read it
    setMs(0)
    setStep(i)
  }
  return { step, ms, go, auto, resume: () => setAuto(true) }
}

export default function DownloadPage() {
  const j = useJourney()
  return (
    <>
      <main className="dl">
        <div className="wrap dl__top">
          <div className="dl__copy">
            <Reveal as="p" className="kicker" variant="fade" delay={0.2}>
              Android {APP.version} · {APP.packageName}.
            </Reveal>
            <Headline as="h1" className="dl__title" lines={['The same build,', 'on every phone.']} delay={0.3} />
          </div>
          <div className="dl__side">
            <Reveal as="p" className="lede" delay={0.7}>
              iOS and desktop are not in this file. Everyone who will talk tonight installs this one.
            </Reveal>
            <Reveal className="dl__cta" delay={0.85}>
              <DownloadButton />
              <p className="mono install__fine">
                {APP.size} · {APP.minAndroid} · package {APP.packageName}.
              </p>
            </Reveal>
            <Reveal delay={0.95}>
              <Checksum />
            </Reveal>
          </div>
        </div>

        <div className="wrap dl__journey">
          <ol className="jsteps">
            {STEPS.map((s, i) => {
              const active = i === j.step
              const frac = active ? Math.min(1, j.ms / DURATIONS[i]) : i < j.step ? 1 : 0
              return (
                <Reveal as="li" key={s.n} className="jstep" delay={i * 0.1} data-active={active ? '' : undefined} data-past={i < j.step ? '' : undefined}>
                  <button className="jstep__head" onClick={() => j.go(i)} aria-current={active ? 'step' : undefined}>
                    <span className="mono jstep__n">{s.n}</span>
                    <span className="display jstep__t">{s.t}</span>
                  </button>
                  <div className="jstep__b">
                    <p>{s.b}</p>
                  </div>
                  <span className="jstep__bar" aria-hidden="true">
                    <i style={{ transform: `scaleX(${j.auto ? frac : active ? 1 : i < j.step ? 1 : 0})` }} />
                  </span>
                </Reveal>
              )
            })}
            {!j.auto && (
              <li>
                <button className="tlink jsteps__resume" onClick={j.resume}>
                  Play the three steps again
                </button>
              </li>
            )}
          </ol>

          <Reveal variant="rise" className="dl__phone" delay={0.3}>
            <div className="float">
              <PhoneFrame label={`Install walkthrough, step ${j.step + 1}: ${STEPS[j.step].t}`}>
                <JourneyPhone step={j.step} ms={j.ms} />
              </PhoneFrame>
            </div>
          </Reveal>
        </div>

        <div className="wrap">
          <Reveal className="dl__note draw">
            <p className="kicker">Before you install</p>
            <p className="dl__notebody">
              This is the direct-install build. It is signed for sideloading, not with a Google Play app-signing key. When a Play listing exists, install that build. Until then, only install a file whose SHA-256 matches the line above. Android will ask you to allow the install from your browser. Allow it for this file only.
            </p>
          </Reveal>
          <Reveal className="soon draw">
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
      </main>
      <Footer />
    </>
  )
}
