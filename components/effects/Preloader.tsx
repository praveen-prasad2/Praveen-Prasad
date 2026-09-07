'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('loader-active');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.remove('loader-active');
      setVisible(false);
      // Every section's ScrollTrigger mounts while the page can't scroll
      // (html.loader-active sets overflow:hidden) — recompute positions now
      // that scrolling is possible, or triggers below the fold stay dead.
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        document.documentElement.classList.remove('loader-active');
        setVisible(false);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    });

    tl.set(markRef.current, { opacity: 0, scale: 0.85 })
      .to(markRef.current, { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' })
      .to(markRef.current, { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' }, '+=0.25')
      .to(
        curtainRef.current,
        { yPercent: -100, duration: 0.7, ease: 'power4.inOut' },
        '-=0.1'
      );

    return () => {
      tl.kill();
      document.documentElement.classList.remove('loader-active');
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[200]" role="status" aria-label="Loading">
      <div
        ref={curtainRef}
        className="absolute inset-0 flex items-center justify-center bg-bg"
      >
        <div
          ref={markRef}
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          P<span className="text-accent">.</span>
        </div>
      </div>
    </div>
  );
}
