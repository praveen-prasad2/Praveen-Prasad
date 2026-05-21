'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Skill } from '@/types/portfolio';

export default function SkillsContent({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="tile-parchment space-y-8 p-6 sm:p-8">
      {categories.map((cat, ci) => {
        const catSkills = skills.filter((s) => s.category === cat);
        return (
          <section key={cat}>
            <h3 className="text-caption-strong mb-4 uppercase tracking-wider text-apple-ink-muted-48">
              {cat}
            </h3>
            <div className="space-y-3">
              {catSkills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: ci * 0.05 + i * 0.03 }}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {skill.icon && (
                        <div className="relative h-5 w-5">
                          <Image src={skill.icon} alt="" fill className="object-contain" sizes="20px" />
                        </div>
                      )}
                      <span className="text-body-strong">{skill.name}</span>
                    </div>
                    <span className="text-caption tabular-nums text-apple-ink-muted-48">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-apple-pill bg-apple-divider-soft">
                    <motion.div
                      className="h-full rounded-apple-pill bg-apple-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
