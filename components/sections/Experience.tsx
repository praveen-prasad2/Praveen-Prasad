import type { Experience } from '@/types/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Experience({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">Experience</p>
          <h2 className="heading-lg mt-4">My Journey</h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-primary/20 md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 100}>
                <article className="relative md:pl-14">
                  <div className="absolute left-2.5 top-2 hidden h-3 w-3 rounded-full border-2 border-primary bg-bg md:block" />
                  <div className="card transition hover:border-primary/30">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="heading-md !text-xl">{exp.title}</h3>
                        <p className="mt-1 font-medium text-primary">{exp.company}</p>
                      </div>
                      <span className="tag">{exp.period}</span>
                    </div>
                    <p className="body mt-4 !text-base text-white/75">{exp.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
