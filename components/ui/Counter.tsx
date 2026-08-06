'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export default function Counter({
  value,
  suffix = '',
  label,
  className,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(value);
            return;
          }

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <p className="font-display text-3xl font-semibold text-primary text-glow md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}
