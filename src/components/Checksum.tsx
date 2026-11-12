import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { APP } from '@/config'

export default function Checksum() {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(APP.sha256)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* clipboard can be blocked; the hash is still selectable text */
    }
  }
  return (
    <div className="sha">
      <p className="kicker">SHA-256</p>
      <div className="sha__row">
        <code className="sha__code">{APP.sha256}</code>
        <button className="sha__copy" onClick={copy} aria-label="Copy SHA-256">
          {done ? <Check size={16} /> : <Copy size={16} />}
          <span>{done ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  )
}
