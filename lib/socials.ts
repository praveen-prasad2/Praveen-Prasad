import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import {
  Linkedin,
  Github,
  Globe,
  Instagram,
  Dribbble,
  Youtube,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import XIcon from '@/components/XIcon';

export const SOCIAL_ICON_MAP: Record<string, LucideIcon | ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  github: Github,
  twitter: XIcon,
  x: XIcon,
  instagram: Instagram,
  dribbble: Dribbble,
  youtube: Youtube,
  portfolio: Briefcase,
  website: Globe,
  globe: Globe,
  link: ExternalLink,
};

export const SOCIAL_ICON_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'GitHub', value: 'github' },
  { label: 'X', value: 'twitter' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Dribbble', value: 'dribbble' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Portfolio / Website', value: 'portfolio' },
  { label: 'Generic Link', value: 'link' },
];

export const getSocialIconKey = (platform: string, icon?: string): string => {
  if (icon && SOCIAL_ICON_MAP[icon]) return icon;
  const normalized = platform.toLowerCase().trim();
  if (SOCIAL_ICON_MAP[normalized]) return normalized;
  return 'link';
};

