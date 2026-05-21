'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import ProjectsContent from '@/components/macos/content/ProjectsContent';

export default function PhotosContent({
  projects,
  ios = false,
}: {
  projects: Project[];
  ios?: boolean;
}) {
  if (!ios) {
    return <ProjectsContent projects={projects} />;
  }

  return (
    <div className="grid grid-cols-2 gap-1 bg-apple-parchment p-1">
      {projects.map((p, i) => (
        <motion.a
          key={p.id}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex aspect-square items-end overflow-hidden rounded-apple-lg bg-apple-canvas p-2"
          whileTap={{ scale: 0.96 }}
        >
          <div className="product-shadow absolute inset-2 flex items-center justify-center rounded-apple-sm bg-apple-parchment">
            <span className="text-caption-strong text-center text-apple-ink">{p.title}</span>
          </div>
          {p.link && <ExternalLink className="relative z-10 h-3 w-3 text-apple-primary" />}
        </motion.a>
      ))}
    </div>
  );
}
