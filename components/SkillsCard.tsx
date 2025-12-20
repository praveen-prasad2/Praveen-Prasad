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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Technical Proficiency</h2>
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Core Arsenal</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-6 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all group"
          >
            {skill.icon ? (
              <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-110">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white/30 uppercase tracking-tighter">No Icon</span>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-bold text-white/90 group-hover:text-blue-400 transition-colors">{skill.name}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mt-1">{skill.category}</p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
