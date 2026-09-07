'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Walks text nodes under `root` and wraps each word in a masked span, preserving any inline markup (e.g. a colored accent span). */
function splitWordSpans(root: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text.trim()) return;

      const parts = text.split(/(\s+)/).filter((p) => p.length > 0);
      const frag = document.createDocumentFragment();

      parts.forEach((part) => {
        if (part.trim() === '') {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const outer = document.createElement('span');
        outer.style.display = 'inline-block';
        outer.style.overflow = 'hidden';
        outer.style.paddingBottom = '0.15em';
        outer.style.marginBottom = '-0.15em';
        outer.style.verticalAlign = 'top';

        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = part;
        inner.setAttribute('data-word', '');

        outer.appendChild(inner);
        frag.appendChild(outer);
        words.push(inner);
      });

      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  };

  Array.from(root.childNodes).forEach(walk);
  return words;
}

export default function KineticHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reuse already-split spans across React 18 Strict Mode's double-invoke
    // (the DOM split persists across the mount/unmount/remount cycle).
    let words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
    if (words.length === 0) {
      words = splitWordSpans(el);
    }

    // Force a clean slate regardless of any tween left over from a prior run.
    gsap.killTweensOf(words);
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill();
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(words, { clearProps: 'transform', opacity: 1 });
      return;
    }

    gsap.set(words, { yPercent: 110, opacity: 0 });
    const tween = gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      delay: delay / 1000,
      stagger: 0.045,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
