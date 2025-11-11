'use client';

import BentoCard from './BentoCard';
import { Experience } from '@/types/portfolio';

interface ExperienceCardProps {
  experiences: Experience[];
}

export default function ExperienceCard({ experiences }: ExperienceCardProps) {
  return (
    <BentoCard id="experience" className="md:col-span-2 lg:col-span-2" delay={0.3}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Timeline</span>
      </div>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-4 border-primary-500 dark:border-primary-400 pl-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{exp.title}</h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{exp.period}</p>
            </div>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 my-2">{exp.description}</p>
            <div className="flex flex-wrap gap-1">
              {exp.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/25 rounded text-primary-700 dark:text-primary-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

