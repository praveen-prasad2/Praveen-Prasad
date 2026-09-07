import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AmbientBackground from '@/components/effects/AmbientBackground';
import ScrollProgress from '@/components/effects/ScrollProgress';
import Preloader from '@/components/effects/Preloader';
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
      <Preloader />
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />

      <main id="main" className="relative z-10">
        <Hero about={about} />
        <About />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
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
