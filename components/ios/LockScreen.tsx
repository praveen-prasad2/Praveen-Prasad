'use client';

import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface LockScreenProps {
  name: string;
  onUnlock: () => void;
}

export default function LockScreen({ name, onUnlock }: LockScreenProps) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="fixed inset-0 z-[400] flex flex-col items-center bg-apple-tile-1/90 pt-16 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="text-caption text-apple-body-muted">{date}</p>
      <p className="text-hero-display mt-2 font-light text-apple-on-dark">{time}</p>
      <p className="text-lead mt-8 text-apple-on-dark">{name}</p>

      <motion.button
        type="button"
        className="absolute bottom-12 flex flex-col items-center gap-2 text-apple-on-dark"
        onClick={onUnlock}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronUp className="h-6 w-6" />
        <span className="text-caption">Swipe up to open</span>
      </motion.button>
    </motion.div>
  );
}
