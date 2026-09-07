'use client';

import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/cn';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'a' | 'button';
} & (
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' })
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' })
);

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = 'a',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const quickX = useRef<((v: number) => void) | null>(null);
  const quickY = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    quickX.current = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    quickY.current = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
  }, []);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || !quickX.current || !quickY.current) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    quickX.current(x * strength);
    quickY.current(y * strength);
  };

  const handleLeave = () => {
    quickX.current?.(0);
    quickY.current?.(0);
  };

  const shared = {
    ref: ref as never,
    className: cn('inline-flex will-change-transform', className),
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  };

  if (as === 'button') {
    return (
      <button {...shared} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }

  return (
    <a {...shared} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  );
}
