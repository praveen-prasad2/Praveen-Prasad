'use client';

import { cn } from '@/lib/cn';

export default function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-primary/10 bg-bg-secondary/40 py-4',
        className
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-28" />
      <div className="marquee-track gap-8 px-4">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center gap-3 font-mono text-sm tracking-wide text-white/50"
          >
            <span className="h-1 w-1 rounded-full bg-primary/60 shadow-glow-sm" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
