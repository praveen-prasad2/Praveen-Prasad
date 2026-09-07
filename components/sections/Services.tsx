'use client';

import type { Service } from '@/types/portfolio';
import { useRef, type MouseEvent } from 'react';
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
import KineticHeading from '@/components/ui/KineticHeading';

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  layout: Layout,
  workflow: Workflow,
  shopping: ShoppingBag,
  users: Users,
  rocket: Rocket,
};

function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = ICONS[service.icon] ?? Rocket;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      className="card-glow group relative h-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(124,92,252,0.14), transparent 70%)',
        }}
      />
      <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent transition group-hover:border-accent/40">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="relative font-display text-lg font-medium text-ink">
        {service.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">
        {service.description}
      </p>
    </article>
  );
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section">
      <div className="container-main">
        <Reveal>
          <p className="eyebrow">Services</p>
        </Reveal>
        <KineticHeading as="h2" delay={60} className="heading-lg mt-4">
          Capabilities <span className="text-accent">unlocked</span>
        </KineticHeading>
        <Reveal delay={140}>
          <p className="body mt-4 max-w-2xl">
            From architecture to polish — modules you can plug into your product
            or business.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 70} scale={0.96}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
