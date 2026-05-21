'use client';

import type { About } from '@/types/portfolio';

export default function NotesContent({ about }: { about: About }) {
  return (
    <div className="tile-parchment p-6">
      <p className="text-caption text-apple-ink-muted-48">Today</p>
      <h2 className="text-display-md mt-2">{about.name}</h2>
      <p className="text-body mt-4 text-apple-ink-muted-80">{about.bio}</p>
    </div>
  );
}
