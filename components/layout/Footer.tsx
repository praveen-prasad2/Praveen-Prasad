import type { SocialLink } from '@/types/portfolio';
import { Github, Instagram, Linkedin } from 'lucide-react';

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
};

export default function Footer({
  name,
  socials = [],
}: {
  name: string;
  socials?: SocialLink[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/10 bg-bg-secondary/50">
      <div className="container-main flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/70">
            end_of_transmission
          </p>
          <p className="mt-2 font-sans text-sm text-muted">
            © {year} {name}. Crafted with precision.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon ?? ''] ?? Linkedin;
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/15 text-muted transition hover:border-primary/40 hover:text-primary hover:shadow-glow-sm"
                aria-label={social.platform}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
