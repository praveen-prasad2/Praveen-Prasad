'use client';

import Link from 'next/link';
import type { SocialLink } from '@/types/portfolio';
import { SOCIAL_ICON_MAP, getSocialIconKey } from '@/lib/socials';

interface ContactProps {
  email: string;
  location: string;
  name: string;
  socials?: SocialLink[];
}

export default function Contact({ email, location, name, socials }: ContactProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = String(fd.get('subject') || 'Portfolio inquiry');
    const body = String(fd.get('message') || '');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section border-b border-black/15">
      <div className="container-main grid gap-16 lg:grid-cols-2">
        <div>
          <p className="label mb-4">05 — Contact</p>
          <h2 className="heading-lg">Let&apos;s work together</h2>
          <p className="body mt-6 max-w-md">
            Have a project in mind? Send a message and I&apos;ll get back to you.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="label mb-2">Email</p>
              <a href={`mailto:${email}`} className="text-xl font-bold text-ink hover:opacity-80">
                {email}
              </a>
            </div>
            <div>
              <p className="label mb-2">Location</p>
              <p className="text-white">{location}</p>
            </div>
            {socials && socials.length > 0 && (
              <div>
                <p className="label mb-3">Social</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Icon = SOCIAL_ICON_MAP[getSocialIconKey(s.platform, s.icon)];
                    return (
                      <Link
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost !px-4 !py-2 !text-xs"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {s.platform}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input name="name" required placeholder="Your name" className="input" />
          <input name="subject" placeholder="Subject" className="input" />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Message"
            className="input resize-none"
          />
          <button type="submit" className="btn mt-6">
            Send message
          </button>
        </form>
      </div>

      <footer className="container-main mt-20 border-t border-black/15 pt-8 text-center text-sm text-faint">
        &copy; {new Date().getFullYear()} {name}. All rights reserved.
      </footer>
    </section>
  );
}
