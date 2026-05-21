'use client';

import type { PortfolioData } from '@/types/portfolio';
import type { AppId } from '@/types/apps';
import AboutContent from '@/components/macos/content/AboutContent';
import ServicesContent from '@/components/macos/content/ServicesContent';
import ExperienceContent from '@/components/macos/content/ExperienceContent';
import SkillsContent from '@/components/macos/content/SkillsContent';
import ProjectsContent from '@/components/macos/content/ProjectsContent';
import ContactContent from '@/components/macos/content/ContactContent';
import TerminalContent from '@/components/content/TerminalContent';
import NotesContent from '@/components/content/NotesContent';
import ResumeContent from '@/components/content/ResumeContent';
import MusicContent from '@/components/content/MusicContent';
import SafariContent from '@/components/content/SafariContent';
import PhotosContent from '@/components/content/PhotosContent';

const DEFAULT_SERVICES = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Modern apps with React and Next.js.',
    icon: 'code',
  },
];

export default function AppContent({
  appId,
  data,
  variant = 'desktop',
}: {
  appId: AppId;
  data: PortfolioData;
  variant?: 'desktop' | 'ios';
}) {
  const ios = variant === 'ios';

  switch (appId) {
    case 'about':
      return <AboutContent about={data.about} />;
    case 'services':
      return <ServicesContent services={data.services ?? DEFAULT_SERVICES} />;
    case 'experience':
      return <ExperienceContent experiences={data.experiences} />;
    case 'skills':
      return <SkillsContent skills={data.skills} />;
    case 'projects':
    case 'photos':
      return <PhotosContent projects={data.projects} ios={ios} />;
    case 'contact':
      return (
        <ContactContent
          email={data.about.email}
          location={data.about.location}
          name={data.about.name}
          socials={data.about.socials}
        />
      );
    case 'terminal':
      return <TerminalContent about={data.about} />;
    case 'notes':
      return <NotesContent about={data.about} />;
    case 'resume':
      return <ResumeContent about={data.about} />;
    case 'music':
      return <MusicContent />;
    case 'safari':
      return <SafariContent projects={data.projects} />;
    default:
      return null;
  }
}
