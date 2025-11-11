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
      className="md:col-span-2 lg:col-span-4 flex flex-col justify-between bg-[radial-gradient(circle_at_bottom,_#f1fff4,_#ffffff)] dark:bg-[#101010]"
      delay={0.18}
    >
      <div className="flex flex-col gap-2">
        <p className="uppercase text-xs tracking-[0.3em] text-primary-600 dark:text-primary-400">
          Experience Summary
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          A snapshot of recent partnerships and roles.
        </h3>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {featuredExperiences.map((exp) => (
          <div key={exp.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-[#171717] px-4 py-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{exp.title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{exp.company}</span>
              <span className="text-xs text-primary-600 dark:text-primary-400">{exp.period}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
              {exp.description.length > 90 ? `${exp.description.slice(0, 90)}…` : exp.description}
            </p>
          </div>
        ))}
        {featuredExperiences.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-4 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
            Add experience items to showcase notable milestones.
          </div>
        )}
      </div>
      {experiences.length > 3 && (
        <p className="text-xs text-primary-600 dark:text-primary-400 mt-4">
          +{experiences.length - 3} additional engagements are detailed in the full timeline.
        </p>
      )}
    </BentoCard>
  );
}

