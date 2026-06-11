import Image from 'next/image';
import type { Skill } from '@/types/portfolio';

export default function Skills({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="section">
      <div className="container-main">
        <div className="mb-12 max-w-2xl">
          <p className="label mb-4">02 — Skills</p>
          <h2 className="heading-lg">Technologies I use</h2>
          <p className="body mt-4">
            Frontend, backend, automation, and cloud — the stack I rely on to ship reliable products.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-10 last:mb-0">
            <p className="label mb-4">{cat}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div key={skill.id} className="card flex items-center gap-4">
                    {skill.icon && (
                      <div className="relative h-8 w-8 shrink-0 brightness-0 invert">
                        <Image src={skill.icon} alt="" fill className="object-contain" sizes="32px" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">{skill.name}</p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-ink"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-faint">{skill.level}%</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
