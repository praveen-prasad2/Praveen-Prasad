import { PORTFOLIO_APPS, IOS_EXTRA_APPS } from '@/lib/apps';
import { colors } from '@/lib/design-tokens';
import type { AppId, IOSIconStyle } from '@/types/apps';

export const IOS_HOME_APPS = [...PORTFOLIO_APPS, ...IOS_EXTRA_APPS];

export const IOS_DOCK_APPS: AppId[] = ['safari', 'contact', 'projects', 'terminal'];

/** Solid surfaces — no decorative gradients per DESIGN.md */
export const IOS_WALLPAPERS = [
  colors.canvasParchment,
  colors.canvas,
  colors.surfaceTile1,
];

/** Flat icon fills — Action Blue + tile surfaces */
export const ICON_COLORS: Record<IOSIconStyle, string> = {
  about: colors.primary,
  services: colors.ink,
  experience: colors.surfaceTile1,
  skills: colors.inkMuted80,
  projects: colors.primary,
  contact: colors.primaryFocus,
  photos: colors.ink,
  notes: colors.surfacePearl,
  safari: colors.primary,
  terminal: colors.surfaceBlack,
  music: colors.ink,
  settings: colors.surfaceChipTranslucent,
};
