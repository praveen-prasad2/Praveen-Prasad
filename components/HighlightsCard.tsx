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
      className="md:col-span-1 lg:col-span-2 flex flex-col justify-between bg-[radial-gradient(circle_at_bottom,_#f1fff4,_#ffffff)] dark:bg-[#101010]"
      delay={0.18}
    >
      <div>
        <p className="uppercase text-xs tracking-[0.3em] text-primary-600 dark:text-primary-400">
          Experience
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-3">
          A track record of impactful roles.
        </h3>
      </div>
      <div className="mt-6 space-y-4">
        {featuredExperiences.map((exp) => (
          <div key={exp.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{exp.title}</span>
              <span className="text-xs text-primary-600 dark:text-primary-400">{exp.period}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{exp.company}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {exp.description.length > 80 ? `${exp.description.slice(0, 80)}…` : exp.description}
            </p>
          </div>
        ))}
        {experiences.length > 3 && (
          <p className="text-xs text-primary-600 dark:text-primary-400">
            +{experiences.length - 3} more engagements documented below.
          </p>
        )}
      </div>
    </BentoCard>
  );
}

