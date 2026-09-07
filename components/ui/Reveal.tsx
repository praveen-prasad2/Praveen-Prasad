'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/cn';

gsap.registerPlugin(ScrollTrigger);

const OFFSETS: Record<string, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  scale,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Force a clean slate regardless of any tween left over from a prior run
    // (React 18 Strict Mode double-invokes this effect in dev).
    gsap.killTweensOf(el);
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill();
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { clearProps: 'transform', opacity: 1 });
      return;
    }

    const offset = OFFSETS[direction] ?? OFFSETS.up;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, x: 0, y: 0, ...offset, scale: scale ?? 1 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, direction, scale]);

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}
