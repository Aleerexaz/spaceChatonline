import type { ReactNode } from 'react'
import { Footer } from '@/components/Chrome'
import { Headline, Reveal } from '@/hooks/useReveal'
import { CONTACT, UPDATED } from '@/config'

export default function LegalLayout({ kicker, title, intro, children }: { kicker: string; title: string[]; intro: string; children: ReactNode }) {
  return (
    <>
      <main className="legal">
        <div className="wrap legal__wrap">
          <Reveal as="p" className="kicker" variant="fade" delay={0.15}>
            {kicker} · Updated {UPDATED}
          </Reveal>
          <Headline as="h1" className="legal__title" lines={title} delay={0.25} />
          <Reveal as="p" className="lede legal__intro" delay={0.6}>
            {intro}
          </Reveal>
          <div className="prose">{children}</div>
          {CONTACT.email && (
            <p className="prose__contact">
              Questions: <a className="tlink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
