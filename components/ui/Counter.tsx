'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/cn';

gsap.registerPlugin(ScrollTrigger);

export default function Counter({
  value,
  suffix = '',
  label,
  className,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}) {
  const numberRef = useRef<HTMLParagraphElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const numberEl = numberRef.current;
    const wrapEl = wrapRef.current;
    if (!numberEl || !wrapEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      numberEl.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          numberEl.textContent = `${Math.round(counter.val)}${suffix}`;
        },
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top 85%',
        },
      });
    }, wrapEl);

    return () => ctx.revert();
  }, [value, suffix, duration]);

  return (
    <div ref={wrapRef} className={cn('text-center', className)}>
      <p
        ref={numberRef}
        className="font-display text-3xl font-semibold text-accent text-glow md:text-4xl"
      >
        0{suffix}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </p>
    </div>
  );
}
