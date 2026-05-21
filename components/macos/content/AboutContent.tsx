'use client';

import { motion } from 'framer-motion';
import type { About } from '@/types/portfolio';

export default function AboutContent({ about }: { about: About }) {
  return (
    <div className="tile-light p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <motion.div
          className="product-shadow flex h-28 w-28 shrink-0 items-center justify-center rounded-apple-lg bg-apple-parchment text-display-md text-apple-primary"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {about.name.charAt(0)}
        </motion.div>
        <div>
          <h2 className="text-display-md text-apple-ink">{about.name}</h2>
          <p className="text-body-strong mt-1 text-apple-primary">{about.title}</p>
          <p className="text-caption mt-1 text-apple-ink-muted-48">{about.location}</p>
        </div>
      </div>
      <motion.p
        className="text-body mt-6 text-apple-ink-muted-80"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {about.bio}
      </motion.p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Focus', value: 'Full-stack & UI' },
          { label: 'Stack', value: 'Next.js · TS · Node' },
          { label: 'Vibe', value: 'Clean · Fast · Human' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="utility-card !p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <p className="text-caption-strong text-apple-ink-muted-48">{item.label}</p>
            <p className="text-body-strong mt-1">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
