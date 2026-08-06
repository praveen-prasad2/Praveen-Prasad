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
          <p className="label">// services</p>
          <h2 className="heading-lg mt-4">
            Capabilities <span className="text-primary">unlocked</span>
          </h2>
          <p className="body mt-4 max-w-2xl">
            From architecture to polish — modules you can plug into your product
            or business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Rocket;
            return (
              <Reveal key={service.id} delay={i * 70}>
                <article className="card-glow gradient-border group h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-primary/20 bg-primary/5 text-primary transition group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:shadow-glow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
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
