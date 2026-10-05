'use client';

import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { gsap } from 'gsap';
import Split from './Split';
import useIsoLayoutEffect from '@/lib/useIsoLayoutEffect';
import { REDUCED_OK, revealCommon } from '@/lib/motion';
import data from '@/data/portfolio.json';

const fan = [
  { rotate: -8, y: 30 },
  { rotate: 4, y: 10 },
  { rotate: 11, y: 40 },
];

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(REDUCED_OK, () => revealCommon(el), el);

    // Desktop: the cards start as a shuffled deck and deal out into a row while the section is pinned.
    mm.add(
      `${REDUCED_OK} and (min-width: 861px)`,
      () => {
        const deck = el.querySelector<HTMLElement>('.deck');
        const cards = gsap.utils.toArray<HTMLElement>('.t-card', el);
        if (!deck) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            // Pin once the cards are fully on screen, even when the section is taller than the viewport.
            start: () => (el.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
            end: '+=110%',
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        cards.forEach((card, i) => {
          tl.from(
            card,
            {
              x: () => deck.offsetWidth / 2 - (card.offsetLeft + card.offsetWidth / 2),
              y: fan[i % fan.length].y,
              rotate: fan[i % fan.length].rotate,
              scale: 0.9,
              ease: 'power2.inOut',
              duration: 1,
            },
            i * 0.08
          );
        });
        tl.from('.t-card blockquote, .t-card figcaption', { autoAlpha: 0.15, duration: 0.6, stagger: 0.04 }, 0.4);
      },
      el
    );

    mm.add(
      `${REDUCED_OK} and (max-width: 860px)`,
      () => {
        gsap.utils.toArray<HTMLElement>('.t-card', el).forEach((card) => {
          gsap.from(card, { y: 60, rotate: 3, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
        });
      },
      el
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="testimonials" className="testimonials section" data-theme="dark">
      <div className="section-kicker micro" data-kicker>
        <span>
          <b>04</b> — Kind words
        </span>
        <span>What people say</span>
      </div>
      <div className="section-heading">
        <h2 data-split>
          <Split text="Trusted by people" by="words" />
          <br />
          <em>
            <Split text="who shipped." by="words" />
          </em>
        </h2>
      </div>
      <div className="deck">
        {data.testimonials.map((t) => (
          <figure className="t-card" key={t.id}>
            <Quote size={26} strokeWidth={1.4} aria-hidden="true" />
            <blockquote>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption>
              <b>{t.name}</b>
              <span>
                {t.role}, {t.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
