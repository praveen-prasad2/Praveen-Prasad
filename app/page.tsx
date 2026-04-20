"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/types/portfolio";
import AboutCard from "@/components/AboutCard";
import SkillsCard from "@/components/SkillsCard";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectsCard from "@/components/ProjectsCard";
import ContactCard from "@/components/ContactCard";
import NavigationBar from "@/components/NavigationBar";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import data from "@/data/portfolio.json";

const portfolioData = data as PortfolioData;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const portfolio = portfolioData;

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className="ambient-bg" />
      <NavigationBar />
      
      <main className={`relative z-10 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero 
          name={portfolio.about.name} 
          title={portfolio.about.title} 
          start={!isLoading} 
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-16 md:space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 auto-rows-[minmax(220px,auto)]">
            <AboutCard about={portfolio.about} />
            <SkillsCard skills={portfolio.skills} />
            <ExperienceCard experiences={portfolio.experiences} />
            <ProjectsCard
              projects={portfolio.projects}
              contactEmail={portfolio.about.email}
            />
            <ContactCard
              email={portfolio.about.email}
              location={portfolio.about.location}
              name={portfolio.about.name}
              socials={portfolio.about.socials}
            />
          </div>
        </div>
        
        <footer className="relative border-t border-foreground/10 py-14 text-center dark:border-white/[0.06]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-foreground/30 dark:text-white/25">
            © {new Date().getFullYear()} {portfolio.about.name} — Built with Next.js & GSAP
          </p>
        </footer>
      </main>
    </>
  );
}
