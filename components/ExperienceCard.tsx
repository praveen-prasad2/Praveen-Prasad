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
        
        const parseDate = (dateStr: string) => {
          if (dateStr.toLowerCase() === 'present') return new Date();
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
      const days = Math.floor((totalMs / (1000 * 60 * 60 * 24)) % 30.44);
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
      <div className="mb-6 flex flex-col md:mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">Experience</h2>
          <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/40 md:text-[10px]">
            Career Path
          </span>
        </div>
        
        <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] p-3 shadow-inner dark:border-white/5 dark:bg-white/[0.03] md:p-4">
          <p className="mb-3 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-violet-600 md:text-[10px] dark:text-violet-400">
            Total Professional Experience
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {[
              { label: 'Yrs', value: totalExperience.years },
              { label: 'Mos', value: totalExperience.months },
              { label: 'Days', value: totalExperience.days },
              { label: 'Hrs', value: totalExperience.hours },
              { label: 'Min', value: totalExperience.minutes },
              { label: 'Sec', value: totalExperience.seconds }
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col items-center justify-center rounded-xl border border-foreground/[0.06] bg-foreground/[0.04] py-2 transition-all hover:border-violet-500/35 dark:border-white/5 dark:bg-white/5">
                <span className="mb-1 text-base font-black tabular-nums leading-none text-foreground transition-colors group-hover:text-violet-600 md:text-xl dark:group-hover:text-violet-300">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[7px] font-bold uppercase leading-none tracking-tighter text-foreground/35 md:text-[8px] dark:text-white/30">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[2px] before:bg-foreground/10 dark:before:bg-white/5">
        {experiences.map((exp) => (
          <div key={exp.id} className="group relative pl-10">
            <div className="absolute left-0 top-1.5 z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-foreground/12 bg-background transition-colors group-hover:border-violet-500/50 dark:border-white/10">
              <div className="h-2 w-2 rounded-full bg-foreground/25 transition-colors group-hover:bg-violet-500 dark:bg-white/20 dark:group-hover:bg-violet-400" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300">{exp.title}</h3>
                <span className="rounded-md bg-foreground/[0.06] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/45 dark:bg-white/5 dark:text-white/30">{exp.period}</span>
              </div>
              <p className="text-sm font-medium text-violet-700 dark:text-violet-300/90">{exp.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">{exp.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-foreground/10 bg-foreground/[0.04] px-2 py-1 text-[10px] uppercase tracking-wider text-foreground/60 transition-colors hover:bg-foreground/[0.08] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10"
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
