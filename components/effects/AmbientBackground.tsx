'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (reduceMotion || coarsePointer) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const draw = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.06;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.06;

      const px = smoothRef.current.x * 100;
      const py = smoothRef.current.y * 100;

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${px}% ${py}%, rgba(124,92,252,0.10), transparent 45%)`;
      }
      if (blobARef.current) {
        const x = (smoothRef.current.x - 0.5) * 40;
        const y = (smoothRef.current.y - 0.5) * 40;
        blobARef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (blobBRef.current) {
        const x = (smoothRef.current.x - 0.5) * -30;
        const y = (smoothRef.current.y - 0.5) * -30;
        blobBRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-bg" />

      <div
        ref={blobARef}
        className="absolute -left-[10%] -top-[15%] h-[55vw] w-[55vw] max-w-[720px] max-h-[720px] rounded-full opacity-40 blur-[110px] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.35), transparent 65%)' }}
      />
      <div
        ref={blobBRef}
        className="absolute -right-[10%] top-[30%] h-[45vw] w-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-30 blur-[110px] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(61,220,151,0.22), transparent 65%)' }}
      />

      <div ref={glowRef} className="absolute inset-0 mix-blend-screen" />

      <div className="grain-layer" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(10,10,11,0.9) 100%)',
        }}
      />
    </div>
  );
}
