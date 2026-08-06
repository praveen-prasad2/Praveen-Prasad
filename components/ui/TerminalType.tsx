'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type TerminalTypeProps = {
  lines: string[];
  className?: string;
  typingSpeed?: number;
  pauseBetweenLines?: number;
};

export default function TerminalType({
  lines,
  className,
  typingSpeed = 28,
  pauseBetweenLines = 600,
}: TerminalTypeProps) {
  const [display, setDisplay] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || done) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(lines.join('\n'));
      setDone(true);
      return;
    }

    const full = lines[lineIndex] ?? '';
    let char = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (char <= full.length) {
        setDisplay((prev) => {
          const prefix = lines.slice(0, lineIndex).join('\n');
          const current = full.slice(0, char);
          return prefix ? `${prefix}\n${current}` : current;
        });
        char += 1;
        timeout = setTimeout(type, typingSpeed);
      } else if (lineIndex < lines.length - 1) {
        timeout = setTimeout(() => setLineIndex((i) => i + 1), pauseBetweenLines);
      } else {
        setDone(true);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [started, lineIndex, lines, typingSpeed, pauseBetweenLines, done]);

  return (
    <div
      ref={ref}
      className={cn(
        'font-mono text-left text-sm leading-relaxed text-primary/90 md:text-[15px]',
        className
      )}
      aria-live="polite"
    >
      <pre className="whitespace-pre-wrap break-words">
        {display}
        <span className="terminal-caret" aria-hidden />
      </pre>
    </div>
  );
}
