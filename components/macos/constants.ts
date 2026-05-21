import { PORTFOLIO_APPS } from '@/lib/apps';
import { getAppMeta } from '@/lib/apps';
import { colors } from '@/lib/design-tokens';
import type { DesktopApp } from './types';
import type { AppId } from '@/types/apps';

const ICON_MAP: Record<string, DesktopApp['icon']> = {
  about: 'folder-blue',
  services: 'folder-purple',
  experience: 'folder-green',
  skills: 'app-code',
  projects: 'app-safari',
  contact: 'app-mail',
  terminal: 'app-terminal',
  resume: 'app-resume',
  notes: 'app-notes',
  safari: 'app-safari',
  music: 'app-music',
};

function toDesktopApp(
  id: AppId,
  pos: { x: number; y: number },
  size: { width: number; height: number }
): DesktopApp {
  const meta = getAppMeta(id)!;
  return {
    id,
    label: meta.label,
    icon: ICON_MAP[id] ?? 'folder-blue',
    defaultPosition: pos,
    windowTitle: meta.windowTitle,
    defaultSize: size,
  };
}

export const DESKTOP_APPS: DesktopApp[] = [
  ...PORTFOLIO_APPS.map((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    return toDesktopApp(a.id, { x: 48 + col * 100, y: 72 + row * 120 }, {
      width: 560,
      height: 500,
    });
  }),
  toDesktopApp('terminal', { x: 348, y: 72 }, { width: 520, height: 400 }),
  toDesktopApp('resume', { x: 48, y: 320 }, { width: 440, height: 380 }),
  toDesktopApp('notes', { x: 148, y: 320 }, { width: 480, height: 440 }),
  toDesktopApp('safari', { x: 248, y: 320 }, { width: 640, height: 480 }),
  toDesktopApp('music', { x: 348, y: 200 }, { width: 400, height: 420 }),
];

export type WallpaperConfig = {
  id: string;
  name: string;
  color: string;
  image?: string;
};

export const WALLPAPERS: WallpaperConfig[] = [
  {
    id: 'mac',
    name: 'macOS',
    color: colors.surfaceTile1,
    image: '/mac-wallpaper.jpg',
  },
  { id: 'parchment', name: 'Parchment', color: colors.canvasParchment },
  { id: 'canvas', name: 'Canvas', color: colors.canvas },
  { id: 'tile-1', name: 'Studio Dark', color: colors.surfaceTile1 },
  { id: 'tile-2', name: 'Studio', color: colors.surfaceTile2 },
];
