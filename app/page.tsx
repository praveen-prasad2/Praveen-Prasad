'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown, ArrowUp, Plus, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/data/portfolio.json';

gsap.registerPlugin(ScrollTrigger);
const categories = ['COMMERCE / SAAS', 'EDUCATION / PLATFORM', 'CAREERS / WEB EXPERIENCE'];
const images = ['/uploads/projects/product-share.png', '/uploads/projects/beegains-academy.png'];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('.hero-line > span', { yPercent: 110, duration: 1.2, stagger: .12, ease: 'power4.out' });
        gsap.from('.hero-foot', { opacity: 0, y: 20, duration: 1, delay: .4 });
        gsap.to('.sculpture', { rotation: 85, y: 110, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.hero-title', { y: 95, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
          gsap.from(el, { y: 38, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 91%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('.project-image').forEach(el => {
          gsap.fromTo(el, { yPercent: 7, scale: .94 }, { yPercent: -5, scale: 1.02, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
        });
        gsap.from('.manifesto-word', { opacity: .17, stagger: .15, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 78%', end: 'bottom 55%', scrub: 1 } });
        gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return <div ref={root} id="home">
    <div className="reading-progress" aria-hidden="true" />
    <header className="site-header"><a className="wordmark" href="#home" aria-label="Praveen Prasad home">praveen<span>®</span></a><span className="nav-note">INDEPENDENT DEVELOPER & CREATIVE THINKER</span><button className="menu-button" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button><nav id="navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">{[['Work','work'],['About','about'],['Contact','contact']].map(([name,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{name}<span>{id === 'contact' ? '↗' : ''}</span></a>)}</nav></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-top micro"><span><i className="status-dot"/> OPEN TO GOOD CONVERSATIONS</span><span>BASED IN KERALA, INDIA</span></div>
        <div className="hero-composition"><h1 className="hero-title" id="hero-title"><span className="hero-line"><span>Thoughtful</span></span><span className="hero-line"><span>code. <em>Real</em></span></span><span className="hero-line"><span><em>impact.</em><b className="orange-period">·</b></span></span></h1><div className="sculpture-wrap" aria-hidden="true"><div className="sculpture">{Array.from({length: 13}, (_, i) => <i key={i} style={{transform: `rotateY(${i * 13.85}deg)`}} />)}</div><span className="sculpture-caption micro">IDEAS, TAKING SHAPE.</span></div></div>
        <div className="hero-foot"><a href="#work" className="scroll-link"><span className="circle-arrow"><ArrowDown size={20}/></span><span>SCROLL TO EXPLORE</span></a><p>I’m Praveen Prasad, a full-stack developer.<br/>I turn complex ideas into simple,<br/>considered digital experiences.</p><span className="hero-index micro">PORTFOLIO — VOL. 01<br/>DESIGNED TO MOVE YOU</span></div>
      </section>
      <section id="work" className="work section-wrap">
        <div className="section-kicker micro" data-reveal><span>01 / SELECTED WORK</span><span>A FEW THINGS I’VE BUILT</span></div>
        <div className="section-heading" data-reveal><h2>Less talk.<br/><em>More making.</em></h2><p>Different challenges. The same care.<br/>A selection of products built to be useful,<br/>feel intuitive, and work beautifully.</p></div>
        {data.projects.map((project,i) => <article className={`project project-${i}`} key={project.id}>
          <a className="project-stage" href={project.link} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}><div className="stage-top micro"><span>{categories[i]}</span><ArrowUpRight size={23}/></div><div className="project-image">{images[i] ? <div className="browser-frame"><div className="browser-chrome"><span>● ● ●</span><span>{new URL(project.link).hostname}</span><span>↗</span></div><Image src={images[i]} alt={`${project.title} website preview`} width={1900} height={910} sizes="(max-width: 700px) 90vw, 80vw" /></div> : <div className="career-art"><div className="career-art-nav">rheinland<span>CAREERS WITHOUT BORDERS</span></div><h3>Your next chapter.<br/><em>A world ahead.</em></h3><div className="career-art-bottom"><span>INDIA <span>───────── ↗</span> GERMANY</span><span>ILLUSTRATIVE CONCEPT</span></div><div className="arch"/></div>}</div><span className="stage-bottom micro">{i < 2 ? 'LIVE WEBSITE PREVIEW' : 'INTERFACE CONCEPT'}<span>0{i + 1} / 03</span></span></a>
          <div className="project-details" data-reveal><div><span className="project-number micro">0{i + 1}</span><h3><a href={project.link} target="_blank" rel="noreferrer">{project.title}<ArrowUpRight size={24}/></a></h3></div><p>{project.description}</p><div className="tags">{project.technologies.slice(0,3).map(t => <span key={t}>{t}</span>)}</div></div>
        </article>)}
      </section>
      <section id="about" className="about section-wrap"><div className="section-kicker micro" data-reveal><span>02 / THE PERSON BEHIND THE PIXELS</span><span>A LITTLE ABOUT ME</span></div><p className="manifesto">{'Good digital experiences start with curiosity. And come to life through care.'.split(' ').map((word,i) => <span className="manifesto-word" key={i}>{word} </span>)}</p><div className="about-bottom"><div className="about-mark" aria-hidden="true">✳</div><div data-reveal><h3>A developer. A problem solver.<br/>Always a work in progress.</h3><p>{data.about.bio}</p><a className="text-link" href={data.about.socials[1].url} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={17}/></a></div><div className="experience" data-reveal>{data.experiences.map(e => <div key={e.id}><span className="micro">{e.period}</span><h4>{e.title}</h4><p>{e.company.split(',')[0]}</p></div>)}</div></div><div className="toolbox" data-reveal><span className="micro">A FEW TOOLS OF THE TRADE</span><div>{data.skills.map(s => <span key={s.id}>{s.name}</span>)}</div></div></section>
      <section id="services" className="services section-wrap"><div className="service-intro" data-reveal><span className="micro">03 / WHAT I BRING</span><h2>From first idea<br/><em>to final detail.</em></h2><p>The creative thinking and technical care<br/>to get your next thing into the world.</p></div><div className="service-list">{data.services.map((s,i) => <details key={s.id} data-reveal><summary><span className="micro">0{i + 1}</span><h3>{s.title}</h3><Plus size={19}/></summary><p>{s.description}</p></details>)}</div></section>
      <section id="contact" className="contact section-wrap"><div className="section-kicker micro" data-reveal><span>04 / LET’S MAKE SOMETHING</span><span>EVERY GOOD THING STARTS WITH A HELLO</span></div><a className="contact-title" href={`mailto:${data.about.email}`} data-reveal>Have an idea?<br/><em>Let’s talk.</em><ArrowUpRight strokeWidth={1}/></a><div className="contact-bottom"><a className="text-link" href={`mailto:${data.about.email}`}>{data.about.email}<ArrowUpRight size={17}/></a><p>Based in Kerala.<br/>Building for everywhere.</p></div></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#home">praveen<span>®</span></a><span className="micro">© {new Date().getFullYear()} PRAVEEN PRASAD</span><div>{data.about.socials.map(s => <a href={s.url} key={s.id} target="_blank" rel="noreferrer">{s.platform}<ArrowUpRight size={13}/></a>)}</div><a className="back-top" href="#home" aria-label="Back to top"><ArrowUp size={18}/></a></footer>
  </div>;
}
