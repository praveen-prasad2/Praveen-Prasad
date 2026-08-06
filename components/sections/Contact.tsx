'use client';

import type { SocialLink } from '@/types/portfolio';
import { Github, Instagram, Linkedin, Mail, MapPin, Terminal } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
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
  return (
    <section id="contact" className="section pb-24">
      <div className="container-main">
        <div className="gradient-border relative overflow-hidden rounded-sm border border-primary/15 bg-bg-secondary/60 px-6 py-14 text-center backdrop-blur-md md:px-12 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,255,136,0.1), transparent 70%)',
            }}
            aria-hidden
          />

          <div className="relative">
            <Reveal>
              <p className="label">// contact</p>
              <h2 className="heading-lg mt-4">
                Ready to <span className="text-primary">build</span>?
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="body mx-auto mt-5 max-w-xl">
                Most great products begin with a conversation. Website, app, or
                automation — let&apos;s connect and ship something worth
                remembering.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-3 font-mono text-base text-white transition hover:text-primary md:text-lg"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {email}
                </a>
                <p className="flex items-center gap-2 font-mono text-sm text-muted">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  {location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon ?? ''] ?? Linkedin;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card flex items-center gap-2 !px-4 !py-2.5 text-sm transition hover:border-primary/30 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {social.platform}
                    </a>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={340}>
              <MagneticButton href={`mailto:${email}`} className="btn-solid mt-12">
                <Terminal className="h-4 w-4" />
                Open Channel
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
