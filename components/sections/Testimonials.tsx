'use client';

import type { Testimonial } from '@/types/portfolio';
import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { gsap } from 'gsap';
import Reveal from '@/components/ui/Reveal';
import KineticHeading from '@/components/ui/KineticHeading';
import { cn } from '@/lib/cn';

export default function Testimonials({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slidesRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);

  activeRef.current = active;
  pausedRef.current = paused;

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setActive((v) => (v + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const container = slidesRef.current;
    if (!container) return;
    const slides = container.querySelectorAll<HTMLElement>('[data-slide]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    slides.forEach((slide, i) => {
      const isActive = i === active;
      if (reduceMotion) {
        gsap.set(slide, { opacity: isActive ? 1 : 0, display: isActive ? 'flex' : 'none' });
        return;
      }
      gsap.to(slide, {
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.97,
        duration: 0.5,
        ease: 'power2.out',
        pointerEvents: isActive ? 'auto' : 'none',
        onStart: () => {
          if (isActive) gsap.set(slide, { zIndex: 1 });
        },
        onComplete: () => {
          if (!isActive) gsap.set(slide, { zIndex: 0 });
        },
      });
    });
  }, [active]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section">
      <div className="container-main">
        <Reveal>
          <p className="eyebrow">Testimonials</p>
        </Reveal>
        <KineticHeading as="h2" delay={60} className="heading-lg mt-4">
          Signal from the <span className="text-accent">field</span>
        </KineticHeading>

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={slidesRef} className="relative min-h-[280px] md:min-h-[220px]">
            {testimonials.map((t, i) => (
              <blockquote
                key={t.id}
                data-slide
                className="card-glow absolute inset-0 flex flex-col justify-center opacity-0 md:px-12 md:py-10"
                style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
              >
                <Quote className="h-6 w-6 text-accent/50" aria-hidden />
                <p className="mt-5 text-lg leading-relaxed text-ink/[0.85] md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-white/[0.08] pt-4">
                  <p className="font-display text-sm font-medium text-ink">{t.name}</p>
                  <p className="mt-1 font-mono text-[11px] text-accent/70">
                    {t.role} · {t.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === active ? 'w-6 bg-accent' : 'w-1.5 bg-white/[0.15] hover:bg-white/30'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
