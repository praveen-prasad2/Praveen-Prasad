'use client';

import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { gsap } from 'gsap';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import { REDUCED_OK, revealCommon } from '@/lib/motion';
import data from '@/data/portfolio.json';

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(
      REDUCED_OK,
      () => {
        revealCommon(el);
        gsap.utils.toArray<HTMLElement>('.service', el).forEach((row) => {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: 'top 90%' } })
            .fromTo(row, { '--rline': 0 }, { '--rline': 1, duration: 1.2, ease: 'expo.out' })
            .from(row.querySelectorAll('.service-trigger > *'), { yPercent: 80, autoAlpha: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
              0.05
            );
        });
      },
      el
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="services" className="services section" data-theme="light">
      <div className="services-grid">
        <div className="service-intro">
          <span className="section-kicker micro" data-kicker>
            <span>
              <b>02</b> — What I bring
            </span>
          </span>
          <h2 data-split>
            <Split text="From first idea" by="words" />
            <br />
            <Split text="to" by="words" />{' '}
            <em>
              <Split text="final detail." by="words" />
            </em>
          </h2>
          <p data-fade>The creative thinking and technical care to get your next thing into the world.</p>
        </div>

        <ul className="service-list">
          {data.services.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.id} className={isOpen ? 'service is-open' : 'service'}>
                <h3>
                  <button
                    type="button"
                    className="service-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${s.id}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="micro service-index">0{i + 1}</span>
                    <span className="service-title">{s.title}</span>
                    <span className="service-icon" aria-hidden="true">
                      <Plus size={20} strokeWidth={1.6} />
                    </span>
                  </button>
                </h3>
                <div className="service-panel" id={`service-panel-${s.id}`} role="region" aria-hidden={!isOpen}>
                  <div>
                    <p>{s.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
