'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { DESKTOP_APPS } from './constants';
import { useWindows } from '@/lib/window-store';
import type { AppId } from '@/types/apps';

const DOCK_IDS: (AppId | 'finder')[] = [
  'finder',
  'about',
  'projects',
  'safari',
  'terminal',
  'contact',
  'music',
];

const DOCK_APPS = DOCK_IDS.map((id) => {
  if (id === 'finder') return { id: 'finder' as const, label: 'Finder' };
  const app = DESKTOP_APPS.find((a) => a.id === id)!;
  return { id: app.id, label: app.label };
});

export default function Dock() {
  const { openApp, windows, restoreWindow } = useWindows();
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (id: AppId | 'finder') => {
    if (id === 'finder') return;
    const minimized = windows.find((w) => w.appId === id && w.minimized);
    if (minimized) restoreWindow(minimized.id);
    else openApp(id);
  };

  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-[150] flex justify-center px-2">
      <motion.div
        className="dock-frosted pointer-events-auto flex items-end gap-1 px-3 py-2 sm:gap-1.5"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 24 }}
      >
        {DOCK_APPS.map((app, i) => {
          const isOpen = app.id !== 'finder' && windows.some((w) => w.appId === app.id);
          const scale =
            hovered === null ? 1 : hovered === i ? 1.4 : Math.abs(hovered - i) === 1 ? 1.15 : 1;

          return (
            <motion.button
              key={app.id}
              type="button"
              className="relative flex flex-col items-center"
              style={{ originY: 1 }}
              animate={{ scale }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(app.id)}
              aria-label={app.label}
            >
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-apple-lg text-caption-strong',
                  app.id === 'finder'
                    ? 'bg-apple-primary text-apple-on-primary'
                    : 'bg-apple-canvas border border-apple-hairline text-apple-ink'
                )}
              >
                {app.id === 'finder' ? '😊' : app.label.charAt(0)}
              </div>
              {isOpen && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-apple-ink" />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
