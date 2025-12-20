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
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Featured Projects</h2>
          <p className="text-sm text-white/40 mt-1 uppercase tracking-widest text-[10px]">Digital Architecture</p>
        </div>
        {contactEmail && (
          <a
            href={`mailto:${contactEmail}?subject=Case%20study%20request`}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Full Case Studies <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative h-full p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all flex flex-col overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />

            <h3 className="font-bold text-white mb-3 text-lg group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 mb-6 flex-1 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[9px] px-2 py-1 bg-white/5 border border-white/5 rounded text-white/40 uppercase tracking-tighter"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-widest hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Preview
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                >
                  <Github className="w-3 h-3" /> Code
                </a>
              )}
            </div>
          </div>
        ))}
        {placeholderCount > 0 &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="h-full p-6 bg-white/[0.01] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center group opacity-50"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mb-3">
                <span className="text-white/20">+</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/20">Future Innovation</span>
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="p-2 rounded-full border border-white/5 text-white/40 hover:border-white/20 hover:text-white transition-all disabled:opacity-20"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    pageNumber === page ? 'w-8 bg-blue-500' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-full border border-white/5 text-white/40 hover:border-white/20 hover:text-white transition-all disabled:opacity-20"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </BentoCard>
  );
}
