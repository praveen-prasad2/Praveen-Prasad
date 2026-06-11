import type { Experience } from '@/types/portfolio';

export default function Experience({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="section">
      <div className="container-main">
        <div className="mb-12">
          <p className="label mb-4">04 — Experience</p>
          <h2 className="heading-lg">Work history</h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className="grid gap-4 border-t border-black/15 py-8 md:grid-cols-[80px_1fr_auto] md:gap-8"
            >
              <span className="text-sm font-bold text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="heading-md">{exp.title}</h3>
                <p className="mt-1 text-sm font-medium text-white">{exp.company}</p>
                <p className="body mt-3 max-w-2xl !text-base">{exp.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-faint md:text-right">{exp.period}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
