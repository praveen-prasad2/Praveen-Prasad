import type { Testimonial } from '@/types/portfolio';
import { Quote } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export default function Testimonials({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">// testimonials</p>
          <h2 className="heading-lg mt-4">
            Signal from the <span className="text-primary">field</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 90}>
              <blockquote className="card-glow gradient-border flex h-full flex-col">
                <Quote className="h-5 w-5 text-primary/40" aria-hidden />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-primary/10 pt-4">
                  <p className="font-display text-sm font-medium text-white">
                    {t.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-primary/70">
                    {t.role} · {t.company}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
