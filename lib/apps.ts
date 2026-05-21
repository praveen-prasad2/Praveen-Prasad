import type { AppMeta } from '@/types/apps';

export const PORTFOLIO_APPS: AppMeta[] = [
  { id: 'about', label: 'About', iosIcon: 'about', windowTitle: 'About Me', iosTitle: 'About' },
  { id: 'services', label: 'Services', iosIcon: 'services', windowTitle: 'Services' },
  { id: 'experience', label: 'Experience', iosIcon: 'experience', windowTitle: 'Experience' },
  { id: 'skills', label: 'Skills', iosIcon: 'skills', windowTitle: 'Skills' },
  { id: 'projects', label: 'Projects', iosIcon: 'projects', windowTitle: 'Projects — Safari', iosTitle: 'Projects' },
  { id: 'contact', label: 'Contact', iosIcon: 'contact', windowTitle: 'Mail', iosTitle: 'Contact' },
];

export const DESKTOP_EXTRA_APPS: AppMeta[] = [
  { id: 'terminal', label: 'Terminal', iosIcon: 'terminal', windowTitle: 'Terminal' },
  { id: 'resume', label: 'Resume', iosIcon: 'notes', windowTitle: 'Resume.pdf' },
  { id: 'notes', label: 'Notes', iosIcon: 'notes', windowTitle: 'Notes' },
  { id: 'safari', label: 'Safari', iosIcon: 'safari', windowTitle: 'Safari' },
  { id: 'music', label: 'Music', iosIcon: 'music', windowTitle: 'Music' },
];

export const IOS_EXTRA_APPS: AppMeta[] = [
  { id: 'photos', label: 'Photos', iosIcon: 'photos', windowTitle: 'Photos', iosTitle: 'Photos' },
  { id: 'notes', label: 'Notes', iosIcon: 'notes', windowTitle: 'Notes' },
  { id: 'safari', label: 'Safari', iosIcon: 'safari', windowTitle: 'Safari' },
  { id: 'terminal', label: 'Terminal', iosIcon: 'terminal', windowTitle: 'Terminal' },
];

export function getAppMeta(id: string): AppMeta | undefined {
  return [...PORTFOLIO_APPS, ...DESKTOP_EXTRA_APPS, ...IOS_EXTRA_APPS].find(
    (a) => a.id === id
  );
}
