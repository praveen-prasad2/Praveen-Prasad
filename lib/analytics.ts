import fs from 'fs';
import path from 'path';

interface AnalyticsData {
  uniqueVisitors: number;
  visitorIds: string[];
}

const analyticsFilePath = path.join(process.cwd(), 'data', 'analytics.json');

const defaultAnalytics: AnalyticsData = {
  uniqueVisitors: 0,
  visitorIds: [],
};

const ensureDirectoryExists = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const getAnalyticsData = (): AnalyticsData => {
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

export const saveAnalyticsData = (data: AnalyticsData): void => {
  ensureDirectoryExists(analyticsFilePath);
  fs.writeFileSync(analyticsFilePath, JSON.stringify(data, null, 2), 'utf8');
};

export const registerVisitor = (visitorId: string): AnalyticsData => {
  const data = getAnalyticsData();
  if (!data.visitorIds.includes(visitorId)) {
    data.visitorIds.push(visitorId);
    data.uniqueVisitors = data.visitorIds.length;
    saveAnalyticsData(data);
  }
  return data;
};

