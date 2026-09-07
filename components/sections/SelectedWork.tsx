'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '@/data/portfolio.json';
import './SelectedWork.css';

gsap.registerPlugin(ScrollTrigger);
const categories = ['COMMERCE / SAAS', 'EDUCATION / PLATFORM', 'CAREERS / WEB EXPERIENCE'];
const summaries = ['A small business. A bigger reach.', 'Making the next step easier.', 'Opening doors across borders.'];

function ProjectArtwork({ index }: { index: number }) {
  const screenshots = [
    { src: '/uploads/projects/product-share.png', width: 1895, height: 906, alt: 'Product Share homepage showcasing its product catalogue platform' },
    { src: '/uploads/projects/beegains-academy.png', width: 1903, height: 910, alt: 'Beegains Academy homepage with its digital learning introduction' },
  ];
  const screenshot = screenshots[index];
  if (screenshot) {
    return <div className="project-screenshot"><Image {...screenshot} sizes="(max-width: 640px) 88vw, 55vw" /></div>;
  }
  return <div className={`project-art art-${index}`} aria-hidden="true">
    <div className="art-grid" />
    {index === 0 ? <div className="catalogue"><div className="mock-nav"><b>productshare<span>®</span></b><span>A catalogue. A link. A new customer.</span></div><div className="catalogue-title">Your products.<br /><em>Ready to share.</em></div><div className="product-tiles"><div><div className="vase" /><span>The handmade collection</span></div><div><div className="bottle" /><span>Daily rituals</span></div><div><div className="sphere" /><span>Objects for living</span></div></div><div className="mock-bottom">BUILD YOUR CATALOGUE <ArrowUpRight size={18} /></div></div>
    : index === 1 ? <div className="academy"><div className="mock-nav"><b>beegains<span> academy</span></b><span>MAKE ROOM FOR YOUR NEXT SKILL</span></div><div className="academy-title">Learn today.<br /><em>Build tomorrow.</em></div><div className="academy-orbit"><span>↗</span></div><div className="course-chips"><span>Design</span><span>Development</span><span>Digital marketing</span></div></div>
    : <div className="rheinland"><div className="mock-nav"><b>rheinland.</b><span>CAREERS WITHOUT BORDERS</span></div><div className="rheinland-title">Your next move.<br />A world ahead.</div><div className="architecture">{Array.from({length: 7}, (_, i) => <i key={i} />)}</div><div className="mock-bottom">EXPLORE A NEW DIRECTION <ArrowUpRight size={18} /></div></div>}
  </div>;
}


export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-chapter').forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter, start: 'top 55%', end: 'bottom 55%',
          onEnter: () => setActive(index), onEnterBack: () => setActive(index),
        });
      });
    }, root);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const animation = gsap.context(() => {
        gsap.from('.work-heading-word', {
          yPercent: 105, stagger: .1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: '.work-heading', start: 'top 90%', once: true },
        });
        gsap.utils.toArray<HTMLElement>('.work-chapter').forEach(chapter => {
          const visual = chapter.querySelector('.chapter-visual');
          const presentation = chapter.querySelector('.chapter-presentation');
          const rule = chapter.querySelector('.chapter-rule i');
          gsap.fromTo(visual, { clipPath: 'inset(12% 8% 12% 8% round 60px)' }, {
            clipPath: 'inset(0% 0% 0% 0% round 3px)', ease: 'none',
            scrollTrigger: { trigger: chapter, start: 'top 95%', end: 'top 25%', scrub: .7 },
          });
          gsap.fromTo(presentation, { y: 45, scale: .91 }, {
            y: -25, scale: 1.03, ease: 'none',
            scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: 1 },
          });
          gsap.from(chapter.querySelectorAll('.chapter-copy > *'), {
            y: 24, opacity: 0, stagger: .08, duration: .7, ease: 'power2.out',
            scrollTrigger: { trigger: chapter, start: 'top 80%', once: true },
          });
          gsap.to(rule, { scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: chapter, start: 'top 65%', end: 'bottom 55%', scrub: true },
          });
        });
      }, root);
      return () => animation.revert();
    });
    return () => { media.revert(); context.revert(); };
  }, []);

  return (
    <section id="work" className="selected-work" ref={root}>
      <div className="work-heading">
        <div className="work-heading-top"><span className="micro">01 / SELECTED WORK</span><span className="micro">A FEW THINGS I’VE PUT INTO THE WORLD</span></div>
        <h2><span><span className="work-heading-word">Proof in</span></span><span><em className="work-heading-word">the making.</em><sup>(03)</sup></span></h2>
        <div className="work-heading-bottom"><p>Different ambitions. Different challenges.<br />The same care from the first screen to the final detail.</p><ArrowDown size={30} strokeWidth={1} /></div>
      </div>
      <nav className="work-index" aria-label="Project navigation">
        <span className="work-index-label">THE COLLECTION</span>
        {data.projects.map((project, index) => <a key={project.id} href={'#project-' + project.id} aria-current={active === index ? 'location' : undefined}>
          <span>0{index + 1}</span>{project.title}<i />
        </a>)}
      </nav>
      <div className="work-chapters">
        {data.projects.map((project, index) => (
          <article className={'work-chapter chapter-' + index} key={project.id} id={'project-' + project.id}>
            <div className="chapter-copy">
              <span className="chapter-number">0{index + 1}<span> / 03</span></span>
              <span className="micro chapter-category">{categories[index]}</span>
              <h3>{project.title}</h3>
              <p className="chapter-summary">{summaries[index]}</p>
              <p className="chapter-description">{project.description}</p>
              <div className="chapter-tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
              <a className="chapter-link" href={project.link} target="_blank" rel="noreferrer">Explore live project <ArrowUpRight size={18} /><span className="sr-only">: {project.title} (opens in new tab)</span></a>
            </div>
            <a className="chapter-visual" href={project.link} target="_blank" rel="noreferrer" aria-label={'Visit ' + project.title + ' (opens in new tab)'}>
              <div className="chapter-visual-top" aria-hidden="true"><span>FEATURED BUILD — 0{index + 1}</span><ArrowUpRight size={18} /></div>
              <div className="chapter-presentation"><ProjectArtwork index={index} /></div>
              <div className="chapter-visual-bottom" aria-hidden="true"><span>WEB DEVELOPMENT</span><span>{index < 2 ? 'WEBSITE PREVIEW' : 'ILLUSTRATIVE PREVIEW'}</span></div>
            </a>
            <div className="chapter-rule" aria-hidden="true"><i /></div>
          </article>
        ))}
      </div>
      <div className="work-end"><span>THERE’S ALWAYS SOMETHING NEXT.</span><a href="#contact">Maybe it’s your idea. <ArrowUpRight size={20} /></a></div>
    </section>
  );
}
