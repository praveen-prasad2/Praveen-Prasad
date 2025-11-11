import { NextRequest, NextResponse } from 'next/server';
import { registerVisitor } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { visitorId } = await request.json();

    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json({ error: 'Invalid visitor ID' }, { status: 400 });
    }

    const analytics = await registerVisitor(visitorId);

    return NextResponse.json({ uniqueVisitors: analytics.uniqueVisitors });
  } catch (error) {
    console.error('Error registering visitor:', error);
    return NextResponse.json({ error: 'Failed to register visitor' }, { status: 500 });
  }
}

