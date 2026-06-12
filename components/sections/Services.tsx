import type { Service } from '@/types/portfolio';
import {
  Code2,
  Layout,
  Palette,
  Rocket,
  ShoppingBag,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  layout: Layout,
  workflow: Workflow,
  shopping: ShoppingBag,
  users: Users,
  rocket: Rocket,
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">Services</p>
          <h2 className="heading-lg mt-4">What I Bring to the Table</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Rocket;
            return (
              <Reveal key={service.id} delay={i * 80}>
                <article className="card group h-full transition hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="heading-md !text-lg">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-accent/70">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
