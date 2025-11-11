'use client';

import BentoCard from './BentoCard';

interface HighlightsCardProps {
  projectsCount: number;
  experienceCount: number;
  skillsCount: number;
}

const highlightItems = [
  { label: 'Shipped Projects', key: 'projectsCount' as const },
  { label: 'Product Partnerships', key: 'experienceCount' as const },
  { label: 'Core Skills', key: 'skillsCount' as const },
];

export default function HighlightsCard({
  projectsCount,
  experienceCount,
  skillsCount,
}: HighlightsCardProps) {
  const values = { projectsCount, experienceCount, skillsCount };

  return (
    <BentoCard
      className="md:col-span-1 lg:col-span-1 flex flex-col justify-between bg-[radial-gradient(circle_at_bottom,_#f1fff4,_#ffffff)] dark:bg-[#101010]"
      delay={0.18}
    >
      <div>
        <p className="uppercase text-xs tracking-[0.3em] text-primary-600 dark:text-primary-400">
          Impact
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-3">
          Focused on measurable results.
        </h3>
      </div>
      <div className="mt-6 space-y-4">
        {highlightItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {values[item.key]}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

