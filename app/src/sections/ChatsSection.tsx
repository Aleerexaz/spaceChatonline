import { useEffect, useRef } from 'react';

export default function ChatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Text reveal
            const textEls = textRef.current?.querySelectorAll('.reveal-text');
            textEls?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
            });
            // Image reveal
            if (imageRef.current) {
              imageRef.current.style.opacity = '1';
              imageRef.current.style.transform = 'translateY(0) scale(1)';
            }
            // Chat bubbles stagger
            const bubbles = bubblesRef.current?.querySelectorAll('.chat-bubble');
            bubbles?.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, 600 + i * 200);
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
      id="chats"
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
              Chats
            </div>
            <h2
              className="reveal-text text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-6"
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Cosmic conversations
            </h2>
            <p
              className="reveal-text text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Messages float as cosmic bubbles in a glass UI. Unread cues pulse
              like distant signals. Conversations feel ethereal — as if whispered
              through the void. No cloud storage. Just you, them, and the space
              between.
            </p>

            {/* Animated chat bubbles preview */}
            <div ref={bubblesRef} className="space-y-3 max-w-sm">
              {[
                { text: 'Hey, found you nearby!', fromMe: false, delay: 0 },
                { text: 'Amazing — no server needed', fromMe: true, delay: 1 },
                { text: 'Want to share a file?', fromMe: false, delay: 2 },
              ].map((msg, i) => (
                <div
                  key={i}
                  className="chat-bubble flex"
                  style={{
                    justifyContent: msg.fromMe ? 'flex-end' : 'flex-start',
                    opacity: 0,
                    transform: 'translateY(15px)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    className="px-4 py-3 rounded-2xl text-sm max-w-[240px]"
                    style={{
                      background: msg.fromMe
                        ? 'rgba(0,238,255,0.1)'
                        : 'rgba(255,255,255,0.05)',
                      border: msg.fromMe
                        ? '1px solid rgba(0,238,255,0.2)'
                        : '1px solid rgba(255,255,255,0.08)',
                      color: msg.fromMe ? 'rgba(0,238,255,0.9)' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {msg.text}
                  </div>
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
              transform: 'translateY(40px) scale(0.95)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-[#bd00ff]/5 blur-3xl" />
              <img
                src="/feature-chats.jpg"
                alt="SpaceChat Chats"
                className="relative w-[280px] md:w-[340px] rounded-3xl shadow-2xl"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(189,0,255,0.1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
