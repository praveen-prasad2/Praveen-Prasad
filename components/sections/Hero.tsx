'use client';

import type { About } from '@/types/portfolio';
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import TerminalType from '@/components/ui/TerminalType';
import Reveal from '@/components/ui/Reveal';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ about }: { about: About }) {
  const firstName = about.name.split(' ')[0];
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    if (!section || !content) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Main content: zoom + fade as user scrolls out of hero
      gsap.to(content, {
        scale: 1.18,
        opacity: 0,
        y: -48,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Headline zooms slightly more for depth
      if (title) {
        gsap.to(title, {
          scale: 1.12,
          letterSpacing: '-0.04em',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '65% top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      <div
        ref={contentRef}
        className="container-main relative origin-center will-change-transform"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="label">system://identity</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 ref={titleRef} className="heading-xl mt-5 origin-left">
                <span className="text-white">{firstName}</span>{' '}
                <span className="text-primary text-glow">
                  {about.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-3 font-mono text-sm text-primary/70 md:text-base">
                {about.title.toLowerCase().replace(/\s+/g, '_')}
                <span className="text-muted"> // status: available</span>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="body mt-6 max-w-xl">
                I build websites, products, and businesses — not just pages.
                Digital experiences engineered to solve problems and generate
                results.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <p className="mt-4 font-mono text-sm text-white/50">
                Developer. Problem Solver. Creator.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href="#projects" className="btn-solid">
                  Explore Work
                </MagneticButton>
                <MagneticButton href="#contact" className="btn-ghost">
                  Start a Project
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} direction="left">
            <div className="gradient-border relative overflow-hidden rounded-sm border border-primary/15 bg-bg-secondary/70 p-5 shadow-glow-sm backdrop-blur-md md:p-6">
              <div className="mb-4 flex items-center gap-2 border-b border-primary/10 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/15" />
                <span className="ml-2 font-mono text-[11px] tracking-wider text-muted">
                  terminal — session_01
                </span>
              </div>
              <TerminalType
                lines={[
                  `$ whoami`,
                  `> ${about.name}`,
                  `$ cat mission.txt`,
                  `> Build systems that scale.`,
                  `> Ship interfaces that convert.`,
                  `> Automate what slows teams down.`,
                  `$ status`,
                  `> online — ready to collaborate_`,
                ]}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#about"
        className="container-main mt-16 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition hover:text-primary"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-primary" />
        scroll
      </a>
    </section>
  );
}
