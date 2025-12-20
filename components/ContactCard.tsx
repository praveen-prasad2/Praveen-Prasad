'use client';

import BentoCard from './BentoCard';
import Link from 'next/link';
import { SocialLink } from '@/types/portfolio';
import { SOCIAL_ICON_MAP, getSocialIconKey } from '@/lib/socials';
import { Mail, MapPin, Send } from 'lucide-react';

interface ContactCardProps {
  email: string;
  location: string;
  name: string;
  socials?: SocialLink[];
}

export default function ContactCard({ email, location, name, socials }: ContactCardProps) {
  return (
    <BentoCard id="contact" className="md:col-span-2 lg:col-span-4" delay={0.22}>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold">
              Connectivity
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight tracking-tighter">
              Ready for the <br /> <span className="text-blue-500">next mission?</span>
            </h3>
            <div className="flex items-center gap-2 mt-6 text-white/50 text-sm">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{location} (Open to Global Remote)</span>
            </div>
          </div>

          <a
            className="group relative flex items-center justify-between rounded-2xl bg-blue-600 px-6 py-4 mt-8 overflow-hidden transition-all hover:bg-blue-500"
            href={`mailto:${email}?subject=Let's work together`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">Start Conversation</p>
              <p className="text-lg font-bold text-white">{email}</p>
            </div>
            <Send className="w-6 h-6 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                </div>
                {Icon && <Icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors mb-3" />}
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-blue-400 transition-colors font-bold">
                  {social.platform}
                </span>
                <span className="text-xs text-white/50 mt-1 font-medium group-hover:text-white transition-colors truncate w-full text-center">
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
