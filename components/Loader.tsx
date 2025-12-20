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

    // Initial state
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

    // Percentage counter
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="relative flex flex-col items-center">
        <h1
          ref={textRef}
          className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8"
        >
          {greeting}
          <span className="text-blue-600">.</span>
        </h1>
        
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div 
            ref={progressRef}
            className="absolute inset-0 bg-blue-600 origin-left"
          />
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <span ref={percentRef} className="text-[10px] font-bold text-white/40 tabular-nums">0</span>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Percent Loaded</span>
        </div>
      </div>

      {/* Futuristic corner accents */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-white/10" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-white/10" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-white/10" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-white/10" />
    </div>
  );
}
