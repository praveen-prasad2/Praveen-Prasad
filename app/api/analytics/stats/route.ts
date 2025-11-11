import { NextResponse } from 'next/server';
import { getAnalyticsData } from '@/lib/analytics';

export async function GET() {
  try {
    const analytics = await getAnalyticsData();
    return NextResponse.json({
      uniqueVisitors: analytics.uniqueVisitors,
      totalTrackedVisitors: analytics.visitorIds.length,
    });
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics stats' }, { status: 500 });
  }
}

