import Reveal from '@/components/ui/Reveal';
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
              <p className="label">// about</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="heading-lg mt-4">
                More than just a{' '}
                <span className="text-primary">developer</span>
              </h2>
            </Reveal>
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
              <div className="grid grid-cols-3 gap-4 rounded-sm border border-primary/10 bg-bg-secondary/60 p-6 backdrop-blur-md">
                <Counter value={2} suffix="+" label="Years exp" />
                <Counter value={10} suffix="+" label="Projects" />
                <Counter value={18} suffix="+" label="Technologies" />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                what_drives_me
              </h3>
              <ul className="mt-5 space-y-3">
                {DRIVERS.map((item, i) => (
                  <li
                    key={item}
                    className="card-glow group flex items-center gap-3 !p-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-primary/25 font-mono text-xs text-primary transition group-hover:bg-primary/10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
