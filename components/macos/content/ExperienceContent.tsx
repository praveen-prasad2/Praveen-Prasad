'use client';

import { motion } from 'framer-motion';
import type { Experience } from '@/types/portfolio';

export default function ExperienceContent({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="tile-light p-6 sm:p-8">
      <h2 className="text-display-md mb-8">Experience</h2>
      <div className="relative space-y-0">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-apple-hairline" />
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            className="relative pb-10 pl-8 last:pb-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-apple-primary bg-apple-canvas" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-body-strong">{exp.title}</h3>
              <span className="text-caption text-apple-ink-muted-48">{exp.period}</span>
            </div>
            <p className="text-link text-body-strong mt-1 !text-[15px]">{exp.company}</p>
            <p className="text-caption mt-2 text-apple-ink-muted-80">{exp.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <span key={t} className="btn-pearl-capsule !py-1 !text-[12px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
