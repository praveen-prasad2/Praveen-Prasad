'use client';

import type { Project } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

export default function SafariContent({ projects }: { projects: Project[] }) {
  const featured = projects[0];
  return (
    <div className="tile-light flex h-full flex-col">
      <div className="sub-nav-frosted flex items-center gap-2 px-3 py-2">
        <span className="text-fine-print text-apple-ink-muted-48">🔒</span>
        <span className="flex-1 truncate rounded-apple-pill border border-apple-hairline bg-apple-canvas px-4 py-2 text-caption text-apple-ink">
          {featured?.link ?? 'portfolio.local'}
        </span>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <p className="text-caption text-apple-ink-muted-48">Featured project</p>
        <h3 className="text-display-md mt-1">{featured?.title}</h3>
        <p className="text-body mt-2 text-apple-ink-muted-80">{featured?.description}</p>
        {featured?.link && (
          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link mt-4 inline-flex items-center gap-1"
          >
            Open site <ExternalLink className="h-3 w-3" />
          </a>
        )}
        <div className="mt-8 space-y-3">
          {projects.slice(1).map((p) => (
            <a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="utility-card block !p-4 active:border-apple-primary"
            >
              <p className="text-body-strong">{p.title}</p>
              <p className="text-caption text-apple-ink-muted-48">{p.link}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
