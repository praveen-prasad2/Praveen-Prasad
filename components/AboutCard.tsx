"use client";

import BentoCard from "./BentoCard";
import { About, SocialLink } from "@/types/portfolio";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_ICON_MAP, getSocialIconKey } from "@/lib/socials";

interface AboutCardProps {
  about: About;
}

export default function AboutCard({ about }: AboutCardProps) {
  return (
    <BentoCard
      id="about"
      className="md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-center relative overflow-hidden"
      delay={0.1}
    >
      <div className="absolute top-[-60px] right-[-20px] w-44 h-44 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
      <div className="relative z-10 flex flex-col gap-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white break-words">{about.email}</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Location</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white">{about.location}</p>
          </div>
        </div>

        {about.socials && about.socials.length > 0 && (
          <div className="pt-1">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-2">
              Social
            </p>
            <div className="flex flex-wrap gap-2">
              {about.socials.map((social: SocialLink) => {
                const iconKey = getSocialIconKey(social.platform, social.icon);
                const Icon = SOCIAL_ICON_MAP[iconKey];
                return (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{social.platform}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </BentoCard>
  );
}
