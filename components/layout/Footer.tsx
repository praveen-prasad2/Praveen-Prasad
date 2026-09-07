import type { SocialLink } from '@/types/portfolio';
import { Github, Instagram, Linkedin } from 'lucide-react';
import XLogo from '@/components/ui/XLogo';

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  x: XLogo,
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
    <footer className="relative border-t border-white/[0.06]">
      <div className="container-main flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <p className="font-sans text-sm text-ink-muted">
          © {year} {name}. Crafted with precision.
        </p>

        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon ?? ''] ?? Linkedin;
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-muted transition hover:border-accent/40 hover:text-accent"
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
