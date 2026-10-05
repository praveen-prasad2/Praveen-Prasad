'use client';

import { useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/site/Preloader';
import Header from '@/components/site/Header';
import Cursor from '@/components/site/Cursor';
import Hero from '@/components/site/Hero';
import About from '@/components/site/About';
import Services from '@/components/site/Services';
import Testimonials from '@/components/site/Testimonials';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [ready, setReady] = useState(false);
  const onReveal = useCallback(() => setReady(true), []);

  // Each section declares a theme; the page eases between them as they cross the middle of the viewport.
  useEffect(() => {
    const html = document.documentElement;
    const sections = gsap.utils.toArray<HTMLElement>('main [data-theme]');
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) html.dataset.theme = section.dataset.theme;
        },
      })
    );
    const progress = gsap.to('.scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
    ScrollTrigger.refresh();
    return () => {
      triggers.forEach((t) => t.kill());
      progress.scrollTrigger?.kill();
      progress.kill();
      html.dataset.theme = 'dark';
    };
  }, []);

  return (
    <>
      <Preloader onReveal={onReveal} />
      <Cursor />
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main id="main" className="site-main">
        <Hero ready={ready} />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
