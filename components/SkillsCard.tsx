'use client';

import BentoCard from './BentoCard';
import { Skill } from '@/types/portfolio';
import Image from 'next/image';

interface SkillsCardProps {
  skills: Skill[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <BentoCard id="skills" className="md:col-span-2 lg:col-span-2 lg:row-span-2" delay={0.2}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Toolkit</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#131313] px-3 py-4 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            {skill.icon ? (
              <div className="relative w-12 h-12">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-400">Icon</span>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{skill.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</p>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

