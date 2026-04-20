'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { THEME_STORAGE_KEY, applyThemeClass } from '@/lib/theme';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    applyThemeClass(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-8 w-[3.25rem] shrink-0 items-center rounded-full border border-[color:var(--nav-toggle-border)] bg-[color:var(--nav-toggle-bg)] p-0.5 shadow-inner transition-colors hover:border-[color:var(--nav-toggle-border-hover)]"
    >
      <span
        className={`absolute left-0.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--nav-toggle-thumb)] shadow-md transition-transform duration-200 ease-out ${
          dark ? 'translate-x-0' : 'translate-x-[1.15rem]'
        }`}
      >
        {dark ? (
          <Moon className="h-3.5 w-3.5 text-violet-200" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
        )}
      </span>
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
