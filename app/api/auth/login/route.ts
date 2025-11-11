import { NextRequest, NextResponse } from 'next/server';

// Simple password protection - in production, use proper authentication
// Add or remove passwords from this whitelist array.
const ADMIN_PASSWORDS = [
  'Praveen@14',
  'Relax!2002',
];

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
    }

    const isValidPassword = ADMIN_PASSWORDS.includes(password.trim());

    if (isValidPassword) {
      // Set a simple session token (in production, use proper session management)
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

