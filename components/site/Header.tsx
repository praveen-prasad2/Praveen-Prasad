'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import RollText from './RollText';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import data from '@/data/portfolio.json';

const navLinks: [string, string][] = [['About', 'about'], ['Services', 'services'], ['Contact', 'contact']];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const current = hovered ?? active;

  // Scroll spy
  useEffect(() => {
    const ids = ['home', ...navLinks.map(([, id]) => id)];
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          setActive(id === 'home' ? null : id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Slide the pill indicator under the hovered / active link
  useIsoLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    const place = () => {
      const link = current ? nav.querySelector<HTMLAnchorElement>(`a[href="#${current}"]`) : null;
      if (!link) {
        indicator.style.opacity = '0';
        return;
      }
      indicator.style.opacity = '1';
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [current]);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 180 && !openRef.current;
        header.classList.toggle('is-hidden', hide);
        header.classList.toggle('is-scrolled', self.scroll() > 40);
      },
    });
    return () => trigger.kill();
  }, []);

  // Menu: escape to close, lock scrolling while open
  useEffect(() => {
    openRef.current = open;
    document.documentElement.classList.toggle('menu-locked', open);
    if (open) headerRef.current?.classList.remove('is-hidden');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header ref={headerRef} className={open ? 'site-header menu-open' : 'site-header'}>
        <a className="wordmark" href="#home" aria-label="Praveen Prasad home">
          Praveen Prasad<span>.</span>
        </a>

        <nav ref={navRef} className="nav" aria-label="Main navigation" onMouseLeave={() => setHovered(null)}>
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
          {navLinks.map(([name, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={current === id ? 'is-current' : undefined}
              aria-current={active === id ? 'true' : undefined}
              onMouseEnter={() => setHovered(id)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
            >
              {name}
            </a>
          ))}
        </nav>

        <MagneticButton as="a" href={`mailto:${data.about.email}`} className="nav-cta has-roll">
          <RollText>Say hello</RollText>
          <ArrowUpRight size={14} />
        </MagneticButton>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <i />
          <i />
        </button>
      </header>

      <div id="mobile-menu" className={open ? 'menu-overlay is-open' : 'menu-overlay'}>
        <nav aria-label="Mobile navigation">
          {navLinks.map(([name, id], i) => (
            <a
              key={id}
              className="menu-link"
              href={`#${id}`}
              style={{ '--i': i } as CSSProperties}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span>
                <small className="micro">0{i + 1}</small>
                {name}
              </span>
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${data.about.email}`} tabIndex={open ? 0 : -1}>
            {data.about.email}
          </a>
          <div>
            {data.about.socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
