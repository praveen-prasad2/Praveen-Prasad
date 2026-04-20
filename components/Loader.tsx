"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  
  const [greeting, setGreeting] = useState("Hello");
  const greetings = ["Hello", "Bonjour", "Hola", "नमस्ते", "こんにちは", "Hi."];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < greetings.length - 1) {
        currentIndex++;
        setGreeting(greetings[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 200);

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    gsap.set(textRef.current, { opacity: 0, y: 20 });
    gsap.set(progressRef.current, { scaleX: 0 });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    })
    .to(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut",
    }, "-=0.5")
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power4.in",
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    });

    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.innerHTML = Math.round(counter.value).toString();
        }
      },
    });

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute top-1/2 left-1/2 h-[min(100vw,520px)] w-[min(100vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[100px]" />
      
      <div className="relative mb-14 flex h-24 w-24 items-center justify-center [perspective:400px]">
        <div className="loader-orbit absolute inset-2 rounded-2xl border-2 border-violet-500/50 shadow-[0_0_24px_rgba(139,92,246,0.35)]" />
        <div
          className="loader-orbit absolute inset-0 rounded-2xl border border-cyan-400/30"
          style={{ animationDirection: 'reverse', animationDuration: '3.6s' }}
        />
        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] dark:from-violet-400 dark:to-cyan-400 dark:shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
      </div>

      <div className="relative flex flex-col items-center">
        <h1
          ref={textRef}
          className="mb-8 text-4xl font-extrabold tracking-tighter text-foreground md:text-6xl"
        >
          {greeting}
          <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">.</span>
        </h1>
        
        <div className="relative h-0.5 w-64 overflow-hidden rounded-full bg-foreground/10">
          <div 
            ref={progressRef}
            className="absolute inset-0 origin-left bg-gradient-to-r from-violet-500 to-cyan-400 dark:from-violet-500 dark:to-cyan-400"
          />
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <span ref={percentRef} className="tabular-nums text-[10px] font-bold text-foreground/45">0</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/25">Percent Loaded</span>
        </div>
      </div>

      <div className="absolute top-10 left-10 h-5 w-5 border-l-2 border-t-2 border-foreground/15" />
      <div className="absolute top-10 right-10 h-5 w-5 border-r-2 border-t-2 border-foreground/15" />
      <div className="absolute bottom-10 left-10 h-5 w-5 border-b-2 border-l-2 border-foreground/15" />
      <div className="absolute right-10 bottom-10 h-5 w-5 border-b-2 border-r-2 border-foreground/15" />
    </div>
  );
}
