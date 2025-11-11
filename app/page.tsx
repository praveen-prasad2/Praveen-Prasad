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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storageKey = 'portfolio-visitor-id';
    let visitorId = localStorage.getItem(storageKey);

    if (!visitorId) {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        visitorId = crypto.randomUUID();
      } else {
        visitorId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      }
      localStorage.setItem(storageKey, visitorId);
    }

    fetch('/api/analytics/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visitorId }),
    }).catch((error) => {
      console.error('Error registering visitor:', error);
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

            <ExperienceCard experiences={data.experiences} />

            <SkillsCard skills={data.skills} />
            <ProjectsCard projects={data.projects} contactEmail={data.about.email} />
            {/* <HighlightsCard experiences={data.experiences} /> */}
            <ContactCard
              email={data.about.email}
              location={data.about.location}
              name={data.about.name}
              socials={data.about.socials}
            />
          </div>
        </div>
      </main>
    </>
  );
}

