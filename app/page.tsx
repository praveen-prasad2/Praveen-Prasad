'use client';

import { useEffect, useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import AboutCard from '@/components/AboutCard';
import SkillsCard from '@/components/SkillsCard';
import ExperienceCard from '@/components/ExperienceCard';
import ProjectsCard from '@/components/ProjectsCard';
import BentoCard from '@/components/BentoCard';
import HighlightsCard from '@/components/HighlightsCard';
import ContactCard from '@/components/ContactCard';
import NavigationBar from '@/components/NavigationBar';

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching portfolio data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Failed to load portfolio data</div>
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-white dark:bg-[#0a0a0a] px-4 pb-14 pt-24 md:px-8 md:pt-28">
        <div className="max-w-6xl mx-auto space-y-8">
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(220px,auto)] grid-flow-dense">
          <AboutCard about={data.about} />

          <ProjectsCard projects={data.projects} contactEmail={data.about.email} />


          <BentoCard className="md:col-span-1 lg:col-span-2 bg-[radial-gradient(circle_at_top,_#e8fff3,_#ffffff)] dark:bg-[#111] dark:border-gray-800 flex flex-col justify-between" delay={0.15}>
            <div className="space-y-3">
              <p className="uppercase text-xs tracking-[0.3em] text-primary-600 dark:text-primary-400">Mission</p>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
                Connecting ideas, empowering innovation through seamless experiences.
              </h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-800">
              <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium">Open to work</span>
              <span>Let’s collaborate on your next big initiative.</span>
            </div>
          </BentoCard>

          <HighlightsCard
            projectsCount={data.projects.length}
            experienceCount={data.experiences.length}
            skillsCount={data.skills.length}
          />

          <SkillsCard skills={data.skills} />

          <BentoCard className="md:col-span-1 lg:col-span-1 bg-gray-900 text-white dark:bg-gray-900 flex flex-col justify-between" delay={0.25}>
            <div>
              <p className="uppercase text-xs tracking-[0.3em] text-white/60">Availability</p>
              <h3 className="text-2xl font-semibold mt-3">Upgrade your product vision.</h3>
              <p className="text-sm text-white/70 mt-2">
                Remote-friendly, timezone flexible, shipping outcomes weekly.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/80">Discount Code</p>
              <p className="text-lg font-semibold tracking-wide">G152FG35</p>
            </div>
          </BentoCard>

          <ContactCard
            email={data.about.email}
            location={data.about.location}
            name={data.about.name}
            socials={data.about.socials}
          />

          <ExperienceCard experiences={data.experiences} />

        </div>
      </div>
    </main>
    </>
  );
}

