import type { About } from '@/types/portfolio';
import { ArrowDown } from 'lucide-react';
import BlurText from '@/components/ui/BlurText';
import Reveal from '@/components/ui/Reveal';

export default function Hero({ about }: { about: About }) {
  const firstName = about.name.split(' ')[0];

  return (
    <section id="hero" className="relative flex min-h-full flex-col justify-center items-center pt-24">
      <div className="container-main relative flex flex-col items-center text-center">
        <Reveal>
          <p className="label"></p>
        </Reveal>

        <BlurText
          as="h1"
          text="Praveen Prasad."
          delay={120}
          animateBy="words"
          direction="top"
          className="mx-auto mt-6 max-w-4xl justify-center font-anton text-8xl font-bold text-accent"
        />

        <BlurText
          text={`I'm a developer who builds websites, products, and businesses, not just pages.`}
          delay={80}
          animateBy="words"
          direction="top"
          threshold={0.5}
          className="mx-auto mt-8 max-w-2xl justify-center font-poppins text-lg text-accent/85 md:text-xl"
        />
{/* 
        <Reveal delay={300}>
          <div className="mx-auto mt-10 max-w-2xl space-y-4 text-accent/70">
            <p>Most people see a website as a collection of screens.</p>
            <p className="text-primary font-medium">I see it as a growth engine.</p>
            <p>
              Whether it&apos;s a startup idea, a business website, or a SaaS product,
              I focus on creating digital experiences that solve problems, attract
              customers, and generate results.
            </p>
          </div>
        </Reveal> */}

        <BlurText
          text="Developer. Problem Solver. Creator."
          delay={100}
          animateBy="words"
          direction="bottom"
          className="mt-10 justify-center font-poppins text-lg font-medium tracking-wide text-primary md:text-xl"
        />

        <Reveal delay={500}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#projects" className="btn">
              Explore My Work
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Build Something
            </a>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="container-main mt-auto flex justify-center pb-10 pt-20"
        aria-label="Scroll to about"
      >
        <ArrowDown className="h-5 w-5 animate-bounce text-primary" />
      </a>
    </section>
  );
}
