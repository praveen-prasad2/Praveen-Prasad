import type { SocialLink } from '@/types/portfolio';
import { Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

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
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="label">Contact</p>
            <h2 className="heading-lg mt-4">Got an Idea?</h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="body mt-6 text-white/80">
              Most great products begin with a conversation. Whether you need a
              website, a web application, or someone to help bring your idea to life,
              let&apos;s connect.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 font-anton text-2xl text-primary md:text-3xl">
              Let&apos;s Build Something Worth Remembering.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-col items-center gap-6">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 text-lg transition hover:text-primary"
              >
                <Mail className="h-5 w-5 text-primary" />
                {email}
              </a>

              <p className="flex items-center gap-3 text-white/70">
                <MapPin className="h-5 w-5 text-primary" />
                {location}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon ?? ''] ?? Linkedin;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card flex items-center gap-2 !px-5 !py-3 transition hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {social.platform}
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <a href={`mailto:${email}`} className="btn mt-12">
              Let&apos;s Build Something
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
