import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export function getPortfolioData(): PortfolioData {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return {
      about: {
        name: '',
        title: '',
        bio: '',
        email: '',
        location: '',
        socials: [],
      },
      skills: [],
      experiences: [],
      projects: [],
    };
  }
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    throw error;
  }
}

