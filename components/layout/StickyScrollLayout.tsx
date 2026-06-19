'use client';

import { Children, isValidElement, useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type StickyScrollLayoutProps = {
  children: ReactNode;
};

const SECTION_THEMES = ['dark', 'red', 'light'] as const;

export default function StickyScrollLayout({ children }: StickyScrollLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const childArray = Children.toArray(children);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((wrapper) => {
        const inner = wrapper?.firstElementChild as HTMLElement | null;
        if (!wrapper || !inner) return;

        gsap.fromTo(
          inner,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      });
    }, main);

    return () => ctx.revert();
  }, [childArray.length]);

  return (
    <main ref={mainRef} className="relative">
      {childArray.map((child, index) => {
        const theme = SECTION_THEMES[index % SECTION_THEMES.length];

        return (
          <div
            key={isValidElement(child) && child.key != null ? child.key : index}
            ref={(el) => {
              if (el) sectionRefs.current[index] = el;
            }}
            data-section-theme={theme}
            className="sticky top-0 h-screen overflow-y-auto overscroll-y-contain [&_.section]:border-t-0 [&>section]:min-h-full"
            style={{ zIndex: index + 1 }}
          >
            {child}
          </div>
        );
      })}
    </main>
  );
}
