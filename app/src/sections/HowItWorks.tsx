import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    desc: 'Scan for nearby peers using Bluetooth, Wi-Fi, or Nearby Connections. Your device broadcasts a public-key identity.',
    color: '#00eeff',
  },
  {
    number: '02',
    title: 'Verify',
    desc: 'Compare fingerprints out-of-band. Confirm the public key matches the person you see. Trust is opt-in.',
    color: '#bd00ff',
  },
  {
    number: '03',
    title: 'Connect',
    desc: 'Establish an encrypted session. Devices negotiate keys. A secure channel opens — direct device-to-device.',
    color: '#00ff88',
  },
  {
    number: '04',
    title: 'Send',
    desc: 'Messages and files flow through the encrypted pipe. Text, images, documents — chunked and delivered.',
    color: '#00eeff',
  },
  {
    number: '05',
    title: 'Persist',
    desc: 'Everything stores locally in SQLite (with optional SQLCipher). Your history lives on your device, nowhere else.',
    color: '#bd00ff',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepEls = stepsRef.current?.querySelectorAll('.step-item');
            stepEls?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 180);
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
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full py-32 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest text-white/40 mb-6"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              How it works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
              From signal to message
            </h2>
          </div>

          {/* Steps */}
          <div ref={stepsRef} className="relative">
            {/* Connection line */}
            <div
              className="absolute left-8 md:left-12 top-0 bottom-0 w-px hidden md:block"
              style={{
                background: 'linear-gradient(180deg, rgba(0,238,255,0.3), rgba(189,0,255,0.3), rgba(0,238,255,0.3))',
              }}
            />

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="step-item flex flex-col md:flex-row items-start gap-6 md:gap-12"
                  style={{
                    opacity: 0,
                    transform: 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Number / Node */}
                  <div className="flex items-center gap-4 md:gap-8">
                    <div
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: `${step.color}10`,
                        border: `1px solid ${step.color}30`,
                        boxShadow: `0 0 20px ${step.color}15`,
                      }}
                    >
                      <span
                        className="text-xl md:text-2xl font-light"
                        style={{ color: step.color }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <div className="md:hidden flex-1">
                      <h3 className="text-2xl font-normal text-white mb-2">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:pt-4 pl-20 md:pl-0">
                    <h3 className="hidden md:block text-2xl md:text-3xl font-normal text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
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
