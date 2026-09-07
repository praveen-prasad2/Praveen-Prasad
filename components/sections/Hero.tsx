'use client';

import type { About } from '@/types/portfolio';
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import KineticHeading from '@/components/ui/KineticHeading';
import Reveal from '@/components/ui/Reveal';
import HeroScene from '@/components/effects/HeroScene';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ about }: { about: About }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const scene = sceneRef.current;
    if (!section || !content) return;

    // Force a clean slate regardless of any tween left over from a prior run
    // (React 18 Strict Mode double-invokes this effect on initial mount).
    const targets = scene ? [content, scene] : [content];
    gsap.killTweensOf(targets);
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === section) st.kill();
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(targets, { clearProps: 'transform,filter,opacity' });
      return;
    }

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.to(content, {
        y: -60,
        opacity: 0,
        filter: 'blur(4px)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    );

    // Background scene drifts/fades slower than the text for a sense of depth.
    if (scene) {
      tweens.push(
        gsap.to(scene, {
          y: -24,
          opacity: 0,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      );
    }

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      <div ref={sceneRef} className="absolute inset-0 z-0 will-change-transform">
        <HeroScene />
      </div>

      <div ref={contentRef} className="container-main relative z-10 will-change-transform">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              Full-stack developer · available
            </span>
          </div>
        </Reveal>

        <KineticHeading as="h1" delay={120} className="heading-xl mt-6">
          {about.name}
        </KineticHeading>

        <Reveal delay={520}>
          <p className="body mt-7 max-w-2xl">
            I build websites, products, and businesses — not just pages. Digital
            experiences engineered to solve problems and generate results.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <p className="mt-4 font-mono text-sm text-ink-muted">
            Developer. Problem Solver. Creator.
          </p>
        </Reveal>

        <Reveal delay={680}>
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

      <a
        href="#about"
        className="container-main mt-16 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted transition hover:text-accent"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-accent" />
        scroll
      </a>
    </section>
  );
}
