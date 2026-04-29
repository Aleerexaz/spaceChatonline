import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[1000] transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(0,0,0,0.7)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid transparent',
      }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-white text-xl font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          SpaceChat
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Discover', id: 'discover' },
            { label: 'Network', id: 'network' },
            { label: 'Chats', id: 'chats' },
            { label: 'Security', id: 'security' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/60 text-sm font-medium uppercase tracking-widest hover:text-white transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo('download')}
          className="glass-blur px-5 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:border-white/20 transition-all duration-300"
        >
          Download
        </button>
      </div>
    </nav>
  );
}
