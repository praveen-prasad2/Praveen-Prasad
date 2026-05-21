'use client';

import { useEffect, useState } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

export default function StatusBar({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`relative z-50 flex h-11 items-center justify-between px-6 pt-2 text-nav-link font-semibold ${
        dark ? 'text-apple-on-dark' : 'text-apple-ink'
      }`}
    >
      <span className="w-14 tabular-nums">{time}</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3.5 w-3.5" strokeWidth={2.5} />
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.5} />
        <Battery className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </div>
  );
}
