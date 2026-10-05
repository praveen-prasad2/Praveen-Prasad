'use client';

import { useEffect, useRef } from 'react';

const GAP = 26;
const RADIUS = 190;
const PUSH = 28;

/** A dot grid that ripples gently and parts around the cursor. */
export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let points: Float32Array = new Float32Array(0);
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = width < 640 ? GAP - 4 : GAP;
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const ox = (width - (cols - 1) * gap) / 2;
      const oy = (height - (rows - 1) * gap) / 2;
      points = new Float32Array(cols * rows * 2);
      let k = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points[k++] = ox + c * gap;
          points[k++] = oy + r * gap;
        }
      }
    };

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(238, 235, 227, 0.16)';
      const hot: number[] = [];
      for (let i = 0; i < points.length; i += 2) {
        const px = points[i];
        const py = points[i + 1];
        const wave = reduce ? 0 : Math.sin(px * 0.011 + t * 0.0007) * Math.cos(py * 0.013 + t * 0.0005) * 2.2;
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 1 - dist / RADIUS);
        if (force > 0.02) {
          const f = force * force;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          hot.push(px + nx * f * PUSH, py + ny * f * PUSH + wave, force);
          continue;
        }
        ctx.fillRect(px - 0.75, py - 0.75 + wave, 1.5, 1.5);
      }
      for (let i = 0; i < hot.length; i += 3) {
        const force = hot[i + 2];
        const size = 1.5 + force * 2.6;
        ctx.fillStyle = `rgba(255, 91, 34, ${0.25 + force * 0.75})`;
        ctx.fillRect(hot[i] - size / 2, hot[i + 1] - size / 2, size, size);
      }
    };

    const loop = (t: number) => {
      draw(t);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (mouse.x < -9000) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    const observer = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });

    resize();
    window.addEventListener('resize', resize);
    if (reduce) {
      draw(0);
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      observer.observe(canvas);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
