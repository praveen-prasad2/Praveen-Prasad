'use client';

import BentoCard from './BentoCard';
import { Skill } from '@/types/portfolio';
import Image from 'next/image';

interface SkillsCardProps {
  skills: Skill[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <BentoCard id="skills" className="md:col-span-2 lg:col-span-4 lg:row-span-2" delay={0.2}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Technical Proficiency</h2>
        <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">Core Arsenal</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] px-3 py-6 transition-all [transform-style:preserve-3d] hover:-translate-y-0.5 hover:border-violet-500/35 hover:bg-violet-500/[0.06] hover:shadow-[0_12px_40px_-20px_rgba(139,92,246,0.28)] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:hover:shadow-[0_12px_40px_-20px_rgba(139,92,246,0.35)]"
          >
            {skill.icon ? (
              <div className="relative h-12 w-12 scale-90 grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.06)] transition-[filter] duration-500 group-hover:drop-shadow-[0_0_18px_rgba(139,92,246,0.35)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.08)]"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/[0.06] dark:bg-white/5">
                <span className="text-[10px] uppercase tracking-tighter text-foreground/35 dark:text-white/30">No Icon</span>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-bold text-foreground/90 transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300">{skill.name}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/35 dark:text-white/30">{skill.category}</p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
