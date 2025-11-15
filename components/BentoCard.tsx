'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export default function BentoCard({ children, className = '', delay = 0, id }: BentoCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

