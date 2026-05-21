'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DynamicIslandProps {
  active: boolean;
  title?: string;
}

export default function DynamicIsland({ active, title }: DynamicIslandProps) {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-2 z-[60] flex justify-center">
      <motion.div
        layout
        className="flex items-center justify-center overflow-hidden rounded-apple-pill bg-apple-black"
        initial={{ width: 120, height: 34 }}
        animate={{ width: active ? 200 : 120, height: active ? 40 : 34 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {active && title ? (
            <motion.span
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 text-caption text-apple-on-dark"
            >
              {title}
            </motion.span>
          ) : (
            <motion.div key="pill" className="h-2.5 w-2.5 rounded-full bg-apple-tile-2" layout />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
