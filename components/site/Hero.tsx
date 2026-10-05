'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import HeroField from './HeroField';
import RollText from './RollText';
import Split from './Split';
import VelocityMarquee, { STAR_PATH } from './VelocityMarquee';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import data from '@/data/portfolio.json';

function yearsOfExperience(experiences: { period: string }[]) {
  const earliest = experiences[experiences.length - 1]?.period ?? '';
  const match = earliest.match(/\d{4}/);
  if (!match) return 1;
  return Math.max(1, new Date().getFullYear() - Number(match[0]));
}

const stats: [number, string][] = [
  [yearsOfExperience(data.experiences), 'Years experience'],
  [data.projects.length, 'Projects shipped'],
  [data.skills.length, 'Tools mastered'],
];

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).format(
        new Date()
      ) + ' IST';
    setClock(format());
    const id = setInterval(() => setClock(format()), 30000);
    return () => clearInterval(id);
  }, []);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const counters = gsap.utils.toArray<HTMLElement>('[data-count]', el);
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
        tl.from('.ht-line .sc', { yPercent: 118, rotate: 7, duration: 1.25, stagger: 0.03 })
          .from('.ht-star', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.6)' }, 0.5)
          .from('.hero-field', { autoAlpha: 0, duration: 1.8, ease: 'power2.out' }, 0)
          .from('.hero-kicker > *', { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.25)
          .from('.hero-reveal', { y: 36, autoAlpha: 0, duration: 1, stagger: 0.09 }, 0.55)
          .from('.vmarquee', { autoAlpha: 0, y: 30, duration: 1 }, 0.8);
        counters.forEach((c) => {
          const target = Number(c.dataset.count);
          const state = { v: 0 };
          tl.to(
            state,
            {
              v: target,
              duration: 1.6,
              ease: 'power2.out',
              onStart: () => {
                c.textContent = '0+';
              },
              onUpdate: () => {
                c.textContent = `${Math.round(state.v)}+`;
              },
            },
            0.8
          );
        });
        intro.current = tl;

        const out = { trigger: el, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.ht-line.l1', { xPercent: -14, ease: 'none', scrollTrigger: out });
        gsap.to('.ht-line.l2', { xPercent: 10, ease: 'none', scrollTrigger: out });
        gsap.to('.ht-line.l3', { xPercent: -6, ease: 'none', scrollTrigger: out });
        gsap.to('.hero-inner', { yPercent: 18, ease: 'none', scrollTrigger: out });
        gsap.to('.hero-bottom', {
          autoAlpha: 0,
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: '55% top', scrub: true },
        });
        gsap.to('.ht-star', { rotate: 360, ease: 'none', scrollTrigger: { ...out, scrub: 0.6 } });

        return () => {
          intro.current = null;
        };
      },
      el
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  return (
    <section ref={root} id="home" className="hero" data-theme="dark" aria-labelledby="hero-title">
      <HeroField />
      <div className="hero-inner">
        <div className="hero-kicker">
          <span className="pill micro">
            <i className="status-dot" /> Available for work
          </span>
          {clock && (
            <span className="micro muted">
              {data.about.location.split(',')[1]?.trim() ?? 'Kerala'} — {clock}
            </span>
          )}
        </div>

        <h1 className="hero-title" id="hero-title">
          <span className="sr-only">Thoughtful code. Real impact.</span>
          <span className="ht-line l1" aria-hidden="true">
            <Split text="Thoughtful" decorative />
          </span>
          <span className="ht-line l2" aria-hidden="true">
            <Split text="code." decorative />{' '}
            <em>
              <Split text="Real" decorative />
            </em>
          </span>
          <span className="ht-line l3" aria-hidden="true">
            <em>
              <Split text="impact." decorative />
            </em>
            <svg viewBox="0 0 24 24" className="ht-star">
              <path d={STAR_PATH} />
            </svg>
          </span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-intro hero-reveal">
            <p className="hero-sub">
              I&rsquo;m {data.about.name}, a {data.about.title.toLowerCase()}. I turn complex ideas into simple, considered digital
              experiences.
            </p>
            <div className="hero-ctas">
              <MagneticButton as="a" href={`mailto:${data.about.email}`} className="btn btn-primary has-roll">
                <RollText>{'Let’s talk'}</RollText>
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>

          <dl className="hero-stats hero-reveal" aria-label="Quick facts">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt className="micro">{label}</dt>
                <dd data-count={value}>{value}+</dd>
              </div>
            ))}
          </dl>

          <div className="hero-now hero-reveal">
            <span className="micro muted">Currently</span>
            <p>
              {data.experiences[0].title} · {data.experiences[0].company.split(',')[0]}
            </p>
            <span className="micro muted">{data.about.location.replace(',', ', ')}</span>
          </div>
        </div>
      </div>

      <VelocityMarquee items={data.skills.map((s) => s.name)} />
    </section>
  );
}
