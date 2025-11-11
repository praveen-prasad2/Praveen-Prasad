"use client";

import BentoCard from './BentoCard';
import { About } from '@/types/portfolio';
import Image from 'next/image';

interface AboutCardProps {
  about: About;
}

export default function AboutCard({ about }: AboutCardProps) {
  return (
    <BentoCard
      id="about"
      className="md:col-span-2 lg:col-span-2 flex flex-col justify-start relative overflow-hidden"
      delay={0.1}
    >
      <div className="absolute top-[-80px] right-[-20px] w-56 h-56 bg-[radial-gradient(circle,_rgba(37,99,235,0.18),_transparent_65%)] rounded-full blur-3xl" />
      <div className="relative z-10 flex flex-col gap-4 h-auto">
        {/* LinkedIn-style profile image */}
        <div className="flex items-start gap-4">
          {about.avatar ? (
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={about.avatar}
                alt={about.name}
                fill
                className="object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
              <span className="text-2xl font-bold text-gray-400">
                {about.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">
              About
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {about.name}
            </h1>
            <p className="text-lg text-primary-600 dark:text-primary-400 font-medium mt-2">
              {about.title}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
          {about.bio}
        </p>
      </div>
    </BentoCard>
  );
}
