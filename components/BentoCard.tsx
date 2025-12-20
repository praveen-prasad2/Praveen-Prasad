'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export default function BentoCard({ children, className = '', delay = 0, id }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = cardRef.current;
    
    gsap.fromTo(el, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95 
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      id={id}
      className={className}
    >
      <SpotlightCard className="h-full p-6 group">
        {children}
      </SpotlightCard>
    </div>
  );
}
