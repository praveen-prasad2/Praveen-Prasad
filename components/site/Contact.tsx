'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import { REDUCED_OK, revealCommon } from '@/lib/motion';
import data from '@/data/portfolio.json';

const RADIUS = 340;

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      REDUCED_OK,
      () => {
        revealCommon(el);
        gsap.from('.contact-title .sc', {
          yPercent: 120,
          rotate: 10,
          duration: 1.2,
          stagger: 0.025,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.contact-title', start: 'top 82%' },
        });
        gsap.from('.contact-arrow', {
          scale: 0,
          rotate: -90,
          duration: 1.1,
          ease: 'back.out(1.8)',
          scrollTrigger: { trigger: '.contact-title', start: 'top 70%' },
        });
      },
      el
    );
    return () => mm.revert();
  }, []);

  // Letters swell (weight + width) as the cursor gets close.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chars = Array.from(el.querySelectorAll<HTMLElement>('.contact-title .pressure .sc'));
    const state = chars.map(() => ({ w: 420, d: 86 }));
    const mouse = { x: -9999, y: -9999 };
    let inView = false;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });

    const tick = () => {
      if (!inView) return;
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dx = mouse.x - (r.left + r.width / 2);
        const dy = mouse.y - (r.top + r.height / 2);
        const t = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / RADIUS);
        const f = t * t * (3 - 2 * t);
        const s = state[i];
        s.w += (300 + 500 * f - s.w) * 0.14;
        s.d += (78 + 22 * f - s.d) * 0.14;
        c.style.fontVariationSettings = `"wght" ${s.w.toFixed(1)}, "wdth" ${s.d.toFixed(1)}`;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    observer.observe(el);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      observer.disconnect();
      gsap.ticker.remove(tick);
      chars.forEach((c) => (c.style.fontVariationSettings = ''));
    };
  }, []);

  return (
    <section ref={root} id="contact" className="contact section" data-theme="accent">
      <div className="section-kicker micro" data-kicker>
        <span>
          <b>04</b> — Let&rsquo;s make something
        </span>
        <span>Every good thing starts with a hello</span>
      </div>

      <a className="contact-title" href={`mailto:${data.about.email}`} data-cursor="Say hello">
        <span className="sr-only">Have an idea? Let&rsquo;s talk.</span>
        <span className="ct-line pressure" aria-hidden="true">
          <Split text="Have an idea?" decorative />
        </span>
        <span className="ct-line" aria-hidden="true">
          <em>
            <Split text={'Let’s talk.'} decorative />
          </em>
          <span className="contact-arrow">
            <ArrowUpRight strokeWidth={1.4} />
          </span>
        </span>
      </a>

      <div className="contact-bottom" data-fade>
        <a className="text-link" href={`mailto:${data.about.email}`}>
          <span>{data.about.email}</span> <ArrowUpRight size={15} />
        </a>
        <p>
          Based in Kerala.
          <br />
          Building for everywhere.
        </p>
      </div>
    </section>
  );
}
