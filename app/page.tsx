'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowUp, Plus, Minus, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/data/portfolio.json';
import StudioHero from '@/components/sections/StudioHero';
import SelectedWork from '@/components/sections/SelectedWork';

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openService, setOpenService] = useState<string | null>('1');
  useEffect(() => { ScrollTrigger.refresh(); }, [openService]);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 42, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
        gsap.utils.toArray<HTMLElement>('.statement-word').forEach((el, i) => gsap.fromTo(el, { opacity: .18 }, { opacity: 1, scrollTrigger: { trigger: '.about-statement', start: `top ${85 - i * 1.6}%`, end: `top ${65 - i * 1.6}%`, scrub: true } }));

        gsap.fromTo('.contact-title', { y: 70, rotationX: 18, opacity: .2 }, {
          y: 0, rotationX: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: '.contact', start: 'top 90%', end: 'top 30%', scrub: .8 },
        });
        gsap.utils.toArray<HTMLElement>('.process-number').forEach(number => {
          gsap.fromTo(number, { borderColor: 'transparent', x: -15 }, {
            borderColor: '#173a2e40', x: 0, ease: 'none',
            scrollTrigger: { trigger: number, start: 'top 90%', end: 'top 60%', scrub: .6 },
          });
        });
        gsap.fromTo('.toolbox .tags span', { y: 20, opacity: .2 }, {
          y: 0, opacity: 1, stagger: .04,
          scrollTrigger: { trigger: '.toolbox', start: 'top 90%', end: 'bottom 80%', scrub: .5 },
        });
        gsap.to('.ticker-track', { xPercent: -25, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.to('.page-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);

  return <div ref={root} className="portfolio">
    <div className="page-progress" />
    <header className="site-header"><a href="#home" className="wordmark" aria-label="Praveen Prasad home">pp<span>®</span></a><nav aria-label="Main navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'}>{[['Work', 'work'], ['About', 'about'], ['Expertise', 'expertise']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><a className="header-contact" href="#contact">Start a conversation <ArrowUpRight size={16} /></a><button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
    <main id="main">
      <StudioHero />
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1,2,3].map(i => <span key={i}>THOUGHTFUL INTERFACES <b>✳</b> DEPENDABLE SYSTEMS <b>✳</b> ROOM TO GROW <b>✳</b></span>)}</div></div>
      <SelectedWork />
      <section id="about" className="about section-pad"><span className="micro section-index">02 / A BIT ABOUT ME</span><div className="about-layout"><div className="about-mark" aria-hidden="true">✳<span>LEARN IT.<br />BUILD IT. REFINE IT.</span></div><div><h2 className="about-statement">{'I connect what people need with what technology can do.'.split(' ').map((word, i) => <span className="statement-word" key={i}>{word} </span>)}</h2><div className="about-copy" data-reveal><p>I’m Praveen Prasad, a full-stack developer from Malappuram, Kerala. I work across interfaces, backend features, and automation to turn a useful idea into something people can actually use.</p><p>My path has been shaped by hands-on learning: picking up a new tool, asking better questions, and staying with a problem until it makes sense. I bring that same curiosity to every project and team.</p></div><a className="text-link" href={data.about.socials[0].url} target="_blank" rel="noreferrer">Follow my journey <ArrowUpRight size={18} /></a></div></div><div className="experience"><span className="micro">WHERE I’VE BEEN BUILDING</span><div>{data.experiences.map(e => <article key={e.id} data-reveal><div><h3>{e.title}</h3><p>{e.company}</p><p className="experience-description">{e.description}</p></div><span className="micro">{e.period}</span></article>)}</div></div></section>
      <section id="expertise" className="expertise section-pad"><div className="expertise-intro" data-reveal><span className="micro section-index">03 / HOW I CAN HELP</span><h2>One idea.<br /><em>All the way</em><br />to the<br /><em>real world.</em></h2><p>The frontend, the backend, and the connections<br />that make the whole thing work.</p></div><div className="services">{data.services.map((s, i) => <div className="service" key={s.id}><button aria-expanded={openService === s.id} aria-controls={`service-${s.id}`} onClick={() => setOpenService(openService === s.id ? null : s.id)}><span className="micro">0{i + 1}</span><h3>{s.title}</h3>{openService === s.id ? <Minus size={20} /> : <Plus size={20} />}</button><div id={`service-${s.id}`} className="service-body" hidden={openService !== s.id}><p>{s.description}</p></div></div>)}<div className="toolbox"><span className="micro">MY EVERYDAY TOOLKIT</span><div className="tags">{data.skills.map(s => <span key={s.id}>{s.name}</span>)}</div></div></div></section>
      <section className="process section-pad"><span className="micro section-index">04 / A CLEAR WAY FORWARD</span><div className="process-grid">{[
        ['01', 'Find the right problem.', 'We start with the people using the product, the goal it needs to meet, and the constraints that matter. A clear brief makes the next decisions easier.'],
        ['02', 'Make it tangible.', 'I turn the direction into working interfaces and connected features, sharing progress early so we can test ideas and refine the details together.'],
        ['03', 'Finish with care.', 'Responsive layouts, accessible interactions, and maintainable code are part of the delivery. The result should make sense to its users and its next developer.'],
      ].map(([number, title, description]) => <article key={number} data-reveal><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section id="contact" className="contact section-pad"><div className="contact-top"><span className="micro">YOUR NEXT CHAPTER STARTS HERE</span><span className="availability"><i /> Open to a good conversation</span></div><a className="contact-title" href={`mailto:${data.about.email}`}><span>Your idea.<br /><em>Our next project.</em></span><ArrowUpRight /></a><div className="contact-bottom"><a className="text-link" href={`mailto:${data.about.email}`}>{data.about.email} <ArrowUpRight size={18} /></a><p>Tell me what you’re thinking. We’ll take it from there.</p></div></section>
    </main><footer className="site-footer"><a href="#home" className="wordmark">pp<span>®</span></a><span>© {new Date().getFullYear()} Praveen Prasad</span><div>{data.about.socials.map(s => <a href={s.url} key={s.id} target="_blank" rel="noreferrer">{s.platform} <ArrowUpRight size={13} /></a>)}</div><a href="#home" className="back-top" aria-label="Back to top"><ArrowUp size={20} /></a></footer>
  </div>;
}
