'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden =
    direction === 'up'
      ? 'translate-y-8'
      : direction === 'down'
        ? '-translate-y-8'
        : direction === 'left'
          ? 'translate-x-8'
          : direction === 'right'
            ? '-translate-x-8'
            : '';

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'translate-x-0 translate-y-0 opacity-100' : `opacity-0 ${hidden}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
