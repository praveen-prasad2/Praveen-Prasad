"use client";

import BentoCard from './BentoCard';
import { About } from '@/types/portfolio';
import Image from 'next/image';

interface AboutCardProps {
  about: About;
}

export default function AboutCard({ about }: AboutCardProps) {
  return (
    <BentoCard
      id="about"
      className="md:col-span-2 lg:col-span-4"
      delay={0.1}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          {about.avatar ? (
            <div className="relative w-24 h-24 flex-shrink-0">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover rounded-full border-2 border-white/20 relative z-10"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="w-24 h-24 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center border-2 border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl font-bold text-white relative z-10">
                {about.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-semibold mb-1">
              Introduction
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {about.name}
            </h1>
            <p className="text-lg text-white/60 font-medium mt-1">
              {about.title}
            </p>
          </div>
        </div>

        <p className="text-white/70 leading-relaxed text-sm md:text-lg max-w-2xl font-light">
          {about.bio}
        </p>
      </div>
    </BentoCard>
  );
}
