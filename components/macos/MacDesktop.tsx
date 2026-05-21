'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { PortfolioData } from '@/types/portfolio';
import { WindowProvider, useWindows } from '@/lib/window-store';
import { DESKTOP_APPS, WALLPAPERS } from './constants';
import Wallpaper from './Wallpaper';
import MenuBar from './MenuBar';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import MacWindow from './MacWindow';
import AppContent from '@/components/content/AppContent';
import Spotlight from './Spotlight';
import ContextMenu from './ContextMenu';
import type { AppId } from '@/types/apps';

function DesktopInner({ data }: { data: PortfolioData }) {
  const { windows, openApp } = useWindows();
  const [wallpaperIdx, setWallpaperIdx] = useState(0);
  const [spotlight, setSpotlight] = useState(false);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<AppId | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const init: Record<string, { x: number; y: number }> = {};
    DESKTOP_APPS.forEach((a) => {
      init[a.id] = { ...a.defaultPosition };
    });
    return init;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlight((s) => !s);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const sortIcons = useCallback(() => {
    const sorted = [...DESKTOP_APPS].sort((a, b) => a.label.localeCompare(b.label));
    const next: Record<string, { x: number; y: number }> = {};
    sorted.forEach((a, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      next[a.id] = { x: 48 + col * 100, y: 72 + row * 120 };
    });
    setPositions(next);
  }, []);

  const onDesktopClick = () => {
    setSelected(null);
    setCtx(null);
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtx({ x: e.clientX, y: e.clientY });
  };

  const wp = WALLPAPERS[wallpaperIdx];
  const isDarkWallpaper = !!wp.image;

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      onClick={onDesktopClick}
      onContextMenu={onContextMenu}
    >
      <Wallpaper color={wp.color} image={wp.image} dark={isDarkWallpaper} />
      <MenuBar
        userName={data.about.name}
        onSpotlight={() => setSpotlight(true)}
        wallpaperIndex={wallpaperIdx}
        onWallpaperChange={setWallpaperIdx}
        wallpaperCount={WALLPAPERS.length}
      />

      <div className="absolute inset-0 pb-20 pt-11">
        {DESKTOP_APPS.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            darkWallpaper={isDarkWallpaper}
            position={positions[app.id] ?? app.defaultPosition}
            onPositionChange={(x, y) =>
              setPositions((p) => ({ ...p, [app.id]: { x, y } }))
            }
            onOpen={() => openApp(app.id)}
            selected={selected === app.id}
            onSelect={() => setSelected(app.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {windows.map((win) =>
          !win.minimized ? (
            <MacWindow key={win.id} window={win}>
              <AppContent appId={win.appId} data={data} variant="desktop" />
            </MacWindow>
          ) : null
        )}
      </AnimatePresence>

      <Dock />
      <Spotlight open={spotlight} onClose={() => setSpotlight(false)} />
      <ContextMenu
        x={ctx?.x ?? 0}
        y={ctx?.y ?? 0}
        open={!!ctx}
        onClose={() => setCtx(null)}
        onChangeWallpaper={() =>
          setWallpaperIdx((i) => (i + 1) % WALLPAPERS.length)
        }
        onSortIcons={sortIcons}
      />
    </div>
  );
}

export default function MacDesktop({ data }: { data: PortfolioData }) {
  return (
    <WindowProvider>
      <AnimatePresence mode="wait">
        <DesktopInner data={data} />
      </AnimatePresence>
    </WindowProvider>
  );
}
