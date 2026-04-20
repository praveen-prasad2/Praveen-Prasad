'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed left-1/2 z-50 w-[min(96%,56rem)] -translate-x-1/2 transition-all duration-500 ${
        isScrolled ? 'top-4' : 'top-6'
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 rounded-full border border-[color:var(--nav-border)] px-4 py-2.5 shadow-[var(--nav-shadow)] backdrop-blur-2xl transition-all duration-500 sm:px-5 sm:py-3 ${
          isScrolled ? 'bg-[color:var(--nav-shell-scrolled)]' : 'bg-[color:var(--nav-shell)]'
        }`}
      >
        <button
          onClick={() => scrollToSection('about')}
          className="text-xl font-extrabold tracking-tight text-gradient"
        >
          P.
        </button>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="group relative px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--nav-link)] transition-colors hover:text-[color:var(--nav-link-hover)]"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-3/5 dark:from-violet-400 dark:to-cyan-400" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[color:var(--nav-link)] transition-colors hover:text-[color:var(--nav-link-hover)] md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex h-5 w-6 flex-col items-end justify-between">
              <span className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'w-6 translate-y-2 -rotate-45' : 'w-6'}`} />
              <span className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'w-6 -translate-y-2 rotate-45' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="mt-3 flex flex-col gap-1 rounded-3xl border border-[color:var(--nav-border)] bg-[color:var(--nav-mobile-bg)] p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="rounded-xl px-3 py-3 text-left text-base font-medium text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
