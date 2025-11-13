import { PortfolioData } from "@/types/portfolio";
import AboutCard from "@/components/AboutCard";
import SkillsCard from "@/components/SkillsCard";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectsCard from "@/components/ProjectsCard";
import ContactCard from "@/components/ContactCard";
import NavigationBar from "@/components/NavigationBar";
import data from "@/data/portfolio.json";

const portfolioData = data as PortfolioData;

export default function Home() {
  const portfolio = portfolioData;

  return (
    <>
      <NavigationBar />
      <main className="min-h-screen bg-white dark:bg-[#0a0a0a] px-4 pb-14 pt-24 md:px-8 md:pt-28">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(220px,auto)] grid-flow-dense">
            <AboutCard about={portfolio.about} />
            <ExperienceCard experiences={portfolio.experiences} />
            <SkillsCard skills={portfolio.skills} />
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
      </main>
    </>
  );
}
