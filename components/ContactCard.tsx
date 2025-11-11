'use client';

import BentoCard from './BentoCard';
import Link from 'next/link';
import { SocialLink } from '@/types/portfolio';
import { SOCIAL_ICON_MAP, getSocialIconKey } from '@/lib/socials';

interface ContactCardProps {
  email: string;
  location: string;
  name: string;
  socials?: SocialLink[];
}

export default function ContactCard({ email, location, name, socials }: ContactCardProps) {
  return (
    <BentoCard id="contact" className="md:col-span-1 lg:col-span-2 flex flex-col justify-between" delay={0.22}>
      <div>
        <p className="uppercase text-xs tracking-[0.3em] text-primary-600 dark:text-primary-400">
          Collaborate
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-3 leading-snug">
          Let’s build something remarkable together.
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Based in {location}. Open to remote-friendly opportunities and product collaborations.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <a
          className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          href={`mailto:${email}?subject=Let's work together`}
        >
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Email {(name.split(' ')[0] || name).trim()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
          </div>
          <span className="text-xs text-primary-600 dark:text-primary-400">Contact →</span>
        </a>

        {socials && socials.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {socials.map((social) => {
              const iconKey = getSocialIconKey(social.platform, social.icon);
              const Icon = SOCIAL_ICON_MAP[iconKey];
              return (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-3 py-3 text-center hover:border-primary-500 dark:hover:border-primary-500 transition-colors flex flex-col items-center gap-2"
              >
                {Icon && <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    {social.platform}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {social.handle || 'Visit'}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>
    </BentoCard>
  );
}

