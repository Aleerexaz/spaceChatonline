import { useEffect, useRef } from 'react';

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = contentRef.current?.querySelectorAll('.footer-reveal');
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="download"
      ref={sectionRef}
      className="relative w-full pt-[20vh] pb-12 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00eeff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          {/* CTA */}
          <h2
            className="footer-reveal text-4xl md:text-5xl lg:text-7xl font-normal text-white tracking-tight leading-tight mb-6"
            style={{
              opacity: 0,
              transform: 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Join the void
          </h2>
          <p
            className="footer-reveal text-lg text-white/40 mb-10 max-w-lg mx-auto"
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Download the app. Discover peers. Chat offline. Own your identity.
          </p>

          {/* Download button */}
          <div
            className="footer-reveal mb-20"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <button
              disabled
              className="relative px-12 py-5 rounded-full text-white font-medium text-lg overflow-hidden cursor-not-allowed"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 40px rgba(0,238,255,0.05)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Coming Soon
              </span>
              {/* Subtle glow animation */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,238,255,0.05), transparent)',
                  animation: 'beamFlow 3s linear infinite',
                  backgroundSize: '200% 100%',
                }}
              />
            </button>
            <p className="mt-4 text-sm text-white/20">
              Android-first. iOS in development.
            </p>
          </div>

          {/* Divider */}
          <div
            className="footer-reveal w-full h-px mb-10"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              opacity: 0,
              transition: 'opacity 1s ease-out 0.4s',
            }}
          />

          {/* Bottom row */}
          <div
            className="footer-reveal flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            }}
          >
            <div className="flex items-center gap-6 text-sm text-white/30">
              <a href="#" className="hover:text-white/60 transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="hover:text-white/60 transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="hover:text-white/60 transition-colors duration-300">
                Open Source
              </a>
            </div>

            <div className="text-sm text-white/20">
              SpaceChat — com.spacechat.app
            </div>

            <div className="flex items-center gap-4">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 text-xs text-white/15">
            Local-first. Always. No cloud required for the core story.
          </div>
        </div>
      </div>
    </footer>
  );
}
