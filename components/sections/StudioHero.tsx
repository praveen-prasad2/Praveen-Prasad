'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StudioHero.css';

gsap.registerPlugin(ScrollTrigger);

export default function StudioHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.editorial-line > span', {
          yPercent: 110, duration: 1.1, stagger: .13, ease: 'power4.out',
        });
        gsap.from('.editorial-meta, .editorial-bottom', {
          opacity: 0, y: 20, duration: .8, delay: .5, ease: 'power2.out',
        });
        const scroll = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: .8 },
        });
        scroll.to('.editorial-line-one', { xPercent: -7 }, 0);
        scroll.to('.editorial-line-two', { xPercent: 8 }, 0);
        scroll.to('.editorial-line-three', { xPercent: -4 }, 0);
        scroll.fromTo('.editorial-ink', { clipPath: 'inset(0 100% 0 0)' }, {
          clipPath: 'inset(0 0% 0 0)', duration: .65,
        }, 0);
        scroll.to('.editorial-rule i', { scaleX: 1 }, 0);
        scroll.to('.editorial-side-note', { y: -55 }, 0);
        gsap.from('.discipline', {
          y: 35, opacity: 0, stagger: .1, duration: .7,
          scrollTrigger: { trigger: '.editorial-disciplines', start: 'top 95%', once: true },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="editorial-hero" id="home" ref={root}>
      <div className="editorial-meta">
        <span>PRAVEEN PRASAD <b>—</b> FULL-STACK DEVELOPER</span>
        <span>INDEPENDENT MIND. CONNECTED THINKING.</span>
      </div>
      <div className="editorial-heading">
        <div className="editorial-heading-note"><span>01 — INTRODUCTION</span><span>Ideas deserve a<br />thoughtful execution.</span></div>
        <h1>
          <span className="editorial-line editorial-line-one"><span>Good ideas.</span></span>
          <span className="editorial-line editorial-line-two"><span>Better <em>digital</em></span></span>
          <span className="editorial-line editorial-line-three"><span className="editorial-outline">experiences.<span className="editorial-ink" aria-hidden="true">experiences.</span></span></span>
        </h1>
        <span className="editorial-side-note" aria-hidden="true">DESIGNED WITH INTENT<br />DEVELOPED WITH CARE ↙</span>
      </div>
      <div className="editorial-bottom">
        <a className="editorial-work-link" href="#work"><span className="editorial-arrow"><ArrowDown size={28} /></span><span>Explore selected work<small>SCROLL TO SEE WHAT’S POSSIBLE</small></span></a>
        <p>I’m Praveen, a developer in Kerala.<br />I bring clarity to complex ideas through<br />considered interfaces and reliable code.</p>
        <a className="editorial-contact" href="#contact">Have a project in mind? <ArrowUpRight size={17} /></a>
      </div>
      <div className="editorial-rule" aria-hidden="true"><i /></div>
      <div className="editorial-disciplines">
        {[
          ['01', 'Interfaces that feel right.', 'FRONTEND & INTERACTION'],
          ['02', 'Systems that hold up.', 'FULL-STACK DEVELOPMENT'],
          ['03', 'Less repetitive work.', 'WORKFLOW AUTOMATION'],
        ].map(([number, title, label]) => <div className="discipline" key={number}><span>{number}</span><div><p>{title}</p><small>{label}</small></div><ArrowUpRight size={18} /></div>)}
      </div>
    </section>
  );
}
