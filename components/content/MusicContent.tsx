'use client';

import { motion } from 'framer-motion';

export default function MusicContent() {
  return (
    <div className="tile-dark flex h-full flex-col items-center justify-center p-8">
      <motion.div
        className="product-shadow mb-6 flex h-32 w-32 items-center justify-center rounded-apple-lg bg-apple-tile-2 text-4xl"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎵
      </motion.div>
      <p className="text-tagline text-apple-on-dark">Focus Mode</p>
      <p className="text-caption mt-2 text-apple-body-muted">Coding Sessions</p>
      <div className="mt-8 flex gap-6 text-2xl text-apple-on-dark">
        <button type="button" className="text-apple-body-muted" aria-label="Previous">
          ⏮
        </button>
        <button type="button" className="btn-primary !px-6" aria-label="Play">
          ▶
        </button>
        <button type="button" className="text-apple-body-muted" aria-label="Next">
          ⏭
        </button>
      </div>
    </div>
  );
}
