import { Check, FileArchive, ShieldCheck } from 'lucide-react'
import { DiscoverScreen, FirstOpenScreen, StatusBar, type Peer } from '@/components/phone/screens'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const DURATIONS = [7200, 7600, 12000]

/** Step 1: the browser's download list, a file arriving, and the checksum check. */
function Downloads({ ms }: { ms: number }) {
  const pr = clamp((ms - 900) / 3800)
  const done = pr >= 1
  return (
    <div className="sys">
      <div className="sys__title">Downloads</div>
      <div className="sys__card" data-in={ms > 300 ? '' : undefined}>
        <span className="sys__ic">
          <FileArchive size={24} />
        </span>
        <div className="sys__meta">
          <b>SpaceChat.apk</b>
          <small>{done ? '94 MB · just now' : `${Math.round(pr * 94)} of 94 MB`}</small>
          <span className="sys__bar" data-done={done ? '' : undefined}>
            <i style={{ transform: `scaleX(${pr})` }} />
          </span>
        </div>
        <span className="sys__ok" data-on={done ? '' : undefined}>
          <Check size={18} strokeWidth={3} />
        </span>
      </div>
      <div className="sys__sha" data-on={ms > 5600 ? '' : undefined}>
        <ShieldCheck size={18} />
        <span>
          <b>SHA-256 matches</b>
          <small>8993FD98…D7BB42B</small>
        </span>
      </div>
      <StatusBar time="9:40" />
    </div>
  )
}

/** Step 2: Android asks before a browser may install an app. */
function Allow({ ms }: { ms: number }) {
  const on = ms > 1700
  const pressing = ms > 3500 && ms < 3800
  const installing = ms >= 3800 && ms < 5600
  const installed = ms >= 5600
  return (
    <div className="sys sys--dim">
      <div className="sys__title">Settings</div>
      <div className="sys__ghost">
        <span />
        <span />
        <span />
      </div>
      <div className="dlg" data-in={ms > 300 ? '' : undefined}>
        {!installing && !installed && (
          <>
            <h5>Install unknown apps</h5>
            <p>Android asks before a browser can install an app. Allow it for this file only.</p>
            <div className="dlg__row">
              <span>Allow from this source</span>
              <span className="tgl" data-on={on ? '' : undefined}>
                <i />
              </span>
            </div>
            <div className="dlg__act">
              <span>Cancel</span>
              <span className="dlg__btn" data-on={on ? '' : undefined} data-press={pressing ? '' : undefined}>
                Install
              </span>
            </div>
          </>
        )}
        {installing && (
          <>
            <h5>Installing SpaceChat</h5>
            <span className="sys__bar sys__bar--lg">
              <i style={{ transform: `scaleX(${clamp((ms - 3800) / 1700)})` }} />
            </span>
          </>
        )}
        {installed && (
          <>
            <h5>App installed</h5>
            <p>SpaceChat is on this phone. Bluetooth on, and open it together.</p>
            <div className="dlg__act">
              <span>Done</span>
              <span className="dlg__btn" data-on>
                Open
              </span>
            </div>
          </>
        )}
      </div>
      <StatusBar time="9:41" />
    </div>
  )
}

/** Step 3: first open, a name, then the room. */
function Open({ ms }: { ms: number }) {
  const name = 'Aleereza'
  const typed = name.slice(0, clamp(Math.floor((ms - 3300) / 230), 0, name.length))
  const first = ms < 6400
  const empty = ms < 8300
  const linked = ms > 10400
  const peers: Peer[] = [
    { id: 'r', name: 'Rezaaa', x: 285, y: 460, state: linked ? 'linked' : ms > 9400 ? 'linking' : 'nearby' },
    { id: 'n', name: 'Nova', x: 92, y: 628, state: 'nearby' },
  ]
  return (
    <>
      <div className={`app-layer ${first ? 'is-current' : 'is-before'}`}>
        <FirstOpenScreen step={ms < 2400 ? 0 : 1} typed={typed} />
        <StatusBar time="9:42" ink />
      </div>
      <div className={`app-layer ${first ? 'is-after' : 'is-current'}`}>
        <DiscoverScreen peers={peers} empty={empty} />
        <StatusBar time="9:42" />
      </div>
    </>
  )
}

export default function JourneyPhone({ step, ms }: { step: number; ms: number }) {
  const cls = (i: number) => `app-layer ${i < step ? 'is-before' : i > step ? 'is-after' : 'is-current'}`
  return (
    <>
      <div className={cls(0)}>
        <Downloads ms={step === 0 ? ms : 0} />
      </div>
      <div className={cls(1)}>
        <Allow ms={step === 1 ? ms : 0} />
      </div>
      <div className={cls(2)}>
        <Open ms={step === 2 ? ms : 0} />
      </div>
    </>
  )
}
