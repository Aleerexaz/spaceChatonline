import { useEffect, useRef } from 'react';

export default function MessagesFilesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const textEls = textRef.current?.querySelectorAll('.reveal-text');
            textEls?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateX(0)';
              }, i * 120);
            });
            if (imageRef.current) {
              imageRef.current.style.opacity = '1';
              imageRef.current.style.transform = 'translateX(0) scale(1)';
            }
            // Pipeline animation
            const segments = pipelineRef.current?.querySelectorAll('.pipeline-segment');
            segments?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'scaleX(1)';
              }, 500 + i * 250);
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
          {/* Text Content */}
          <div ref={textRef} className="flex-1 order-2 lg:order-1">
            <div
              className="reveal-text inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-[#00eeff] mb-6"
              style={{
                background: 'rgba(0,238,255,0.08)',
                border: '1px solid rgba(0,238,255,0.15)',
                opacity: 0,
                transform: 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Messages & Files
            </div>
            <h2
              className="reveal-text text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-6"
              style={{
                opacity: 0,
                transform: 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Pipeline delivery
            </h2>
            <p
              className="reveal-text text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Send text, images, and files across the mesh. Each piece routes
              through the optimal path — queued, sent, delivered, persisted.
              Watch your content flow through the pipeline in real time.
            </p>

            {/* Pipeline visualization */}
            <div
              ref={pipelineRef}
              className="flex items-center gap-2 max-w-md"
            >
              {[
                { label: 'Queued', color: '#ffffff' },
                { label: 'Routing', color: '#00eeff' },
                { label: 'Sent', color: '#bd00ff' },
                { label: 'Delivered', color: '#00ff88' },
              ].map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="pipeline-segment w-full h-1.5 rounded-full origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}40, ${step.color})`,
                      opacity: 0,
                      transform: 'scaleX(0)',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                  <span className="text-xs text-white/30 tracking-wider uppercase">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="flex-1 order-1 lg:order-2 flex justify-center"
            style={{
              opacity: 0,
              transform: 'translateX(40px) scale(0.95)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-[#00eeff]/5 blur-3xl" />
              <img
                src="/feature-files.jpg"
                alt="SpaceChat Files"
                className="relative w-[280px] md:w-[340px] rounded-3xl shadow-2xl"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,238,255,0.1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
