'use client';

import type { Experience } from '@/types/portfolio';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/ui/Reveal';
import KineticHeading from '@/components/ui/KineticHeading';
import { cn } from '@/lib/cn';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ experiences }: { experiences: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );

      const nodes = container.querySelectorAll<HTMLElement>('[data-timeline-dot]');
      gsap.fromTo(
        nodes,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          stagger: 0,
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container-main">
        <Reveal>
          <p className="eyebrow">Experience</p>
        </Reveal>
        <KineticHeading as="h2" delay={60} className="heading-lg mt-4">
          Career <span className="text-accent">log</span>
        </KineticHeading>

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/[0.08] md:block" />
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-accent via-accent to-mint md:block"
          />

          <div className="space-y-10 md:space-y-16">
            {experiences.map((exp, i) => {
              const isRight = i % 2 === 1;
              return (
                <Reveal
                  key={exp.id}
                  delay={i * 80}
                  direction={isRight ? 'right' : 'left'}
                >
                  <article
                    className={cn(
                      'relative md:w-1/2',
                      isRight ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'
                    )}
                  >
                    <div
                      data-timeline-dot
                      className={cn(
                        'absolute top-6 hidden h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-glow-sm md:block',
                        isRight ? '-left-[7px]' : '-right-[7px]'
                      )}
                    />
                    <div className="card-glow">
                      <div
                        className={cn(
                          'flex flex-wrap items-start justify-between gap-4',
                          isRight ? '' : 'md:flex-row-reverse'
                        )}
                      >
                        <div>
                          <h3 className="heading-md !text-xl">{exp.title}</h3>
                          <p className="mt-1 font-mono text-sm text-accent">
                            {exp.company}
                          </p>
                        </div>
                        <span className="tag shrink-0">{exp.period}</span>
                      </div>
                      <p className="body mt-4 !text-base">{exp.description}</p>
                      <div
                        className={cn(
                          'mt-5 flex flex-wrap gap-2',
                          isRight ? '' : 'md:justify-end'
                        )}
                      >
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
