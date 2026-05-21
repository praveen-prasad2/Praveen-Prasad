'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  Layout,
  Workflow,
  ShoppingBag,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/types/portfolio';

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  layout: Layout,
  workflow: Workflow,
  shopping: ShoppingBag,
  users: Users,
};

export default function ServicesContent({ services }: { services: Service[] }) {
  return (
    <div className="tile-parchment grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
      {services.map((s, i) => {
        const Icon = ICONS[s.icon] ?? Code2;
        return (
          <motion.article
            key={s.id}
            className="utility-card transition-colors active:border-apple-primary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Icon className="mb-3 h-6 w-6 text-apple-primary" strokeWidth={1.5} />
            <h3 className="text-body-strong">{s.title}</h3>
            <p className="text-caption mt-2 text-apple-ink-muted-80">{s.description}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
