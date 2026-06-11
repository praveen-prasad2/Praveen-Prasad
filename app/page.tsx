import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import data from '@/data/portfolio.json';
import type { PortfolioData } from '@/types/portfolio';

const portfolio = data as PortfolioData;

export default function Home() {
  const { about, skills, projects, experiences } = portfolio;

  return (
    <>
      <Navbar />
      <main>
        <Hero about={about} />
        <About about={about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact
          email={about.email}
          location={about.location}
          name={about.name}
          socials={about.socials}
        />
      </main>
    </>
  );
}
