'use client';

import { useEffect, useMemo, useState } from 'react';
import BentoCard from './BentoCard';
import { Project } from '@/types/portfolio';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

interface ProjectsCardProps {
  projects: Project[];
  contactEmail?: string;
}

const PAGE_SIZE = 6;

export default function ProjectsCard({ projects, contactEmail }: ProjectsCardProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [projects.length]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return projects.slice(start, end);
  }, [page, projects]);

  const placeholderCount = Math.max(0, PAGE_SIZE - paginatedProjects.length);

  return (
    <BentoCard id="projects" className="md:col-span-2 lg:col-span-4" delay={0.4}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Featured Projects</h2>
          <p className="mt-1 text-sm uppercase tracking-widest text-[10px] text-foreground/40">Digital Architecture</p>
        </div>
        {contactEmail && (
          <a
            href={`mailto:${contactEmail}?subject=Case%20study%20request`}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600 transition-colors hover:text-cyan-600 dark:text-violet-400 dark:hover:text-cyan-300"
          >
            Full Case Studies <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] p-6 transition-all [transform-style:preserve-3d] hover:-translate-y-0.5 hover:border-violet-500/35 hover:shadow-[0_20px_50px_-28px_rgba(139,92,246,0.22)] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:shadow-[0_20px_50px_-28px_rgba(139,92,246,0.35)]"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-colors group-hover:bg-violet-500/20" />

            <h3 className="mb-3 text-lg font-bold text-foreground transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300">
              {project.title}
            </h3>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/55">
              {project.description}
            </p>
            
            <div className="mb-6 flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded border border-foreground/[0.08] bg-foreground/[0.04] px-2 py-1 text-[9px] uppercase tracking-tighter text-foreground/45 dark:border-white/5 dark:bg-white/5 dark:text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground transition-colors hover:text-cyan-600 dark:hover:text-cyan-300"
                >
                  <ExternalLink className="h-3 w-3" /> Preview
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground/45 transition-colors hover:text-foreground"
                >
                  <Github className="h-3 w-3" /> Code
                </a>
              )}
            </div>
          </div>
        ))}
        {placeholderCount > 0 &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="group flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.02] p-6 text-center opacity-50 dark:border-white/10 dark:bg-white/[0.01]"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 dark:border-white/10">
                <span className="text-foreground/25 dark:text-white/20">+</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-foreground/25 dark:text-white/20">Future Innovation</span>
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="rounded-full border border-foreground/10 p-2 text-foreground/45 transition-all hover:border-foreground/25 hover:text-foreground disabled:opacity-20 dark:border-white/5 dark:text-white/40 dark:hover:border-white/20 dark:hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-1.5 rounded-full transition-all ${
                    pageNumber === page ? 'w-8 bg-gradient-to-r from-violet-500 to-cyan-400' : 'w-1.5 bg-foreground/20 hover:bg-foreground/35 dark:bg-white/20 dark:hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="rounded-full border border-foreground/10 p-2 text-foreground/45 transition-all hover:border-foreground/25 hover:text-foreground disabled:opacity-20 dark:border-white/5 dark:text-white/40 dark:hover:border-white/20 dark:hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </BentoCard>
  );
}
