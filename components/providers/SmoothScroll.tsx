'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(pointer: coarse)');
    let lenis: Lenis | null = null;
    let active = true;

    const tick = (time: number) => lenis?.raf(time * 1000);
    const configure = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      if (!preference.matches && !pointer.matches) {
        lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          smoothWheel: true,
          syncTouch: false,
        });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
      }
      ScrollTrigger.refresh();
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!hash || hash === '#') return;
      const destination = document.getElementById(hash.slice(1));
      if (!destination) return;
      event.preventDefault();
      window.history.replaceState(null, '', hash);
      const focusDestination = () => {
        const original = destination.getAttribute('tabindex');
        if (original === null) destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
        if (original === null) destination.removeAttribute('tabindex');
      };
      if (lenis) {
        lenis.scrollTo(destination, { offset: destination.classList.contains('work-chapter') ? -96 : -24, onComplete: focusDestination });
      } else {
        destination.scrollIntoView({ behavior: preference.matches ? 'instant' : 'smooth', block: 'start' });
        focusDestination();
      }
    };

    configure();
    preference.addEventListener('change', configure);
    pointer.addEventListener('change', configure);
    document.addEventListener('click', onAnchorClick);
    document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); }).catch(() => {});

    return () => {
      active = false;
      preference.removeEventListener('change', configure);
      pointer.removeEventListener('change', configure);
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
