import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import data from '@/data/portfolio.json';
import type { PortfolioData } from '@/types/portfolio';

const portfolio = data as PortfolioData;

export default function Home() {
  const { about, skills, projects, experiences, services = [] } = portfolio;

  return (
    <>
      <Navbar />
      <main>
        <Hero about={about} />
        <About />
        <Services services={services} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Contact
          email={about.email}
          location={about.location}
          socials={about.socials}
        />
      </main>
    </>
  );
}
