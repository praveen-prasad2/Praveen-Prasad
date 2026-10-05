'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';

const SEEN_KEY = 'pp-intro-seen';

export default function Preloader({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {}

    const reveal = () => {
      html.classList.remove('is-loading');
      window.dispatchEvent(new Event('site:ready'));
      onReveal();
    };

    el.style.animation = 'none';

    if (reduce) {
      reveal();
      setDone(true);
      return;
    }

    html.classList.add('is-loading');
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const num = el.querySelector<HTMLElement>('.pl-num');
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {}
          setDone(true);
        },
      });

      if (seen) {
        tl.set('.pl-inner', { autoAlpha: 0 })
          .add(reveal, 0.05)
          .to('.pl-panel', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0)
          .to('.pl-accent', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.08);
        return;
      }

      tl.from('.pl-name .sc', { yPercent: 110, rotate: 6, duration: 0.9, stagger: 0.035, ease: 'power4.out' })
        .from('.pl-meta', { autoAlpha: 0, y: 12, duration: 0.6, ease: 'power3.out' }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (num) num.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0.15
        )
        .to('.pl-bar i', { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0.15)
        .to('.pl-name .sc, .pl-num', { yPercent: -110, duration: 0.6, stagger: 0.015, ease: 'power3.in' }, '+=0.1')
        .to('.pl-meta, .pl-bar', { autoAlpha: 0, duration: 0.3 }, '<')
        .addLabel('lift')
        .to('.pl-panel', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 'lift')
        .add(reveal, 'lift+=0.45')
        .to('.pl-accent', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 'lift+=0.14');
    }, el);

    return () => {
      ctx.revert();
      html.classList.remove('is-loading');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-accent" />
      <div className="pl-panel">
        <div className="pl-inner">
          <div className="pl-meta micro">
            <span>Full Stack Developer</span>
            <span>Malappuram, Kerala</span>
          </div>
          <div className="pl-name">
            <Split text="Praveen Prasad" decorative />
          </div>
          <div className="pl-foot">
            <div className="pl-bar">
              <i />
            </div>
            <span className="pl-count">
              <span className="pl-num">000</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
