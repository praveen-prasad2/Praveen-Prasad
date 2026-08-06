'use client';

import type { Project } from '@/types/portfolio';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">// projects</p>
          <h2 className="heading-lg mt-4">
            Deployed <span className="text-primary">systems</span>
          </h2>
          <p className="body mt-4 max-w-2xl">
            Selected work — products and platforms built end-to-end with focus
            on clarity, performance, and growth.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const content = (
              <TiltCard className="h-full">
                <article className="card-glow gradient-border group flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs text-primary/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {project.link && (
                      <ExternalLink className="h-4 w-4 text-primary/40 transition group-hover:text-primary" />
                    )}
                  </div>

                  <h3 className="heading-md mt-4 !text-xl transition group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="body mt-3 flex-1 !text-sm">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <div className="mt-6 flex items-center gap-2 font-mono text-xs text-primary opacity-0 transition group-hover:opacity-100">
                      view_project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </article>
              </TiltCard>
            );

            return (
              <Reveal key={project.id} delay={i * 100}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
