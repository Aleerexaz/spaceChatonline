import { useEffect, useRef } from 'react';

export default function SecuritySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

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
              imageRef.current.style.transform = 'scale(1)';
            }
            // Trust network animation
            const nodes = trustRef.current?.querySelectorAll('.trust-node');
            nodes?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'scale(1)';
              }, 400 + i * 150);
            });
            const lines = trustRef.current?.querySelectorAll('.trust-line');
            lines?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
              }, 700 + i * 200);
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
      id="security"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Trust network visualization + Image */}
          <div className="flex-1 order-1 relative">
            <div
              ref={imageRef}
              className="flex justify-center"
              style={{
                opacity: 0,
                transform: 'scale(0.9)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-[#bd00ff]/5 blur-3xl" />
                <img
                  src="/feature-security.jpg"
                  alt="SpaceChat Security"
                  className="relative w-[280px] md:w-[340px] rounded-3xl shadow-2xl"
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(189,0,255,0.1)',
                  }}
                />
              </div>
            </div>

            {/* Trust network overlay */}
            <div
              ref={trustRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Central lock */}
              <div
                className="trust-node absolute w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0,238,255,0.1)',
                  border: '1px solid rgba(0,238,255,0.3)',
                  opacity: 0,
                  transform: 'scale(0)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 20px rgba(0,238,255,0.2)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00eeff" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              {/* Surrounding trust nodes */}
              {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 80;
                return (
                  <div key={i}>
                    <div
                      className="trust-node absolute w-6 h-6 rounded-full"
                      style={{
                        top: `calc(50% + ${Math.sin(rad) * dist}px)`,
                        left: `calc(50% + ${Math.cos(rad) * dist}px)`,
                        transform: 'translate(-50%, -50%) scale(0)',
                        background: 'rgba(189,0,255,0.15)',
                        border: '1px solid rgba(189,0,255,0.3)',
                        opacity: 0,
                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <div
                      className="trust-line absolute"
                      style={{
                        top: '50%',
                        left: '50%',
                        width: `${dist}px`,
                        height: '1px',
                        background: 'linear-gradient(90deg, rgba(0,238,255,0.3), rgba(189,0,255,0.3))',
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '0 50%',
                        opacity: 0,
                        transition: 'opacity 0.8s ease-out',
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="flex-1 order-2">
            <div
              className="reveal-text inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-[#bd00ff] mb-6"
              style={{
                background: 'rgba(189,0,255,0.08)',
                border: '1px solid rgba(189,0,255,0.15)',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Security & Identity
            </div>
            <h2
              className="reveal-text text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-6"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Keys you control
            </h2>
            <p
              className="reveal-text text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Public-key identities derived from your device. Fingerprint
              verification for trust. Encrypted payloads that only the recipient
              can open. Local SQLite storage with optional SQLCipher — your data
              stays in your hands, not a corporation's database.
            </p>
            <div
              className="reveal-text flex items-center gap-3 text-white/40 text-sm"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#bd00ff] animate-node-pulse" />
              End-to-end encrypted by default
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
