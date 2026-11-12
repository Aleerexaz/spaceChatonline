/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import {
  Bluetooth,
  Camera,
  ChevronLeft,
  Compass,
  Ellipsis,
  File as FileIcon,
  Image as ImageIcon,
  MessageCircleMore,
  Mic,
  Play,
  Plus,
  RotateCw,
  Check,
  X,
} from 'lucide-react'
import skyUrl from '@/assets/sky.webp'
import Mark from '@/components/Mark'

/* ───────────── Status bar ───────────── */
export function StatusBar({ time = '3:52', ink = false }: { time?: string; ink?: boolean }) {
  return (
    <div className={`sb ${ink ? 'sb--ink' : ''}`} aria-hidden="true">
      <span>{time}</span>
      <span className="sb__r">
        <Bluetooth size={14} strokeWidth={2.4} />
        <svg width="17" height="13" viewBox="0 0 17 13" fill="currentColor">
          <rect x="0" y="8" width="3" height="5" rx="1" />
          <rect x="4.7" y="5.5" width="3" height="7.5" rx="1" />
          <rect x="9.4" y="3" width="3" height="10" rx="1" />
          <rect x="14" y="0" width="3" height="13" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <path d="M1 4.2a10 10 0 0 1 14 0M3.4 6.8a6.4 6.4 0 0 1 9.2 0" />
          <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}

/* ───────────── Discover ───────────── */
export type PeerState = 'nearby' | 'linking' | 'linked' | 'offline'
export interface Peer {
  id: string
  name: string
  x: number
  y: number
  state: PeerState
  hidden?: boolean
}
export const YOU = { x: 154, y: 372, name: 'aleereza' }
const STATE_WORD: Record<PeerState, string> = { nearby: 'Nearby', linking: 'Linking…', linked: 'Linked', offline: 'Offline' }

export function DiscoverScreen({ peers, empty = false, hint = true }: { peers: Peer[]; empty?: boolean; hint?: boolean }) {
  const live = peers.filter((p) => !p.hidden && p.state !== 'offline')
  const linked = live.filter((p) => p.state === 'linked').length
  const sub = live.length === 0 ? 'No one nearby' : `${live.length} nearby star${live.length > 1 ? 's' : ''}${linked ? ` · ${linked} linked` : ''}`

  return (
    <>
      <div className="app-sky" style={{ backgroundImage: `url(${skyUrl})` }} />
      <div className="rbtn" style={{ left: 18, top: 50 }}>
        <Ellipsis size={20} strokeWidth={3} />
      </div>
      <div className="rbtn" style={{ right: 18, top: 54 }}>
        <RotateCw size={19} />
      </div>
      <div className="page-title">{empty ? 'SpaceChat' : 'Discover'}</div>
      <div className="page-sub fade" data-off={empty ? '' : undefined}>
        {sub}
      </div>

      {/* the empty room */}
      <div className="pulse" data-off={empty ? undefined : ''}>
        <i />
        <i />
        <i />
      </div>
      <div className="empty" data-off={empty ? undefined : ''}>
        <div className="empty__t">Discover</div>
        <div className="empty__a">devices nearby</div>
        <div className="empty__b">Make connections. Chat offline.</div>
      </div>

      {/* the map */}
      <svg width="390" height="844" style={{ position: 'absolute', inset: 0, zIndex: 5 }} aria-hidden="true">
        {peers.map((p) => {
          const len = Math.hypot(p.x - YOU.x, p.y - YOU.y)
          const show = !empty && !p.hidden
          return (
            <g key={p.id} style={{ opacity: show ? 1 : 0, transition: 'opacity .8s var(--ease)' }}>
              {p.state === 'offline' && <line x1={YOU.x} y1={YOU.y} x2={p.x} y2={p.y} stroke="rgba(255,255,255,.14)" strokeWidth="1" />}
              <line
                className={p.state === 'linking' ? 'dash-march' : undefined}
                x1={YOU.x}
                y1={YOU.y}
                x2={p.x}
                y2={p.y}
                strokeWidth="1.2"
                strokeDasharray="5 7"
                style={{ stroke: 'var(--linking)', opacity: p.state === 'linking' ? 0.9 : 0, transition: 'opacity .5s ease' }}
              />
              <line
                x1={YOU.x}
                y1={YOU.y}
                x2={p.x}
                y2={p.y}
                strokeWidth="1.5"
                style={{
                  stroke: 'var(--accent)',
                  strokeDasharray: len,
                  strokeDashoffset: p.state === 'linked' ? 0 : len,
                  transition: 'stroke-dashoffset 1.2s var(--ease)',
                }}
              />
            </g>
          )
        })}
      </svg>

      <div className="pstar pstar--you" style={{ left: YOU.x, top: YOU.y }} data-hidden={empty ? '' : undefined}>
        <div className="pstar__drift" style={{ animationDuration: '11s' }}>
          <span className="pstar__dot" />
          <span className="pstar__label">
            {YOU.name}
            <small>You</small>
          </span>
        </div>
      </div>
      {peers.map((p, i) => (
        <div
          key={p.id}
          className="pstar pstar--peer"
          data-state={p.state}
          data-hidden={empty || p.hidden ? '' : undefined}
          style={{ left: p.x, top: p.y, ['--d' as string]: `${0.15 + i * 0.22}s` }}
        >
          <div className="pstar__drift" style={{ animationDuration: `${8 + i * 2}s`, animationDelay: `${-i * 3}s` }}>
            <span className="pstar__dot" />
            <span className="pstar__label">
              {p.name}
              <small>{STATE_WORD[p.state]}</small>
            </span>
          </div>
        </div>
      ))}

      {hint && (
        <div className="app-hint fade" data-off={empty || !peers.some((p) => p.state === 'nearby' && !p.hidden) ? '' : undefined}>
          Tap a nearby star to form a connection
        </div>
      )}
      <div className="fab">
        <MessageCircleMore size={23} />
      </div>
      <div className="homebar" />
    </>
  )
}

/* ───────────── Chats list ───────────── */
export function ChatsScreen() {
  return (
    <>
      <div className="page-title">Chats</div>
      <div className="chat-row" style={{ top: 112, ['--d' as string]: '0.25s' }}>
        <div className="avatar">R</div>
        <div className="chat-row__main">
          <div className="chat-row__top">
            <span className="chat-row__name">Rezaaa</span>
            <span className="chat-row__time">3:53 AM</span>
          </div>
          <div className="chat-row__bot">
            <span className="chat-row__msg">Ohh it didn't take much time</span>
            <span className="unread" />
          </div>
        </div>
      </div>
      <div className="chat-row" style={{ top: 202, ['--d' as string]: '0.4s' }}>
        <div className="avatar avatar--quiet">N</div>
        <div className="chat-row__main">
          <div className="chat-row__top">
            <span className="chat-row__name">Nova</span>
            <span className="chat-row__time">Yesterday</span>
          </div>
          <div className="chat-row__bot">
            <span className="chat-row__msg">On my way</span>
          </div>
        </div>
      </div>
      <div className="fab">
        <Compass size={22} />
      </div>
      <div className="homebar" />
    </>
  )
}

/* ───────────── Conversation ───────────── */
export type Msg = {
  id: string
  from: 'me' | 'them'
  time: string
  text?: string
  file?: string
  photo?: boolean
  voice?: string
  reply?: { who: string; text: string }
}
export const DEFAULT_MSGS: Msg[] = [
  { id: 'a', from: 'them', text: 'Heyyy', time: '12:30 AM' },
  { id: 'b', from: 'me', text: 'Suppp', time: '12:30 AM' },
  { id: 'c', from: 'me', photo: true, time: '12:31 AM' },
  { id: 'd', from: 'me', file: 'ProjectByAliRazaShah.zip', time: '12:33 AM' },
  { id: 'e', from: 'them', voice: '0:07', time: '3:52 AM' },
  { id: 'f', from: 'them', text: "Ohh it didn't take much time", time: '3:53 AM' },
  { id: 'g', from: 'me', text: 'Donee', reply: { who: 'Rezaaa', text: "Ohh it didn't take much time" }, time: '3:55 AM' },
]
const BARS = [10, 18, 12, 24, 16, 8, 20, 26, 14, 10, 18, 22, 12, 8, 16, 20, 10, 14]

export function ChatScreen({
  name = 'Rezaaa',
  msgs = DEFAULT_MSGS,
  shown,
  plusOpen = false,
}: {
  name?: string
  msgs?: Msg[]
  shown?: number
  plusOpen?: boolean
}) {
  const list = shown === undefined ? msgs : msgs.slice(0, shown)
  return (
    <>
      <div className="chat-head">
        <ChevronLeft className="chat-head__back" size={28} />
        <div className="avatar chat-head__avatar">{name[0]}</div>
        <div className="chat-head__name">{name}</div>
        <div className="chat-head__status">
          <i />
          Linked · just now
        </div>
        <Ellipsis className="chat-head__more" size={22} />
      </div>

      <div className="msgs">
        {list.map((m) => (
          <div key={m.id} className={`bubble bubble--${m.from}`}>
            {m.reply && (
              <div className="reply">
                <b>{m.reply.who}</b>
                {m.reply.text}
              </div>
            )}
            {m.file ? (
              <div className="file">
                <span className="file__ic">
                  <FileIcon size={20} />
                </span>
                <div>
                  <div className="file__name">{m.file}</div>
                  <div className="file__sub">Tap to open</div>
                </div>
              </div>
            ) : m.photo ? (
              <div className="photo">
                <svg viewBox="0 0 188 118" aria-hidden="true">
                  <rect width="188" height="118" fill="#1a1a36" />
                  <circle cx="140" cy="34" r="12" fill="var(--accent-edge)" opacity=".85" />
                  <path d="M0 118V84l44-34 36 28 32-22 76 52v10z" fill="#0d0d1a" />
                  <path d="M0 118V98l52-26 40 22 38-14 58 38z" fill="#070712" />
                </svg>
              </div>
            ) : m.voice ? (
              <div className="voice">
                <span className="voice__play">
                  <Play size={15} fill="currentColor" />
                </span>
                <span className="voice__bars">
                  {BARS.map((h, i) => (
                    <i key={i} style={{ height: h }} />
                  ))}
                </span>
                <span className="voice__t">{m.voice}</span>
              </div>
            ) : (
              m.text
            )}
            <div className="bubble__meta">
              {m.time}
              {m.from === 'me' && <span className="bubble__tick" />}
            </div>
          </div>
        ))}
      </div>

      <div className="orbs" data-open={plusOpen ? '' : undefined}>
        <span className="orb">
          <Camera size={22} />
        </span>
        <span className="orb">
          <ImageIcon size={22} />
        </span>
        <span className="orb">
          <FileIcon size={22} />
        </span>
      </div>
      <div className="composer" data-open={plusOpen ? '' : undefined}>
        <span className="composer__plus">
          <Plus size={26} strokeWidth={1.6} />
        </span>
        <span className="grow">Message…</span>
        <Mic size={22} color="var(--accent)" />
      </div>
      <div className="homebar" />
    </>
  )
}

/* ───────────── Settings (matches the real screen) ───────────── */
const SW = [
  { name: 'Nebula', tag: 'Default' },
  { name: 'Crimson', tag: 'Ember' },
  { name: 'Tide', tag: 'Turquoise' },
  { name: 'Aurora', tag: 'Signal' },
  { name: 'Flare', tag: 'Solar' },
  { name: 'Nova', tag: 'Magenta' },
]
const MINI_PEERS: Peer[] = [
  { id: 'nova', name: 'Nova', x: 292, y: 258, state: 'linked' },
  { id: 'tide', name: 'Tide', x: 90, y: 560, state: 'nearby' },
]
const MINI_MSGS: Msg[] = [
  { id: '1', from: 'them', text: 'Linked.', time: '7:11 PM' },
  { id: '2', from: 'me', text: 'On my way', time: '7:12 PM' },
]

/** A live, scaled-down copy of a real screen, as the app shows in Settings. */
function Mini({ children }: { children: React.ReactNode }) {
  return (
    <div className="mini">
      <div className="mini__in">{children}</div>
    </div>
  )
}

export function SettingsScreen({
  selected = 0,
  colors,
  hours = 24,
  scroll = 0,
}: {
  selected?: number
  colors: readonly string[]
  hours?: number
  /** how far the content has scrolled, in px */
  scroll?: number
}) {
  return (
    <div className="set">
      <div className="set__head">
        <X size={30} strokeWidth={2.2} className="set__x" />
        <span>Settings</span>
      </div>
      <div className="set__body" style={{ transform: `translate3d(0, ${-scroll}px, 0)` }}>
        <h3 className="set__h" style={{ top: 98 }}>
          Appearance
        </h3>
        <h4 className="set__h2" style={{ top: 138 }}>
          Accent color
        </h4>
        <p className="set__p" style={{ top: 166 }}>
          Chrome, orbs, chat, and glow across SpaceChat follow this color.
        </p>

        {SW.map((sw, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <div key={sw.name} className="swt" style={{ left: 27.5 + col * 111.5, top: 208 + row * 109 }}>
              <span className="swt__ring" data-on={i === selected ? '' : undefined}>
                <span className="swt__dot" style={{ background: colors[i] }}>
                  <Check size={18} strokeWidth={2.6} color={i === 4 || i === 3 ? '#050508' : '#fff'} />
                </span>
              </span>
              <span className="swt__n" data-on={i === selected ? '' : undefined}>
                {sw.name}
              </span>
              <span className="swt__t">{sw.tag}</span>
            </div>
          )
        })}

        <div className="set__prev" style={{ top: 440 }}>
          <div>
            <Mini>
              <DiscoverScreen peers={MINI_PEERS} hint={false} />
              <StatusBar time="9:41" />
            </Mini>
            <span>Discover</span>
          </div>
          <div>
            <Mini>
              <ChatScreen name="Nova" msgs={MINI_MSGS} />
              <StatusBar time="9:41" />
            </Mini>
            <span>Chat</span>
          </div>
        </div>

        <h3 className="set__h" style={{ top: 762 }}>
          Privacy &amp; data
        </h3>
        <h4 className="set__h2" style={{ top: 802 }}>
          Auto-delete messages
        </h4>
        <p className="set__p" style={{ top: 830 }}>
          How long chats stay on this device
        </p>
        <div className="set__pills" style={{ top: 862 }}>
          {[12, 24, 48].map((h) => (
            <b key={h} data-on={h === hours ? '' : undefined}>
              {h}h
            </b>
          ))}
        </div>
      </div>
      <div className="homebar" />
    </div>
  )
}

/* ───────────── First open ───────────── */
export function FirstOpenScreen({ step, typed }: { step: 0 | 1; typed: string }) {
  return (
    <div className="first" data-step={step}>
      <div className="first__mark">
        <Mark size={140} variant="field" starColor="#c79bff" />
      </div>
      <div className="first__welcome">
        <h4>Welcome to SpaceChat</h4>
        <p>Make connections. Chat offline.</p>
      </div>
      <div className="first__name">
        <div className="first__orb" data-on={typed ? '' : undefined}>
          {typed[0]?.toUpperCase()}
        </div>
        <div className="first__field">{typed ? <span>{typed}</span> : <em>Your name</em>}<u /></div>
      </div>
      <div className="first__btn">{step === 0 ? 'Continue' : 'Enter'}</div>
    </div>
  )
}

/** Plays the welcome step, then types a name so the first letter pops into its orb. */
export function useFirstOpenLoop() {
  const [step, setStep] = useState<0 | 1>(0)
  const [typed, setTyped] = useState('')
  useEffect(() => {
    const name = 'Aleereza'
    const timers: number[] = []
    const run = () => {
      setStep(0)
      setTyped('')
      timers.push(window.setTimeout(() => setStep(1), 2600))
      for (let i = 1; i <= name.length; i++) timers.push(window.setTimeout(() => setTyped(name.slice(0, i)), 4000 + i * 230))
      timers.push(window.setTimeout(run, 4000 + name.length * 230 + 4200))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [])
  return { step, typed }
}
