'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PortfolioData } from '@/types/portfolio';
import type { AppId } from '@/types/apps';
import { IOS_HOME_APPS, IOS_WALLPAPERS } from './constants';
import IOSWallpaper from './IOSWallpaper';
import StatusBar from './StatusBar';
import DynamicIsland from './DynamicIsland';
import IOSAppIcon from './IOSAppIcon';
import IOSDock from './IOSDock';
import IOSAppScreen from './IOSAppScreen';
import LockScreen from './LockScreen';
interface IPhoneHomeProps {
  data: PortfolioData;
}

export default function IPhoneHome({ data }: IPhoneHomeProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const [openApp, setOpenApp] = useState<AppId | null>(null);
  const [page, setPage] = useState(0);

  const pages = [
    IOS_HOME_APPS.slice(0, 8),
    IOS_HOME_APPS.slice(8),
  ].filter((p) => p.length > 0);

  const open = (id: AppId) => setOpenApp(id);
  const close = () => setOpenApp(null);

  const wpColor = IOS_WALLPAPERS[wallpaperIdx % IOS_WALLPAPERS.length];
  const isDarkWp = wpColor === IOS_WALLPAPERS[2];
  const activeMeta = openApp
    ? IOS_HOME_APPS.find((a) => a.id === openApp)
    : null;

  return (
    <div className="fixed inset-0 overflow-hidden bg-apple-parchment">
      <div className="flex h-[100dvh] w-full flex-col">
        <IOSWallpaper color={wpColor} />
        <DynamicIsland
          active={!!openApp}
          title={activeMeta?.iosTitle ?? activeMeta?.label}
        />
        <StatusBar dark={isDarkWp && !openApp} />

        <AnimatePresence>
          {!unlocked && (
            <LockScreen name={data.about.name} onUnlock={() => setUnlocked(true)} />
          )}
        </AnimatePresence>

        {unlocked && (
          <>
            <div
              className="relative flex-1 overflow-hidden px-5 pt-2"
              onTouchStart={(e) => {
                const t = e.touches[0];
                (e.currentTarget as HTMLElement & { _sx?: number })._sx = t.clientX;
              }}
              onTouchEnd={(e) => {
                const el = e.currentTarget as HTMLElement & { _sx?: number };
                const sx = el._sx;
                if (sx == null) return;
                const dx = e.changedTouches[0].clientX - sx;
                if (dx < -50 && page < pages.length - 1) setPage((p) => p + 1);
                if (dx > 50 && page > 0) setPage((p) => p - 1);
              }}
            >
              <motion.div
                className="flex h-full"
                animate={{ x: `-${page * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              >
                {pages.map((pageApps, pi) => (
                  <div
                    key={pi}
                    className="grid w-full shrink-0 grid-cols-4 gap-x-2 gap-y-6 content-start"
                  >
                    {pageApps.map((app) => (
                      <IOSAppIcon
                        key={app.id}
                        app={app}
                        darkWallpaper={isDarkWp}
                        onOpen={() => open(app.id)}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
              {pages.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        page === i ? 'w-4 bg-apple-primary' : 'w-1.5 bg-apple-hairline'
                      }`}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <IOSDock onOpen={open} />

            <button
              type="button"
              className="sr-only"
              onClick={() => setWallpaperIdx((i) => (i + 1) % IOS_WALLPAPERS.length)}
            >
              Cycle wallpaper
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {openApp && (
            <IOSAppScreen
              key={openApp}
              appId={openApp}
              data={data}
              onClose={close}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
