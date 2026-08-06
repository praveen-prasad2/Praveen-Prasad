'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 28;
const CODE_SNIPPETS = ['{...}', 'fn()', '=>', '0x', '</>', '&&', '||', '::'];

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  snippet: string;
};

export default function CyberBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 8 + Math.random() * 10,
          speed: 0.15 + Math.random() * 0.35,
          opacity: 0.08 + Math.random() * 0.18,
          drift: (Math.random() - 0.5) * 0.2,
          snippet: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        }));
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      document.documentElement.style.setProperty(
        '--mouse-x',
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        '--mouse-y',
        `${e.clientY}px`
      );
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.06;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.06;

      const parallaxX = (smoothRef.current.x - 0.5) * 24;
      const parallaxY = (smoothRef.current.y - 0.5) * 24;

      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0)`;
      }

      ctx.clearRect(0, 0, w, h);

      if (!reducedMotion.current) {
        for (const p of particlesRef.current) {
          p.y -= p.speed;
          p.x += p.drift + (smoothRef.current.x - 0.5) * 0.15;
          if (p.y < -20) {
            p.y = h + 20;
            p.x = Math.random() * w;
          }
          if (p.x < -40) p.x = w + 40;
          if (p.x > w + 40) p.x = -40;

          ctx.font = `${p.size}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`;
          ctx.fillText(p.snippet, p.x, p.y);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base gradient atmosphere */}
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,136,0.07), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(0,255,136,0.04), transparent 50%)',
        }}
      />

      {/* Grid with parallax */}
      <div
        ref={gridRef}
        className="absolute -inset-[5%] will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.035) 1px, transparent 1px)
          `,
          backgroundSize: 'var(--grid-size) var(--grid-size)',
        }}
      />

      {/* Cursor light */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background:
            'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,136,0.06), transparent 45%)',
        }}
      />

      {/* Code particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.85) 100%)',
        }}
      />
    </div>
  );
}
