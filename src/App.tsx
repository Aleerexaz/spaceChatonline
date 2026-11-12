import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Lenis from 'lenis'
import { Nav } from '@/components/Chrome'
import Home from './pages/Home'
import DownloadPage from './pages/Download'
import { AcceptableUse, Notices, Permissions, Privacy, Terms } from './pages/Legal'
import { jumpTop, scrollToTarget, setScroller } from '@/lib/scroll'

/** New page: start at the top. A #hash: glide to that section once it exists. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return jumpTop()
    const id = hash.slice(1)
    let tries = 0
    let t: number
    const go = () => {
      if (document.getElementById(id)) scrollToTarget(id)
      else if (tries++ < 25) t = window.setTimeout(go, 60)
    }
    t = window.setTimeout(go, 80)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    setScroller(lenis)
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setScroller(null)
    }
  }, [])

  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/acceptable-use" element={<AcceptableUse />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
