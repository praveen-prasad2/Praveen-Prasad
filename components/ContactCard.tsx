'use client';

import BentoCard from './BentoCard';
import Link from 'next/link';
import { SocialLink } from '@/types/portfolio';
import { SOCIAL_ICON_MAP, getSocialIconKey } from '@/lib/socials';
import { MapPin, Send } from 'lucide-react';

interface ContactCardProps {
  email: string;
  location: string;
  /** Kept for call-site compatibility */
  name?: string;
  socials?: SocialLink[];
}

export default function ContactCard({ email, location, socials }: ContactCardProps) {
  return (
    <BentoCard id="contact" className="md:col-span-2 lg:col-span-4" delay={0.22}>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-600 dark:text-violet-400">
              Connectivity
            </span>
            <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tighter text-foreground md:text-5xl">
              Ready for the <br />{' '}
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
                next mission?
              </span>
            </h3>
            <div className="mt-6 flex items-center gap-2 text-sm text-foreground/50">
              <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>{location} (Open to Global Remote)</span>
            </div>
          </div>

          <a
            className="group relative mt-8 flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-4 text-white shadow-[0_16px_40px_-12px_rgba(139,92,246,0.45)] transition-all hover:from-violet-500 hover:to-cyan-500 dark:shadow-[0_16px_40px_-12px_rgba(139,92,246,0.55)]"
            href={`mailto:${email}?subject=Let's work together`}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Start Conversation</p>
              <p className="text-lg font-bold text-white">{email}</p>
            </div>
            <Send className="h-6 w-6 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {socials && socials.length > 0 && socials.map((social) => {
            const iconKey = getSocialIconKey(social.platform, social.icon);
            const Icon = SOCIAL_ICON_MAP[iconKey];
            return (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] p-6 transition-all hover:border-violet-500/35 hover:bg-violet-500/[0.05] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)] dark:bg-cyan-400 dark:shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                </div>
                {Icon && <Icon className="mb-3 h-6 w-6 text-foreground/45 transition-colors group-hover:text-foreground" />}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35 transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300">
                  {social.platform}
                </span>
                <span className="mt-1 w-full truncate text-center text-xs font-medium text-foreground/50 transition-colors group-hover:text-foreground">
                  {social.handle || 'Link'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
}
