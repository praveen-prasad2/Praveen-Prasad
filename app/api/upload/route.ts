import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authCookie = request.cookies.get('admin-auth');
    if (authCookie?.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'avatar' or 'skill-icon'
    const blobToken =
      process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PNG, SVG, JPEG, JPG are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    if (!blobToken) {
      console.error('Missing BLOB_READ_WRITE_TOKEN environment variable');
      return NextResponse.json(
        { error: 'File storage is not configured. Please set BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${type}-${timestamp}-${originalName}`;

    const blob = await put(`uploads/${filename}`, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true,
      token: blobToken,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

