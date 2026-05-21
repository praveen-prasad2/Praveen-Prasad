'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types/portfolio';

export default function ProjectsContent({ projects }: { projects: Project[] }) {
  return (
    <div className="tile-light grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
      {projects.map((p, i) => (
        <motion.article
          key={p.id}
          className="utility-card overflow-hidden !p-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="product-shadow flex h-28 items-center justify-center bg-apple-parchment">
            <span className="text-tagline text-apple-ink">{p.title}</span>
          </div>
          <div className="p-6">
            <h3 className="text-body-strong">{p.title}</h3>
            <p className="text-caption mt-2 line-clamp-3 text-apple-ink-muted-80">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {p.technologies.slice(0, 4).map((t) => (
                <span key={t} className="btn-pearl-capsule !py-0.5 !text-[11px]">
                  {t}
                </span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link mt-4 inline-flex items-center gap-1 text-caption-strong"
              >
                View site <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
