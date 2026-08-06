import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CyberBackground from '@/components/effects/CyberBackground';
import ScrollProgress from '@/components/effects/ScrollProgress';
import HackerLoader from '@/components/effects/HackerLoader';
import SectionDivider from '@/components/ui/SectionDivider';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import data from '@/data/portfolio.json';
import type { PortfolioData } from '@/types/portfolio';

const portfolio = data as PortfolioData;

export default function Home() {
  const {
    about,
    skills,
    projects,
    experiences,
    services = [],
    testimonials = [],
  } = portfolio;

  return (
    <>
      <HackerLoader />
      <ScrollProgress />
      <CyberBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero about={about} />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills skills={skills} />
        <SectionDivider />
        <Experience experiences={experiences} />
        <SectionDivider />
        <Projects projects={projects} />
        <SectionDivider />
        <Services services={services} />
        <SectionDivider />
        <Testimonials testimonials={testimonials} />
        <SectionDivider />
        <Contact
          email={about.email}
          location={about.location}
          socials={about.socials}
        />
      </main>

      <div className="relative z-10">
        <Footer name={about.name} socials={about.socials} />
      </div>
    </>
  );
}
