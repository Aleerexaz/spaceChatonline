import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrapper || !dot || !ring) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      wrapper.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      dot.style.opacity = '1';

      ring.style.left = cursorX + 'px';
      ring.style.top = cursorY + 'px';

      animFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'rgba(0, 238, 255, 0.8)';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.borderColor = 'rgba(0, 238, 255, 0.5)';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="cursor-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          backgroundColor: '#00eeff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px #00eeff, 0 0 20px #00eeff',
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
          border: '1px solid rgba(0, 238, 255, 0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </div>
  );
}
