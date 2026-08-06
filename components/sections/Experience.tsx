import type { Experience } from '@/types/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function Experience({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">// experience</p>
          <h2 className="heading-lg mt-4">
            Career <span className="text-primary">log</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/50 via-primary/15 to-transparent md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 100}>
                <article className="relative md:pl-14">
                  <div className="absolute left-2.5 top-6 hidden h-3 w-3 rounded-full border border-primary bg-bg shadow-glow-sm md:block" />
                  <div className="card-glow gradient-border">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="heading-md !text-xl">{exp.title}</h3>
                        <p className="mt-1 font-mono text-sm text-primary">
                          {exp.company}
                        </p>
                      </div>
                      <span className="tag">{exp.period}</span>
                    </div>
                    <p className="body mt-4 !text-base">{exp.description}</p>
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
