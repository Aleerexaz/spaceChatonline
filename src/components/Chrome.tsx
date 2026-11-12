import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Mark from './Mark'
import Btn from './Button'
import { Headline, Reveal } from '@/hooks/useReveal'
import { LEGAL, NAV } from '@/config'
import { onScrollTick, scrollToTarget } from '@/lib/scroll'

export function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const home = pathname === '/'

  useEffect(
    () =>
      onScrollTick(() => {
        setScrolled(window.scrollY > 16)
        if (!home) return setActive(null)
        let cur: string | null = null
        for (const it of NAV) {
          const el = document.getElementById(it.hash)
          if (!el) continue
          const r = el.getBoundingClientRect()
          if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.35) cur = it.hash
        }
        setActive(cur)
      }),
    [home],
  )

  const go = (hash: string) => (home ? scrollToTarget(hash) : navigate(`/#${hash}`))

  return (
    <header className="nav" data-scrolled={scrolled || !home ? '' : undefined}>
      <div className="wrap nav__row">
        <Link to="/" className="nav__brand" aria-label="SpaceChat, home">
          <Mark size={28} variant="tile" />
          SpaceChat
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {NAV.map((it) => (
            <button key={it.hash} className="nav__link" data-active={active === it.hash ? '' : undefined} onClick={() => go(it.hash)}>
              {it.label}
            </button>
          ))}
        </nav>
        <Btn to="/download" label="Download" size="sm" />
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Headline className="footer__big" lines={['Make connections.', 'Chat offline.']} />
        <Reveal className="footer__row" delay={0.2}>
          <nav className="footer__links" aria-label="Footer">
            <Link to="/download">Android</Link>
            {LEGAL.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} SpaceChat</span>
        </Reveal>
      </div>
    </footer>
  )
}
