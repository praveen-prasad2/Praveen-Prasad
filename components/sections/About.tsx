import Reveal from '@/components/ui/Reveal';
import KineticHeading from '@/components/ui/KineticHeading';
import Counter from '@/components/ui/Counter';

const DRIVERS = [
  'Building useful products',
  'Solving real business problems',
  'Continuous learning',
  'Creating meaningful experiences',
  'Turning "What if?" into "Done."',
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-main">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">About</p>
            </Reveal>
            <KineticHeading as="h2" delay={80} className="heading-lg mt-4">
              More than just a <span className="text-accent">developer</span>
            </KineticHeading>
            <Reveal delay={140}>
              <p className="body mt-6">
                My journey didn&apos;t start with code. It started with curiosity —
                how technology turns a simple idea into something thousands of
                people can use.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="body mt-4">
                That curiosity led into web development, product building, and
                entrepreneurship. Today I help businesses establish their online
                presence while shipping products of my own.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="body mt-4">
                When I&apos;m not coding, I&apos;m exploring business ideas, learning
                new stacks, or figuring out how to make life easier for people.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={100}>
              <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/[0.08] bg-bg-surface/60 p-6 backdrop-blur-md">
                <Counter value={2} suffix="+" label="Years exp" />
                <Counter value={10} suffix="+" label="Projects" />
                <Counter value={18} suffix="+" label="Technologies" />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                What drives me
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {DRIVERS.map((item, i) => (
                <Reveal key={item} delay={220 + i * 70} direction="left">
                  <li className="card-glow group flex items-center gap-3 !p-3.5">
                    <span className="h-px w-6 shrink-0 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="text-sm text-ink/80">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
