'use client';

import {
  useRef,
  type MouseEvent,
  type ReactNode,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
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

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
  };

  const shared = {
    ref: ref as never,
    className: cn(
      'inline-flex transition-transform duration-200 ease-out will-change-transform',
      className
    ),
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  };

  if (as === 'button') {
    return (
      <button
        {...shared}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
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
