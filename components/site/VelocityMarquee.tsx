'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const STAR_PATH = 'M12 0l2.6 8.4L23 6l-6.2 6L23 18l-8.4-2.4L12 24l-2.6-8.4L1 18l6.2-6L1 6l8.4 2.4z';

/** An endless row that speeds up, reverses and leans with scroll velocity. */
export default function VelocityMarquee({ items, className }: { items: string[]; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let dir = -1;
    let boost = 0;
    let half = track.scrollWidth / 2;
    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        boost = Math.min(Math.abs(self.getVelocity()) / 260, 9);
        dir = self.direction === 1 ? -1 : 1;
      },
    });

    const onResize = () => {
      half = track.scrollWidth / 2;
    };

    const tick = (_time: number, delta: number) => {
      boost *= 0.93;
      x += dir * (1 + boost) * 48 * (Math.min(delta, 50) / 1000);
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(track, { x });
      skewTo(Math.max(-12, Math.min(12, -dir * boost * 1.4)));
    };

    gsap.ticker.add(tick);
    window.addEventListener('resize', onResize);
    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={className ? `vmarquee ${className}` : 'vmarquee'} aria-hidden="true">
      <div ref={trackRef} className="vmarquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={i % 2 ? 'vm-item is-serif' : 'vm-item'}>
            {item}
            <svg viewBox="0 0 24 24" className="vm-star">
              <path d={STAR_PATH} />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
