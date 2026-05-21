'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useWindows } from '@/lib/window-store';
import type { WindowState } from './types';

interface MacWindowProps {
  window: WindowState;
  children: ReactNode;
  darkChrome?: boolean;
}

export default function MacWindow({ window: win, children, darkChrome }: MacWindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
    activeId,
  } = useWindows();
  const dragRef = useRef({ startX: 0, startY: 0, winX: 0, winY: 0 });
  const isActive = activeId === win.id;

  const onTitlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized) return;
      if ((e.target as HTMLElement).closest('[data-window-control]')) return;
      focusWindow(win.id);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        winX: win.x,
        winY: win.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [win, focusWindow]
  );

  const onTitlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      moveWindow(
        win.id,
        Math.max(0, dragRef.current.winX + dx),
        Math.max(44, dragRef.current.winY + dy)
      );
    },
    [win.id, moveWindow]
  );

  const onTitlePointerUp = useCallback((e: React.PointerEvent) => {
    if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
  }, []);

  if (win.minimized) return null;

  const style = win.maximized
    ? { left: 0, top: 44, width: '100%', height: 'calc(100% - 44px - 80px)' }
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={cn(
        'window-chrome fixed flex flex-col overflow-hidden',
        isActive ? 'z-[100]' : 'z-[50]',
        win.maximized && 'rounded-none'
      )}
      style={{ ...style, zIndex: win.zIndex }}
      onMouseDown={() => focusWindow(win.id)}
    >
      <div
        className="sub-nav-frosted flex h-[52px] shrink-0 cursor-default items-center gap-2 px-3"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onPointerCancel={onTitlePointerUp}
      >
        <div className="flex gap-2" data-window-control>
          <button
            type="button"
            aria-label="Close"
            data-window-control
            className="relative flex h-3 w-3 shrink-0 rounded-full bg-[#ff5f57] before:absolute before:-inset-2 before:content-['']"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
          />
          <button
            type="button"
            aria-label="Minimize"
            data-window-control
            className="relative flex h-3 w-3 shrink-0 rounded-full bg-[#febc2e] before:absolute before:-inset-2 before:content-['']"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
          />
          <button
            type="button"
            aria-label="Maximize"
            data-window-control
            className="relative flex h-3 w-3 shrink-0 rounded-full bg-[#28c840] before:absolute before:-inset-2 before:content-['']"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(win.id);
            }}
          />
        </div>
        <span className="text-tagline pointer-events-none flex-1 truncate text-center text-apple-ink">
          {win.title}
        </span>
        <div className="w-[52px]" />
      </div>
      <div
        className={cn(
          'min-h-0 flex-1 overflow-auto',
          darkChrome ? 'window-body-dark' : 'window-body'
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
