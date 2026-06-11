import type { About } from '@/types/portfolio';
import { ArrowDown } from 'lucide-react';

export default function Hero({ about }: { about: About }) {
  return (
    <section id="hero" className="flex min-h-screen flex-col justify-center pt-16">
      {/* <div className="container-main">
        <p className="label mb-6">Portfolio — {new Date().getFullYear()}</p>

        <h1 className="heading-xl max-w-4xl">
          {about.name.split(' ').map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white md:text-xl">
          {about.title} building fast, scalable web products with modern tools.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn">View work</a>
          <a href="#contact" className="btn-ghost">Get in touch</a>
        </div>

        <div className="mt-20 flex flex-wrap gap-8 border-t border-black/15 pt-8 text-sm text-muted">
          <span>{about.location}</span>
          <a href={`mailto:${about.email}`} className="transition hover:text-white">
            {about.email}
          </a>
        </div>
      </div>

      <a href="#about" className="container-main mt-auto pb-10 pt-16" aria-label="Scroll to about">
        <ArrowDown className="h-5 w-5 animate-bounce text-ink" />
      </a> */}

      
    </section>
  );
}
