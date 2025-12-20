"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

export default function Hero({ name, title, start = true }: { name: string; title: string; start?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!start) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(
      subTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      ".scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=0.5"
    );

    gsap.to(".hero-bg-glow", {
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, [start]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] hero-bg-glow" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 text-center space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold">
            Available for new projects
          </span>
        </div>
        
        <h1 
          ref={textRef}
          className="text-6xl md:text-9xl font-black tracking-tighter text-white"
        >
          {name.split(' ')[0]} <span className="text-blue-600">.</span>
        </h1>
        
        <p 
          ref={subTextRef}
          className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed uppercase tracking-widest"
        >
          {title} <span className="mx-2 text-white/10">|</span> Entrepreneur
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </div>
    </section>
  );
}

