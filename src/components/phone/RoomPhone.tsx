import { ChatScreen, ChatsScreen, DEFAULT_MSGS, DiscoverScreen, SettingsScreen, StatusBar, type Peer } from './screens'
import { ACCENTS } from '@/config'

/**
 * The room, as one phone driven by scroll. `scene` is 0..3 (Discover, Link,
 * Chat, You) and `t` is progress through that scene, 0..1. Nothing here runs on
 * a timer: scroll forward and the phone lives, scroll back and it rewinds.
 */
const ease = (x: number) => x * x * (3 - 2 * x)

/** Which accent the Settings scene is showing, from its progress. Used by the parent to recolor the frame. */
export function settingsAccent(t: number) {
  if (t < 0.1) return 0
  if (t < 0.7) return Math.min(5, 1 + Math.floor((t - 0.1) / 0.12))
  return 0
}

export default function RoomPhone({ scene, t }: { scene: number; t: number }) {
  const showChats = scene === 2 && t < 0.16
  const cur = scene <= 1 ? 0 : scene === 2 ? (showChats ? 1 : 2) : 3
  const cls = (i: number) => `app-layer ${i < cur ? 'is-before' : i > cur ? 'is-after' : 'is-current'}`

  // Discover: the room is empty, then the stars come in.
  const empty = scene === 0 && t < 0.3
  // Link: nearby -> linking -> linked
  const rez = scene < 1 ? 'nearby' : scene === 1 ? (t < 0.34 ? 'nearby' : t < 0.68 ? 'linking' : 'linked') : 'linked'
  const peers: Peer[] = [
    { id: 'rezaaa', name: 'Rezaaa', x: 285, y: 460, state: rez },
    { id: 'tide', name: 'Tide', x: 92, y: 628, state: 'nearby' },
    { id: 'nova', name: 'Nova', x: 262, y: 650, state: 'nearby' },
  ]

  const chatT = scene === 2 ? Math.max(0, (t - 0.16) / 0.84) : scene > 2 ? 1 : 0
  const shown = Math.min(DEFAULT_MSGS.length, Math.floor(chatT * (DEFAULT_MSGS.length + 1.4)))
  const plusOpen = scene === 2 && chatT > 0.94

  const time = scene === 0 ? '3:52' : scene === 1 ? '3:53' : '3:55'
  return (
    <>
      <div className={cls(0)}>
        <DiscoverScreen peers={peers} empty={empty} />
      </div>
      <div className={cls(1)}>
        <ChatsScreen />
      </div>
      <div className={cls(2)}>
        <ChatScreen shown={shown} plusOpen={plusOpen} />
      </div>
      <div className={cls(3)}>
        <SettingsScreen colors={ACCENTS.map((a) => a.hex)} selected={scene === 3 ? settingsAccent(t) : 0} scroll={scene === 3 ? ease(Math.min(1, Math.max(0, (t - 0.45) / 0.45))) * 346 : 0} />
      </div>
      <StatusBar time={time} />
    </>
  )
}
