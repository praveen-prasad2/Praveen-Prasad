'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/10 bg-bg/80 py-3 backdrop-blur-md' : 'bg-transparent py-5'
      )}
    >
      <nav className="container-main flex items-center justify-between">
        <a href="#hero" className="font-anton text-xl tracking-wide text-primary">
          PP
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/70 transition hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn hidden lg:inline-flex">
          Let&apos;s Talk
        </a>

        <button
          type="button"
          className="text-sm font-medium text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div className={cn('border-t border-white/10 lg:hidden', !open && 'hidden')}>
        <ul className="container-main flex flex-col gap-4 py-5">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-lg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn w-full" onClick={() => setOpen(false)}>
              Let&apos;s Talk
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
