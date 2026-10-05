'use client';

import { useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import RollText from './RollText';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import { REDUCED_OK, revealCommon } from '@/lib/motion';

type Venture = {
  name: string;
  role?: string;
  badge?: string;
  tagline?: string;
  description: string;
  cta?: { label: string; href: string };
  accent: string;
  kind: 'duoph' | 'productshare' | 'orbit';
};

const ventures: Venture[] = [
  {
    name: 'Duoph Technologies',
    role: 'Co-Founder',
    description:
      'Helping businesses grow through custom websites, applications, branding, digital marketing, and business automation.',
    cta: { label: 'Explore Duoph', href: 'https://www.duoph.in/' },
    accent: '#18704e',
    kind: 'duoph',
  },
  {
    name: 'ProductShare',
    role: 'Founder',
    tagline: 'Your products. One link.',
    description: 'A simpler way for businesses to share their entire product catalogue through one professional link.',
    cta: { label: 'Explore ProductShare', href: 'https://productshare.in/' },
    accent: '#ff5b22',
    kind: 'productshare',
  },
  {
    name: 'Orbit',
    badge: 'Coming Soon',
    description: 'A new venture is taking shape. More details coming soon.',
    accent: '#eeebe3',
    kind: 'orbit',
  },
];

function OrbitVisual() {
  return (
    <svg className="orbit-svg" viewBox="0 0 200 200" aria-hidden="true">
      <circle className="orbit-core" cx="100" cy="100" r="7" />
      <g className="orbit-ring orbit-ring-a">
        <ellipse cx="100" cy="100" rx="86" ry="30" />
        <circle className="orbit-moon" cx="186" cy="100" r="3.5" />
      </g>
      <g className="orbit-ring orbit-ring-b">
        <ellipse cx="100" cy="100" rx="62" ry="62" />
        <circle className="orbit-moon" cx="100" cy="38" r="2.5" />
      </g>
      <g className="orbit-ring orbit-ring-c">
        <ellipse cx="100" cy="100" rx="38" ry="38" />
      </g>
    </svg>
  );
}

export default function Ventures() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(
      REDUCED_OK,
      () => {
        revealCommon(el);
        gsap.from('.venture', {
          y: 90,
          rotate: (i: number) => [-2.5, 0, 2.5][i % 3],
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: '.ventures-grid', start: 'top 82%' },
        });
        gsap.fromTo(
          '.venture-visual',
          { clipPath: 'inset(100% 0% 0% 0% round 18px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 18px)',
            duration: 1.3,
            stagger: 0.12,
            ease: 'expo.out',
            delay: 0.2,
            clearProps: 'clipPath',
            scrollTrigger: { trigger: '.ventures-grid', start: 'top 82%' },
          }
        );
      },
      el
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="ventures" className="ventures section" data-theme="dark" aria-labelledby="ventures-title">
      <div className="section-kicker micro" data-kicker>
        <span>
          <b>01</b> — Ventures I&rsquo;m building
        </span>
        <span>Founder &amp; co-founder</span>
      </div>
      <div className="section-heading">
        <h2 id="ventures-title" data-split>
          <Split text="From ideas to" by="words" />
          <br />
          <em>
            <Split text="things that matter." by="words" />
          </em>
        </h2>
        <p data-fade>
          Beyond development, I&rsquo;m building businesses and products that help people work smarter and bring their ideas to
          life.
        </p>
      </div>

      <ul className="ventures-grid">
        {ventures.map((v, i) => (
          <li key={v.name} className={`venture is-${v.kind}`} style={{ '--v': v.accent } as CSSProperties}>
            <div className="venture-top">
              {v.role && (
                <span className="venture-role micro">
                  <i aria-hidden="true" />
                  {v.role}
                </span>
              )}
              {v.badge && <span className="venture-badge micro">{v.badge}</span>}
              <span className="venture-index micro" aria-hidden="true">
                0{i + 1}
              </span>
            </div>

            <div className="venture-visual">
              {v.kind === 'orbit' && <OrbitVisual />}
              <h3 className="venture-name">{v.name}</h3>
            </div>

            <div className="venture-body">
              {v.tagline && <p className="venture-tagline">{v.tagline}</p>}
              <p className="venture-desc">{v.description}</p>
            </div>

            {v.cta && (
              <a className="venture-cta has-roll" href={v.cta.href} target="_blank" rel="noopener noreferrer">
                <RollText>{v.cta.label}</RollText>
                <span className="venture-cta-icon" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
