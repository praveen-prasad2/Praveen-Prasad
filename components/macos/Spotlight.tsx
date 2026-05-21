'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { DESKTOP_APPS } from './constants';
import { useWindows } from '@/lib/window-store';
import type { AppId } from '@/types/apps';

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
}

export default function Spotlight({ open, onClose }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { openApp } = useWindows();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = DESKTOP_APPS.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const select = (id: AppId) => {
    openApp(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[300] bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-[18%] z-[301] w-[min(92vw,560px)] -translate-x-1/2 overflow-hidden rounded-apple-pill border border-apple-hairline bg-apple-canvas"
            initial={{ opacity: 0, scale: 0.98, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -8 }}
          >
            <div className="flex h-11 items-center gap-3 border-b border-apple-hairline px-5">
              <Search className="h-4 w-4 text-apple-ink-muted-48" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent text-body text-apple-ink outline-none placeholder:text-apple-ink-muted-48"
              />
            </div>
            <ul className="max-h-64 overflow-auto py-2">
              {results.map((app) => (
                <li key={app.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-body text-apple-ink active:bg-apple-parchment"
                    onClick={() => select(app.id)}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-apple-primary text-caption-strong text-apple-on-primary">
                      {app.label[0]}
                    </span>
                    {app.label}
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-5 py-6 text-center text-caption text-apple-ink-muted-48">
                  No results
                </li>
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
