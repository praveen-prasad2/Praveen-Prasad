'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export default function SectionDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('container-main flex items-center gap-4 py-2', className)}
      aria-hidden
    >
      <span
        className={cn(
          'h-px flex-1 origin-left bg-gradient-to-r from-transparent via-primary/40 to-primary/10 transition-all duration-1000',
          visible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
        )}
      />
      <span
        className={cn(
          'font-mono text-[10px] tracking-[0.35em] text-primary/50 transition-opacity duration-700 delay-300',
          visible ? 'opacity-100' : 'opacity-0'
        )}
      >
        //
      </span>
      <span
        className={cn(
          'h-px flex-1 origin-right bg-gradient-to-l from-transparent via-primary/40 to-primary/10 transition-all duration-1000',
          visible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
        )}
      />
    </div>
  );
}
