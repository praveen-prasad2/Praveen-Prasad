import type { About } from '@/types/portfolio';

export default function About({ about }: { about: About }) {
  return (
    <section id="about" className="section">
      <div className="container-main grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="label mb-4">01 — About</p>
          <h2 className="heading-lg">Who I am</h2>
        </div>

        <div className="space-y-8">
          <p className="body">{about.bio}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Name', value: about.name },
              { label: 'Role', value: about.title },
              { label: 'Location', value: about.location },
              { label: 'Focus', value: 'Full-stack & UI' },
            ].map((item) => (
              <div key={item.label} className="card">
                <p className="label mb-2">{item.label}</p>
                <p className="font-semibold text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
