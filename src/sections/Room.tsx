import PhoneFrame from '@/components/phone/PhoneFrame'
import RoomPhone, { settingsAccent } from '@/components/phone/RoomPhone'
import { ACCENTS } from '@/config'
import { Reveal } from '@/hooks/useReveal'
import { usePinnedProgress } from '@/hooks/useProgress'
import { scrollToTarget } from '@/lib/scroll'

const SCENES = [
  { kicker: 'Discover', title: 'You are the bright star.', body: 'Open the app. The sky is only the phones this radio can see. Nobody is drawing your location, and nothing is uploaded.' },
  { kicker: 'Link', title: 'Accept, and the line holds.', body: 'Tap a star to ask. They have a short window. Accept, and you are linked. Decline, and you are told. If it fails, you are told.' },
  { kicker: 'Chat', title: 'The chat stays on the phones.', body: 'Text, a photo, a file, a voice note. Messages expire on the clock you set: 12, 24, or 48 hours. The default is a day.' },
  { kicker: 'You', title: 'The color of your star is a choice.', body: 'Nebula, Crimson, Tide, Aurora, Flare, Nova. The timer and the storage live beside that choice. That screen does not phone home.' },
]
const N = SCENES.length

/** A headline whose words rise out of a mask when the scene arrives and leave upward. */
function Kinetic({ text }: { text: string }) {
  return (
    <h2 className="display scene__title" aria-label={text}>
      {text.split(' ').map((w, i) => {
        const dot = w.endsWith('.')
        return (
          <span key={i} className="kw" aria-hidden="true">
            <span style={{ ['--i' as string]: i }}>
              {dot ? w.slice(0, -1) : w}
              {dot && <i className="pd">.</i>}
            </span>
          </span>
        )
      })}
    </h2>
  )
}
const PER = 95 // dvh of scroll per scene

export default function Room() {
  const [ref, p] = usePinnedProgress<HTMLElement>()
  const scene = Math.min(N - 1, Math.floor(p * N))
  const t = Math.min(1, p * N - scene)

  const accent = scene === 3 ? ACCENTS[settingsAccent(t)].hex : ACCENTS[0].hex
  const sway = Math.sin(p * Math.PI * 4) * 6 // a slow turn of the phone as the story moves

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    scrollToTarget(top + ((i + 0.5) / N) * (el.offsetHeight - window.innerHeight))
  }

  return (
    <section className="room" id="room" ref={ref} style={{ height: `${100 + (N - 1) * PER + 40}dvh` }}>
      <div className="room__stick">
        <div className="wrap room__grid">
          <div className="room__text">
            <div className="room__scenes">
              {SCENES.map((s, i) => (
                <div key={s.kicker} className="scene" data-active={i === scene ? '' : undefined} data-past={i < scene ? '' : undefined} aria-hidden={i !== scene}>
                  <p className="kicker">{s.kicker}</p>
                  <Kinetic text={s.title} />
                  <p className="lede scene__body">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="room__index" role="tablist" aria-label="Scenes">
              {SCENES.map((s, i) => (
                <button key={s.kicker} role="tab" aria-selected={i === scene} className="room__tick" data-active={i === scene ? '' : undefined} onClick={() => jump(i)}>
                  <span className="room__bar">
                    <span style={{ transform: `scaleX(${i < scene ? 1 : i === scene ? t.toFixed(3) : 0})` }} />
                  </span>
                  <span className="mono">
                    {String(i + 1).padStart(2, '0')} {s.kicker}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Reveal variant="rise" className="room__phone">
            <div className="room__tilt" style={{ transform: `perspective(1600px) rotateY(${sway.toFixed(2)}deg) rotateX(${(Math.cos(p * Math.PI * 4) * 1.5).toFixed(2)}deg)` }}>
              <PhoneFrame accent={accent} label={`SpaceChat, ${SCENES[scene].kicker}`}>
                <RoomPhone scene={scene} t={t} />
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
