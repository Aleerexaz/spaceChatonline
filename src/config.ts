/**
 * Facts and links that must be filled in by the owner.
 * Put the signed APK in /public and keep APK_URL in sync with its file name.
 */
export const APP = {
  version: '1.0.0',
  packageName: 'com.spacechat.app',
  size: 'About 94 MB',
  minAndroid: 'Android 7 and later',
  apkUrl: '/SpaceChat.apk',
  apkFile: 'SpaceChat.apk',
  sha256: '8993FD98F551D52DEB974BD9466E218034CF5B3C01BD78295A1A26E93D7BB42B',
} as const

/** Any value left empty is simply not rendered, so the site never ships dead links. */
export const CONTACT = {
  email: '',
} as const

export const UPDATED = 'November 11, 2026'

export const NAV = [
  { label: 'Room', hash: 'room' },
  { label: 'Link', hash: 'link' },
  { label: 'File', hash: 'file' },
  { label: 'Privacy', hash: 'privacy' },
] as const

export const LEGAL = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Acceptable use', to: '/acceptable-use' },
  { label: 'Permissions', to: '/permissions' },
  { label: 'Notices', to: '/notices' },
] as const

export const ACCENTS = [
  { id: 'nebula', name: 'Nebula', hex: '#7F00FF' },
  { id: 'crimson', name: 'Crimson', hex: '#CC0000' },
  { id: 'tide', name: 'Tide', hex: '#00CED1' },
  { id: 'aurora', name: 'Aurora', hex: '#00FF00' },
  { id: 'flare', name: 'Flare', hex: '#FFFF00' },
  { id: 'nova', name: 'Nova', hex: '#FF00FF' },
] as const
export type Accent = (typeof ACCENTS)[number]

/** Text on a bright accent has to flip to near-black to stay readable. */
export function onAccent(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const lin = (c: number) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  const l = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  return l > 0.34 ? '#050508' : '#ffffff'
}
