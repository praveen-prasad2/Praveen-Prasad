'use client';

import { useEffect, useMemo, useState } from 'react';
import BentoCard from './BentoCard';
import { Project } from '@/types/portfolio';

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
    const current = projects.slice(start, end);

    if (current.length < PAGE_SIZE) {
      return current;
    }

    return current;
  }, [page, projects]);

  const showingStart = projects.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showingEnd = Math.min(page * PAGE_SIZE, projects.length);
  const placeholderCount = Math.max(0, PAGE_SIZE - paginatedProjects.length);

  return (
    <BentoCard id="projects" className="md:col-span-2 lg:col-span-4" delay={0.4}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Selected work highlighting impact-driven outcomes.</p>
        </div>
        {contactEmail && (
          <a
            href={`mailto:${contactEmail}?subject=Case%20study%20request`}
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            Request full case studies →
          </a>
        )}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {projects.length > 0 ? (
            <span>
              Showing {showingStart}-{showingEnd} of {projects.length} projects
            </span>
          ) : (
            <span>No projects added yet</span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="h-full p-4 bg-gray-50 dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-colors flex flex-col"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
              {project.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/25 rounded text-primary-700 dark:text-primary-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3 text-sm">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
        {placeholderCount > 0 &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="h-full p-4 bg-gray-50/60 dark:bg-[#101010] rounded-xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center text-xs text-gray-400 dark:text-gray-600"
            >
              <span>Project slot available</span>
              <span className="mt-1 text-[11px] text-gray-300 dark:text-gray-500">
                Add more projects from the admin panel.
              </span>
            </div>
          ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === page;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-8 w-8 rounded-full border text-xs transition-colors ${
                    isActive
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-500'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </BentoCard>
  );
}

