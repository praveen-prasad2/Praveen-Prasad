'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface MenuBarProps {
  userName: string;
  onSpotlight: () => void;
  wallpaperIndex: number;
  onWallpaperChange: (index: number) => void;
  wallpaperCount: number;
}

export default function MenuBar({
  userName,
  onSpotlight,
  wallpaperIndex,
  onWallpaperChange,
  wallpaperCount,
}: MenuBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="global-nav fixed left-0 right-0 top-0 z-[200] flex items-center justify-between px-5">
      <div className="flex items-center gap-5">
        <span className="text-sm text-apple-on-dark" aria-hidden>
          &#63743;
        </span>
        <span className="hidden text-nav-link font-semibold text-apple-on-dark sm:inline">
          {userName}
        </span>
        <nav className="hidden gap-5 text-nav-link text-apple-body-muted md:flex">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
          <span>Help</span>
        </nav>
      </div>
      <div className="flex items-center gap-4 text-nav-link text-apple-on-dark">
        <button
          type="button"
          onClick={onSpotlight}
          className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-apple-ink text-apple-on-dark"
          aria-label="Spotlight search"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onWallpaperChange((wallpaperIndex + 1) % wallpaperCount)}
          className="hidden rounded-apple-pill bg-apple-ink px-3 py-1.5 text-nav-link sm:inline"
        >
          Wallpaper
        </button>
        <span className="tabular-nums">{time}</span>
      </div>
    </header>
  );
}
