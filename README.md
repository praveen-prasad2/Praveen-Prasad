# Portfolio Website - Bento Grid Design

A modern, single-page portfolio website with a bento grid layout, built with Next.js, TypeScript, and Tailwind CSS. Features a fully customizable admin panel for managing portfolio content.

## Features

- 🎨 **Bento Grid Design** - Modern, responsive grid layout with green/white theme
- 📱 **Fully Responsive** - Works on all device sizes
- 🎭 **Dark Mode Support** - Automatic dark mode based on system preferences
- ⚡ **Protected Admin Panel** - Password-protected admin panel for editing portfolio content
- 🔒 **Logout Support** - Securely end admin sessions directly in the dashboard
- 🎬 **Minimal Animations** - Smooth, subtle animations using Framer Motion
- 🔧 **TypeScript** - Fully typed for better development experience
- 🎨 **Modern Typography** - Urbanist font for a clean, professional look
- 🖼️ **Image Uploads** - Manage profile photos and skill icons directly from the admin panel

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

### Admin Panel

1. Navigate to `/admin` in your browser
2. Enter the admin password (default: `admin123`, or set `ADMIN_PASSWORD` in `.env.local`)
3. Use the tabs to switch between different sections:
   - **About**: Edit your personal information
   - **Skills**: Add, edit, or remove skills with proficiency levels
   - **Experiences**: Manage your work experience
   - **Projects**: Add and edit your projects
4. Upload a profile photo or skill icons (PNG, SVG, JPEG)
5. Click "Save Changes" to persist your updates
6. Use the "Logout" button to end the admin session
7. Changes will be reflected immediately on the portfolio page

**Note**: The admin panel is password-protected. Set a secure password by creating a `.env.local` file with:
```
ADMIN_PASSWORD=your-secure-password-here
```

## Project Structure

```
├── app/
│   ├── admin/          # Admin panel page
│   ├── api/            # API routes for data management
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
├── lib/                # Utility functions
│   └── data.ts
└── types/              # TypeScript type definitions
    └── portfolio.ts
```

## Customization

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.ts` to customize colors, spacing, and other design tokens.

### Animations

Animations are handled by Framer Motion. Adjust animation parameters in `components/BentoCard.tsx` for different effects.

### Data Storage

Currently, data is stored in `data/portfolio.json`. For production, consider migrating to a database or headless CMS.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

