'use client';

import type { About } from '@/types/portfolio';
import { Download } from 'lucide-react';

export default function ResumeContent({ about }: { about: About }) {
  return (
    <div className="tile-light flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="product-shadow mb-6 flex h-24 w-24 items-center justify-center rounded-apple-lg bg-apple-parchment text-4xl">
        📄
      </div>
      <h2 className="text-body-strong">{about.name} — Resume</h2>
      <p className="text-caption mt-2 text-apple-ink-muted-80">{about.title}</p>
      <a
        href={`mailto:${about.email}?subject=Resume%20Request`}
        className="btn-primary mt-6 inline-flex items-center gap-2"
      >
        <Download className="h-4 w-4" /> Request PDF
      </a>
    </div>
  );
}
