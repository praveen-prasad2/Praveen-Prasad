'use client';

import { useEffect, useState } from 'react';
import BentoCard from './BentoCard';
import { Experience } from '@/types/portfolio';

interface ExperienceCardProps {
  experiences: Experience[];
}

export default function ExperienceCard({ experiences }: ExperienceCardProps) {
  const [totalExperience, setTotalExperience] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateExperience = () => {
      let totalMs = 0;

      experiences.forEach((exp) => {
        const parts = exp.period.split(' - ');
        if (parts.length < 2) return;
        
        const startStr = parts[0].trim();
        const endStr = parts[1].trim();
        
        // Handle "Month Year" format more robustly
        const parseDate = (dateStr: string) => {
          if (dateStr.toLowerCase() === 'present') return new Date();
          // Add a day to help parsing if needed, though modern JS handles "Oct 2024"
          return new Date(dateStr);
        };

        const start = parseDate(startStr);
        const end = parseDate(endStr);
        
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          totalMs += Math.max(0, end.getTime() - start.getTime());
        }
      });

      const seconds = Math.floor((totalMs / 1000) % 60);
      const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
      const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor((totalMs / (1000 * 60 * 60 * 24)) % 30.44); // Average days in a month
      const months = Math.floor((totalMs / (1000 * 60 * 60 * 24 * 30.44)) % 12);
      const years = Math.floor(totalMs / (1000 * 60 * 60 * 24 * 365.25));

      setTotalExperience({ years, months, days, hours, minutes, seconds });
    };

    calculateExperience();
    const interval = setInterval(calculateExperience, 1000);

    return () => clearInterval(interval);
  }, [experiences]);

  return (
    <BentoCard id="experience" className="md:col-span-2 lg:col-span-4" delay={0.3}>
      <div className="flex flex-col mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Experience</h2>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40">
            Career Path
          </span>
        </div>
        
        {/* Total Experience Counter */}
        <div className="p-3 md:p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-3 text-center">
            Total Professional Experience
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { label: 'Yrs', value: totalExperience.years },
              { label: 'Mos', value: totalExperience.months },
              { label: 'Days', value: totalExperience.days },
              { label: 'Hrs', value: totalExperience.hours },
              { label: 'Min', value: totalExperience.minutes },
              { label: 'Sec', value: totalExperience.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center py-2 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                <span className="text-base md:text-xl font-black text-white group-hover:text-blue-400 transition-colors tabular-nums leading-none mb-1">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-tighter text-white/30 font-bold leading-none">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-10 group">
            {/* Timeline Dot */}
            <div className="absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full border-2 border-white/10 bg-black z-10 flex items-center justify-center transition-colors group-hover:border-blue-500/50">
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{exp.period}</span>
              </div>
              <p className="text-sm text-blue-400/80 font-medium">{exp.company}</p>
              <p className="text-sm text-white/50 leading-relaxed mt-2">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/60 uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
