'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import {
  DESKTOP_ICON_CELL_WIDTH_PX,
  DESKTOP_ICON_SIZE_PX,
  MAC_FOLDER_ICON,
} from '@/components/macos/constants';
import type { DesktopApp } from '@/components/macos/types';

interface DesktopIconProps {
  app: DesktopApp;
  darkWallpaper?: boolean;
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  onOpen: () => void;
  selected: boolean;
  onSelect: () => void;
}

function DesktopIconGraphic({ app }: { app: DesktopApp }) {
  const sizeClass = 'object-contain';
  const style = {
    width: DESKTOP_ICON_SIZE_PX,
    height: DESKTOP_ICON_SIZE_PX,
  };

  if (app.iconImage) {
    return (
      <Image
        src={app.iconImage}
        alt=""
        width={DESKTOP_ICON_SIZE_PX}
        height={DESKTOP_ICON_SIZE_PX}
        className={sizeClass}
        style={style}
        draggable={false}
      />
    );
  }

  if (app.icon.startsWith('folder')) {
    return (
      <Image
        src={MAC_FOLDER_ICON}
        alt=""
        width={DESKTOP_ICON_SIZE_PX}
        height={DESKTOP_ICON_SIZE_PX}
        className={sizeClass}
        style={style}
        draggable={false}
      />
    );
  }

  const appBg: Record<string, string> = {
    'app-terminal': 'bg-apple-black text-apple-primary-on-dark',
    'app-notes': 'bg-apple-pearl text-apple-ink border border-apple-hairline',
    'app-safari': 'bg-apple-primary text-apple-on-dark',
    'app-music': 'bg-apple-ink text-apple-on-dark',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-apple-lg',
        appBg[app.icon] ?? 'bg-apple-ink text-apple-on-dark'
      )}
      style={style}
    >
      {app.icon === 'app-safari' && (
        <div
          className="rounded-full border-2 border-white/50 bg-apple-canvas"
          style={{ width: DESKTOP_ICON_SIZE_PX * 0.5, height: DESKTOP_ICON_SIZE_PX * 0.5 }}
        />
      )}
      {app.icon === 'app-terminal' && (
        <span className="font-mono text-xs text-green-400">&gt;_</span>
      )}
      {app.icon === 'app-notes' && <span className="text-lg">📝</span>}
      {app.icon === 'app-music' && <span className="text-lg">🎵</span>}
    </div>
  );
}

export default function DesktopIcon({
  app,
  darkWallpaper = false,
  position,
  onPositionChange,
  onOpen,
  selected,
  onSelect,
}: DesktopIconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const moved = useRef(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      onSelect();
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
      moved.current = false;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position, onSelect]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!ref.current?.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        moved.current = true;
        setDragging(true);
        onPositionChange(
          Math.max(8, dragStart.current.posX + dx),
          Math.max(40, dragStart.current.posY + dy)
        );
      }
    },
    [onPositionChange]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (ref.current?.hasPointerCapture(e.pointerId)) {
        ref.current.releasePointerCapture(e.pointerId);
      }
      setDragging(false);
      if (!moved.current) onOpen();
    },
    [onOpen]
  );

  useEffect(() => {
    const clear = () => setDragging(false);
    window.addEventListener('pointerup', clear);
    return () => window.removeEventListener('pointerup', clear);
  }, []);

  return (
    <motion.button
      ref={ref}
      type="button"
      className={cn(
        'absolute z-10 flex flex-col items-center gap-0.5 rounded-lg p-1.5 outline-none transition-colors',
        selected &&
          (darkWallpaper
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-black/[0.04] ring-1 ring-apple-hairline'),
        dragging && 'cursor-grabbing'
      )}
      style={{
        left: position.x,
        top: position.y,
        width: DESKTOP_ICON_CELL_WIDTH_PX,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      whileTap={{ scale: 0.92 }}
      aria-label={`Open ${app.label}`}
    >
      <motion.div
        animate={selected ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 0.35 }}
      >
        <DesktopIconGraphic app={app} />
      </motion.div>
      <span
        className={cn(
          'max-w-full truncate px-0.5 text-center text-[10px] leading-tight sm:text-[11px]',
          darkWallpaper ? 'text-apple-on-dark' : 'text-apple-ink'
        )}
      >
        {app.label}
      </span>
    </motion.button>
  );
}
