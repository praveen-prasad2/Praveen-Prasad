import type { Skill } from '@/types/portfolio';
import Reveal from '@/components/ui/Reveal';

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
  const groups: Record<string, string[]> = {};

  for (const skill of skills) {
    const label = CATEGORY_LABELS[skill.category] ?? skill.category;
    if (!groups[label]) groups[label] = [];
    groups[label].push(skill.name);
  }

  return CATEGORY_ORDER.filter((cat) => groups[cat]).map((cat) => ({
    category: cat,
    items: groups[cat],
  }));
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const groups = groupSkills(skills);

  return (
    <section id="skills" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">Skills</p>
          <h2 className="heading-lg mt-4">My Toolkit</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {groups.map((group, i) => (
            <Reveal key={group.category} delay={i * 80}>
              <div className="card h-full transition hover:border-primary/30">
                <h3 className="heading-md !text-lg text-primary">{group.category}</h3>
                <p className="mt-4 text-sm leading-relaxed text-accent/75">
                  {group.items.join(' • ')}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
