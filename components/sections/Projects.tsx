'use client';

import type { Project } from '@/types/portfolio';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/ui/Reveal';
import KineticHeading from '@/components/ui/KineticHeading';
import TiltCard from '@/components/ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <TiltCard className="h-full">
      <article className="card-glow group flex h-full flex-col overflow-hidden">
        <div
          data-project-media
          className="relative -mx-5 -mt-5 mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-accent/20 via-bg-surface to-mint/10 will-change-transform md:-mx-6 md:-mt-6 md:mb-6"
        >
          <span className="font-display text-5xl font-semibold text-white/10">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-xs text-accent/60">
            {String(index + 1).padStart(2, '0')}
          </span>
          {project.link && (
            <ExternalLink className="h-4 w-4 text-ink-muted transition group-hover:text-accent" />
          )}
        </div>

        <h3 className="heading-md mt-4 !text-xl transition group-hover:text-accent">
          {project.title}
        </h3>
        <p className="body mt-3 flex-1 !text-sm">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        {project.link && (
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-accent opacity-0 transition group-hover:opacity-100">
            view_project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        )}
      </article>
    </TiltCard>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </a>
  ) : (
    content
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinEnabled, setPinEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    setPinEnabled(!reduceMotion && !coarsePointer && isDesktop);
  }, []);

  useEffect(() => {
    if (!pinEnabled) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - section.offsetWidth;

      // Stretch the scroll distance beyond the raw pixel travel so the
      // horizontal move reads as deliberate rather than a quick jump-cut.
      const SCROLL_STRETCH = 1.6;

      const tl = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance() * SCROLL_STRETCH}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const cards = track.querySelectorAll<HTMLElement>('[data-project-slide]');
      cards.forEach((card) => {
        const media = card.querySelector('[data-project-media]');
        if (!media) return;
        gsap.fromTo(
          media,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 90%',
              end: 'left 45%',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [pinEnabled]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section relative overflow-hidden"
    >
      <div className="container-main">
        <Reveal>
          <p className="eyebrow">Projects</p>
        </Reveal>
        <KineticHeading as="h2" delay={60} className="heading-lg mt-4">
          Deployed <span className="text-accent">systems</span>
        </KineticHeading>
        <Reveal delay={140}>
          <p className="body mt-4 max-w-2xl">
            Selected work — products and platforms built end-to-end with focus
            on clarity, performance, and growth.
          </p>
        </Reveal>
      </div>

      {pinEnabled ? (
        <div
          ref={trackRef}
          className="mt-14 flex w-max gap-6 pl-5 pr-[10vw] will-change-transform md:pl-8"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              data-project-slide
              className="w-[min(85vw,480px)] shrink-0"
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="container-main mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
