'use client';

import BentoCard from './BentoCard';
import { Experience } from '@/types/portfolio';

interface HighlightsCardProps {
  experiences: Experience[];
}

export default function HighlightsCard({ experiences }: HighlightsCardProps) {
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <BentoCard
      className="md:col-span-2 lg:col-span-4"
      delay={0.18}
    >
      <div className="flex flex-col gap-2 mb-8">
        <p className="uppercase text-[10px] tracking-[0.4em] text-blue-400 font-bold">
          Career Highlights
        </p>
        <h3 className="text-3xl font-bold text-white tracking-tight">
          Snapshot of recent professional milestones.
        </h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featuredExperiences.map((exp) => (
          <div key={exp.id} className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-blue-500/30 transition-all group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{exp.title}</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">{exp.company}</span>
              <span className="text-[10px] text-blue-500/80 font-bold mt-2">{exp.period}</span>
            </div>
            <p className="text-xs text-white/50 mt-4 leading-relaxed line-clamp-2">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
