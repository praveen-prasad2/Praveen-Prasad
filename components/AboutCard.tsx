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
            <div className="relative h-24 w-24 flex-shrink-0">
              <div className="absolute inset-0 animate-pulse rounded-full bg-violet-500 opacity-20 blur-2xl" />
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="relative z-10 rounded-full border-2 border-foreground/15 object-cover dark:border-white/20"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="group relative flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-foreground/10 bg-foreground/[0.04] dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/25 to-cyan-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative z-10 text-3xl font-bold text-foreground">
                {about.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-600 dark:text-violet-400">
              Introduction
            </h2>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {about.name}
            </h1>
            <p className="mt-1 text-lg font-medium text-foreground/60">
              {about.title}
            </p>
          </div>
        </div>

        <p className="max-w-2xl text-sm font-light leading-relaxed text-foreground/70 md:text-lg">
          {about.bio}
        </p>
      </div>
    </BentoCard>
  );
}
