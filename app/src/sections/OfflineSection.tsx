import { useEffect, useRef } from 'react';

export default function OfflineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const textEls = textRef.current?.querySelectorAll('.reveal-text');
            textEls?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
            });
            if (imageRef.current) {
              imageRef.current.style.opacity = '1';
              imageRef.current.style.transform = 'translateY(0)';
            }
            // Device connection animation
            const devices = devicesRef.current?.querySelectorAll('.device-node');
            devices?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'scale(1)';
              }, 300 + i * 200);
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
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Device mesh visualization */}
          <div className="flex-1 order-1 relative h-[400px] md:h-[500px]">
            <div
              ref={devicesRef}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Central device */}
              <div
                className="device-node absolute w-16 h-24 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(0,238,255,0.1)',
                  border: '1px solid rgba(0,238,255,0.3)',
                  opacity: 0,
                  transform: 'scale(0)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 30px rgba(0,238,255,0.15)',
                }}
              >
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                  <rect x="2" y="2" width="20" height="32" rx="3" stroke="#00eeff" strokeWidth="1.5" />
                  <circle cx="12" cy="30" r="1.5" fill="#00eeff" />
                </svg>
              </div>
              {/* Satellite devices */}
              {[
                { x: -120, y: -80, delay: 0 },
                { x: 120, y: -60, delay: 1 },
                { x: -100, y: 90, delay: 2 },
                { x: 110, y: 80, delay: 3 },
              ].map((pos, i) => (
                <div key={i}>
                  <div
                    className="device-node absolute w-12 h-18 rounded-lg flex items-center justify-center"
                    style={{
                      top: `calc(50% + ${pos.y}px)`,
                      left: `calc(50% + ${pos.x}px)`,
                      transform: 'translate(-50%, -50%) scale(0)',
                      background: 'rgba(189,0,255,0.08)',
                      border: '1px solid rgba(189,0,255,0.2)',
                      opacity: 0,
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 0 20px rgba(189,0,255,0.1)',
                    }}
                  >
                    <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
                      <rect x="1" y="1" width="16" height="26" rx="2" stroke="rgba(189,0,255,0.5)" strokeWidth="1" />
                    </svg>
                  </div>
                  {/* Connection line */}
                  <div
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      width: `${Math.hypot(pos.x, pos.y)}px`,
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(0,238,255,0.2), rgba(189,0,255,0.2))',
                      transform: `rotate(${Math.atan2(pos.y, pos.x)}rad)`,
                      transformOrigin: '0 50%',
                      opacity: 0.3,
                      animation: 'linePulse 2s ease-in-out infinite',
                    }}
                  />
                </div>
              ))}
              {/* Sync ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-[#00eeff]/10"
                style={{
                  animation: 'nodePulse 4s ease-in-out infinite',
                }}
              />
            </div>

            {/* Image overlay */}
            <div
              ref={imageRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-[#00eeff]/5 blur-3xl" />
                <img
                  src="/feature-offline.jpg"
                  alt="SpaceChat Offline"
                  className="relative w-[220px] md:w-[280px] rounded-3xl shadow-2xl"
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,238,255,0.1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="flex-1 order-2">
            <div
              className="reveal-text inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-[#00eeff] mb-6"
              style={{
                background: 'rgba(0,238,255,0.08)',
                border: '1px solid rgba(0,238,255,0.15)',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Offline First
            </div>
            <h2
              className="reveal-text text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-6"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              No cloud required
            </h2>
            <p
              className="reveal-text text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              The core story needs zero internet. When peers come in range, sync
              happens automatically. Messages queue when apart, deliver when
              together. It's resilient, censorship-resistant, and works wherever
              humans gather — concerts, protests, deserts, deep underground.
            </p>
            <div
              className="reveal-text flex items-center gap-3 text-white/40 text-sm"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00eeff] animate-node-pulse" />
              Auto-sync when peers are in range
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
