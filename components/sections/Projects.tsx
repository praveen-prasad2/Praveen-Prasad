import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/portfolio';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container-main">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label mb-4">03 — Projects</p>
            <h2 className="heading-lg">Selected work</h2>
          </div>
          <p className="body max-w-sm">
            Real-world products built with clean architecture and thoughtful UI.
          </p>
        </div>

        <div className="space-y-4">
          {projects.map((project, i) => {
            const Wrapper = project.link ? 'a' : 'div';
            const props = project.link
              ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Wrapper
                key={project.id}
                {...props}
                className="group card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-start gap-5">
                  <span className="text-sm font-bold text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="heading-md group-hover:underline">{project.title}</h3>
                    <p className="body mt-2 max-w-2xl !text-base">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {project.link && (
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-ink opacity-0 transition group-hover:opacity-100" />
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
