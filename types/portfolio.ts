export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle?: string;
  icon?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface About {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatar?: string;
  socials?: SocialLink[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioData {
  about: About;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  services?: Service[];
}
