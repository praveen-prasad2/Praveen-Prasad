'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ name }: { name: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all ${
        isScrolled
          ? 'backdrop-blur bg-white/80 border-b border-gray-200/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="#top" className="text-lg font-semibold text-gray-900">
          <span className="rounded-full bg-primary-500/10 px-3 py-1 text-sm uppercase tracking-[0.3em] text-primary-600">
            Portfolio
          </span>
          <span className="ml-3 text-base font-medium">{name}</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative transition-colors hover:text-primary-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:"
            className="hidden rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-700 transition-all hover:border-primary-500 hover:text-primary-600 md:inline-flex"
          >
            Let’s Talk
          </a>
        </div>
      </nav>
    </header>
  );
}

