import { useEffect, useRef } from 'react';

export default function DiscoverSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
              imageRef.current.style.transform = 'scale(1) translateX(0)';
            }
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
      id="discover"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content */}
          <div ref={textRef} className="flex-1 order-2 lg:order-1">
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
              Discover
            </div>
            <h2
              className="reveal-text text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-6"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Find your constellation
            </h2>
            <p
              className="reveal-text text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              A pannable, zoomable universe of peers. You at the center. Others
              appear as stars in your sky. A radar pulse scans for nearby
              devices. Tap to connect. No accounts, no sign-ups — just pure
              discovery.
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
              Bluetooth / Wi-Fi / Nearby discovery
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="flex-1 order-1 lg:order-2 flex justify-center"
            style={{
              opacity: 0,
              transform: 'scale(0.9) translateX(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-[#00eeff]/5 blur-3xl" />
              <img
                src="/feature-discover.jpg"
                alt="SpaceChat Discovery"
                className="relative w-[280px] md:w-[340px] rounded-3xl shadow-2xl"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,238,255,0.1)',
                }}
              />
              {/* Scan pulse ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] scan-pulse pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
