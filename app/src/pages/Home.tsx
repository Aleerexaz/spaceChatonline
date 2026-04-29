import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import WhatIsSection from '@/sections/WhatIsSection';
import DiscoverSection from '@/sections/DiscoverSection';
import NetworkSection from '@/sections/NetworkSection';
import ChatsSection from '@/sections/ChatsSection';
import SecuritySection from '@/sections/SecuritySection';
import MessagesFilesSection from '@/sections/MessagesFilesSection';
import OfflineSection from '@/sections/OfflineSection';
import HowItWorks from '@/sections/HowItWorks';
import TechCredibility from '@/sections/TechCredibility';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Parallax signal effect on scroll
    lenis.on('scroll', (e: { velocity: number }) => {
      const signals = document.querySelectorAll('.parallax-signal');
      signals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const distanceToCenter =
          rect.top + rect.height / 2 - window.innerHeight / 2;
        (el as HTMLElement).style.transform = `translateY(${distanceToCenter * 0.05}px)`;
        (el as HTMLElement).style.fontStyle =
          Math.abs(e.velocity) > 1 ? 'italic' : 'normal';
      });
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <StarfieldCanvas />
      <CustomCursor />
      <Navigation />

      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <WhatIsSection />
        <DiscoverSection />
        <NetworkSection />
        <ChatsSection />
        <SecuritySection />
        <MessagesFilesSection />
        <OfflineSection />
        <HowItWorks />
        <TechCredibility />
        <Footer />
      </main>
    </div>
  );
}
