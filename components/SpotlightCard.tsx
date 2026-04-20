'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientColor?: string;
  children: React.ReactNode;
}

const MAX_TILT = 5;

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  gradientColor = 'var(--spotlight-hover)',
  children,
  className = '',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const nx = (x - cx) / cx;
    const ny = (y - cy) / cy;
    setTilt({
      rx: -ny * MAX_TILT,
      ry: nx * MAX_TILT,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => {
    setOpacity(0);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="[perspective:1400px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className={`relative overflow-hidden rounded-[1.35rem] border-[color:var(--spotlight-border)] [background:var(--spotlight-surface)] shadow-[var(--spotlight-shadow)] backdrop-blur-xl transition-[transform,box-shadow] duration-200 ease-out will-change-transform ${className}`}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 42%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] ring-1 ring-inset ring-[color:var(--spotlight-ring)]" />
        <div className="relative z-10 [transform:translateZ(12px)]">{children}</div>
      </div>
    </div>
  );
};

export default SpotlightCard;
