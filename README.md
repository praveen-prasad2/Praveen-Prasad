# Praveen Prasad — Portfolio OS

An Apple-inspired portfolio that runs as a desktop (macOS) or phone (iOS) experience. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- macOS-style desktop with draggable windows, dock, and Spotlight (`Cmd/Ctrl + K`)
- iPhone-style home screen on mobile with app grid and fullscreen apps
- Design system from `DESIGN.md` (Action Blue, SF Pro typography, product tiles)
- Content driven by `data/portfolio.json`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/                 # Next.js app shell
components/
  content/           # Shared app window content
  macos/             # Desktop experience
  ios/               # Mobile experience
  os/                # Adaptive PortfolioOS root
data/portfolio.json  # Portfolio data
lib/                 # Window store, apps registry, design tokens
DESIGN.md            # Design system reference
```

## Edit content

Update `data/portfolio.json` — about, skills, experience, projects, services, socials.
