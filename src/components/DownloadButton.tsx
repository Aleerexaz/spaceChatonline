import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, ArrowDown, Check, ShieldCheck } from 'lucide-react'
import { RollText, useMagnet } from './Button'
import { APP } from '@/config'

type Phase = 'idle' | 'morph' | 'loading' | 'verify' | 'done' | 'error' | 'mismatch'
const R = 27
const C = 2 * Math.PI * R
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const mb = (n: number) => (n / 1e6).toFixed(1)

/**
 * Downloads the APK itself so it can show real progress, then checks the file's
 * SHA-256 against the one on this page BEFORE handing it to the phone.
 * A file that does not match is never saved.
 */
export default function DownloadButton({ variant = 'solid' }: { variant?: 'solid' | 'ink' }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [p, setP] = useState(0)
  const [got, setGot] = useState(0)
  const [total, setTotal] = useState(0)
  const [note, setNote] = useState('')
  const [w, setW] = useState<number | undefined>()
  const abort = useRef<AbortController | null>(null)
  const { ref, handlers } = useMagnet<HTMLButtonElement>()

  // keep the idle width, so the pill can shrink to a circle and grow back exactly
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      if (el.dataset.phase === 'idle') setW(el.offsetWidth)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])
  useEffect(() => () => abort.current?.abort(), [])

  const reset = () => {
    abort.current?.abort()
    setPhase('idle')
    setP(0)
    setNote('')
  }

  const plainDownload = () => {
    const a = document.createElement('a')
    a.href = APP.apkUrl
    a.download = APP.apkFile
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const start = async () => {
    abort.current?.abort()
    const ac = new AbortController()
    abort.current = ac
    setNote('')
    setP(0)
    setGot(0)
    setTotal(0)
    setPhase('morph')
    await wait(700)
    if (ac.signal.aborted) return
    setPhase('loading')
    try {
      const res = await fetch(APP.apkUrl, { signal: ac.signal })
      const type = res.headers.get('content-type') ?? ''
      if (!res.ok || type.includes('text/html')) throw new Error('missing')
      const len = Number(res.headers.get('content-length') ?? 0)
      if (!res.body || !window.crypto?.subtle || len > 450e6) {
        plainDownload()
        setNote('Download started. Compare the SHA-256 below before you install.')
        setPhase('done')
        return
      }
      setTotal(len)
      const reader = res.body.getReader()
      const chunks: Uint8Array<ArrayBuffer>[] = []
      let received = 0
      let last = 0
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value as Uint8Array<ArrayBuffer>)
        received += value.length
        const now = performance.now()
        if (now - last > 60) {
          last = now
          setGot(received)
          setP(len ? received / len : -1)
        }
      }
      setGot(received)
      setP(1)
      setPhase('verify')
      const blob = new Blob(chunks, { type: 'application/vnd.android.package-archive' })
      const [digest] = await Promise.all([crypto.subtle.digest('SHA-256', await blob.arrayBuffer()), wait(1100)])
      if (ac.signal.aborted) return
      const hex = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
      if (hex !== APP.sha256) {
        setPhase('mismatch')
        setNote('This file does not match the SHA-256 on this page, so it was not saved. Do not install it from anywhere else.')
        return
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = APP.apkFile
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
      setNote(`SHA-256 ${APP.sha256.slice(0, 8)}…${APP.sha256.slice(-6)} matches. It is in your downloads.`)
      setPhase('done')
    } catch (e) {
      if (ac.signal.aborted) return
      setPhase('error')
      setNote(e instanceof Error && e.message === 'missing' ? 'The APK is not published on this server yet.' : 'The download was interrupted. Check your connection and try again.')
      setTimeout(() => setPhase((cur) => (cur === 'error' ? 'idle' : cur)), 3200)
    }
  }

  const active = phase === 'morph' || phase === 'loading' || phase === 'verify'
  const circle = active || phase === 'error' || phase === 'mismatch'
  const H = 64
  const label = active ? 'Cancel download' : `Download ${APP.apkFile}`
  const status =
    phase === 'verify'
      ? ['Checking SHA-256', 'Comparing with the checksum on this page']
      : phase === 'loading' || phase === 'morph'
        ? [`Downloading ${APP.apkFile}`, total ? `${mb(got)} of ${mb(total)} MB` : got ? `${mb(got)} MB received` : 'Connecting…']
        : phase === 'error'
          ? ['Not available', note]
          : phase === 'mismatch'
            ? ['Checksum mismatch', 'Nothing was saved']
            : ['', '']

  return (
    <div className="dlb" data-variant={variant} data-phase={phase} style={{ minWidth: w }}>
      <div className="dlb__row">
        <button
          ref={ref}
          data-phase={phase}
          className={`btn btn--lg dlb__btn btn--${variant === 'ink' ? 'ink' : 'solid'}`}
          style={{ width: circle ? H : phase === 'idle' || phase === 'done' ? w : undefined }}
          aria-label={label}
          onClick={() => (active ? reset() : start())}
          {...(phase === 'idle' ? handlers : {})}
        >
          <span className="btn__fill" aria-hidden="true" />
          {/* idle */}
          <span className="dlb__idle">
            <span className="btn__in">
              <span className="btn__ic">
                <ArrowDown size={20} />
              </span>
              <RollText text={`Download ${APP.apkFile}`} />
            </span>
          </span>
          {/* ring */}
          <span className="dlb__ring" aria-hidden="true">
            <svg viewBox="0 0 64 64" className={p < 0 || phase === 'verify' ? 'is-spin' : ''}>
              <circle className="dlb__track" cx="32" cy="32" r={R} />
              <circle
                className="dlb__arc"
                cx="32"
                cy="32"
                r={R}
                strokeDasharray={p < 0 || phase === 'verify' ? `${C * 0.28} ${C}` : C}
                strokeDashoffset={p < 0 || phase === 'verify' ? 0 : C * (1 - Math.max(0, p))}
              />
            </svg>
            <span className="dlb__core">
              {phase === 'morph' && <ArrowDown size={22} className="dlb__drop" />}
              {phase === 'loading' && <b>{p < 0 ? '' : Math.round(p * 100)}</b>}
              {phase === 'verify' && <ShieldCheck size={22} />}
              {(phase === 'error' || phase === 'mismatch') && <AlertTriangle size={22} />}
            </span>
          </span>
          {/* done */}
          <span className="dlb__done">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
            </svg>
            Saved. Checksum verified
          </span>
        </button>

        <div className="dlb__status" aria-live="polite" data-on={status[0] ? '' : undefined}>
          <b>{status[0]}</b>
          <span>{status[1]}</span>
        </div>
        {phase === 'done' && <span className="dlb__burst" aria-hidden="true" />}
      </div>
      <p className="dlb__note mono" data-on={note && (phase === 'done' || phase === 'mismatch') ? '' : undefined} role={phase === 'mismatch' ? 'alert' : undefined}>
        <Check size={13} className="dlb__tick" />
        {note}
      </p>
    </div>
  )
}
