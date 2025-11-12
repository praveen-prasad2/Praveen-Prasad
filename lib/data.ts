import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/types/portfolio';
import { kv } from '@vercel/kv';
import { list, put } from '@vercel/blob';

const PORTFOLIO_KEY = 'portfolio:data';
const BLOB_PORTFOLIO_PATH = 'portfolio/data.json';
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

const blobToken =
  process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || undefined;
const hasBlobConfig = Boolean(blobToken);

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

const readFromBlob = async (): Promise<PortfolioData> => {
  if (!blobToken) return defaultData;

  try {
    const { blobs } = await list({ prefix: BLOB_PORTFOLIO_PATH, token: blobToken });
    const blob = blobs.find((b) => b.pathname === BLOB_PORTFOLIO_PATH);
    if (!blob) {
      await put(
        BLOB_PORTFOLIO_PATH,
        JSON.stringify(defaultData, null, 2),
        {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false,
          token: blobToken,
        }
      );
      return defaultData;
    }

    const response = await fetch(blob.downloadUrl, { cache: 'no-cache' });
    if (!response.ok) {
      console.error('Error fetching portfolio blob:', response.statusText);
      return defaultData;
    }
    return (await response.json()) as PortfolioData;
  } catch (error) {
    console.error('Error reading portfolio data from blob:', error);
    return defaultData;
  }
};

const saveToBlob = async (data: PortfolioData): Promise<void> => {
  if (!blobToken) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set. Please configure it in your Vercel environment variables.');
  }
  try {
    await put(
      BLOB_PORTFOLIO_PATH,
      JSON.stringify(data, null, 2),
      {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        token: blobToken,
      }
    );
    console.log('Successfully saved portfolio data to Blob at:', BLOB_PORTFOLIO_PATH);
  } catch (error) {
    console.error('Error saving portfolio data to blob:', error);
    throw error;
  }
};

export async function getPortfolioData(): Promise<PortfolioData> {
  // Prioritize Blob storage (for production)
  if (hasBlobConfig) {
    try {
      return await readFromBlob();
    } catch (error) {
      console.error('Error reading from Blob, falling back:', error);
      // Fall through to try other methods
    }
  }

  // Fallback to KV if Blob is not available
  if (hasKvConfig) {
    try {
      const data = await kv.get<PortfolioData>(PORTFOLIO_KEY);
      if (!data) {
        await kv.set(PORTFOLIO_KEY, defaultData);
        return defaultData;
      }
      return data;
    } catch (error) {
      console.error('Error reading portfolio data from KV:', error);
    }
  }

  // Final fallback to file (only works in development)
  return readFromFile();
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  // Prioritize Blob storage (for production)
  if (hasBlobConfig) {
    try {
      await saveToBlob(data);
      console.log('Portfolio data saved to Blob successfully');
      return;
    } catch (error) {
      console.error('Error saving to Blob:', error);
      throw new Error(`Failed to save to Blob storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Fallback to KV if Blob is not available
  if (hasKvConfig) {
    try {
      await kv.set(PORTFOLIO_KEY, data);
      console.log('Portfolio data saved to KV successfully');
      return;
    } catch (error) {
      console.error('Error saving portfolio data to KV:', error);
      throw new Error(`Failed to save to KV storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Final fallback to file (only works in development)
  try {
    await saveToFile(data);
    console.log('Portfolio data saved to file successfully');
  } catch (error) {
    console.error('Error saving to file:', error);
    throw new Error(`Failed to save to file storage: ${error instanceof Error ? error.message : 'Unknown error'}. This likely means BLOB_READ_WRITE_TOKEN is not set in production.`);
  }
}

