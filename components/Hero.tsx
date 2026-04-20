"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

export default function Hero({ name, title, start = true }: { name: string; title: string; start?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

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
      opacity: 0.55,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    if (accentRef.current) {
      gsap.to(accentRef.current, {
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

  }, [start]);

  return (
    <section 
      ref={containerRef}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[100px] hero-bg-glow dark:bg-violet-600/[0.12]" />
      <div className="pointer-events-none absolute top-[18%] right-[12%] h-[280px] w-[280px] rounded-full bg-cyan-500/[0.08] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[22%] left-[8%] h-[220px] w-[220px] rounded-full bg-fuchsia-600/[0.07] blur-[80px]" />
      
      <div className="relative z-10 max-w-5xl space-y-8 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-foreground/12 bg-foreground/[0.04] px-5 py-2 backdrop-blur-md shadow-[0_8px_40px_-20px_rgba(99,102,241,0.35)] dark:border-white/[0.12] dark:bg-white/[0.04] dark:shadow-[0_8px_40px_-20px_rgba(99,102,241,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground/75">
            Available for new projects
          </span>
        </div>
        
        <h1 
          ref={textRef}
          className="text-6xl font-extrabold tracking-tighter [text-shadow:0_2px_40px_rgba(99,102,241,0.12)] dark:[text-shadow:0_4px_60px_rgba(0,0,0,0.45)] md:text-8xl lg:text-9xl"
        >
          <span className="text-hero-title">
            {name.split(' ')[0]}
          </span>{" "}
          <span ref={accentRef} className="inline-block bg-gradient-to-br from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
            .
          </span>
        </h1>
        
        <p 
          ref={subTextRef}
          className="mx-auto max-w-2xl text-base font-medium uppercase leading-relaxed tracking-[0.28em] text-foreground/45 md:text-xl"
        >
          {title} <span className="mx-2 text-foreground/15">|</span> Entrepreneur
        </p>
      </div>

      <div className="scroll-indicator absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground/25">Scroll to Explore</span>
        <div className="flex flex-col items-center gap-2">
          <ArrowDown className="h-4 w-4 text-violet-600/70 dark:text-violet-400/60" strokeWidth={1.5} />
          <div className="h-12 w-px bg-gradient-to-b from-violet-500/80 to-transparent dark:from-violet-400/80" />
        </div>
      </div>
    </section>
  );
}
