'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-header">
      <nav className="container-main flex h-16 items-center justify-between">
        <a href="#hero" className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">
          PP
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-white/80 transition hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn hidden !py-2.5 !text-xs md:inline-flex">
          Contact
        </a>

        <button
          type="button"
          className="text-sm font-semibold text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div className={cn('border-t border-black/10 md:hidden', !open && 'hidden')}>
        <ul className="container-main flex flex-col gap-4 py-5">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-lg font-medium" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn w-full" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
