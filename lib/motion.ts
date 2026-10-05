import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const REDUCED_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Shared scroll reveals, driven by data attributes:
 *  [data-split]  words/chars of a <Split> rise out of their masks
 *  [data-fade]   element fades up
 *  [data-kicker] hairline draws across, labels slide in
 */
export function revealCommon(scope: Element) {
  gsap.utils.toArray<HTMLElement>('[data-split]', scope).forEach((el) => {
    gsap.from(el.querySelectorAll('.si, .sc'), {
      yPercent: 118,
      rotate: 4,
      duration: 1.15,
      stagger: 0.055,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-fade]', scope).forEach((el) => {
    gsap.from(el, {
      y: 34,
      autoAlpha: 0,
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-kicker]', scope).forEach((el) => {
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 90%' } })
      .fromTo(el, { '--kline': 0 }, { '--kline': 1, duration: 1.4, ease: 'expo.out' })
      .from(el.children, { yPercent: 100, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.1);
  });
}
