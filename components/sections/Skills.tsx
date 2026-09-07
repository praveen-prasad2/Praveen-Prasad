'use client';

import type { Skill } from '@/types/portfolio';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/ui/Reveal';
import KineticHeading from '@/components/ui/KineticHeading';
import Marquee from '@/components/ui/Marquee';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_LABELS: Record<string, string> = {
  Frontend: 'Development',
  Language: 'Development',
  Backend: 'Development',
  Database: 'Tools',
  Tools: 'Tools',
  CMS: 'Development',
  'E-commerce': 'Business',
  Design: 'Design & UI',
  Automation: 'Tools',
  DevOps: 'Tools',
  Cloud: 'Tools',
};

const CATEGORY_ORDER = ['Development', 'Design & UI', 'Tools', 'Business'];

function groupSkills(skills: Skill[]) {
  const groups: Record<string, Skill[]> = {};

  for (const skill of skills) {
    const label = CATEGORY_LABELS[skill.category] ?? skill.category;
    if (!groups[label]) groups[label] = [];
    groups[label].push(skill);
  }

  return CATEGORY_ORDER.filter((cat) => groups[cat]).map((cat) => ({
    category: cat,
    items: groups[cat],
  }));
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const groups = groupSkills(skills);
  const techNames = skills.map((s) => s.name);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-skill-card]'));
    const bars = Array.from(container.querySelectorAll<HTMLElement>('[data-bar-fill]'));

    // Force a clean slate regardless of any tween left over from a prior run
    // (React 18 Strict Mode double-invokes this effect in dev).
    gsap.killTweensOf([...cards, ...bars]);
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger && cards.includes(st.trigger as HTMLElement)) st.kill();
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { clearProps: 'transform', opacity: 1 });
      bars.forEach((bar) => {
        gsap.set(bar, { width: `${bar.dataset.barFill ?? '0'}%` });
      });
      return;
    }

    const tweens: gsap.core.Tween[] = [];

    cards.forEach((card, i) => {
      tweens.push(
        gsap.fromTo(
          card,
          { opacity: 0, y: 32, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      );

      const cardBars = card.querySelectorAll<HTMLElement>('[data-bar-fill]');
      cardBars.forEach((bar) => {
        const target = bar.dataset.barFill ?? '0';
        tweens.push(
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${target}%`,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        );
      });
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [groups]);

  return (
    <section id="skills" className="section !pb-0">
      <div className="container-main">
        <Reveal>
          <p className="eyebrow">Skills</p>
        </Reveal>
        <KineticHeading as="h2" delay={60} className="heading-lg mt-4">
          Toolkit. <span className="text-accent">Loaded.</span>
        </KineticHeading>
        <Reveal delay={140}>
          <p className="body mt-4 max-w-2xl">
            A production stack spanning frontend systems, backend services,
            automation, and deployment.
          </p>
        </Reveal>

        <div ref={cardsRef} className="mt-12 grid gap-5 sm:grid-cols-2">
          {groups.map((group, i) => (
            <div key={group.category} data-skill-card className="card-glow h-full">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium text-ink">
                  {group.category}
                </h3>
                <span className="font-mono text-[10px] text-accent/60">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm text-ink/80">{skill.name}</span>
                      <span className="font-mono text-[11px] text-ink-muted">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        data-bar-fill={skill.level}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-mint"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Marquee items={techNames} />
      </div>
    </section>
  );
}
