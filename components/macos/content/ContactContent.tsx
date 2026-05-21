'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Send, MapPin, Terminal } from 'lucide-react';
import type { SocialLink } from '@/types/portfolio';
import { SOCIAL_ICON_MAP, getSocialIconKey } from '@/lib/socials';

interface ContactContentProps {
  email: string;
  location: string;
  name: string;
  socials?: SocialLink[];
}

export default function ContactContent({
  email,
  location,
  name,
  socials,
}: ContactContentProps) {
  const [tab, setTab] = useState<'form' | 'terminal'>('form');
  const [lines, setLines] = useState<string[]>([
    `$ whoami`,
    `> ${name}`,
    `$ mail --to ${email}`,
    `> Ready to connect.`,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = String(fd.get('subject') || 'Portfolio inquiry');
    const body = String(fd.get('message') || '');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="tile-light flex h-full flex-col p-4 sm:p-6">
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('form')}
          className={tab === 'form' ? 'btn-primary !py-2 !text-[14px]' : 'btn-pearl-capsule'}
        >
          Compose
        </button>
        <button
          type="button"
          onClick={() => setTab('terminal')}
          className={`flex items-center gap-1 ${tab === 'terminal' ? 'btn-primary !py-2 !text-[14px]' : 'btn-pearl-capsule'}`}
        >
          <Terminal className="h-3 w-3" /> Terminal
        </button>
      </div>

      {tab === 'form' ? (
        <div className="grid flex-1 gap-6 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              required
              placeholder="Your name"
              className="h-11 w-full rounded-apple-pill border border-apple-hairline bg-apple-canvas px-5 text-body outline-none focus:border-apple-primary focus:outline focus:outline-2 focus:outline-apple-primary-focus"
            />
            <input
              name="subject"
              placeholder="Subject"
              className="h-11 w-full rounded-apple-pill border border-apple-hairline bg-apple-canvas px-5 text-body outline-none focus:border-apple-primary"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Message"
              className="w-full resize-none rounded-apple-lg border border-apple-hairline bg-apple-canvas px-4 py-3 text-body outline-none focus:border-apple-primary"
            />
            <button type="submit" className="btn-primary w-full gap-2">
              <Send className="h-4 w-4" /> Send message
            </button>
            <p className="text-caption flex items-center gap-1 text-apple-ink-muted-48">
              <MapPin className="h-3 w-3" /> {location}
            </p>
          </form>
          <div className="grid grid-cols-2 gap-2 content-start">
            {socials?.map((s) => {
              const Icon = SOCIAL_ICON_MAP[getSocialIconKey(s.platform, s.icon)];
              return (
                <Link
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="utility-card flex flex-col items-center !p-4 active:border-apple-primary"
                >
                  {Icon && <Icon className="mb-2 h-5 w-5 text-apple-primary" />}
                  <span className="text-caption-strong">{s.platform}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          className="tile-dark flex-1 overflow-hidden rounded-apple-lg font-mono text-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="border-b border-white/10 px-3 py-2 text-apple-body-muted">zsh</div>
          <div className="max-h-[280px] space-y-1 overflow-auto p-3 text-apple-primary-on-dark">
            {lines.map((line, i) => (
              <p key={i} className={line.startsWith('$') ? 'text-apple-body-muted' : ''}>
                {line}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setLines((p) => [...p, '$ ping portfolio.local', '> All systems go.'])
            }
            className="btn-secondary-pill m-3 !border-apple-primary-on-dark !text-apple-primary-on-dark !text-[12px]"
          >
            Run script
          </button>
        </motion.div>
      )}
    </div>
  );
}
