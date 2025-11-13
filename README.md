# Portfolio Website - Bento Grid Design

A modern, single-page portfolio website with a bento grid layout, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Bento Grid Design** - Modern, responsive grid layout with green/white theme
- 📱 **Fully Responsive** - Works on all device sizes
- 🎭 **Dark Mode Support** - Automatic dark mode based on system preferences
- 🎬 **Minimal Animations** - Smooth, subtle animations using Framer Motion
- 🔧 **TypeScript** - Fully typed for better development experience
- 🎨 **Modern Typography** - Urbanist font for a clean, professional look

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Viewing the Portfolio

Navigate to the home page to see your portfolio with the bento grid layout.

### Editing Content

All portfolio data lives in `data/portfolio.json`. Update this file to change the About, Skills, Experience, Projects, or Contact information displayed on the site.

## Project Structure

```
├── app/
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Portfolio home page
├── components/         # React components
│   ├── AboutCard.tsx
│   ├── BentoCard.tsx
│   ├── ExperienceCard.tsx
│   ├── ProjectsCard.tsx
│   └── SkillsCard.tsx
├── data/               # JSON data storage
│   └── portfolio.json
└── types/              # TypeScript type definitions
    └── portfolio.ts
```

## Customization

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.ts` to customize colors, spacing, and other design tokens.

### Animations

Animations are handled by Framer Motion. Adjust animation parameters in `components/BentoCard.tsx` for different effects.

### Content

Update `data/portfolio.json` to manage the static content shown on the site.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

