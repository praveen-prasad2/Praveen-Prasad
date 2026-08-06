'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/cn';

const BOOT_LINES = [
  { text: '> INITIALIZING SECURE KERNEL...', delay: 0 },
  { text: '> LOADING CRYPTO MODULES........ OK', delay: 280 },
  { text: '> ESTABLISHING TUNNEL........... OK', delay: 520 },
  { text: '> BYPASSING FIREWALL............ OK', delay: 760 },
  { text: '> DECRYPTING ASSETS............. OK', delay: 1000 },
  { text: '> INJECTING UI PROTOCOLS........ OK', delay: 1240 },
  { text: '> ACCESS GRANTED — WELCOME', delay: 1480 },
];

export default function HackerLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('BOOTING');

  const finish = useCallback(() => {
    setStatus('READY');
    setProgress(100);
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => setVisible(false), 700);
    }, 400);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLines(BOOT_LINES.map((l) => l.text));
      setProgress(100);
      setStatus('READY');
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 300);
      }, 400);
      return () => clearTimeout(t);
    }

    document.documentElement.classList.add('loader-active');
    document.body.style.overflow = 'hidden';

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let progressRaf = 0;
    const start = performance.now();
    const duration = 2200;

    const tickProgress = (now: number) => {
      const p = Math.min(((now - start) / duration) * 100, 99);
      setProgress(Math.floor(p));
      if (p < 99) {
        progressRaf = requestAnimationFrame(tickProgress);
      }
    };
    progressRaf = requestAnimationFrame(tickProgress);

    BOOT_LINES.forEach((line) => {
      timeouts.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line.text]);
        }, line.delay)
      );
    });

    timeouts.push(
      setTimeout(() => {
        finish();
      }, duration)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(progressRaf);
      document.documentElement.classList.remove('loader-active');
      document.body.style.overflow = '';
    };
  }, [finish]);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove('loader-active');
      document.body.style.overflow = '';
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] transition-all duration-700',
        exiting && 'pointer-events-none scale-105 opacity-0'
      )}
      role="status"
      aria-live="polite"
      aria-label="System booting"
    >
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.4) 2px, rgba(0,255,136,0.4) 3px)',
        }}
        aria-hidden
      />

      {/* Soft grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,255,136,0.08), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60">
          <span>sys://boot</span>
          <span className="flex items-center gap-2">
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full bg-primary',
                status !== 'READY' && 'animate-pulse'
              )}
            />
            {status}
          </span>
        </div>

        <div className="gradient-border overflow-hidden rounded-sm border border-primary/20 bg-bg-secondary/90 p-5 shadow-glow backdrop-blur-sm md:p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-primary/10 pb-3">
            <span className="h-2 w-2 rounded-full bg-primary/50" />
            <span className="h-2 w-2 rounded-full bg-primary/30" />
            <span className="h-2 w-2 rounded-full bg-primary/20" />
            <span className="ml-2 font-mono text-[11px] text-muted">
              root@praveen — secure_shell
            </span>
          </div>

          <div className="min-h-[160px] space-y-1.5 font-mono text-xs leading-relaxed text-primary/85 md:text-[13px]">
            {lines.map((line, i) => (
              <p
                key={`${line}-${i}`}
                className={cn(
                  'animate-[fadeIn_0.25s_ease-out]',
                  line.includes('ACCESS GRANTED') && 'text-primary text-glow'
                )}
              >
                {line}
              </p>
            ))}
            {status !== 'READY' && (
              <span className="terminal-caret mt-1" aria-hidden />
            )}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-wider text-muted">
              <span>LOADING_UI</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-primary shadow-glow-sm transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.25em] text-muted/70">
          encrypted connection · portfolio_v1
        </p>
      </div>
    </div>
  );
}
