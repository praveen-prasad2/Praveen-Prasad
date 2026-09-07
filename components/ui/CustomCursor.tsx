'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const quickX = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
    const quickY = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        shown = true;
      }
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(dot, { scale: 2.6, duration: 0.25, ease: 'power2.out' });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
    };

    const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.2 });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[300] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 mix-blend-difference md:block"
      aria-hidden
    />
  );
}
