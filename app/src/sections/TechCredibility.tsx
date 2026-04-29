import { useEffect, useRef } from 'react';

const techItems = [
  {
    title: 'Expo Dev Client',
    desc: 'Native module development with full control. Not limited by Expo Go — we ship a custom dev build.',
  },
  {
    title: 'New Architecture',
    desc: 'React Native New Architecture ready. Fabric renderer and TurboModules for the future of native.',
  },
  {
    title: 'space-transport',
    desc: 'Our native module bridging JavaScript to platform P2P APIs. Bluetooth LE, Wi-Fi Direct, Nearby Connections.',
  },
  {
    title: 'Zustand Stores',
    desc: 'Lightweight, fast state management. PeerManager, MessageManager, SyncEngine — each a focused service.',
  },
  {
    title: 'SQLCipher Ready',
    desc: 'Local SQLite with optional encryption. Your messages are yours, locked behind your device key.',
  },
  {
    title: 'Phase 1 → Phase 2',
    desc: 'Foundations today: theme, crypto, storage, mesh abstraction, SimulatedTransport. Real native transport next.',
  },
];

export default function TechCredibility() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = gridRef.current?.querySelectorAll('.tech-card');
            cards?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-white/40 mb-6"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Built for engineers
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-4">
              Tech that earns trust
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              No jargon. Just the stack choices that make SpaceChat possible.
            </p>
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {techItems.map((item, i) => (
              <div
                key={i}
                className="tech-card glass-blur rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <h3 className="text-white font-medium text-base mb-2 group-hover:text-[#00eeff] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
