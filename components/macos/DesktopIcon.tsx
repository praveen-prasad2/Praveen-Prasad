'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import type { DesktopApp } from '@/components/macos/types';

const MAC_FOLDER_SRC = '/mac-folder.svg';

interface DesktopIconProps {
  app: DesktopApp;
  darkWallpaper?: boolean;
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  onOpen: () => void;
  selected: boolean;
  onSelect: () => void;
}

function MacFolderIcon({ className }: { className?: string }) {
  return (
    <Image
      src={MAC_FOLDER_SRC}
      alt=""
      width={64}
      height={64}
      className={cn('h-14 w-14 object-contain sm:h-16 sm:w-16', className)}
      draggable={false}
    />
  );
}

function FolderIcon({ variant }: { variant: DesktopApp['icon'] }) {
  if (variant.startsWith('folder')) {
    return <MacFolderIcon />;
  }

  const appBg: Record<string, string> = {
    'app-code': 'bg-apple-ink text-apple-on-dark',
    'app-safari': 'bg-apple-primary text-apple-on-dark',
    'app-mail': 'bg-apple-primary text-apple-on-dark',
    'app-terminal': 'bg-apple-black text-apple-primary-on-dark',
    'app-notes': 'bg-apple-pearl text-apple-ink border border-apple-hairline',
    'app-music': 'bg-apple-ink text-apple-on-dark',
    'app-resume': 'bg-apple-canvas text-apple-primary border border-apple-hairline',
  };

  return (
    <div
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-apple-lg sm:h-16 sm:w-16',
        appBg[variant] ?? appBg['app-code']
      )}
    >
      {variant === 'app-safari' && (
        <div className="h-8 w-8 rounded-full border-2 border-white/50 bg-apple-canvas" />
      )}
      {variant === 'app-mail' && (
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )}
      {variant === 'app-code' && (
        <span className="font-mono text-lg font-bold text-emerald-400">&lt;/&gt;</span>
      )}
      {variant === 'app-terminal' && (
        <span className="font-mono text-sm text-green-400">&gt;_</span>
      )}
      {variant === 'app-notes' && <span className="text-2xl">📝</span>}
      {variant === 'app-music' && <span className="text-2xl">🎵</span>}
      {variant === 'app-resume' && <span className="text-2xl">📄</span>}
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
        'absolute z-10 flex w-[88px] flex-col items-center gap-1 rounded-lg p-2 outline-none transition-colors sm:w-[96px]',
        selected &&
          (darkWallpaper
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-black/[0.04] ring-1 ring-apple-hairline'),
        dragging && 'cursor-grabbing'
      )}
      style={{ left: position.x, top: position.y }}
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
        <FolderIcon variant={app.icon} />
      </motion.div>
      <span
        className={cn(
          'max-w-full truncate px-1 text-center text-caption sm:text-xs',
          darkWallpaper ? 'text-apple-on-dark' : 'text-apple-ink'
        )}
      >
        {app.label}
      </span>
    </motion.button>
  );
}
