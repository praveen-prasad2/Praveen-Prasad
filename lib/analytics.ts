import fs from 'fs';
import path from 'path';
import { list, put } from '@vercel/blob';

interface AnalyticsData {
  uniqueVisitors: number;
  visitorIds: string[];
}

const analyticsFilePath = path.join(process.cwd(), 'data', 'analytics.json');
const ANALYTICS_BLOB_PATH = 'analytics/data.json';

const defaultAnalytics: AnalyticsData = {
  uniqueVisitors: 0,
  visitorIds: [],
};

const blobToken =
  process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN || undefined;
const hasBlobConfig = Boolean(blobToken);

const ensureDirectoryExists = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const readFromFile = (): AnalyticsData => {
  try {
    const fileContents = fs.readFileSync(analyticsFilePath, 'utf8');
    const parsed = JSON.parse(fileContents) as AnalyticsData;
    return {
      ...defaultAnalytics,
      ...parsed,
      visitorIds: Array.isArray(parsed.visitorIds) ? parsed.visitorIds : [],
    };
  } catch (error) {
    return { ...defaultAnalytics };
  }
};

const saveToFile = (data: AnalyticsData): void => {
  ensureDirectoryExists(analyticsFilePath);
  fs.writeFileSync(analyticsFilePath, JSON.stringify(data, null, 2), 'utf8');
};

const readFromBlob = async (): Promise<AnalyticsData> => {
  if (!blobToken) return { ...defaultAnalytics };

  try {
    const { blobs } = await list({ prefix: ANALYTICS_BLOB_PATH, token: blobToken });
    const blob = blobs.find((b) => b.pathname === ANALYTICS_BLOB_PATH);
    if (!blob) {
      await put(
        ANALYTICS_BLOB_PATH,
        JSON.stringify(defaultAnalytics, null, 2),
        {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false,
          token: blobToken,
        }
      );
      return { ...defaultAnalytics };
    }

    const response = await fetch(blob.downloadUrl, { cache: 'no-cache' });
    if (!response.ok) {
      console.error('Error fetching analytics blob:', response.statusText);
      return { ...defaultAnalytics };
    }
    const parsed = (await response.json()) as AnalyticsData;
    return {
      ...defaultAnalytics,
      ...parsed,
      visitorIds: Array.isArray(parsed.visitorIds) ? parsed.visitorIds : [],
    };
  } catch (error) {
    console.error('Error reading analytics data from blob:', error);
    return { ...defaultAnalytics };
  }
};

const saveToBlob = async (data: AnalyticsData): Promise<void> => {
  if (!blobToken) return;
  try {
    await put(
      ANALYTICS_BLOB_PATH,
      JSON.stringify(data, null, 2),
      {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        token: blobToken,
      }
    );
  } catch (error) {
    console.error('Error saving analytics data to blob:', error);
    throw error;
  }
};

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  if (hasBlobConfig) {
    return readFromBlob();
  }

  return readFromFile();
};

export const saveAnalyticsData = async (data: AnalyticsData): Promise<void> => {
  if (hasBlobConfig) {
    await saveToBlob(data);
    return;
  }
  saveToFile(data);
};

export const registerVisitor = async (visitorId: string): Promise<AnalyticsData> => {
  const data = await getAnalyticsData();
  if (!data.visitorIds.includes(visitorId)) {
    data.visitorIds.push(visitorId);
    data.uniqueVisitors = data.visitorIds.length;
    await saveAnalyticsData(data);
  }
  return data;
};

