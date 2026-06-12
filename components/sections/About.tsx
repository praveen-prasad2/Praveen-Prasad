import Reveal from '@/components/ui/Reveal';
import ScrollReveal from '@/components/ui/ScrollReveal';

const DRIVERS = [
  'Building useful products',
  'Solving real business problems',
  'Continuous learning',
  'Creating meaningful user experiences',
  'Turning "What if?" into "Done."',
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-main">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <p className="label">About Me</p>
            </Reveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur
              baseRotation={5}
              blurStrength={10}
              containerClassName="mt-4"
              textClassName="heading-lg"
            >
              More Than Just a Developer
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={100}>
              <p className="body">
                My journey didn&apos;t start with code. It started with curiosity.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="body">
                I was fascinated by how technology could turn a simple idea into
                something that thousands of people could use. That curiosity led me
                into web development, digital marketing, product building, and
                entrepreneurship.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="body">
                Today, I help businesses establish their online presence while also
                building products of my own.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="body">
                When I&apos;m not coding, you&apos;ll find me exploring business ideas,
                learning new technologies, or figuring out how to build things that
                make life easier for people.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={300}>
          <div className="mt-20">
            <h3 className="heading-md text-primary">What Drives Me</h3>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DRIVERS.map((item, i) => (
                <li
                  key={item}
                  className="card group flex items-center gap-3 transition hover:border-primary/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary transition group-hover:bg-primary group-hover:text-accent">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-accent/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
