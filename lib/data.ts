import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';
import { kv } from '@vercel/kv';

const PORTFOLIO_KEY = 'portfolio:data';
const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

const defaultData: PortfolioData = {
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

const hasKvConfig =
  Boolean(process.env.KV_REST_API_URL) &&
  Boolean(process.env.KV_REST_API_TOKEN) &&
  Boolean(process.env.KV_URL);

const readFromFile = async (): Promise<PortfolioData> => {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading portfolio data from file:', error);
    return defaultData;
  }
};

const saveToFile = async (data: PortfolioData): Promise<void> => {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving portfolio data to file:', error);
    throw error;
  }
};

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!hasKvConfig) {
    return readFromFile();
  }

  try {
    const data = await kv.get<PortfolioData>(PORTFOLIO_KEY);
    if (!data) {
      await kv.set(PORTFOLIO_KEY, defaultData);
      return defaultData;
    }
    return data;
  } catch (error) {
    console.error('Error reading portfolio data from KV:', error);
    return defaultData;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  if (!hasKvConfig) {
    await saveToFile(data);
    return;
  }

  try {
    await kv.set(PORTFOLIO_KEY, data);
  } catch (error) {
    console.error('Error saving portfolio data to KV:', error);
    throw error;
  }
}
