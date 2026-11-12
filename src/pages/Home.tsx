import { Footer } from '@/components/Chrome'
import Hero from '@/sections/Hero'
import Sequence from '@/sections/Sequence'
import Room from '@/sections/Room'
import LinkBeats from '@/sections/LinkBeats'
import Facts from '@/sections/Facts'
import Colors from '@/sections/Colors'
import FilePath from '@/sections/FilePath'
import NoServer from '@/sections/Privacy'
import Install from '@/sections/Install'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Sequence />
        <Room />
        <LinkBeats />
        <Facts />
        <Colors />
        <FilePath />
        <NoServer />
        <Install />
      </main>
      <Footer />
    </>
  )
}
