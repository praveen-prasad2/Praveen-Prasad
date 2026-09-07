'use client';

import type { SocialLink } from '@/types/portfolio';
import { useEffect, useRef } from 'react';
import { Github, Instagram, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '@/components/ui/Reveal';
import KineticHeading from '@/components/ui/KineticHeading';
import MagneticButton from '@/components/ui/MagneticButton';
import XLogo from '@/components/ui/XLogo';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  x: XLogo,
};

export default function Contact({
  email,
  location,
  socials = [],
}: {
  email: string;
  location: string;
  socials?: SocialLink[];
}) {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const emailWrapRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const underline = underlineRef.current;
    const wrap = emailWrapRef.current;
    if (!underline || !wrap) return;

    gsap.killTweensOf(underline);
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === wrap) st.kill();
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(underline, { scaleX: 1 });
      return;
    }

    const tween = gsap.fromTo(
      underline,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="contact" className="section pb-24">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-surface/60 px-6 py-14 text-center backdrop-blur-md md:px-12 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,92,252,0.14), transparent 70%)',
            }}
            aria-hidden
          />

          <div className="relative">
            <Reveal>
              <p className="eyebrow">Contact</p>
            </Reveal>
            <KineticHeading as="h2" delay={80} className="heading-lg mt-4">
              Ready to <span className="text-accent">build</span>?
            </KineticHeading>

            <Reveal delay={160}>
              <p className="body mx-auto mt-5 max-w-xl">
                Most great products begin with a conversation. Website, app, or
                automation — let&apos;s connect and ship something worth
                remembering.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a
                  ref={emailWrapRef}
                  href={`mailto:${email}`}
                  className="group relative inline-flex items-center gap-3 font-mono text-base text-ink transition hover:text-accent md:text-lg"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  {email}
                  <span
                    ref={underlineRef}
                    className="pointer-events-none absolute -bottom-1 left-7 right-0 h-px origin-left scale-x-0 bg-accent"
                  />
                </a>
                <p className="flex items-center gap-2 font-mono text-sm text-ink-muted">
                  <MapPin className="h-4 w-4 text-accent/70" />
                  {location}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {socials.map((social, i) => {
                const Icon = SOCIAL_ICONS[social.icon ?? ''] ?? Linkedin;
                return (
                  <Reveal key={social.id} delay={320 + i * 60} direction="none" scale={0.9}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card flex items-center gap-2 !px-4 !py-2.5 text-sm transition hover:border-accent/30 hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                      {social.platform}
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={480}>
              <MagneticButton href={`mailto:${email}`} className="btn-solid mt-12">
                <Send className="h-4 w-4" />
                Open Channel
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
