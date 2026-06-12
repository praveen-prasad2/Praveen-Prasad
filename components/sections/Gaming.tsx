import { Gamepad2 } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const GAMES = [
  { title: 'PUBG', genre: 'Battle Royale' },
  { title: 'Minecraft', genre: 'Sandbox' },
  { title: 'GTA V', genre: 'Open World' },
  { title: 'Red Dead Redemption 2', genre: 'Open World' },
  { title: 'Days Gone', genre: 'Survival' },
  { title: 'Uncharted', genre: 'Action-Adventure' },
  { title: 'Cyberpunk 2077', genre: 'RPG' },
  { title: 'The Witcher 3', genre: 'RPG' },
  { title: 'Counter-Strike 2', genre: 'FPS' },
  { title: 'God of War', genre: 'Action-Adventure' },
  { title: "Marvel's Spider-Man", genre: 'Action-Adventure' },
  { title: 'Elden Ring', genre: 'Action RPG' },
];

export default function Gaming() {
  return (
    <section id="gaming" className="section">
      <div className="container-main">
        <Reveal>
          <p className="label">Gaming</p>
          <h2 className="heading-lg mt-4">Off the Clock</h2>
          <p className="body mt-6 max-w-2xl">
            When I&apos;m not building products, I unwind with PC gaming — exploring
            open worlds, surviving hordes, and chasing that one more match.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game, i) => (
            <Reveal key={game.title} delay={i * 60}>
              <article className="card group flex items-center gap-4 transition hover:-translate-y-0.5 hover:border-primary/30">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-accent">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-accent/90">{game.title}</h3>
                  <span className="tag mt-2 inline-block !px-2 !py-0.5 text-xs">
                    {game.genre}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
