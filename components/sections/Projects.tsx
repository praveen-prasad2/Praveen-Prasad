import type { Project } from '@/types/portfolio';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const PROJECT_EXTRAS: Record<string, { problem?: string; solution?: string }> = {
  '1': {
    problem: 'Small businesses struggle to showcase products online.',
    solution: 'Create a shareable digital catalog in minutes.',
  },
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">Projects</p>
          <h2 className="heading-lg mt-4">Things I&apos;ve Built</h2>
        </Reveal>

        <div className="mt-14 space-y-5">
          {projects.map((project, i) => {
            const extras = PROJECT_EXTRAS[project.id];
            const Wrapper = project.link ? 'a' : 'div';
            const props = project.link
              ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Reveal key={project.id} delay={i * 100}>
                <Wrapper
                  {...props}
                  className="card group flex flex-col gap-6 transition hover:-translate-y-0.5 hover:border-primary/30 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <span className="font-anton text-2xl text-accent/40">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="heading-md group-hover:text-primary transition">
                          {project.title}
                        </h3>
                        <p className="body mt-3 !text-base">
                          {project.description}
                        </p>
                        {extras && (
                          <div className="mt-4 space-y-1 text-sm text-accent/60">
                            {extras.problem && (
                              <p>
                                <span className="text-accent">Problem:</span> {extras.problem}
                              </p>
                            )}
                            {extras.solution && (
                              <p>
                                <span className="text-accent">Solution:</span> {extras.solution}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {project.link && (
                    <ArrowUpRight className="h-6 w-6 shrink-0 text-primary opacity-0 transition group-hover:opacity-100" />
                  )}
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
