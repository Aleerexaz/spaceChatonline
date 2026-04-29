import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = textRef.current?.querySelectorAll('.animate-on-scroll');
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Central constellation nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px]">
          {/* Central hero node */}
          <div
            className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full animate-node-pulse"
            style={{
              background: 'radial-gradient(circle, #00eeff 0%, transparent 70%)',
              boxShadow: '0 0 30px rgba(0,238,255,0.5), 0 0 60px rgba(0,238,255,0.2)',
            }}
          />
          {/* Orbiting nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const dist = 120 + i * 20;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: `calc(50% + ${Math.sin(rad) * dist}px)`,
                  left: `calc(50% + ${Math.cos(rad) * dist}px)`,
                  background: i % 2 === 0 ? '#00eeff' : '#bd00ff',
                  opacity: 0.6,
                  boxShadow:
                    i % 2 === 0
                      ? '0 0 10px rgba(0,238,255,0.4)'
                      : '0 0 10px rgba(189,0,255,0.4)',
                  animation: `nodePulse ${3 + i * 0.5}s ease-in-out infinite`,
                }}
              />
            );
          })}
          {/* Distant constellation lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 600"
            fill="none"
          >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const dist = 120 + i * 20;
              const x2 = 300 + Math.cos(rad) * dist;
              const y2 = 300 + Math.sin(rad) * dist;
              return (
                <line
                  key={i}
                  x1={300}
                  y1={300}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0,238,255,0.1)"
                  strokeWidth={1}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Hero text */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <h1
          className="animate-on-scroll text-5xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.1] mb-6"
          style={{
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Offline messaging
          <br />
          <span className="text-gradient-cyan">without a server</span>
        </h1>
        <p
          className="animate-on-scroll text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Talk to people nearby. SpaceChat connects you directly — device to
          device — no cloud, no central server, no surveillance.
        </p>
        <div
          className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('download');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 rounded-full text-white font-medium text-base overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,238,255,0.2), rgba(189,0,255,0.2))',
              border: '1px solid rgba(0,238,255,0.3)',
              boxShadow: '0 0 20px rgba(0,238,255,0.1)',
            }}
          >
            <span className="relative z-10">Download the App</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,238,255,0.3), rgba(189,0,255,0.3))',
              }}
            />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full text-white/60 font-medium text-base hover:text-white hover:border-white/20 border border-white/10 transition-all duration-300"
          >
            How it works
          </button>
        </div>
      </div>
    </section>
  );
}
