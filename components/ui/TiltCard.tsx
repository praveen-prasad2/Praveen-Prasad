'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';

export default function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - y) * maxTilt * 2;
      const rotY = (x - 0.5) * maxTilt * 2;
      setStyle({
        transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.08s ease-out',
      });
    };

    const onLeave = () => {
      setStyle({
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.4s ease-out',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={style}
    >
      {children}
    </div>
  );
}
