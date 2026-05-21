'use client';

import { useState } from 'react';
import type { About } from '@/types/portfolio';

export default function TerminalContent({ about }: { about: About }) {
  const [lines, setLines] = useState([
    'Last login: Thu May 21 09:00:00 on ttys000',
    `$ whoami`,
    `> ${about.name}`,
    `$ cat role.txt`,
    `> ${about.title}`,
    `$ echo $EMAIL`,
    `> ${about.email}`,
  ]);

  return (
    <div className="tile-dark flex min-h-[200px] flex-col p-4 font-mono text-caption">
      {lines.map((line, i) => (
        <p key={i} className={line.startsWith('$') ? 'text-apple-body-muted' : 'text-apple-primary-on-dark'}>
          {line}
        </p>
      ))}
      <button
        type="button"
        onClick={() =>
          setLines((p) => [...p, '$ npm run build', '> ✓ Compiled successfully'])
        }
        className="btn-secondary-pill mt-4 !border-apple-primary-on-dark !text-apple-primary-on-dark !text-[12px]"
      >
        Run build
      </button>
    </div>
  );
}
