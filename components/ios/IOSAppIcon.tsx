'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { ICON_COLORS } from './constants';
import type { AppMeta } from '@/types/apps';

const EMOJI: Partial<Record<string, string>> = {
  about: '👤',
  services: '⚡',
  experience: '💼',
  skills: '🛠',
  projects: '📁',
  contact: '✉️',
  photos: '🖼',
  notes: '📝',
  safari: '🧭',
  terminal: '⌨️',
  music: '🎵',
};

export default function IOSAppIcon({
  app,
  onOpen,
  size = 'grid',
  darkWallpaper = false,
}: {
  app: AppMeta;
  onOpen: () => void;
  size?: 'grid' | 'dock';
  darkWallpaper?: boolean;
}) {
  const bg = ICON_COLORS[app.iosIcon];
  const label = app.iosTitle ?? app.label;
  const lightIcon = ['notes', 'settings'].includes(app.iosIcon);

  return (
    <motion.button
      type="button"
      className={cn(
        'flex flex-col items-center gap-1 outline-none',
        size === 'dock' ? 'w-[62px]' : 'w-[72px]'
      )}
      onClick={onOpen}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-[22%]',
          size === 'dock' ? 'h-[52px] w-[52px] text-xl' : 'h-[60px] w-[60px] text-2xl',
          lightIcon ? 'text-apple-ink' : 'text-apple-on-dark'
        )}
        style={{ backgroundColor: bg }}
      >
        {EMOJI[app.iosIcon] ?? app.label[0]}
      </div>
      {size === 'grid' && (
        <span
          className={`max-w-[72px] truncate text-caption ${
            darkWallpaper ? 'text-apple-on-dark' : 'text-apple-ink'
          }`}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
