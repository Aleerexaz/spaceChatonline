import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const starsCount = 150;
    const dustCount = 50;
    let stars: Star[] = [];
    let dustParticles: DustParticle[] = [];
    let shootingStars: ShootingStar[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;
    const dustColors = [
      'rgba(255,255,255,0.3)',
      'rgba(0,238,255,0.15)',
      'rgba(189,0,255,0.15)',
    ];

    function createGradient(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      c1: string,
      c2: string
    ) {
      const grad = c.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);
      return grad;
    }

    function createStar(
      _cv: HTMLCanvasElement,
      x: number,
      y: number,
      maxSize: number,
      maxOpacity: number
    ): Star {
      return {
        x,
        y,
        size: Math.random() * maxSize + 0.1,
        opacity: Math.random() * maxOpacity,
        speed: Math.random() * 0.05 + 0.01,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
      };
    }

    function randomPosition(cv: HTMLCanvasElement) {
      return {
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
      };
    }

    function resizeCanvas(cv: HTMLCanvasElement) {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;

      stars = [];
      for (let i = 0; i < starsCount; i++) {
        const pos = randomPosition(cv);
        stars.push(createStar(cv, pos.x, pos.y, 1.5, 0.8));
      }

      dustParticles = [];
      for (let i = 0; i < dustCount; i++) {
        const pos = randomPosition(cv);
        dustParticles.push({
          x: pos.x,
          y: pos.y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          color: Math.floor(Math.random() * dustColors.length),
        });
      }

      shootingStars = [];
      for (let i = 0; i < 5; i++) {
        shootingStars.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height * 0.5,
          length: 0,
          speed: Math.random() * 10 + 5,
          angle: Math.PI / 4,
          opacity: 0,
          active: false,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const handleMouseOut = () => {
      mouseActive = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      mouseActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      mouseActive = true;
    };

    const handleTouchEnd = () => {
      mouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    let animFrameId: number;

    function drawScene(cv: HTMLCanvasElement, c: CanvasRenderingContext2D) {
      c.fillStyle = '#000';
      c.fillRect(0, 0, cv.width, cv.height);

      for (const star of stars) {
        const parallaxX = mouseActive
          ? (mouseX - cv.width / 2) * (star.size * 0.02)
          : 0;
        const parallaxY = mouseActive
          ? (mouseY - cv.height / 2) * (star.size * 0.02)
          : 0;
        const renderX = star.x - parallaxX;
        const renderY = star.y - parallaxY;
        const twinkle = Math.sin(Date.now() * star.twinkleSpeed) * 0.3 + 0.7;
        const opacity = star.opacity * twinkle;

        c.beginPath();
        c.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        c.fillStyle = createGradient(
          c,
          renderX,
          renderY,
          star.size * 2,
          `rgba(255,255,255,${opacity})`,
          'rgba(255,255,255,0)'
        );
        c.fill();
      }

      for (const particle of dustParticles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = cv.width;
        if (particle.x > cv.width) particle.x = 0;
        if (particle.y < 0) particle.y = cv.height;
        if (particle.y > cv.height) particle.y = 0;

        const parallaxX = mouseActive
          ? (mouseX - cv.width / 2) * 0.01
          : 0;
        const parallaxY = mouseActive
          ? (mouseY - cv.height / 2) * 0.01
          : 0;

        c.beginPath();
        c.arc(
          particle.x - parallaxX,
          particle.y - parallaxY,
          particle.size * 0.5,
          0,
          Math.PI * 2
        );
        c.fillStyle = dustColors[particle.color];
        c.fill();
      }

      for (const s of shootingStars) {
        if (!s.active && Math.random() < 0.005) {
          s.active = true;
          s.opacity = 1;
          s.x = Math.random() * cv.width;
          s.y = Math.random() * cv.height * 0.5;
          s.length = 0;
          s.speed = Math.random() * 10 + 5;
        }

        if (s.active) {
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.length = Math.min(s.length + s.speed * 2, 100);
          s.opacity -= 0.01;

          if (s.opacity <= 0) {
            s.active = false;
            s.opacity = 0;
            s.x = Math.random() * cv.width;
            s.y = Math.random() * cv.height * 0.5;
            s.length = 0;
          } else {
            const grad = c.createLinearGradient(
              s.x,
              s.y,
              s.x - Math.cos(s.angle) * s.length,
              s.y - Math.sin(s.angle) * s.length
            );
            grad.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
            grad.addColorStop(0.1, `rgba(0,238,255,${s.opacity})`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');

            c.strokeStyle = grad;
            c.lineWidth = 2;
            c.lineCap = 'round';
            c.beginPath();
            c.moveTo(s.x, s.y);
            c.lineTo(
              s.x - Math.cos(s.angle) * s.length,
              s.y - Math.sin(s.angle) * s.length
            );
            c.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(() => drawScene(cv, c));
    }

    resizeCanvas(canvas);
    const handleResize = () => resizeCanvas(canvas);
    window.addEventListener('resize', handleResize);
    drawScene(canvas, ctx);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="starfield-canvas"
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
