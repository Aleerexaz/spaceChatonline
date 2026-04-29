import { useEffect, useRef } from 'react';

export default function NetworkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
                (el as HTMLElement).style.transform = 'translateX(0)';
              }, i * 120);
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

  // Constellation canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let active = false;

    const nodes = [
      { x: 0.2, y: 0.3, pulse: 0, speed: 0.02 },
      { x: 0.5, y: 0.2, pulse: 0, speed: 0.03 },
      { x: 0.8, y: 0.4, pulse: 0, speed: 0.025 },
      { x: 0.3, y: 0.7, pulse: 0, speed: 0.015 },
      { x: 0.7, y: 0.8, pulse: 0, speed: 0.02 },
      { x: 0.5, y: 0.55, pulse: 0, speed: 0.035 },
    ];

    const connections = [
      [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [0, 1], [1, 2], [3, 4],
    ];

    function resize() {
      if (!canvas || !ctx) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();

    let time = 0;
    function draw() {
      if (!active || !canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      // Draw connections
      for (const [a, b] of connections) {
        const ax = nodes[a].x * w + Math.sin(time + a) * 10;
        const ay = nodes[a].y * h + Math.cos(time + a * 0.7) * 10;
        const bx = nodes[b].x * w + Math.sin(time + b) * 10;
        const by = nodes[b].y * h + Math.cos(time + b * 0.7) * 10;

        const dist = Math.hypot(bx - ax, by - ay);
        const opacity = Math.max(0, 1 - dist / 400) * 0.3;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(
          (ax + bx) / 2 + Math.sin(time * 2) * 20,
          (ay + by) / 2 + Math.cos(time * 2) * 20,
          bx,
          by
        );
        ctx.strokeStyle = `rgba(0, 238, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulse += node.speed;
        const pulseSize = Math.sin(node.pulse) * 3;
        const x = node.x * w + Math.sin(time + i) * 10;
        const y = node.y * h + Math.cos(time + i * 0.7) * 10;

        // Glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 20 + pulseSize);
        grad.addColorStop(
          0,
          i === 5
            ? `rgba(0, 238, 255, 0.6)`
            : `rgba(0, 238, 255, 0.3)`
        );
        grad.addColorStop(1, 'rgba(0, 238, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 20 + pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, i === 5 ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = i === 5 ? '#00eeff' : 'rgba(0,238,255,0.6)';
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            active = true;
            draw();
          } else {
            active = false;
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(canvas);

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      cancelAnimationFrame(animFrameId);
      obs.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Canvas visualization */}
          <div className="flex-1 order-1 h-[400px] md:h-[500px] relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ opacity: 0.8 }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 animate-node-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,238,255,0.3), transparent)',
                    boxShadow: '0 0 40px rgba(0,238,255,0.3)',
                  }}
                />
                <span className="text-white/30 text-sm tracking-widest uppercase">Mesh Active</span>
              </div>
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
                transform: 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Network
            </div>
            <h2
              className="reveal-text text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight mb-6"
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              Constellation links
            </h2>
            <p
              className="reveal-text text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              See your mesh network come alive. Direct links between peers,
              with mesh hints from presence data. Peer-of-peer connections light
              up as constellations form — a living graph of human proximity.
            </p>
            <div
              className="reveal-text flex flex-wrap gap-3"
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              {['Direct P2P', 'Mesh Hops', 'Peer-of-Peer'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm text-white/50 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
