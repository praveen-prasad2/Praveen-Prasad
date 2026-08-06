'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/cn';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Scroll zoom on header brand / bar
  useEffect(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    if (!header || !brand) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        brand,
        { scale: 1.08, letterSpacing: '0.02em' },
        {
          scale: 1,
          letterSpacing: '0em',
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 180,
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        header,
        { backdropFilter: 'blur(0px)' },
        {
          backdropFilter: 'blur(16px)',
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 120,
            scrub: true,
          },
        }
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300',
        scrolled
          ? 'border-b border-primary/10 bg-bg/80'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="container-main flex h-16 items-center justify-between md:h-[4.5rem]">
        <a
          ref={brandRef}
          href="#hero"
          className="group flex origin-left items-center gap-2 font-mono text-sm tracking-wide text-white will-change-transform"
        >
          <span className="text-primary transition group-hover:text-glow">~/</span>
          <span className="font-display text-base font-semibold tracking-tight">
            praveen<span className="text-primary">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="btn !py-2 !px-4 !text-xs">
            Initiate Contact
          </MagneticButton>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/20 text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 border-t border-primary/10 bg-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <ul className="container-main flex flex-col gap-1 py-8">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-white/5 py-4 font-mono text-sm text-white/80 transition hover:text-primary"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                <span className="text-primary/50">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn w-full"
            >
              Initiate Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
