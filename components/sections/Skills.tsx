import type { Skill } from '@/types/portfolio';
import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';

const CATEGORY_LABELS: Record<string, string> = {
  Frontend: 'Development',
  Language: 'Development',
  Backend: 'Development',
  Database: 'Tools',
  Tools: 'Tools',
  CMS: 'Development',
  'E-commerce': 'Business',
  Design: 'Design & UI',
  Automation: 'Tools',
  DevOps: 'Tools',
  Cloud: 'Tools',
};

const CATEGORY_ORDER = ['Development', 'Design & UI', 'Tools', 'Business'];

function groupSkills(skills: Skill[]) {
  const groups: Record<string, Skill[]> = {};

  for (const skill of skills) {
    const label = CATEGORY_LABELS[skill.category] ?? skill.category;
    if (!groups[label]) groups[label] = [];
    groups[label].push(skill);
  }

  return CATEGORY_ORDER.filter((cat) => groups[cat]).map((cat) => ({
    category: cat,
    items: groups[cat],
  }));
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const groups = groupSkills(skills);
  const techNames = skills.map((s) => s.name);

  return (
    <section id="skills" className="section !pb-0">
      <div className="container-main">
        <Reveal>
          <p className="label">// skills</p>
          <h2 className="heading-lg mt-4">
            Toolkit. <span className="text-primary">Loaded.</span>
          </h2>
          <p className="body mt-4 max-w-2xl">
            A production stack spanning frontend systems, backend services,
            automation, and deployment.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {groups.map((group, i) => (
            <Reveal key={group.category} delay={i * 80}>
              <div className="card-glow gradient-border h-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-medium text-white">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[10px] text-primary/50">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill.id} className="tag">
                      {skill.name}
                      <span className="ml-1.5 text-primary/40">{skill.level}%</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Marquee items={techNames} />
      </div>
    </section>
  );
}
