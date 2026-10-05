'use client';

import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import RollText from './RollText';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import { REDUCED_OK } from '@/lib/motion';
import data from '@/data/portfolio.json';

/** Sits fixed behind the page; its clipped wrapper scrolls into view so the footer is uncovered, not scrolled in. */
export default function Footer() {
  const wrap = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLAnchorElement>(null);

  // Fit the wordmark to the full footer width.
  useEffect(() => {
    const mark = markRef.current;
    if (!mark) return;
    const fit = () => {
      mark.style.fontSize = '100px';
      const inner = mark.firstElementChild as HTMLElement | null;
      const available = mark.clientWidth;
      const natural = inner?.scrollWidth ?? available;
      if (natural > 0) mark.style.fontSize = `${Math.floor((100 * available * 0.97) / natural)}px`;
    };
    fit();
    document.fonts?.ready.then(fit).catch(() => {});
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useIsoLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      REDUCED_OK,
      () => {
        gsap.from('.footer-mark .sc', {
          yPercent: 105,
          duration: 1.2,
          stagger: 0.035,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 65%' },
        });
        gsap.from('.footer-top > *', {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 75%' },
        });
      },
      el
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrap} className="footer-reveal">
      <footer className="site-footer">
        <div className="footer-top">
          <div className="socials">
            {data.about.socials.map((s) => (
              <a href={s.url} key={s.id} target="_blank" rel="noreferrer" className="has-roll">
                <RollText>{s.platform}</RollText> <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
          <MagneticButton as="a" href="#home" className="back-top" aria-label="Back to top">
            <ArrowUp size={20} />
          </MagneticButton>
        </div>

        <a ref={markRef} className="footer-mark" href="#home" aria-label="Praveen Prasad home">
          <span>
            <Split text="Praveen Prasad." decorative />
          </span>
        </a>

        <div className="footer-bottom">
          <span className="micro">© {new Date().getFullYear()} Praveen Prasad</span>
          <a className="micro" href={`mailto:${data.about.email}`}>
            {data.about.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
