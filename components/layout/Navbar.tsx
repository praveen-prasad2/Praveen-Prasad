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
  const [active, setActive] = useState<string>('');
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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

  // Hide header on scroll down, reveal on scroll up.
  // Animated on an inner wrapper, not <header> itself — a `transform` on
  // <header> would make it the containing block for its position:fixed
  // mobile-menu panel, collapsing that panel's top/bottom to header's own
  // ~64px box instead of the viewport.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (open) return;
          if (self.direction === 1 && self.scroll() > 120) {
            gsap.to(bar, { yPercent: -100, duration: 0.4, ease: 'power3.out' });
          } else {
            gsap.to(bar, { yPercent: 0, duration: 0.4, ease: 'power3.out' });
          }
        },
      });
    }, bar);

    return () => ctx.revert();
  }, [open]);

  // Active-section highlighting.
  useEffect(() => {
    const ctx = gsap.context(() => {
      LINKS.forEach((link) => {
        const section = document.getElementById(link.href.slice(1));
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) setActive(link.href);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        className={cn(
          'transition-colors duration-300 will-change-transform',
          scrolled
            ? 'border-b border-white/[0.06] bg-bg/75 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <nav className="container-main flex h-16 items-center justify-between md:h-[4.5rem]">
          <a
            href="#hero"
            className="flex items-center gap-1.5 font-display text-base font-semibold tracking-tight text-ink"
          >
            Praveen<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    active === link.href
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {link.label}
                  {active === link.href && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="#contact" className="btn !py-2 !px-4 !text-xs">
              Start a Project
            </MagneticButton>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 border-t border-white/[0.06] bg-bg/95 backdrop-blur-xl transition-all duration-300 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <ul className="container-main flex flex-col gap-1 py-8">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-white/5 py-4 text-base text-ink/[0.85] transition hover:text-accent"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a href="#contact" onClick={() => setOpen(false)} className="btn-solid w-full">
              Start a Project
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
