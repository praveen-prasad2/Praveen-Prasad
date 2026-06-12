'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const el = document.getElementById(id.slice(1));
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };

    document.addEventListener('click', onAnchorClick);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
