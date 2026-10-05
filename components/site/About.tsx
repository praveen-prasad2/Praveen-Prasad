'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import { REDUCED_OK, revealCommon } from '@/lib/motion';
import data from '@/data/portfolio.json';

export default function About() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(
      REDUCED_OK,
      () => {
        revealCommon(el);

        // Manifesto lights up word by word with the scroll.
        gsap.fromTo(
          '.manifesto .si',
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '.manifesto', start: 'top 78%', end: 'bottom 42%', scrub: true },
          }
        );

        // Timeline rail draws as you read it.
        gsap.fromTo(
          '.timeline-rail i',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 55%', scrub: true } }
        );
        gsap.utils.toArray<HTMLElement>('.tl-item').forEach((item) => {
          gsap
            .timeline({ scrollTrigger: { trigger: item, start: 'top 80%' } })
            .from(item.querySelector('.tl-dot'), { scale: 0, duration: 0.6, ease: 'back.out(2.4)' })
            .from(item.querySelectorAll('.tl-text > *'), { x: 30, autoAlpha: 0, stagger: 0.07, duration: 0.8, ease: 'power3.out' }, 0.05);
        });

        // Skill chips fly in from scattered positions and settle into the cloud.
        gsap.from('.skill-cloud li', {
          x: () => gsap.utils.random(-320, 320),
          y: () => gsap.utils.random(-140, 220),
          rotate: () => gsap.utils.random(-50, 50),
          scale: 0.6,
          autoAlpha: 0,
          ease: 'power3.out',
          stagger: { each: 0.025, from: 'random' },
          scrollTrigger: { trigger: '.skill-cloud', start: 'top 95%', end: 'top 50%', scrub: 1 },
        });
      },
      el
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="about" className="about section" data-theme="light">
      <div className="section-kicker micro" data-kicker>
        <span>
          <b>01</b> — About
        </span>
        <span>A little about me</span>
      </div>

      <p className="manifesto">
        <Split
          text="Good digital experiences start with curiosity, and come to life through care."
          by="words"
          accent={['curiosity', 'care']}
        />
      </p>

      <div className="about-grid">
        <div className="about-copy" data-fade>
          <h3>
            A developer. A problem solver.
            <br />
            Always a work in progress.
          </h3>
          <p>{data.about.bio}</p>
          <a className="text-link has-roll" href={data.about.socials[1].url} target="_blank" rel="noreferrer">
            <span>More on GitHub</span> <ArrowUpRight size={15} />
          </a>
        </div>

        <ol className="timeline">
          <span className="timeline-rail" aria-hidden="true">
            <i />
          </span>
          {data.experiences.map((e) => (
            <li className="tl-item" key={e.id}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-text">
                <span className="micro">{e.period}</span>
                <h4>{e.title}</h4>
                <p>{e.company.split(',')[0]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="toolbox">
        <span className="micro muted" data-fade>
          A few tools of the trade
        </span>
        <ul className="skill-cloud">
          {data.skills.map((s) => (
            <li key={s.id}>
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
