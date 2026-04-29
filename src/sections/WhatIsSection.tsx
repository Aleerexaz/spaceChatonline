import { useEffect, useRef } from 'react';

export default function WhatIsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = textRef.current?.querySelectorAll('.reveal-text');
            els?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80dvh] flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={textRef}>
            <div
              className="reveal-text inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-white/40 mb-8"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              What is SpaceChat
            </div>

            <h2
              className="reveal-text text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-8"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              A local mesh for human connection.
              <br />
              <span className="text-white/40">Encrypted. Offline. Yours.</span>
            </h2>

            <p
              className="reveal-text text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              SpaceChat is a peer-to-peer messaging app that works without a central
              server. Devices discover each other directly — via Bluetooth, Wi-Fi,
              or Nearby Connections — and form a mesh network. Messages route
              through the mesh, encrypted end-to-end, stored only on your device.
            </p>

            <div
              className="reveal-text grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              {[
                { label: 'Phase 1', desc: 'Theme, crypto, storage, mesh abstraction, SimulatedTransport for dev' },
                { label: 'Now', desc: 'Foundations solid. Building native transport integration.' },
                { label: 'Phase 2', desc: 'Real native modules: Nearby, Wi-Fi Direct. iOS exploration.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass-blur rounded-xl p-5 text-left hover:border-white/15 transition-all duration-300"
                >
                  <div className="text-xs font-medium uppercase tracking-widest text-white/30 mb-2">
                    {item.label}
                  </div>
                  <div className="text-sm text-white/50 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
