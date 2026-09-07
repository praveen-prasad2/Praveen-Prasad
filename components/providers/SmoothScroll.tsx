'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let lenis: Lenis | null = null;

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const el = document.getElementById(id.slice(1));
      if (!el) return;

      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };

    document.addEventListener('click', onAnchorClick);

    // Webfont swap (Sora/Inter loading in) shifts layout after individual
    // sections have already computed their ScrollTrigger start/end positions —
    // recalculate once fonts are actually in place so nothing is left stuck
    // mid-animation waiting on a scroll event that never revisits it.
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    // Reduced motion / touch: skip Lenis smoothing entirely, keep native scroll + ScrollTrigger.
    if (reduceMotion || coarsePointer) {
      return () => document.removeEventListener('click', onAnchorClick);
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenis = instance;

    instance.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener('click', onAnchorClick);
      instance.destroy();
    };
  }, []);

  return <>{children}</>;
}
